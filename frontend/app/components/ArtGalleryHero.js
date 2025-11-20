'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const artCards = [
    {
      id: 1,
      title: "SKILL TRAINING",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      content: "Comprehensive skill development programs designed to enhance your professional capabilities",
      rotation: -15,
      zIndex: 1
    },
    {
      id: 2,
      title: "CERTIFICATIONS",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      content: "Industry-recognized certifications that validate your expertise and boost career prospects",
      rotation: -10,
      zIndex: 2
    },
    {
      id: 3,
      title: "CAREER GUIDANCE",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
      content: "Expert mentorship and career counseling to help you navigate your professional journey",
      rotation: -5,
      zIndex: 3
    },
    {
      id: 4,
      title: "PLACEMENT SUPPORT",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      content: "Direct connections with top employers and placement assistance for your dream job",
      rotation: 0,
      zIndex: 4
    },
    {
      id: 5,
      title: "WORKFORCE ACADEMY",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
      content: "Structured workforce development programs tailored to industry requirements",
      rotation: 5,
      zIndex: 3
    },
    {
      id: 6,
      title: "DIGITAL LEARNING",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
      content: "Modern digital learning platforms with interactive content and real-time progress tracking",
      rotation: 10,
      zIndex: 2
    },
    {
      id: 7,
      title: "TALENT MARKETPLACE",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
      content: "Connect with opportunities and showcase your skills in our talent marketplace",
      rotation: 15,
      zIndex: 1
    }
];

const ArtGalleryHero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Use requestAnimationFrame to avoid synchronous state updates in effects
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Intersection Observer to detect when section is visible
  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of section is visible
        rootMargin: '0px'
      }
    );

    observer.observe(currentSection);

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [isVisible]);

  // Animate cards only when section is visible
  useEffect(() => {
    if (!isMounted || !isVisible) return;

    // Set initial state for all cards - they start as one set below the viewport
    gsap.set(cardsRef.current, {
      y: 200,
      opacity: 0,
      scale: 0.8,
      rotation: 0
    });

    // Create timeline for the animation
    const tl = gsap.timeline({ delay: 0.3 });

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

  }, [isMounted, isVisible]);

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center px-4 py-12 lg:py-20">
      {/* Mobile Design - Different Layout */}
      <div className="lg:hidden w-full">
        <div className="text-center mb-8" data-aos="fade-up" data-aos-delay="100">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
            <span>A place to showcase your</span>
            <br />
            <span className="text-4xl sm:text-5xl">professional skills.</span>
          </h1>
        </div>

        {/* Mobile: Simple Grid of Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8" data-aos="fade-up" data-aos-delay="200">
          {artCards.slice(0, 4).map((card, index) => (
            <div
              key={card.id}
              className="rounded-xl p-4 shadow-lg h-48 flex flex-col items-center justify-center relative overflow-hidden transform transition-all duration-150 ease-out hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
            >
              {/* Blurred Background */}
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  filter: 'blur(2px)',
                  transform: 'scale(1.05)'
                }}
              />
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6))'
                }}
              />
              <div className="text-white font-bold text-sm mb-2 text-center relative z-10">
                {card.title}
              </div>
              <div className="text-white/90 text-xs text-center relative z-10">
                {card.content.split(' ').slice(0, 5).join(' ')}...
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-6" data-aos="fade-up" data-aos-delay="300">
          <p className="text-sm text-gray-700 leading-relaxed px-4">
            Professionals can showcase their skills, and employers can discover talent that drives success.
          </p>
        </div>

        <div className="flex flex-col gap-3 px-4" data-aos="fade-up" data-aos-delay="400">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium text-base shadow-lg hover:bg-blue-700 transition-colors">
            Start Your Journey
          </button>
          <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-medium text-base border-2 border-gray-200 shadow-md hover:border-blue-300 transition-colors">
            Explore Programs
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
            <span data-aos="fade-up" data-aos-delay="200">A place to showcase your</span>{' '}
            <span className="text-8xl" data-aos="fade-up" data-aos-delay="300">professional skills.</span>
          </h1>
        </motion.div>

        {/* Art Cards Container */}
        <div className="relative mb-16 w-full max-w-6xl">
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
            #SkillDevelopment
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
            #CareerGrowth
          </div>
        </motion.div>

        {/* Art Cards */}
        <div ref={cardsContainerRef} className="flex justify-center items-center relative h-80">
          {artCards.map((card, index) => (
            <div
              key={card.id}
              ref={el => cardsRef.current[index] = el}
              className="absolute w-48 h-64 rounded-3xl shadow-2xl cursor-pointer flex flex-col items-center justify-center transform transition-all duration-150 hover:shadow-3xl overflow-hidden"
              style={{
                left: `${20 + (index * 8)}%`,
                top: '0px',
                zIndex: card.zIndex
              }}
              onMouseEnter={() => {
                if (!isMounted || !isVisible) return;
                const currentY = gsap.getProperty(cardsRef.current[index], "y") || 0;
                gsap.to(cardsRef.current[index], {
                  scale: 1.05,
                  rotation: card.rotation + 5,
                  y: currentY - 20,
                  zIndex: 10,
                  duration: 0.15,
                  ease: "power1.out",
                  immediateRender: false
                });
              }}
              onMouseLeave={() => {
                if (!isMounted || !isVisible) return;
                const baseY = Math.sin(index * 0.5) * 20;
                gsap.to(cardsRef.current[index], {
                  scale: 1,
                  rotation: card.rotation,
                  y: baseY,
                  zIndex: card.zIndex,
                  duration: 0.15,
                  ease: "power1.out",
                  immediateRender: false
                });
              }}
            >
              {/* Blurred Background */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  filter: 'blur(2px)',
                  transform: 'scale(1.05)'
                }}
              />
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6))'
                }}
              />
              <div className="text-white font-bold text-lg mb-2 text-center px-4 relative z-10 drop-shadow-lg">
                {card.title}
              </div>
              <div className="text-white/90 text-xs text-center px-4 relative z-10 drop-shadow-md">
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
            Professionals can showcase their skills and achievements, while employers can discover talented individuals who drive innovation and success.
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
            className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-medium text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-blue-700"
            data-aos="zoom-in"
            data-aos-delay="1400"
          >
            Start Your Journey
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-medium text-lg border-2 border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay="1500"
          >
            Explore Programs
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ArtGalleryHero;
