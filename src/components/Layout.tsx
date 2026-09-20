import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, sidebar }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <a
        href="#main-content"
        className="sr-only z-[60] rounded-md bg-white px-4 py-2 text-crimson-700 shadow focus:not-sr-only focus:fixed focus:left-4 focus:top-4 dark:bg-gray-800 dark:text-crimson-300"
      >
        Skip to main content
      </a>
      <Header />
      
      <main id="main-content" tabIndex={-1} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid grid-cols-1 gap-8 ${sidebar ? 'lg:grid-cols-4' : ''}`}>
          {/* Sidebar */}
          {sidebar && (
            <div className="lg:col-start-4 lg:row-start-1">
              {sidebar}
            </div>
          )}

          {/* Main Content */}
          <div className={sidebar ? 'lg:col-span-3 lg:col-start-1 lg:row-start-1' : ''}>
            {children}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="mb-2">
              Built with ❤️ using React, Vite, and Tailwind CSS
            </p>
            <p className="text-sm">
              © {new Date().getFullYear()} Aldo's Blog. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
