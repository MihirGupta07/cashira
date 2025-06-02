'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/lib/AuthContext';

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {children}
      </div>
    </AuthProvider>
  );
} 