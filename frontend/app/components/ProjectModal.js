'use client';
import Image from 'next/image';
import { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      data-aos="fade-in"
    >
      <div 
        className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        data-aos="zoom-in"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-[60] w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-lg border border-gray-200"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 overflow-hidden rounded-t-3xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-6 left-6 flex gap-3">
            <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-sm font-semibold text-gray-700">
              {project.category}
            </span>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              project.status === 'Live' 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-500 text-white'
            }`}>
              {project.status}
            </span>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
              {project.title}
            </h2>
            <p className="text-white/90 text-lg drop-shadow-md">
              {project.client} • {project.year}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Description */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-blue-50">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span key={index} className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Live Project
            </button>
            <button className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Case Study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

