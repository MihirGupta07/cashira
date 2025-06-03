'use client';

import { useCallback } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { User } from '@/lib/auth-api-client';

type GoogleSignInButtonProps = {
  onSignIn: () => Promise<User | undefined>;
  isLoading?: boolean;
};

export function GoogleSignInButton({ 
  onSignIn, 
  isLoading = false 
}: GoogleSignInButtonProps) {
  const { colors } = useTheme();
  
  const handleSignIn = useCallback(async () => {
    if (isLoading) return;
    
    try {
      await onSignIn();
    } catch (error) {
      console.error('Failed to sign in with Google', error);
    }
  }, [onSignIn, isLoading]);

  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={handleSignIn}
      className={`w-full flex justify-center items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium disabled:opacity-70 transition-colors ${colors.componentColors.button.secondary}`}
    >
      <img 
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
        alt="Google logo" 
        width="18" 
        height="18" 
        className="mr-2" 
      />
      <span>{isLoading ? 'Signing in...' : 'Sign in with Google'}</span>
    </button>
  );
} 
