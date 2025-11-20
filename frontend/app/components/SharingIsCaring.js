'use client';
import React from 'react';
import Image from 'next/image';

export default function SharingIsCaring() {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Images */}
          <div className="relative" data-aos="fade-right">
            {/* Decorative circle */}
            <div className="hidden md:block absolute -left-12 -top-12 w-72 h-72 border border-blue-200 rounded-full opacity-30" data-aos="fade-up" data-aos-delay="100"></div>
            
            {/* Stacked images */}
            <div className="relative space-y-6 md:space-y-8" data-aos="fade-up" data-aos-delay="200">
              {/* Top image - Training Session */}
              <div className="rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl" data-aos="zoom-in" data-aos-delay="300">
                <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                    alt="Workforce Training Session"
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
                </div>
              </div>
              
              {/* Bottom image - Career Guidance */}
              <div className="rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl ml-0 md:-ml-12" data-aos="zoom-in" data-aos-delay="400">
                <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
                  <Image
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
                    alt="Career Development"
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="text-center lg:text-right" data-aos="fade-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-6 md:mb-8" data-aos="fade-up" data-aos-delay="100">
              Sharing Knowledge is Empowering
            </h2>
            <p className="text-base sm:text-lg text-blue-700 leading-relaxed mb-4 md:mb-6" data-aos="fade-up" data-aos-delay="200">
              At Yugayatra Retail, we believe in the power of shared knowledge and collective growth. When industry experts, trainers, and learners come together, we create an ecosystem that transforms careers and drives innovation.
            </p>
            <p className="text-base sm:text-lg text-blue-700 leading-relaxed" data-aos="fade-up" data-aos-delay="300">
              Through our comprehensive training programs, mentorship initiatives, and industry partnerships, we build bridges between aspiring professionals and career opportunities that make a lasting impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

