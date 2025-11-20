'use client';
import React from 'react';
import Image from 'next/image';

export default function FourDSharing() {
  const sharingTypes = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Development',
      description: 'Comprehensive skill development programs'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: 'Certification',
      description: 'Industry-recognized certifications'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Placement',
      description: 'Direct placement opportunities'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Dedicated',
      description: 'Committed to your career success'
    }
  ];

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Title and Image */}
          <div className="relative" data-aos="fade-right">
            <div className="mb-10" data-aos="fade-up" data-aos-delay="100">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-2 md:mb-3 text-center lg:text-left" data-aos="fade-up" data-aos-delay="200">
                4D Sharing
              </h2>
              <p className="text-base sm:text-lg text-blue-700 text-center lg:text-left" data-aos="fade-up" data-aos-delay="300">
                Our Core Services
              </p>
            </div>
            
            {/* Main Image */}
            <div className="rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl mb-8 lg:mb-0" data-aos="zoom-in" data-aos-delay="400">
              <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                  alt="Professional Training Programs"
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
              </div>
            </div>
            
            {/* Decorative circle */}
            <div className="hidden md:block absolute -left-12 -top-12 w-72 h-72 border border-gray-200 rounded-full opacity-30" data-aos="fade-up" data-aos-delay="500"></div>
          </div>

          {/* Right: Icon Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" data-aos="fade-left">
            {sharingTypes.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl sm:rounded-3xl md:rounded-[30px] p-6 sm:p-8 shadow-lg border border-blue-100 flex flex-col items-center justify-center text-center min-h-[160px] sm:h-[180px] md:h-[200px]"
                data-aos="zoom-in"
                data-aos-delay={`${(index + 1) * 100}`}
              >
                <div className="text-blue-600 mb-3 sm:mb-4 md:mb-5 flex items-center justify-center" data-aos="fade-up" data-aos-delay={`${(index + 1) * 100 + 50}`}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">{item.icon}</div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-1 md:mb-2" data-aos="fade-up" data-aos-delay={`${(index + 1) * 100 + 100}`}>{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 px-2" data-aos="fade-up" data-aos-delay={`${(index + 1) * 100 + 150}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

