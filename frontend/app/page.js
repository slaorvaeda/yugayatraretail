'use client';
import Hero from './components/Hero';
import ArtGalleryHero from './components/ArtGalleryHero';
import NetworkGraphic from './components/NetworkGraphic';
import NetworkGraphicFallback from './components/NetworkGraphicFallback';
import ExactImagePage from './components/ExactImagePage';
import ServicesSection from './components/ServicesSection';
import ModernServicesSection from './components/ModernServicesSection';
import MyWork from './components/MyWork';
import ResourcesSection from './components/ResourcesSection';
import CompanySection from './components/CompanySection';
import ContactSection from './components/ContactSection';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [useFallback, setUseFallback] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollbarRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Initial page load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check if Three.js is available
    const checkThreeJS = async () => {
      try {
        const THREE = await import('three');
        if (!THREE.WebGLRenderer) {
          setUseFallback(true);
        }
      } catch (error) {
        console.log('Three.js not available, using fallback');
        setUseFallback(true);
      }
    };

    checkThreeJS();
  }, []);

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
    <ErrorBoundary>
      <div className="min-h-screen relative">
        {/* Right Sidebar - Small Navigation (like training page) */}
        <div className="hidden sm:flex fixed right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-30">
          <div className="flex flex-col items-center gap-4">
            <div
              className="text-blue-900 font-bold text-xs tracking-widest opacity-80"
              style={{ 
                writingMode: 'vertical-rl', 
                textOrientation: 'mixed'
              }}
            >
              HOME
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
        {/* Light Theme Section */}
        <div id="home" className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 relative overflow-hidden">
          {/* 3D Network Graphic - positioned behind content */}
          <div className="absolute inset-0 z-0">
            <ErrorBoundary>
              {useFallback ? <NetworkGraphicFallback /> : <NetworkGraphic />}
            </ErrorBoundary>
          </div>
          
          {/* Content layers */}
          <div className="relative z-10">
            {/* Hero Section */}
            <Hero />
          </div>
        </div>

        {/* Shadow Div after Hero Section */}
        <div className="h-16 bg-gradient-to-t from-transparent via-blue-100/30 to-blue-200/50 -shadow-xl backdrop-blur-md"></div>

        {/* Solutions Section */}
        <div id="solutions">
          <ExactImagePage />
        </div>

        {/* Services Section */}
        <div id="services">
          <ServicesSection />
        </div>

        {/* Art Gallery Hero Section */}
        <div id="art-gallery">
          <ArtGalleryHero />
        </div>

        {/* Modern Services Section */}
        <div id="modern-services">
          <ModernServicesSection />
        </div>

        {/* My Work Section */}
        <div id="my-work">
          <MyWork />
        </div>
        
        {/* Resources Section */}
        <div id="resources">
          <ResourcesSection />
        </div>
        
        {/* Company Section */}
        <div id="company">
          <CompanySection />
        </div>
        
        {/* Contact Section */}
        <div id="contact">
          <ContactSection />
        </div>
        
      </div>
    </ErrorBoundary>
  );
}
