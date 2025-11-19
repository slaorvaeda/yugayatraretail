import Image from 'next/image';

const experts = [
  {
    name: 'Ananya Khurana',
    title: 'Director · Workforce Strategy',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=640',
  },
  {
    name: 'Rohan Iyer',
    title: 'Head · Enterprise Partnerships',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=640',
  },
  {
    name: 'Sahana Mehta',
    title: 'Lead · Learning Experience Design',
    image: 'https://images.pexels.com/photos/1181578/pexels-photo-1181578.jpeg?auto=compress&cs=tinysrgb&w=640',
  },
  {
    name: 'Kartik Rao',
    title: 'Principal · Technology Platforms',
    image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=640',
  },
];

export default function ExpertTeamSection() {
  return (
    <section className="bg-gradient-to-b from-white to-[#e8edff] py-20">
      <div className="mx-auto max-w-6xl px-6 text-center lg:px-8">
        <span className="rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-700" data-aos="fade-up">
          Expert Collective
        </span>
        <h2 className="mt-6 text-3xl font-semibold text-slate-900 sm:text-[2.4rem]" data-aos="fade-up" data-aos-delay="100">Experts Ready To Help</h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600" data-aos="fade-up" data-aos-delay="200">
          Each engagement at Yugayatra is powered by practitioners who marry people, process, and platforms. Collaborate with specialists who have scaled academies, built industry alliances, and delivered measurable employment outcomes.
        </p>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {experts.map((expert, index) => (
            <article key={expert.name} className="group overflow-hidden rounded-[28px] bg-white shadow-[0_22px_50px_-32px_rgba(37,99,235,0.35)]" data-aos="fade-up" data-aos-delay={300 + index * 100}>
              <div className="relative h-60 w-full overflow-hidden">
                <Image src={expert.image} alt={expert.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/0 to-transparent" />
              </div>
              <div className="p-6 text-left">
                <h3 className="text-lg font-semibold text-slate-900">{expert.name}</h3>
                <p className="mt-2 text-sm text-blue-600">{expert.title}</p>
                <button className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600">
                  Meet The Expert
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


