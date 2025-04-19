import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { BackgroundBeams } from '../ui/background-beams';

const DashboardLayout = ({ children, title, description }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="pt-20">
        {/* Header Section with gradient background */}
        <section className="relative py-12 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-600 mb-4">
                {title}
              </h1>
              {description && (
                <p className="text-slate-300 max-w-3xl mx-auto">
                  {description}
                </p>
              )}
            </div>
          </div>
          <BackgroundBeams />
        </section>

        {/* Content */}
        <div className="flex-grow">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
