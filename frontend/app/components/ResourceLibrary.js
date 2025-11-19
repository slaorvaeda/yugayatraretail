import Image from 'next/image';

const resources = [
  {
    title: 'Workforce Transformation Blueprint',
    category: 'Playbook',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=960&q=80',
  },
  {
    title: 'Industry Academy Launch Kit',
    category: 'On-Demand Webinar',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=960&q=80',
  },
  {
    title: 'Talent Analytics Starter Pack',
    category: 'Template Toolkit',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=960&q=80',
  },
];

export default function ResourceLibrary() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-700" data-aos="fade-up">
            Resource Library
          </span>
          <h2 className="mt-6 text-3xl font-semibold text-slate-900 sm:text-[2.4rem]" data-aos="fade-up" data-aos-delay="100">Tools to Guide You</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600" data-aos="fade-up" data-aos-delay="200">
            Tap into curated insights, templates, and expert sessions crafted by Yugayatra consultants. Explore frameworks that accelerate decision-making between stakeholder reviews.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {resources.map((resource, index) => (
            <article key={resource.title} className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_50px_-32px_rgba(37,99,235,0.35)]" data-aos="fade-up" data-aos-delay={300 + index * 100}>
              <div className="relative h-56 w-full">
                <Image
                  src={resource.image}
                  alt={resource.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 text-left">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">{resource.category}</span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{resource.title}</h3>
                <button className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600">
                  Browse Resource
                  <svg className="ml-2 h-4 w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


