'use client';

import { useState } from 'react';

export default function ContactFormSection() {
  const [status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('Great choice! Our partnerships squad will connect within one business day.');
  };

  return (
    <section className="bg-gradient-to-b from-white via-white to-[#eef3ff] py-20">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <div className="flex flex-col gap-6" data-aos="fade-right" data-aos-duration="800">
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600" data-aos="fade-up" data-aos-delay="100">Partner With Us</span>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-[2.4rem]" data-aos="fade-up" data-aos-delay="200">Reach Out Your Way</h2>
          <p className="text-base leading-relaxed text-slate-600" data-aos="fade-up" data-aos-delay="300">
            Yugayatra Retail blends innovation with implementation. Tell us what you&apos;re building and we will match you with strategists who understand scale, skilling, and sustainable growth.
          </p>
          <div className="rounded-3xl border border-blue-100 bg-blue-50/60 p-6 text-sm text-slate-600" data-aos="fade-up" data-aos-delay="400">
            <p className="font-semibold text-slate-800">Prefer a direct conversation?</p>
            <div className="mt-4 flex flex-col gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Email</p>
                <a href="mailto:hello@yugayatraretail.com" className="text-base font-semibold text-blue-700">
                  hello@yugayatraretail.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Phone</p>
                <a href="tel:+919876543210" className="text-base font-semibold text-blue-700">
                  +91 98765 43210
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Office Hours</p>
                <p className="text-base font-semibold text-slate-700">Mon - Sat · 9:00 AM - 7:00 PM IST</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-[32px] border border-blue-100 bg-white p-8 shadow-[0_26px_60px_-32px_rgba(37,99,235,0.3)]" data-aos="fade-left" data-aos-duration="800" data-aos-delay="200">
          <h3 className="text-2xl font-semibold text-slate-900" data-aos="fade-up" data-aos-delay="300">Hi! I&apos;m</h3>
          <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Your Name
              <input
                type="text"
                name="name"
                required
                placeholder="Akash Sharma"
                className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Your Role
                <input
                  type="text"
                  name="role"
                  required
                  placeholder="CHRO, Program Lead"
                  className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                From
                <input
                  type="text"
                  name="company"
                  required
                  placeholder="Organisation / Institution"
                  className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              We&apos;re exploring
              <textarea
                name="question"
                rows={4}
                required
                placeholder="Tell us about your program, community or capability goals..."
                className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              You can reach me at
              <input
                type="email"
                name="email"
                required
                placeholder="name@company.com"
                className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              Submit Request
            </button>
            {status && <p className="text-sm font-medium text-blue-600">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

