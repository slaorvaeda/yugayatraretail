'use client';
import React from 'react';

export default function EndlessPossibilities() {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-5xl md:text-6xl font-bold text-blue-900 mb-10" data-aos="fade-up" data-aos-delay="100">
            Endless Possibilities to Share
          </h2>
          <div className="max-w-4xl mx-auto space-y-8 text-lg text-blue-700 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            <p data-aos="fade-up" data-aos-delay="300">
              Everyone has something valuable to share—whether it&apos;s time, money, skills, or simply kindness. These contributions, no matter how small they may seem, have the power to uplift, inspire, and transform lives.
            </p>
            <p data-aos="fade-up" data-aos-delay="400">
              When we pool our resources and combine our efforts, we unlock endless possibilities for creating positive change. Together, we can build stronger communities, support those in need, and create a world where everyone has the opportunity to flourish.
            </p>
          </div>
        </div>

        {/* Image Grid with 108 Graphic */}
        <div className="relative mt-24" data-aos="fade-up" data-aos-delay="500">
          {/* 2x2 Image Grid */}
          <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Top Left */}
            <div className="rounded-[40px] overflow-hidden shadow-2xl" data-aos="zoom-in" data-aos-delay="600">
              <div className="w-full h-[350px] bg-gradient-to-br from-blue-50 to-blue-100"></div>
            </div>
            
            {/* Top Right */}
            <div className="rounded-[40px] overflow-hidden shadow-2xl" data-aos="zoom-in" data-aos-delay="700">
              <div className="w-full h-[350px] bg-gradient-to-br from-green-50 to-green-100"></div>
            </div>
            
            {/* Bottom Left */}
            <div className="rounded-[40px] overflow-hidden shadow-2xl" data-aos="zoom-in" data-aos-delay="800">
              <div className="w-full h-[350px] bg-gradient-to-br from-purple-50 to-purple-100"></div>
            </div>
            
            {/* Bottom Right */}
            <div className="rounded-[40px] overflow-hidden shadow-2xl" data-aos="zoom-in" data-aos-delay="900">
              <div className="w-full h-[350px] bg-gradient-to-br from-pink-50 to-pink-100"></div>
            </div>
          </div>

          {/* Large 108 Graphic in Center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" data-aos="fade-up" data-aos-delay="1000">
            <div className="text-[250px] md:text-[350px] font-bold text-blue-200 leading-none opacity-40">
              108
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

