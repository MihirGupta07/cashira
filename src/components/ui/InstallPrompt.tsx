'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

// Extend Window interface to include MSStream property
declare global {
  interface Window {
    MSStream?: unknown;
  }
}

export function InstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  
  useEffect(() => {
    // Check if it's an iOS device
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOSDevice(isIOS);
    
    // Listen for beforeinstallprompt event (for non-iOS)
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default prompt
      e.preventDefault();
      // Store the event for later use
      setInstallPrompt(e as BeforeInstallPromptEvent);
      // Show our custom banner
      setShowBanner(true);
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);
  
  const handleInstallClick = async () => {
    if (!installPrompt) return;
    
    // Show the native install prompt
    await installPrompt.prompt();
    
    // Wait for the user to respond
    const choiceResult = await installPrompt.userChoice;
    
    // Reset the installPrompt state
    setInstallPrompt(null);
    
    // Hide the banner regardless of choice
    setShowBanner(false);
    
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
  };
  
  const handleDismiss = () => {
    setShowBanner(false);
    // Store in localStorage to prevent showing again for some time
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };
  
  console.log('showBanner', showBanner);
  // Don't show anything if there's no install prompt and it's not iOS
  if (!showBanner) {
    return null;
  }
  
  // Show a different banner for iOS devices
  if (isIOSDevice) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-lg border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Install Cashira
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Tap the share button and then &ldquo;Add to Home Screen&rdquo; to install Cashira.
            </p>
          </div>
          <button 
            onClick={handleDismiss}
            className="ml-4 p-2 text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }
  
  // Show standard install banner for other devices
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-lg border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Install Cashira App
          </h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Install our app for a better experience and offline access.
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleInstallClick}
            className="px-4 py-2 text-xs font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Install
          </button>
          <button 
            onClick={handleDismiss}
            className="p-2 text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 