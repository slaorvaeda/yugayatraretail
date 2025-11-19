import Image from 'next/image';

const avatars = [
  {
    src: 'https://randomuser.me/api/portraits/women/32.jpg',
    alt: 'Team member avatar',
    className: 'top-12 left-4 md:left-0',
  },
  {
    src: 'https://randomuser.me/api/portraits/men/45.jpg',
    alt: 'Team member avatar',
    className: 'top-24 right-[22%] hidden sm:block',
  },
  {
    src: 'https://randomuser.me/api/portraits/women/55.jpg',
    alt: 'Team member avatar',
    className: 'bottom-14 left-[18%] hidden lg:block',
  },
  {
    src: 'https://randomuser.me/api/portraits/men/78.jpg',
    alt: 'Team member avatar',
    className: 'bottom-8 right-6 md:right-0',
  },
  {
    src: 'https://randomuser.me/api/portraits/women/67.jpg',
    alt: 'Team member avatar',
    className: 'top-1/2 left-1/2 -translate-x-1/2 hidden lg:block',
  },
];

const highlights = [
  'Comprehensive certification programs',
  'Industry-recognized credentials',
  'Real-world project portfolios',
];

export default function WorkHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eef3ff] via-white to-white">
      <div className="absolute inset-x-0 -top-32 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_60%)]" aria-hidden="true" />
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 pb-16 pt-24 lg:flex-row lg:items-center lg:gap-20 lg:px-8 xl:gap-28">
        <div className="relative z-10 max-w-xl lg:flex-1" data-aos="fade-right" data-aos-duration="800">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-700" data-aos="fade-up" data-aos-delay="100">Our Work</span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-[3.25rem]" data-aos="fade-up" data-aos-delay="200">
            Certifications & Recognition That Build Trust
          </h1>
          <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg" data-aos="fade-up" data-aos-delay="300">
            Discover our official certifications, registrations, and recognitions that validate our commitment to excellence, compliance, and professional standards.
          </p>
          <div className="mt-8 flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="400">
            <button className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">
              View All Certificates
            </button>
            <button className="rounded-full border border-blue-200 px-6 py-3 text-sm font-semibold text-blue-700 transition hover:border-blue-400 hover:text-blue-600">
              Download Portfolio
            </button>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2" data-aos="fade-up" data-aos-delay="500">
            {highlights.map((item, index) => (
              <li key={item} className="flex items-start gap-3 text-sm font-medium text-slate-600" data-aos="fade-up" data-aos-delay={600 + index * 50}>
                <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <svg
                    aria-hidden="true"
                    className="h-3 w-3"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.333 8.889 6.889 10.444 10.667 6.667"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex flex-1 items-center justify-center">
          <div className="relative grid w-full max-w-xl gap-6" data-aos="fade-left" data-aos-duration="800" data-aos-delay="200">
            <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white shadow-[0_20px_60px_-25px_rgba(37,99,235,0.35)]" data-aos="zoom-in" data-aos-delay="300">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=960&q=80"
                alt="Certification showcase"
                width={960}
                height={720}
                className="h-64 w-full object-cover sm:h-72"
                priority
              />
            </div>
            <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white shadow-[0_20px_60px_-35px_rgba(59,130,246,0.45)]" data-aos="zoom-in" data-aos-delay="400">
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=960&q=80"
                alt="Award ceremony"
                width={960}
                height={720}
                className="h-64 w-full object-cover sm:h-72"
              />
            </div>
            <div className="absolute -bottom-9 left-1/2 w-full max-w-xs -translate-x-1/2 rounded-3xl bg-white p-6 shadow-[0_20px_60px_-30px_rgba(37,99,235,0.4)]" data-aos="fade-up" data-aos-delay="500">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                <span>Certifications</span>
                <span>2024 Status</span>
              </div>
              <div className="mt-6 flex flex-col gap-4 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Active Certificates</span>
                  <span className="font-semibold text-blue-600">6+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Industry Compliance</span>
                  <span className="font-semibold text-blue-600">100%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Renewal Status</span>
                  <span className="font-semibold text-blue-600">Up to date</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Recognition</span>
                  <span className="font-semibold text-blue-600">Validated</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0">
            {avatars.map((avatar, index) => (
              <div
                key={avatar.src}
                className={`absolute ${avatar.className} flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-white bg-white shadow-[0_14px_40px_-20px_rgba(37,99,235,0.45)]`}
                data-aos="zoom-in"
                data-aos-delay={600 + index * 100}
              >
                <Image src={avatar.src} alt={avatar.alt} width={80} height={80} className="h-full w-full rounded-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

