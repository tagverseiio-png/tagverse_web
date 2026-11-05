"use client";

import { BUILDATHON_EVENTS } from "@/lib/academyEcosystemData";
import { useContactModal } from "@/components/ContactModal";

export default function BuildathonsSection() {
  const { open } = useContactModal();

  return (
    <section className="relative py-24 border-t border-white/10 bg-black">
      <div className="container-x">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-white/80 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Collaborative Engineering Sprints</span>
          </div>
          <h2 className="mt-4 font-brand text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white leading-tight">
            Think. Build. Collaborate. Launch.
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/60">
            Join scheduled collaborative build challenges where learners turn ambitious ideas into working prototypes, solve practical enterprise problems, and present their architectures to industry mentors.
          </p>
        </div>

        {/* Buildathon Events Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {BUILDATHON_EVENTS.map((event) => (
            <div
              key={event.id}
              className="relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-b from-white/[0.04] via-white/[0.01] to-transparent p-6 sm:p-7 backdrop-blur-xl transition-all hover:border-white/20"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono-g text-[11px] text-[var(--accent-purple-soft)]">
                    {event.format}
                  </span>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono-g text-[10px] text-emerald-400 border border-emerald-500/30">
                    {event.status}
                  </span>
                </div>

                <h3 className="mt-4 font-brand text-lg font-medium text-white">
                  {event.title}
                </h3>
                <p className="mt-1 text-xs font-mono-g text-white/50">
                  Theme: {event.theme} &bull; {event.timeline}
                </p>

                <div className="mt-4 border-t border-white/10 pt-3">
                  <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/40 block mb-1">
                    Problem Statement
                  </span>
                  <p className="text-xs leading-relaxed text-white/70">
                    {event.problemStatement}
                  </p>
                </div>

                <div className="mt-4 space-y-1.5 text-xs text-white/60">
                  <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/40 block mb-1">
                    Sprint Deliverables
                  </span>
                  {event.deliverables.map((del, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                      <span className="h-1 w-1 rounded-full bg-[var(--accent-purple-soft)]" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => open(`TAGVERSE Buildathon Registration: ${event.title}`)}
                  className="w-full rounded-full bg-white/10 py-2.5 font-brand text-xs font-medium text-white transition-all hover:bg-white hover:text-black"
                >
                  Register for Buildathon
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
