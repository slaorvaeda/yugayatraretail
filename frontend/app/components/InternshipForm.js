'use client';
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const InternshipForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    education: '',
    previousExperience: '',
    skills: '',
    motivation: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number with country code';
    }
    
    if (!formData.education.trim()) {
      newErrors.education = 'Education background is required';
    }
    
    if (!formData.skills.trim()) {
      newErrors.skills = 'Relevant skills are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('/api/internship/apply', formData);
      
      if (response.status === 200 || response.status === 201) {
        alert('Application submitted successfully! We will get back to you soon.');
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          education: '',
          previousExperience: '',
          skills: '',
          motivation: ''
        });
        setErrors({});
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        // Server responded with error
        alert('Failed to submit application. Please try again later.');
      } else if (error.request) {
        // Request was made but no response received
        alert('Network error. Please check your connection and try again.');
      } else {
        // Something else happened
        alert('An error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="apply" className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div
          className="text-center mb-12"
          data-aos="fade-up"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 my-4">
            Internship Application
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Join our team and kickstart your career
          </p>
          
          {/* Back to Home Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Form Card */}
        <div
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Form Title */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Apply for Internship
            </h2>
            <p className="text-lg text-gray-600">
              Take the first step towards your future
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-3">
                Personal Information
              </h3>
              
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 placeholder:text-gray-400`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@domain.com"
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 placeholder:text-gray-400`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g., +91 9876543210"
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 placeholder:text-gray-400`}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Include country code (e.g., +91 for India)
                </p>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Academic & Professional Background Section */}
            <div className="space-y-6 pt-6">
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-3">
                Academic & Professional Background
              </h3>
              
              <div>
                <label htmlFor="education" className="block text-sm font-semibold text-gray-700 mb-2">
                  Education Background <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="e.g., B.Tech Computer Science, ABC University, 2024"
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.education ? 'border-red-500' : 'border-gray-300'
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 placeholder:text-gray-400`}
                />
                {errors.education && (
                  <p className="mt-1 text-sm text-red-500">{errors.education}</p>
                )}
              </div>

              <div>
                <label htmlFor="previousExperience" className="block text-sm font-semibold text-gray-700 mb-2">
                  Previous Experience <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <textarea
                  id="previousExperience"
                  name="previousExperience"
                  value={formData.previousExperience}
                  onChange={handleChange}
                  placeholder="Previous internships, projects, or work experience"
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 resize-none placeholder:text-gray-400"
                />
              </div>

              <div>
                <label htmlFor="skills" className="block text-sm font-semibold text-gray-700 mb-2">
                  Relevant Skills <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g., JavaScript, React, Python, UI/UX Design"
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.skills ? 'border-red-500' : 'border-gray-300'
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 placeholder:text-gray-400`}
                />
                {errors.skills && (
                  <p className="mt-1 text-sm text-red-500">{errors.skills}</p>
                )}
              </div>
            </div>

            {/* Tell Us About Yourself Section */}
            <div className="space-y-6 pt-6">
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-3">
                Tell Us About Yourself
              </h3>
              
              <div>
                <label htmlFor="motivation" className="block text-sm font-semibold text-gray-700 mb-2">
                  Why do you want to join us? <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  placeholder="Share your motivation, career goals, and what excites you about this opportunity..."
                  rows="6"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 resize-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>

            {/* Contact Info */}
            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Have questions? Contact us at{' '}
                <a 
                  href="mailto:yugayatra@gmail.com" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                >
                  yugayatra@gmail.com
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InternshipForm;

