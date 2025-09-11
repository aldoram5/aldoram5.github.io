import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, sidebar }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {children}
          </div>
          
          {/* Sidebar */}
          {sidebar && (
            <div className="lg:col-span-1">
              {sidebar}
            </div>
          )}
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