"use client";

import Link from "next/link";
import { useContactModal } from "@/components/ContactModal";

export default function AcademyFinalCta() {
  const { open } = useContactModal();

  return (
    <section className="relative py-24 border-t border-white/10 bg-gradient-to-b from-black via-white/[0.02] to-black">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[32px] border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-8 sm:p-14 lg:p-16 text-center backdrop-blur-2xl shadow-2xl">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-[var(--accent-purple-soft)]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 font-mono-g text-[11px] uppercase tracking-wider text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Next Cohort Enrollment Now Open</span>
            </div>

            <h2 className="mt-5 font-brand text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              Your Next Chapter Starts With What You Build.
            </h2>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70">
              Choose your learning path, develop practical skills and start creating the future you want to be part of. From Learner to Builder. Welcome to TAGVERSE Academy.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/academy#courses"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-brand text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-white/90 shadow-[0_0_35px_rgba(255,255,255,0.3)]"
              >
                <span>Explore Courses</span>
                <span>&rarr;</span>
              </a>

              <button
                type="button"
                onClick={() => open("TAGVERSE Academy - Book Free Orientation")}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 font-brand text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Book Free Orientation</span>
              </button>

              <Link
                href="/academy/enroll"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-6 py-4 font-brand text-xs font-semibold uppercase tracking-wider text-white/70 transition-all hover:border-white/30 hover:text-white"
              >
                <span>Apply / Inquire Directly</span>
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 font-mono-g text-[11px] text-white/50">
              <span>&bull; Hands-on project labs</span>
              <span>&bull; Verified practitioner mentors</span>
              <span>&bull; Portfolio-driven outcomes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
