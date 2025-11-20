'use client';
import React from 'react';
import Image from 'next/image';

export default function AboutHero() {
  return (
    <section className="min-h-screen bg-gray-50 pt-8 pb-16 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Mobile Design - Separate Layout */}
        <div className="lg:hidden">
          <div className="flex flex-col items-center text-center py-8">
            {/* Mobile: Logo First */}
            <div className="mb-8" data-aos="fade-down" data-aos-delay="100">
              <div className="relative w-48 h-48 rounded-full bg-white shadow-2xl overflow-hidden border-4 border-blue-200 mx-auto">
                <Image
                  src="/logo.png"
                  alt="Yugayatra Retail Logo"
                  fill
                  className="object-contain p-6"
                  priority
                />
              </div>
            </div>

            {/* Mobile: Title */}
            <h1 className="text-5xl font-bold text-blue-900 mb-4 leading-tight" data-aos="fade-up" data-aos-delay="200">
              About
            </h1>

            {/* Mobile: Company Name */}
            <h2 className="text-2xl font-bold text-blue-900 mb-6" data-aos="fade-up" data-aos-delay="300">
              yugayatraretail
            </h2>

            {/* Mobile: Description */}
            <p className="text-base text-blue-700 mb-8 px-4 leading-relaxed max-w-md mx-auto" data-aos="fade-up" data-aos-delay="400">
              Empowering careers through innovative workforce development and industry-aligned training programs.
            </p>

            {/* Mobile: Two Circular Designs - Stacked */}
            <div className="flex flex-col gap-6 items-center mb-8" data-aos="fade-up" data-aos-delay="500">
              {/* First Circle */}
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 border-4 border-blue-400 shadow-xl flex items-center justify-center relative overflow-hidden" data-aos="zoom-in" data-aos-delay="600">
                {/* Rotating text around circle */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  <defs>
                    <path id="circle1-mobile" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
                  </defs>
                  <text fill="#1e40af" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="900">
                    <textPath href="#circle1-mobile" startOffset="0%">
                      yugayatra retail * yugayatra retail * yugayatra retail * yugayatra retail * yugayatra retail *
                    </textPath>
                  </text>
                </svg>
                {/* Center Icon/Logo */}
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-700"></div>
                  </div>
                </div>
              </div>
              
              {/* Second Circle */}
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 border-4 border-blue-500 shadow-xl flex items-center justify-center relative overflow-hidden" data-aos="zoom-in" data-aos-delay="700">
                {/* Rotating text around circle */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  <defs>
                    <path id="circle2-mobile" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
                  </defs>
                  <text fill="#1e3a8a" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="900">
                    <textPath href="#circle2-mobile" startOffset="0%">
                      yugayatra retail * yugayatra retail * yugayatra retail * yugayatra retail * yugayatra retail *
                    </textPath>
                  </text>
                </svg>
                {/* Center Icon/Logo */}
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-full bg-blue-700 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-800"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Design - Original Layout (Unchanged) */}
        <div className="hidden lg:block">
          <div className="relative mb-16 md:mb-24 lg:mb-32 my-6 md:my-8 lg:my-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start">
              {/* Left: Title Block */}
              <div className="pt-8" data-aos="fade-right">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-blue-900 mb-6 leading-tight" data-aos="fade-up" data-aos-delay="100">
                  About
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-blue-700 mb-8 sm:mb-10 md:mb-12" data-aos="fade-up" data-aos-delay="200">
                  Empowering careers through innovative workforce development and industry-aligned training programs.
                </p>
                
                {/* Yugayatraretail Text */}
                <div className="mb-6 md:mb-8" data-aos="fade-up" data-aos-delay="300">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-900 mb-6 md:mb-8" data-aos="fade-up" data-aos-delay="400">
                    yugayatraretail
                  </h2>
                  
                  {/* Two Circular Designs with Rotating Text */}
                  <div className="flex gap-4 md:gap-6 lg:gap-8 items-center justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="500">
                    {/* First Circle */}
                    <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 border-2 md:border-4 border-blue-400 shadow-xl flex items-center justify-center relative overflow-hidden" data-aos="zoom-in" data-aos-delay="600">
                      {/* Rotating text around circle */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                        <defs>
                          <path id="circle1" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
                        </defs>
                        <text fill="#1e40af" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="900">
                          <textPath href="#circle1" startOffset="0%">
                            yugayatra retail * yugayatra retail * yugayatra retail * yugayatra retail * yugayatra retail *
                          </textPath>
                        </text>
                      </svg>
                      {/* Center Icon/Logo */}
                      <div className="relative z-10">
                        <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-blue-600 flex items-center justify-center">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-blue-700"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Second Circle */}
                    <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 border-2 md:border-4 border-blue-500 shadow-xl flex items-center justify-center relative overflow-hidden" data-aos="zoom-in" data-aos-delay="700">
                      {/* Rotating text around circle */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                        <defs>
                          <path id="circle2" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
                        </defs>
                        <text fill="#1e3a8a" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="900">
                          <textPath href="#circle2" startOffset="0%">
                            yugayatra retail * yugayatra retail * yugayatra retail * yugayatra retail * yugayatra retail *
                          </textPath>
                        </text>
                      </svg>
                      {/* Center Icon/Logo */}
                      <div className="relative z-10">
                        <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-blue-700 flex items-center justify-center">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-blue-800"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Company Logo and Image */}
              <div className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[600px] flex items-center justify-center lg:justify-start mt-8 lg:mt-0" data-aos="fade-left">
                {/* Large ABOUT text - vertical */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 hidden lg:block" data-aos="fade-up" data-aos-delay="100">
                  <div 
                    className="text-[100px] md:text-[150px] lg:text-[220px] font-bold text-blue-200 leading-none opacity-40"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                    data-aos="fade-up" data-aos-delay="200"
                  >
                    ABOUT
                  </div>
                </div>
                
                {/* Company Logo and Image */}
                <div className="relative z-10 ml-0 lg:ml-40 scale-60 sm:scale-70 md:scale-90 lg:scale-100" data-aos="fade-up" data-aos-delay="300">
                  <div className="relative w-full h-full flex flex-col items-center justify-center gap-6 md:gap-8">
                    {/* Logo */}
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full bg-white shadow-2xl overflow-hidden border-2 md:border-4 border-blue-200" data-aos="zoom-in" data-aos-delay="400">
                      <Image
                        src="/logo.png"
                        alt="Yugayatra Retail Logo"
                        fill
                        className="object-contain p-4"
                        priority
                      />
                    </div>
                    
                    {/* Background Image - Workforce Development */}
                    <div className="absolute inset-0 -z-10 rounded-3xl overflow-hidden opacity-20" data-aos="zoom-in" data-aos-delay="500">
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

