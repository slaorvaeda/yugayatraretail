'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ExactImageMatch from './ExactImageMatch';

const contentBoxes = [
  {
    id: 1,
    title: "Advanced Technology",
    description: "Cutting-edge solutions that revolutionize how businesses operate. Our platform integrates seamlessly with existing systems and provides unprecedented scalability for modern enterprises.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gradient: "from-blue-500 to-blue-600",
    metric: "99.9%",
    metricLabel: "Uptime"
  },
  {
    id: 2,
    title: "Global Connectivity",
    description: "Connect with partners worldwide through our secure, high-performance network infrastructure. Experience lightning-fast data transfer and real-time collaboration.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
      </svg>
    ),
    gradient: "from-green-500 to-emerald-600",
    metric: "150+",
    metricLabel: "Countries"
  },
  {
    id: 3,
    title: "Future Innovation",
    description: "Pioneering the next generation of digital transformation. Experience tomorrow's technology today with our revolutionary approach to modern business solutions.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    gradient: "from-purple-500 to-pink-600",
    metric: "AI-Powered",
    metricLabel: "Solutions"
  },
  {
    id: 4,
    title: "Enterprise Security",
    description: "Bank-grade encryption and advanced security protocols protect your data. Multi-layer security architecture ensures compliance with global standards.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    gradient: "from-red-500 to-orange-600",
    metric: "256-bit",
    metricLabel: "Encryption"
  },
  {
    id: 5,
    title: "Scalable Infrastructure",
    description: "Effortlessly scale your operations with cloud-native architecture. Auto-scaling capabilities ensure optimal performance during peak demands.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    gradient: "from-cyan-500 to-teal-600",
    metric: "10M+",
    metricLabel: "Requests/Day"
  },
  {
    id: 6,
    title: "24/7 Support",
    description: "Round-the-clock expert support ensures your business never stops. Dedicated teams ready to assist with any challenges you face.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    gradient: "from-indigo-500 to-violet-600",
    metric: "<2min",
    metricLabel: "Response Time"
  },
  {
    id: 7,
    title: "Real-Time Analytics",
    description: "Make data-driven decisions with comprehensive analytics and reporting tools. Monitor performance metrics and gain actionable insights instantly.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    gradient: "from-yellow-500 to-amber-600",
    metric: "Real-Time",
    metricLabel: "Analytics"
  },
  {
    id: 8,
    title: "API Integration",
    description: "Seamlessly integrate with thousands of third-party services through our comprehensive API ecosystem. Build custom workflows and automate processes.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-pink-500 to-rose-600",
    metric: "1000+",
    metricLabel: "APIs"
  },
  {
    id: 9,
    title: "Cloud Deployment",
    description: "Deploy applications instantly across multiple cloud providers. Automated infrastructure management reduces operational overhead significantly.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    gradient: "from-sky-500 to-blue-600",
    metric: "Multi-Cloud",
    metricLabel: "Platform"
  },
];

export default function ExactImagePage() {
  const pageRef = useRef(null);

  useEffect(() => {
    // Page entrance animation
    if (pageRef.current) {
      gsap.fromTo(pageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div 
      ref={pageRef}
      className="min-h-screen relative overflow-y-auto"
      data-aos="fade-up"
    >
      {/* Exact Network Graphic from Image */}
      <ExactImageMatch />
      
      {/* Mobile Design - Single Column Layout */}
      <div className="lg:hidden relative top-16 left-0 right-0 z-10 px-4 py-8 pb-16" data-aos="fade-up" data-aos-delay="100">
        <div className="max-w-7xl mx-auto space-y-4">
          {contentBoxes.map((box, index) => (
            <div
              key={box.id}
              className="group relative bg-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-white/20 hover:border-white/30 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 overflow-hidden before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none flex flex-col min-h-[180px] will-change-transform"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={index * 100}
              data-aos-easing="ease-out"
              style={{
                animation: `floatCard ${3 + index * 0.3}s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`
              }}
            >
              {/* Gradient Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${box.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl`} />
              
              {/* Glass Reflection Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
              
              {/* Content Container */}
              <div className="relative z-10 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-base font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors drop-shadow-sm leading-tight">
                  {box.title}
                </h3>
                
                {/* Description */}
                <p className="text-xs text-gray-700 leading-relaxed mb-4 flex-grow line-clamp-3 drop-shadow-sm min-h-[48px]">
                  {box.description}
                </p>
                
                {/* Metric Badge */}
                <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-300/30 group-hover:border-gray-400/50 transition-colors">
                  <div className="flex flex-col">
                    <div className={`text-lg font-bold bg-gradient-to-r ${box.gradient} bg-clip-text text-transparent leading-none mb-1`}>
                      {box.metric}
                    </div>
                    <div className="text-xs text-gray-600 leading-tight">{box.metricLabel}</div>
                  </div>
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${box.gradient} animate-pulse flex-shrink-0`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Design - Multi-Row Grid Layout */}
      <div className="hidden lg:block relative top-12 left-0 right-0 z-10 px-8 py-12 pb-20" data-aos="fade-up" data-aos-delay="100">
        <div className="max-w-7xl mx-auto">
          {/* Multi-Row Grid - 3 Columns */}
          <div className="grid grid-cols-3 gap-6 items-stretch">
            {contentBoxes.map((box, index) => (
              <div
                key={box.id}
                className="group relative bg-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/20 hover:border-white/30 hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.2)] transition-all duration-500 hover:-translate-y-3 hover:scale-105 overflow-hidden cursor-pointer before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/10 before:via-white/5 before:to-transparent before:pointer-events-none before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-500 flex flex-col min-h-[280px] will-change-transform"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay={index * 150}
                data-aos-easing="ease-out"
                style={{
                  animation: `floatCard ${3 + index * 0.3}s ease-in-out infinite`,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                {/* Animated Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${box.gradient} opacity-0 group-hover:opacity-25 transition-opacity duration-500 rounded-3xl`} />
                
                {/* Glass Reflection Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-3xl" />
                
                {/* Inner Glow */}
                <div className={`absolute inset-[1px] bg-gradient-to-br ${box.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                
                {/* Content Container */}
                <div className="relative z-10 flex flex-col flex-grow">
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-gray-800 drop-shadow-sm group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {box.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-700 leading-relaxed mb-4 flex-grow drop-shadow-sm min-h-[72px]">
                    {box.description}
                  </p>
                  
                  {/* Metric Badge with Icon */}
                  <div className="flex items-center justify-between pt-4 mt-auto border-t-2 border-gray-300/30 group-hover:border-gray-400/50 transition-colors">
                    <div className="flex flex-col">
                      <div className={`text-2xl font-black bg-gradient-to-r ${box.gradient} bg-clip-text text-transparent mb-1 leading-none`}>
                        {box.metric}
                      </div>
                      <div className="text-xs font-medium text-gray-600 uppercase tracking-wide leading-tight">{box.metricLabel}</div>
                    </div>
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${box.gradient} shadow-lg animate-pulse group-hover:animate-none group-hover:scale-150 transition-transform flex-shrink-0`} />
                  </div>
                </div>
                
                {/* Corner Accent - Glass Effect */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${box.gradient} opacity-0 group-hover:opacity-20 rounded-bl-full transition-opacity duration-500 blur-sm`} />
                
                {/* Glass Edge Highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle grid pattern overlay - blue theme */}
      <div className="absolute inset-0 opacity-3" data-aos="fade-in" data-aos-delay="1100">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(157, 194, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(84, 148, 251, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>
    </div>
  );
}
