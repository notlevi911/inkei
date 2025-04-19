import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Testimonials from '../components/sections/Testimonials';
import Pricing from '../components/sections/Pricing';
import FAQ from '../components/sections/FAQ';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;