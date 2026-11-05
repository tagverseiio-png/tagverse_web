import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import DetailCTABanner from "@/components/DetailCTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import Reveal from "@/components/Reveal";
import VoiceAgentConfigurator from "@/components/VoiceAgentConfigurator";
import VoiceArchitectureDiagram from "@/components/VoiceArchitectureDiagram";
import VoiceDashboardPreview from "@/components/VoiceDashboardPreview";
import VoiceHeroCta from "./VoiceHeroCta";

export const metadata: Metadata = {
  title: "TAGVERSE AI Voice Agents — Your AI Voice Workforce. Always Available.",
  description:
    "Automate every business conversation with intelligent AI voice agents that answer calls, reach prospects, recover missed enquiries and turn conversations into business opportunities.",
  keywords: [
    "AI voice agents",
    "voice automation",
    "inbound voice AI",
    "outbound AI calling",
    "AI callback system",
    "enterprise voice bots",
    "ElevenLabs voice agent",
    "OpenAI Realtime voice",
    "Exotel AI voice",
    "Twilio AI voice agent",
    "TAGVERSE voice",
    "Chennai AI agency",
  ],
  openGraph: {
    title: "TAGVERSE AI Voice Agents — Your AI Voice Workforce. Always Available.",
    description:
      "Automate every business conversation with intelligent AI voice agents that answer calls, reach prospects, recover missed enquiries and turn conversations into business opportunities.",
    url: "https://www.t4gverse.com/products/ai-voice-agents",
    siteName: "Tagverse",
    type: "website",
    images: [
      {
        url: "/assets/images/home/poster-voice-experience.webp",
        width: 1200,
        height: 630,
        alt: "TAGVERSE AI Voice Agents Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TAGVERSE AI Voice Agents — Your AI Voice Workforce. Always Available.",
    description:
      "Automate every business conversation with intelligent AI voice agents that answer calls, reach prospects, recover missed enquiries and turn conversations into business opportunities.",
    images: ["/assets/images/home/poster-voice-experience.webp"],
  },
  alternates: {
    canonical: "https://www.t4gverse.com/products/ai-voice-agents",
  },
};

const voiceProductSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "TAGVERSE AI Voice Agents",
  headline: "Your AI Voice Workforce. Always Available.",
  description:
    "Automate every business conversation with intelligent AI voice agents that answer calls, reach prospects, recover missed enquiries and turn conversations into business opportunities.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Cloud, Web, Telephony SIP",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
  },
  provider: {
    "@type": "Organization",
    name: "Tagverse",
    url: "https://www.t4gverse.com",
    logo: "https://www.t4gverse.com/assets/images/logo.png",
  },
};

const VOICE_FAQS = [
  {
    question: "How human does the AI Voice Agent sound during actual calls?",
    answer:
      "Our agents sound remarkably natural. Powered by state-of-the-art neural speech synthesizers (ElevenLabs and OpenAI Realtime), they feature subtle human breathing pauses, conversational acknowledgements ('I understand', 'sure thing', 'absolutely'), and handle interruptions smoothly without talking over the customer.",
  },
  {
    question: "What is the voice response latency during a live conversation?",
    answer:
      "Average speech-to-speech turnaround is under 400 milliseconds over standard telephony networks. This sub-second response speed feels as responsive and natural as speaking with an in-office team member.",
  },
  {
    question: "Can the AI Voice Agent transfer calls to a live human representative?",
    answer:
      "Yes. You can configure rules for live SIP transfer based on customer request, high-value deal qualification thresholds (e.g., budget > ₹5L), or complex technical questions. The transfer preserves the live transcript on the receiving representative's screen.",
  },
  {
    question: "Can we use our existing business phone numbers?",
    answer:
      "Yes. TAGVERSE integrates directly with telecom carriers including Exotel, Plivo, Twilio, and standard SIP trunks. You can forward your existing business number or provision virtual local, mobile, or toll-free numbers.",
  },
  {
    question: "What languages and Indian regional accents are supported?",
    answer:
      "We support English (with authentic Indian, US, and UK accents), Hindi, Tamil, Telugu, Spanish, French, German, and Arabic, with automatic language detection and switching.",
  },
  {
    question: "How does the AI Voice Agent integrate with our CRM and calendars?",
    answer:
      "The platform features native two-way sync with VYRA CRM, Google Calendar, and WhatsApp. Every call outcome, recording, duration, and transcript is logged instantly, while appointment invites and WhatsApp confirmations are sent automatically.",
  },
];

export default function AIVoiceAgentsPage() {
  return (
    <main className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(voiceProductSchema) }}
      />

      {/* Hero Section */}
      <section className="dark-adaptive relative overflow-hidden bg-white text-black dark:bg-black dark:text-white pb-20 pt-32 md:pb-28 md:pt-40 transition-colors duration-200">
        {/* Background glow and subtle hero texture */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/home/poster-voice-experience.webp"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10 dark:opacity-20"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white dark:from-black/60 dark:via-black/40 dark:to-black transition-colors duration-200" />

        <div className="container-x relative">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "AI Voice Agents" },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-[var(--accent-purple-soft)] backdrop-blur-md">
                    TAGVERSE ENTERPRISE SUITE • VOICE INTELLIGENCE
                  </span>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2.5 py-0.5 font-mono-g text-[10px] uppercase tracking-wider text-emerald-400">
                    ● Live Enterprise Product
                  </span>
                </div>

                <h1 className="mt-6 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1.06] tracking-display text-white">
                  Your AI Voice Workforce. Always Available.
                </h1>

                <p className="mt-6 text-lg leading-8 text-white/80 sm:text-xl">
                  Automate every business conversation with intelligent AI voice agents that answer calls, reach prospects, recover missed enquiries and turn conversations into business opportunities.
                </p>

                {/* Primary & Secondary CTAs */}
                <VoiceHeroCta />

                {/* Key Metrics */}
                <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                  <div>
                    <div className="font-brand text-2xl font-semibold text-white sm:text-3xl">
                      &lt; 400ms
                    </div>
                    <div className="mt-1 font-mono-g text-[11px] uppercase tracking-wider text-white/50">
                      Speech Latency
                    </div>
                  </div>
                  <div>
                    <div className="font-brand text-2xl font-semibold text-emerald-400 sm:text-3xl">
                      99.8%
                    </div>
                    <div className="mt-1 font-mono-g text-[11px] uppercase tracking-wider text-white/50">
                      Call Recovery Rate
                    </div>
                  </div>
                  <div>
                    <div className="font-brand text-2xl font-semibold text-[var(--accent-purple-soft)] sm:text-3xl">
                      24/7/365
                    </div>
                    <div className="mt-1 font-mono-g text-[11px] uppercase tracking-wider text-white/50">
                      Zero Wait Times
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Hero Image Card */}
            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.04] p-3 shadow-2xl backdrop-blur-xl">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-black/60">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/images/home/poster-voice-experience.webp"
                      alt="TAGVERSE AI Voice Workforce"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="rounded-xl border border-white/10 bg-black/70 p-3 backdrop-blur-md">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 font-mono-g text-xs text-white">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                            Live Telephony Stream
                          </span>
                          <span className="font-mono-g text-[10px] text-white/60">
                            Carrier: Exotel / Twilio SIP
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-white/80">
                          &ldquo;I have scheduled your technical demonstration for Thursday at 3:00 PM IST.&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Voice Agent Solutions */}
      <section id="solutions" className="scroll-mt-28 bg-white py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-muted-fg">
              Three Specialized Engines
            </span>
            <h2 className="mt-3 font-brand text-3xl font-medium tracking-tight text-fg md:text-4xl">
              Three Core Voice Agent Solutions
            </h2>
            <p className="mt-3 text-base text-muted-fg sm:text-lg">
              Engineered to handle the entire lifecycle of business telephony — from inbound resolution to outbound prospecting and instant missed enquiry recovery.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {/* Solution A: Inbound Voice Agent */}
            <Reveal
              delay={0}
              className="flex flex-col justify-between rounded-[24px] border border-line bg-surface p-8 transition-shadow hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black font-brand text-lg font-semibold text-white">
                  A
                </div>
                <h3 className="mt-6 font-brand text-2xl font-medium tracking-tight text-fg">
                  Inbound Voice Agent
                </h3>
                <p className="mt-2 text-sm font-medium text-purple-600">
                  Always-On Reception & Customer Support
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-fg">
                  Eliminate hold times and missed customer inquiries. Handle thousands of simultaneous inbound calls with natural conversational warmth and instant knowledge retrieval.
                </p>

                <div className="mt-6 border-t border-line/60 pt-6">
                  <span className="font-mono-g text-[11px] uppercase tracking-wider text-muted-fg">
                    Core Capabilities:
                  </span>
                  <ul className="mt-3 space-y-2.5">
                    {[
                      "Answer incoming calls 24/7 with zero hold times",
                      "Understand complex natural-language conversations",
                      "Respond accurately to customer questions from knowledge docs",
                      "Capture, qualify, and score incoming leads",
                      "Book appointments and demos directly into Google Calendar",
                      "Route calls seamlessly to human representatives via SIP transfer",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-fg leading-5">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Solution B: Outbound Voice Agent */}
            <Reveal
              delay={100}
              className="flex flex-col justify-between rounded-[24px] border border-line bg-surface p-8 transition-shadow hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black font-brand text-lg font-semibold text-white">
                  B
                </div>
                <h3 className="mt-6 font-brand text-2xl font-medium tracking-tight text-fg">
                  Outbound Voice Agent
                </h3>
                <p className="mt-2 text-sm font-medium text-purple-600">
                  Proactive Sales & Lead Qualification
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-fg">
                  Empower your sales pipeline with an autonomous SDR workforce. Reach qualified prospects within minutes of interest, conduct natural discovery dialogues, and schedule meetings.
                </p>

                <div className="mt-6 border-t border-line/60 pt-6">
                  <span className="font-mono-g text-[11px] uppercase tracking-wider text-muted-fg">
                    Core Capabilities:
                  </span>
                  <ul className="mt-3 space-y-2.5">
                    {[
                      "Make automated calls to qualified inbound web leads",
                      "Conduct consultative sales conversations with natural tempo",
                      "Qualify prospect budget, timeline, and company size",
                      "Explain products, enterprise services, and pricing tiers",
                      "Conduct surveys, satisfaction reviews, and engagement calls",
                      "Schedule calendar appointments and sync to CRM automatically",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-fg leading-5">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Solution C: AI Callback & Recall Agent */}
            <Reveal
              delay={200}
              className="flex flex-col justify-between rounded-[24px] border border-line bg-surface p-8 transition-shadow hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black font-brand text-lg font-semibold text-white">
                  C
                </div>
                <h3 className="mt-6 font-brand text-2xl font-medium tracking-tight text-fg">
                  AI Callback & Recall Agent
                </h3>
                <p className="mt-2 text-sm font-medium text-purple-600">
                  Missed Call Recovery & Pipeline Follow-Up
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-fg">
                  Never lose a hot lead to a dropped call. The moment a customer hangs up or submits a callback request, the AI calls them back in under 15 seconds, recovering lost revenue.
                </p>

                <div className="mt-6 border-t border-line/60 pt-6">
                  <span className="font-mono-g text-[11px] uppercase tracking-wider text-muted-fg">
                    Core Capabilities:
                  </span>
                  <ul className="mt-3 space-y-2.5">
                    {[
                      "Automatically follow up with missed calls in < 15 seconds",
                      "Call customers who submit website callback requests",
                      "Retry unanswered calls according to configurable smart rules",
                      "Re-engage inactive leads and dormant database accounts",
                      "Follow up on delivered quotations and commercial proposals",
                      "Send automated voice appointment and webinar reminders",
                      "Escalate high-intent prospects to sales representatives",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-fg leading-5">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* AI Voice Dashboard Showcase */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-muted-fg">
              Executive Telemetry
            </span>
            <h2 className="mt-3 font-brand text-3xl font-medium tracking-tight text-fg md:text-4xl">
              AI Voice Operations Dashboard
            </h2>
            <p className="mt-3 text-base text-muted-fg sm:text-lg">
              Monitor call volume, sentiment analysis, lead conversion rates, and audio recordings in real time.
            </p>
          </div>

          <div className="mt-14">
            <VoiceDashboardPreview />
          </div>
        </div>
      </section>

      {/* AI Agent Configuration Showcase */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-muted-fg">
              No-Code Customization
            </span>
            <h2 className="mt-3 font-brand text-3xl font-medium tracking-tight text-fg md:text-4xl">
              Tailor Your Voice Workforce in Minutes
            </h2>
            <p className="mt-3 text-base text-muted-fg sm:text-lg">
              Configure multiple specialized voice agents, set speaking styles, upload business documents, and define deterministic escalation guardrails.
            </p>
          </div>

          <div className="mt-14">
            <VoiceAgentConfigurator />
          </div>
        </div>
      </section>

      {/* Product Architecture */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-muted-fg">
              End-to-End Pipeline
            </span>
            <h2 className="mt-3 font-brand text-3xl font-medium tracking-tight text-fg md:text-4xl">
              Carrier-Grade Voice Architecture
            </h2>
            <p className="mt-3 text-base text-muted-fg sm:text-lg">
              How TAGVERSE orchestrates sub-second speech streaming, real-time RAG reasoning, and CRM action execution.
            </p>
          </div>

          <div className="mt-14">
            <VoiceArchitectureDiagram />
          </div>
        </div>
      </section>

      {/* Integrations Ecosystem */}
      <section className="bg-white py-20 md:py-28 border-t border-line">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-muted-fg">
              Connectivity
            </span>
            <h2 className="mt-3 font-brand text-3xl font-medium tracking-tight text-fg md:text-4xl">
              Integrates Seamlessly With Your Stack
            </h2>
            <p className="mt-3 text-base text-muted-fg">
              Connect your telephony trunks, CRMs, messaging apps, and calendar tools with zero friction.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "VYRA CRM",
                role: "Native CRM Sync",
                desc: "Auto-creates contacts, logs call duration, attaches audio recordings, transcripts, and deal scores.",
              },
              {
                name: "n8n Automation",
                role: "Workflow Orchestrator",
                desc: "Trigger custom webhook pipelines, multi-tool data syncing, and database updates upon call completion.",
              },
              {
                name: "WhatsApp Business",
                role: "Omnichannel Recaps",
                desc: "Automatically sends post-call WhatsApp confirmations, PDF brochures, and payment links.",
              },
              {
                name: "Google Calendar",
                role: "Appointment Booking",
                desc: "Real-time calendar slot checking and automated invite creation during live voice conversations.",
              },
              {
                name: "OpenAI Realtime",
                role: "Duplex Reasoning",
                desc: "Sub-second speech-to-speech cognitive engine supporting natural interruptions and topic shifts.",
              },
              {
                name: "ElevenLabs",
                role: "Neural Voice Synthesis",
                desc: "Hyper-realistic voice models with human-like breathing, warmth, and emotion control.",
              },
              {
                name: "Exotel / Plivo / Twilio",
                role: "Telephony Carrier",
                desc: "Carrier-grade SIP trunks, virtual local Indian DIDs, toll-free lines, and high-concurrency routing.",
              },
              {
                name: "Custom APIs & Webhooks",
                role: "Enterprise Extensibility",
                desc: "Secure REST webhooks with bearer tokens and HMAC signatures for private ERP and backend systems.",
              },
            ].map((integ, idx) => (
              <Reveal
                key={idx}
                delay={idx * 50}
                className="flex flex-col justify-between rounded-[20px] border border-line bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <span className="font-mono-g text-[10px] uppercase tracking-wider text-muted-fg">
                    {integ.role}
                  </span>
                  <h4 className="mt-2 font-brand text-lg font-semibold tracking-tight text-fg">
                    {integ.name}
                  </h4>
                  <p className="mt-2 text-xs leading-5 text-muted-fg">
                    {integ.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries & Use Cases */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-8 md:flex-row md:items-end">
            <div>
              <span className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-muted-fg">
                Proven Applications
              </span>
              <h2 className="mt-3 font-brand text-3xl font-medium tracking-tight text-fg md:text-4xl">
                Industries Transformed by AI Voice
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-fg">
              From real estate to clinical care, voice agents eliminate operational bottlenecks and boost revenue.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                industry: "Real Estate & Developers",
                useCase: "Instant Property Inquiries & Site Visits",
                detail:
                  "Answer buyer calls immediately, share floorplan details via WhatsApp, and book in-person site visits with sales consultants.",
              },
              {
                industry: "Healthcare & Clinics",
                useCase: "Patient Triage & Appointment Scheduling",
                detail:
                  "Handle 24/7 patient appointment bookings, doctor schedule checks, and automated prescription pickup reminders.",
              },
              {
                industry: "Education & EdTech",
                useCase: "Admissions Counseling & Cohort Enrollment",
                detail:
                  "Qualify incoming student inquiries, explain syllabus prerequisites, and book counseling calls with advisors.",
              },
              {
                industry: "E-Commerce & D2C Brands",
                useCase: "Order Status & Cart Abandonment Recall",
                detail:
                  "Resolve order tracking queries and call back abandoned checkout shoppers within 5 minutes to offer discount codes.",
              },
              {
                industry: "Financial & Insurance",
                useCase: "Policy Renewals & Lead Verification",
                detail:
                  "Conduct high-volume renewal reminder calls, verify KYC requirements, and route interested buyers to underwriting desks.",
              },
              {
                industry: "Automotive & Dealerships",
                useCase: "Test Drive Booking & Service Reminders",
                detail:
                  "Engage digital test-drive leads in under 30 seconds and send periodic car service maintenance reminder calls.",
              },
            ].map((ind, idx) => (
              <Reveal
                key={idx}
                delay={idx * 60}
                className="rounded-[22px] border border-line bg-white p-7 transition-all duration-200 hover:shadow-lg"
              >
                <span className="font-mono-g text-[10px] uppercase tracking-wider text-muted-fg">
                  {ind.industry}
                </span>
                <h4 className="mt-2 font-brand text-lg font-semibold tracking-tight text-fg">
                  {ind.useCase}
                </h4>
                <p className="mt-3 text-xs leading-6 text-muted-fg">
                  {ind.detail}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (4-Step Deployment) */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-muted-fg">
              Fast Rollout
            </span>
            <h2 className="mt-3 font-brand text-3xl font-medium tracking-tight text-fg md:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 text-base text-muted-fg">
              Go from zero to live AI voice agents handling calls in four structured steps.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Connect Numbers",
                desc: "Link your existing business phone numbers or provision virtual telecom DIDs via Exotel or Twilio.",
              },
              {
                step: "02",
                title: "Upload Knowledge",
                desc: "Provide your product manuals, pricing FAQs, and guidelines. The AI indexes your business rules.",
              },
              {
                step: "03",
                title: "Tune Voice & Persona",
                desc: "Select speaking accents, voice style, working hours, and configure human escalation protocols.",
              },
              {
                step: "04",
                title: "Deploy & Scale",
                desc: "Activate 24/7 inbound and outbound calling with real-time analytics logged to VYRA CRM.",
              },
            ].map((step, idx) => (
              <Reveal
                key={idx}
                delay={idx * 80}
                className="flex flex-col justify-between rounded-[22px] border border-line bg-surface p-7"
              >
                <div>
                  <span className="font-mono-g text-2xl font-light text-muted-fg/60">
                    {step.step}
                  </span>
                  <h3 className="mt-4 font-brand text-lg font-medium tracking-tight text-fg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-muted-fg">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance Highlights */}
      <section className="border-t border-line bg-surface py-20">
        <div className="container-x">
          <div className="mx-auto max-w-4xl rounded-[28px] border border-line bg-white p-8 sm:p-12 shadow-sm">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <span className="font-mono-g text-[10px] uppercase tracking-wider text-muted-fg">
                  Security & Enterprise Governance
                </span>
                <h3 className="mt-2 font-brand text-2xl font-medium tracking-tight text-fg sm:text-3xl">
                  Enterprise-grade data protection and telecom compliance.
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-fg">
                  Every voice session is encrypted end-to-end via TLS 1.3 with zero data retention on foundation models. Includes built-in Indian National Do-Not-Call (DND) scrubbing and strict SOC-2 readiness.
                </p>
              </div>
              <div className="shrink-0 space-y-2 font-mono-g text-xs text-fg">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span> TLS 1.3 Audio Encryption
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span> TRAI & DND Compliant
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span> Zero Training Data Retention
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span> SOC-2 Type II Aligned
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQAccordion
        faqs={VOICE_FAQS}
        title="Frequently Asked Questions about AI Voice Agents"
      />

      {/* Book a Demo CTA Banner */}
      <DetailCTABanner
        title="Deploy your AI Voice Workforce today."
        subtitle="Schedule a live personalized walkthrough with our voice solutions team. Experience live test calls and explore how voice automation can scale your business."
        primaryCtaText="Book a Demo"
        prefillName="TAGVERSE AI Voice Agents"
        whatsappMessage="Hi Tagverse team, I want to book a live demo of TAGVERSE AI Voice Agents."
      />
    </main>
  );
}
