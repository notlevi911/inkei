import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import Button from './button';

const Navbar = ({ className }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'bg-white/30 backdrop-blur-xl border-b border-white/20 shadow-md',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-700 dark:text-white">
                Zenith
              </span>
            </a>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {['features', 'testimonials', 'pricing', 'faq', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-sm font-medium text-slate-800 hover:text-indigo-600 transition-colors"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-3">
            {user ? (
              <>
                <span className="text-sm font-medium text-slate-800 dark:text-white">
                  Welcome, {user.fullName}
                </span>
                <Button variant="ghost" size="small" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <a href="/login">
                  <Button variant="ghost" size="small" className="text-slate-800">
                    Login
                  </Button>
                </a>
                <a href="/signup">
                  <Button variant="primary" size="small">
                    Sign up
                  </Button>
                </a>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-800 hover:text-indigo-600 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 pt-4 pb-3 bg-white/80 backdrop-blur-md border-t border-slate-200 shadow-md">
          {['features', 'testimonials', 'pricing', 'faq', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:text-indigo-600 hover:bg-slate-100"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
          <div className="mt-4 border-t border-slate-300 pt-4">
            {user ? (
              <>
                <p className="px-3 text-slate-800 mb-2">Welcome, {user.fullName}</p>
                <Button variant="ghost" className="w-full mb-2" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <a href="/login" className="block w-full mb-2">
                  <Button variant="ghost" className="w-full">
                    Login
                  </Button>
                </a>
                <a href="/signup" className="block w-full">
                  <Button variant="primary" className="w-full">
                    Sign up
                  </Button>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
