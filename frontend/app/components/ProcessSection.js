'use client';

const processSteps = [
  {
    number: '01',
    title: 'Discovery & Planning',
    description: 'We analyze your requirements, understand your goals, and create a comprehensive project roadmap.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    color: 'from-blue-500 to-blue-600'
  },
  {
    number: '02',
    title: 'Design & Development',
    description: 'Our team creates beautiful, functional designs and builds robust solutions using modern technologies.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: 'from-blue-500 to-blue-600'
  },
  {
    number: '03',
    title: 'Testing & Quality Assurance',
    description: 'Rigorous testing ensures your solution is bug-free, secure, and performs optimally across all platforms.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-blue-500 to-blue-600'
  },
  {
    number: '04',
    title: 'Deployment & Support',
    description: 'We deploy your solution smoothly and provide ongoing support to ensure continued success and growth.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    color: 'from-blue-500 to-blue-600'
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-600 mb-6">
            Our Process
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            How We Work
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A proven methodology that ensures successful project delivery from concept to completion
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500 opacity-20" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="relative flex flex-col"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                {/* Step Card */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative z-10 flex flex-col flex-grow min-h-[320px]">
                  {/* Number Badge with Icon */}
                  <div className={`inline-flex flex-col items-center justify-between w-16 h-20 rounded-2xl bg-gradient-to-br ${step.color} text-white mb-6 shadow-lg p-2`}>
                    <span className="text-xl font-bold pt-1">{step.number}</span>
                    <div className="w-5 h-5 text-white opacity-90 flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed flex-grow">
                    {step.description}
                  </p>
                </div>

                {/* Arrow - Mobile & Tablet */}
                {index < processSteps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-6">
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

