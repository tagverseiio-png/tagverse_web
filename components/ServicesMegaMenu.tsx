"use client";

import Link from "next/link";
import { TAGVERSE_SERVICES } from "@/lib/defaultData";

interface ServicesMegaMenuProps {
  onClose: () => void;
}

const serviceIdToSlug: Record<string, string> = {
  "digital-marketing": "digital-marketing",
  "performance-ads": "performance-marketing",
  "brand-identity": "branding-design",
  "web-app-dev": "web-development",
  "ai-agents-llm": "ai-agents-llm",
  "n8n-webhooks": "workflow-automation",
  "whatsapp-chatbots": "whatsapp-automation",
  "seo-aeo-geo": "seo-aeo-geo",
  "video-podcast-studio": "video-podcast-production",
  "influencer-management": "influencer-management",
};

export default function ServicesMegaMenu({ onClose }: ServicesMegaMenuProps) {
  // Service column groupings
  const digitalGrowthServices = TAGVERSE_SERVICES.filter((s) =>
    ["digital-marketing", "performance-ads", "brand-identity", "seo-aeo-geo"].includes(s.id)
  );

  const techAutomationServices = TAGVERSE_SERVICES.filter((s) =>
    ["web-app-dev", "ai-agents-llm", "n8n-webhooks", "whatsapp-chatbots"].includes(s.id)
  );

  const creativeMediaServices = TAGVERSE_SERVICES.filter((s) =>
    ["video-podcast-studio", "influencer-management"].includes(s.id)
  );

  return (
    <div
      className="w-full rounded-[28px] border border-white/10 bg-black/95 p-6 text-white shadow-2xl backdrop-blur-2xl md:p-8"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.25fr_1.1fr_1.1fr_1.1fr]">
        {/* Column 1: Featured Service Card */}
        <div className="flex flex-col justify-between overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent p-6">
          <div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] border border-white/10 bg-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/insights/smart-suggestion-layer-1.webp"
                alt="AI-Powered Digital Growth"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 font-mono-g text-[10px] uppercase tracking-wider text-[var(--accent-purple-soft)] backdrop-blur-md">
                  Featured Service
                </span>
              </div>
            </div>

            <h3 className="mt-5 font-brand text-xl font-medium tracking-tight text-white">
              AI-Powered Digital Growth
            </h3>
            <p className="mt-2 text-xs leading-5 text-white/60">
              End-to-end strategy, technology, automation, and creative execution designed to accelerate ambitious brands.
            </p>
          </div>

          <div className="mt-6 border-t border-white/10 pt-4">
            <Link
              href="/services"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-purple-soft)] transition-colors hover:text-white"
            >
              <span>Explore All Services</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Column 2: Digital & Growth */}
        <div className="flex flex-col">
          <div className="border-b border-white/10 pb-2.5">
            <h4 className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-white/40">
              Digital & Growth
            </h4>
          </div>
          <div className="mt-3 space-y-1">
            {digitalGrowthServices.map((s) => (
              <Link
                key={s.id}
                href={`/services/${serviceIdToSlug[s.id] || s.id}`}
                onClick={onClose}
                className="group block rounded-xl p-2.5 transition-colors hover:bg-white/5"
              >
                <div className="text-[13px] font-medium text-white/90 group-hover:text-white">
                  {s.title}
                </div>
                <div className="mt-0.5 line-clamp-1 text-[11px] leading-4 text-white/50 group-hover:text-white/70">
                  {s.points[0]} &bull; {s.points[1]}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3: Technology & Automation */}
        <div className="flex flex-col">
          <div className="border-b border-white/10 pb-2.5">
            <h4 className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-white/40">
              Technology & Automation
            </h4>
          </div>
          <div className="mt-3 space-y-1">
            {techAutomationServices.map((s) => (
              <Link
                key={s.id}
                href={`/services/${serviceIdToSlug[s.id] || s.id}`}
                onClick={onClose}
                className="group block rounded-xl p-2.5 transition-colors hover:bg-white/5"
              >
                <div className="text-[13px] font-medium text-white/90 group-hover:text-white">
                  {s.title}
                </div>
                <div className="mt-0.5 line-clamp-1 text-[11px] leading-4 text-white/50 group-hover:text-white/70">
                  {s.points[0]} &bull; {s.points[1]}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Column 4: Creative & Media */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="border-b border-white/10 pb-2.5">
              <h4 className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-white/40">
                Creative & Media
              </h4>
            </div>
            <div className="mt-3 space-y-1">
              {creativeMediaServices.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${serviceIdToSlug[s.id] || s.id}`}
                  onClick={onClose}
                  className="group block rounded-xl p-2.5 transition-colors hover:bg-white/5"
                >
                  <div className="text-[13px] font-medium text-white/90 group-hover:text-white">
                    {s.title}
                  </div>
                  <div className="mt-0.5 line-clamp-1 text-[11px] leading-4 text-white/50 group-hover:text-white/70">
                    {s.points[0]} &bull; {s.points[1]}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="font-mono-g text-[10px] uppercase tracking-wider text-white/40">
              Need a full-service partner?
            </p>
            <p className="mt-1 text-xs text-white/75">
              From branding to custom AI agents, we handle your entire growth stack.
            </p>
            <Link
              href="/services"
              onClick={onClose}
              className="mt-3 inline-flex items-center gap-1.5 font-mono-g text-[11px] font-medium text-white hover:underline"
            >
              <span>View All 10 Services</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
