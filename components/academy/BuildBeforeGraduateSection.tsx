import Link from "next/link";
import { STUDENT_PROJECT_ARCHITECTURES } from "@/lib/academyEcosystemData";

const PROJECT_JOURNEY_STAGES = [
  { step: "01", name: "IDEA", desc: "Define real enterprise problem & technical architecture" },
  { step: "02", name: "LEARN", desc: "Master relevant LLM, full stack, or signal algorithms" },
  { step: "03", name: "BUILD", desc: "Write modular production code with mentor pairing" },
  { step: "04", name: "TEST", desc: "Run benchmark tests, security audits & edge case validation" },
  { step: "05", name: "DEPLOY", desc: "Push to live cloud infrastructure with custom domain" },
  { step: "06", name: "PRESENT", desc: "Pitch live demo & document technical case study" },
];

export default function BuildBeforeGraduateSection() {
  return (
    <section className="relative py-24 border-t border-white/10 bg-gradient-to-b from-black via-[#0d071a] to-black">
      <div className="container-x">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-purple-soft)]/30 bg-[var(--accent-purple-soft)]/10 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-[var(--accent-purple-soft)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-purple-soft)] animate-pulse" />
            <span>Signature Practical Experience</span>
          </div>
          <h2 className="mt-4 font-brand text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white leading-tight">
            Your Best Achievement Is Something You Build.
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/60">
            Nobody hires a developer or AI engineer based on multiple-choice quiz scores. Industry teams evaluate your GitHub repositories, code architecture, problem-solving reasoning, and live running software. Every TAGVERSE Academy course centers on practical implementation.
          </p>
        </div>

        {/* 6-Stage Project Journey Pipeline */}
        <div className="mt-14">
          <div className="text-xs font-mono-g uppercase tracking-wider text-white/40 mb-4">
            The Builder Journey Pipeline
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {PROJECT_JOURNEY_STAGES.map((st, i) => (
              <div
                key={st.step}
                className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md"
              >
                <div>
                  <span className="font-mono-g text-xs font-bold text-[var(--accent-purple-soft)]">
                    STEP {st.step}
                  </span>
                  <div className="mt-1 font-brand text-sm font-semibold text-white">
                    {st.name}
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-white/50">
                    {st.desc}
                  </p>
                </div>
                {i < PROJECT_JOURNEY_STAGES.length - 1 && (
                  <span className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-white/20 text-xs">
                    &rarr;
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Representative Student Project Architectures Grid */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="font-brand text-xl text-white">
                Representative Project Architectures
              </h3>
              <p className="text-xs text-white/50 mt-1">
                Examples of real systems, prototypes, and applications built by students during our practical sprints.
              </p>
            </div>
            <Link
              href="/academy/projects"
              className="text-xs font-mono-g text-[var(--accent-purple-soft)] hover:underline"
            >
              View Complete Projects Wall &rarr;
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {STUDENT_PROJECT_ARCHITECTURES.slice(0, 6).map((proj) => (
              <div
                key={proj.id}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl transition-all hover:border-white/20"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono-g text-white/40">
                    <span>{proj.category}</span>
                    <span className="text-emerald-400">{proj.type}</span>
                  </div>
                  <h4 className="mt-3 font-brand text-base text-white">
                    {proj.title}
                  </h4>
                  <div className="mt-3 space-y-2 text-xs">
                    <div>
                      <span className="text-white/40 block text-[10px] uppercase font-mono-g">Problem Statement</span>
                      <p className="text-white/70 text-[11px]">{proj.problemStatement}</p>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[10px] uppercase font-mono-g">Engineered Solution</span>
                      <p className="text-white/60 text-[11px]">{proj.solutionDescription}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-white/10 pt-3 flex flex-wrap gap-1.5">
                  {proj.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-white/5 px-2 py-0.5 font-mono-g text-[9px] text-white/60 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
