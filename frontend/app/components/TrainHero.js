'use client';
import React from 'react';
import { FaJava, FaPython } from 'react-icons/fa';
import { SiCplusplus, SiJavascript } from 'react-icons/si';

export default function TrainHero() {
  return (
    <>
      {/* Hero Section with Blue Gradient Background - Similar to Previous but Blue Theme */}
      <section 
        data-aos="fade-up"
        className="relative min-h-screen pt-24 pb-16 px-4 md:px-8 lg:px-16"
        style={{
          background: 'linear-gradient(to bottom, #eff6ff 0%, #dbeafe 20%, #93c5fd 60%, #3b82f6 100%)'
        }}
      >
        {/* Subtle concentric circles background - similar style to previous */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute top-1/2 right-1/4 transform -translate-y-1/2 w-full h-full opacity-30" viewBox="0 0 1200 1200">
            <circle cx="600" cy="600" r="150" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.4" />
            <circle cx="600" cy="600" r="250" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.3" />
            <circle cx="600" cy="600" r="350" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.25" />
            <circle cx="600" cy="600" r="450" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.2" />
            <circle cx="600" cy="600" r="550" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.15" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            
            {/* Left Side - Text Content */}
            <div className="space-y-8 max-w-xl" data-aos="fade-right" data-aos-delay="150">
              <h1 
                className="display-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                Unlock Top Training Talent You Thought Was Out of Reach —{' '}
                <span className="text-blue-100">Now Just One Click Away!</span>
              </h1>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  className="ui-text bg-blue-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg hover:bg-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-2 group"
                  data-aos="zoom-in"
                  data-aos-delay="450"
                >
                  Start Project
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                
                {/* Tooltip indicator */}
                <div className="relative group">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg relative z-10">
                    you
                  </div>
                  <div className="absolute -top-2 left-4 w-4 h-4 bg-blue-600 transform rotate-45 z-0"></div>
                  <div className="absolute -top-1 left-3 w-6 h-6 bg-blue-600 transform rotate-45 opacity-50"></div>
                </div>
              </div>
            </div>

            {/* Right Side - Simple Network Design - Larger Size */}
            <div className="relative flex items-center justify-center min-h-[400px] md:min-h-[600px] lg:min-h-[800px] lg:justify-end">
              <div className="relative w-full h-full max-w-[900px] mx-auto lg:mx-0" data-aos="fade-left" data-aos-delay="250">
                {/* Larger Container */}
                <div className="relative w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] h-[400px] md:h-[600px] lg:h-[800px] mx-auto lg:ml-auto lg:mr-0">
                  {/* Central Text - larger size */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20">
                    <div className="display-text text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] text-white mb-2 drop-shadow-2xl">20k+</div>
                    <div className="ui-text text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl text-white drop-shadow-lg">Preparation content</div>
                  </div>

                  {/* Larger Concentric Circles */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
                    <svg className="w-full h-full" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet">
                      {/* Inner circle - larger */}
                      <circle className="orbit-circle" cx="400" cy="400" r="130" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="5,5" />
                      {/* Middle circle - larger */}
                      <circle className="orbit-circle" cx="400" cy="400" r="230" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="5,5" />
                      {/* Outer circle - larger */}
                      <circle className="orbit-circle" cx="400" cy="400" r="330" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="5,5" />
                    </svg>
                  </div>

                  {/* Elements Container - larger size */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full z-20">
                    {(() => {
                      const centerX = 400;
                      const centerY = 400;
                      
                      const getPosition = (angle, radius) => {
                        const angleRad = (angle * Math.PI) / 180;
                        return {
                          x: centerX + radius * Math.cos(angleRad),
                          y: centerY + radius * Math.sin(angleRad)
                        };
                      };
                      
                      return (
                        <>
                          {/* 4 Circular Avatars - perfectly positioned on outer circle */}
                          {[
                            { angle: 315, radius: 330, color: 'from-blue-400 to-blue-600' }, // Top-left: Man with curly dark hair
                           
                            { angle: 135, radius: 330, color: 'from-yellow-400 to-yellow-600' }, // Bottom-right: Man with blonde hair
                            { angle: 225, radius: 330, color: 'from-pink-400 to-pink-600' } // Bottom-left: Woman with blonde hair
                          ].map((pos, index) => {
                            const { x, y } = getPosition(pos.angle, pos.radius);
                            return (
                              <div
                                key={`avatar-${index}`}
                                className="network-circle avatar-float absolute w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-2 md:border-3 lg:border-4 border-white shadow-xl transform -translate-x-1/2 -translate-y-1/4 overflow-hidden"
                                style={{
                                  left: `${(x / 800) * 100}%`,
                                  top: `${(y / 800) * 100}%`
                                }}
                              >
                                <div className={`w-full h-full rounded-full bg-gradient-to-br ${pos.color}`}>
                                  <div className="w-full h-full flex items-center justify-center">
                                    <svg className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-14 lg:h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          
                          {/* 4 Programming Language Icons - perfectly positioned on middle (2nd) circle with glass effect */}
                          {[
                            { angle: 45, radius: 230, icon: 'java', glowColor: '0 0 30px rgba(0, 90, 156, 0.9), 0 0 60px rgba(0, 90, 156, 0.6)' }, // Top-right: Java (Red)
                            { angle: 95, radius: 230, icon: 'python', glowColor: '0 0 30px rgba(63, 114, 155, 0.9), 0 0 60px rgba(63, 114, 155, 0.6)' }, // Bottom-right: Python (Blue)
                            { angle: 135, radius: 230, icon: 'cpp', glowColor: '0 0 30px rgba(0, 90, 156, 0.9), 0 0 60px rgba(0, 90, 156, 0.6)' }, // Bottom-left: C++ (Blue)
                            { angle: 265, radius: 230, icon: 'js', glowColor: '0 0 30px rgba(63, 114, 155, 0.9), 0 0 60px rgba(63, 114, 155, 0.6)' } // Top-left: JavaScript (Yellow)
                          ].map((pos, index) => {
                            const { x, y } = getPosition(pos.angle, pos.radius);
                            return (
                              <div
                                key={`icon-${index}`}
                                className="network-circle icon-float absolute w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-white/15 backdrop-blur-lg border-2 border-white/40 shadow-2xl transform -translate-x-1/2 "
                                style={{
                                  left: `${(x / 800) * 100}%`,
                                  top: `${(y / 800) * 100}%`,
                                  boxShadow: pos.glowColor,
                                  backdropFilter: 'blur(12px)',
                                  WebkitBackdropFilter: 'blur(12px)'
                                }}
                              >
                                <div className="w-full h-full flex items-center justify-center text-white">
                                  {pos.icon === 'java' && <FaJava className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />}
                                  {pos.icon === 'python' && <FaPython className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />}
                                  {pos.icon === 'cpp' && <SiCplusplus className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />}
                                  {pos.icon === 'js' && <SiJavascript className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />}
                                </div>
                              </div>
                            );
                          })}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Client Logos Section */}
          <div 
            className="mt-20 pt-12 border-t border-white/30"
          >
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-20">
              {['Dreamure', 'SWITCH.WIN', 'Glow sphere', 'PinSpace', 'Visionix'].map((client, index) => (
                <div
                  key={index}
                  className="client-item text-white font-semibold text-lg md:text-xl hover:opacity-70 transition-all duration-300 cursor-pointer flex items-center gap-3 group"
                >
                  <span className="group-hover:scale-110 transition-transform">{client}</span>
                  {index >= 2 && (
                    <span className="text-white/40 text-sm">●</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CSS keyframes for subtle animations (no GSAP) */}
      <style jsx global>{`
        @keyframes floatY {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(8px); }
        }
        @keyframes floatYSmall {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(6px); }
        }
        @keyframes dashPulse {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 10; }
        }
        .icon-float { animation: floatY 3.2s ease-in-out infinite; }
        .avatar-float { animation: floatYSmall 4s ease-in-out infinite; }
        .orbit-circle { animation: dashPulse 10s linear infinite alternate; }
      `}</style>
    </>
  );
}

