'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const ribbonRef = useRef(null);
  const textRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    // Section entrance animation
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    // Ribbon animation
    gsap.fromTo(ribbonRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, delay: 0.5, ease: "power2.out" }
    );

    // Text and contact staggered animation
    gsap.fromTo([textRef.current, contactRef.current],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.3,
        delay: 1,
        ease: "power2.out"
      }
    );
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-white flex items-center py-12 lg:py-20 px-4 sm:px-6"
      data-aos="fade-up"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Mobile Design - Different Layout */}
        <div className="lg:hidden space-y-8">
          {/* Mobile Header */}
          <div className="text-center mb-6">
            <div className="text-sm text-gray-600 font-medium mb-3" data-aos="fade-up" data-aos-delay="100">
              Discover the <span className="text-blue-500 font-semibold">Yugayatra</span> advantage
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-black leading-tight mb-4" data-aos="fade-up" data-aos-delay="200">
              WORKFORCE
              <br />
              DEVELOPMENT
            </h1>
          </div>

          {/* Mobile Services Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6" data-aos="fade-up" data-aos-delay="300">
            {['TRAINING', 'SKILL DEV', 'CAREER', 'CERTIFICATION'].map((service, idx) => (
              <div key={idx} className="bg-blue-50 rounded-lg p-3 text-center border border-blue-100">
                <span className="text-xs font-bold text-blue-700">{service}</span>
              </div>
            ))}
          </div>

          {/* Mobile Description */}
          <div ref={textRef} className="text-center px-4" data-aos="fade-up" data-aos-delay="400">
            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              Your trusted partner in workforce development and skill enhancement.
            </p>
          </div>

          {/* Mobile Contact Box */}
          <div ref={contactRef} className="px-4" data-aos="fade-up" data-aos-delay="500">
            <div className="bg-blue-600 rounded-xl p-6 shadow-xl relative">
              <div className="text-white space-y-4 text-center">
                <p className="text-sm">Ready to transform your career?</p>
                <div className="text-xl font-bold">Get Started Today</div>
                <button className="w-full bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Design - Original Layout (Unchanged) */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Main Content */}
          <div className="space-y-8">
            {/* Top Headline */}
            <div className="text-lg text-gray-700 font-medium" data-aos="fade-right" data-aos-delay="100">
              Discover the <span className="text-blue-500 font-semibold">Yugayatra</span> advantage in-
            </div>

            {/* Main Service Title with Ribbon */}
            <div className="relative">
              <h1 className="text-9xl font-black text-black leading-none" data-aos="fade-up" data-aos-delay="200">
                <span className="relative z-10" data-aos="fade-up" data-aos-delay="300">WORKFORCE</span>
                <br />
                <span className="relative z-10" data-aos="fade-up" data-aos-delay="400">DEVELOPMENT.</span>
              </h1>
              
              {/* Blue Ribbon - positioned to weave through text */}
              <div 
                ref={ribbonRef}
                className="absolute top-8 left-0 w-full h-16 bg-blue-500 shadow-xl transform rotate-1 z-20"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)'
                }}
                data-aos="slide-right"
                data-aos-delay="500"
              >
                <div className="flex items-center justify-center h-full px-4 space-x-6 overflow-hidden">
                  {/* Service Icons and Text - workforce development services */}
                  <div className="flex items-center space-x-1 text-white" data-aos="fade-in" data-aos-delay="600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                    <span className="text-xs font-bold">TRAINING</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-white" data-aos="fade-in" data-aos-delay="650">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-xs font-bold">SKILL DEV</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-white" data-aos="fade-in" data-aos-delay="700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-xs font-bold">CAREER</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-white" data-aos="fade-in" data-aos-delay="750">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-xs font-bold">CERTIFICATION</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-white" data-aos="fade-in" data-aos-delay="800">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-xs font-bold">PLACEMENT</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-white" data-aos="fade-in" data-aos-delay="850">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-xs font-bold">MENTORING</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Left Text */}
            <div ref={textRef} className="text-gray-700 text-base leading-relaxed max-w-md" data-aos="fade-up" data-aos-delay="900">
              Where your career growth and professional success are our Priority. Your Trusted partner in workforce development and skill enhancement.
            </div>
          </div>

          {/* Right Side - Contact Box */}
          <div ref={contactRef} className="flex justify-end lg:mr-20" data-aos="fade-left" data-aos-delay="1000">
            <div className="bg-blue-600 rounded-2xl p-8 shadow-2xl relative max-w-sm w-full" data-aos="zoom-in" data-aos-delay="1100">
              {/* Arrow Icon */}
              <div className="absolute top-4 right-4" data-aos="fade-in" data-aos-delay="1200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
              
              {/* Contact Content */}
              <div className="text-white space-y-4">
                <p className="text-sm" data-aos="fade-up" data-aos-delay="1300">Ready to transform your career-</p>
                <div className="text-2xl font-bold" data-aos="fade-up" data-aos-delay="1400">Get Started Today</div>
                <button className="w-full bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300" data-aos="zoom-in" data-aos-delay="1500">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
