'use client';

import { useTheme } from '@/lib/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
  const { mode, toggleTheme, colors } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center
        w-10 h-10 rounded-lg
        transition-all duration-300 ease-in-out
        ${colors.semanticColors.hover.background}
        ${colors.semanticColors.focus.outline}
        ${colors.semanticColors.focus.ringOffset}
        ${colors.semanticColors.focus.ring}
        border ${colors.semanticColors.border.secondary}
      `}
      aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
      type="button"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        {/* Sun icon for light mode */}
        <SunIcon
          className={`
            absolute inset-0 h-5 w-5 transition-all duration-300 ease-in-out
            ${colors.semanticColors.text.secondary}
            ${mode === 'light' 
              ? 'opacity-100 transform-none' 
              : 'opacity-0 rotate-90 scale-75'
            }
          `}
        />
        
        {/* Moon icon for dark mode */}
        <MoonIcon
          className={`
            absolute inset-0 h-5 w-5 transition-all duration-300 ease-in-out
            ${colors.semanticColors.text.secondary}
            ${mode === 'dark' 
              ? 'opacity-100 transform-none' 
              : 'opacity-0 -rotate-90 scale-75'
            }
          `}
        />
      </div>
    </button>
  );
} 