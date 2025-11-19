'use client';
import Image from 'next/image';

const stats = [
  { number: '50+', label: 'Projects Completed' },
  { number: '98%', label: 'Client Satisfaction' },
  { number: '100+', label: 'Team Members' },
  { number: '15+', label: 'Years Experience' },
];

export default function ProjectsHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eef3ff] via-white to-white">
      <div className="absolute inset-x-0 -top-32 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_60%)]" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center" data-aos="fade-up" data-aos-duration="800">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-700" data-aos="fade-up" data-aos-delay="100">
            Projects & Work
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl" data-aos="fade-up" data-aos-delay="200">
            Transforming Ideas Into
            <br />
            <span className="text-blue-600">Successful Projects</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl" data-aos="fade-up" data-aos-delay="300">
            Discover our portfolio of innovative projects and successful implementations across various industries. 
            Each project showcases our commitment to excellence, innovation, and client satisfaction.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4" data-aos="fade-up" data-aos-delay="400">
          {stats.map((stat, index) => (
            <div key={stat.label} className="rounded-2xl bg-white p-6 shadow-lg border border-blue-100" data-aos="zoom-in" data-aos-delay={500 + index * 100}>
              <div className="text-3xl font-bold text-blue-600 sm:text-4xl">{stat.number}</div>
              <div className="mt-2 text-sm font-medium text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Hero Images Grid */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3" data-aos="fade-up" data-aos-delay="800">
          <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white shadow-[0_20px_60px_-25px_rgba(37,99,235,0.35)] lg:col-span-2" data-aos="zoom-in" data-aos-delay="900">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
              alt="Project showcase"
              width={1200}
              height={800}
              className="h-64 w-full object-cover sm:h-80 lg:h-96"
              priority
            />
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white shadow-[0_20px_60px_-25px_rgba(37,99,235,0.35)]" data-aos="zoom-in" data-aos-delay="1000">
            <Image
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
              alt="Project team"
              width={800}
              height={800}
              className="h-64 w-full object-cover sm:h-80 lg:h-96"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

