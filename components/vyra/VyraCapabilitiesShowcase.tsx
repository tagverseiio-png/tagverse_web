"use client";

import { useState } from "react";
import { VYRA_CAPABILITIES, VyraCapability } from "@/lib/vyraCapabilitiesData";

const DOMAIN_TABS = [
  { id: "all", label: "All 12 Modules" },
  { id: "growth", label: "Sales & Growth" },
  { id: "operations", label: "Operations & People" },
  { id: "finance", label: "Finance & Products" },
  { id: "enterprise", label: "Enterprise & Security" },
] as const;

export default function VyraCapabilitiesShowcase() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filtered =
    activeTab === "all"
      ? VYRA_CAPABILITIES
      : VYRA_CAPABILITIES.filter((c) => c.domain === activeTab);

  return (
    <section id="capabilities" className="relative scroll-mt-24 py-20 border-t border-white/10">
      <div className="container-x">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-white/80 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Complete Product Specification</span>
          </div>
          <h2 className="mt-4 font-brand text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white">
            12 Integrated Hubs. One Single Source of Truth.
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/60">
            Every business system you need to run high-velocity operations, manage revenue, govern teams, and protect sensitive assets without paying for dozens of disconnected SaaS subscriptions.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {DOMAIN_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-2 font-mono-g text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
              {tab.id === "all" && (
                <span className="ml-1.5 rounded-full bg-black/20 px-1.5 py-0.2 text-[10px]">
                  12
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Capabilities Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <CapabilityCard key={item.id} capability={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({ capability }: { capability: VyraCapability }) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="font-mono-g text-xs tracking-widest text-[var(--accent-purple-soft)]">
            MODULE • {capability.number}
          </span>
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono-g text-[10px] text-emerald-400">
            <span className="font-bold">{capability.highlightMetric.value}</span>
            <span className="text-emerald-400/70">{capability.highlightMetric.label}</span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="mt-4 font-brand text-lg sm:text-xl font-medium tracking-tight text-white group-hover:text-white">
          {capability.title}
        </h3>
        <p className="mt-1 text-xs font-medium text-white/80">
          {capability.tagline}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-white/60">
          {capability.overview}
        </p>

        {/* Key Features Bullet List */}
        <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
          <div className="font-mono-g text-[10px] uppercase tracking-wider text-white/40">
            Core Capabilities
          </div>
          <ul className="space-y-2 text-xs text-white/75">
            {capability.keyFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/80">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="leading-snug">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tech Specs Tags */}
      <div className="mt-6 border-t border-white/10 pt-4">
        <div className="flex flex-wrap gap-1.5">
          {capability.specs.map((spec, idx) => (
            <span
              key={idx}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono-g text-[10px] text-white/60"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
