"use client";

import Link from "next/link";
import { ACADEMY_COURSES } from "@/lib/academyCoursesData";
import { useContactModal } from "@/components/ContactModal";

export default function AcademyPricingSection() {
  const { open } = useContactModal();

  return (
    <section id="pricing" className="relative scroll-mt-24 py-24 border-t border-white/10 bg-black">
      <div className="container-x">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-white/80 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Transparent Investment</span>
          </div>
          <h2 className="mt-4 font-brand text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white leading-tight">
            Invest in Real Skills &amp; Working Portfolios.
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/60">
            Centrally governed course pricing. No hidden certification charges. Flexible installment schedules and merit-based scholarship reviews available upon request.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ACADEMY_COURSES.map((course) => (
            <div
              key={course.id}
              className={`flex flex-col justify-between rounded-[24px] border p-6 sm:p-7 backdrop-blur-xl transition-all ${
                course.slug === "generative-ai-agentic-ai"
                  ? "border-[var(--accent-purple-soft)] bg-gradient-to-b from-[var(--accent-purple-soft)]/[0.1] via-white/[0.03] to-transparent shadow-[0_0_35px_rgba(168,85,247,0.15)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
              }`}
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono-g text-[10px] text-[var(--accent-purple-soft)]">
                    COURSE {course.number}
                  </span>
                  <span className="font-mono-g text-[10px] text-emerald-400">
                    {course.availability}
                  </span>
                </div>

                <h3 className="mt-4 font-brand text-lg font-medium text-white">
                  {course.title}
                </h3>
                <p className="mt-1 text-xs text-white/60">
                  {course.duration} &bull; {course.mode.split("+")[0]}
                </p>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="font-brand text-3xl font-bold text-white">
                    {course.priceDisplay}
                  </div>
                  <div className="mt-1 font-mono-g text-[11px] text-white/50">
                    {course.priceNote}
                  </div>
                </div>

                <div className="mt-6 space-y-2 border-t border-white/10 pt-4 text-xs text-white/70">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Complete Capstone Project Evaluation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>1-on-1 Code &amp; Architecture PR Reviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Verifiable Digital Credential &amp; Repo Badge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Access to TAGVERSE Buildathons</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-4 grid grid-cols-2 gap-2">
                <Link
                  href={`/academy/courses/${course.slug}`}
                  className="rounded-full border border-white/20 bg-white/5 py-2.5 text-center font-brand text-xs font-medium text-white transition-all hover:bg-white/10"
                >
                  Syllabus
                </Link>
                <button
                  type="button"
                  onClick={() => open(`Course Enrolment: ${course.title}`)}
                  className="rounded-full bg-white py-2.5 text-center font-brand text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-white/90"
                >
                  Enrol Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Scholarships & Installment Reassurance Box */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center text-xs text-white/60 backdrop-blur-md">
          <p>
            * Need flexible installment payments or seeking a merit-based scholarship? Apply for an orientation review and our admissions team will evaluate your portfolio and background.
          </p>
        </div>
      </div>
    </section>
  );
}
