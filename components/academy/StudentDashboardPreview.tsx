export default function StudentDashboardPreview() {
  return (
    <section className="relative py-24 border-t border-white/10 bg-black">
      <div className="container-x">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-white/80 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-purple-soft)]" />
            <span>Interactive Learning Environment</span>
          </div>
          <h2 className="mt-4 font-brand text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white leading-tight">
            Designed for Focus, Velocity &amp; Code Quality.
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/60">
            A preview of the TAGVERSE student portal where enrolled learners track sprint deliverables, join live coding sessions, request mentor PR reviews, and showcase their portfolio.
          </p>
        </div>

        {/* Dashboard Frame Preview */}
        <div className="mt-12 rounded-[28px] border border-white/15 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-5 sm:p-8 backdrop-blur-2xl shadow-2xl">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-purple-soft)]/20 text-xs font-bold text-[var(--accent-purple-soft)]">
                KB
              </span>
              <div>
                <div className="font-brand text-sm font-medium text-white">Student Workspace Preview</div>
                <div className="font-mono-g text-[10px] text-white/50">Cohort: Generative AI &amp; Agentic AI</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono-g text-[10px] text-emerald-400 border border-emerald-500/30">
                Phase 3: Multi-Agent Swarms
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono-g text-[10px] text-white/60">
                Sprint Week 5 of 8
              </span>
            </div>
          </div>

          {/* 3 Columns Internal Grid */}
          <div className="mt-6 grid gap-5 lg:grid-cols-3 font-mono-g text-xs">
            {/* Col 1: Progress & Active Sprint */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between text-white/40 text-[10px] uppercase tracking-wider">
                <span>Curriculum Progress</span>
                <span className="text-emerald-400 font-bold">62%</span>
              </div>
              <div className="mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[var(--accent-purple-soft)] to-emerald-400 w-[62%]" />
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                  <div className="text-[10px] text-white/40">CURRENT ACTIVE LAB</div>
                  <div className="mt-1 font-medium text-white text-xs">LangGraph Deterministic State Machine</div>
                  <div className="mt-1 text-[10px] text-emerald-400">Due in 2 days &bull; GitHub PR #4</div>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                  <div className="text-[10px] text-white/40">NEXT UPCOMING MILESTONE</div>
                  <div className="mt-1 font-medium text-white text-xs">MCP Tool Calling Architecture</div>
                  <div className="mt-1 text-[10px] text-white/50">Starting Week 6</div>
                </div>
              </div>
            </div>

            {/* Col 2: Code Review & Mentor Feedback */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-white/40 text-[10px] uppercase tracking-wider">
                Recent Mentor PR Review
              </div>
              <div className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400 text-xs">PR #3: Approved with Comments</span>
                  <span className="text-[10px] text-emerald-400/70">Yesterday</span>
                </div>
                <p className="mt-2 text-[11px] text-emerald-300/90 leading-relaxed font-sans">
                  &ldquo;Excellent implementation of parent-child document chunking in your RAG pipeline. Latency dropped by 42%. Look into caching embedding lookups for frequent queries.&rdquo;
                </p>
                <div className="mt-2 text-[10px] text-emerald-400/60 font-mono-g">
                  Reviewed by: Senior AI Systems Architect
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-white/60">
                <span>Booked 1-on-1 Office Hour:</span>
                <span className="text-white font-medium">Saturday 2:00 PM</span>
              </div>
            </div>

            {/* Col 3: Verifiable Credential Vault */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex flex-col justify-between">
              <div>
                <div className="text-white/40 text-[10px] uppercase tracking-wider">
                  Credential Vault
                </div>
                <div className="mt-3 rounded-xl border border-white/10 bg-black/40 p-3.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-white text-xs font-medium">TAGVERSE Certified AI Builder</span>
                  </div>
                  <p className="mt-1.5 text-[10px] text-white/50 font-sans leading-normal">
                    Cryptographically verifiable certificate linked directly to your GitHub repository and live capstone deployment.
                  </p>
                  <div className="mt-3 text-[9px] text-[var(--accent-purple-soft)]">
                    SHA256: e8f4b29c...a719d04
                  </div>
                </div>
              </div>

              <div className="mt-4 text-[10px] text-white/40 text-center">
                * Visual portal interface preview for prospective students.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
