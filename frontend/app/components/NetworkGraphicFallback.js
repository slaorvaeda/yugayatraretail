'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function NetworkGraphicFallback() {
  const containerRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create CSS-based network nodes
    const container = containerRef.current;
    const nodes = [];

    // Create nodes - larger size and more prominent
    for (let i = 0; i < 60; i++) {
      const node = document.createElement('div');
      node.className = 'absolute w-4 h-4 bg-blue-400 rounded-full opacity-0 shadow-lg';
      
      // Position nodes in a curved pattern - larger radius
      const angle = (i / 60) * Math.PI * 2;
      const radius = 400 + Math.sin(angle * 3) * 120;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.3 + 150; // Position lower on screen
      
      node.style.left = `calc(50% + ${x}px)`;
      node.style.top = `calc(65% + ${y}px)`; // Position in lower area
      
      container.appendChild(node);
      nodes.push(node);
    }

    nodesRef.current = nodes;

    // Animate nodes entrance
    gsap.fromTo(nodes,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 0.8,
        duration: 1.5,
        stagger: 0.05,
        delay: 0.5,
        ease: "power2.out"
      }
    );

    // Continuous floating animation
    nodes.forEach((node, index) => {
      gsap.to(node, {
        y: `+=${Math.sin(index) * 10}px`,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    });

    // Mouse interaction
    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      gsap.to(container, {
        transform: `translate(${mouseX * 20}px, ${mouseY * 20}px)`,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      nodes.forEach(node => {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
