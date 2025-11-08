'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ModernServicesSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const clientsSectionRef = useRef(null);
  const clientRefs = useRef([]);

  const services = [
    {
      id: 1,
      title: 'Design',
      description: 'We are a design first agency. We can handle a simple landing page to SaaS platform and everything in between.',
      tags: ['Branding', 'App Design', 'Web Design', 'UX Research', 'Enterprise', 'Prototype'],
      buttonText: 'START A DESIGN PROJECT'
    },
    {
      id: 2,
      title: 'Development',
      description: 'Our dev team is consist of couple of full-stack developers, several front-end engineer capable of making anything',
      tags: ['Front-end', 'Back-end', 'Windows', 'macOS', 'Android', 'iOS', 'Linux'],
      buttonText: 'START A DEVELOPMENT PROJECT'
    },
    {
      id: 3,
      title: 'Marketing',
      description: 'Create multiple collections to have your icons organized and download them in the format you want. See more',
      tags: ['Social Media', 'Business Strategy', 'Sales', 'Offline', 'Online', 'iOS', 'Linux'],
      buttonText: 'START A MARKETING PROJECT'
    }
  ];

  const clients = ['Training Partners', 'Certification Bodies', 'Placement Partners', 'Industry Leaders', '+50'];

  useEffect(() => {
    // Animate elements
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
    }
    
    // Animate cards on mount
    if (cardsRef.current.length > 0) {
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2,
          ease: "power3.out"
        }
      );
    }
    
    // Animate clients section
    if (clientsSectionRef.current) {
      gsap.fromTo(clientsSectionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5 }
      );
    }
    
    // Animate individual clients
    if (clientRefs.current.length > 0) {
      gsap.fromTo(clientRefs.current,
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.4, 
          stagger: 0.1,
          delay: 0.6
        }
      );
    }
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 flex items-center justify-center py-12 lg:py-20 px-4 sm:px-8 lg:px-16 overflow-hidden"
    >
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto w-full relative z-20">
        {/* Mobile Design - Different Layout */}
        <div className="lg:hidden">
          <h2
            ref={titleRef}
            className="text-4xl font-black text-blue-900 mb-8 text-center"
          >
            Services
          </h2>

          {/* Mobile: Single Column Stacked Cards */}
          <div className="space-y-4 mb-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                ref={el => cardsRef.current[index] = el}
                className={`bg-white/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-blue-100 hover:shadow-3xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-2 w-full md:h-[550px] flex flex-col ${
                  index === 0 ? 'md:relative' : 
                  'md:relative md:-top-40'
                }`}
              >
              {/* Header Graphic */}
              <div className="mb-6 h-40 flex items-center justify-center bg-blue-50/50 rounded-lg overflow-hidden border border-blue-100">
                {service.id === 1 && (
                  <div className="relative w-full h-full p-4">
                    {/* Design graphic - network nodes with cursor */}
                    <svg className="w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
                      {/* Lines connecting nodes */}
                      <line x1="30" y1="40" x2="70" y2="60" stroke="#3b82f6" strokeWidth="2.5" />
                      <line x1="70" y1="60" x2="110" y2="40" stroke="#2563eb" strokeWidth="2.5" />
                      <line x1="110" y1="40" x2="150" y2="70" stroke="#3b82f6" strokeWidth="2.5" />
                      {/* Nodes */}
                      <circle cx="30" cy="40" r="10" fill="#2563eb" />
                      <circle cx="70" cy="60" r="10" fill="#3b82f6" />
                      <circle cx="110" cy="40" r="10" fill="#2563eb" />
                      <circle cx="150" cy="70" r="10" fill="#3b82f6" />
                      {/* Cursor pointing to selection */}
                      <g transform="translate(130, 30)">
                        <path d="M0 0 L12 12 L10 14 L3 9 L0 12 Z" fill="#2563eb" />
                      </g>
                      {/* Selection box */}
                      <rect x="160" y="35" width="35" height="25" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeDasharray="5,3" />
                    </svg>
                  </div>
                )}
                {service.id === 2 && (
                  <div className="relative w-full h-full p-4">
                    {/* Development graphic - toggle switches */}
                    <div className="grid grid-cols-4 gap-2 h-full">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => {
                        const colors = ['bg-blue-500', 'bg-blue-600', 'bg-blue-400', 'bg-indigo-500'];
                        const isOn = idx % 2 === 0;
                        return (
                          <div key={idx} className="relative">
                            <div className={`h-full rounded-lg ${
                              colors[idx % 4]
                            }`} />
                            <div className={`absolute top-1 right-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                              isOn ? 'translate-x-0' : 'translate-x-4'
                            }`} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {service.id === 3 && (
                  <div className="relative w-full h-full p-4 bg-white rounded-lg">
                    {/* Marketing graphic - line graphs */}
                    <svg className="w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
                      {/* Blue line graph */}
                      <polyline
                        points="15,85 35,65 55,75 75,45 95,55 115,35 135,50 155,40 175,30"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Light blue line graph */}
                      <polyline
                        points="15,105 35,95 55,90 75,80 95,75 115,70 135,65 155,60 175,55"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Indigo line graph */}
                      <polyline
                        points="15,115 35,110 55,100 75,95 95,90 115,85 135,80 155,75 175,70"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Circle at top center */}
                      <circle cx="100" cy="20" r="6" fill="white" stroke="#3b82f6" strokeWidth="1" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-black text-blue-900 mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Button - pushed to bottom */}
              <div className="mt-auto">
                <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold text-xs md:text-sm hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  {service.buttonText}
                </button>
              </div>
            </div>
          ))}
          </div>
          
          {/* Mobile Client Partners */}
          <div
            ref={clientsSectionRef}
            className="bg-blue-600/20 backdrop-blur-sm border border-blue-200 rounded-xl px-4 py-4"
          >
            <p className="text-blue-700 text-xs mb-3 text-center font-medium">Our Trusted Partners</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {clients.map((client, index) => (
                <div
                  key={index}
                  ref={el => clientRefs.current[index] = el}
                  className="text-blue-900 font-semibold text-sm hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {client}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Design - Original Layout (Unchanged) */}
        <div className="hidden lg:block">
          {/* Services Title and Cards Container */}
          <div className="relative">
            {/* Services Title */}
            <h2
              ref={titleRef}
              className="text-8xl font-black text-blue-900 mb-16"
            >
              Services
            </h2>

            {/* Three Service Cards */}
            <div className="grid grid-cols-3 gap-4 mb-16 items-start">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  ref={el => cardsRef.current[index] = el}
                  className={`bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-blue-100 hover:shadow-3xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-2 w-full h-[550px] flex flex-col ${
                    index === 0 ? 'relative' : 
                    'relative -top-40'
                  }`}
                >
                  {/* Header Graphic */}
                  <div className="mb-6 h-40 flex items-center justify-center bg-blue-50/50 rounded-lg overflow-hidden border border-blue-100">
                    {service.id === 1 && (
                      <div className="relative w-full h-full p-4">
                        {/* Design graphic - network nodes with cursor */}
                        <svg className="w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
                          {/* Lines connecting nodes */}
                          <line x1="30" y1="40" x2="70" y2="60" stroke="#3b82f6" strokeWidth="2.5" />
                          <line x1="70" y1="60" x2="110" y2="40" stroke="#2563eb" strokeWidth="2.5" />
                          <line x1="110" y1="40" x2="150" y2="70" stroke="#3b82f6" strokeWidth="2.5" />
                          {/* Nodes */}
                          <circle cx="30" cy="40" r="10" fill="#2563eb" />
                          <circle cx="70" cy="60" r="10" fill="#3b82f6" />
                          <circle cx="110" cy="40" r="10" fill="#2563eb" />
                          <circle cx="150" cy="70" r="10" fill="#3b82f6" />
                          {/* Cursor pointing to selection */}
                          <g transform="translate(130, 30)">
                            <path d="M0 0 L12 12 L10 14 L3 9 L0 12 Z" fill="#2563eb" />
                          </g>
                          {/* Selection box */}
                          <rect x="160" y="35" width="35" height="25" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeDasharray="5,3" />
                        </svg>
                      </div>
                    )}
                    {service.id === 2 && (
                      <div className="relative w-full h-full p-4">
                        {/* Development graphic - toggle switches */}
                        <div className="grid grid-cols-4 gap-2 h-full">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => {
                            const colors = ['bg-blue-500', 'bg-blue-600', 'bg-blue-400', 'bg-indigo-500'];
                            const isOn = idx % 2 === 0;
                            return (
                              <div key={idx} className="relative">
                                <div className={`h-full rounded-lg ${
                                  colors[idx % 4]
                                }`} />
                                <div className={`absolute top-1 right-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                                  isOn ? 'translate-x-0' : 'translate-x-4'
                                }`} />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {service.id === 3 && (
                      <div className="relative w-full h-full p-4 bg-white rounded-lg">
                        {/* Marketing graphic - line graphs */}
                        <svg className="w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
                          {/* Blue line graph */}
                          <polyline
                            points="15,85 35,65 55,75 75,45 95,55 115,35 135,50 155,40 175,30"
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Light blue line graph */}
                          <polyline
                            points="15,105 35,95 55,90 75,80 95,75 115,70 135,65 155,60 175,55"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Indigo line graph */}
                          <polyline
                            points="15,115 35,110 55,100 75,95 95,90 115,85 135,80 155,75 175,70"
                            fill="none"
                            stroke="#6366f1"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Circle at top center */}
                          <circle cx="100" cy="20" r="6" fill="white" stroke="#3b82f6" strokeWidth="1" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-4xl font-black text-blue-900 mb-4">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 text-base leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Button - pushed to bottom */}
                  <div className="mt-auto">
                    <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold text-sm hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                      {service.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Client Logos Section - aligned under Development and Marketing cards */}
          <div className="grid grid-cols-3 gap-4 -mt-49">
            <div></div>
            <div className="col-span-2">
              <div
                ref={clientsSectionRef}
                className="bg-blue-600/20 backdrop-blur-sm border border-blue-200 rounded-2xl px-8 py-6"
              >
                <p className="text-blue-700 text-sm mb-4 text-left font-medium">Our Trusted Partners</p>
                <div className="flex flex-wrap items-center justify-start gap-12">
                  {clients.map((client, index) => (
                    <div
                      key={index}
                      ref={el => clientRefs.current[index] = el}
                      className="text-blue-900 font-semibold text-lg hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {client}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernServicesSection;
