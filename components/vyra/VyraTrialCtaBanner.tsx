"use client";

import { useContactModal } from "@/components/ContactModal";

export default function VyraTrialCtaBanner() {
  const { open } = useContactModal();

  return (
    <section className="relative py-20 border-t border-white/10 bg-gradient-to-b from-black via-white/[0.02] to-black">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[32px] border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-8 sm:p-12 lg:p-16 text-center backdrop-blur-2xl shadow-2xl">
          {/* Ambient Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-[var(--accent-purple-soft)]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 font-mono-g text-[11px] uppercase tracking-wider text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Zero Risk &bull; Full Access for 30 Days</span>
            </div>

            <h2 className="mt-5 font-brand text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white">
              Ready for Complete Business Control?
            </h2>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70">
              Join forward-thinking agencies, consultancies, and enterprises scaling operations on VYRA CRM. Experience complete pipeline visibility, automated team governance, and AI-powered voice outreach.
            </p>

            {/* 3 Prominent CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => open("VYRA CRM - 30-Day Free Trial")}
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 font-brand text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
              >
                <span>Start Free 30-Day Trial</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => open("VYRA CRM - Product Demo")}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 font-brand text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Book a Demo</span>
              </button>

              <button
                type="button"
                onClick={() => open("VYRA CRM - Enterprise Sales")}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-6 py-4 font-brand text-xs font-semibold uppercase tracking-wider text-white/70 transition-all hover:border-white/30 hover:text-white"
              >
                <span>Contact Sales</span>
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 font-mono-g text-[11px] text-white/50">
              <span>&bull; Setup takes under 2 minutes</span>
              <span>&bull; No credit card required</span>
              <span>&bull; Free data import assistance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
