"use client";

import { useState } from "react";
import Link from "next/link";
import { ACADEMY_COURSES, AcademyCourse } from "@/lib/academyCoursesData";
import { useContactModal } from "@/components/ContactModal";

const CATEGORIES = [
  "All Courses",
  "Artificial Intelligence",
  "Software Development",
  "Digital Marketing",
  "Automation",
  "Neurotechnology",
] as const;

const SKILL_LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"] as const;

export default function CourseCatalogue() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Courses");
  const [selectedLevel, setSelectedLevel] = useState<string>("All Levels");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { open } = useContactModal();

  const filteredCourses = ACADEMY_COURSES.filter((course) => {
    // Category match
    const matchesCategory =
      selectedCategory === "All Courses" || course.category === selectedCategory;

    // Level match
    const matchesLevel =
      selectedLevel === "All Levels" ||
      course.skillLevel.toLowerCase().includes(selectedLevel.toLowerCase());

    // Search query match (title, description, technologies)
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      course.title.toLowerCase().includes(q) ||
      course.shortDescription.toLowerCase().includes(q) ||
      course.technologiesCovered.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <section id="courses" className="relative scroll-mt-24 py-24 border-t border-white/10 bg-black">
      <div className="container-x">
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-white/80 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Interactive Course Catalogue</span>
            </div>
            <h2 className="mt-4 font-brand text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white">
              Emerging Technology Curriculums
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/60">
              Pragmatic, project-driven engineering tracks designed for practitioners. Learn from senior architects, build commercial prototypes, and build an exceptional portfolio.
            </p>
          </div>

          {/* Quick Enrol / Orientation CTA */}
          <div className="shrink-0">
            <Link
              href="/academy/book-orientation"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-brand text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10"
            >
              <span>Book Free Orientation</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="mt-10 space-y-4 rounded-[24px] border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl">
          <div className="grid gap-4 md:grid-cols-[1fr_auto]">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by topic, skill, or technology (e.g. LangGraph, React, n8n, Meta Ads, EEG)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-white/10 bg-black/60 px-5 py-3 text-xs sm:text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-[var(--accent-purple-soft)]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono-g text-white/40 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Skill Level Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="font-mono-g text-[11px] text-white/40 mr-1 hidden sm:inline">Level:</span>
              {SKILL_LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSelectedLevel(level)}
                  className={`rounded-full px-3 py-1.5 font-mono-g text-[11px] transition-all whitespace-nowrap ${
                    selectedLevel === level
                      ? "bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 font-mono-g text-xs transition-all ${
                  selectedCategory === cat
                    ? "bg-[var(--accent-purple)] text-white dark:bg-[var(--accent-purple-soft)] dark:text-black font-semibold shadow-md"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-6 flex items-center justify-between text-xs font-mono-g text-white/50">
          <span>Showing {filteredCourses.length} of {ACADEMY_COURSES.length} courses</span>
          {searchQuery && <span>Filter applied: &quot;{searchQuery}&quot;</span>}
        </div>

        {/* Courses Grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} onEnrol={() => open(`Course: ${course.title}`)} />
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-12 text-center text-white/60">
              <p className="font-brand text-lg text-white">No courses match your filter criteria.</p>
              <p className="mt-2 text-xs">Try selecting &quot;All Courses&quot; or clearing your search query.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All Courses");
                  setSelectedLevel("All Levels");
                  setSearchQuery("");
                }}
                className="mt-4 rounded-full bg-white px-5 py-2 font-mono-g text-xs font-semibold text-black"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CourseCard({ course, onEnrol }: { course: AcademyCourse; onEnrol: () => void }) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
          <span className="font-mono-g text-[10px] uppercase tracking-wider text-[var(--accent-purple-soft)]">
            COURSE {course.number} &bull; {course.category}
          </span>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono-g text-[10px] text-emerald-400 border border-emerald-500/30">
            {course.availability}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="mt-4 font-brand text-xl font-medium tracking-tight text-white group-hover:text-white">
          <Link href={`/academy/courses/${course.slug}`} className="hover:text-[var(--accent-purple-soft)] transition-colors">
            {course.title}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-white/80 font-medium">
          {course.tagline}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-white/60 line-clamp-3">
          {course.shortDescription}
        </p>

        {/* Course Meta Specs */}
        <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-white/5 bg-white/[0.03] p-3 text-[11px] font-mono-g text-white/70">
          <div>
            <span className="text-white/40 block text-[10px]">Level:</span>
            <span className="font-medium text-white">{course.skillLevel}</span>
          </div>
          <div>
            <span className="text-white/40 block text-[10px]">Duration:</span>
            <span className="font-medium text-white">{course.duration.split(" ")[0]} {course.duration.split(" ")[1]}</span>
          </div>
        </div>

        {/* Tech Stack Covered */}
        <div className="mt-4">
          <div className="font-mono-g text-[10px] uppercase tracking-wider text-white/40 mb-2">
            Technologies Covered
          </div>
          <div className="flex flex-wrap gap-1.5">
            {course.technologiesCovered.slice(0, 5).map((tech, i) => (
              <span
                key={i}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono-g text-[10px] text-white/70"
              >
                {tech}
              </span>
            ))}
            {course.technologiesCovered.length > 5 && (
              <span className="rounded-md bg-white/5 px-1.5 py-0.5 font-mono-g text-[10px] text-white/40">
                +{course.technologiesCovered.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Project Outcome Preview */}
        <div className="mt-4 border-t border-white/10 pt-3 text-xs text-white/75">
          <span className="font-mono-g text-[10px] text-emerald-400 block mb-1">
            KEY CAPSTONE OUTCOME:
          </span>
          <p className="line-clamp-2 leading-snug">
            {course.projectOutcomes[0]}
          </p>
        </div>
      </div>

      {/* Pricing & CTAs */}
      <div className="mt-6 border-t border-white/10 pt-4">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <div className="font-brand text-2xl font-bold text-white">
              {course.priceDisplay}
            </div>
            <div className="font-mono-g text-[10px] text-white/40">
              {course.priceNote.split(".")[0]}
            </div>
          </div>
          <span className="font-mono-g text-[10px] text-white/50">
            {course.nextCohortDate}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/academy/courses/${course.slug}`}
            className="flex items-center justify-center rounded-full border border-white/20 bg-white/5 py-2.5 text-center font-brand text-xs font-medium text-white transition-all hover:bg-white/10"
          >
            Explore Course
          </Link>

          <button
            type="button"
            onClick={onEnrol}
            className="flex items-center justify-center rounded-full bg-white py-2.5 text-center font-brand text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
          >
            Enrol Now
          </button>
        </div>
      </div>
    </div>
  );
}
