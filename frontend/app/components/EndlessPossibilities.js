'use client';
import React from 'react';
import Image from 'next/image';

export default function EndlessPossibilities() {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-6 md:mb-8 lg:mb-10 px-4" data-aos="fade-up" data-aos-delay="100">
            Endless Possibilities to Share
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 text-base sm:text-lg text-blue-700 leading-relaxed px-4" data-aos="fade-up" data-aos-delay="200">
            <p data-aos="fade-up" data-aos-delay="300">
              Every professional has unique potential waiting to be unlocked. Through our comprehensive training programs, industry partnerships, and career guidance, we create endless possibilities for skill development, career growth, and professional excellence.
            </p>
            <p data-aos="fade-up" data-aos-delay="400">
              Whether you&apos;re starting your career, transitioning between roles, or looking to upskill, our programs are designed to help you reach your goals. Together with our industry partners, we build stronger professional networks, support career development, and create opportunities where everyone can flourish.
            </p>
          </div>
        </div>

        {/* Image Grid with 108 Graphic */}
        <div className="relative mt-24" data-aos="fade-up" data-aos-delay="500">
          {/* 2x2 Image Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* Top Left - Training */}
            <div className="rounded-2xl sm:rounded-3xl md:rounded-[40px] overflow-hidden shadow-xl md:shadow-2xl" data-aos="zoom-in" data-aos-delay="600">
              <div className="relative w-full h-[180px] sm:h-[220px] md:h-[280px] lg:h-[350px] bg-gradient-to-br from-blue-50 to-blue-100">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
                  alt="Skill Training Programs"
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
              </div>
            </div>
            
            {/* Top Right - Certification */}
            <div className="rounded-2xl sm:rounded-3xl md:rounded-[40px] overflow-hidden shadow-xl md:shadow-2xl" data-aos="zoom-in" data-aos-delay="700">
              <div className="relative w-full h-[180px] sm:h-[220px] md:h-[280px] lg:h-[350px] bg-gradient-to-br from-blue-100 to-blue-200">
                <Image
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
                  alt="Industry Certifications"
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
              </div>
            </div>
            
            {/* Bottom Left - Career Guidance */}
            <div className="rounded-2xl sm:rounded-3xl md:rounded-[40px] overflow-hidden shadow-xl md:shadow-2xl" data-aos="zoom-in" data-aos-delay="800">
              <div className="relative w-full h-[180px] sm:h-[220px] md:h-[280px] lg:h-[350px] bg-gradient-to-br from-blue-200 to-blue-300">
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80"
                  alt="Career Guidance"
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
              </div>
            </div>
            
            {/* Bottom Right - Placement */}
            <div className="rounded-2xl sm:rounded-3xl md:rounded-[40px] overflow-hidden shadow-xl md:shadow-2xl" data-aos="zoom-in" data-aos-delay="900">
              <div className="relative w-full h-[180px] sm:h-[220px] md:h-[280px] lg:h-[350px] bg-gradient-to-br from-blue-300 to-blue-400">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80"
                  alt="Placement Support"
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Large 108 Graphic in Center */}
          <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" data-aos="fade-up" data-aos-delay="1000">
            <div className="text-[150px] md:text-[250px] lg:text-[350px] font-bold text-blue-200 leading-none opacity-40">
              108
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

