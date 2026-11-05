export default function StudentToBuilderSection() {
  const PATHWAY = [
    { step: "01", stage: "LEARNER", desc: "Master core concepts through live labs and code exercises" },
    { step: "02", stage: "PROJECT BUILDER", desc: "Engineer real-world capstone prototypes & participate in buildathons" },
    { step: "03", stage: "PORTFOLIO READY", desc: "Refine documented repositories, live deployments, and case studies" },
    { step: "04", stage: "OPPORTUNITY READY", desc: "Eligible for internal project reviews, builder sprints, and client exposures" },
  ];

  return (
    <section className="relative py-24 border-t border-white/10 bg-gradient-to-b from-black via-[#0a0515] to-black">
      <div className="container-x">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-purple-soft)]/30 bg-[var(--accent-purple-soft)]/10 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-[var(--accent-purple-soft)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-purple-soft)] animate-pulse" />
            <span>The Student-to-Builder Initiative</span>
          </div>
          <h2 className="mt-4 font-brand text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white leading-tight">
            Learn With Us. Build With Us. Grow With Us.
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/60">
            Outstanding work does not go unnoticed. High-performing students who demonstrate technical discipline, problem-solving persistence, and clean code architecture are eligible to apply for internal project collaboration and technical apprenticeships.
          </p>
        </div>

        {/* 4-Stage Pathway */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PATHWAY.map((p, idx) => (
            <div
              key={p.step}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
            >
              <span className="font-mono-g text-xs font-bold text-[var(--accent-purple-soft)]">
                PHASE {p.step}
              </span>
              <h3 className="mt-2 font-brand text-lg font-medium text-white">
                {p.stage}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/60">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Honest Non-Negotiable Compliance Notice */}
        <div className="mt-10 rounded-2xl border border-white/15 bg-white/[0.02] p-6 backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs text-white/70">
              ℹ
            </span>
            <div className="text-xs text-white/60 leading-relaxed">
              <strong className="text-white">Important Transparency Notice:</strong> Internships, client project participation, and internal apprenticeships are strictly merit-based and dependent on project requirements, code quality evaluations, and candidate interview readiness. TAGVERSE Academy does not promise or guarantee employment, jobs, or placements.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
