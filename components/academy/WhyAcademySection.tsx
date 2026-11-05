import Link from "next/link";

const PILLARS = [
  {
    number: "01",
    title: "Learn by Doing",
    description:
      "Students apply concepts by creating working applications, agent pipelines, and web systems from Day 1, instead of merely watching recorded video lessons.",
    outcome: "Working code repositories, not passive watch-time.",
  },
  {
    number: "02",
    title: "Build Real Projects",
    description:
      "Understand how artificial intelligence, cloud architectures, and automation are deployed in high-throughput enterprise environments and client projects.",
    outcome: "Production paradigms, latency SLAs, and cost governance.",
  },
  {
    number: "03",
    title: "Learn from Industry Professionals",
    description:
      "Learn through structured 1-on-1 feedback, weekly architectural office hours, and line-by-line pull request code reviews by practicing engineers.",
    outcome: "Clear direction from engineers who build for a living.",
  },
  {
    number: "04",
    title: "Build Your Portfolio",
    description:
      "Build a public, demonstrable collection of full-stack projects, AI agents, and technical case studies that convincingly prove your capabilities.",
    outcome: "Verifiable GitHub repositories and live deployments.",
  },
  {
    number: "05",
    title: "Work with Other Students",
    description:
      "Team up with fellow builders, participate in 48-hour buildathons, test real ideas, and present your project architectures to peers.",
    outcome: "Cross-functional team coordination and sprint velocity.",
  },
  {
    number: "06",
    title: "Prepare for Your Career",
    description:
      "Develop problem-solving resilience, technical documentation clarity, and presentation skills essential for high-impact technical roles.",
    outcome: "Confidence to tackle real-world engineering challenges.",
  },
];

export default function WhyAcademySection() {
  return (
    <section id="experience" className="relative py-24 border-t border-white/10 bg-gradient-to-b from-black via-white/[0.02] to-black">
      <div className="container-x">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-white/80 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-purple-soft)]" />
            <span>The TAGVERSE Philosophy</span>
          </div>
          <h2 className="mt-4 font-brand text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white leading-tight">
            Education Should Create Builders, Not Just Certificate Holders.
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/60">
            Traditional online courses leave students with certificates but zero ability to write production software. TAGVERSE Academy inverts the model: you learn by executing real briefs, shipping deployable code, and receiving direct feedback from practicing software architects.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <div
              key={p.number}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-b from-white/[0.04] via-white/[0.01] to-transparent p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-white/20"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono-g text-xs text-[var(--accent-purple-soft)] tracking-widest">
                    PILLAR &bull; {p.number}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-white/20 group-hover:bg-emerald-400 transition-colors" />
                </div>
                <h3 className="mt-4 font-brand text-lg font-medium text-white group-hover:text-white">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-white/60">
                  {p.description}
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-3">
                <div className="font-mono-g text-[10px] uppercase tracking-wider text-white/40">
                  Core Outcome
                </div>
                <p className="mt-1 font-mono-g text-xs text-emerald-400">
                  {p.outcome}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Transparent Disclaimer Callout */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center text-xs text-white/50 backdrop-blur-md">
          <p>
            * We focus on genuine skill development, demonstrable portfolio projects, and technical competence. TAGVERSE Academy does not make unrealistic claims of guaranteed job placements. Opportunities and career advancement result from your dedication and the quality of what you build.
          </p>
        </div>
      </div>
    </section>
  );
}
