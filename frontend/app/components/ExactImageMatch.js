'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export default function ExactImageMatch() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const nodesRef = useRef([]);
  const linesRef = useRef([]);
  const animationIdRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup with transparent background
    const scene = new THREE.Scene();
    // No background color - transparent
    sceneRef.current = scene;

    // Camera setup - positioned to show network in center like image
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 6;
    camera.position.y = 0;
    cameraRef.current = camera;

    // Renderer setup with transparent background
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, // Enable transparency
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1); // Transparent background
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create sonic waves - blue theme to match website
    const waveGeometry = new THREE.PlaneGeometry(8, 2, 100, 20);
    const waveMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x84B6F4, // Blue color to match website theme
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });

    const waves = [];
    const wavePositions = [];

    // Generate multiple sonic wave layers
    for (let waveIndex = 0; waveIndex < 5; waveIndex++) {
      const wave = new THREE.Mesh(waveGeometry, waveMaterial.clone());
      
      // Position waves in bowl-like formation
      const waveY = -1.5 + (waveIndex * 0.3);
      const waveZ = Math.sin(waveIndex * 0.5) * 0.5;
      
      wave.position.set(0, waveY, waveZ);
      wave.rotation.x = -Math.PI / 6; // Slight angle
      
      // Create wave distortion
      const positions = wave.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);
        
        // Create sonic wave pattern
        const waveHeight = Math.sin(x * 2 + waveIndex * 0.5) * 0.3 + 
                          Math.sin(x * 4 + waveIndex * 1.2) * 0.15 +
                          Math.sin(x * 8 + waveIndex * 2.1) * 0.08;
        
        positions.setZ(i, z + waveHeight);
      }
      positions.needsUpdate = true;
      
      scene.add(wave);
      waves.push(wave);
    }

    nodesRef.current = waves;

    // Create wave connection lines
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x3B82F6, // Blue color to match website theme
      transparent: true,
      opacity: 0.3
    });

    const lines = [];
    // Create connecting lines between wave peaks
    for (let waveIndex = 0; waveIndex < waves.length - 1; waveIndex++) {
      const currentWave = waves[waveIndex];
      const nextWave = waves[waveIndex + 1];
      
      // Create lines connecting wave peaks
      for (let i = 0; i < 20; i++) {
        const x = (i / 19) * 8 - 4;
        const y1 = currentWave.position.y + Math.sin(x * 2) * 0.2;
        const y2 = nextWave.position.y + Math.sin(x * 2) * 0.2;
        
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(x, y1, currentWave.position.z),
          new THREE.Vector3(x, y2, nextWave.position.z)
        ]);
        
        const line = new THREE.Line(geometry, lineMaterial);
        scene.add(line);
        lines.push(line);
      }
    }

    linesRef.current = lines;

    // GSAP animations for sonic waves
    waves.forEach((wave, index) => {
      wave.scale.set(0, 0, 0);
      wave.material.opacity = 0;
      
      gsap.to(wave.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 2,
        delay: 0.5 + (index * 0.2),
        ease: "power2.out"
      });
      
      gsap.to(wave.material, {
        opacity: 0.8,
        duration: 2,
        delay: 0.5 + (index * 0.2),
        ease: "power2.out"
      });
    });

    // Animate lines entrance
    lines.forEach((line, index) => {
      line.scale.set(0, 0, 0);
      line.material.opacity = 0;
      
      gsap.to(line.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.5,
        delay: 1 + (index * 0.01),
        ease: "power2.out"
      });
      
      gsap.to(line.material, {
        opacity: 0.3,
        duration: 1.5,
        delay: 1 + (index * 0.01),
        ease: "power2.out"
      });
    });

    // Continuous sonic wave animation
    waves.forEach((wave, index) => {
      // Animate wave distortion
      gsap.to(wave.geometry.attributes.position, {
        onUpdate: () => {
          const positions = wave.geometry.attributes.position;
          const time = Date.now() * 0.001;
          
          for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const originalZ = positions.getZ(i);
            
            // Create moving sonic waves
            const waveHeight = Math.sin(x * 2 + time * 2 + index * 0.5) * 0.3 + 
                              Math.sin(x * 4 + time * 3 + index * 1.2) * 0.15 +
                              Math.sin(x * 8 + time * 4 + index * 2.1) * 0.08;
            
            positions.setZ(i, originalZ + waveHeight);
          }
          positions.needsUpdate = true;
        },
        duration: 0.1,
        repeat: -1,
        ease: "none"
      });
    });

    // Mouse interaction
    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      gsap.to(camera.position, {
        x: mouseX * 0.6,
        y: mouseY * 0.6,
        duration: 2,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Slow rotation like image
      scene.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
    };
    animate();

    setIsLoaded(true);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
}
