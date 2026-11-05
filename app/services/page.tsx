import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { TAGVERSE_SERVICES } from "@/lib/defaultData";

export const metadata: Metadata = {
  title: "Services — Tagverse | AI, Ads, Branding & Full-Stack Creative Agency",
  description:
    "Professional client services from Tagverse — digital marketing, performance advertising, brand identity, custom web & app development, AI agents, n8n workflow automation, WhatsApp chatbots, SEO/AEO/GEO, video production, and creator management.",
  keywords: [
    "social media management",
    "AI marketing automation",
    "web development services",
    "brand strategy agency",
    "paid media management",
    "Meta Ads agency",
    "Google Ads management",
    "YouTube Ads agency",
    "LinkedIn Ads agency",
    "SaaS development",
    "CRM ERP development",
    "AI agents LLM",
    "n8n automation",
    "WhatsApp automation",
    "SEO AEO GEO optimization",
    "podcast production Chennai",
    "video marketing",
    "influencer management",
    "Strucureo services",
  ],
  openGraph: {
    title: "Services — Tagverse | AI, Ads, Web, SaaS & Creative Studio",
    description:
      "Full-stack creative services from Tagverse — social media, performance ads, AI agents, n8n automation, web & SaaS, and video production.",
    url: "https://www.t4gverse.com/services",
    siteName: "Tagverse",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Tagverse",
    description:
      "Full-stack creative and growth services from an AI-first studio.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: TAGVERSE_SERVICES.map((s, idx) => ({
    "@type": "Service",
    position: idx + 1,
    name: s.title,
    description: s.body,
    provider: {
      "@type": "Organization",
      name: "Tagverse",
      url: "https://www.t4gverse.com",
    },
  })),
};

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

export default function ServicesPage() {
  return (
    <main className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <PageHero
        eyebrow="Services"
        title="What we do."
        subtitle="An AI-first creative studio that handles everything your brand needs — from strategy to screen to scale."
      />

      <section className="bg-white dark:bg-black py-20 md:py-28 transition-colors duration-200">
        <div className="container-x">
          <div className="grid gap-5 md:grid-cols-2">
            {TAGVERSE_SERVICES.map((s, i) => (
              <Reveal
                key={s.n}
                delay={(i % 2) * 90}
                id={s.id}
                className="scroll-mt-28 flex flex-col justify-between rounded-[20px] border border-line bg-surface p-8 transition-shadow hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)]"
              >
                <div>
                  <span className="font-mono-g text-sm text-muted-fg">{s.n}</span>
                  <h3 className="mt-4 font-brand text-2xl font-medium tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 leading-7 text-muted-fg">{s.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="rounded-full border border-line bg-white px-3 py-1 text-sm text-fg"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-line/60 pt-4">
                  <Link
                    href={`/services/${serviceIdToSlug[s.id] || s.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-black transition-opacity hover:opacity-75"
                  >
                    <span>Explore Deliverables & Scope</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                  <span className="font-mono-g text-[11px] text-muted-fg">
                    TAGVERSE Spec
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[24px] bg-black p-10 text-white md:flex-row md:items-center md:p-12">
            <div>
              <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-tight tracking-display">
                Have a project in mind?
              </h3>
              <p className="mt-3 max-w-md text-white/60">
                Tell us what you&apos;re building and we&apos;ll put a plan
                together.
              </p>
            </div>
            <a
              href="/#contact"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
            >
              Start a project
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
