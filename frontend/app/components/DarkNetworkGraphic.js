'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export default function DarkNetworkGraphic() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const nodesRef = useRef([]);
  const linesRef = useRef([]);
  const animationIdRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const mountElement = mountRef.current;
    if (!mountElement) return;

    // Scene setup with dark background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1a); // Dark blue-green background
    sceneRef.current = scene;

    // Camera setup - positioned to show network in center
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;
    camera.position.y = 0;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: false, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0f1a, 1); // Dark background
    mountElement.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create glowing network nodes - teal-green with glow effect
    const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ffcc, // Bright teal-green
      transparent: true,
      opacity: 0
    });

    // Add glow effect to nodes
    const glowGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffcc,
      transparent: true,
      opacity: 0.1
    });

    const nodes = [];
    const nodePositions = [];

    // Generate undulating wave-like network pattern
    for (let i = 0; i < 100; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
      
      // Create undulating wave distribution
      const angle = (i / 100) * Math.PI * 2;
      const radius = 3 + Math.sin(angle * 4) * 1.5;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle * 3) * 0.8 + Math.sin(angle * 8) * 0.3; // Wave pattern
      const z = Math.sin(angle * 2) * 1.2 + Math.cos(angle * 6) * 0.4; // Bowl effect
      
      node.position.set(x, y, z);
      nodePositions.push(node.position.clone());
      
      // Add glow effect
      const glow = new THREE.Mesh(glowGeometry, glowMaterial.clone());
      glow.position.copy(node.position);
      scene.add(glow);
      
      scene.add(node);
      nodes.push(node);
    }

    nodesRef.current = nodes;

    // Create connecting lines with glow effect
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00ffcc,
      transparent: true,
      opacity: 0.3
    });

    const lines = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const distance = nodePositions[i].distanceTo(nodePositions[j]);
        if (distance < 2.5) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            nodePositions[i],
            nodePositions[j]
          ]);
          const line = new THREE.Line(geometry, lineMaterial);
          scene.add(line);
          lines.push(line);
        }
      }
    }

    linesRef.current = lines;

    // GSAP animations for glowing entrance
    nodes.forEach((node, index) => {
      node.scale.set(0, 0, 0);
      node.material.opacity = 0;
      
      gsap.to(node.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 2,
        delay: 0.5 + (index * 0.01),
        ease: "power2.out"
      });
      
      gsap.to(node.material, {
        opacity: 0.8,
        duration: 2,
        delay: 0.5 + (index * 0.01),
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
        delay: 1 + (index * 0.005),
        ease: "power2.out"
      });
      
      gsap.to(line.material, {
        opacity: 0.4,
        duration: 1.5,
        delay: 1 + (index * 0.005),
        ease: "power2.out"
      });
    });

    // Continuous floating animation
    nodes.forEach((node, index) => {
      const originalY = node.position.y;
      
      gsap.to(node.position, {
        y: originalY + Math.sin(index * 0.1) * 0.2,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      gsap.to(node.rotation, {
        y: Math.PI * 2,
        duration: 8 + Math.random() * 4,
        repeat: -1,
        ease: "none"
      });
    });

    // Mouse interaction
    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      gsap.to(camera.position, {
        x: mouseX * 0.8,
        y: mouseY * 0.8,
        duration: 1.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Rotate the entire network slowly
      scene.rotation.y += 0.001;
      
      renderer.render(scene, camera);
    };
    animate();

    // Set loaded state
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
      if (mountElement && renderer.domElement) {
        mountElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
