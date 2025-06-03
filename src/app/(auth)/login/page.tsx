'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/lib/AuthContext';
import { useTheme } from '@/lib/ThemeContext';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { BanknotesIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  const { colors, isDark } = useTheme();
  const { user, loading, signInWithGoogle } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className={`min-h-screen ${colors.semanticColors.background.primary} flex items-center justify-center`}>
        <div className={`animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 ${colors.semanticColors.loading.spinner}`}></div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className={`min-h-screen ${colors.semanticColors.background.primary} flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}>
      {/* Theme-colored top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-${isDark ? 'yellow' : 'violet'}-500 w-full`}></div>
      
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className={`mt-6 text-center text-3xl font-bold ${colors.semanticColors.text.primary}`}>
            Welcome to <span className={`brand-text ${colors.semanticColors.text.brand}`}>Cashira <BanknotesIcon className="inline-block h-8 w-8 stroke-2" /></span>
          </h2>
          <p className={`mt-2 text-center text-sm ${colors.semanticColors.text.tertiary}`}>
            Track your money, seamlessly
          </p>
        </div>
        
        <div className={`${colors.componentColors.card} p-8 border-t-4 border-${isDark ? 'yellow' : 'violet'}-500`}>
          <div className="space-y-6">
            <div className="text-center">
              <h3 className={`text-lg font-medium ${colors.semanticColors.text.primary}`}>
                Sign in to your account
              </h3>
              <p className={`mt-2 text-sm ${colors.semanticColors.text.tertiary}`}>
                Get started with your financial journey
              </p>
            </div>
            
            <GoogleSignInButton onSignIn={signInWithGoogle} isLoading={loading} />
            
            <div className={`text-center text-xs ${colors.semanticColors.text.light}`}>
              By signing in, you agree to our terms of service and privacy policy
            </div>
          </div>
        </div>
        
        {/* Theme colored footer text */}
        <p className={`text-center text-sm text-${isDark ? 'yellow' : 'violet'}-500 mt-4`}>
          Manage your finances with confidence
        </p>
      </div>
    </div>
  );
} 
