import type { Project, Product, PortfolioCategory } from "./types";

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  "Website & App Development",
  "AI & Intelligent Solutions",
  "SaaS, CRM & Business Software",
  "Automation & Integrations",
  "Branding & Creative Design",
  "Digital Marketing & Growth",
  "Video & Media Production",
  "E-commerce & Digital Platforms",
];

/**
 * Approved default projects showcasing TAGVERSE's authentic work & software products.
 * Displayed in the portfolio when Firestore has no records yet.
 */
export const DEFAULT_PROJECTS: Project[] = [
  {
    id: "proj-vyra-crm",
    slug: "vyra-crm",
    title: "VYRA CRM Platform",
    category: "SaaS, CRM & Business Software",
    categories: [
      "SaaS, CRM & Business Software",
      "AI & Intelligent Solutions",
      "Automation & Integrations",
    ],
    year: "2026",
    client: "TAGVERSE Technologies",
    summary:
      "All-in-one enterprise business operating system combining sales pipelines, AI voice calling, automated invoicing, project delivery, and team management.",
    description:
      "VYRA CRM eliminates fragmented SaaS tools by consolidating customer relationships, telephony, financial billing, and operational workflows into a single high-throughput platform powered by native AI intelligence.",
    services: [
      "SaaS & Cloud Application Development",
      "AI Voice Agent Telephony Integration",
      "Workflow Automation & WhatsApp Engine",
      "GST-Compliant Invoicing & Billing Systems",
    ],
    technologies: [
      "Next.js 14",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "OpenAI Realtime API",
      "Tailwind CSS",
      "Docker",
    ],
    liveUrl: "/products/vyra-crm",
    url: "/products/vyra-crm",
    img: "/assets/images/insights/smart-suggestion-layer-1.webp",
    featured: true,
    order: 1,
    published: true,
    challenge:
      "Modern service and product enterprises typically juggle 6 to 9 disconnected SaaS subscriptions for CRM, project management, call center telephony, invoicing, and team attendance. This fragmentation results in data silos, manual double-entry, high licensing overhead, and delayed customer response times.",
    solution:
      "We architected VYRA CRM as a unified modular operating system. Featuring an event-driven PostgreSQL schema, sub-400ms AI voice automation for inbound/outbound calls via WebRTC, native WhatsApp Cloud API messaging, and automated milestone-based invoicing with one-click payment links.",
    keyDeliverables: [
      "Unified sales lead pipeline with drag-and-drop Kanban and SLA alerts",
      "Integrated Inbound & Outbound AI Voice Workforce with automatic call recording & transcript sync",
      "Self-hosted operational task manager with Gantt timelines and time tracking",
      "Automated GST billing engine supporting Razorpay, Stripe, and recurring retainers",
      "Client collaboration portal with document sign-off and milestone tracking",
    ],
    outcome:
      "Replaced multi-vendor subscriptions with one centralized hub, lowering software expenditure by over 60% while reducing inbound prospect callback latency to under 15 seconds.",
  },
  {
    id: "proj-neuro-forge",
    slug: "neuro-forge",
    title: "Neuro Forge AI Studio",
    category: "AI & Intelligent Solutions",
    categories: [
      "AI & Intelligent Solutions",
      "Website & App Development",
    ],
    year: "2026",
    client: "TAGVERSE Internal Lab",
    summary:
      "Cognitive AI platform powering multi-agent reasoning, domain-specific retrieval-augmented generation (RAG), and deterministic workflow orchestration.",
    description:
      "Neuro Forge enables businesses to build, test, and deploy production-grade AI agents capable of querying unstructured knowledge bases, automating multi-step research, and executing real-world API tasks safely.",
    services: [
      "AI Agents & LLM Integration Services",
      "Vector Database Architecture (Pinecone/Milvus)",
      "Stateful Multi-Agent Swarm Design",
      "Enterprise Prompt Engineering & Guardrails",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "LangGraph",
      "OpenAI",
      "ChromaDB",
      "Next.js",
      "WebSockets",
    ],
    liveUrl: "/products/neuro-forge",
    url: "/products/neuro-forge",
    img: "/assets/images/insights/smart-suggestion-layer-2.webp",
    featured: true,
    order: 2,
    published: true,
    challenge:
      "Standard commercial LLMs frequently hallucinate when answering questions from internal company documents, lack state persistence across multi-turn interactions, and fail to interact reliably with enterprise databases and external APIs.",
    solution:
      "Engineered an enterprise agent runtime utilizing LangGraph cyclic state graphs, hybrid semantic chunking over private repositories, strict JSON schema validation, and citation-backed answer generation with automated human-in-the-loop escalation paths.",
    keyDeliverables: [
      "Hybrid dense & sparse vector retrieval pipeline with re-ranking filters",
      "Cyclic agent graph execution engine with memory checkpointing",
      "Interactive conversational web studio with real-time token streaming",
      "Telemetry dashboard tracking model latency, token economics, and confidence scores",
    ],
    outcome:
      "Achieved 96.4% factual accuracy on private enterprise knowledge benchmarks with an average query completion time of 1.2 seconds.",
  },
  {
    id: "proj-aurora-rebrand",
    slug: "aurora-rebrand",
    title: "Aurora Creative Rebrand & 3D Web",
    category: "Branding & Creative Design",
    categories: [
      "Branding & Creative Design",
      "Website & App Development",
    ],
    year: "2025",
    client: "Aurora Design Studio",
    summary:
      "Comprehensive visual identity overhaul, dynamic 3D web experience, and architectural portfolio for an avant-garde sustainable design studio.",
    description:
      "A complete brand repositioning merging minimalist Scandinavian typography, custom 3D web interactive models, and a high-performance portfolio website built to attract high-tier architectural commissions.",
    services: [
      "Branding & Creative Design",
      "3D Interactive Web Development",
      "Design Systems & Brand Guidelines",
      "Motion Graphics & Micro-interactions",
    ],
    technologies: [
      "Figma",
      "Three.js",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Cinema 4D",
    ],
    liveUrl: "/services/branding-design",
    url: "/services/branding-design",
    img: "/assets/images/home/stepped-feature-bg-2.webp",
    featured: true,
    order: 3,
    published: true,
    challenge:
      "The client's previous web presence was static, dated, and failed to communicate their cutting-edge architectural expertise, resulting in lost pitch opportunities for high-value international projects.",
    solution:
      "Created an immersive digital experience centered around interactive 3D spatial models, an editorial typographic grid, and dark-mode aesthetics that highlight architectural photography and material textures.",
    keyDeliverables: [
      "Complete visual brand identity system including logo, typography, and color palette",
      "Interactive 3D WebGL building explorer optimized for 60fps mobile performance",
      "CMS-backed dynamic project showcase with high-resolution imagery and blueprint views",
      "Comprehensive 80-page brand guidelines document for print and digital assets",
    ],
    outcome:
      "Client experienced a 180% surge in inbound enterprise design inquiries and was featured in multiple international digital design publications.",
  },
  {
    id: "proj-glowroot-scale",
    slug: "glowroot-scale",
    title: "GlowRoot Naturals Growth Scale",
    category: "Digital Marketing & Growth",
    categories: [
      "Digital Marketing & Growth",
      "E-commerce & Digital Platforms",
    ],
    year: "2025",
    client: "GlowRoot Naturals",
    summary:
      "Performance advertising, conversion rate optimization, and multi-channel growth architecture for an organic direct-to-consumer wellness brand.",
    description:
      "Scaled customer acquisition across Meta and Google Ads through iterative creative testing, high-converting offer angles, direct-response landing pages, and server-side conversion API attribution.",
    services: [
      "Performance Marketing & Paid Advertising",
      "Conversion Rate Optimization (CRO)",
      "Direct-Response Ad Creative Production",
      "GA4 & Server-Side Conversions API (CAPI)",
    ],
    technologies: [
      "Meta Ads Manager",
      "Google Ads & Performance Max",
      "Shopify Plus",
      "Triple Whale",
      "Google Analytics 4",
      "Klaviyo",
    ],
    liveUrl: "/services/performance-marketing",
    url: "/services/performance-marketing",
    img: "/assets/images/home/stepped-feature-bg-1.webp",
    featured: false,
    order: 4,
    published: true,
    challenge:
      "High customer acquisition costs (CAC) and post-iOS14 attribution inaccuracies were limiting the brand's ability to profitably scale paid media beyond ₹5,00,000 monthly ad spend.",
    solution:
      "Deployed a rigorous creative matrix testing 20+ hooks weekly, constructed dedicated pre-purchase advertorial landing pages, and implemented Meta Conversions API gateway with first-party server tracking.",
    keyDeliverables: [
      "Full-funnel Meta & Google Performance Max campaign restructuring",
      "High-converting direct-response landing page system with A/B split testing",
      "Server-side tracking infrastructure delivering 98% event match quality",
      "Automated SMS and email abandoned checkout retention sequences",
    ],
    outcome:
      "Scaled monthly brand revenue by 3.4x while maintaining a blended ROAS of 3.82 and lowering cost per acquisition by 31%.",
  },
  {
    id: "proj-pulseflow",
    slug: "pulseflow-automation",
    title: "PulseFlow Logistics Automation Swarm",
    category: "Automation & Integrations",
    categories: [
      "Automation & Integrations",
      "AI & Intelligent Solutions",
      "SaaS, CRM & Business Software",
    ],
    year: "2026",
    client: "PulseFlow Logistics",
    summary:
      "Zero-touch supply chain notification and consignment tracking ecosystem connecting warehouse ERPs, WhatsApp Business API, and automated dispatch alerts.",
    description:
      "Automated the end-to-end communication lifecycle for freight shipments by deploying custom n8n webhooks, AI document parsers for bills of lading, and instant customer WhatsApp notification bots.",
    services: [
      "Workflow Automation & API Integrations",
      "WhatsApp Chatbots & Business Automation",
      "Custom Webhook & Middleware Engineering",
      "AI Document Processing & Extraction",
    ],
    technologies: [
      "Self-Hosted n8n",
      "Meta WhatsApp Cloud API",
      "PostgreSQL",
      "Docker",
      "OpenAI Vision",
      "FastAPI",
    ],
    liveUrl: "/services/workflow-automation",
    url: "/services/workflow-automation",
    img: "/assets/images/home/stepped-feature-bg-3.webp",
    featured: false,
    order: 5,
    published: true,
    challenge:
      "Logistics operations teams spent over 25 hours per week manually typing shipment tracking updates, confirming delivery receipts, and answering repetitive 'Where is my order?' customer calls.",
    solution:
      "Engineered an automated middleware bridge linking the warehouse SQL database to Meta WhatsApp Cloud API. Integrated AI OCR to extract consignment numbers from scanned slips and trigger real-time milestone alerts.",
    keyDeliverables: [
      "Self-hosted n8n cluster running in Docker with automatic failover",
      "Interactive 2-way WhatsApp bot for tracking lookups and proof-of-delivery downloads",
      "Automated OCR extraction pipeline for supplier airway bills and manifests",
      "Real-time operations webhook alert system for delivery delays and exceptions",
    ],
    outcome:
      "Eliminated 88% of manual customer tracking enquiries and cut shipment status notification latency from 4 hours to under 8 seconds.",
  },
  {
    id: "proj-apex-commerce",
    slug: "apex-commerce",
    title: "Apex Commerce Headless Engine",
    category: "E-commerce & Digital Platforms",
    categories: [
      "E-commerce & Digital Platforms",
      "Website & App Development",
    ],
    year: "2025",
    client: "Apex Apparel Group",
    summary:
      "Sub-second headless e-commerce store with international multi-currency checkout, instant Algolia search, and dynamic visual storytelling.",
    description:
      "Built for a modern luxury streetwear label, replacing a monolithic storefront with a decoupled Next.js architecture connected to Shopify backend via GraphQL.",
    services: [
      "Website & Application Development",
      "Headless E-commerce Architecture",
      "Performance & Core Web Vitals Optimization",
      "Custom Payment Gateway Integration",
    ],
    technologies: [
      "Next.js Commerce",
      "Shopify Storefront API",
      "GraphQL",
      "Tailwind CSS",
      "Algolia",
      "Vercel Edge Network",
    ],
    liveUrl: "/services/web-development",
    url: "/services/web-development",
    img: "/assets/images/home/feature-card-1.webp",
    featured: false,
    order: 6,
    published: true,
    challenge:
      "The client's previous monolithic e-commerce store suffered from slow mobile load times (5.4s LCP), cart abandonment spikes during flash drops, and rigid design limitations.",
    solution:
      "Engineered a decoupled headless storefront with edge caching, optimistic cart updates, predictive product search, and smooth view transitions.",
    keyDeliverables: [
      "Blazing-fast Next.js frontend scoring 98 on Google PageSpeed Insights",
      "Global CDN edge caching with incremental static regeneration for 1,200+ SKUs",
      "Algolia instant search with typo-tolerance and faceted filtering",
      "Seamless Shopify checkout integration with multi-currency conversion",
    ],
    outcome:
      "Reduced mobile page load time to 0.7 seconds, resulting in a 24% uplift in overall store conversion rate during new collection drops.",
  },
  {
    id: "proj-podcast-live",
    slug: "tagverse-studio-live",
    title: "Tagverse Studio Live Sessions",
    category: "Video & Media Production",
    categories: [
      "Video & Media Production",
      "Branding & Creative Design",
    ],
    year: "2026",
    client: "TAGVERSE Media",
    summary:
      "Commercial video, multi-camera podcast production, and short-form social content distribution engineered in TAGVERSE's high-spec creative studio.",
    description:
      "A flagship content production initiative producing broadcast-quality interviews, executive leadership podcasts, and high-engagement social media reels for tech founders and creators.",
    services: [
      "Video, Podcast & Media Production",
      "Multi-Cam 4K Studio Recording",
      "Audio Engineering & Spatial Mastering",
      "Short-Form Video Post-Production & Hooks",
    ],
    technologies: [
      "Blackmagic Cinema 4K",
      "Shure SM7B",
      "DaVinci Resolve Studio",
      "Logic Pro X",
      "Descript",
      "Aputure Lighting",
    ],
    liveUrl: "/studio",
    url: "/studio",
    img: "/assets/images/home/poster-voice-experience.webp",
    featured: false,
    order: 7,
    published: true,
    challenge:
      "Founders and enterprise executives often struggle to produce consistent, high-fidelity media content due to acoustic limitations, complex multi-camera setups, and laborious editing turnarounds.",
    solution:
      "Provided an all-in-one studio recording and post-production workflow: sound-isolated recording bays, live 4K color grading, multi-track audio mastering, and 48-hour delivery of episodic content plus viral social cutdowns.",
    keyDeliverables: [
      "Multi-camera 4K podcast episodes formatted for YouTube and Spotify",
      "Over 40 vertical short-form reels with custom animated captions and sound effects",
      "Full episode audiograms and promotional media kits",
      "High-resolution still portrait photography for PR and editorial distribution",
    ],
    outcome:
      "Generated over 1.8M organic cross-platform views across YouTube, Instagram, and LinkedIn for client series within the first 60 days of launch.",
  },
  {
    id: "proj-tagverse-academy",
    slug: "tagverse-academy",
    title: "TAGVERSE Academy Ecosystem",
    category: "Website & App Development",
    categories: [
      "Website & App Development",
      "SaaS, CRM & Business Software",
    ],
    year: "2026",
    client: "TAGVERSE Technologies",
    summary:
      "Modern project-driven educational platform for emerging tech, featuring interactive curriculums, mentor booking, buildathon trackers, and admissions portals.",
    description:
      "Designed and developed a complete next-generation tech academy ecosystem offering interactive course explore pages, verified mentor directories, student project showcases, and automated enquiry pipelines.",
    services: [
      "Website & Application Development",
      "Interactive UI/UX Architecture",
      "Admissions & Form Automations",
      "Search Engine Optimization & Schema Architecture",
    ],
    technologies: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Schema.org JSON-LD",
      "Firebase",
    ],
    liveUrl: "/academy",
    url: "/academy",
    img: "/assets/images/insights/smart-suggestion-layer-3.webp",
    featured: false,
    order: 8,
    published: true,
    challenge:
      "Traditional online course portals are cluttered with generic video players and static PDFs. TAGVERSE Academy needed an interactive, developer-focused platform reflecting the motto 'From Learner to Builder'.",
    solution:
      "Built a high-performance web experience with dedicated course detail pages, interactive career path selectors, live buildathon calendar, terminal simulation widgets, and instant application forms.",
    keyDeliverables: [
      "Responsive course directory with filterable category chips and syllabus previews",
      "Dedicated course detail routes with sprint-by-sprint breakdowns and sticky CTAs",
      "Integrated orientation booking and application workflow connected to notification webhooks",
      "Student project showcase displaying representative capstone architectures",
    ],
    outcome:
      "Delivered a modern 58-route static-generated learning hub with sub-second page transitions and structured schema for maximum organic visibility.",
  },
];

export const PRODUCT_CATEGORIES = [
  "CRM Software",
  "ERP Software",
  "Billing & Invoicing Software",
  "Learning Management Systems (LMS)",
  "Custom SaaS Platforms",
] as const;

/**
 * TAGVERSE Internal Software Products (Separated from client services)
 */
export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "prod-vyra-crm",
    name: "VYRA CRM",
    category: "CRM Software",
    tagline: "High-velocity pipeline management and omnichannel lead nurture.",
    description: "Built for modern sales teams and agency operators to convert leads faster with integrated WhatsApp, email sequences, and AI deal scoring.",
    features: ["WhatsApp 2-Way Inbox", "Automated Lead Scoring", "Visual Pipeline Stages", "Quotation & Deal Tracking"],
    status: "live",
    demoUrl: "https://www.t4gverse.com/products/vyra-crm",
    img: "/assets/images/insights/smart-suggestion-layer-1.webp",
    order: 1,
  },
  {
    id: "prod-virtual-office",
    name: "TAGVERSE Virtual Office",
    category: "Custom SaaS Platforms",
    tagline: "Digital HQ, collaborative workspace & remote agency coordination.",
    description: "A centralized virtual operations platform for modern distributed teams with real-time status, meeting rooms, resource booking, and team analytics.",
    features: ["Virtual Meeting Pods", "Team Availability Heatmaps", "Client Collaboration Portals", "Resource Scheduler"],
    status: "live",
    demoUrl: "https://www.t4gverse.com/#contact",
    img: "/assets/images/home/stepped-feature-bg-2.webp",
    order: 2,
  },
  {
    id: "prod-neuro-forge",
    name: "Neuro Forge AI Studio",
    category: "Custom SaaS Platforms",
    tagline: "Autonomous multi-agent orchestration for brand intelligence.",
    description: "Deep research, sentiment tracking, and predictive trend modeling engine designed specifically for creative agencies and brand managers.",
    features: ["Multi-Agent Reasoning", "Real-Time Trend Sensing", "Brand Voice Guardrails", "Automated Copy Generation"],
    status: "live",
    demoUrl: "https://www.t4gverse.com/#contact",
    img: "/assets/images/insights/smart-suggestion-layer-2.webp",
    order: 3,
  },
  {
    id: "prod-tagverse-erp",
    name: "TAGVERSE Enterprise ERP",
    category: "ERP Software",
    tagline: "Unified operations, inventory, and cross-departmental resource planning.",
    description: "Tailor-made cloud ERP integrating procurement, multi-warehouse inventory, role-based employee workflows, and financial analytics.",
    features: ["Multi-Warehouse Inventory", "Role-Based Access Control", "Procurement & Purchase Orders", "Real-Time Executive Dashboards"],
    status: "prototype",
    demoUrl: "https://www.t4gverse.com/#contact",
    img: "/assets/images/home/stepped-feature-bg-1.webp",
    order: 4,
  },
  {
    id: "prod-tagverse-billing",
    name: "TAGVERSE Billing & Invoicing Engine",
    category: "Billing & Invoicing Software",
    tagline: "GST-compliant recurring subscriptions, estimates & automated payments.",
    description: "Automate retainer billing, milestone invoicing, GST calculation, reconciliation, and customer payment reminder sequences.",
    features: ["GST Invoicing & E-Way Bill", "Automated Payment Reminders", "Recurring Subscription Billing", "Payment Gateway Webhooks"],
    status: "prototype",
    demoUrl: "https://www.t4gverse.com/#contact",
    img: "/assets/images/home/stepped-feature-bg-2.webp",
    order: 5,
  },
  {
    id: "prod-tagverse-lms",
    name: "TAGVERSE LMS Platform",
    category: "Learning Management Systems (LMS)",
    tagline: "Interactive creator education, cohort courses & student management.",
    description: "Scalable learning management system powering online cohorts, certificate issuance, live masterclasses, and community engagement.",
    features: ["Cohort-Based Course Delivery", "Live Session Streaming", "Assignment Review Portal", "Student Certification"],
    status: "live",
    demoUrl: "https://www.t4gverse.com/#contact",
    img: "/assets/images/insights/smart-suggestion-layer-3.webp",
    order: 6,
  },
  {
    id: "prod-voice-agents",
    name: "TAGVERSE AI Voice Agents",
    category: "Custom SaaS Platforms",
    tagline: "Your AI Voice Workforce. Always Available.",
    description: "Intelligent AI-powered inbound, outbound and callback voice automation for businesses.",
    features: ["24/7 Inbound Call Handling", "Autonomous Outbound Prospecting", "Smart AI Callback & Missed Enquiries", "Real-Time Speech & CRM Sync"],
    status: "live",
    demoUrl: "https://www.t4gverse.com/products/ai-voice-agents",
    img: "/assets/images/home/poster-voice-experience.webp",
    order: 7,
  },
];

/**
 * Exactly 10 TAGVERSE Professional Client Services
 */
export const TAGVERSE_SERVICES = [
  {
    n: "01",
    id: "digital-marketing",
    title: "Digital Marketing & Social Media Management",
    body: "We run your brand presence like a compound growth engine — consistent high-retention content, sharp positioning, active community engagement, and data-backed channel execution.",
    points: [
      "Content calendars & strategy",
      "Reel & Short-form production",
      "Viral storytelling & copywriting",
      "Community management & listening",
      "Omnichannel growth analytics",
    ],
  },
  {
    n: "02",
    id: "performance-ads",
    title: "Performance Marketing & Paid Advertising (Meta, Google, YouTube, LinkedIn)",
    body: "Full-funnel performance advertising built around your target CAC and ROAS. We blend high-converting creative hooks with machine-learning bidding strategies to scale profitably.",
    points: [
      "Meta Ads (Facebook & Instagram)",
      "Google Search & Performance Max",
      "YouTube Video Action Campaigns",
      "LinkedIn B2B Account Targeting",
      "Conversion API & CBO optimization",
    ],
  },
  {
    n: "03",
    id: "brand-identity",
    title: "Branding & Creative Design",
    body: "We craft iconic visual identities and comprehensive design systems that turn casual observers into devoted brand evangelists across digital and physical touchpoints.",
    points: [
      "Brand positioning & narrative",
      "Logo suites & typography",
      "Design systems & brand guides",
      "Packaging & retail creative",
      "3D brand assets & iconography",
    ],
  },
  {
    n: "04",
    id: "web-app-dev",
    title: "Website & Application Development",
    body: "From lightning-fast marketing landing pages to full-scale web applications. Engineered on Next.js, React, and modern cloud architecture for maximum conversion and sub-second load times.",
    points: [
      "Custom Next.js & React builds",
      "Tailwind CSS & responsive UI",
      "Interactive 3D / WebGL experiences",
      "E-commerce & Shopify headless",
      "Core Web Vitals & speed tuning",
    ],
  },
  {
    n: "05",
    id: "ai-agents-llm",
    title: "AI Agents & LLM Integration Services",
    body: "Deploy intelligent autonomous agents that handle complex enterprise workflows — automated customer support, semantic document intelligence, and AI-powered marketing assistants.",
    points: [
      "Custom LangChain & LLM swarms",
      "RAG & knowledge base indexing",
      "Autonomous lead qualification agents",
      "Voice & multimodal AI assistants",
      "Enterprise security guardrails",
    ],
  },
  {
    n: "06",
    id: "n8n-webhooks",
    title: "Workflow Automation & API Integrations (n8n, webhooks)",
    body: "Connect your entire tech stack into a synchronized, zero-touch machine. We build fault-tolerant n8n workflows, custom webhook pipelines, and automatic data synchronization.",
    points: [
      "Self-hosted n8n workflow design",
      "Custom webhook ingestion & retry",
      "Cross-platform CRM & database sync",
      "Real-time event-driven notifications",
      "Automated reporting & ETL pipelines",
    ],
  },
  {
    n: "07",
    id: "whatsapp-chatbots",
    title: "WhatsApp Chatbots & Business Automation",
    body: "Turn WhatsApp into your primary conversion and customer support channel with official WhatsApp Cloud API bots, automated drip sequences, and instant booking confirmations.",
    points: [
      "Official WhatsApp Cloud API setup",
      "Interactive 24/7 conversational bots",
      "Automated lead nurturing & broadcasts",
      "Booking & payment confirmations",
      "CRM 2-way conversation syncing",
    ],
  },
  {
    n: "08",
    id: "seo-aeo-geo",
    title: "SEO, AEO & GEO Optimization",
    body: "Dominate organic search in the age of AI. We optimize your brand not just for Google Search, but for Answer Engines (Perplexity, ChatGPT Search) and Generative Search Engines (Google AI Overviews).",
    points: [
      "Technical & semantic SEO audits",
      "Answer Engine Optimization (AEO)",
      "Generative Engine Optimization (GEO)",
      "Rich snippet & Schema.org markup",
      "High-authority PR backlink strategy",
    ],
  },
  {
    n: "09",
    id: "video-podcast-studio",
    title: "Video, Podcast & Media Production",
    body: "Full-service visual production from our state-of-the-art studio in Chennai. Multi-camera 4K podcast setups, commercial shoots, brand films, and high-tempo social reels editing.",
    points: [
      "Multi-camera podcast studio rental",
      "Commercial brand films & shoots",
      "Cinematic color grading & VFX",
      "Podcast distribution & audiograms",
      "Rapid-turnaround social reel editing",
    ],
  },
  {
    n: "10",
    id: "influencer-management",
    title: "Influencer, Creator & Model Management",
    body: "Connect your brand with high-affinity creators and models who genuinely resonate with your audience. We manage matchmaking, briefs, contracting, compliance, and ROI attribution.",
    points: [
      "Curated creator roster & matching",
      "UGC creator sourcing & direction",
      "Contracting, rights & usage terms",
      "Campaign coordination & review",
      "Influencer sales tracking & attribution",
    ],
  },
];
