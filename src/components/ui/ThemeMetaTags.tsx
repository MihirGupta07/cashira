'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeMetaTags() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !resolvedTheme) return;

    try {
      // Update or create theme-color meta tag based on current theme
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.setAttribute('name', 'theme-color');
        document.head.appendChild(metaThemeColor);
      }

      // Update or create apple-mobile-web-app-status-bar-style meta tag
      let metaAppleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
      if (!metaAppleStatusBar) {
        metaAppleStatusBar = document.createElement('meta');
        metaAppleStatusBar.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
        document.head.appendChild(metaAppleStatusBar);
      }
      
      if (resolvedTheme === 'dark') {
        metaThemeColor.setAttribute('content', '#111827'); // gray-900
        metaAppleStatusBar.setAttribute('content', 'black-translucent');
      } else {
        metaThemeColor.setAttribute('content', '#8b45ff'); // primary-600
        metaAppleStatusBar.setAttribute('content', 'default');
      }
    } catch (error) {
      console.warn('Error updating theme meta tags:', error);
    }
  }, [resolvedTheme, mounted]);

  return null; // This component doesn't render anything
} 