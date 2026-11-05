"use client";

import { ACADEMY_EVENTS } from "@/lib/academyEcosystemData";
import { useContactModal } from "@/components/ContactModal";

export default function LiveLearningCalendar() {
  const { open } = useContactModal();

  return (
    <section className="relative py-24 border-t border-white/10 bg-gradient-to-b from-black via-white/[0.02] to-black">
      <div className="container-x">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-white/80 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Live Schedule</span>
            </div>
            <h2 className="mt-4 font-brand text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white leading-tight">
              Live Learning &amp; Orientation Calendar
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Join upcoming live orientation walkthroughs, curriculum teardowns, open masterclasses, and buildathon hackathons.
            </p>
          </div>

          <div className="shrink-0 font-mono-g text-xs text-white/50">
            All times in Indian Standard Time (IST)
          </div>
        </div>

        {/* Events Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {ACADEMY_EVENTS.map((event) => (
            <div
              key={event.id}
              className="flex flex-col justify-between rounded-[24px] border border-white/10 bg-gradient-to-b from-white/[0.04] via-white/[0.01] to-transparent p-6 sm:p-7 backdrop-blur-xl transition-all hover:border-white/20"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono-g text-[11px] text-[var(--accent-purple-soft)]">
                    {event.type}
                  </span>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono-g text-[10px] text-emerald-400 border border-emerald-500/30">
                    {event.status}
                  </span>
                </div>

                <h3 className="mt-4 font-brand text-lg font-medium text-white">
                  {event.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-4 text-xs font-mono-g text-white/70">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white/40">Date:</span>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white/40">Format:</span>
                    <span>{event.mode}</span>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-white/60">
                  {event.description}
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between">
                <span className="font-mono-g text-[11px] text-emerald-400">
                  Free Access &bull; Registration Required
                </span>
                <button
                  type="button"
                  onClick={() => open(`TAGVERSE Academy Event Registration: ${event.title}`)}
                  className="rounded-full bg-white px-5 py-2 font-brand text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-white/90"
                >
                  Reserve Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
