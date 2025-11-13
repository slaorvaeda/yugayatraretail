'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const artCards = [
    {
      id: 1,
      title: "TESLA",
      colors: "bg-red-500",
      content: "Nikola Tesla inspired artwork with red, black, white, and green tones",
      rotation: -15,
      zIndex: 1
    },
    {
      id: 2,
      title: "Abstract Blue",
      colors: "bg-blue-400",
      content: "Abstract blue and white line art with stylized figures",
      rotation: -10,
      zIndex: 2
    },
    {
      id: 3,
      title: "Friends Pack",
      colors: "bg-yellow-400",
      content: "Bright yellow card with cartoon figures and 'Friends' branding",
      rotation: -5,
      zIndex: 3
    },
    {
      id: 4,
      title: "Colorful Abstract",
      colors: "bg-pink-400",
      content: "Abstract colorful illustration with geometric shapes",
      rotation: 0,
      zIndex: 4
    },
    {
      id: 5,
      title: "Portrait",
      colors: "bg-red-600",
      content: "Realistic painting with hand covering face and red stripes",
      rotation: 5,
      zIndex: 3
    },
    {
      id: 6,
      title: "Independence",
      colors: "bg-blue-600",
      content: "Bold text with red poppy flowers and blue elements",
      rotation: 10,
      zIndex: 2
    },
    {
      id: 7,
      title: "Green Portrait",
      colors: "bg-green-500",
      content: "Vibrant green card with stylized text and graphics",
      rotation: 15,
      zIndex: 1
    }
];

const ArtGalleryHero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Use requestAnimationFrame to avoid synchronous state updates in effects
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Set initial state for all cards - they start as one set below the viewport
    gsap.set(cardsRef.current, {
      y: 200,
      opacity: 0,
      scale: 0.8,
      rotation: 0
    });

    // Create timeline for the animation
    const tl = gsap.timeline({ delay: 1 });

    // First, bring all cards up as one set
    tl.to(cardsRef.current, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.1
    });

    // Then spread them out with their individual rotations and positions
    tl.to(cardsRef.current, {
      rotation: (index) => artCards[index].rotation,
      x: (index) => (index - 3) * 60, // Spread them horizontally
      y: (index) => Math.sin(index * 0.5) * 20, // Add some vertical variation
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
      stagger: 0.15
    }, "-=0.5");

  }, [isMounted]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center px-4 py-12 lg:py-20" data-aos="fade-up">
      {/* Mobile Design - Different Layout */}
      <div className="lg:hidden w-full">
        <div className="text-center mb-8" data-aos="fade-up" data-aos-delay="100">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
            <span>A place to display your</span>
            <br />
            <span className="text-4xl sm:text-5xl">masterpiece.</span>
          </h1>
        </div>

        {/* Mobile: Simple Grid of Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8" data-aos="fade-up" data-aos-delay="200">
          {artCards.slice(0, 4).map((card, index) => (
            <div
              key={card.id}
              className={`${card.colors} rounded-xl p-4 shadow-lg h-48 flex flex-col items-center justify-center`}
            >
              <div className="text-white font-bold text-sm mb-2 text-center">
                {card.title}
              </div>
              <div className="text-white/80 text-xs text-center">
                {card.content.split(' ').slice(0, 5).join(' ')}...
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-6" data-aos="fade-up" data-aos-delay="300">
          <p className="text-sm text-gray-700 leading-relaxed px-4">
            Artists can display their masterpieces, and buyers can discover works that resonate.
          </p>
        </div>

        <div className="flex flex-col gap-3 px-4" data-aos="fade-up" data-aos-delay="400">
          <button className="bg-black text-white px-6 py-3 rounded-xl font-medium text-base shadow-lg">
            Join for free now
          </button>
          <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-medium text-base border-2 border-gray-200 shadow-md">
            Read more
          </button>
        </div>
      </div>

      {/* Desktop Design - Original Layout (Unchanged) */}
      <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h1 className="text-7xl font-black text-gray-900 leading-tight">
            <span data-aos="fade-up" data-aos-delay="200">A place to display your</span>{' '}
            <span className="text-8xl" data-aos="fade-up" data-aos-delay="300">masterpiece.</span>
          </h1>
        </motion.div>

        {/* Art Cards Container */}
        <div className="relative mb-16 w-full max-w-6xl" data-aos="zoom-in" data-aos-delay="400">
        {/* Speech Bubbles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute -top-8 left-1/4 z-20"
          data-aos="fade-down"
          data-aos-delay="500"
        >
          <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            @coplin
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute -top-8 right-1/4 z-20"
          data-aos="fade-down"
          data-aos-delay="600"
        >
          <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            @andrea
          </div>
        </motion.div>

        {/* Art Cards */}
        <div ref={cardsContainerRef} className="flex justify-center items-center relative h-80" data-aos="fade-up" data-aos-delay="700">
          {artCards.map((card, index) => (
            <div
              key={card.id}
              ref={el => cardsRef.current[index] = el}
              className={`
                absolute w-48 h-64 rounded-3xl shadow-2xl cursor-pointer
                ${card.colors} 
                flex flex-col items-center justify-center
                transform transition-all duration-300
                hover:shadow-3xl
              `}
              style={{
                left: `${20 + (index * 8)}%`,
                top: isMounted ? `${Math.sin(index * 0.5) * 20}px` : '0px',
                zIndex: card.zIndex
              }}
              data-aos="zoom-in"
              data-aos-delay={`${800 + (index * 50)}`}
              onMouseEnter={() => {
                if (!isMounted) return;
                gsap.to(cardsRef.current[index], {
                  scale: 1.05,
                  rotation: card.rotation + 5,
                  y: "-=15",
                  zIndex: 10,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
              onMouseLeave={() => {
                if (!isMounted) return;
                gsap.to(cardsRef.current[index], {
                  scale: 1,
                  rotation: card.rotation,
                  y: "+=15",
                  zIndex: card.zIndex,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
            >
              <div className="text-white font-bold text-lg mb-2 text-center px-4">
                {card.title}
              </div>
              <div className="text-white/80 text-xs text-center px-4">
                {card.content}
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Descriptive Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mb-12 max-w-2xl"
          data-aos="fade-up"
          data-aos-delay="1200"
        >
          <p className="text-xl text-gray-700 leading-relaxed">
            Artists can display their masterpieces, and buyers can discover and purchase works that resonate with them.
          </p>
        </motion.div>

        {/* Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-row gap-4 items-center"
          data-aos="fade-up"
          data-aos-delay="1300"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-8 py-4 rounded-2xl font-medium text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay="1400"
          >
            Join for free now
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-medium text-lg border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay="1500"
          >
            Read more
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ArtGalleryHero;
