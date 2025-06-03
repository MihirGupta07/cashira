'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { AuthProvider } from '@/lib/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useTheme } from '@/lib/ThemeContext';
import { TransactionProvider } from '@/lib/TransactionContext';

function ProtectedLayoutContent({ children }: { children: ReactNode }) {
  const { colors } = useTheme();
  const [isIOS, setIsIOS] = useState(false);
  
  useEffect(() => {
    // Check if it's iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);
  }, []);
  return (
    <div className={`min-h-screen ${colors.semanticColors.background.primary}`}>
      <Navbar />
      <main className={isIOS ? "pb-17 sm:pb-0" : "pb-16 sm:pb-0"}>{children}</main>
    </div>
  );
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <TransactionProvider>
          <ProtectedLayoutContent>
            {children}
          </ProtectedLayoutContent>
        </TransactionProvider>
      </ProtectedRoute>
    </AuthProvider>
  );
} 
