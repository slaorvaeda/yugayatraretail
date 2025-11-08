'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Header() {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    // Header entrance animation
    gsap.fromTo(headerRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Staggered animation for header elements
    gsap.fromTo([logoRef.current, navRef.current, buttonsRef.current],
      { y: -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2, 
        delay: 0.3,
        ease: "power2.out" 
      }
    );
  }, []);

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div ref={logoRef} className="flex-shrink-0">
            <h1 className="text-xl font-bold text-blue-900">
              Yugayatra
            </h1>
          </div>

          {/* Navigation */}
          <nav ref={navRef} className="hidden md:flex items-center space-x-8">
            <a 
              href="#solutions" 
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300 font-medium"
            >
              Solution
            </a>
            <a 
              href="#resources" 
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300 font-medium"
            >
              Resource
            </a>
            <a 
              href="#company" 
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300 font-medium"
            >
              Company
            </a>
          </nav>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="flex items-center space-x-3">
            <button className="px-5 py-2 border border-blue-400 text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300 font-medium text-sm">
              Login
            </button>
            <button className="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
