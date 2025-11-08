'use client';
import React from 'react';

export default function SharingIsCaring() {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Images */}
          <div className="relative" data-aos="fade-right">
            {/* Decorative circle */}
            <div className="absolute -left-12 -top-12 w-72 h-72 border border-gray-200 rounded-full opacity-30" data-aos="fade-up" data-aos-delay="100"></div>
            
            {/* Stacked images */}
            <div className="relative space-y-8" data-aos="fade-up" data-aos-delay="200">
              {/* Top image */}
              <div className="rounded-[40px] overflow-hidden shadow-2xl" data-aos="zoom-in" data-aos-delay="300">
                <div className="w-full h-[400px] bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200"></div>
              </div>
              
              {/* Bottom image - offset */}
              <div className="rounded-[40px] overflow-hidden shadow-2xl -ml-12" data-aos="zoom-in" data-aos-delay="400">
                <div className="w-full h-[400px] bg-gradient-to-br from-red-50 via-red-100 to-red-200"></div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="text-right" data-aos="fade-left">
            <h2 className="text-5xl md:text-6xl font-bold text-blue-900 mb-8" data-aos="fade-up" data-aos-delay="100">
              Sharing is Caring
            </h2>
            <p className="text-lg text-blue-700 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
              We believe in the power of community. When we come together to support one another, we create something greater than ourselves. Through sharing our resources, time, and energy, we build a foundation for lasting change that extends far beyond our immediate reach.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

