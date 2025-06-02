'use client';

import { useState, useEffect, useCallback } from 'react';
import { signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth, googleProvider } from '../firebase';
import { authApi, User } from '../auth-api-client';

// Helper function to detect mobile Safari
const isMobileSafari = () => {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) && /Safari/.test(ua) && !/Chrome|CriOS|FxiOS/.test(ua);
};

export function useAuthApi() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Check for existing session on mount and handle redirect result
  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      try {
        // First check for redirect result (mobile Safari)
        const redirectResult = await getRedirectResult(auth);
        if (redirectResult) {
          const idToken = await redirectResult.user.getIdToken();
          const apiUser = await authApi.signInWithGoogle(idToken);
          setUser(apiUser);
          router.push('/dashboard');
          return;
        }

        // Then check for existing session
        const currentUser = await authApi.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error checking session:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSessionAndRedirect();
  }, [router]);

  // Sign in with Google
  const signInWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      
      // Use redirect for mobile Safari, popup for others
      if (isMobileSafari()) {
        await signInWithRedirect(auth, googleProvider);
        // The result will be handled by the useEffect on page reload
        return;
      } else {
        // Desktop and other mobile browsers - use popup
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken();
        
        // Send the ID token to our API
        const apiUser = await authApi.signInWithGoogle(idToken);
        setUser(apiUser);
        
        router.push('/dashboard');
        return apiUser;
      }
    } catch (error: unknown) {
      console.error('Error signing in with Google', error);
      
      // If popup fails on mobile, try redirect as fallback
      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string };
        if (firebaseError.code === 'auth/popup-blocked' || firebaseError.code === 'auth/cancelled-popup-request') {
          try {
            await signInWithRedirect(auth, googleProvider);
            return;
          } catch (redirectError) {
            console.error('Redirect fallback failed:', redirectError);
            throw redirectError;
          }
        }
      }
      
      throw error;
    } finally {
      if (!isMobileSafari()) {
        setLoading(false);
      }
      // Don't set loading to false for mobile Safari redirect, 
      // as the page will reload and useEffect will handle it
    }
  }, [router]);

  // Sign out
  const signOut = useCallback(async () => {
    try {
      await authApi.signOut();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out', error);
      throw error;
    }
  }, [router]);

  return {
    user,
    loading,
    signInWithGoogle,
    signOut,
    isAuthenticated: !!user,
  };
} 