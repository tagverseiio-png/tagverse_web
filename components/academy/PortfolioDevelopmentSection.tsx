export default function PortfolioDevelopmentSection() {
  return (
    <section className="relative py-24 border-t border-white/10 bg-black">
      <div className="container-x">
        {/* Top Part: Portfolio Development */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-white/80 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Tangible Career Assets</span>
          </div>
          <h2 className="mt-4 font-brand text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white leading-tight">
            Graduate With Something to Show.
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/60">
            Every course requires students to produce demonstrable, public-facing engineering deliverables. We help you transform messy code into an executive-ready professional engineering portfolio.
          </p>
        </div>

        {/* 4 Pillars of Portfolio Proof */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
            <div className="font-mono-g text-xs text-[var(--accent-purple-soft)]">CODE REPOSITORIES</div>
            <h3 className="mt-2 font-brand text-base text-white">Clean GitHub Profile</h3>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              Structured repositories with comprehensive READMEs, setup instructions, unit tests, and CI/CD status badges.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
            <div className="font-mono-g text-xs text-emerald-400">HOSTED APPS</div>
            <h3 className="mt-2 font-brand text-base text-white">Live Deployments</h3>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              Running web apps with custom domains on modern cloud infrastructure (Vercel, Supabase, Railway, AWS).
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
            <div className="font-mono-g text-xs text-blue-400">DOCUMENTATION</div>
            <h3 className="mt-2 font-brand text-base text-white">Technical Case Studies</h3>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              Written breakdown of technical architecture decisions, benchmark latency metrics, and edge-case failure handling.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
            <div className="font-mono-g text-xs text-amber-400">INDUSTRY PRESENCE</div>
            <h3 className="mt-2 font-brand text-base text-white">LinkedIn & Demo Day</h3>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              Polished video walkthroughs, project presentation slides, and professional social positioning for technical roles.
            </p>
          </div>
        </div>

        {/* Bottom Part: Startup Simulation Feature */}
        <div className="mt-20 rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-transparent p-8 sm:p-12 backdrop-blur-2xl">
          <div className="max-w-2xl">
            <span className="font-mono-g text-[11px] uppercase tracking-wider text-[var(--accent-purple-soft)]">
              OPTIONAL ACCELERATOR MODULE
            </span>
            <h3 className="mt-2 font-brand text-2xl sm:text-3xl font-medium text-white">
              Think Like a Founder. Build Like an Engineer.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              For ambitious learners wanting to launch digital products, our optional startup simulation walks you through real product discovery: validating genuine market demand, scoping an MVP, building a functional prototype, and pitching to practitioners.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5 text-center font-mono-g text-xs">
            <div className="rounded-xl border border-white/10 bg-black/40 p-3">
              <span className="text-[var(--accent-purple-soft)] block text-[10px]">01</span>
              <span className="text-white font-medium">Problem Discovery</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-3">
              <span className="text-[var(--accent-purple-soft)] block text-[10px]">02</span>
              <span className="text-white font-medium">MVP Scoping</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-3">
              <span className="text-[var(--accent-purple-soft)] block text-[10px]">03</span>
              <span className="text-white font-medium">Prototype Build</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-3">
              <span className="text-[var(--accent-purple-soft)] block text-[10px]">04</span>
              <span className="text-white font-medium">User Testing</span>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-400">
              <span className="block text-[10px]">05</span>
              <span className="font-bold">Demo Day Pitch</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
