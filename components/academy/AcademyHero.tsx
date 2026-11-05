"use client";

import Link from "next/link";
import { useContactModal } from "@/components/ContactModal";

export default function AcademyHero() {
  const { open } = useContactModal();

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section id="overview" className="relative overflow-hidden pt-8 pb-20 sm:pt-14 sm:pb-28">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[550px] w-[900px] rounded-full bg-gradient-to-tr from-[var(--accent-purple-soft)]/20 via-blue-500/15 to-transparent blur-[140px]" />

      <div className="container-x relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left Content */}
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-purple-soft)] animate-pulse" />
              <span className="font-mono-g text-[11px] font-medium uppercase tracking-wider text-white/90">
                TAGVERSE ACADEMY &bull; NEXT-GENERATION LEARNING
              </span>
            </div>

            {/* Core Brand Positioning */}
            <div className="mt-4 font-mono-g text-xs uppercase tracking-widest text-emerald-400">
              FROM LEARNER TO BUILDER
            </div>

            {/* Main Headline */}
            <h1 className="mt-3 font-brand text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.08]">
              Learn Skills. Build Products. Become Industry Ready.
            </h1>

            {/* Core Tagline */}
            <p className="mt-4 font-brand text-lg sm:text-xl font-normal text-[var(--accent-purple-soft)]">
              &ldquo;Don&apos;t Just Learn AI. Build With It.&rdquo;
            </p>

            {/* Description */}
            <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-white/60">
              Move beyond traditional learning. Explore AI, software development, automation and digital innovation through practical training, real-world projects and industry-oriented mentorship.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToSection("courses")}
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white px-7 py-3.5 font-brand text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-white/90 hover:shadow-[0_0_35px_rgba(255,255,255,0.4)]"
              >
                <span>Explore Courses</span>
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
                onClick={() => open("TAGVERSE Academy - Book Free Orientation")}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-brand text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Book Free Orientation</span>
              </button>

              <Link
                href="/academy/projects"
                className="inline-flex items-center gap-1.5 px-4 py-3 font-mono-g text-xs font-medium text-white/60 transition-colors hover:text-white"
              >
                <span>Student Projects</span>
                <span>&rarr;</span>
              </Link>
            </div>

            {/* 5 Supporting Highlights Pills */}
            <div className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-6">
              {[
                "Project-Based Learning",
                "Industry Mentorship",
                "Practical Skill Development",
                "Portfolio Building",
                "Career-Focused Learning",
              ].map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono-g text-[11px] text-white/70"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual: Interactive Learning Workspace Preview */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-5 sm:p-6 backdrop-blur-2xl shadow-2xl">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono-g text-[11px] text-white/50">
                    academy.t4gverse.com/workspace
                  </span>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono-g text-[10px] text-emerald-400 border border-emerald-500/30">
                  Lab Environment
                </span>
              </div>

              {/* Simulated Code & Agent Execution Stream */}
              <div className="mt-4 space-y-3 font-mono-g text-xs">
                {/* File Header */}
                <div className="flex items-center justify-between text-white/40 text-[11px]">
                  <span>swarm_orchestrator.py</span>
                  <span>Python 3.11 &bull; LangGraph</span>
                </div>

                {/* Code Snippet Box */}
                <div className="rounded-xl border border-white/10 bg-black/60 p-3.5 text-white/80 leading-relaxed overflow-x-auto text-[11px]">
                  <div><span className="text-purple-400">from</span> langgraph.graph <span className="text-purple-400">import</span> StateGraph, END</div>
                  <div><span className="text-purple-400">from</span> tagverse.agents <span className="text-purple-400">import</span> ResearchAgent, CoderAgent</div>
                  <div className="mt-2 text-white/40"># Initialize multi-agent builder pipeline</div>
                  <div>workflow = StateGraph(ProjectState)</div>
                  <div>workflow.add_node(<span className="text-emerald-400">&quot;researcher&quot;</span>, ResearchAgent.run)</div>
                  <div>workflow.add_node(<span className="text-emerald-400">&quot;engineer&quot;</span>, CoderAgent.execute)</div>
                  <div>workflow.add_conditional_edges(<span className="text-emerald-400">&quot;engineer&quot;</span>, verify_quality)</div>
                </div>

                {/* Build Status Card */}
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400">
                  <div className="flex items-center justify-between font-bold">
                    <span>✓ Build Passed &bull; Capstone Milestone 3</span>
                    <span className="text-[10px] font-mono-g text-emerald-400/80">Latency: 340ms</span>
                  </div>
                  <p className="mt-1 text-[11px] text-emerald-400/80 font-normal">
                    Agent swarm successfully synthesized verified market brief &amp; committed to GitHub.
                  </p>
                </div>

                {/* Practical Metrics Pill Bar */}
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-white/70">
                  <div className="rounded-lg border border-white/5 bg-white/5 p-2">
                    <div className="font-bold text-white">100%</div>
                    <div className="text-white/40">Hands-on Code</div>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-white/5 p-2">
                    <div className="font-bold text-white">1-on-1</div>
                    <div className="text-white/40">Mentor Reviews</div>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-white/5 p-2">
                    <div className="font-bold text-white">Verifiable</div>
                    <div className="text-white/40">GitHub Portfolio</div>
                  </div>
                </div>
              </div>

              {/* Terminal Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] font-mono-g text-white/50">
                <span>No Artificial Toy Models</span>
                <span>Production Deployment Focus</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
