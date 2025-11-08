'use client';
import React from 'react';

export default function SharingNewWay() {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-blue-900 mb-10" data-aos="fade-up">
          Sharing is the 21st century's new way of contribution to the community.
        </h2>
        
        <div className="space-y-8 text-lg text-blue-700 leading-relaxed mb-16 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          <p data-aos="fade-up" data-aos-delay="200">
            In today's world, contributing to the community extends far beyond traditional donations. It's about sharing your time, skills, knowledge, and resources in ways that create meaningful connections and lasting impact.
          </p>
          <p data-aos="fade-up" data-aos-delay="300">
            Modern contribution is about building engaged communities where everyone has something valuable to offer. Whether through mentorship, collaboration, or simply being present for others, we're all part of creating a more connected and supportive world.
          </p>
        </div>

        {/* Call to Action */}
        <div className="flex items-center justify-center gap-3 mb-16" data-aos="fade-up" data-aos-delay="400">
          <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" data-aos="zoom-in" data-aos-delay="500">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <p className="text-lg text-blue-800 font-semibold" data-aos="fade-up" data-aos-delay="600">
            Share. Support. Strengthen. Together, we can make a lasting impact.
          </p>
        </div>

        {/* Main Image */}
        <div className="rounded-[40px] overflow-hidden shadow-2xl" data-aos="zoom-in" data-aos-delay="700">
          <div className="w-full h-[500px] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        </div>
      </div>
    </section>
  );
}

