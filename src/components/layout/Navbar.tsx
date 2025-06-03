'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/lib/ThemeContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { 
  HomeIcon, 
  ChartBarIcon, 
  UserCircleIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

export function Navbar() {
  const { colors } = useTheme();
  const pathname = usePathname();
  
  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Transactions', href: '/transactions', icon: ChartBarIcon },
    { name: 'Profile', href: '/profile', icon: UserCircleIcon },
  ];
  
  return (
    <>
      <nav className={`${colors.semanticColors.background.primary} border-b ${colors.semanticColors.border.secondary} sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/dashboard" className={`text-xl brand-text ${colors.semanticColors.text.brand}`}>
                  Cashira <BanknotesIcon className="inline-block h-6 w-6 stroke-1.5" />
                </Link>
              </div>
              
              {/* Desktop menu */}
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive 
                          ? `${colors.semanticColors.border.brand} ${colors.semanticColors.text.primary}` 
                          : `${colors.semanticColors.border.transparent} ${colors.semanticColors.text.tertiary} ${colors.semanticColors.hover.text}`
                      }`}
                    >
                      <Icon className="mr-1 h-5 w-5" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            
            {/* User menu - desktop */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <ThemeToggle />
            </div>
            
            {/* Mobile header right section */}
            <div className="flex items-center sm:hidden">
              <div className="flex items-center">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div className={`sm:hidden fixed bottom-0 left-0 right-0 ${colors.semanticColors.background.primary} border-t ${colors.semanticColors.border.secondary} z-50`}>
        <div className="flex justify-around">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex flex-col items-center py-3 px-2 flex-1 ${
                  isActive 
                    ? `${colors.semanticColors.text.brandActive}` 
                    : `${colors.semanticColors.text.tertiary} ${colors.semanticColors.hover.text}`
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs mt-1">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
} 
