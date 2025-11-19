'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function ScrollIndicator() {
  const indicatorRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  useEffect(() => {
    // Animate indicator entrance
    gsap.fromTo(indicatorRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, delay: 1, ease: "back.out(1.7)" }
    );
  }, []);

  return (
    <div 
      ref={indicatorRef}
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50"
    >
      <div className="w-1 h-32 bg-blue-200 rounded-full overflow-hidden">
        <div 
          className="w-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
}
