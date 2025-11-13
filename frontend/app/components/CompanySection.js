'use client';
import React from 'react';
import Link from 'next/link';

export default function CompanySection() {
  const values = [
    {
      title: 'Innovation',
      description: 'Pioneering new approaches to workforce development and skill transformation',
      icon: '💡'
    },
    {
      title: 'Excellence',
      description: 'Delivering world-class programs that exceed expectations and drive measurable outcomes',
      icon: '⭐'
    },
    {
      title: 'Impact',
      description: 'Creating lasting change in careers, communities, and industries',
      icon: '🎯'
    },
    {
      title: 'Collaboration',
      description: 'Building strong partnerships between industry, academia, and learners',
      icon: '🤝'
    }
  ];

  const stats = [
    { number: '2K+', label: 'Learners Trained' },
    { number: '20+', label: 'Industry Partners' },
    { number: '60%', label: 'Success Rate' },
    { number: '10+', label: 'Certification Programs' }
  ];

  const milestones = [
    {
      year: '2024',
      title: 'Company Founded',
      description: 'Yugayatra Retail launched with a vision to transform workforce development'
    },
    {
      year: '2024',
      title: 'First 1000 Learners',
      description: 'Reached milestone of training 1000+ professionals across multiple industries'
    },
    {
      year: '2024',
      title: 'Industry Partnerships',
      description: 'Established partnerships with leading companies and educational institutions'
    },
    {
      year: '2024',
      title: 'Certification Programs',
      description: 'Launched comprehensive certification programs recognized by industry leaders'
    }
  ];

  return (
    <section 
      className="min-h-screen py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #e0f2fe 0%, #bfdbfe 30%, #ffffff 100%)'
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg className="absolute top-1/4 right-1/4 w-full h-full" viewBox="0 0 1200 1200">
          <circle cx="600" cy="600" r="200" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.3" />
          <circle cx="600" cy="600" r="300" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-700 mb-6">
            About Us
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-blue-900 mb-6 drop-shadow-lg">
            Company
          </h2>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
            Empowering careers through innovative workforce development and industry-aligned training programs
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20" data-aos="fade-up" data-aos-delay="100">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-blue-100 shadow-lg"
              data-aos="zoom-in"
              data-aos-delay={200 + index * 100}
            >
              <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-sm lg:text-base text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-20" data-aos="fade-up" data-aos-delay="300">
          <h3 className="text-3xl lg:text-4xl font-bold text-blue-900 text-center mb-12">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={400 + index * 100}
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-bold text-blue-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className="mb-16" data-aos="fade-up" data-aos-delay="500">
          <h3 className="text-3xl lg:text-4xl font-bold text-blue-900 text-center mb-12">
            Our Journey
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-8 lg:space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year + index}
                  className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                  data-aos-delay={600 + index * 100}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg">
                      <div className="text-blue-600 font-bold text-lg mb-2">{milestone.year}</div>
                      <h4 className="text-xl font-bold text-blue-900 mb-2">{milestone.title}</h4>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden lg:block w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center" data-aos="fade-up" data-aos-delay="900">
          <Link
            href="/about"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
}

