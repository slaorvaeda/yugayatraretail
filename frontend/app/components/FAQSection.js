'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'Which organisations does Yugayatra Retail partner with?',
    answer:
      'We collaborate with enterprises, universities, public sector programs, and social impact accelerators that aim to unlock employability and future-ready talent at scale.',
  },
  {
    question: 'What services can we engage Yugayatra for?',
    answer:
      'Our core practices span workforce academies, skill certifications, digital learning experience design, talent marketplace operations, and platform implementation tailored to your KPIs.',
  },
  {
    question: 'How quickly can a training program go live?',
    answer:
      'With pre-built curricula and onboarding playbooks, most cohorts launch within 3 to 6 weeks. Custom programmes follow discovery and co-design workshops before launch.',
  },
  {
    question: 'Do you provide technology and integrations?',
    answer:
      'Yes. We bring modular platforms, analytics dashboards, and integration support so your HRIS, LMS, and reporting systems stay in sync without heavy engineering lift.',
  },
  {
    question: 'What outcomes can we expect?',
    answer:
      'Clients typically see higher learner completion, improved placement or internal mobility, and richer insights across regions. We co-define success metrics and review them every sprint.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8">
        <div data-aos="fade-right" data-aos-duration="800">
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600" data-aos="fade-up" data-aos-delay="100">FAQ</span>
          <h2 className="mt-6 text-3xl font-semibold text-slate-900 sm:text-[2.4rem]" data-aos="fade-up" data-aos-delay="200">You Have Questions, We Have Answers</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600" data-aos="fade-up" data-aos-delay="300">
            Explore how Yugayatra Retail partners with you from strategy to execution. If you have a different question, drop us a note and we will tailor the answer to your context.
          </p>
        </div>
        <div className="space-y-4" data-aos="fade-left" data-aos-duration="800" data-aos-delay="200">
          {faqs.map((faq, index) => {
            const isOpen = index === openIndex;
            return (
              <article key={faq.question} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left text-base font-semibold text-slate-900"
                >
                  {faq.question}
                  <span className={`ml-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition ${isOpen ? 'bg-blue-100 text-blue-600' : ''}`}>
                    <svg className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-45' : ''}`} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 3.333v9.334" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3.333 8h9.334" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden px-6 pb-6 text-sm leading-relaxed text-slate-600">{faq.answer}</div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


