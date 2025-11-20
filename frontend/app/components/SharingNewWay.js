'use client';
import React from 'react';
import Image from 'next/image';

export default function SharingNewWay() {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-900 mb-6 md:mb-8 lg:mb-10 px-4" data-aos="fade-up">
          Sharing is the 21st century&apos;s new way of contribution to the community.
        </h2>
        
        <div className="space-y-6 md:space-y-8 text-base sm:text-lg text-blue-700 leading-relaxed mb-12 md:mb-16 max-w-4xl mx-auto px-4" data-aos="fade-up" data-aos-delay="100">
          <p data-aos="fade-up" data-aos-delay="200">
            In today&apos;s competitive job market, professional growth extends far beyond traditional education. It&apos;s about continuous skill development, industry-aligned training, and building networks that create meaningful career opportunities and lasting success.
          </p>
          <p data-aos="fade-up" data-aos-delay="300">
            Modern workforce development is about building engaged professional communities where everyone has opportunities to grow. Whether through comprehensive training, industry mentorship, or direct placement support, we&apos;re all part of creating a more skilled and successful workforce.
          </p>
        </div>

        {/* Call to Action */}
        <div className="flex items-center justify-center gap-3 mb-16" data-aos="fade-up" data-aos-delay="400">
          <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" data-aos="zoom-in" data-aos-delay="500">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <p className="text-sm sm:text-base md:text-lg text-blue-800 font-semibold text-center px-4" data-aos="fade-up" data-aos-delay="600">
            Train. Develop. Place. Together, we build successful careers.
          </p>
        </div>

        {/* Main Image */}
        <div className="rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl" data-aos="zoom-in" data-aos-delay="700">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="Workforce Development and Career Growth"
              fill
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

