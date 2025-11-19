'use client';
import React, { useEffect, useRef, useState } from 'react';
import TrainHero from '../components/TrainHero';
import TrainingCards from '../components/MedicationCards';
import Loader from '../components/Loader';
import { usePageLoader } from '../components/usePageLoader';

export default function TrainingPage() {
  const loading = usePageLoader(300);
  const scrollbarRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
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

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <Loader fullScreen={true} message="Loading..." />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
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
            TRAINING
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

      <TrainHero />
      
      {/* Training Cards Section */}
      <TrainingCards />
    </div>
  );
}

