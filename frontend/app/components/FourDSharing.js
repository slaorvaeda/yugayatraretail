'use client';
import React from 'react';

export default function FourDSharing() {
  const sharingTypes = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      ),
      title: 'Designated',
      description: 'Purposeful allocation of resources'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Delighted',
      description: 'Creating joy and satisfaction'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: 'Dedicated',
      description: 'Committed to making a difference'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      ),
      title: 'Disposed',
      description: 'Ready to contribute and help'
    }
  ];

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Title and Image */}
          <div className="relative" data-aos="fade-right">
            <div className="mb-10" data-aos="fade-up" data-aos-delay="100">
              <h2 className="text-5xl md:text-6xl font-bold text-blue-900 mb-3" data-aos="fade-up" data-aos-delay="200">
                4D Sharing
              </h2>
              <p className="text-lg text-blue-700" data-aos="fade-up" data-aos-delay="300">
                In the 21st century
              </p>
            </div>
            
            {/* Main Image */}
            <div className="rounded-[40px] overflow-hidden shadow-2xl" data-aos="zoom-in" data-aos-delay="400">
              <div className="w-full h-[450px] bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200"></div>
            </div>
            
            {/* Decorative circle */}
            <div className="absolute -left-12 -top-12 w-72 h-72 border border-gray-200 rounded-full opacity-30" data-aos="fade-up" data-aos-delay="500"></div>
          </div>

          {/* Right: Icon Cards */}
          <div className="grid grid-cols-2 gap-6" data-aos="fade-left">
            {sharingTypes.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[30px] p-8 shadow-lg border border-blue-100 flex flex-col items-center justify-center text-center h-[200px]"
                data-aos="zoom-in"
                data-aos-delay={`${(index + 1) * 100}`}
              >
                <div className="text-blue-600 mb-5" data-aos="fade-up" data-aos-delay={`${(index + 1) * 100 + 50}`}>{item.icon}</div>
                <h3 className="text-xl font-semibold text-blue-900" data-aos="fade-up" data-aos-delay={`${(index + 1) * 100 + 100}`}>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

