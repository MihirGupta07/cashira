'use client';

import { ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { AuthProvider } from '@/lib/AuthContext';
import { ThemeProvider } from 'next-themes';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <ProtectedRoute>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />
            <main>{children}</main>
          </div>
        </ProtectedRoute>
      </AuthProvider>
    </ThemeProvider>
  );
} 