'use client';

import { useAuthContext } from './AuthContext';
import { useTheme } from './ThemeContext';

export function withAuth<T extends object>(Component: React.ComponentType<T>) {
  return function AuthenticatedComponent(props: T) {
    const { loading, isAuthenticated } = useAuthContext();
    const { colors } = useTheme();
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${colors.semanticColors.loading.spinner}`}></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Authentication Required
            </h2>
            <p className="text-gray-600">
              Please log in to access this page.
            </p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
} 
