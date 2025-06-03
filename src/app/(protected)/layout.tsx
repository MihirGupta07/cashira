'use client';

import { ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { AuthProvider } from '@/lib/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useTheme } from '@/lib/ThemeContext';

function ProtectedLayoutContent({ children }: { children: ReactNode }) {
  const { colors } = useTheme();
  
  return (
    <div className={`min-h-screen ${colors.semanticColors.background.primary}`}>
      <Navbar />
      <main className="pb-16 sm:pb-0">{children}</main>
    </div>
  );
}

export default function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <ProtectedLayoutContent>
          {children}
        </ProtectedLayoutContent>
      </ProtectedRoute>
    </AuthProvider>
  );
} 
