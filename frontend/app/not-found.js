'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';

function createSeededRandom(seed) {
  let value = seed;
  return function random() {
    value |= 0;
    value = (value + 0x6d2b79f5) | 0;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function NotFound() {
  const containerRef = useRef(null);
  const fourLeftRef = useRef(null);
  const fourRightRef = useRef(null);
  const holeRef = useRef(null);
  const ladderRef = useRef(null);
  const oopsTextRef = useRef(null);
  const messageTextRef = useRef(null);
  const buttonRef = useRef(null);
  const fourLeftFloatRef = useRef(null);
  const fourRightFloatRef = useRef(null);

  const particleConfigs = useMemo(() => {
    const rand = createSeededRandom(20251107);
    return Array.from({ length: 20 }).map(() => {
      const width = rand() * 4 + 2;
      const height = rand() * 4 + 2;
      const left = rand() * 100;
      const top = rand() * 100;
      const duration = 5 + rand() * 5;
      const delay = rand() * 2;

      return {
        width,
        height,
        left,
        top,
        duration,
        delay,
      };
    });
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate "OOPS!" text
    tl.fromTo(
      oopsTextRef.current,
      { opacity: 0, y: -30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6 }
    );

    // Animate message text
    tl.fromTo(
      messageTextRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    );

    // Animate left "4"
    gsap.set(fourLeftRef.current, {
      opacity: 0,
      scale: 0.5,
      transform: 'rotateY(-45deg) rotateX(-90deg) translateZ(-100px)',
    });
    tl.to(
      fourLeftRef.current,
      {
        opacity: 1,
        scale: 1,
        transform: 'rotateY(-15deg) rotateX(10deg) translateZ(0px)',
        duration: 0.8,
        ease: 'back.out(1.2)',
      },
      '-=0.4'
    );

    // Animate right "4"
    gsap.set(fourRightRef.current, {
      opacity: 0,
      scale: 0.5,
      transform: 'rotateY(45deg) rotateX(-90deg) translateZ(-100px)',
    });
    tl.to(
      fourRightRef.current,
      {
        opacity: 1,
        scale: 1,
        transform: 'rotateY(15deg) rotateX(10deg) translateZ(0px)',
        duration: 0.8,
        ease: 'back.out(1.2)',
      },
      '-=0.6'
    );

    // Animate the hole
    tl.fromTo(
      holeRef.current,
      { opacity: 0, scale: 0, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
      },
      '-=0.5'
    );

    // Animate ladder descending into hole
    gsap.set(ladderRef.current, {
      opacity: 0,
      transform: 'translateY(-50px) rotateX(90deg)',
    });
    tl.to(
      ladderRef.current,
      {
        opacity: 1,
        transform: 'translateY(0px) rotateX(15deg)',
        duration: 1,
        ease: 'power2.out',
      },
      '-=0.3'
    );

    // Animate button
    tl.fromTo(
      buttonRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.5)',
      },
      '-=0.2'
    );

    // Continuous subtle animations
    fourLeftFloatRef.current = gsap.to(fourLeftRef.current, {
      y: '+=10',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    fourRightFloatRef.current = gsap.to(fourRightRef.current, {
      y: '+=10',
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    gsap.to(ladderRef.current, {
      rotationZ: '+=2',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Hole pulse animation
    gsap.to(holeRef.current, {
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, []);

  const handleButtonHover = () => {
    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleButtonLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleFourHover = (ref, floatAnimRef) => {
    if (floatAnimRef.current) {
      floatAnimRef.current.pause();
    }
    gsap.to(ref.current, {
      scale: 1.15,
      z: 30,
      rotationX: 15,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleFourLeave = (ref, floatAnimRef) => {
    if (floatAnimRef.current) {
      floatAnimRef.current.resume();
    }
    gsap.to(ref.current, {
      scale: 1,
      z: 0,
      rotationX: 10,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1e40af 100%)',
        perspective: '1000px',
      }}
    >
      {/* 3D Room Corner Effect */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, rgba(30, 64, 175, 0.9) 0%, rgba(30, 58, 138, 0.95) 100%),
            radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(37, 99, 235, 0.2) 0%, transparent 50%)
          `,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        {/* OOPS Text */}
        <h1
          ref={oopsTextRef}
          className="mb-4 text-6xl font-bold text-white sm:text-7xl md:text-8xl"
          style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
        >
          OOPS!
        </h1>

        {/* Message Text */}
        <p
          ref={messageTextRef}
          className="mb-12 text-center text-lg text-white/90 sm:text-xl md:text-2xl"
        >
          We can&apos;t find the page that you&apos;re looking for :(
        </p>

        {/* 404 Visual */}
        <div className="relative mb-12 flex items-center justify-center">
          {/* Left "4" */}
          <div
            ref={fourLeftRef}
            className="relative cursor-pointer"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateY(-15deg) rotateX(10deg)',
            }}
            onMouseEnter={() => handleFourHover(fourLeftRef, fourLeftFloatRef)}
            onMouseLeave={() => handleFourLeave(fourLeftRef, fourLeftFloatRef)}
          >
            <div
              className="relative"
              style={{
                fontSize: 'clamp(80px, 15vw, 200px)',
                fontWeight: '900',
                color: '#3b82f6',
                textShadow: `
                  8px 8px 0px rgba(30, 58, 138, 0.8),
                  16px 16px 0px rgba(30, 58, 138, 0.6),
                  0 0 40px rgba(59, 130, 246, 0.5)
                `,
                filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))',
              }}
            >
              4
            </div>
            {/* 3D Depth Effect - Left side */}
            <div
              className="absolute inset-0"
              style={{
                transform: 'translateZ(-40px) translateX(40px)',
                color: '#1e3a8a',
                opacity: 0.6,
              }}
            >
              4
            </div>
          </div>

          {/* Center Hole (0) */}
          <div
            ref={holeRef}
            className="relative mx-8 sm:mx-12 md:mx-16"
            style={{
              width: 'clamp(120px, 20vw, 250px)',
              height: 'clamp(120px, 20vw, 250px)',
            }}
          >
            {/* Hole */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
                boxShadow: `
                  inset 0 0 60px rgba(0, 0, 0, 0.8),
                  0 10px 40px rgba(0, 0, 0, 0.4),
                  0 0 80px rgba(59, 130, 246, 0.2)
                `,
                border: '3px solid rgba(59, 130, 246, 0.3)',
              }}
            />

            {/* Ladder */}
            <div
              ref={ladderRef}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateY(20%) rotateX(15deg)',
              }}
            >
              <svg
                width="60%"
                height="80%"
                viewBox="0 0 100 200"
                style={{ transform: 'translateY(30px)' }}
              >
                {/* Ladder rails */}
                <rect
                  x="15"
                  y="0"
                  width="8"
                  height="180"
                  fill="#d97706"
                  opacity="0.9"
                  style={{
                    filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                  }}
                />
                <rect
                  x="77"
                  y="0"
                  width="8"
                  height="180"
                  fill="#d97706"
                  opacity="0.9"
                  style={{
                    filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                  }}
                />
                {/* Ladder rungs */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <rect
                    key={i}
                    x="15"
                    y={15 + i * 15}
                    width="70"
                    height="4"
                    fill="#f59e0b"
                    opacity="0.8"
                    style={{
                      filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.4))',
                    }}
                  />
                ))}
              </svg>
            </div>

            {/* Inner glow */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Right "4" */}
          <div
            ref={fourRightRef}
            className="relative cursor-pointer"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateY(15deg) rotateX(10deg)',
            }}
            onMouseEnter={() => handleFourHover(fourRightRef, fourRightFloatRef)}
            onMouseLeave={() => handleFourLeave(fourRightRef, fourRightFloatRef)}
          >
            <div
              className="relative"
              style={{
                fontSize: 'clamp(80px, 15vw, 200px)',
                fontWeight: '900',
                color: '#3b82f6',
                textShadow: `
                  8px 8px 0px rgba(30, 58, 138, 0.8),
                  16px 16px 0px rgba(30, 58, 138, 0.6),
                  0 0 40px rgba(59, 130, 246, 0.5)
                `,
                filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))',
              }}
            >
              4
            </div>
            {/* 3D Depth Effect - Right side */}
            <div
              className="absolute inset-0"
              style={{
                transform: 'translateZ(-40px) translateX(-40px)',
                color: '#1e3a8a',
                opacity: 0.6,
              }}
            >
              4
            </div>
          </div>
        </div>

        {/* BACK TO HOME Button */}
        <Link
          href="/"
          ref={buttonRef}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
          className="relative inline-block rounded-full border-2 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 sm:px-12 sm:py-5 sm:text-xl"
          style={{
            borderColor: '#fbbf24',
            background: 'rgba(30, 64, 175, 0.3)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(251, 191, 36, 0.3)',
          }}
        >
          <span className="relative z-10">BACK TO HOME</span>
          <div
            className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(251, 191, 36, 0.1) 100%)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0';
            }}
          />
        </Link>
      </div>

      {/* Floating particles for extra depth */}
      <div className="absolute inset-0 overflow-hidden">
        {particleConfigs.map((config, index) => (
          <div
            key={index}
            className="absolute rounded-full"
            style={{
              width: `${config.width}px`,
              height: `${config.height}px`,
              background: 'rgba(59, 130, 246, 0.4)',
              left: `${config.left}%`,
              top: `${config.top}%`,
              animation: `float ${config.duration}s infinite ease-in-out`,
              animationDelay: `${config.delay}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}

