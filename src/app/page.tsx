'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useAuthContext } from '@/lib/AuthContext';

export default function HomePage() {
  const { isAuthenticated, loading } = useAuthContext();

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
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
