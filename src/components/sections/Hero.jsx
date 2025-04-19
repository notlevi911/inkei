import React from 'react';
import { BackgroundBeams } from '../ui/background-beams';
import Button from '../ui/button';

const Hero = () => {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center">
      <div className="h-full w-full bg-gradient-to-b from-slate-900 to-slate-800 relative flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-600 mb-6 leading-tight">
            Elevate Your Digital Experience
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg md:text-xl mb-8">
            Explore a new dimension of digital solutions with our cutting-edge platform. 
            Streamlined workflows, powerful insights, and seamless integration to transform your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <Button variant="primary" size="large" className="min-w-32 sm:min-w-40">
              Get Started
            </Button>
            <Button variant="outline" size="large" className="min-w-32 sm:min-w-40 border-white text-white hover:bg-slate-800">
              Learn More
            </Button>
          </div>
          
          <div className="mt-16 relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg blur-sm opacity-75"></div>
            <div className="relative bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shadow-xl">
              <img 
                src="/api/placeholder/1200/600" 
                alt="Dashboard Preview" 
                className="w-full h-auto rounded-lg opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
        <BackgroundBeams />
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" 
          height="32" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          className="text-white"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;