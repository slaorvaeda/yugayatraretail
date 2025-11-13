export default function MembershipCTA() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[36px] bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#1e40af] px-8 py-16 text-center text-white shadow-[0_28px_90px_-36px_rgba(37,99,235,0.55)] transform-gpu transition duration-500 hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-[0_40px_120px_-45px_rgba(37,99,235,0.6)] hover:from-[#2563eb] hover:via-[#1d4ed8] hover:to-[#1e3a8a] sm:px-16" data-aos="zoom-in" data-aos-duration="800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.2),transparent_60%)]" aria-hidden="true" />
        <div className="relative z-10">
          <span className="rounded-full border border-white/30 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80" data-aos="fade-up" data-aos-delay="100">
            Community
          </span>
          <h2 className="mt-6 text-3xl font-semibold sm:text-[2.4rem]" data-aos="fade-up" data-aos-delay="200">Join The Yugayatra Partner Circle</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70" data-aos="fade-up" data-aos-delay="300">
            Be the first to access cohort launch windows, industry roundtables, and insights from peers transforming workforce capability across India.
          </p>
          <form className="mx-auto mt-10 flex max-w-xl flex-col gap-4 sm:flex-row" data-aos="fade-up" data-aos-delay="400">
            <input
              type="email"
              name="membership-email"
              required
              placeholder="Enter your work email"
              className="h-12 flex-1 rounded-full border border-white/30 bg-white/10 px-6 text-sm text-white placeholder-white/60 outline-none transition focus:border-white focus:bg-white/20"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              Request Invite
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

