'use client';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'CEO, Tech Solutions India',
    company: 'Tech Solutions India',
    image: 'https://i.pravatar.cc/150?img=47',
    rating: 5,
    text: 'Yugayatra delivered an exceptional learning platform that transformed our employee training. The platform is intuitive, scalable, and has significantly improved our training efficiency.',
    project: 'Enterprise Learning Platform'
  },
  {
    id: 2,
    name: 'Rahul Kumar',
    role: 'CTO, Retail Mart India',
    company: 'Retail Mart India',
    image: 'https://i.pravatar.cc/150?img=33',
    rating: 5,
    text: 'The e-commerce solution they built for us exceeded all expectations. Sales have increased by 45% since launch, and the platform handles peak traffic seamlessly.',
    project: 'E-Commerce Solution'
  },
  {
    id: 3,
    name: 'Anjali Patel',
    role: 'Founder, InnovateStart',
    company: 'InnovateStart',
    image: 'https://i.pravatar.cc/150?img=44',
    rating: 5,
    text: 'Working with Yugayatra was a game-changer. Their mobile app development expertise helped us launch our product ahead of schedule and within budget.',
    project: 'Mobile App Development'
  },
  {
    id: 4,
    name: 'Vikram Singh',
    role: 'IT Director, Enterprise Solutions',
    company: 'Enterprise Solutions',
    image: 'https://i.pravatar.cc/150?img=38',
    rating: 5,
    text: 'Their cloud infrastructure setup has been rock-solid. We\'ve had zero downtime and their support team is incredibly responsive. Highly recommended!',
    project: 'Cloud Infrastructure Setup'
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-700 mb-6">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Don&rsquo;t just take our word for it &mdash; hear from our satisfied clients about their experience working with us
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-700 ease-in-out hover:-translate-y-3 hover:scale-[1.02] group"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-slate-600 leading-relaxed mb-6 text-lg group-hover:text-gray-700 transition-colors duration-700 ease-in-out">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Project Badge */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold group-hover:bg-blue-100 group-hover:scale-105 transition-all duration-700 ease-in-out">
                  {testimonial.project}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100 group-hover:border-blue-200 transition-colors duration-700 ease-in-out">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-200 group-hover:border-blue-300 group-hover:scale-110 transition-all duration-700 ease-in-out">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-700 ease-in-out">{testimonial.name}</div>
                  <div className="text-sm text-slate-600 group-hover:text-gray-700 transition-colors duration-700 ease-in-out">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

