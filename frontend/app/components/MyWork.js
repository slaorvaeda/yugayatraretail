'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function MyWork() {
  const [activeIndex, setActiveIndex] = useState(3); // Udyam Registration is default active
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const scrollContainerRef = useRef(null);

  const portfolioItems = [
    { id: 1, name: 'FSSAI Registration', image: '/fssai-registration.webp', description: 'Food Safety and Standards Authority of India Registration Certificate.', certificateNo: '21224007001166' },
    { id: 2, name: 'GST Certificate', image: '/gst-certificate.webp', description: 'Goods and Services Tax Identification Certificate.', certificateNo: '29AABCY8389C1ZT' },
    { id: 3, name: 'Incorporation', image: '/incorporation-certificate.webp', description: 'Company Incorporation Certificate.', certificateNo: 'U74999KA2024OPC195780' },
    { id: 4, name: 'Udyam Registration', image: '/udyam-certificate.webp', description: 'MSME Udyam Registration Certificate.', certificateNo: 'UDYAM-KR-03-0421327' },
    { id: 5, name: 'Startup India', image: '/startup-india-certificate.webp', description: 'Startup India Recognition Certificate.', certificateNo: 'DIPP169780' },
    { id: 6, name: 'Trademark', image: '/trademark-certificate.webp', description: 'Trademark Registration Certificate.', certificateNo: 'TM-2024-XXXXXX' }
  ];

  useEffect(() => {
    // Auto-scroll to active card
    if (scrollContainerRef.current) {
      // Get responsive active card width based on screen size
      const getActiveCardWidth = () => {
        if (window.innerWidth >= 1280) return 1400; // xl
        if (window.innerWidth >= 1024) return 1200; // lg
        if (window.innerWidth >= 768) return 1000;   // md
        return 900; // default
      };
      
      const activeCardWidth = getActiveCardWidth();
      const inactiveCardWidth = 200;
      const gap = 24;
      let scrollPosition = 0;
      
      // Calculate scroll position based on all cards before active
      for (let i = 0; i < activeIndex; i++) {
        scrollPosition += inactiveCardWidth + gap;
      }
      
      // Center the active card
      scrollPosition = scrollPosition - (window.innerWidth / 2 - activeCardWidth / 2) + 20;
      
      scrollContainerRef.current.scrollTo({ left: Math.max(0, scrollPosition), behavior: 'smooth' });
    }
  }, [activeIndex]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  const handleViewCertificate = (item, e) => {
    e.stopPropagation(); // Prevent card click event
    setSelectedCertificate(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  return (
    <>
      {/* Transition Div - Smoothly connects from previous section */}
      <div 
        className="h-20 md:h-24 relative overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)'
        }}
      >
        {/* Decorative wave pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z" fill="#3b82f6" opacity="0.2" />
          </svg>
        </div>
      </div>

      <section 
        className="py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, #93c5fd 0%,rgb(98, 155, 245) 30%,#ffffff 100%)'
        }}
      >
      {/* Subtle decorative circles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg className="absolute top-1/2 right-1/4 transform -translate-y-1/2 w-full h-full" viewBox="0 0 1200 1200">
          <circle cx="600" cy="600" r="150" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.4" />
          <circle cx="600" cy="600" r="250" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.3" />
          <circle cx="600" cy="600" r="350" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.25" />
        </svg>
      </div>

      <div className="w-full mx-auto relative z-10 ">
        {/* Mobile Design - Different Layout */}
        <div className="lg:hidden">
          {/* Mobile Header */}
          <div className="mb-8 text-center px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 drop-shadow-lg">
              Certifications & Recognition
            </h2>
            <p className="text-sm text-blue-100">
              Our official certifications and registrations.
            </p>
          </div>

          {/* Mobile: Grid Layout */}
          <div className="grid grid-cols-2 gap-3 px-4 mb-6">
            {portfolioItems.slice(0, 4).map((item, index) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedCertificate(item);
                  setIsModalOpen(true);
                }}
                className="relative h-48 rounded-xl overflow-hidden cursor-pointer shadow-lg"
              >
                <Image 
                  src={item.image} 
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/10 backdrop-blur-sm">
                  <h3 className="text-white font-bold text-sm drop-shadow-lg">
                    {item.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: View All Button */}
          <div className="text-center px-4">
            <button 
              onClick={() => {
                setSelectedCertificate(portfolioItems[0]);
                setIsModalOpen(true);
              }}
              className="px-6 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-lg text-white font-semibold text-sm shadow-lg"
            >
              View All Certificates
            </button>
          </div>
        </div>

        {/* Desktop Design - Original Layout (Unchanged) */}
        <div className="hidden lg:block">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 className="text-7xl font-bold text-white mb-4 drop-shadow-lg">
              Certifications & Recognition
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Our official certifications and registrations that validate our commitment to excellence and compliance.
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Cards Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-4"
              style={{ scrollSnapType: 'x mandatory', scrollPadding: '0 20px' }}
            >
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleCardClick(index)}
                className={`relative flex-shrink-0 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 h-[70vh] ${
                  activeIndex === index
                    ? 'w-[900px] md:w-[1000px] lg:w-[1200px] xl:w-[1400px] shadow-2xl z-10'
                    : 'w-[180px] md:w-[200px] shadow-md opacity-75'
                }`}
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Card Image Background */}
                <div className="absolute inset-0">
                  <Image 
                    src={item.image} 
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>

                {/* Vertical Label - All Cards */}
                <div
                  className={`absolute bottom-0 left-4 ${
                    activeIndex === index ? 'mb-36 md:mb-40' : 'mb-3'
                  } z-20`}
                >
                  <div
                    className={`text-white font-bold drop-shadow-lg ${
                      activeIndex === index ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
                    }`}
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                  >
                    {item.name}
                  </div>
                </div>

                {/* Active Card Details Overlay */}
                {activeIndex === index && (
                  <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 p-6 md:p-8 rounded-t-3xl z-30 shadow-2xl">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-white/90 mb-5 text-sm md:text-base drop-shadow-md">
                        {item.description}
                      </p>
                    )}
                    <button 
                      onClick={(e) => handleViewCertificate(item, e)}
                      className="w-full px-6 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-lg text-white font-semibold hover:bg-white/30 transition-colors text-sm md:text-base shadow-lg cursor-pointer"
                    >
                      View Certificate
                    </button>
                  </div>
                )}

                {/* Green Glow Effect for Active Card */}
                {activeIndex === index && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-6 bg-green-400/40 blur-2xl rounded-full"></div>
                )}
              </div>
            ))}
            </div>
          </div>
        </div>

      </div>

      {/* Certificate Modal */}
      {isModalOpen && selectedCertificate && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="fixed top-4 -right-4 z-[60] w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-lg border border-gray-200"
            >
              <svg className="w-6 h-6 md:w-7 md:h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-20">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                {selectedCertificate.name}
              </h3>
              {selectedCertificate.description && (
                <div className="mt-2">
                  <p className="text-gray-600 text-sm md:text-base">
                    {selectedCertificate.description}
                  </p>
                  {selectedCertificate.certificateNo && (
                    <p className="text-gray-800 font-semibold mt-2 text-sm md:text-base">
                      Certificate No: {selectedCertificate.certificateNo}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Certificate Image */}
            <div className="p-4 relative w-full h-auto">
              <Image 
                src={selectedCertificate.image} 
                alt={selectedCertificate.name}
                width={800}
                height={600}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}

       <style jsx>{`
         .scrollbar-hide {
           -ms-overflow-style: none;
           scrollbar-width: none;
         }
         .scrollbar-hide::-webkit-scrollbar {
           display: none;
         }
       `}</style>
      </section>
    </>
  );
}

