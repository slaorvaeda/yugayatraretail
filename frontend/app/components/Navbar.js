'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Navbar() {
  const navbarRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const [showNavLinks, setShowNavLinks] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const navLinksRef = useRef(null);
  const navbarContainerRef = useRef(null);
  const scrollTimerRef = useRef(null);
  const isHoveredRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    // Navbar center opening animation
    gsap.fromTo(navbarRef.current, 
      { 
        scaleX: 0,
        scaleY: 1,
        opacity: 0,
        transformOrigin: "center center"
      },
      { 
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        duration: 1.2, 
        ease: "power3.out" 
      }
    );

    // Set initial state for nav links - visible
    if (navLinksRef.current) {
      const linksContainer = navLinksRef.current;
      linksContainer.style.width = 'auto';
      linksContainer.style.opacity = '1';
      linksContainer.style.pointerEvents = 'auto';
      linksContainer.style.visibility = 'visible';
    }
  }, []);

  useEffect(() => {
    // Mobile menu slide animation
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.fromTo(mobileMenuRef.current,
          { x: '100%', opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
      } else {
        gsap.to(mobileMenuRef.current,
          { x: '100%', opacity: 0, duration: 0.3, ease: 'power2.in' }
        );
      }
    }
  }, [isMobileMenuOpen]);

  // Update hover ref when state changes
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    // Scroll detection - auto-hide nav links after 1.5 seconds of scrolling
    const handleScroll = () => {
      // Clear any existing hide timer
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }

      // Set timer to hide nav links after 1.5 seconds (only if not hovering)
      // Don't show nav links on scroll - only hide them
      scrollTimerRef.current = setTimeout(() => {
        if (!isHoveredRef.current) {
          setShowNavLinks(false);
        }
      }, 1500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Animate nav links on show/hide - use requestAnimationFrame to batch state updates
    if (!navLinksRef.current || !navbarContainerRef.current) return;
    
    const linksContainer = navLinksRef.current;
    const navbarContainer = navbarContainerRef.current;
    
    // Determine target state
    const shouldShow = showNavLinks || isHovered;
    
    // Check actual DOM state to prevent unnecessary animations
    const currentWidth = parseFloat(linksContainer.style.width) || linksContainer.offsetWidth || 0;
    const currentOpacity = parseFloat(linksContainer.style.opacity) || (linksContainer.offsetWidth > 0 ? 1 : 0);
    const isCurrentlyVisible = currentWidth > 20 && currentOpacity > 0.5;
    
    // Skip if already in desired state or currently animating
    if ((shouldShow && isCurrentlyVisible && !isAnimatingRef.current) || 
        (!shouldShow && !isCurrentlyVisible && !isAnimatingRef.current) ||
        isAnimatingRef.current) {
      return;
    }
    
    // Use requestAnimationFrame to batch updates and prevent double triggers
    requestAnimationFrame(() => {
      if (shouldShow && !isCurrentlyVisible) {
        // Show animation - expand from center
        isAnimatingRef.current = true;
        isVisibleRef.current = true;
        gsap.killTweensOf([linksContainer, navbarContainer]);
        
        // Set initial gap for hidden state (when nav links are collapsed)
        navbarContainer.style.gap = '0.7rem';
        
        // Temporarily set to auto to measure natural width
        linksContainer.style.width = 'auto';
        linksContainer.style.visibility = 'visible';
        const naturalWidth = linksContainer.scrollWidth;
        linksContainer.style.width = '0px';
        linksContainer.style.opacity = '0';
        
        // Animate width expanding from center and gap from 0.7rem to 2rem
        gsap.to(linksContainer, {
          width: naturalWidth,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.2)',
          onStart: () => {
            linksContainer.style.pointerEvents = 'auto';
            navbarContainer.style.gap = '0.7rem';
          },
          onUpdate: () => {
            // Animate gap from 0.7rem to 2rem as nav links expand
            const progress = linksContainer.offsetWidth / naturalWidth;
            const gapValue = 0.7 + (1.3 * progress);
            navbarContainer.style.gap = `${gapValue}rem`;
          },
          onComplete: () => {
            linksContainer.style.width = 'auto';
            navbarContainer.style.gap = '2rem';
            isAnimatingRef.current = false;
            isVisibleRef.current = true;
          }
        });
      } else if (!shouldShow && isCurrentlyVisible) {
        // Hide animation - collapse to center
        isAnimatingRef.current = true;
        isVisibleRef.current = false;
        gsap.killTweensOf([linksContainer, navbarContainer]);
        
        const widthToAnimate = currentWidth || linksContainer.scrollWidth;
        
        // Animate width collapsing to center
        gsap.to(linksContainer, {
          width: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
          onUpdate: () => {
            // Animate gap reduction but keep some spacing between buttons
            if (widthToAnimate > 0) {
              const progress = 1 - (linksContainer.offsetWidth / widthToAnimate);
              // Reduce gap from 2rem to 0.7rem (maintain spacing between buttons)
              const gapValue = 2 - (1.3 * progress);
              navbarContainer.style.gap = `${gapValue}rem`;
            }
          },
          onComplete: () => {
            linksContainer.style.pointerEvents = 'none';
            linksContainer.style.visibility = 'hidden';
            linksContainer.style.width = '0px';
            // Keep spacing between the circular logo and email button when hidden
            navbarContainer.style.gap = '0.7rem';
            isAnimatingRef.current = false;
            isVisibleRef.current = false;
          }
        });
      }
    });
  }, [showNavLinks, isHovered]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav ref={navbarRef} className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4" style={{ scrollBehavior: 'smooth' }}>
        {/* Logo on the left */}
        <div className="mx-4 md:mx-10">
          <Link href="/" className="hover:scale-110 transition-transform duration-300">
            <Image src="/logo.png" alt="Logo" width={200} height={70} className="w-32 md:w-[200px] h-auto" style={{ width: "auto", height: "auto" }} />
          </Link>
        </div>

        {/* Desktop Main navbar design - Hidden on mobile */}
        <div 
          ref={navbarContainerRef}
          className="hidden md:flex bg-gray-700/40 backdrop-blur-md rounded-full px-6 py-3 shadow-lg items-center transition-all duration-300"
          style={{ gap: '2rem' }}
          onMouseEnter={() => {
            // Clear any hide timer immediately
            if (scrollTimerRef.current) {
              clearTimeout(scrollTimerRef.current);
              scrollTimerRef.current = null;
            }
            
            // Update state only if not already showing
            if (!isHoveredRef.current) {
              isHoveredRef.current = true;
              setIsHovered(true);
            }
            
            // Only update showNavLinks if it's not already true
            if (!showNavLinks) {
              setShowNavLinks(true);
            }
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
            setIsHovered(false);
            
            // When mouse leaves, start timer to hide nav links after 1.5 seconds
            if (scrollTimerRef.current) {
              clearTimeout(scrollTimerRef.current);
            }
            
            // Hide nav links after 1.5 seconds when mouse leaves
            scrollTimerRef.current = setTimeout(() => {
              if (!isHoveredRef.current) {
                setShowNavLinks(false);
              }
            }, 1500);
          }}
        >
        {/* Logo Section - White circle with planet icon */}
        <Link 
          href="/"
          className="flex items-center justify-center w-10 h-10 bg-white rounded-full hover:scale-105 transition-transform duration-300 flex-shrink-0"
        >
          <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
            <ellipse cx="12" cy="12" rx="8" ry="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </Link>

        {/* Navigation Links */}
        <div 
          ref={navLinksRef}
          className="flex items-center overflow-hidden"
          style={{ 
            transformOrigin: 'center center',
            minWidth: 0,
            gap: '3rem'
          }}
        >
          <Link 
            href="/projects-work"
            className="text-white hover:text-gray-300 text-sm font-medium transition-colors duration-300 whitespace-nowrap"
          >
            Work
          </Link>
          <Link 
            href="/about"
            className="text-white hover:text-gray-300 text-sm font-medium transition-colors duration-300 whitespace-nowrap"
          >
            About
          </Link>
          <Link 
            href="/training"
            className="text-white hover:text-gray-300 text-sm font-medium transition-colors duration-300 whitespace-nowrap"
          >
            Training
          </Link>
          <Link 
            href="/contact"
            className="text-white hover:text-gray-300 text-sm font-medium transition-colors duration-300 whitespace-nowrap"
          >
            Contact Us
          </Link>
        </div>

        {/* Email CTA */}
        <Link 
          href="mailto:yugayatra@gmail.com"
          className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-100 transition-all duration-300 font-medium text-sm flex-shrink-0"
        >
          yugayatra@gmail.com
        </Link>
      </div>

        {/* Desktop Login and Apply Internship buttons - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-4 py-3 mr-2 px-10">
          {/* Circular Login Button */}
          <Link 
            href="/login"
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:scale-105"
            title="Login"
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>

          {/* Apply Internship button */}
          <Link 
            href="/apply"
            className="bg-blue-600 text-white px-6 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-medium text-sm shadow-lg"
          >
            Apply Internship
          </Link>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center justify-center w-12 h-12 bg-white rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg mr-4"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu - Slides in from right */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />
          
          {/* Mobile Menu Panel */}
          <div
            ref={mobileMenuRef}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <Link href="/" onClick={closeMobileMenu} className="hover:scale-110 transition-transform duration-300">
                  <Image src="/logo.png" alt="Logo" width={150} height={50} style={{ width: "auto", height: "auto" }} />
                </Link>
                <button
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-all duration-300"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex-1 p-6 space-y-6">
                {/* Navigation Links */}
                <div className="space-y-4">
                  <Link
                    href="/projects-work"
                    onClick={closeMobileMenu}
                    className="block text-gray-900 hover:text-blue-600 text-lg font-medium transition-colors duration-300 py-2"
                  >
                    Work
                  </Link>
                  <Link
                    href="/about"
                    onClick={closeMobileMenu}
                    className="block text-gray-900 hover:text-blue-600 text-lg font-medium transition-colors duration-300 py-2"
                  >
                    About
                  </Link>
                  <Link
                    href="/training"
                    onClick={closeMobileMenu}
                    className="block text-gray-900 hover:text-blue-600 text-lg font-medium transition-colors duration-300 py-2"
                  >
                    Training
                  </Link>
                  <Link
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="block text-gray-900 hover:text-blue-600 text-lg font-medium transition-colors duration-300 py-2"
                  >
                    Contact Us
                  </Link>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 pt-6">
                  <Link
                    href="mailto:yugayatra@gmail.com"
                    onClick={closeMobileMenu}
                    className="block text-gray-900 hover:text-blue-600 text-lg font-medium transition-colors duration-300 py-2"
                  >
                    yugayatra@gmail.com
                  </Link>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 pt-6">
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Login
                  </Link>
                  <Link
                    href="/apply"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center w-full bg-gray-100 text-gray-900 px-6 py-4 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold shadow-lg"
                  >
                    Apply Internship
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
