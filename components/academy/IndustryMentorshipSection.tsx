import { ACADEMY_MENTORS } from "@/lib/academyEcosystemData";

export default function IndustryMentorshipSection() {
  return (
    <section id="mentorship" className="relative scroll-mt-24 py-24 border-t border-white/10 bg-gradient-to-b from-black via-white/[0.02] to-black">
      <div className="container-x">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-white/80 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-purple-soft)]" />
            <span>Practitioner Mentorship</span>
          </div>
          <h2 className="mt-4 font-brand text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white leading-tight">
            Learn From People Who Build.
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/60">
            Our mentors are not theoretical academic lecturers. They are practicing software architects, AI researchers, and automation specialists currently building production client systems at TAGVERSE.
          </p>
        </div>

        {/* Mentorship Modules Row */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono-g text-xs">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center">
            <div className="font-bold text-white text-sm">1-on-1 Office Hours</div>
            <div className="mt-1 text-white/50 text-[11px]">Direct architectural guidance</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center">
            <div className="font-bold text-white text-sm">Line-by-Line PR Reviews</div>
            <div className="mt-1 text-white/50 text-[11px]">GitHub code quality audits</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center">
            <div className="font-bold text-white text-sm">Live Teardown Labs</div>
            <div className="mt-1 text-white/50 text-[11px]">Real failure recovery demos</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center">
            <div className="font-bold text-white text-sm">Portfolio Polish</div>
            <div className="mt-1 text-white/50 text-[11px]">Documentation & demo coaching</div>
          </div>
        </div>

        {/* Mentor Cards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ACADEMY_MENTORS.map((m, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-[22px] border border-white/10 bg-gradient-to-b from-white/[0.04] via-white/[0.01] to-transparent p-6 backdrop-blur-xl transition-all hover:border-white/25"
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 font-brand text-sm font-bold text-[var(--accent-purple-soft)]">
                  0{idx + 1}
                </div>

                <h3 className="mt-4 font-brand text-base font-medium text-white">
                  {m.name}
                </h3>
                <p className="mt-0.5 text-xs font-mono-g text-emerald-400">
                  {m.role}
                </p>

                <p className="mt-3 text-xs leading-relaxed text-white/60">
                  {m.bio}
                </p>

                <div className="mt-4 border-t border-white/10 pt-3">
                  <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/40 block mb-1.5">
                    Areas of Expertise
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {m.expertise.map((exp, i) => (
                      <span
                        key={i}
                        className="rounded bg-white/5 px-1.5 py-0.5 font-mono-g text-[10px] text-white/70"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-white/10 pt-3">
                <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/40 block mb-1">
                  Available Sessions
                </span>
                <div className="space-y-1 text-[11px] font-mono-g text-white/50">
                  {m.sessionTypes.map((st, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-[var(--accent-purple-soft)]" />
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
