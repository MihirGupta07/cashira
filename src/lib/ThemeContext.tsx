'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getThemeColors } from './colors-dark';
import { ColorMode, STORAGE_KEYS } from './constants';

type ThemeContextType = {
  mode: ColorMode;
  setMode: (mode: ColorMode) => void;
  toggleTheme: () => void;
  colors: ReturnType<typeof getThemeColors>;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setModeState] = useState<ColorMode>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as ColorMode | null;
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setModeState(savedTheme);
    } else {
      // Check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setModeState(systemPrefersDark ? 'dark' : 'light');
    }
    
    setMounted(true);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a manual preference
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      if (!savedTheme) {
        setModeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(mode);
    
    // Update CSS custom properties for smoother transitions
    if (mode === 'dark') {
      // Dark mode with yellow accents
      root.style.setProperty('--bg-primary', '#111827'); // gray-900
      root.style.setProperty('--bg-secondary', '#1f2937'); // gray-800
      root.style.setProperty('--text-primary', '#f9fafb'); // gray-50
      root.style.setProperty('--text-secondary', '#e5e7eb'); // gray-200
      root.style.setProperty('--brand-primary', '#facc15'); // yellow-400
      root.style.setProperty('--brand-secondary', '#fde047'); // yellow-300
    } else {
      // Light mode with violet accents
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f9fafb'); // gray-50
      root.style.setProperty('--text-primary', '#111827'); // gray-900
      root.style.setProperty('--text-secondary', '#374151'); // gray-700
      root.style.setProperty('--brand-primary', '#7c3aed'); // violet-600
      root.style.setProperty('--brand-secondary', '#8b5cf6'); // violet-500
    }
  }, [mode, mounted]);

  const setMode = (newMode: ColorMode) => {
    setModeState(newMode);
    localStorage.setItem(STORAGE_KEYS.THEME, newMode);
  };

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  const colors = getThemeColors(mode);
  const isDark = mode === 'dark';

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleTheme, colors, isDark }}>
      <div className={`min-h-screen transition-colors duration-300 ease-in-out ${colors.semanticColors.background.primary}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return default light theme for SSR instead of throwing
    return {
      mode: 'light' as ColorMode,
      setMode: () => {},
      toggleTheme: () => {},
      colors: getThemeColors('light'),
      isDark: false
    };
  }
  return context;
} 