'use client';

import { useEffect } from 'react';

export function DisableZoom() {
  useEffect(() => {
    // This function prevents touchmove events when more than one touch is detected (pinch gestures)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Add the event listener
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Also handle double-tap zoom
    let lastTap = 0;
    const handleTouchStart = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTap < 300) {
        e.preventDefault();
      }
      lastTap = now;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  // This component doesn't render anything
  return null;
} 