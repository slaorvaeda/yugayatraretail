'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { RiMailLine, RiPhoneLine, RiMapPinLine } from 'react-icons/ri';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactMethods = [
    {
      icon: RiMailLine,
      title: 'Email',
      value: 'contact@yugayatraretail.com',
      href: 'mailto:contact@yugayatraretail.com'
    },
    {
      icon: RiPhoneLine,
      title: 'Phone',
      value: '+91 123 456 7890',
      href: 'tel:+911234567890'
    },
    {
      icon: RiMapPinLine,
      title: 'Office',
      value: 'Bangalore, India',
      href: '#'
    }
  ];

  const quickLinks = [
    { label: 'Enterprise Training', href: '/services#training' },
    { label: 'Skill Development', href: '/services#skills' },
    { label: 'Certification Programs', href: '/services#certification' },
    { label: 'Partnership Opportunities', href: '/partnerships' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section 
      className="min-h-screen py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #ffffff 0%, #f0f9ff 30%, #dbeafe 100%)'
      }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-700 mb-6">
            Get In Touch
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-blue-900 mb-6 drop-shadow-lg">
            Contact
          </h2>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your workforce? Let&apos;s discuss how we can help you achieve your goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Contact Methods & Quick Links */}
          <div className="space-y-8" data-aos="fade-right">
            {/* Contact Methods */}
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <Link
                      key={method.title}
                      href={method.href}
                      className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      data-aos="fade-up"
                      data-aos-delay={100 + index * 100}
                    >
                      <div className="text-blue-600">
                        <IconComponent className="w-10 h-10" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">{method.title}</div>
                        <div className="text-lg font-semibold text-blue-900">{method.value}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Quick Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickLinks.map((link, index) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center font-medium text-blue-900 hover:text-blue-700"
                    data-aos="fade-up"
                    data-aos-delay={400 + index * 50}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg" data-aos="fade-up" data-aos-delay="600">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Office Hours</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold">10:00 AM - 2:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div data-aos="fade-left">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 shadow-xl">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4">
                    Thank you! Your message has been sent. We&apos;ll get back to you soon.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <Link
                href="/contact"
                className="inline-block text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                View Full Contact Page →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

