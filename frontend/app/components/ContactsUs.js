'use client';
import React from 'react';

export default function ContactsUs() {
  return (
    <section className="bg-white px-4 w-full" style={{ height: '90vh', minHeight: '90vh', maxHeight: '90vh' }}>
      <style jsx>{`
        @keyframes rotateText {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(2deg);
          }
          50% {
            transform: translateY(-20px) rotate(0deg);
          }
          75% {
            transform: translateY(-10px) rotate(-2deg);
          }
        }
        @keyframes rotateCircle {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .rotate-text {
          animation: rotateText 20s linear infinite;
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        .float-slow {
          animation: floatSlow 6s ease-in-out infinite;
        }
        .pulse-animation {
          animation: pulse 2s ease-in-out infinite;
        }
        .rotate-circle-1 {
          animation: rotateCircle 25s linear infinite;
        }
        .rotate-circle-2 {
          animation: rotateCircle 30s linear infinite reverse;
        }
        .rotate-circle-3 {
          animation: rotateCircle 35s linear infinite;
        }
        .hover-scale:hover {
          transform: scale(1.1);
          transition: transform 0.3s ease;
        }
      `}</style>
      <div className="w-full h-full flex flex-col">
    

        {/* Middle Section - Social Media & Consultation */}
        <div className="relative flex-grow mb-4 md:mb-8" style={{ minHeight: 0 }} data-aos="fade-up">
          {/* Social Media Pills */}
          <div className="relative w-full h-full">
            {/* VIMEO - Top Left */}
            <div className="absolute bottom-4 left-4 sm:left-12 md:left-12 z-30" data-aos="fade-right" data-aos-delay="100">
              <div className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full border-2 border-black bg-white text-black font-black text-xs sm:text-sm md:text-base whitespace-nowrap">
                freshin10
              </div>
            </div>

            {/* FACEBOOK - Top Center, Angled */}
            <div className="absolute bottom-8 left-1/4 sm:left-1/3 transform rotate-6 z-30 pointer-events-auto" data-aos="fade-up" data-aos-delay="200">
              <div className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full bg-black text-white font-black text-xs sm:text-sm md:text-base whitespace-nowrap shadow-lg">
                FACEBOOK
              </div>
            </div>

            {/* LINKEDIN - Top Right, Angled */}
            <div className="absolute top-12 right-4 sm:right-8 md:right-12 transform -rotate-6 z-30" data-aos="fade-left" data-aos-delay="300">
              <div className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full bg-black text-white font-black text-xs sm:text-sm md:text-base whitespace-nowrap">
                LINKEDIN
              </div>
            </div>

            {/* INSTAGRAM - Middle Left */}
            <div className="absolute top-40 left-1/4 sm:left-1/3 z-30" data-aos="fade-right" data-aos-delay="400">
              <div className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full border-2 border-black bg-white text-black font-black text-xs sm:text-sm md:text-base whitespace-nowrap">
                INSTAGRAM
              </div>
            </div>

            {/* TWITTER - Middle */}
            <div className="absolute top-48 left-1/2 transform -translate-x-1/2 z-30" data-aos="fade-up" data-aos-delay="500">
              <div className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full border-2 border-black bg-white text-black font-black text-xs sm:text-sm md:text-base whitespace-nowrap">
                TWITTER
              </div>
            </div>

            {/* PINTEREST - Lower Right */}
            <div className="absolute top-80 right-4 sm:right-8 md:right-56 z-30" data-aos="fade-left" data-aos-delay="600">
              <div className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full border-2 border-black bg-white text-black font-black text-xs sm:text-sm md:text-base whitespace-nowrap shadow-lg">
                PINTEREST
              </div>
            </div>

            {/* YOUTUBE - Lower Left */}
            <div className="absolute top-72 left-4 sm:left-8 md:left-76 z-30 pointer-events-auto" data-aos="fade-right" data-aos-delay="700">
              <div className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full border-2 border-black bg-white text-black font-black text-xs sm:text-sm md:text-base whitespace-nowrap shadow-lg">
                YOUTUBE
              </div>
            </div>

            {/* Consultation Circles - Various Sizes */}
            {/* Large Circle 1 - Black, Left */}
            <div className="absolute top-48 left-0 sm:left-4 md:left-8 z-20 float-animation hover-scale cursor-pointer" data-aos="zoom-in" data-aos-delay="800">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-black border-2 border-white flex items-center justify-center relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full rotate-circle-1" viewBox="0 0 200 200">
                  <defs>
                    <path id="circle1" d="M 100, 100 m -95, 0 a 95,95 0 1,1 190,0 a 95,95 0 1,1 -190,0" />
                  </defs>
                  <text fill="white" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="900">
                    <textPath href="#circle1" startOffset="0%">
                      Consult With Us * Consult With Us * Consult With Us * Consult With Us * Consult With Us *
                    </textPath>
                  </text>
                </svg>
                <div className="relative z-10 pulse-animation">
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Medium Circle 1 - White, Center */}
            <div className="absolute top-56 left-1/2 transform -translate-x-1/2 md:translate-x-12 z-10 float-slow hover-scale cursor-pointer" data-aos="zoom-in" data-aos-delay="900">
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-white border-2 border-black flex items-center justify-center relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full rotate-circle-2" viewBox="0 0 200 200">
                  <defs>
                    <path id="circle2" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                  </defs>
                  <text fill="black" fontSize="10" fontFamily="Arial, sans-serif" fontWeight="900">
                    <textPath href="#circle2" startOffset="0%">
                      Consult With Us * Consult With Us * Consult With Us * Consult With Us * Consult With Us *
                    </textPath>
                  </text>
                </svg>
                <div className="relative z-10 pulse-animation">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Large Circle 2 - Black, Right */}
            <div className="absolute top-64 right-0 sm:right-4 md:right-8 z-20 float-animation hover-scale cursor-pointer" style={{ animationDelay: '1s' }} data-aos="zoom-in" data-aos-delay="1000">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-black border-2 border-white flex items-center justify-center relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full rotate-circle-3" viewBox="0 0 200 200">
                  <defs>
                    <path id="circle3" d="M 100, 100 m -95, 0 a 95,95 0 1,1 190,0 a 95,95 0 1,1 -190,0" />
                  </defs>
                  <text fill="white" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="900">
                    <textPath href="#circle3" startOffset="0%">
                      Consult With Us * Consult With Us * Consult With Us * Consult With Us * Consult With Us *
                    </textPath>
                  </text>
                </svg>
                <div className="relative z-10 pulse-animation" style={{ animationDelay: '0.5s' }}>
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Small Circle 1 - White, Top Right */}
            <div className="absolute top-20 right-1/4 md:right-1/3 z-15 float-animation hover-scale cursor-pointer" style={{ animationDelay: '0.5s' }} data-aos="zoom-in" data-aos-delay="1100">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-white border-2 border-black flex items-center justify-center relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full rotate-circle-1" viewBox="0 0 200 200">
                  <defs>
                    <path id="circle4" d="M 100, 100 m -55, 0 a 55,55 0 1,1 110,0 a 55,55 0 1,1 -110,0" />
                  </defs>
                  <text fill="black" fontSize="9" fontFamily="Arial, sans-serif" fontWeight="900">
                    <textPath href="#circle4" startOffset="0%">
                      Consult With Us * Consult With Us * Consult With Us * Consult With Us *
                    </textPath>
                  </text>
                </svg>
                <div className="relative z-10 pulse-animation">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Small Circle 2 - Black, Top Left */}
            <div className="absolute top-16 left-1/4 md:left-1/3 z-15 float-slow hover-scale cursor-pointer" style={{ animationDelay: '1.5s' }} data-aos="zoom-in" data-aos-delay="1200">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-black border-2 border-white flex items-center justify-center relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full rotate-circle-2" viewBox="0 0 200 200">
                  <defs>
                    <path id="circle5" d="M 100, 100 m -55, 0 a 55,55 0 1,1 110,0 a 55,55 0 1,1 -110,0" />
                  </defs>
                  <text fill="white" fontSize="9" fontFamily="Arial, sans-serif" fontWeight="900">
                    <textPath href="#circle5" startOffset="0%">
                      Consult With Us * Consult With Us * Consult With Us * Consult With Us *
                    </textPath>
                  </text>
                </svg>
                <div className="relative z-10 pulse-animation" style={{ animationDelay: '1s' }}>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Medium Circle 2 - Black, Bottom Left */}
            <div className="absolute bottom-20 left-1/4 md:left-1/3 z-20 float-animation hover-scale cursor-pointer" style={{ animationDelay: '2s' }} data-aos="zoom-in" data-aos-delay="1300">
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-black border-2 border-white flex items-center justify-center relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full rotate-circle-3" viewBox="0 0 200 200">
                  <defs>
                    <path id="circle6" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                  </defs>
                  <text fill="white" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="900">
                    <textPath href="#circle6" startOffset="0%">
                      Consult With Us * Consult With Us * Consult With Us * Consult With Us * Consult With Us *
                    </textPath>
                  </text>
                </svg>
                <div className="relative z-10 pulse-animation" style={{ animationDelay: '1.5s' }}>
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Small Circle 3 - White, Bottom Right */}
            <div className="absolute bottom-16 right-1/4 md:right-1/3 z-15 float-slow hover-scale cursor-pointer" style={{ animationDelay: '2.5s' }} data-aos="zoom-in" data-aos-delay="1400">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-white border-2 border-black flex items-center justify-center relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full rotate-circle-1" viewBox="0 0 200 200">
                  <defs>
                    <path id="circle7" d="M 100, 100 m -55, 0 a 55,55 0 1,1 110,0 a 55,55 0 1,1 -110,0" />
                  </defs>
                  <text fill="black" fontSize="9" fontFamily="Arial, sans-serif" fontWeight="900">
                    <textPath href="#circle7" startOffset="0%">
                      Consult With Us * Consult With Us * Consult With Us * Consult With Us *
                    </textPath>
                  </text>
                </svg>
                <div className="relative z-10 pulse-animation" style={{ animationDelay: '2s' }}>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Small Circle 4 - Black, Middle Left */}
            <div className="absolute top-1/2 left-1/6 md:left-1/5 transform -translate-y-1/2 z-15 float-animation hover-scale cursor-pointer" style={{ animationDelay: '1s' }} data-aos="zoom-in" data-aos-delay="1500">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-black border-2 border-white flex items-center justify-center relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full rotate-circle-2" viewBox="0 0 200 200">
                  <defs>
                    <path id="circle8" d="M 100, 100 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0" />
                  </defs>
                  <text fill="white" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="900">
                    <textPath href="#circle8" startOffset="0%">
                      Consult With Us * Consult With Us * Consult With Us *
                    </textPath>
                  </text>
                </svg>
                <div className="relative z-10 pulse-animation" style={{ animationDelay: '0.3s' }}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Small Circle 5 - White, Middle Right */}
            <div className="absolute top-1/2 right-1/6 md:right-1/5 transform -translate-y-1/2 z-15 float-slow hover-scale cursor-pointer" style={{ animationDelay: '1.5s' }} data-aos="zoom-in" data-aos-delay="1600">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-white border-2 border-black flex items-center justify-center relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full rotate-circle-3" viewBox="0 0 200 200">
                  <defs>
                    <path id="circle9" d="M 100, 100 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0" />
                  </defs>
                  <text fill="black" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="900">
                    <textPath href="#circle9" startOffset="0%">
                      Consult With Us * Consult With Us * Consult With Us *
                    </textPath>
                  </text>
                </svg>
                <div className="relative z-10 pulse-animation" style={{ animationDelay: '0.7s' }}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Large Black Rectangle */}
        <div className="bg-black py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-16 flex-shrink-0 rounded-lg" data-aos="fade-up" data-aos-delay="1700">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-black text-white tracking-tighter" data-aos="fade-up" data-aos-delay="1800">
              CONTACTS
              <span className="inline-block mx-2 sm:mx-3 md:mx-6 relative align-middle" data-aos="zoom-in" data-aos-delay="1900">
                <span className="relative inline-block">
                  <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 sm:w-8 md:w-12 h-0.5 sm:h-0.5 md:h-1 bg-white"></span>
                  <span className="relative text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl">+</span>
                </span>
              </span>
              <span data-aos="fade-up" data-aos-delay="2000">US</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

