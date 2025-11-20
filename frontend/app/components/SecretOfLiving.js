'use client';
import React from 'react';
import Image from 'next/image';

export default function SecretOfLiving() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16 overflow-x-hidden" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-6 md:mb-8 lg:mb-10 text-center lg:text-left" data-aos="fade-up">
              The Secret of Success is Continuous Learning
            </h2>
            <div className="space-y-6 md:space-y-8 text-base sm:text-lg text-blue-700 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
              <p data-aos="fade-up" data-aos-delay="200">
                True career success comes not from what we already know, but from our commitment to continuous learning and growth. When we invest in developing our skills, we create opportunities that transform lives and drive innovation in ways that create lasting impact.
              </p>
              <p data-aos="fade-up" data-aos-delay="300">
                At Yugayatra Retail, we believe that every individual has the potential to excel. Through our industry-aligned training programs, mentorship initiatives, and placement support, we transform challenges into opportunities, obstacles into stepping stones, and individual potential into professional success stories.
              </p>
            </div>
          </div>

          {/* Right: Image */}
          <div className="rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl order-1 lg:order-2 mb-8 lg:mb-0" data-aos="fade-left" data-aos-delay="200">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
              <Image
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
                alt="Continuous Learning and Growth"
                fill
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

