import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { DEFAULT_PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/defaultData";

export const metadata: Metadata = {
  title: "Products — Tagverse | Software Platforms & Enterprise SaaS",
  description:
    "Explore proprietary software platforms and solutions built by TAGVERSE — including VYRA CRM, TAGVERSE Virtual Office, Neuro Forge AI, enterprise ERP, and billing engines.",
  keywords: [
    "TAGVERSE products",
    "VYRA CRM",
    "TAGVERSE Virtual Office",
    "Neuro Forge AI",
    "CRM software India",
    "ERP software Chennai",
    "automated billing software",
    "LMS platform",
    "custom SaaS platforms",
    "Strucureo software",
  ],
  openGraph: {
    title: "Products — Tagverse | Software Platforms & Enterprise SaaS",
    description:
      "Proprietary software products and enterprise SaaS built by TAGVERSE: VYRA CRM, Virtual Office, Neuro Forge, ERP, and Billing engines.",
    url: "https://www.t4gverse.com/products",
    siteName: "Tagverse",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products — Tagverse",
    description: "Enterprise software platforms and custom SaaS solutions by TAGVERSE.",
  },
};

const categoryToSlug: Record<string, string> = {
  "CRM Software": "crm",
  "ERP Software": "erp",
  "Billing & Invoicing Software": "billing",
  "Learning Management Systems (LMS)": "lms",
  "Custom SaaS Platforms": "custom-saas",
};

const productIdToSlug: Record<string, string> = {
  "prod-vyra-crm": "vyra-crm",
  "prod-virtual-office": "tagverse-virtual-office",
  "prod-neuro-forge": "neuro-forge",
  "prod-tagverse-erp": "tagverse-enterprise-erp",
  "prod-tagverse-billing": "tagverse-billing-engine",
  "prod-tagverse-lms": "tagverse-lms-platform",
  "prod-tagverse-ai": "tagverse-ai",
  "prod-voice-agents": "ai-voice-agents",
};

const categoryToAnchor: Record<string, string> = {
  "CRM Software": "crm",
  "ERP Software": "erp",
  "Billing & Invoicing Software": "billing",
  "Learning Management Systems (LMS)": "lms",
  "Custom SaaS Platforms": "saas",
};

const categoryDescriptions: Record<string, string> = {
  "CRM Software": "High-velocity pipeline management, lead scoring, and automated omnichannel follow-ups.",
  "ERP Software": "Centralized inventory, procurement workflows, and integrated enterprise resource operations.",
  "Billing & Invoicing Software": "GST-compliant recurring subscription invoicing, payment reminders, and financial reconciliation.",
  "Learning Management Systems (LMS)": "Interactive creator academies, cohort courses, assignments, and certification engines.",
  "Custom SaaS Platforms": "Tailored multi-tenant web applications, digital virtual offices, and predictive AI intelligence tools.",
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: DEFAULT_PRODUCTS.map((p, idx) => ({
    "@type": "SoftwareApplication",
    position: idx + 1,
    name: p.name,
    description: p.description,
    applicationCategory: p.category,
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    provider: {
      "@type": "Organization",
      name: "Tagverse",
      url: "https://www.t4gverse.com",
    },
  })),
};

export default function ProductsPage() {
  return (
    <main className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <PageHero
        eyebrow="Products & Software"
        title="Proprietary software built to scale."
        subtitle="Explore enterprise-grade CRM, ERP, billing engines, learning systems, and custom SaaS platforms built by the TAGVERSE engineering team."
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container-x">
          {/* Category anchor bar */}
          <div className="mb-14 flex flex-wrap items-center gap-2 border-b border-line pb-6">
            <span className="mr-2 font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-muted-fg">
              Categories:
            </span>
            {PRODUCT_CATEGORIES.map((cat) => (
              <a
                key={cat}
                href={`#${categoryToAnchor[cat] || "products"}`}
                className="rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-medium text-fg transition-colors hover:border-black hover:bg-black hover:text-white"
              >
                {cat}
              </a>
            ))}
          </div>

          {/* Grouped Products by Category */}
          <div className="space-y-20">
            {PRODUCT_CATEGORIES.map((cat) => {
              const catProducts = DEFAULT_PRODUCTS.filter((p) => p.category === cat);
              const anchor = categoryToAnchor[cat] || "products";

              return (
                <div key={cat} id={anchor} className="scroll-mt-28">
                  <div className="flex flex-col justify-between gap-2 border-b border-line pb-5 sm:flex-row sm:items-baseline">
                    <div>
                      <h2 className="font-brand text-2xl font-medium tracking-tight md:text-3xl">
                        <Link href={`/products/category/${categoryToSlug[cat] || anchor}`} className="hover:underline">
                          {cat}
                        </Link>
                      </h2>
                      <p className="mt-1 max-w-xl text-sm text-muted-fg">
                        {categoryDescriptions[cat]}
                      </p>
                    </div>
                    <Link
                      href={`/products/category/${categoryToSlug[cat] || anchor}`}
                      className="font-mono-g text-xs font-medium text-black hover:underline"
                    >
                      View Category Suite ({catProducts.length}) &rarr;
                    </Link>
                  </div>

                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    {catProducts.map((p, i) => (
                      <Reveal
                        key={p.id}
                        delay={(i % 2) * 90}
                        className="flex flex-col justify-between rounded-[20px] border border-line bg-surface p-7 sm:p-8 transition-shadow hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)]"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-3">
                            <span className="rounded-full border border-line bg-white px-3 py-0.5 font-mono-g text-[0.65rem] uppercase tracking-wider text-muted-fg">
                              {p.category}
                            </span>
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide ${
                                p.status === "live"
                                    ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                                  : p.status === "prototype"
                                  ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                                  : "bg-purple-500/10 text-purple-600 border border-purple-500/20"
                              }`}
                            >
                              {p.status === "live"
                                ? "● Live Product"
                                : p.status === "prototype"
                                ? "▲ Beta / Prototype"
                                : "○ Upcoming"}
                            </span>
                          </div>

                          <h3 className="mt-4 font-brand text-2xl font-medium tracking-tight">
                            <Link href={`/products/${productIdToSlug[p.id] || p.id}`} className="hover:underline">
                              {p.name}
                            </Link>
                          </h3>
                          <p className="mt-2 text-sm font-medium text-fg/80">
                            {p.tagline}
                          </p>
                          <p className="mt-3 text-sm leading-6 text-muted-fg">
                            {p.description}
                          </p>

                          {/* Features */}
                          <div className="mt-6 flex flex-wrap gap-2">
                            {p.features.map((f) => (
                              <span
                                key={f}
                                className="rounded-full border border-line bg-white px-3 py-1 text-xs text-fg/90"
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* CTA Footer */}
                        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-5">
                          <Link
                            href={`/products/${productIdToSlug[p.id] || p.id}`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-black transition-opacity hover:opacity-75"
                          >
                            <span>Explore Product & Specs</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </Link>
                          <a
                            href="/#contact"
                            className="rounded-full border border-line bg-white px-3 py-1 font-mono-g text-[11px] text-muted-fg transition-colors hover:border-black hover:text-black"
                          >
                            Request Demo &rarr;
                          </a>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Enterprise CTA */}
          <Reveal className="mt-20 flex flex-col items-start justify-between gap-6 rounded-[24px] bg-black p-10 text-white md:flex-row md:items-center md:p-12">
            <div>
              <p className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-white/50">
                Custom Engineering
              </p>
              <h3 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-tight tracking-display">
                Need a custom software platform?
              </h3>
              <p className="mt-3 max-w-md text-white/60">
                We engineer scalable SaaS platforms, internal ERPs, and custom CRM systems from architecture to cloud deployment.
              </p>
            </div>
            <a
              href="/#contact"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
            >
              Consult Our Engineers
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
