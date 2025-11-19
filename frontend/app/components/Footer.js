'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white rounded-t-3xl overflow-hidden">
      {/* Affiliate Program Section - Box Design */}
      <div className="max-w-[95%] md:max-w-[85%] mx-auto px-4 md:px-8 lg:px-16 py-4 md:py-4" data-aos="fade-up">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-4" data-aos="fade-right" data-aos-duration="800" data-aos-delay="100">
            <p className="text-xs md:text-sm text-gray-500 font-medium" data-aos="fade-up" data-aos-delay="200">Partner With Us</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900" data-aos="fade-up" data-aos-delay="300">
              Join our <br />   Training Partner Program
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed" data-aos="fade-up" data-aos-delay="400">
              Earn attractive commissions by referring students to our professional training programs. Help others build their careers while growing your income.
            </p>
            <button className="bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 font-medium text-sm" data-aos="fade-up" data-aos-delay="500">
              Become a Partner
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>

          {/* Right Side - Graphic with Circles and Avatars */}
          <div className="relative flex items-center justify-center" data-aos="fade-left" data-aos-duration="800" data-aos-delay="200">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Concentric Circles - Rotating */}
              <svg 
                className="absolute inset-0 w-full h-full animate-spin-slow" 
                viewBox="0 0 400 400"
                style={{ animation: 'spin 20s linear infinite' }}
              >
                <circle cx="200" cy="200" r="80" fill="none" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="5,5" />
                <circle cx="200" cy="200" r="120" fill="none" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="5,5" />
                <circle cx="200" cy="200" r="160" fill="none" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
              
              {/* Center Hexagonal Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center z-10">
                <div className="w-10 h-10 bg-gray-700 rounded-sm transform rotate-45"></div>
              </div>

              {/* Avatar Circles around the circles - Rotating Container */}
              <div 
                className="absolute inset-0 animate-spin-slow-reverse"
                style={{ animation: 'spin 25s linear infinite reverse' }}
              >
                {/* Top */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                
                {/* Top Right */}
                <div className="absolute top-20 right-16 w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-2 border-white shadow-lg"></div>
                
                {/* Right */}
                
                {/* Bottom Right */}
                <div className="absolute bottom-20 right-16 w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-white shadow-lg"></div>
                
                {/* Bottom */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-2 border-white shadow-lg"></div>
                
                {/* Bottom Left */}
                <div className="absolute bottom-20 left-16 w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full border-2 border-white shadow-lg"></div>
                
                {/* Left */}
                <div className="absolute top-1/2 left-8 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full border-2 border-white shadow-lg"></div>
                
                {/* Top Left */}
                <div className="absolute top-20 left-16 w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full border-2 border-white shadow-lg"></div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      


      {/* Main Footer Content */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Column 1: Branding */}
            <div className="space-y-4" data-aos="fade-up" data-aos-delay="100">
              <div className="flex items-center gap-3" data-aos="fade-up" data-aos-delay="200">
                <Image 
                  src="/logo.png" 
                  alt="Yugayatra Retail" 
                  width={250} 
                  height={40} 
                  className='-translate-x-4 w-48 sm:w-56 md:w-64 lg:w-[250px]'
                />
               
              </div>
              <p className="text-sm text-gray-500 leading-relaxed" data-aos="fade-up" data-aos-delay="300">
                The most Powerful Training & Business Solutions for individuals and enterprises.
              </p>
            </div>

            {/* Column 2: Company Links */}
            <div data-aos="fade-up" data-aos-delay="200">
              <h4 className="text-gray-900 font-bold text-base mb-4" data-aos="fade-up" data-aos-delay="300">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center gap-1">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center gap-1">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#affiliate" className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center gap-1">
                    Become an Affiliate
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="#projects" className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center gap-1">
                    Projects
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Socials Links */}
            <div data-aos="fade-up" data-aos-delay="300">
              <h4 className="text-gray-900 font-bold text-base mb-4" data-aos="fade-up" data-aos-delay="400">Socials</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center gap-1">
                    Behance
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center gap-1">
                    Dribbble
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center gap-1">
                    Twitter/X
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter Subscription */}
            <div data-aos="fade-up" data-aos-delay="400">
              <h4 className="text-gray-900 font-bold text-base mb-4" data-aos="fade-up" data-aos-delay="500">Newsletter</h4>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed" data-aos="fade-up" data-aos-delay="600">
                Receive product updates news, exclusive discounts and early access.
              </p>
              <div className="flex gap-2" data-aos="fade-up" data-aos-delay="700">
                <input
                  type="email"
                  placeholder="@ Enter your email..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                />
                <button className="bg-gray-900 text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-gray-200" data-aos="fade-up" data-aos-delay="600">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Left Side - Copyright */}
              <p className="text-xs text-gray-500" data-aos="fade-up" data-aos-delay="700">
                © {currentYear} Yugayatra Retail All rights reserved · Made with Yugayatra Retail
              </p>
              
              {/* Right Side - Built in + Icons */}
              <div className="flex items-center gap-3" data-aos="fade-up" data-aos-delay="800">
                <span className="text-xs text-gray-500">Built in</span>
                <div className="flex items-center gap-2">
                  {/* Framer Logo */}
                  <div className="w-5 h-5 bg-gray-900 rounded flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">F</span>
                  </div>
                  {/* Behance Logo */}
                  <div className="w-5 h-5 bg-gray-900 rounded flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">Bē</span>
                  </div>
                  {/* Twitter/X Logo */}
                  <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin 25s linear infinite reverse;
        }
      `}</style>
    </div>
  );
}
