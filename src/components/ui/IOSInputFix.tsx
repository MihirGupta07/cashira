'use client';

import { useEffect } from 'react';

// Component specifically for fixing iOS keyboard zoom issues
export function IOSInputFix() {
  useEffect(() => {
    // Check if running on iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (!isIOS) return;

    // iOS-specific fix for keyboard zoom issues
    const fixViewport = () => {
      // Get the current viewport meta tag
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (!viewportMeta) return;
      
      // Save original content
      const originalContent = viewportMeta.getAttribute('content') || '';
      
      // Function to reset viewport
      const resetViewport = () => {
        // First, slightly modify the viewport to force a refresh
        viewportMeta.setAttribute('content', 'width=device-width, initial-scale=0.999');
        
        // Then set it back to original (with a slight delay)
        setTimeout(() => {
          viewportMeta.setAttribute('content', originalContent);
        }, 10);
      };
      
      // Create an overlay element to detect keyboard closing
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none'; // Don't block interactions
      overlay.style.zIndex = '-1';
      document.body.appendChild(overlay);
      
      // Set up a mutation observer to watch for size changes on the overlay
      // (when keyboard opens/closes, the overlay's size will change)
      let prevHeight = window.innerHeight;
      
      // Function to check for keyboard state changes
      const checkKeyboardState = () => {
        const newHeight = window.innerHeight;
        
        // If height increased significantly, keyboard probably closed
        if (newHeight > prevHeight + 100) {
          resetViewport();
        }
        
        prevHeight = newHeight;
      };
      
      // Watch for orientation changes
      window.addEventListener('orientationchange', () => {
        setTimeout(resetViewport, 300);
      });
      
      // Set up interval to check keyboard state
      const interval = setInterval(checkKeyboardState, 300);
      
      // Also reset viewport when page visibility changes (app switching)
      document.addEventListener('visibilitychange', resetViewport);
      
      return () => {
        document.body.removeChild(overlay);
        clearInterval(interval);
        document.removeEventListener('visibilitychange', resetViewport);
        window.removeEventListener('orientationchange', resetViewport);
      };
    };
    
    const cleanup = fixViewport();
    return cleanup;
  }, []);
  
  return null;
} 