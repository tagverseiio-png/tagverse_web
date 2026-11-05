import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQAccordion from "@/components/FAQAccordion";
import Reveal from "@/components/Reveal";
import VyraHeroCta from "@/components/vyra/VyraHeroCta";
import VyraCapabilitiesShowcase from "@/components/vyra/VyraCapabilitiesShowcase";
import VyraVoiceAgentShowcase from "@/components/vyra/VyraVoiceAgentShowcase";
import VyraPricingSection from "@/components/vyra/VyraPricingSection";
import VyraTrialCtaBanner from "@/components/vyra/VyraTrialCtaBanner";

export const metadata: Metadata = {
  title: "VYRA CRM — One Intelligent Platform. Complete Business Control. | TAGVERSE",
  description:
    "Manage your customers, sales, projects, employees, marketing, finance and business operations from one intelligent platform. Powered by TAGVERSE with 30-day free trial.",
  keywords: [
    "VYRA CRM",
    "TAGVERSE CRM",
    "Enterprise CRM",
    "WhatsApp CRM",
    "Sales Pipeline Automation",
    "GST Invoicing Software",
    "AI Voice Agents CRM",
    "Business Management Platform",
    "Small Business ERP",
  ],
  openGraph: {
    title: "VYRA CRM — One Intelligent Platform. Complete Business Control.",
    description:
      "Manage your customers, sales, projects, employees, marketing, finance and business operations from one intelligent platform. Powered by TAGVERSE.",
    url: "https://www.t4gverse.com/products/vyra-crm",
    siteName: "Tagverse",
    images: [
      {
        url: "/assets/images/insights/smart-suggestion-layer-1.webp",
        width: 1200,
        height: 630,
        alt: "VYRA CRM — One Intelligent Platform. Complete Business Control.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VYRA CRM — One Intelligent Platform. Complete Business Control.",
    description:
      "Manage your customers, sales, projects, employees, marketing, finance and business operations from one intelligent platform.",
    images: ["/assets/images/insights/smart-suggestion-layer-1.webp"],
  },
  alternates: {
    canonical: "https://www.t4gverse.com/products/vyra-crm",
  },
};

const VYRA_FAQS = [
  {
    question: "How does the 30-day free trial work?",
    answer:
      "Every new account receives an unrestricted 30-day free trial across all 12 modules on the Starter, Growth, or Business plan. No credit card is required to begin. During your trial, our team provides complimentary onboarding and data migration assistance from your existing spreadsheets or CRM.",
  },
  {
    question: "Can we import existing customer data from HubSpot, Salesforce, or Excel?",
    answer:
      "Yes. VYRA CRM provides automated 1-click CSV/Excel import tools with smart column mapping for contacts, companies, deals, products, and historical notes. Our enterprise migration team can also connect directly to your legacy databases or CRM APIs.",
  },
  {
    question: "How does the official WhatsApp Cloud API integration work?",
    answer:
      "VYRA connects directly to Meta's official WhatsApp Cloud API. You can either onboard your existing corporate business number or provision a new virtual sales hotline. It provides a shared 2-way team inbox, pre-approved message templates, automated drip sequences, and audio note transcription.",
  },
  {
    question: "Can we add the VYRA AI Voice Agent to our existing plan?",
    answer:
      "Yes! The VYRA AI Voice Agent is fully compatible across all plans. You can provision inbound call reception, outbound prospecting, or callback recovery with pay-as-you-go speech minutes or custom carrier SIP trunking (Exotel, Plivo, Twilio).",
  },
  {
    question: "Is VYRA CRM GST-compliant in India?",
    answer:
      "Yes. VYRA Finance & Billing natively calculates CGST, SGST, and IGST, generates GST-compliant PDF invoices with SAC/HSN codes, creates E-Way bills, and supports direct payment link reconciliation through Razorpay, Cashfree, and UPI QR codes.",
  },
  {
    question: "Can we host VYRA on our own private cloud or dedicated VPC?",
    answer:
      "Enterprise plan subscribers can choose between our SOC-2 compliant multi-tenant cloud or a dedicated private VPC instance (AWS, GCP, Azure) with custom data residency, single sign-on (SSO), and tailored security audit logs.",
  },
];

export default function VyraCrmPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "VYRA CRM",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, Cloud, iOS, Android",
        description:
          "Manage your customers, sales, projects, employees, marketing, finance and business operations from one intelligent platform. Powered by TAGVERSE.",
        provider: {
          "@type": "Organization",
          name: "TAGVERSE",
          url: "https://www.t4gverse.com",
        },
        offers: [
          {
            "@type": "Offer",
            name: "Starter Plan",
            price: "999",
            priceCurrency: "INR",
            priceValidUntil: "2027-12-31",
          },
          {
            "@type": "Offer",
            name: "Growth Plan",
            price: "2499",
            priceCurrency: "INR",
            priceValidUntil: "2027-12-31",
          },
          {
            "@type": "Offer",
            name: "Business Plan",
            price: "4999",
            priceCurrency: "INR",
            priceValidUntil: "2027-12-31",
          },
        ],
      },
      {
        "@type": "Product",
        name: "VYRA CRM",
        brand: {
          "@type": "Brand",
          name: "TAGVERSE",
        },
        category: "CRM & Enterprise Operations Software",
        image: "https://www.t4gverse.com/assets/images/insights/smart-suggestion-layer-1.webp",
        description:
          "One Intelligent Platform. Complete Business Control. Manage customers, sales pipelines, projects, staff, marketing, and finance.",
      },
    ],
  };

  return (
    <main className="academy-theme dark-adaptive min-h-screen bg-[#fcfcfd] text-[#0f172a] dark:bg-black dark:text-white selection:bg-purple-500/20 transition-colors duration-200">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Top Breadcrumb Nav */}
      <div className="container-x pt-24 sm:pt-28">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "VYRA CRM" },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pb-20 pt-8 sm:pb-28 sm:pt-12">
        {/* Background Ambient Glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 h-[500px] w-[800px] rounded-full bg-gradient-to-tr from-[var(--accent-purple-soft)]/20 via-blue-500/10 to-transparent blur-[120px]" />

        <div className="container-x relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Left Content */}
            <div>
              {/* Powered by Tagverse Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono-g text-[11px] font-medium uppercase tracking-wider text-white/90">
                  Powered by TAGVERSE
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.2 font-mono-g text-[10px] text-emerald-400 border border-emerald-500/30">
                  Live Platform
                </span>
              </div>

              {/* Title & Tagline */}
              <h1 className="mt-6 font-brand text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.08]">
                VYRA CRM
              </h1>
              <p className="mt-3 font-brand text-xl sm:text-2xl font-normal text-white/90">
                One Intelligent Platform. Complete Business Control.
              </p>

              {/* Subtitle */}
              <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-white/60">
                Manage your customers, sales, projects, employees, marketing, finance and business operations from one intelligent platform.
              </p>

              {/* Action Buttons */}
              <VyraHeroCta />

              {/* Metric Highlights Pill Group */}
              <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4">
                <div>
                  <div className="font-brand text-2xl font-bold tracking-tight text-white">&lt; 10s</div>
                  <div className="mt-0.5 text-xs text-white/50">Lead Response Velocity</div>
                </div>
                <div>
                  <div className="font-brand text-2xl font-bold tracking-tight text-white">12 Hubs</div>
                  <div className="mt-0.5 text-xs text-white/50">Unified Operations</div>
                </div>
                <div>
                  <div className="font-brand text-2xl font-bold tracking-tight text-white">+38%</div>
                  <div className="mt-0.5 text-xs text-white/50">Average Close Rate Lift</div>
                </div>
                <div>
                  <div className="font-brand text-2xl font-bold tracking-tight text-emerald-400">30 Days</div>
                  <div className="mt-0.5 text-xs text-white/50">Full Free Trial</div>
                </div>
              </div>
            </div>

            {/* Right: Glassmorphic UI Preview */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-4 sm:p-6 backdrop-blur-2xl shadow-2xl">
                {/* Window Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                    <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono-g text-[11px] text-white/50">
                      vyra.t4gverse.com/dashboard
                    </span>
                  </div>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono-g text-[10px] text-white/70">
                    Unified Command
                  </span>
                </div>

                {/* Simulated CRM Preview Cards */}
                <div className="mt-5 space-y-4">
                  {/* Lead Notification Banner */}
                  <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                        ✓
                      </span>
                      <span><strong>New High-Intent Lead:</strong> Enterprise Retainer Request ($4,500/mo)</span>
                    </div>
                    <span className="font-mono-g text-[10px] text-emerald-400/80">Just now</span>
                  </div>

                  {/* 3 Active Pipeline Columns Preview */}
                  <div className="grid grid-cols-3 gap-3 font-mono-g text-[11px]">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Inbound (WhatsApp)</div>
                      <div className="mt-2 text-sm font-bold text-white">₹18.4L</div>
                      <div className="mt-1 text-[10px] text-emerald-400">24 active leads</div>
                    </div>
                    <div className="rounded-xl border border-[var(--accent-purple-soft)]/30 bg-[var(--accent-purple-soft)]/10 p-3">
                      <div className="text-[10px] uppercase tracking-wider text-[var(--accent-purple-soft)]">Proposal Sent</div>
                      <div className="mt-2 text-sm font-bold text-white">₹32.8L</div>
                      <div className="mt-1 text-[10px] text-white/60">8 negotiations</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Closed Won</div>
                      <div className="mt-2 text-sm font-bold text-emerald-400">₹64.2L</div>
                      <div className="mt-1 text-[10px] text-white/60">This month</div>
                    </div>
                  </div>

                  {/* Operational Modules Bar */}
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/80 font-medium">Active Operations Status</span>
                      <span className="font-mono-g text-[10px] text-emerald-400">All 12 Modules Synchronized</span>
                    </div>
                    <div className="mt-3 grid grid-cols-4 gap-2 text-center font-mono-g text-[10px] text-white/60">
                      <div className="rounded bg-black/40 py-1.5 border border-white/5">Projects: 18</div>
                      <div className="rounded bg-black/40 py-1.5 border border-white/5">Staff: 42</div>
                      <div className="rounded bg-black/40 py-1.5 border border-white/5">GST Bills: ₹4.8L</div>
                      <div className="rounded bg-black/40 py-1.5 border border-white/5">Voice AI: Active</div>
                    </div>
                  </div>
                </div>

                {/* Footer status */}
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] font-mono-g text-white/50">
                  <span>99.9% Uptime Guarantee</span>
                  <span>AES-256 Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: All 12 Capabilities Showcase */}
      <Reveal>
        <VyraCapabilitiesShowcase />
      </Reveal>

      {/* Section 4: VYRA AI Voice Agent Showcase */}
      <Reveal>
        <VyraVoiceAgentShowcase />
      </Reveal>

      {/* Section 5: Centrally Configured Pricing Section */}
      <Reveal>
        <VyraPricingSection />
      </Reveal>

      {/* Section 6: Security, Compliance & Enterprise Readiness */}
      <section className="relative py-20 border-t border-white/10 bg-black">
        <div className="container-x">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-white/80 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Enterprise Grade Trust</span>
            </div>
            <h2 className="mt-4 font-brand text-2xl sm:text-3xl font-medium tracking-tight text-white">
              Built for Security, Compliance & Scale
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Your organizational data is shielded by bank-grade security protocols, Indian statutory compliance, and resilient multi-region infrastructure.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
              <div className="font-mono-g text-xs text-[var(--accent-purple-soft)]">DATA PRIVACY</div>
              <h3 className="mt-2 font-brand text-base text-white">SOC-2 Type II Ready</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/60">
                End-to-end TLS 1.3 encryption in transit, AES-256 encryption at rest, and strict multi-tenant data isolation.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
              <div className="font-mono-g text-xs text-emerald-400">TAX COMPLIANCE</div>
              <h3 className="mt-2 font-brand text-base text-white">GST & E-Way Bill Ready</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/60">
                Automated CGST/SGST/IGST calculations, HSN/SAC master support, and instant government-compliant PDF invoices.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
              <div className="font-mono-g text-xs text-blue-400">INFRASTRUCTURE</div>
              <h3 className="mt-2 font-brand text-base text-white">Dedicated VPC Deployment</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/60">
                Deploy on our managed cloud or spin up a dedicated instance within your private AWS, GCP, or Azure VPC.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
              <div className="font-mono-g text-xs text-amber-400">UPTIME SLA</div>
              <h3 className="mt-2 font-brand text-base text-white">99.95% Availability SLA</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/60">
                Guaranteed high availability with automated multi-zone failovers, hourly backups, and dedicated technical support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <Reveal>
        <section className="py-20 border-t border-white/10">
          <div className="container-x max-w-4xl">
            <FAQAccordion
              faqs={VYRA_FAQS}
              title="Frequently Asked Questions about VYRA CRM"
              subtitle="Everything you need to know about the 30-day trial, migration, WhatsApp Cloud API, and AI voice integration."
            />
          </div>
        </section>
      </Reveal>

      {/* Section 8: Related Products in TAGVERSE Suite */}
      <section className="py-16 border-t border-white/10 bg-white/[0.01]">
        <div className="container-x">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="font-mono-g text-xs uppercase tracking-wider text-white/50">
              TAGVERSE Ecosystem Integrations
            </span>
            <Link
              href="/products"
              className="text-xs font-medium text-[var(--accent-purple-soft)] hover:underline"
            >
              View All Products &rarr;
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/products/ai-voice-agents"
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-white/20 hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <span className="font-brand text-sm font-medium text-white group-hover:text-[var(--accent-purple-soft)]">
                  TAGVERSE AI Voice Agents
                </span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-mono-g text-emerald-400">
                  Live
                </span>
              </div>
              <p className="mt-2 text-xs text-white/50 line-clamp-2">
                24/7 intelligent inbound, outbound, and callback voice automation natively synced with VYRA.
              </p>
            </Link>

            <Link
              href="/products/tagverse-ai"
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-white/20 hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <span className="font-brand text-sm font-medium text-white group-hover:text-[var(--accent-purple-soft)]">
                  TAGVERSE AI
                </span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-mono-g text-emerald-400">
                  Live
                </span>
              </div>
              <p className="mt-2 text-xs text-white/50 line-clamp-2">
                Custom enterprise AI assistants, RAG knowledge bases, and autonomous workflow bots.
              </p>
            </Link>

            <Link
              href="/products/neuro-forge"
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-white/20 hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <span className="font-brand text-sm font-medium text-white group-hover:text-[var(--accent-purple-soft)]">
                  Neuro Forge
                </span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-mono-g text-emerald-400">
                  Live
                </span>
              </div>
              <p className="mt-2 text-xs text-white/50 line-clamp-2">
                Autonomous multi-agent intelligence studio for trend modeling and market research.
              </p>
            </Link>

            <Link
              href="/services/workflow-automation"
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-white/20 hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <span className="font-brand text-sm font-medium text-white group-hover:text-[var(--accent-purple-soft)]">
                  Workflow Automation
                </span>
                <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-mono-g text-white/70">
                  Service
                </span>
              </div>
              <p className="mt-2 text-xs text-white/50 line-clamp-2">
                Custom n8n, Zapier, webhook, and enterprise API integrations delivered by TAGVERSE engineers.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 9: Free Trial Conversion CTA Banner */}
      <Reveal>
        <VyraTrialCtaBanner />
      </Reveal>
    </main>
  );
}
