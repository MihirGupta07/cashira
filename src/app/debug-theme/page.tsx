'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';

export default function DebugThemePage() {
  const { theme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Theme Debug Page</h1>
        
        <div className="mb-8">
          <ThemeSwitcher />
        </div>

        <div className="space-y-4 mb-8">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Theme Status</h2>
            <ul className="space-y-2">
              <li><strong>Current theme:</strong> {theme}</li>
              <li><strong>Resolved theme:</strong> {resolvedTheme}</li>
              <li><strong>System theme:</strong> {systemTheme}</li>
              <li><strong>Document class:</strong> {typeof document !== 'undefined' ? document.documentElement.className : 'N/A'}</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200">Light/Dark Test</h3>
            <p className="text-blue-700 dark:text-blue-300">This should change color based on theme</p>
          </div>
          
          <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
            <h3 className="font-semibold text-green-800 dark:text-green-200">Another Test</h3>
            <p className="text-green-700 dark:text-green-300">This should also change</p>
          </div>
        </div>

        <div className="mt-8 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
          <h3 className="font-semibold mb-2">Manual Theme Test</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => document.documentElement.classList.remove('dark')}
              className="px-4 py-2 bg-yellow-400 text-yellow-900 rounded hover:bg-yellow-500"
            >
              Force Light
            </button>
            <button
              onClick={() => document.documentElement.classList.add('dark')}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Force Dark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 