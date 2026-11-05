export interface ServiceItem {
  id: string; // legacy id or short key
  slug: string; // url slug e.g. "digital-marketing"
  number: string; // "01"
  title: string;
  tagline: string;
  eyebrow: string;
  shortDesc: string;
  longDesc: string;
  heroImage: string;
  stats: { label: string; value: string }[];
  deliverables: {
    title: string;
    description: string;
    icon?: string;
  }[];
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  techStack: string[];
  differentiators: {
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedSlugs: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    number: "01",
    title: "Digital Marketing & Social Media Management",
    tagline: "High-retention brand storytelling, data-backed community growth, and viral social presence.",
    eyebrow: "TAGVERSE SERVICES • 01",
    shortDesc: "We run your brand presence like a compound growth engine — consistent high-retention content, sharp positioning, active community engagement, and data-backed channel execution.",
    longDesc: "At TAGVERSE, we treat organic social media and digital marketing as a compound growth engine. Rather than publishing generic corporate updates, we craft high-retention short-form video reels, sharp founder-led positioning, culture-first memes, and multi-channel content ecosystems that build authentic brand equity and attract high-intent customers.",
    heroImage: "/assets/images/insights/smart-suggestion-layer-1.webp",
    stats: [
      { label: "Average Engagement Lift", value: "3.4x" },
      { label: "Content Turnaround", value: "48 Hours" },
      { label: "Omnichannel Reach", value: "10M+ Views" },
    ],
    deliverables: [
      {
        title: "Content Strategy & Editorial Calendar",
        description: "Monthly themes, content pillars, publishing cadence, and audience demographic modeling.",
      },
      {
        title: "High-Retention Short-Form Reels & Shorts",
        description: "Scripted, shot, and edited for maximum watch-time and algorithmic hook conversion.",
      },
      {
        title: "Founder-Led Authority & Ghostwriting",
        description: "Executive ghostwriting for LinkedIn and X to establish industry leadership.",
      },
      {
        title: "Community Management & Social Listening",
        description: "Real-time comment engagement, DM nurture, and audience sentiment analysis.",
      },
      {
        title: "Analytics, Attribution & Competitor Audits",
        description: "Monthly deep dives on reach, saves, shares, profile visits, and inbound leads.",
      },
      {
        title: "Creative Trend Jacking & Culture Hooks",
        description: "Rapid reactive content leveraging trending audios, formats, and cultural moments.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Brand & Audience Audit",
        description: "We dissect past performance, competitors, audience personas, and historical hook retention rates.",
      },
      {
        step: "02",
        title: "Content Pillar & Scripting Architecture",
        description: "We map out high-performing content themes, weekly production cadences, and compelling hooks.",
      },
      {
        step: "03",
        title: "Production & Cinema-Grade Post",
        description: "High-fidelity filming, motion graphics, audio mastering, and typography tuned for mobile feeds.",
      },
      {
        step: "04",
        title: "Distribution & Algorithmic Iteration",
        description: "Peak-hour posting, active community engagement, and weekly data-driven script adjustments.",
      },
    ],
    techStack: [
      "Meta Business Suite",
      "Instagram Creator Studio",
      "LinkedIn Analytics",
      "YouTube Studio",
      "CapCut Pro",
      "Adobe Premiere Pro",
      "Brandwatch",
      "Notion Workspaces",
    ],
    differentiators: [
      {
        title: "In-House 4K Production Studio",
        description: "Our physical studio in Chennai features multi-camera podcast setups, broadcast audio, and cinematic lighting.",
      },
      {
        title: "Algorithmic Retention Focus",
        description: "We don't post for vanity metrics — every second of video is engineered for retention, re-watches, and saves.",
      },
      {
        title: "Dedicated Creative Squad",
        description: "A dedicated creative director, scriptwriter, and post-production editor assigned to your brand.",
      },
    ],
    faqs: [
      {
        question: "How frequently will content be delivered and published?",
        answer: "Depending on your selected tier, we produce and schedule 12 to 30 short-form reels and 15 to 25 static/carousel graphics each month, managed through a real-time collaborative Notion calendar.",
      },
      {
        question: "Do you handle filming or do we need to record our own footage?",
        answer: "Both options are available. If you're in Chennai, you can record in our studio or our crew can shoot on-location. For remote brands, our team provides teleprompter-ready scripts, recording guidelines, and handles 100% of post-production.",
      },
      {
        question: "How quickly do we see results?",
        answer: "Aesthetic consistency and engagement lift usually appear within the first 14 days. Sustained audience growth and inbound leads scale between months 2 and 3.",
      },
      {
        question: "What platforms do you support?",
        answer: "Instagram, YouTube Shorts, LinkedIn, X (Twitter), Facebook, and TikTok.",
      },
    ],
    relatedSlugs: ["performance-marketing", "branding-design", "video-podcast-production"],
  },
  {
    id: "performance-ads",
    slug: "performance-marketing",
    number: "02",
    title: "Performance Marketing & Paid Advertising",
    tagline: "Profitable full-funnel ad scaling across Meta, Google, YouTube, and LinkedIn.",
    eyebrow: "TAGVERSE SERVICES • 02",
    shortDesc: "Full-funnel performance advertising built around your target CAC and ROAS. We blend high-converting creative hooks with machine-learning bidding strategies to scale profitably.",
    longDesc: "Paid advertising without disciplined conversion architecture is just burning capital. At TAGVERSE, our performance team combines scientific media buying with rapid creative iteration. We deploy high-converting video hooks, Conversion API server-side tracking, and algorithmic budget optimization across Meta, Google, YouTube, and LinkedIn.",
    heroImage: "/assets/images/home/stepped-feature-bg-1.webp",
    stats: [
      { label: "Target ROAS Scaled", value: "4.8x" },
      { label: "Ad Spend Managed", value: "₹2Cr+" },
      { label: "CBO Hook Variations", value: "50+/mo" },
    ],
    deliverables: [
      {
        title: "Meta Ads (Facebook & Instagram)",
        description: "Advantage+ shopping campaigns, dynamic catalog ads, and high-converting video hook angles.",
      },
      {
        title: "Google Search & Performance Max",
        description: "High-intent keyword harvesting, PMax asset clusters, and negative keyword governance.",
      },
      {
        title: "YouTube Video Action Campaigns",
        description: "Direct-response video ads capturing high-intent prospects through cinematic storytelling.",
      },
      {
        title: "LinkedIn B2B Account-Based Marketing",
        description: "Targeting verified decision-makers, CXOs, and enterprise buying committees.",
      },
      {
        title: "Conversion API & Server-Side Tracking",
        description: "Robust CAPI integration overcoming iOS privacy signal loss for accurate attribution.",
      },
      {
        title: "Direct-Response Creative Refresh",
        description: "Weekly multivariate ad creative testing: UGC, static unboxing, testimonials, and motion graphics.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Tracking & Funnel Diagnostics",
        description: "We audit your pixel health, server-side CAPI, Google Tag Manager containers, and landing page drop-offs.",
      },
      {
        step: "02",
        title: "Creative Matrix & Messaging Matrix",
        description: "We design 15+ ad concepts testing pain points, desires, objections, and social proof angles.",
      },
      {
        step: "03",
        title: "Algorithmic Media Buying",
        description: "We launch structured campaigns with segregated testing and scaling budgets using CBO and tCPA/tROAS.",
      },
      {
        step: "04",
        title: "LTV Scaling & Funnel Optimization",
        description: "Continuous CRO on landing pages, retargeting exclusions, and margin-focused scale.",
      },
    ],
    techStack: [
      "Meta Ads Manager",
      "Google Ads & GA4",
      "YouTube Studio",
      "LinkedIn Campaign Manager",
      "Google Tag Manager",
      "Meta Conversion API",
      "Triple Whale",
      "Hotjar",
    ],
    differentiators: [
      {
        title: "Creative-Led Media Buying",
        description: "Media buying is 80% creative in the modern ad landscape. Our in-house designers and editors iterate winning hooks weekly.",
      },
      {
        title: "Server-Side Signal Mastery",
        description: "We configure 100% server-side tracking so no conversions are lost to ad blockers or iOS privacy changes.",
      },
      {
        title: "Zero Retainer Lock-In Without Performance",
        description: "We align incentives with transparent reporting dashboards and real-time slack channels.",
      },
    ],
    faqs: [
      {
        question: "What is the minimum recommended ad budget?",
        answer: "We recommend a minimum monthly ad spend of ₹50,000 to ₹1,00,000 on Meta or Google to collect sufficient statistical conversion data for algorithmic optimization.",
      },
      {
        question: "Do you supply the video and graphic ad creatives?",
        answer: "Yes, full-stack creative production is included. Our team designs motion graphics, script UGC, and produces direct-response video hooks specifically for your campaigns.",
      },
      {
        question: "How do you track return on investment (ROAS)?",
        answer: "We configure server-side Conversion APIs and Google Tag Manager with UTM taxonomy, feeding live data into an executive Looker Studio dashboard you can view 24/7.",
      },
    ],
    relatedSlugs: ["digital-marketing", "branding-design", "web-development"],
  },
  {
    id: "brand-identity",
    slug: "branding-design",
    number: "03",
    title: "Branding & Creative Design",
    tagline: "Iconic visual identities, comprehensive design systems, and unforgettable brand worlds.",
    eyebrow: "TAGVERSE SERVICES • 03",
    shortDesc: "We craft iconic visual identities and comprehensive design systems that turn casual observers into devoted brand evangelists across digital and physical touchpoints.",
    longDesc: "A memorable brand is your ultimate unfair advantage. At TAGVERSE, branding is not just a logo; it is the entire sensory ecosystem of your business. We engineer strategic brand architectures, cohesive typography palettes, 3D assets, physical packaging, and bulletproof design guidelines that command premium pricing and stand out in crowded markets.",
    heroImage: "/assets/images/home/stepped-feature-bg-2.webp",
    stats: [
      { label: "Design Systems Built", value: "40+" },
      { label: "Assets Delivered", value: "10,000+" },
      { label: "Brand Equity Multiplier", value: "5x" },
    ],
    deliverables: [
      {
        title: "Brand Strategy & Core Narrative",
        description: "Mission, vision, value propositions, archetype, and brand voice guidelines.",
      },
      {
        title: "Logo System & Vector Master Files",
        description: "Primary logomark, secondary badges, monograms, and responsive icon variations.",
      },
      {
        title: "Typography & Color Architecture",
        description: "Curated type hierarchy, web fonts, accessible color scales, and dark/light modes.",
      },
      {
        title: "Comprehensive Design Guidelines",
        description: "An 80+ page brand handbook detailing spacing, do's & don'ts, and marketing rules.",
      },
      {
        title: "Packaging & Physical Collateral",
        description: "Dielines, retail packaging, shipping boxes, merchandise, and stationery.",
      },
      {
        title: "3D Brand Assets & UI Component Tokens",
        description: "Figma design tokens, 3D emblems, and social template kits for cohesive execution.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Discovery & Competitive Positioning",
        description: "We map your industry landscape, customer psychology, and uncover your unique brand moat.",
      },
      {
        step: "02",
        title: "Moodboards & Concept Direction",
        description: "We present three distinct visual directions exploring color psychology, typography, and mood.",
      },
      {
        step: "03",
        title: "Identity Crafting & Refinement",
        description: "We polish the chosen direction into an exhaustive brand system with mockups across real touchpoints.",
      },
      {
        step: "04",
        title: "Design System & Handoff",
        description: "We package all vector files, Figma libraries, guidelines, and font licenses for seamless deployment.",
      },
    ],
    techStack: [
      "Figma",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Blender 3D",
      "After Effects",
      "FontLab",
      "Tokens Studio",
    ],
    differentiators: [
      {
        title: "Future-Proof Design Systems",
        description: "We build modular Figma component tokens ready for both web developers and packaging printers.",
      },
      {
        title: "3D & Motion Integrated",
        description: "Every brand we build comes alive with motion guidelines and optional 3D asset renders.",
      },
      {
        title: "Commercial-Grade Vector Assets",
        description: "Fully organized asset suites exported for web (SVG/WebP) and CMYK offset print (PDF/AI).",
      },
    ],
    faqs: [
      {
        question: "How long does a full brand identity project take?",
        answer: "A complete brand identity from discovery to final guideline handoff typically takes 3 to 6 weeks, depending on the scope of packaging and collateral.",
      },
      {
        question: "What files and formats do we receive?",
        answer: "You receive all vector files (.AI, .EPS, .SVG), web formats (.PNG, .WebP), print-ready PDFs with bleed marks, and an organized Figma master library.",
      },
      {
        question: "Can you design our packaging or merchandise as well?",
        answer: "Yes. We regularly design physical retail packaging, custom poly mailers, labels, employee swag, and exhibition banners.",
      },
    ],
    relatedSlugs: ["digital-marketing", "web-development", "video-podcast-production"],
  },
  {
    id: "web-app-dev",
    slug: "web-development",
    number: "04",
    title: "Website & Application Development",
    tagline: "Sub-second load speeds, modern Next.js architecture, and high-conversion user interfaces.",
    eyebrow: "TAGVERSE SERVICES • 04",
    shortDesc: "From lightning-fast marketing landing pages to full-scale web applications. Engineered on Next.js, React, and modern cloud architecture for maximum conversion and sub-second load times.",
    longDesc: "Your digital product is your premier 24/7 salesperson. At TAGVERSE, we engineer lightning-fast, visually stunning websites and web applications with Next.js, React, Tailwind CSS, and edge cloud infrastructure. We bridge cutting-edge aesthetic interactivity with robust enterprise-level performance, flawless mobile responsiveness, and bulletproof security.",
    heroImage: "/assets/images/home/stepped-feature-bg-1.webp",
    stats: [
      { label: "Core Web Vitals", value: "98/100" },
      { label: "Load Time", value: "< 0.8s" },
      { label: "Uptime SLA", value: "99.9%" },
    ],
    deliverables: [
      {
        title: "Custom Next.js & React Web Apps",
        description: "Server-side rendered, statically generated, high-performance web applications.",
      },
      {
        title: "Responsive UI & Tailwind Styling",
        description: "Pixel-perfect mobile, tablet, and desktop interfaces crafted to your exact brand aesthetics.",
      },
      {
        title: "Interactive 3D & Micro-Interactions",
        description: "Smooth Framer Motion animations, interactive canvas elements, and tactile feedback.",
      },
      {
        title: "Headless CMS & Database Architecture",
        description: "Effortless content management via Sanity, Strapi, or Firestore with zero developer bottleneck.",
      },
      {
        title: "API & Payment Gateway Integrations",
        description: "Stripe, Razorpay, Cashfree, CRM syncs, and webhook event-driven microservices.",
      },
      {
        title: "Enterprise SEO & Speed Optimization",
        description: "Schema.org structured data, dynamic OpenGraph cards, image optimization, and CDN edge caching.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Architecture & Wireframing",
        description: "We map out user flows, information architecture, component hierarchy, and database schemas.",
      },
      {
        step: "02",
        title: "Figma UI/UX Prototyping",
        description: "Interactive visual prototypes showcasing typography, responsive layouts, and state transitions.",
      },
      {
        step: "03",
        title: "Next.js & Frontend Engineering",
        description: "Clean TypeScript code, accessible components, sub-second routing, and API route security.",
      },
      {
        step: "04",
        title: "QA, Lighthouse Audit & Deployment",
        description: "Cross-browser testing, penetration security checks, automated CI/CD deployment on Vercel/AWS.",
      },
    ],
    techStack: [
      "Next.js 14 / 15",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Node.js",
      "PostgreSQL / Supabase",
      "Firebase / Firestore",
      "Vercel / Cloudflare",
    ],
    differentiators: [
      {
        title: "Sub-Second Global Performance",
        description: "We obsess over Lighthouse scores, Core Web Vitals, and edge caching to maximize conversions.",
      },
      {
        title: "Clean, Maintainable Codebase",
        description: "Modular React components, strict TypeScript types, and comprehensive inline documentation.",
      },
      {
        title: "Full Ownership & Zero Vendor Lock-in",
        description: "You receive the complete Git repository, architecture docs, and deployment setup.",
      },
    ],
    faqs: [
      {
        question: "How long does a custom website or web app take to build?",
        answer: "A high-conversion marketing website typically takes 2 to 4 weeks. Complex SaaS portals, custom dashboards, or web apps take 4 to 10 weeks depending on integrations.",
      },
      {
        question: "Can our team easily edit text, images, and blog posts?",
        answer: "Yes. We integrate user-friendly headless CMS solutions or admin dashboards allowing non-technical teammates to update content instantly without touching code.",
      },
      {
        question: "Do you provide hosting, maintenance, and ongoing updates?",
        answer: "Yes, we offer ongoing SLA maintenance packages including security updates, continuous deployment, performance monitoring, and priority feature additions.",
      },
    ],
    relatedSlugs: ["ai-agents-llm", "workflow-automation", "branding-design"],
  },
  {
    id: "ai-agents-llm",
    slug: "ai-agents-llm",
    number: "05",
    title: "AI Agents & LLM Integrations",
    tagline: "Autonomous agentic swarms, enterprise RAG knowledge bases, and intelligent automated workflows.",
    eyebrow: "TAGVERSE SERVICES • 05",
    shortDesc: "Deploy intelligent autonomous agents that handle complex enterprise workflows — automated customer support, semantic document intelligence, and AI-powered marketing assistants.",
    longDesc: "The future belongs to companies that deploy autonomous intelligence. At TAGVERSE, we build specialized AI agents and enterprise LLM integrations that reason, execute multi-step workflows, retrieve proprietary company knowledge via RAG (Retrieval-Augmented Generation), and handle high-volume customer interactions 24/7 without human intervention.",
    heroImage: "/assets/images/insights/smart-suggestion-layer-2.webp",
    stats: [
      { label: "Workflow Automation", value: "85%" },
      { label: "Response Latency", value: "< 1.2s" },
      { label: "Token Cost Reduction", value: "40%" },
    ],
    deliverables: [
      {
        title: "Autonomous Multi-Agent Swarms",
        description: "Collaborative agents that research, verify, summarize, and trigger external API actions.",
      },
      {
        title: "Enterprise RAG & Document Search",
        description: "Vector database indexing for PDFs, internal wikis, legal contracts, and product manuals.",
      },
      {
        title: "AI Sales & Qualification Chatbots",
        description: "High-EQ conversational agents that nurture prospects, answer objections, and book calendar calls.",
      },
      {
        title: "Voice AI & Realtime Agents",
        description: "Natural-sounding voice synthesis and transcription for inbound phone support and outbound reminders.",
      },
      {
        title: "Fine-Tuning & Prompt Guardrails",
        description: "Custom fine-tuned models with safety filters preventing hallucinations and data leakage.",
      },
      {
        title: "CRM & ERP AI Integration",
        description: "Seamless embedding into HubSpot, Salesforce, Zoho, Slack, or custom internal systems.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Workflow Discovery & Knowledge Audit",
        description: "We identify repetitive manual bottlenecks and inventory company data sources suitable for indexing.",
      },
      {
        step: "02",
        title: "Vector Architecture & Prompt Engineering",
        description: "We chunk, embed, and index proprietary data into vector storage with deterministic system prompts.",
      },
      {
        step: "03",
        title: "Agent Tool Calling & API Binding",
        description: "We equip the agent with tools (database queries, booking links, email senders, CRM updates).",
      },
      {
        step: "04",
        title: "Evaluation & Production Hardening",
        description: "Rigorous red-teaming, prompt injection defense, latency optimization, and continuous monitoring.",
      },
    ],
    techStack: [
      "OpenAI GPT-4o / O1",
      "Anthropic Claude 3.5 Sonnet",
      "Google Gemini 1.5 Pro / Flash",
      "LangChain / LangGraph",
      "LlamaIndex",
      "Pinecone / Qdrant / pgvector",
      "n8n / FastAPI",
      "Vercel AI SDK",
    ],
    differentiators: [
      {
        title: "Enterprise Data Privacy & Security",
        description: "Your proprietary data is never used for foundation model training. We enforce zero-retention API policies.",
      },
      {
        title: "Deterministic Guardrails",
        description: "We implement multi-stage evaluation checks to eliminate hallucinations and off-brand responses.",
      },
      {
        title: "Real API Action Execution",
        description: "Our agents don't just chat — they update records, generate invoices, send calendar invites, and execute real tasks.",
      },
    ],
    faqs: [
      {
        question: "Is our proprietary company data kept secure?",
        answer: "Yes, 100%. We use enterprise API endpoints covered by strict Business Associate Agreements and Zero Data Retention policies. Your documents and queries are never stored or used to train third-party models.",
      },
      {
        question: "What happens if the AI encounters an unknown query?",
        answer: "We engineer intelligent fallback protocols. If the agent's confidence score falls below a set threshold, it smoothly escalates the conversation to a human team member with a full summary.",
      },
      {
        question: "Can the AI agent integrate with our existing CRM and tools?",
        answer: "Yes. Our agents interface via standard REST APIs, GraphQL, and webhooks with any modern tool (HubSpot, Salesforce, Zoho, Slack, WhatsApp, Google Workspace, etc.).",
      },
    ],
    relatedSlugs: ["workflow-automation", "whatsapp-automation", "web-development"],
  },
  {
    id: "n8n-webhooks",
    slug: "workflow-automation",
    number: "06",
    title: "Workflow Automation & API Integrations",
    tagline: "Zero-touch operational pipelines, self-hosted n8n workflows, and synchronized tech stacks.",
    eyebrow: "TAGVERSE SERVICES • 06",
    shortDesc: "Connect your entire tech stack into a synchronized, zero-touch machine. We build fault-tolerant n8n workflows, custom webhook pipelines, and automatic data synchronization.",
    longDesc: "Manual data entry and fragmented tools kill business momentum. At TAGVERSE, we architect robust, automated backbones using self-hosted n8n, serverless microservices, and webhook pipelines. We eliminate human error, synchronize your lead forms with your CRM, automate invoice generation, and trigger instant team notifications across Slack and WhatsApp.",
    heroImage: "/assets/images/insights/smart-suggestion-layer-3.webp",
    stats: [
      { label: "Hours Saved / Month", value: "300+" },
      { label: "Execution Success Rate", value: "99.98%" },
      { label: "Custom Integrations", value: "120+" },
    ],
    deliverables: [
      {
        title: "Self-Hosted n8n Architecture",
        description: "Unlimited automated workflow runs on private cloud instances with zero third-party per-task fees.",
      },
      {
        title: "Cross-Platform CRM & Database Sync",
        description: "Bi-directional real-time syncing between forms, CRMs, Google Sheets, PostgreSQL, and ERPs.",
      },
      {
        title: "Webhook Ingestion & Resilient Retries",
        description: "Dead-letter queues and automated retries ensuring no client lead or payment is ever dropped.",
      },
      {
        title: "Automated Financial & Invoicing Pipelines",
        description: "Instant invoice generation, PDF creation, payment receipt distribution, and accounting sync.",
      },
      {
        title: "Real-Time Alerts & Slack / WhatsApp Bots",
        description: "Instant internal notifications when high-value leads submit, payments succeed, or alerts fire.",
      },
      {
        title: "Automated Reporting & ETL Pipelines",
        description: "Consolidating ad spend, website metrics, and sales numbers into daily automated executive digests.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Tech Stack Audit & Process Mapping",
        description: "We map out every software tool your team uses, identifying redundant manual handoffs and latency.",
      },
      {
        step: "02",
        title: "Workflow Architecture & Data Schemas",
        description: "We design logic trees, payload transformations, conditional branches, and error-handling steps.",
      },
      {
        step: "03",
        title: "n8n Deployment & API Hookup",
        description: "We configure encrypted credentials, OAuth tokens, webhooks, and test edge-case payloads.",
      },
      {
        step: "04",
        title: "Stress Testing & Monitoring Setup",
        description: "We simulate high load, configure automated error alert channels, and document workflow runbooks.",
      },
    ],
    techStack: [
      "n8n (Self-Hosted / Cloud)",
      "Webhooks & REST APIs",
      "Zapier / Make (Migration & Interop)",
      "Docker & Cloudflare Workers",
      "PostgreSQL / Supabase",
      "Slack / Discord Bots",
      "WhatsApp Cloud API",
      "Google Workspace APIs",
    ],
    differentiators: [
      {
        title: "Self-Hosted n8n (No Per-Task Costs)",
        description: "Avoid Zapier's punitive per-task pricing. Our self-hosted n8n setups run millions of tasks for pennies in hosting.",
      },
      {
        title: "Fault-Tolerant Architecture",
        description: "Every workflow includes automatic retry mechanisms, webhook validation, and error alerts.",
      },
      {
        title: "Complete Documentation",
        description: "We deliver full visual workflow diagrams and step-by-step handover documentation for your team.",
      },
    ],
    faqs: [
      {
        question: "Why should we use n8n instead of Zapier or Make?",
        answer: "Self-hosted n8n gives you 100% data privacy (your customer data never touches third-party US servers), unlimited workflow executions without expensive tiered pricing, and the ability to write custom JavaScript/Python code directly inside nodes.",
      },
      {
        question: "Can you migrate our existing Zapier or Make workflows to n8n?",
        answer: "Yes! We specialize in migrating legacy Zapier/Make setups to self-hosted n8n, typically slashing our clients' recurring automation software bills by 70% to 90%.",
      },
      {
        question: "What happens if a third-party API goes down?",
        answer: "Our workflows are designed with queueing and retry logic. If an API is temporarily unresponsive, the payload is held and re-attempted automatically, while notifying your team in Slack.",
      },
    ],
    relatedSlugs: ["ai-agents-llm", "whatsapp-automation", "web-development"],
  },
  {
    id: "whatsapp-chatbots",
    slug: "whatsapp-automation",
    number: "07",
    title: "WhatsApp Chatbots & Business Automation",
    tagline: "Official WhatsApp Cloud API conversational bots, automated booking, and 98% open rates.",
    eyebrow: "TAGVERSE SERVICES • 07",
    shortDesc: "Turn WhatsApp into your primary conversion and customer support channel with official WhatsApp Cloud API bots, automated drip sequences, and instant booking confirmations.",
    longDesc: "Email open rates hover at 15-20%, while WhatsApp messages achieve over 98% open rates within minutes. At TAGVERSE, we transform WhatsApp into your highest-converting sales and support channel. Leveraging the official Meta WhatsApp Cloud API, we deploy intelligent interactive bots, automated appointment booking, payment link triggers, and direct CRM synchronization.",
    heroImage: "/assets/images/home/stepped-feature-bg-2.webp",
    stats: [
      { label: "Average Open Rate", value: "98.2%" },
      { label: "Lead Response Time", value: "< 5s" },
      { label: "Conversion Uplift", value: "4.2x" },
    ],
    deliverables: [
      {
        title: "Official Meta WhatsApp Cloud API Setup",
        description: "Green tick verification assistance, business manager linking, and phone number registration.",
      },
      {
        title: "24/7 Intelligent Conversational Chatbots",
        description: "Interactive button menus, natural language query handling, and automated FAQs.",
      },
      {
        title: "Automated Lead Nurture & Drip Sequences",
        description: "Instant responses to website leads with personalized follow-up sequences and brochures.",
      },
      {
        title: "Instant Calendar & Studio Booking",
        description: "Direct appointment scheduling, slot confirmation, and automated reminder broadcasts.",
      },
      {
        title: "Payment Link & Order Status Notifications",
        description: "Razorpay/Stripe payment links sent automatically with real-time payment confirmation receipts.",
      },
      {
        title: "Shared Team Inbox & Human Handover",
        description: "Multi-agent dashboard allowing human operators to take over chats seamlessly.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Meta Account & Number Verification",
        description: "We set up your official WhatsApp Business Cloud API account with Meta and configure templates.",
      },
      {
        step: "02",
        title: "Conversation Architecture & Copywriting",
        description: "We design engaging dialogue flows, quick-reply options, media carousels, and error fallbacks.",
      },
      {
        step: "03",
        title: "CRM & Payment Webhook Integration",
        description: "We bind WhatsApp triggers directly to your CRM, Google Calendar, and payment gateways.",
      },
      {
        step: "04",
        title: "Template Approval & Live Launch",
        description: "We get marketing and utility templates approved by Meta and launch end-to-end testing.",
      },
    ],
    techStack: [
      "Meta WhatsApp Cloud API",
      "WhatsApp Business Platform",
      "n8n / Node.js Webhook Server",
      "Razorpay / Stripe Webhooks",
      "Google Calendar API",
      "HubSpot / VYRA CRM",
      "OpenAI GPT-4o for Smart NLP",
    ],
    differentiators: [
      {
        title: "Official Cloud API (Zero Ban Risk)",
        description: "We use only official Meta Cloud API infrastructure — never risky unverified browser scrapers or unofficial clones.",
      },
      {
        title: "Sub-5-Second Lead Response",
        description: "Website leads receive an instant, personalized WhatsApp greeting before they leave your site.",
      },
      {
        title: "Omnichannel CRM Sync",
        description: "Every conversation, contact details, and booking is logged into your central CRM automatically.",
      },
    ],
    faqs: [
      {
        question: "Is there any risk of our WhatsApp number getting banned?",
        answer: "No. Because we use the official Meta WhatsApp Cloud API with pre-approved message templates and compliance guidelines, your business number is 100% safe and verified.",
      },
      {
        question: "Can our team still chat manually with customers on the same number?",
        answer: "Yes! We deploy a shared multi-agent inbox where your human sales reps can view active conversations, step in at any moment, and chat directly with customers.",
      },
      {
        question: "What are Meta's conversation fees?",
        answer: "Meta charges a small per-conversation fee (typically around ₹0.40 to ₹0.80 per 24-hour customer window for utility/marketing templates in India), while service-initiated replies from users are often free or heavily discounted.",
      },
    ],
    relatedSlugs: ["workflow-automation", "ai-agents-llm", "performance-marketing"],
  },
  {
    id: "seo-aeo-geo",
    slug: "seo-aeo-geo",
    number: "08",
    title: "SEO, AEO & GEO Optimization",
    tagline: "Dominating organic search across Google, Perplexity, ChatGPT Search, and AI Overviews.",
    eyebrow: "TAGVERSE SERVICES • 08",
    shortDesc: "Dominate organic search in the age of AI. We optimize your brand not just for Google Search, but for Answer Engines (Perplexity, ChatGPT Search) and Generative Search Engines (Google AI Overviews).",
    longDesc: "Search has fundamentally evolved. Today, prospective buyers don't just click 10 blue links on Google — they ask ChatGPT, query Perplexity, and read Google AI Overviews. At TAGVERSE, we pioneer tripartite search dominance: traditional Technical SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO). We position your brand as the canonical citation source across modern AI models.",
    heroImage: "/assets/images/insights/smart-suggestion-layer-1.webp",
    stats: [
      { label: "AI Citations Growth", value: "340%" },
      { label: "Top 3 Rankings", value: "500+" },
      { label: "Organic Pipeline", value: "₹1.5Cr+" },
    ],
    deliverables: [
      {
        title: "Answer Engine Optimization (AEO)",
        description: "Structuring content for direct retrieval by Perplexity, Claude, and ChatGPT Search.",
      },
      {
        title: "Generative Engine Optimization (GEO)",
        description: "Information density tuning ensuring your brand is synthesized in Google AI Overviews.",
      },
      {
        title: "Technical SEO & Core Web Vitals Audit",
        description: "Indexation hygiene, crawl budget management, canonical tags, and sub-second rendering.",
      },
      {
        title: "Advanced Schema.org & JSON-LD Entity Graph",
        description: "Building an unambiguous machine-readable entity graph defining your organization and services.",
      },
      {
        title: "High-Intent Bottom-of-Funnel Content",
        description: "Comparative vs. articles, buyer guides, and technical teardowns that convert searchers.",
      },
      {
        title: "Digital PR & Authoritative Entity Links",
        description: "Securing tier-one publications and contextual brand citations that boost domain authority.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Entity & Semantic Keyword Research",
        description: "We map out high-intent buyer keywords and analyze how AI engines currently cite your brand vs rivals.",
      },
      {
        step: "02",
        title: "Technical & Schema Foundation",
        description: "We resolve all crawl errors, duplicate URLs, and embed comprehensive JSON-LD entity structures.",
      },
      {
        step: "03",
        title: "High-Density Content Production",
        description: "We write authoritative, data-backed guides engineered with clear quote-ready definitions for AI models.",
      },
      {
        step: "04",
        title: "Digital PR & Ongoing Citation Tracking",
        description: "We secure authoritative backlinks and monitor citation frequency across Perplexity and Google SGE.",
      },
    ],
    techStack: [
      "Ahrefs",
      "Semrush",
      "Google Search Console",
      "Google AI Overviews",
      "Perplexity AI Pro",
      "Screaming Frog SEO Spider",
      "Schema App",
      "SurferSEO",
    ],
    differentiators: [
      {
        title: "Beyond Traditional 2015 SEO",
        description: "While other agencies still stuff keywords, we engineer semantic entity graphs that modern AI search engines actively cite.",
      },
      {
        title: "Technical Excellence",
        description: "We build directly on modern web frameworks (Next.js), ensuring pristine Server-Side Rendering and sub-second load times.",
      },
      {
        title: "Revenue-Driven Keywords",
        description: "We don't chase vanity traffic. Every keyword target is selected for commercial buyer intent.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between SEO, AEO, and GEO?",
        answer: "SEO (Search Engine Optimization) optimizes for traditional search ranking algorithms. AEO (Answer Engine Optimization) optimizes for direct conversational answer bots like Perplexity and ChatGPT. GEO (Generative Engine Optimization) optimizes for multimodal AI overviews generated by Google Gemini and Bing Copilot.",
      },
      {
        question: "How long before we see rankings and traffic increase?",
        answer: "Technical fixes and Schema enhancements reflect in crawl indexes within 2 to 4 weeks. Meaningful organic traffic and AI citation gains compound over 3 to 6 months.",
      },
      {
        question: "Do you guarantee #1 rankings?",
        answer: "No reputable agency can guarantee specific #1 rankings because algorithms evolve constantly. However, our proven methodology consistently delivers top-page rankings and verified AI citations for high-intent queries.",
      },
    ],
    relatedSlugs: ["digital-marketing", "web-development", "performance-marketing"],
  },
  {
    id: "video-podcast-studio",
    slug: "video-podcast-production",
    number: "09",
    title: "Video, Podcast & Media Production",
    tagline: "Broadcast-grade 4K multi-camera studio, cinematic brand films, and high-tempo social clips.",
    eyebrow: "TAGVERSE SERVICES • 09",
    shortDesc: "Full-service visual production from our state-of-the-art studio in Chennai. Multi-camera 4K podcast setups, commercial shoots, brand films, and high-tempo social reels editing.",
    longDesc: "Nothing builds trust and brand stature faster than broadcast-grade media. At TAGVERSE, we run a flagship production studio in Chennai equipped with Blackmagic Cinema 4K cameras, Shure broadcast microphones, acoustic baffling, and cinema lighting. From founder podcasts and commercial brand films to high-tempo social reels, our production team handles everything from script to final color grade.",
    heroImage: "/assets/images/home/poster-voice-experience.webp",
    stats: [
      { label: "Episodes Produced", value: "150+" },
      { label: "Camera Setup", value: "4K Multi-Cam" },
      { label: "Turnaround Time", value: "72 Hours" },
    ],
    deliverables: [
      {
        title: "Multi-Camera 4K Podcast Recording",
        description: "Dedicated studio rental with 3-camera 4K angles, professional lighting, and studio engineer.",
      },
      {
        title: "Commercial Shoots & Brand Documentaries",
        description: "On-location or in-studio cinematic commercials and customer case study mini-docs.",
      },
      {
        title: "High-Volume Short-Form Social Clips",
        description: "Extracting 10 to 20 viral clips per podcast episode with kinetic subtitles and sound design.",
      },
      {
        title: "Audio Mastering & Podcast Distribution",
        description: "Studio-grade EQ, compression, de-noising, and syndication to Spotify, Apple Podcasts, and YouTube.",
      },
      {
        title: "Motion Graphics, VFX & Color Grading",
        description: "DaVinci Resolve color suites delivering Hollywood-grade cinematic tones.",
      },
      {
        title: "Custom Set Design & Brand Staging",
        description: "Tailored LED lighting, branded neon signs, and backdrops reflecting your company aesthetic.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Pre-Production & Episode Brief",
        description: "We prepare interview questions, run-of-show timing, teleprompter scripts, and stage lighting presets.",
      },
      {
        step: "02",
        title: "Studio Production & Live Direction",
        description: "We record in 4K with isolated audio tracks, live multi-camera switching, and teleprompter support.",
      },
      {
        step: "03",
        title: "Post-Production & Sound Design",
        description: "Multi-cam line cuts, dynamic zooms, color correction, noise reduction, and custom intro/outro animations.",
      },
      {
        step: "04",
        title: "Repurposing & Multi-Channel Delivery",
        description: "We export the full 4K episode plus 10+ vertical short-form reels formatted with viral subtitles.",
      },
    ],
    techStack: [
      "Blackmagic Pocket Cinema 4K",
      "Sony FX3 Cinema Cameras",
      "Shure SM7B Microphones",
      "Aputure & Godox Studio Lighting",
      "DaVinci Resolve Studio",
      "Adobe Premiere Pro & After Effects",
      "Rodecaster Pro II",
      "Descript",
    ],
    differentiators: [
      {
        title: "Walk-In Ready Physical Studio",
        description: "Located in Chennai, you simply walk in, record your conversation, and walk out. We handle the rest.",
      },
      {
        title: "Turnkey Content Repurposing",
        description: "One 60-minute podcast session gives your brand an entire month of viral vertical clips.",
      },
      {
        title: "Cinema-Grade Post Production",
        description: "Our in-house colorists and sound designers elevate your visual presence above competitors.",
      },
    ],
    faqs: [
      {
        question: "Where is the TAGVERSE studio located?",
        answer: "Our flagship media studio is located in Chennai, fully outfitted with acoustic treatment, multi-camera rigs, cinema lighting, and air-conditioned green rooms.",
      },
      {
        question: "Can we book the studio for our own self-hosted recording?",
        answer: "Yes! You can book the studio with our dedicated studio engineer who manages camera angles, audio levels, and delivers raw footage directly to your hard drive, or choose full post-production.",
      },
      {
        question: "How many vertical reels can we get from one podcast episode?",
        answer: "From a standard 45-60 minute podcast recording, our editors extract 8 to 15 high-retention vertical clips complete with kinetic subtitles, audio hooks, and b-roll.",
      },
    ],
    relatedSlugs: ["digital-marketing", "influencer-management", "branding-design"],
  },
  {
    id: "influencer-management",
    slug: "influencer-management",
    number: "10",
    title: "Influencer, Creator & Model Management",
    tagline: "Vetted creator matchmaking, high-converting UGC production, and compliant talent contracting.",
    eyebrow: "TAGVERSE SERVICES • 10",
    shortDesc: "Connect your brand with high-affinity creators and models who genuinely resonate with your audience. We manage matchmaking, briefs, contracting, compliance, and ROI attribution.",
    longDesc: "Consumer trust in traditional ads has plummeted, while authentic creator recommendations drive exponential conversion. At TAGVERSE, we bridge ambitious brands with a curated roster of verified creators, lifestyle influencers, and professional commercial models. We handle end-to-end matchmaking, creative briefs, usage rights, legal contracts, and sales tracking.",
    heroImage: "/assets/images/insights/smart-suggestion-layer-3.webp",
    stats: [
      { label: "Vetted Creator Network", value: "500+" },
      { label: "Average UGC CTR", value: "3.8%" },
      { label: "Campaigns Executed", value: "100+" },
    ],
    deliverables: [
      {
        title: "Curated Creator & Model Matchmaking",
        description: "Pairing your brand with authentic creators aligned with your audience demographics and values.",
      },
      {
        title: "High-Converting UGC (User-Generated Content)",
        description: "Hook-focused testimonial, unboxing, problem-solution, and aesthetic product showcase videos.",
      },
      {
        title: "Bulletproof Legal Contracting & Rights",
        description: "Clear contracts covering usage rights, whitelisting permissions, exclusivity, and deliverables.",
      },
      {
        title: "Creative Direction & Storyboard Briefs",
        description: "Detailed creative briefs providing structure while preserving the creator's authentic tone of voice.",
      },
      {
        title: "Paid Whitelisting & Partnership Ads",
        description: "Running paid ads directly through the creator's handle (Meta Partnership Ads) for maximum trust.",
      },
      {
        title: "Affiliate Tracking & Sales Attribution",
        description: "Custom promo codes, affiliate links, and real-time ROAS tracking per creator.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Audience Persona & Creator Vetting",
        description: "We filter creators for authentic engagement rates, audience geography, and past campaign performance.",
      },
      {
        step: "02",
        title: "Outreach, Negotiation & Contracting",
        description: "We handle all communications, negotiate competitive rates, and secure full commercial advertising usage rights.",
      },
      {
        step: "03",
        title: "Creative Briefing & Sample Seeding",
        description: "We ship product samples, deliver storyboard guidelines, and review drafts before publishing.",
      },
      {
        step: "04",
        title: "Publishing, Whitelisting & Attribution",
        description: "We coordinate simultaneous publishing windows, amplify winning posts via paid ads, and track ROI.",
      },
    ],
    techStack: [
      "Meta Partnership Ads (Branded Content)",
      "Modash / Upfluence",
      "Notion Creator CRM",
      "DocuSign / Legal Contracts",
      "Shopify Collabs / Refersion",
      "Google Analytics 4 UTM Tracking",
    ],
    differentiators: [
      {
        title: "Zero Fake Followers",
        description: "We audit every creator's engagement authenticity using deep audience quality score analysis.",
      },
      {
        title: "Direct Whitelisting Rights",
        description: "Every contract includes digital advertising usage rights so you can scale winning creator videos as paid ads.",
      },
      {
        title: "Full Production Support",
        description: "Creators can shoot directly in our Chennai studio for professional audio and cinema lighting.",
      },
    ],
    faqs: [
      {
        question: "How do you ensure the creators reach our exact target audience?",
        answer: "We run deep demographic analytics on each creator's audience — checking follower geography, age distribution, gender ratio, and follower authenticity to ensure precise fit.",
      },
      {
        question: "Do we own the rights to run the creator's video as a paid ad?",
        answer: "Yes! All our creator contracts explicitly include commercial paid advertising rights and Meta Partnership ad whitelisting access for 30 to 90 days.",
      },
      {
        question: "What is the typical timeline for an influencer campaign?",
        answer: "From creator shortlisting and contracting to product delivery and live video publishing, a campaign usually takes 2 to 3 weeks.",
      },
    ],
    relatedSlugs: ["digital-marketing", "performance-marketing", "video-podcast-production"],
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug || s.id === slug);
}
