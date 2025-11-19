const supportCards = [
  {
    title: 'Enterprise Training Programs',
    description: 'Blueprint immersive academy journeys tailored to your workforce KPIs with blended delivery, labs, and mentoring.',
    cta: 'Design A Cohort',
    icon: 'academy',
  },
  {
    title: 'Skill & Certification Pathways',
    description: 'Map micro-credentials to in-demand roles, manage assessments, and track learner progress in real time.',
    cta: 'Plan Pathways',
    icon: 'badge',
  },
  {
    title: 'Campus & Community Outreach',
    description: 'Launch outreach drives, job fairs, and campus challenges with our partner success team and digital stack.',
    cta: 'Activate Outreach',
    icon: 'community',
  },
  {
    title: 'Platforms & Integrations',
    description: 'Integrate LMS, analytics, and HRIS flows effortlessly with Yugayatra\'s APIs, dashboards, and automation kits.',
    cta: 'Meet The Tech Team',
    icon: 'platform',
  },
];

const iconPaths = {
  academy: (
    <path
      d="M3 6.667 8 4.333l5 2.334v5.333c0 2.486-2.239 4.826-5 6-2.761-1.174-5-3.514-5-6V6.667Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  badge: (
    <>
      <path d="M8 2.667 9.653 6 13.333 6.493 10.666 9l.733 3.333L8 10.667 4.6 12.333 5.334 9 2.667 6.493 6.347 6 8 2.667Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 12.333V14l3-1.334L11 14v-1.667" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  community: (
    <>
      <path d="M4.667 7.333a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.333 7.333a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.667 13.333v-.666a3.334 3.334 0 0 1 3.333-3.334h.667a3.334 3.334 0 0 1 3.333 3.334v.666" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.667 13.333v-.666a3.333 3.333 0 0 1 3.333-3.334h.667a3.333 3.333 0 0 1 3.333 3.334v.666" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  platform: (
    <>
      <rect x="2.667" y="4" width="10.666" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2.667 6.667h10.666" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5.333 11.333h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9.333 11.333h1.334" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
};

export default function QuickSupportCards() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1d4ed8] via-[#2563eb] to-[#1e40af] py-20">
      <div className="absolute inset-y-0 left-1/3 hidden h-full w-[45rem] -skew-x-[26deg] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_58%)] lg:block" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center text-white">
          <span className="rounded-full border border-white/30 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80" data-aos="fade-up">Support Hubs</span>
          <h2 className="mt-6 text-3xl font-semibold sm:text-4xl" data-aos="fade-up" data-aos-delay="100">Find What You Need Faster</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70" data-aos="fade-up" data-aos-delay="200">
            Navigate Yugayatra&apos;s service ecosystem. Tap into the squad that aligns programs, platforms, and partnerships to unlock skilled talent at scale.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {supportCards.map((card, index) => (
            <article key={card.title} className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/12" data-aos="fade-up" data-aos-delay={300 + index * 100}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white/80">
                <svg viewBox="0 0 16 16" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {iconPaths[card.icon]}
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{card.title}</h3>
              <p className="mt-3 text-sm text-white/70">{card.description}</p>
              <button className="mt-6 inline-flex items-center text-sm font-semibold text-white transition group-hover:translate-x-1">
                {card.cta}
                <svg className="ml-2 h-4 w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

