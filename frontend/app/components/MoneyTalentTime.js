'use client';
import React from 'react';

export default function MoneyTalentTime() {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Large Text */}
          <div className="relative" data-aos="fade-right">
            <div className="text-[140px] md:text-[180px] font-bold text-blue-200 leading-[0.9] opacity-40" data-aos="fade-up" data-aos-delay="100">
              MONEY
              <br />
              TALENT
              <br />
              TIME
              <br />
              MIND
            </div>
            {/* Decorative circle */}
            <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 w-72 h-72 border border-blue-200 rounded-full opacity-30" data-aos="fade-up" data-aos-delay="200"></div>
          </div>

          {/* Right: Image */}
          <div className="rounded-[40px] overflow-hidden shadow-2xl" data-aos="fade-left">
            <div className="w-full h-[500px] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center" data-aos="zoom-in" data-aos-delay="100">
              <div className="text-gray-400 text-xl">Hands Together Image</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

