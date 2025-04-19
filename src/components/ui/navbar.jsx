import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import Button from './button';

const Navbar = ({ className }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/90 backdrop-blur-md py-3 shadow-lg" 
          : "bg-transparent py-5",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className={cn(
                "text-2xl font-bold transition-colors", 
                scrolled ? "text-indigo-600" : "text-white"
              )}>
                Zenith
              </span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="#features" className={cn(
              "text-sm font-medium transition-colors hover:text-indigo-500",
              scrolled ? "text-slate-700" : "text-white"
            )}>
              Features
            </a>
            <a href="#testimonials" className={cn(
              "text-sm font-medium transition-colors hover:text-indigo-500",
              scrolled ? "text-slate-700" : "text-white"
            )}>
              Testimonials
            </a>
            <a href="#pricing" className={cn(
              "text-sm font-medium transition-colors hover:text-indigo-500",
              scrolled ? "text-slate-700" : "text-white"
            )}>
              Pricing
            </a>
            <a href="#faq" className={cn(
              "text-sm font-medium transition-colors hover:text-indigo-500",
              scrolled ? "text-slate-700" : "text-white"
            )}>
              FAQ
            </a>
            <a href="#contact" className={cn(
              "text-sm font-medium transition-colors hover:text-indigo-500",
              scrolled ? "text-slate-700" : "text-white"
            )}>
              Contact
            </a>
          </div>
          
          {/* Login/Signup Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            <a href="/login">
              <Button 
                variant="ghost" 
                size="small"
                className={cn(
                  scrolled ? "text-slate-700" : "text-white"
                )}
              >
                Login
              </Button>
            </a>
            <a href="/signup">
              <Button variant="primary" size="small">
                Sign up
              </Button>
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className={cn(
                "inline-flex items-center justify-center p-2 rounded-md focus:outline-none",
                scrolled ? "text-slate-700 hover:text-slate-900" : "text-white hover:text-gray-200"
              )}
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
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
          <a
            href="#features"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
          >
            Features
          </a>
          <a
            href="#testimonials"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
          >
            Testimonials
          </a>
          <a
            href="#pricing"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
          >
            FAQ
          </a>
          <a
            href="#contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
          >
            Contact
          </a>
          <div className="pt-4 pb-3 border-t border-slate-200">
            <div className="flex items-center px-5">
              <a href="/login" className="block w-full">
                <Button variant="ghost" className="w-full mb-2">
                  Login
                </Button>
              </a>
            </div>
            <div className="flex items-center px-5">
              <a href="/signup" className="block w-full">
                <Button variant="primary" className="w-full">
                  Sign up
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;