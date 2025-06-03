"use client";

import { useState, useEffect, useCallback } from "react";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "../firebase";
import { authApi, User } from "../auth-api-client";
import { saveUserProfile } from "../user-profile";

// Improved mobile detection function
const isMobileDevice = () => {
  if (typeof window === "undefined") return false;

  const ua = window.navigator.userAgent;

  // Check for mobile devices
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  // Check for small screen size as additional indicator
  const isSmallScreen = window.innerWidth <= 768;

  // Check for touch capability
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  return isMobile || (isSmallScreen && isTouchDevice);
};

export function useAuthApi() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Check for existing session on mount and handle redirect result
  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      try {
        // First check for redirect result
        const redirectResult = await getRedirectResult(auth);
        if (redirectResult) {
          console.log("Handling redirect result for mobile");
          const idToken = await redirectResult.user.getIdToken();
          const apiUser = await authApi.signInWithGoogle(idToken);
          setUser(apiUser);
          
          // Only save profile during initial redirect auth flow
          // This occurs after the first signup/login via redirect
          await saveUserProfile(apiUser);
          
          router.push("/dashboard");
          return;
        }

        // Then check for existing session
        const currentUser = await authApi.getCurrentUser();
        setUser(currentUser);
        
        // Remove the profile saving here - we only want to save on signup
      } catch (error) {
        console.error("Error checking session:", error);
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

      const isMobile = isMobileDevice();
      console.log("Is mobile device:", isMobile);

      // Use redirect for all mobile devices, popup for desktop
      console.log("Using popup for desktop");
      // Desktop - use popup
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      // Send the ID token to our API
      const apiUser = await authApi.signInWithGoogle(idToken);
      setUser(apiUser);
      
      // Save user profile to Firestore during initial signup/login
      await saveUserProfile(apiUser);

      router.push("/dashboard");
      return apiUser;
    } catch (error: unknown) {
      console.error("Error signing in with Google", error);

      // If popup fails, try redirect as fallback
      if (error && typeof error === "object" && "code" in error) {
        const firebaseError = error as { code: string };
        if (
          firebaseError.code === "auth/popup-blocked" ||
          firebaseError.code === "auth/cancelled-popup-request" ||
          firebaseError.code === "auth/popup-closed-by-user"
        ) {
          console.log("Popup failed, trying redirect fallback");
          try {
            await signInWithRedirect(auth, googleProvider);
            return;
          } catch (redirectError) {
            console.error("Redirect fallback failed:", redirectError);
            throw redirectError;
          }
        }
      }

      throw error;
    } finally {
      // Don't set loading to false for mobile devices using redirect
      if (!isMobileDevice()) {
        setLoading(false);
      }
      // For mobile, loading will be set to false in the useEffect after redirect
    }
  }, [router]);

  // Sign out
  const signOut = useCallback(async () => {
    try {
      await authApi.signOut();
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out", error);
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
