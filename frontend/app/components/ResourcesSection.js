'use client';
import React from 'react';
import Link from 'next/link';

export default function ResourcesSection() {
  const resources = [
    {
      title: 'Workforce Transformation Blueprint',
      category: 'Playbook',
      description: 'Comprehensive guide to building scalable workforce development programs',
      icon: '📘',
      href: '/resources/workforce-blueprint'
    },
    {
      title: 'Industry Academy Launch Kit',
      category: 'Webinar',
      description: 'Step-by-step framework for launching industry-academia partnerships',
      icon: '🎓',
      href: '/resources/academy-kit'
    },
    {
      title: 'Talent Analytics Starter Pack',
      category: 'Template',
      description: 'Ready-to-use dashboards and metrics for tracking learner success',
      icon: '📊',
      href: '/resources/analytics-pack'
    },
    {
      title: 'Certification Program Framework',
      category: 'Playbook',
      description: 'Design and deploy industry-recognized certification programs',
      icon: '🏆',
      href: '/resources/certification-framework'
    },
    {
      title: 'Mentorship Program Guide',
      category: 'Guide',
      description: 'Build effective mentorship networks that drive career growth',
      icon: '🤝',
      href: '/resources/mentorship-guide'
    },
    {
      title: 'Placement Success Toolkit',
      category: 'Template',
      description: 'Templates and strategies for maximizing placement conversions',
      icon: '💼',
      href: '/resources/placement-toolkit'
    }
  ];

  return (
    <section 
      className="min-h-screen py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%)'
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-700 mb-6">
            Resource Library
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-blue-900 mb-6 drop-shadow-lg">
            Resources
          </h2>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
            Access curated playbooks, templates, and expert insights to accelerate your workforce transformation journey
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {resources.map((resource, index) => (
            <Link
              key={resource.title}
              href={resource.href}
              className="group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="h-full bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-blue-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl lg:text-5xl">{resource.icon}</div>
                  <div className="flex-1">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
                      {resource.category}
                    </span>
                    <h3 className="text-xl lg:text-2xl font-bold text-blue-900 mb-3 group-hover:text-blue-700 transition-colors">
                      {resource.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {resource.description}
                </p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:gap-3 transition-all">
                  <span>Explore Resource</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="600">
          <Link
            href="/resources"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            View All Resources
          </Link>
        </div>
      </div>
    </section>
  );
}

