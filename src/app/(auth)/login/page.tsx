'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/lib/AuthContext';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, loading, signInWithGoogle } = useAuthContext();
  const [debugInfo, setDebugInfo] = useState<string>('');
  
  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  // Add debug information for mobile testing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = window.navigator.userAgent;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      const isSmallScreen = window.innerWidth <= 768;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      console.log(isMobile);
      setDebugInfo(`
        User Agent: ${ua}
        Is Mobile: ${isMobile}
        Screen Width: ${window.innerWidth}
        Is Small Screen: ${isSmallScreen}
        Is Touch Device: ${isTouchDevice}
        Combined Mobile Detection: ${isMobile || (isSmallScreen && isTouchDevice)}
      `);
    }
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cashira</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Track your money, seamlessly</p>
        </div>
        
        {/* Debug info - only show in development */}
        {process.env.NODE_ENV !== 'development' && (
          <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
            <details>
              <summary>Debug Info (Dev Only)</summary>
              <pre className="whitespace-pre-wrap text-xs mt-2">{debugInfo}</pre>
            </details>
          </div>
        )}
        
        <div className="mt-8">
          <GoogleSignInButton onSignIn={signInWithGoogle} isLoading={loading} />
        </div>
      </div>
    </div>
  );
} 