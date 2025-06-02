'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  // Avoid hydration mismatch by only rendering after mounting client-side
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <div className="p-2 rounded-md w-9 h-9">
        {/* Placeholder to prevent layout shift */}
      </div>
    );
  }

  const cycleTheme = () => {
    if (theme === 'system') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('system');
    }
  };

  const getIcon = () => {
    if (theme === 'system') {
      return <ComputerDesktopIcon className="h-5 w-5" />;
    } else if (resolvedTheme === 'dark') {
      return <MoonIcon className="h-5 w-5" />;
    } else {
      return <SunIcon className="h-5 w-5" />;
    }
  };

  const getLabel = () => {
    if (theme === 'system') {
      return 'System theme';
    } else if (theme === 'dark') {
      return 'Dark theme';
    } else {
      return 'Light theme';
    }
  };
  
  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={`Current: ${getLabel()}. Click to cycle themes.`}
      title={getLabel()}
    >
      {getIcon()}
    </button>
  );
} 