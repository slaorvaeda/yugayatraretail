'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export default function NetworkGraphic() {
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

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup - positioned to show network in lower portion like reference
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    camera.position.y = 0; // Centered view
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create network nodes - exact match to reference image
    const nodeGeometry = new THREE.SphereGeometry(0.06, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x3B82F6,
      transparent: true,
      opacity: 0
    });

    const nodes = [];
    const nodePositions = [];

    // Generate curved bowl-like network pattern - exactly like reference
    for (let i = 0; i < 50; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
      
      // Create curved bowl distribution - like reference image
      const angle = (i / 50) * Math.PI * 2;
      const radius = 2.5 + Math.sin(angle * 3) * 0.8;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.2 - 1.2; // Position in lower area
      const z = Math.sin(angle * 2) * 0.6; // Curved bowl effect
      
      node.position.set(x, y, z);
      nodePositions.push(node.position.clone());
      
      scene.add(node);
      nodes.push(node);
    }

    nodesRef.current = nodes;

    // Create connecting lines - subtle like reference image
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x3B82F6,
      transparent: true,
      opacity: 0.2
    });

    const lines = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const distance = nodePositions[i].distanceTo(nodePositions[j]);
        if (distance < 1.8) {
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

    // GSAP animations for Three.js objects
    // Animate nodes entrance using scale property correctly
    nodes.forEach((node, index) => {
      node.scale.set(0, 0, 0);
      node.material.opacity = 0;
      
      gsap.to(node.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.5,
        delay: 0.5 + (index * 0.02),
        ease: "power2.out"
      });
      
       gsap.to(node.material, {
         opacity: 0.6,
         duration: 1.5,
         delay: 0.5 + (index * 0.02),
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
        duration: 1,
        delay: 1 + (index * 0.01),
        ease: "power2.out"
      });
      
       gsap.to(line.material, {
         opacity: 0.15,
         duration: 1,
         delay: 1 + (index * 0.01),
         ease: "power2.out"
       });
    });

    // Continuous floating animation
    nodes.forEach((node, index) => {
      const originalY = node.position.y;
      
      gsap.to(node.position, {
        y: originalY + Math.sin(index) * 0.1,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      gsap.to(node.rotation, {
        y: Math.PI * 2,
        duration: 5 + Math.random() * 5,
        repeat: -1,
        ease: "none"
      });
    });

    // Mouse interaction
    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      gsap.to(camera.position, {
        x: mouseX * 0.5,
        y: mouseY * 0.5,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Rotate the entire network
      scene.rotation.y += 0.002;
      
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
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
