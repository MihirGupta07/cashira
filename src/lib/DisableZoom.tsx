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

    // Fix for keyboard zoom issue
    const metaViewport = document.querySelector('meta[name=viewport]');
    const originalContent = metaViewport?.getAttribute('content') || '';
    
    // Function to handle focus on inputs
    const handleFocus = () => {
      // When an input gets focus, we don't change the viewport
      // The browser will zoom in as needed
    };
    
    // Function to handle blur on inputs
    const handleBlur = () => {
      // On blur, we reset the viewport to force a redraw and zoom out
      if (metaViewport) {
        // Apply a slight delay to ensure keyboard is fully closed
        setTimeout(() => {
          // First change to something else to force a redraw
          metaViewport.setAttribute('content', 'width=device-width, initial-scale=0.99, maximum-scale=1, minimum-scale=0.99');
          
          // Then reset to original
          setTimeout(() => {
            metaViewport.setAttribute('content', originalContent);
          }, 50);
        }, 300);
      }
    };

    // Track if keyboard is open
    let isKeyboardOpen = false;
    const initialWindowHeight = window.innerHeight;

    // Function to handle window resize (typically triggered by keyboard)
    const handleResize = () => {
      // If window height decreases significantly, keyboard is likely open
      const keyboardOpening = window.innerHeight < initialWindowHeight * 0.75;
      
      if (keyboardOpening && !isKeyboardOpen) {
        isKeyboardOpen = true;
        // Keyboard opening - no action needed
      } else if (!keyboardOpening && isKeyboardOpen) {
        isKeyboardOpen = false;
        // Keyboard closing - reset viewport to force zoom out
        if (metaViewport) {
          // First change to something else to force a redraw
          metaViewport.setAttribute('content', 'width=device-width, initial-scale=0.99, maximum-scale=1, minimum-scale=0.99');
          
          // Then reset to original
          setTimeout(() => {
            metaViewport.setAttribute('content', originalContent);
          }, 50);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Add listeners to all input fields
    const inputElements = document.querySelectorAll('input, textarea, [contenteditable]');
    inputElements.forEach(el => {
      el.addEventListener('focus', handleFocus);
      el.addEventListener('blur', handleBlur);
    });

    // Also handle dynamically added input elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              const newInputs = (node as Element).querySelectorAll('input, textarea, [contenteditable]');
              newInputs.forEach(el => {
                el.addEventListener('focus', handleFocus);
                el.addEventListener('blur', handleBlur);
              });
              
              // Check if the node itself is an input
              if ((node as Element).matches('input, textarea, [contenteditable]')) {
                node.addEventListener('focus', handleFocus);
                node.addEventListener('blur', handleBlur);
              }
            }
          });
        }
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    // Force a viewport reset on page load
    setTimeout(() => {
      if (metaViewport) {
        const current = metaViewport.getAttribute('content');
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=0.99, maximum-scale=1, minimum-scale=0.99');
        setTimeout(() => {
          metaViewport.setAttribute('content', current || originalContent);
        }, 50);
      }
    }, 500);

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', handleResize);
      
      inputElements.forEach(el => {
        el.removeEventListener('focus', handleFocus);
        el.removeEventListener('blur', handleBlur);
      });
      
      observer.disconnect();
    };
  }, []);

  // This component doesn't render anything
  return null;
} 