'use client';
import React from 'react';
import Image from 'next/image';

export default function MoneyTalentTime() {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Large Text */}
          <div className="relative order-2 lg:order-1" data-aos="fade-right">
            <div className="text-[60px] sm:text-[80px] md:text-[120px] lg:text-[140px] xl:text-[180px] font-bold text-blue-200 leading-[0.9] opacity-40 text-center lg:text-left" data-aos="fade-up" data-aos-delay="100">
              INVEST
              <br />
              TRAIN
              <br />
              GROW
              <br />
              SUCCEED
            </div>
            {/* Decorative circle */}
            <div className="hidden lg:block absolute -right-12 top-1/2 transform -translate-y-1/2 w-72 h-72 border border-blue-200 rounded-full opacity-30" data-aos="fade-up" data-aos-delay="200"></div>
          </div>

          {/* Right: Image */}
          <div className="rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl order-1 lg:order-2 mb-8 lg:mb-0" data-aos="fade-left">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300" data-aos="zoom-in" data-aos-delay="100">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                alt="Professional Development and Training"
                fill
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent flex items-end p-4 sm:p-6 md:p-8">
                <div className="text-white">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 md:mb-2">Building Careers</h3>
                  <p className="text-sm sm:text-base md:text-lg">Through strategic investment in talent development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

