'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/lib/AuthContext';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, loading, signInWithGoogle } = useAuthContext();
  
  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cashira</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Track your money, seamlessly</p>
        </div>
        <div className="mt-8">
          <GoogleSignInButton onSignIn={signInWithGoogle} isLoading={loading} />
        </div>
      </div>
    </div>
  );
} 