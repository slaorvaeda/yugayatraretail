'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import DarkNetworkGraphic from './DarkNetworkGraphic';

export default function DarkPage() {
  const pageRef = useRef(null);
  const textBlocksRef = useRef([]);

  useEffect(() => {
    // Page entrance animation
    gsap.fromTo(pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Staggered text blocks animation
    gsap.fromTo(textBlocksRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.3,
        delay: 1,
        ease: "power2.out"
      }
    );
  }, []);

  return (
    <div 
      ref={pageRef}
      className="min-h-screen bg-gray-900 relative overflow-hidden"
    >
      {/* Dark Network Graphic */}
      <DarkNetworkGraphic />
      
      {/* Text Blocks - positioned in upper third */}
      <div className="absolute top-20 left-0 right-0 z-10 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Text Block 1 */}
          <div 
            ref={el => textBlocksRef.current[0] = el}
            className="text-white space-y-4"
          >
            <h3 className="text-lg font-semibold text-teal-400">
              Advanced Technology
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Cutting-edge solutions that revolutionize how businesses operate. 
              Our platform integrates seamlessly with existing systems.
            </p>
          </div>

          {/* Text Block 2 */}
          <div 
            ref={el => textBlocksRef.current[1] = el}
            className="text-white space-y-4"
          >
            <h3 className="text-lg font-semibold text-teal-400">
              Global Connectivity
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Connect with partners worldwide through our secure, 
              high-performance network infrastructure.
            </p>
          </div>

          {/* Text Block 3 */}
          <div 
            ref={el => textBlocksRef.current[2] = el}
            className="text-white space-y-4"
          >
            <h3 className="text-lg font-semibold text-teal-400">
              Future Innovation
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Pioneering the next generation of digital transformation. 
              Experience tomorrow's technology today.
            </p>
          </div>
        </div>
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,204,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,204,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  );
}
