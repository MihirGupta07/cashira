'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth, googleProvider } from '../firebase';

// Helper function to detect mobile Safari
const isMobileSafari = () => {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) && /Safari/.test(ua) && !/Chrome|CriOS|FxiOS/.test(ua);
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Listen for auth state changes and handle redirect result
  useEffect(() => {
    const handleAuthStateAndRedirect = async () => {
      try {
        // First check for redirect result
        const redirectResult = await getRedirectResult(auth);
        if (redirectResult) {
          // User just came back from redirect
          setUser(redirectResult.user);
          setLoading(false);
          router.push('/dashboard');
          return;
        }
      } catch (error) {
        console.error('Error handling redirect result:', error);
      }

      // Set up auth state listener
      const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        setUser(authUser);
        setLoading(false);
      });

      return unsubscribe;
    };

    const unsubscribePromise = handleAuthStateAndRedirect();
    
    // Cleanup
    return () => {
      unsubscribePromise.then(unsubscribe => {
        if (unsubscribe) unsubscribe();
      });
    };
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
        // Desktop and other browsers - use popup
        const result = await signInWithPopup(auth, googleProvider);
        router.push('/dashboard');
        return result;
      }
    } catch (error: unknown) {
      console.error('Error signing in with Google', error);
      
      // If popup fails, try redirect as fallback
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
      // Don't set loading to false for mobile Safari redirect
    }
  }, [router]);

  // Sign out
  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
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