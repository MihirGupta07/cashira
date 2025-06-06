'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useAuthContext } from '@/lib/AuthContext';
import { useTheme } from '@/lib/ThemeContext';

export default function HomePage() {
  const { isAuthenticated, loading } = useAuthContext();
  const { colors } = useTheme();
  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        redirect('/dashboard');
      } else {
        redirect('/login');
      }
    }
  }, [isAuthenticated, loading]);

  // Show loading while checking auth state
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2  ${colors.semanticColors.loading.spinner}`}></div>
    </div>
  );
}
