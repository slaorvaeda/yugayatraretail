'use client';
import React, { useEffect, useRef, useState } from 'react';
import AboutHero from '../components/AboutHero';
import SharingIsCaring from '../components/SharingIsCaring';
import MoneyTalentTime from '../components/MoneyTalentTime';
import SecretOfLiving from '../components/SecretOfLiving';
import EndlessPossibilities from '../components/EndlessPossibilities';
import FourDSharing from '../components/FourDSharing';
import SharingNewWay from '../components/SharingNewWay';
import ToSomethingEverything from '../components/ToSomethingEverything';
import ContactsUs from '../components/ContactsUs';
import Loader from '../components/Loader';
import { usePageLoader } from '../components/usePageLoader';

export default function AboutPage() {
  const loading = usePageLoader(300);
  const scrollbarRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Ensure smooth scrolling is enabled
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading) {
    return <Loader fullScreen={true} message="Loading..." />;
  }

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#F8F8F8' }}>
      {/* Left Sidebar - Small Navigation */}
      <div className="hidden sm:flex fixed left-4 md:left-6 top-1/2 transform -translate-y-1/2 z-30">
        <div className="flex flex-col items-center gap-4">
          <div
            className="text-blue-900 font-bold text-xs tracking-widest opacity-80"
            style={{
              writingMode: 'vertical-rl', 
              textOrientation: 'mixed',
              transform: 'rotate(180deg)'
            }}
          >
            ABOUT
          </div>
          <div className="w-0.5 h-24 bg-blue-300/30 rounded-full relative overflow-hidden">
            <div
              ref={scrollbarRef}
              className="absolute bottom-0 w-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ height: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </div>
      <div data-aos="fade-up">
        <AboutHero />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <SharingIsCaring />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <MoneyTalentTime />
      </div>
      <div data-aos="fade-up" data-aos-delay="300">
        <SecretOfLiving />
      </div>
      <div data-aos="fade-up" data-aos-delay="400">
        <EndlessPossibilities />
      </div>
      <div data-aos="fade-up" data-aos-delay="500">
        <FourDSharing />
      </div>
      <div data-aos="fade-up" data-aos-delay="600">
        <SharingNewWay />
      </div>
      <div data-aos="fade-up" data-aos-delay="700">
        <ToSomethingEverything />
      </div>
      <div data-aos="fade-up" data-aos-delay="800">
        <ContactsUs />
      </div>
    </div>
  );
}

