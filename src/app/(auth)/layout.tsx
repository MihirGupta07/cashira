'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/lib/AuthContext';
import { ThemeProvider } from 'next-themes';

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          {children}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
} 