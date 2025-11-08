'use client';
import React from 'react';

export default function AboutHero() {
  return (
    <section className="min-h-screen bg-gray-50 pt-8 pb-16 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="max-w-7xl mx-auto">
        

        {/* About Title Section */}
        <div className="relative mb-16 md:mb-24 lg:mb-32 my-6 md:my-8 lg:my-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start">
            {/* Left: Title Block */}
            <div className="pt-8" data-aos="fade-right">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-blue-900 mb-6 leading-tight" data-aos="fade-up" data-aos-delay="100">
                About
              </h1>
              <p className="text-xl text-blue-700 mb-12" data-aos="fade-up" data-aos-delay="200">
                We will kindly assist you anytime.
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

            {/* Right: Large ABOUT 108 Graphic */}
            <div className="relative h-[300px] md:h-[400px] lg:h-[600px] flex items-center justify-center lg:justify-start" data-aos="fade-left">
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
              
              {/* 108 Graphic */}
              <div className="relative z-10 flex items-center gap-2 md:gap-3 ml-0 lg:ml-40 scale-50 md:scale-75 lg:scale-100" data-aos="fade-up" data-aos-delay="300">
                {/* Number 1 */}
                <div className="w-6 md:w-8 lg:w-12 h-[240px] md:h-[320px] lg:h-[480px] bg-blue-300 rounded" data-aos="fade-right" data-aos-delay="400"></div>
                
                {/* First 0 - Circle */}
                <div className="w-[240px] h-[240px] md:w-[320px] md:h-[320px] lg:w-[480px] lg:h-[480px] rounded-full bg-white shadow-xl overflow-hidden relative" data-aos="zoom-in" data-aos-delay="500">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl md:text-6xl lg:text-8xl font-bold text-blue-400">0</div>
                  </div>
                </div>
                
                {/* Second 0 - Circle */}
                <div className="w-[240px] h-[240px] md:w-[320px] md:h-[320px] lg:w-[480px] lg:h-[480px] rounded-full bg-white shadow-xl overflow-hidden relative" data-aos="zoom-in" data-aos-delay="600">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl md:text-6xl lg:text-8xl font-bold text-blue-500">0</div>
                  </div>
                </div>
                
                {/* Number 8 */}
                <div className="relative" data-aos="zoom-in" data-aos-delay="700">
                  <div className="w-[240px] h-[240px] md:w-[320px] md:h-[320px] lg:w-[480px] lg:h-[480px] rounded-full bg-white shadow-xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl md:text-6xl lg:text-8xl font-bold text-blue-600">8</div>
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

