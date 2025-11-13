'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ExactImageMatch from './ExactImageMatch';

export default function ExactImagePage() {
  const pageRef = useRef(null);
  const textBlocksRef = useRef([]);

  useEffect(() => {
    // Page entrance animation
    gsap.fromTo(pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power3.out" }
    );

    // Staggered text blocks animation - exact timing like image
    gsap.fromTo(textBlocksRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.4,
        delay: 1.5,
        ease: "power2.out"
      }
    );
  }, []);

  return (
    <div 
      ref={pageRef}
      className="min-h-screen relative overflow-hidden"
      data-aos="fade-up"
    >
      {/* Exact Network Graphic from Image */}
      <ExactImageMatch />
      
      {/* Mobile Design - Different Layout */}
      <div className="lg:hidden absolute top-20 left-0 right-0 z-10 px-4" data-aos="fade-up" data-aos-delay="100">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Mobile: Single Column Stacked Cards */}
          <div 
            ref={el => textBlocksRef.current[0] = el}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-blue-100"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="text-lg font-bold text-blue-600 mb-3">
              Advanced Technology
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Cutting-edge solutions that revolutionize how businesses operate and provide unprecedented scalability.
            </p>
          </div>

          <div 
            ref={el => textBlocksRef.current[1] = el}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-blue-100"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h3 className="text-lg font-bold text-blue-600 mb-3">
              Global Connectivity
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Connect with partners worldwide through secure, high-performance network infrastructure.
            </p>
          </div>

          <div 
            ref={el => textBlocksRef.current[2] = el}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-blue-100"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <h3 className="text-lg font-bold text-blue-600 mb-3">
              Future Innovation
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Pioneering the next generation of digital transformation with revolutionary business solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Design - Original Layout (Unchanged) */}
      <div className="hidden lg:block absolute top-16 left-0 right-0 z-10 px-8" data-aos="fade-up" data-aos-delay="100">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-12">
          {/* Text Block 1 - blue theme styling */}
          <div 
            ref={el => textBlocksRef.current[0] = el}
            className="text-gray-900 space-y-3"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <h3 className="text-base font-semibold text-blue-600 mb-2" data-aos="fade-up" data-aos-delay="300">
              Advanced Technology
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="400">
              Cutting-edge solutions that revolutionize how businesses operate. 
              Our platform integrates seamlessly with existing systems and provides 
              unprecedented scalability for modern enterprises.
            </p>
          </div>

          {/* Text Block 2 - blue theme styling */}
          <div 
            ref={el => textBlocksRef.current[1] = el}
            className="text-gray-900 space-y-3"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <h3 className="text-base font-semibold text-blue-600 mb-2" data-aos="fade-up" data-aos-delay="600">
              Global Connectivity
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="700">
              Connect with partners worldwide through our secure, 
              high-performance network infrastructure. Experience 
              lightning-fast data transfer and real-time collaboration.
            </p>
          </div>

          {/* Text Block 3 - blue theme styling */}
          <div 
            ref={el => textBlocksRef.current[2] = el}
            className="text-gray-900 space-y-3"
            data-aos="fade-left"
            data-aos-delay="800"
          >
            <h3 className="text-base font-semibold text-blue-600 mb-2" data-aos="fade-up" data-aos-delay="900">
              Future Innovation
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="1000">
              Pioneering the next generation of digital transformation. 
              Experience tomorrow&apos;s technology today with our revolutionary 
              approach to modern business solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Subtle grid pattern overlay - blue theme */}
      <div className="absolute inset-0 opacity-3" data-aos="fade-in" data-aos-delay="1100">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(157, 194, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(84, 148, 251, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>
    </div>
  );
}
