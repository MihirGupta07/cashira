'use client';

import { useCallback } from 'react';
import { User } from '@/lib/auth-api-client';

type GoogleSignInButtonProps = {
  onSignIn: () => Promise<User | undefined>;
  isLoading?: boolean;
};

export function GoogleSignInButton({ 
  onSignIn, 
  isLoading = false 
}: GoogleSignInButtonProps) {
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
      className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-70 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <g transform="matrix(1, 0, 0, 1, 0, 0)">
          <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.229,1.214-0.675,2.346-1.302,3.334 c-0.729,1.146-1.716,2.108-2.876,2.806C12.698,20.73,11.521,21,10.322,21c-1.198,0-2.375-0.27-3.489-0.799 c-1.16-0.698-2.148-1.66-2.877-2.806c-0.761-1.198-1.222-2.577-1.329-4.007C2.535,12.201,2.535,10.976,2.627,9.79 c0.107-1.429,0.568-2.809,1.329-4.007c0.729-1.146,1.717-2.108,2.877-2.806C7.947,2.27,9.125,2,10.322,2 c1.198,0,2.376,0.27,3.491,0.799c1.159,0.698,2.147,1.66,2.875,2.806c0.95,1.493,1.485,3.242,1.536,5.043H14.454 C13.399,10.648,12.545,11.503,12.545,12.151z" fill="#EA4335"></path>
          <path d="M20.8,11.5h-8.364c-0.238,0-0.429,0.191-0.429,0.429v0.571c0,0.238,0.191,0.429,0.429,0.429h4.364 c-0.341,1.564-1.421,2.838-2.89,3.463c-0.99,0.418-2.089,0.498-3.126,0.229c-1.037-0.269-1.968-0.854-2.687-1.685 c-0.805-0.93-1.259-2.106-1.276-3.343c-0.016-1.138,0.329-2.219,0.987-3.132c0.658-0.913,1.599-1.601,2.7-1.978 c1.099-0.377,2.304-0.396,3.415-0.055c0.783,0.241,1.491,0.649,2.079,1.191c0.196,0.181,0.502,0.173,0.684-0.022l0.393-0.423 c0.194-0.209,0.186-0.533-0.019-0.73C15.44,5.372,14.14,4.71,12.72,4.418c-1.627-0.334-3.316-0.12-4.781,0.607 C6.472,5.752,5.236,6.783,4.413,8.128S3.138,10.96,3.158,12.587c0.021,1.628,0.438,3.211,1.198,4.55 c0.759,1.339,1.857,2.447,3.186,3.207c1.328,0.76,2.847,1.175,4.403,1.198c1.559,0.023,3.095-0.346,4.446-1.072 c1.356-0.726,2.478-1.797,3.269-3.119C20.392,15.786,20.828,13.685,20.8,11.5z" fill="#4285F4"></path>
        </g>
      </svg>
      <span>{isLoading ? 'Signing in...' : 'Sign in with Google'}</span>
    </button>
  );
} 