'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaJava, FaPython } from 'react-icons/fa';
import { SiCplusplus } from 'react-icons/si';

export default function TrainingModal({ training, isOpen, onClose }) {
  const [selectedTab, setSelectedTab] = useState('Details');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const circleRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseMove = (e) => {
      if (circleRef.current) {
        const rect = circleRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * 0.1;
        const deltaY = (e.clientY - centerY) * 0.1;
        
        setMousePosition({ x: deltaX, y: deltaY });
      }
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
    };

    const circleElement = circleRef.current;
    if (circleElement) {
      circleElement.addEventListener('mousemove', handleMouseMove);
      circleElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (circleElement) {
        circleElement.removeEventListener('mousemove', handleMouseMove);
        circleElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isOpen]);

  if (!isOpen || !training) return null;

  const icons = {
    Java: <FaJava className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 text-blue-900" />,
    'C++': <SiCplusplus className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 text-blue-900" />,
    Python: <FaPython className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 text-blue-900" />
  };

  const courseContent = {
    Details: {
      title: 'Course Details',
      topics: [
        'Basics: Variables, Data Types, Operators, Syntax Fundamentals',
        'Flow Control: If-else, Switch Statements, Conditional Logic',
        'Loops: For, While, Do-while, Nested Loops, Loop Control',
        'Functions & Methods: Function Declaration, Parameters, Return Values',
        'Data Structures: Arrays, Lists, Maps, Sets, Collections',
        'Object-Oriented Programming: Classes, Objects, Inheritance, Polymorphism',
        'Advanced Topics: Exception Handling, File I/O, Multithreading',
        'Libraries & Frameworks: Standard Library, Popular Frameworks',
        'Best Practices: Code Organization, Debugging, Testing',
        'Project Building: Real-world Applications, Portfolio Development'
      ]
    },
    Course: {
      title: 'Complete Course Structure',
      topics: [
        'Week 1-2: Fundamentals & Syntax - Getting started with core concepts',
        'Week 3-4: Control Structures - Mastering flow control and loops',
        'Week 5-6: Functions & Modularity - Building reusable code',
        'Week 7-8: Data Structures - Arrays, Lists, and Collections',
        'Week 9-10: Object-Oriented Programming - Classes and Objects',
        'Week 11-12: Advanced Concepts - Exception Handling, File Operations',
        'Week 13-14: Framework Integration - Working with popular frameworks',
        'Week 15-16: Project Development - Building real-world applications',
        'Week 17-18: Testing & Debugging - Quality assurance and optimization',
        'Week 19-20: Portfolio & Interview Prep - Showcasing your skills'
      ]
    },
    Vision: {
      title: 'Career Vision & Goals',
      topics: [
        'Career Path: Junior Developer → Senior Developer → Tech Lead → Architect',
        'Job Opportunities: Software Developer, Backend Engineer, Full-Stack Developer',
        'Industry Demand: High demand in IT, Finance, Healthcare, E-commerce sectors',
        'Salary Range: Entry-level ₹4-8L, Mid-level ₹10-20L, Senior ₹25L+ annually',
        'Skills to Achieve: Master core concepts, build projects, contribute to open-source',
        'Certifications: Industry-recognized certifications to boost your profile',
        'Networking: Connect with industry professionals, attend meetups, conferences',
        'Portfolio Building: Showcase 5-10 quality projects demonstrating your expertise',
        'Interview Preparation: Practice coding problems, system design, technical rounds',
        'Long-term Goals: Continuous learning, specialization, and career advancement'
      ]
    }
  };

  const currentContent = courseContent[selectedTab];
  const currentPrice = 499;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
       {/* Modal Content */}
       <div 
         className="relative w-full max-w-6xl mx-2 sm:mx-4 h-[95vh] sm:h-[90vh] max-h-[900px] bg-gradient-to-br from-blue-50 via-blue-100 via-white to-blue-50 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col border-2 border-blue-200/50"
         data-aos="zoom-in"
         data-aos-duration="500"
       >
         {/* Animated Background Pattern */}
         <div className="absolute inset-0 overflow-hidden">
           {/* Blue-White Gradient Mesh */}
           <div className="absolute inset-0 opacity-30" style={{
             background: 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(37, 99, 235, 0.4) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(147, 197, 253, 0.3) 0%, transparent 60%)',
           }} />
           
           {/* Animated Blue Orbs */}
           <div className="absolute top-10 left-10 w-64 h-64 bg-blue-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
           <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
           
           {/* Subtle Grid Pattern */}
           <div className="absolute inset-0 opacity-10" style={{
             backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
             backgroundSize: '50px 50px',
           }} />
           
           {/* Shine Effect */}
           <div className="absolute inset-0 opacity-15" style={{
             background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.3) 55%, transparent 100%)',
             backgroundSize: '200% 200%',
             animation: 'shine 8s infinite',
           }} />
           
           {/* Additional Blue Accents */}
           <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-200/40 rounded-full blur-2xl"></div>
           <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-blue-300/40 rounded-full blur-2xl"></div>
         </div>

        {/* Content Container */}
        <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col h-full overflow-hidden">
          {/* Top Navigation */}
          <div 
            className="flex justify-start items-center mb-6 flex-shrink-0"
            data-aos="fade-down"
            data-aos-delay="100"
          >
             <button
               onClick={onClose}
               className="flex items-center gap-2 text-blue-900 hover:text-blue-700 transition-colors"
             >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start flex-grow min-h-0 mb-4">
            {/* Left Section - Product Info */}
            <div 
              className="lg:col-span-1 flex flex-col justify-between h-full"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="flex-grow">
                 <h1 
                   className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-3 leading-tight"
                   data-aos="fade-up"
                   data-aos-delay="300"
                 >
                   {training.name}
                   <br />
                   Training Package
                 </h1>
                 <p 
                   className="text-blue-700 text-base lg:text-lg mb-6"
                   data-aos="fade-up"
                   data-aos-delay="400"
                 >
                   Complete Course Package
                 </p>
               </div>
               
               {/* Disclaimer */}
               <p 
                 className="text-xs text-blue-600/70 mt-4 flex-shrink-0"
                 data-aos="fade-up"
                 data-aos-delay="500"
               >
                 We work in close partnership with our clients - including the NHS, the military, major private healthcare providers and GP practices.
               </p>
            </div>

            {/* Center Section - Product Visual */}
            <div 
              className="lg:col-span-1 flex items-center justify-center flex-grow self-center"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="relative w-full flex items-center justify-center py-8">
                {/* Training Icon in Circle */}
                 <div 
                   ref={circleRef}
                   className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 sm:border-3 md:border-4 border-blue-300/50 flex items-center justify-center shadow-2xl cursor-pointer transition-transform duration-300 ease-out relative mx-auto"
                  style={{
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
                  }}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
                      transition: 'transform 0.1s ease-out'
                    }}
                  >
                   <div className="w-full h-full flex items-center justify-center text-blue-900">
                     {icons[training.name]}
                   </div>
                  </div>
                </div>
                
                 {/* Decorative Elements */}
                 <div 
                   className="absolute top-4 right-4 w-16 h-16 md:w-20 md:h-20 bg-blue-200/30 rounded-full blur-xl"
                   data-aos="fade-in"
                   data-aos-delay="500"
                 ></div>
                 <div 
                   className="absolute bottom-4 left-4 w-16 h-16 md:w-20 md:h-20 bg-blue-300/30 rounded-full blur-xl"
                   data-aos="fade-in"
                   data-aos-delay="600"
                 ></div>
              </div>
            </div>

            {/* Right Section - Options */}
            <div 
              className="lg:col-span-1 flex flex-col h-full"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              {/* Tab Buttons - Fixed at top */}
              <div 
                className="flex gap-2 mb-4 flex-shrink-0 z-30 relative"
              >
                 {['Details', 'Course', 'Vision'].map((tab, index) => (
                   <button
                     key={tab}
                     onClick={() => setSelectedTab(tab)}
                     className={`flex-1 px-3 py-2 md:px-4 md:py-2.5 rounded-lg font-semibold text-xs md:text-sm transition-all relative z-10 cursor-pointer ${
                       selectedTab === tab
                         ? 'bg-blue-600 text-white border-2 border-blue-700 shadow-lg'
                         : 'bg-blue-100 text-blue-800 border-2 border-blue-300 hover:bg-blue-200'
                     }`}
                   >
                     {tab}
                   </button>
                 ))}
              </div>

              {/* Content Details - Scrollable */}
              <div className="flex-grow flex flex-col min-h-0 overflow-hidden relative z-0">
                {currentContent && (
                  <div 
                    className="bg-white/60 backdrop-blur-md rounded-xl p-3 sm:p-4 md:p-5 border border-blue-200/50 overflow-y-auto overflow-x-hidden relative z-0 modal-scrollbar shadow-inner h-[280px] max-h-[280px] sm:h-[320px] sm:max-h-[320px] md:h-[360px] md:max-h-[360px]"
                    data-aos="fade-up"
                    data-aos-delay="600"
                  >
                     <h3 className="text-blue-900 font-bold text-base md:text-lg mb-3 sticky top-0 bg-blue-100/95 backdrop-blur-md py-3 rounded-lg px-3 z-10 shadow-lg border-b border-blue-300/50">
                      {currentContent.title}
                    </h3>
                    
                    {/* Topics List */}
                    <div className="space-y-2.5 pr-1">
                      {currentContent.topics.map((topic, index) => (
                        <div 
                          key={index} 
                          className="flex items-start gap-3"
                          data-aos="fade-left"
                          data-aos-delay={700 + (index * 50)}
                        >
                           <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                           <p className="text-blue-900/90 text-xs md:text-sm leading-relaxed flex-1">{topic}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                 {/* Information Link - Fixed at bottom */}
                 <button 
                   className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition-colors flex-shrink-0 mt-8"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                   <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-blue-400 flex items-center justify-center">
                     <span className="text-xs font-bold text-blue-700">i</span>
                   </div>
                   <span className="text-xs md:text-sm">Overview, Package and Side effects</span>
                </button>
              </div>
            </div>
          </div>

           {/* Bottom Action Bar */}
           <div 
             className="mt-6 pt-6 border-t border-blue-200/50 flex flex-col sm:flex-row items-center justify-center gap-6 flex-shrink-0 z-20 relative"
            data-aos="fade-up"
            data-aos-delay="700"
          >
             {/* Price - Left */}
             <div 
               className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 text-center order-2 sm:order-1"
               data-aos="fade-in"
               data-aos-delay="900"
             >
               ₹{currentPrice.toLocaleString('en-IN')}
             </div>

             {/* Buy Now Button - Right */}
             <button 
               className="bg-blue-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-blue-700 hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer order-1 sm:order-2"
              data-aos="zoom-in"
              data-aos-delay="800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

