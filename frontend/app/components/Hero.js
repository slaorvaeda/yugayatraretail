'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const rightContentRef = useRef(null);

  useEffect(() => {
    // Hero section entrance animation
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    // Staggered animation for cards and content
    gsap.fromTo([leftCardRef.current, rightCardRef.current, rightContentRef.current],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.5,
        ease: "power2.out"
      }
    );

    // Floating animation for cards
    gsap.to([leftCardRef.current, rightCardRef.current], {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 2,
      stagger: 0.3
    });
  }, []);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center pt-20 px-2 sm:px-3 lg:px-4 relative z-10"
      data-aos="fade-up"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Mobile Design - Different Layout */}
        <div className="lg:hidden">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              <span className="text-black">Shaping Tomorrow&apos;s</span>
              <br />
              <span className="text-blue-500">Workforce Today</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed px-4">
              Empowering businesses with cutting-edge technology solutions and expert support.
            </p>
            <div className="flex flex-col gap-3 px-4 mb-8">
              <button className="px-6 py-3 bg-blue-500 text-white text-base font-semibold rounded-full hover:bg-blue-600 transition-all duration-300 shadow-lg">
                Get Started
              </button>
              <button className="px-6 py-3 border-2 border-blue-500 text-blue-500 text-base font-semibold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Mobile Cards - Stacked Vertically */}
          <div className="space-y-4 px-2">
            <div 
              ref={leftCardRef}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-blue-100"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-blue-900">Innovation</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Cutting-edge technology solutions that revolutionize how businesses operate.
              </p>
            </div>

            <div 
              ref={rightCardRef}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-blue-100"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-blue-900">Connectivity</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Seamless integration and global connectivity worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Design - Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_1.2fr] gap-3 xl:gap-4 items-center">
          
          {/* Left Side - Two Cards */}
          <div className="space-y-3 pr-2 pl-6 xl:pl-8">
            {/* Left Card */}
            <div 
              ref={leftCardRef}
              className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-900">Innovation</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Cutting-edge technology solutions that revolutionize how businesses operate and connect globally.
              </p>
            </div>

            {/* Right Card */}
            <div 
              ref={rightCardRef}
              className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-900">Connectivity</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Seamless integration and global connectivity that brings people and businesses together worldwide.
              </p>
            </div>
          </div>

          {/* Right Side - Content */}
          <div ref={rightContentRef} className="text-left pl-2 xl:pl-4" data-aos="fade-left" data-aos-delay="150">
            <h1 className="text-6xl font-bold mb-8 leading-tight">
              <span className="text-black" data-aos="fade-up" data-aos-delay="250">Shaping Tomorrow&apos;s</span>
              <br />
              <span className="text-blue-500" data-aos="fade-up" data-aos-delay="350">Workforce Today</span>
            </h1>

            <p className="text-lg text-gray-600 mb-12 leading-relaxed" data-aos="fade-up" data-aos-delay="450">
              Empowering businesses and individuals with cutting-edge technology solutions, 
              Yugayatra connects you to the latest innovations, seamless integrations, 
              and expert support.
            </p>

            <div className="flex flex-row gap-4 justify-start" data-aos="fade-up" data-aos-delay="550">
              <button className="px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-full hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Get Started
              </button>
              <button className="px-8 py-4 border-2 border-blue-500 text-blue-500 text-lg font-semibold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
