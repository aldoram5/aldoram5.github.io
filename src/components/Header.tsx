import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const navigation = [
  { name: 'Latest Posts', href: '/' },
  { name: 'Resume', href: '/resume/' },
  { name: 'About', href: '/about/' },
  { name: 'Projects', href: '/projects/' },
] as const;

function navClassName(isActive: boolean, mobile = false): string {
  const size = mobile ? 'block px-3 py-2 text-base' : 'px-3 py-2 text-sm';
  const color = isActive
    ? 'bg-crimson-50 text-crimson-700 dark:bg-crimson-900/20 dark:text-crimson-400'
    : 'text-gray-700 hover:bg-gray-50 hover:text-crimson-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-crimson-400';
  return `${size} rounded-md font-medium transition-colors ${color}`;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-bold text-crimson-600 transition-colors hover:text-crimson-700">
            Aldo's Blog
          </Link>

          <nav className="hidden space-x-8 md:flex" aria-label="Primary navigation">
            {navigation.map((item) => (
              <NavLink key={item.name} to={item.href} end={item.href === '/'} className={({ isActive }) => navClassName(isActive)}>
                {item.name}
              </NavLink>
            ))}
            <a href="https://crimsonrgames.com" className={navClassName(false)}>Main Site</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-crimson-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-crimson-400"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light'
                ? <Moon className="h-5 w-5" aria-hidden="true" />
                : <Sun className="h-5 w-5" aria-hidden="true" />}
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-crimson-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-crimson-400 md:hidden"
              aria-label={`${isMenuOpen ? 'Close' : 'Open'} navigation menu`}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen
                ? <X className="h-5 w-5" aria-hidden="true" />
                : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <nav id="mobile-navigation" className={isMenuOpen ? 'border-t border-gray-200 pb-3 pt-2 dark:border-gray-700 md:hidden' : 'hidden'} aria-label="Mobile navigation">
          <div className="space-y-1 px-2">
            {navigation.map((item) => (
              <NavLink key={item.name} to={item.href} end={item.href === '/'} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => navClassName(isActive, true)}>
                {item.name}
              </NavLink>
            ))}
            <a href="https://crimsonrgames.com" className={navClassName(false, true)}>Main Site</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
