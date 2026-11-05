"use client";

import { useState } from "react";
import Link from "next/link";
import { CAREER_PATHS, CareerPathItem } from "@/lib/academyEcosystemData";
import { useContactModal } from "@/components/ContactModal";

export default function CareerPathFinder() {
  const [selectedId, setSelectedId] = useState<string>(CAREER_PATHS[0].id);
  const { open } = useContactModal();

  const activePath = CAREER_PATHS.find((p) => p.id === selectedId) || CAREER_PATHS[0];

  return (
    <section id="career-paths" className="relative scroll-mt-24 py-24 border-t border-white/10 bg-black">
      <div className="container-x">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-white/80 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Interactive Learning Guidance</span>
          </div>
          <h2 className="mt-4 font-brand text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white leading-tight">
            Not Sure Which Course to Choose?
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/60">
            Tell us what you want to build or achieve. We will map out your prerequisite skills, target curriculum, and recommended next steps.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Left: Goals Selector */}
          <div className="space-y-2.5">
            <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/40 block mb-2">
              Select Your Aspiration
            </span>
            {CAREER_PATHS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`w-full text-left rounded-2xl p-4 transition-all border ${
                  selectedId === item.id
                    ? "border-[var(--accent-purple-soft)] bg-white/10 shadow-lg text-white"
                    : "border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-brand text-sm font-medium">
                    {item.goal}
                  </span>
                  <span className={`h-2 w-2 rounded-full ${selectedId === item.id ? "bg-[var(--accent-purple-soft)]" : "bg-white/20"}`} />
                </div>
              </button>
            ))}
          </div>

          {/* Right: Path Recommendation Detail Card */}
          <div className="rounded-[28px] border border-white/15 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-6 sm:p-8 backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono-g text-[11px] uppercase tracking-wider text-emerald-400">
                Recommended Path
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono-g text-[10px] text-white/70">
                Verified Curriculum
              </span>
            </div>

            <div className="mt-5">
              <h3 className="font-brand text-2xl font-medium text-white">
                {activePath.recommendedCourseTitle}
              </h3>
              <p className="mt-2 text-xs text-emerald-400 font-mono-g">
                {activePath.keyOutcome}
              </p>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4">
              <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/40 block mb-1">
                Starting Skills Needed
              </span>
              <p className="text-xs text-white/75 leading-relaxed">
                {activePath.startingSkills}
              </p>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4">
              <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/40 block mb-2">
                4-Stage Roadmap
              </span>
              <div className="space-y-2">
                {activePath.learningRoadmap.map((rm, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-white/70">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent-purple-soft)]/20 text-[10px] text-[var(--accent-purple-soft)] font-bold">
                      {idx + 1}
                    </span>
                    <span>{rm}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
              <Link
                href={`/academy/courses/${activePath.recommendedCourseSlug}`}
                className="rounded-full bg-white px-5 py-2.5 font-brand text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-white/90"
              >
                View Full Syllabus
              </Link>
              <button
                type="button"
                onClick={() => open(`TAGVERSE Academy - Orientation for ${activePath.recommendedCourseTitle}`)}
                className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-brand text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10"
              >
                Book Free Orientation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
