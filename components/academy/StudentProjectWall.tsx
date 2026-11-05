"use client";

import { useState } from "react";
import { STUDENT_PROJECT_ARCHITECTURES, ProjectShowcaseItem } from "@/lib/academyEcosystemData";
import { useContactModal } from "@/components/ContactModal";

const CATEGORIES = ["All Projects", "Artificial Intelligence", "Software Development", "Automation", "Digital Marketing", "Neurotechnology"];

export default function StudentProjectWall() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Projects");
  const { open } = useContactModal();

  const filtered =
    selectedCategory === "All Projects"
      ? STUDENT_PROJECT_ARCHITECTURES
      : STUDENT_PROJECT_ARCHITECTURES.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-24 border-t border-white/10 bg-black">
      <div className="container-x">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-white/80 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Student Project Wall</span>
          </div>
          <h2 className="mt-4 font-brand text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white leading-tight">
            Real Ideas. Practical Projects. Visible Progress.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            A comprehensive gallery of architectures, prototypes, and applications developed by students across our cohorts.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 font-mono-g text-xs transition-all ${
                selectedCategory === cat
                  ? "bg-white text-black font-semibold shadow-md"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="flex flex-col justify-between rounded-[22px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all hover:border-white/20"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono-g text-white/40 pb-3 border-b border-white/10">
                  <span>{proj.category}</span>
                  <span className="text-emerald-400">{proj.type}</span>
                </div>

                <h3 className="mt-4 font-brand text-lg font-medium text-white">
                  {proj.title}
                </h3>

                <div className="mt-4 space-y-2.5 text-xs">
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase font-mono-g">Problem Statement</span>
                    <p className="text-white/75 mt-0.5 text-[11px] leading-relaxed">{proj.problemStatement}</p>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase font-mono-g">Engineered Solution</span>
                    <p className="text-white/65 mt-0.5 text-[11px] leading-relaxed">{proj.solutionDescription}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {proj.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-white/5 px-2 py-0.5 font-mono-g text-[10px] text-white/60 border border-white/5"
                    >
                      {t}
                    </span>
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
