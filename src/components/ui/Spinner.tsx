'use client';

import { useTheme } from '@/lib/ThemeContext';

type SpinnerProps = {
  size?: 'small' | 'medium' | 'large';
};

export function Spinner({ size = 'medium' }: SpinnerProps) {
  const { colors } = useTheme();
  
  // Size mappings
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-10 w-10',
    large: 'h-12 w-12',
  };
  
  return (
    <div 
      className={`animate-spin rounded-full border-t-2 border-b-2 ${sizeClasses[size]} ${colors.semanticColors.loading.spinner}`}
      aria-label="Loading"
    ></div>
  );
} 