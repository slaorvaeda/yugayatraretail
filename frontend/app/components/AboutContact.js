'use client';
import React, { useState } from 'react';

export default function AboutContact() {
  const [email, setEmail] = useState('');

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: Title and Description */}
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">
              Get in touch with us
            </h2>
            <p className="text-lg text-blue-700">
              Let us kindly assist you with the services, product architecture and interior design.
            </p>
          </div>

          {/* Right: Contact Info and Email Form */}
          <div className="space-y-10">
            {/* Contact Information */}
            <div className="space-y-5 text-blue-700">
              <p className="text-lg">A2 8789 8989</p>
              <p className="text-lg">E contact@108.com</p>
              <p className="text-lg">M 108 Building, Seoul, Korea</p>
            </div>

            {/* Email Signup */}
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 rounded-2xl border border-blue-200 bg-white text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

