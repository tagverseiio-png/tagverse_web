export interface ProductDetailItem {
  id: string;
  slug: string;
  aliases?: string[];
  name: string;
  category: string;
  categorySlug: string;
  tagline: string;
  status: "live" | "prototype" | "upcoming";
  eyebrow: string;
  overview: string;
  longDescription: string;
  heroImage: string;
  metrics: { label: string; value: string }[];
  keyFeatures: {
    title: string;
    description: string;
  }[];
  modules: {
    name: string;
    description: string;
    capabilities: string[];
  }[];
  architecture: {
    title: string;
    description: string;
  }[];
  specs: {
    deployment: string;
    stack: string[];
    integrations: string[];
    compliance: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedProductSlugs: string[];
}

export interface ProductCategoryInfo {
  name: string;
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  heroImage: string;
}

export const PRODUCT_CATEGORIES_DATA: Record<string, ProductCategoryInfo> = {
  crm: {
    name: "CRM Software",
    slug: "crm",
    eyebrow: "TAGVERSE ENTERPRISE SUITE",
    title: "High-Velocity Sales CRM & Lead Acceleration",
    description:
      "Transform disparate customer touches into predictable, revenue-generating pipeline momentum. Built for high-growth agencies, B2B sales teams, and direct-to-consumer businesses with integrated WhatsApp, automatic deal scoring, and omnichannel sequence automation.",
    features: [
      "Omnichannel WhatsApp 2-Way Inbox",
      "Kanban Deal Pipeline & Velocity Analytics",
      "Automated Drip Follow-ups & SLA Triggers",
      "Seamless Razorpay & Stripe Checkout Links",
    ],
    heroImage: "/assets/images/insights/smart-suggestion-layer-1.webp",
  },
  erp: {
    name: "ERP Software",
    slug: "erp",
    eyebrow: "TAGVERSE ENTERPRISE SUITE",
    title: "Unified Cloud ERP & Operational Resource Planning",
    description:
      "Eliminate departmental silos with an integrated operations hub. Seamlessly manage procurement, multi-warehouse stock allocations, employee access control, and executive financials from a unified, modern web portal.",
    features: [
      "Multi-Warehouse Inventory & SKU Tracking",
      "Role-Based Access Control & Departmental Approvals",
      "Vendor Procurement & Automated Purchase Orders",
      "Real-Time P&L and Executive Balance Dashboards",
    ],
    heroImage: "/assets/images/home/stepped-feature-bg-1.webp",
  },
  billing: {
    name: "Billing & Invoicing Software",
    slug: "billing",
    eyebrow: "TAGVERSE ENTERPRISE SUITE",
    title: "GST-Compliant Automated Invoicing & Subscriptions",
    description:
      "Streamline client billing from estimate to bank reconciliation. Generate GST-compliant invoices in one click, automate recurring retainer collection, and trigger automated WhatsApp payment reminder sequences.",
    features: [
      "GST E-Way & Tax Compliance Ready",
      "Automated Milestone & Retainer Subscriptions",
      "Smart WhatsApp & Email Payment Reminders",
      "Real-Time Bank & Gateway Reconciliation",
    ],
    heroImage: "/assets/images/home/stepped-feature-bg-2.webp",
  },
  lms: {
    name: "Learning Management Systems (LMS)",
    slug: "lms",
    eyebrow: "TAGVERSE ENTERPRISE SUITE",
    title: "Cohort-Based Creator Academies & Digital Learning",
    description:
      "Monetize knowledge and train high-performing teams with interactive cohort learning portals. Features seamless video DRM protection, assignment submissions, automated certification, and live stream masterclass integration.",
    features: [
      "Cohort Schedule & Drip Module Access",
      "DRM-Protected Video Player & Live Streaming",
      "Interactive Assignment Submission & Grading",
      "Automated Verifiable Digital Certificates",
    ],
    heroImage: "/assets/images/insights/smart-suggestion-layer-3.webp",
  },
  "custom-saas": {
    name: "Custom SaaS Platforms",
    slug: "custom-saas",
    eyebrow: "TAGVERSE ENTERPRISE SUITE",
    title: "Tailored Multi-Tenant Cloud SaaS & AI Engines",
    description:
      "Bespoke software platforms engineered to solve unique organizational challenges. From internal virtual office hubs to predictive multi-agent intelligence studios, we architect high-throughput applications ready to scale to millions of users.",
    features: [
      "Multi-Tenant Isolation & Role Security",
      "High-Throughput Microservice Architecture",
      "Integrated Autonomous AI Agent Capabilities",
      "Enterprise White-Label Customization",
    ],
    heroImage: "/assets/images/insights/smart-suggestion-layer-2.webp",
  },
};

export const PRODUCTS_DATA: ProductDetailItem[] = [
  {
    id: "prod-vyra-crm",
    slug: "vyra-crm",
    name: "VYRA CRM",
    category: "CRM Software",
    categorySlug: "crm",
    tagline: "High-velocity pipeline management and omnichannel lead nurture.",
    status: "live",
    eyebrow: "ENTERPRISE CRM PLATFORM",
    overview:
      "VYRA CRM is engineered specifically for modern sales teams and agency operators who cannot afford missed follow-ups. Unifying official WhatsApp messaging, visual deal boards, lead scoring, and automated reminders into one interface.",
    longDescription:
      "Traditional CRMs are clunky, bloated, and ignored by sales reps. VYRA CRM replaces friction with speed. With native WhatsApp Cloud API integration, your sales team can reply to high-intent leads within seconds of form submission. Visual Kanban pipelines give founders and sales directors instant visibility into deal velocity, lost stages, and forecasted monthly revenue.",
    heroImage: "/assets/images/insights/smart-suggestion-layer-1.webp",
    metrics: [
      { label: "Lead Response Time", value: "< 10 Seconds" },
      { label: "Close Rate Lift", value: "+38%" },
      { label: "Omnichannel Inbox", value: "WhatsApp + Email" },
    ],
    keyFeatures: [
      {
        title: "Omnichannel WhatsApp 2-Way Inbox",
        description: "Engage prospects directly from desktop with official WhatsApp Cloud API templates and live chat.",
      },
      {
        title: "Visual Kanban Deal Pipelines",
        description: "Drag-and-drop opportunity cards across customized stages with automated trigger actions.",
      },
      {
        title: "Algorithmic Deal Scoring",
        description: "Automatically prioritize leads based on engagement, budget, company size, and response velocity.",
      },
      {
        title: "One-Click Quotations & Checkout",
        description: "Generate branded estimates and collect advances instantly via Razorpay/Stripe payment links.",
      },
    ],
    modules: [
      {
        name: "Lead Ingestion & Routing",
        description: "Auto-ingest leads from Meta Ads, Google Ads, website forms, and WhatsApp with round-robin rep distribution.",
        capabilities: ["Instant Webhook Ingestion", "Round-Robin Assignment", "Duplicate Lead Deduplication", "UTM Tracking Preservation"],
      },
      {
        name: "Communications Hub",
        description: "Centralized inbox combining WhatsApp threads, emails, and internal sales rep collaboration notes.",
        capabilities: ["Shared Team Number", "Pre-approved Quick Replies", "Audio Note Transcription", "Automated Drip Follow-ups"],
      },
      {
        name: "Analytics & Forecasting",
        description: "Actionable executive reporting detailing rep conversion rates, pipeline value, and bottleneck stages.",
        capabilities: ["Stage Drop-off Analysis", "Weighted Revenue Forecast", "Rep Activity Leaderboard", "Export to CSV/PDF"],
      },
    ],
    architecture: [
      {
        title: "Serverless Edge Cloud",
        description: "Deployed on Next.js edge runtime with sub-second page rendering and instant state updates.",
      },
      {
        title: "Official Meta API Tier",
        description: "Built on high-volume WhatsApp Cloud API with encrypted webhooks and 99.9% uptime SLA.",
      },
    ],
    specs: {
      deployment: "Managed Cloud or Private VPC Dedicated Instance",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase / Firestore", "WhatsApp Cloud API"],
      integrations: ["Meta Ads", "Google Ads", "Razorpay", "Stripe", "n8n", "Slack"],
      compliance: "SOC-2 Ready, GDPR Compliant Data Encryption at Rest",
    },
    faqs: [
      {
        question: "Can we use our existing WhatsApp business phone number?",
        answer: "Yes. You can onboard your existing corporate number or set up a new dedicated sales hotline using the official Meta WhatsApp Cloud API.",
      },
      {
        question: "How many sales representatives can use VYRA CRM simultaneously?",
        answer: "VYRA CRM supports unlimited seats with granular role-based permissions (Admins, Team Leads, Sales Reps, and View-Only observers).",
      },
      {
        question: "Can VYRA CRM connect with our existing landing pages?",
        answer: "Yes! VYRA CRM provides simple REST webhooks and embeddable JavaScript forms compatible with Webflow, WordPress, Next.js, and Shopify.",
      },
    ],
    relatedProductSlugs: ["tagverse-enterprise-erp", "tagverse-billing-engine", "tagverse-virtual-office"],
  },
  {
    id: "prod-virtual-office",
    slug: "tagverse-virtual-office",
    aliases: ["virtual-office"],
    name: "TAGVERSE Virtual Office",
    category: "Custom SaaS Platforms",
    categorySlug: "custom-saas",
    tagline: "Digital HQ, collaborative workspace & remote agency coordination.",
    status: "live",
    eyebrow: "COLLABORATIVE DIGITAL HQ",
    overview:
      "A centralized virtual operations platform for modern distributed teams with real-time status heatmaps, meeting pods, client collaboration portals, and automated resource scheduling.",
    longDescription:
      "Remote work shouldn't mean disconnected teams. TAGVERSE Virtual Office creates a dynamic digital floor where teammates can drop into audio/video huddle pods, view who is actively coding or designing, schedule shared studio resources, and host interactive client presentations in branded digital suites.",
    heroImage: "/assets/images/home/stepped-feature-bg-2.webp",
    metrics: [
      { label: "Meeting Latency Drop", value: "-60%" },
      { label: "Team Presence", value: "Real-Time" },
      { label: "Resource Utilization", value: "+45%" },
    ],
    keyFeatures: [
      {
        title: "Virtual Meeting Pods & Huddles",
        description: "Spontaneous one-click audio and video breakout rooms with low-latency WebRTC streams.",
      },
      {
        title: "Team Availability Heatmaps",
        description: "At-a-glance visibility into who is deep in focus, in a meeting, or available for quick questions.",
      },
      {
        title: "Branded Client Collaboration Portals",
        description: "Secure client guest rooms with live project dashboards, design reviews, and approval buttons.",
      },
      {
        title: "Studio & Hardware Resource Scheduler",
        description: "Prevent scheduling conflicts for physical podcast studios, edit suites, and shared camera equipment.",
      },
    ],
    modules: [
      {
        name: "Virtual Floorplan & Audio Pods",
        description: "Spatial audio huddles that bring the natural spontaneity of physical offices to remote work.",
        capabilities: ["Proximity Audio", "Screen Sharing HD 60fps", "Whiteboard Canvas", "Private Meeting Locks"],
      },
      {
        name: "Operations Dashboard",
        description: "Integrated status updates, team announcements, daily standup check-ins, and focus time tracking.",
        capabilities: ["Async Daily Check-ins", "Timezone Sync", "Deep Focus Do-Not-Disturb", "Calendar Integration"],
      },
    ],
    architecture: [
      {
        title: "Low-Latency WebRTC Mesh",
        description: "Peer-to-peer and SFU video/audio streams with adaptive bitrate scaling for ultra-smooth collaboration.",
      },
      {
        title: "Enterprise SSO & Role Security",
        description: "Google Workspace / SAML single sign-on with multi-tenant company partitions.",
      },
    ],
    specs: {
      deployment: "Cloud Multi-Tenant or Dedicated Enterprise Subdomain",
      stack: ["Next.js", "WebRTC", "Socket.io", "Tailwind CSS", "Redis"],
      integrations: ["Google Calendar", "Slack", "Notion", "Figma", "Zoom"],
      compliance: "End-to-End Encrypted Media Streams, ISO-27001 Aligned",
    },
    faqs: [
      {
        question: "Does this require installing heavy desktop software?",
        answer: "No. TAGVERSE Virtual Office runs entirely inside any modern web browser (Chrome, Safari, Edge, Firefox) with optional Progressive Web App (PWA) installation.",
      },
      {
        question: "Can external clients join without creating an account?",
        answer: "Yes. You can generate secure, password-protected guest links allowing clients to enter specific presentation rooms in one click.",
      },
    ],
    relatedProductSlugs: ["neuro-forge", "vyra-crm", "tagverse-lms-platform"],
  },
  {
    id: "prod-neuro-forge",
    slug: "neuro-forge",
    aliases: ["neuro-forge-ai"],
    name: "Neuro Forge AI Studio",
    category: "Custom SaaS Platforms",
    categorySlug: "custom-saas",
    tagline: "Autonomous multi-agent orchestration for brand intelligence.",
    status: "live",
    eyebrow: "AI AGENT ORCHESTRATION SUITE",
    overview:
      "Deep research, sentiment tracking, and predictive trend modeling engine designed specifically for creative agencies, brand strategists, and performance marketers.",
    longDescription:
      "Neuro Forge AI Studio is our proprietary multi-agent intelligence platform. It coordinates specialized autonomous LLM agents to continuously monitor social conversations, reverse-engineer viral video hooks, track competitor positioning, and generate brand-compliant creative assets with verifiable guardrails.",
    heroImage: "/assets/images/insights/smart-suggestion-layer-2.webp",
    metrics: [
      { label: "Research Speedup", value: "10x" },
      { label: "Trend Detection Window", value: "< 2 Hours" },
      { label: "Agent Orchestration", value: "Swarm-Based" },
    ],
    keyFeatures: [
      {
        title: "Multi-Agent Reasoning Swarms",
        description: "Chained AI agents cross-verifying facts, sentiment, and creative briefs before output.",
      },
      {
        title: "Real-Time Trend Sensing",
        description: "Scrapes emerging audio, topics, and narrative hooks across TikTok, X, and YouTube in real time.",
      },
      {
        title: "Brand Voice Guardrails",
        description: "Strict vector constraints ensuring generated copy matches brand tone, avoiding generic AI clichés.",
      },
      {
        title: "Automated Creative Scripting",
        description: "Outputs complete video storyboards with visual direction, teleprompter text, and audio cues.",
      },
    ],
    modules: [
      {
        name: "Trend Ingestion Engine",
        description: "Aggregates millions of social posts to detect early viral signals before they saturate mainstream feeds.",
        capabilities: ["Viral Velocity Scoring", "Hook Audio Tracking", "Competitor Sentiment Drift", "Category Tagging"],
      },
      {
        name: "Agent Canvas Workspace",
        description: "Visual node-based canvas to connect specialized research, drafting, and critique agents.",
        capabilities: ["Interactive Node Editor", "Custom Tool Binding", "Human-in-the-Loop Reviews", "Version History"],
      },
    ],
    architecture: [
      {
        title: "Hybrid Vector Search",
        description: "Dense embedding and BM25 sparse keyword retrieval for high-accuracy brand knowledge recall.",
      },
      {
        title: "Dynamic Model Routing",
        description: "Smart router sending quick tasks to lightweight models and deep reasoning tasks to frontier LLMs.",
      },
    ],
    specs: {
      deployment: "Managed SaaS or Private Enterprise VPC",
      stack: ["Python", "FastAPI", "Next.js", "LangGraph", "Qdrant", "Claude 3.5 Sonnet", "GPT-4o"],
      integrations: ["OpenAI", "Anthropic", "Notion", "Google Docs", "Airtable"],
      compliance: "Zero Training Retention on Proprietary Client Data",
    },
    faqs: [
      {
        question: "Can we train the agents on our proprietary brand guidelines?",
        answer: "Yes. You can upload PDF brand decks, past winning copy, and company manuals into your private workspace vector database.",
      },
      {
        question: "Is our client data shared or used to train public models?",
        answer: "Never. All inference runs through enterprise zero-data-retention APIs and isolated customer database tenants.",
      },
    ],
    relatedProductSlugs: ["tagverse-virtual-office", "tagverse-ai", "vyra-crm"],
  },
  {
    id: "prod-tagverse-erp",
    slug: "tagverse-enterprise-erp",
    aliases: ["tagverse-erp"],
    name: "TAGVERSE Enterprise ERP",
    category: "ERP Software",
    categorySlug: "erp",
    tagline: "Unified operations, inventory, and cross-departmental resource planning.",
    status: "prototype",
    eyebrow: "ENTERPRISE CLOUD ERP",
    overview:
      "A tailor-made cloud ERP integrating procurement, multi-warehouse inventory, role-based employee workflows, and real-time financial analytics into one frictionless modern interface.",
    longDescription:
      "Legacy ERP software like SAP or Oracle is painfully slow, outdated, and requires months of training. TAGVERSE Enterprise ERP delivers high-velocity operational control built with the speed and elegance of modern web software. Track inventory in real time across multiple facilities, manage vendor POs, approve department expenditures, and generate executive P&L statements in seconds.",
    heroImage: "/assets/images/home/stepped-feature-bg-1.webp",
    metrics: [
      { label: "Inventory Accuracy", value: "99.8%" },
      { label: "Procurement Cycle", value: "-50%" },
      { label: "Onboarding Time", value: "< 2 Weeks" },
    ],
    keyFeatures: [
      {
        title: "Multi-Warehouse Inventory Tracking",
        description: "Live stock levels, batch/lot tracking, barcode scanning, and automated reorder alerts.",
      },
      {
        title: "Procurement & Purchase Order Workflows",
        description: "Vendor quotations, 3-way PO matching, approval hierarchies, and delivery verification.",
      },
      {
        title: "Role-Based Access Governance",
        description: "Granular permissions restricting financial data, inventory edits, and procurement by department.",
      },
      {
        title: "Executive Financial Dashboard",
        description: "Real-time P&L reporting, department cash burn, outstanding liabilities, and margins.",
      },
    ],
    modules: [
      {
        name: "Supply Chain & Warehousing",
        description: "End-to-end inbound and outbound shipping management with transfer order tracking.",
        capabilities: ["SKU Level Tracking", "Barcode & QR Scanning", "Low Stock Thresholds", "Inter-warehouse Transfers"],
      },
      {
        name: "Finance & Accounts Payable",
        description: "Automated vendor bill reconciliation, expense claims, and tax breakdown reports.",
        capabilities: ["3-Way Matching", "Vendor Ledger", "Expense Reimbursements", "Bank Reconciliation"],
      },
    ],
    architecture: [
      {
        title: "ACID Transactional Database",
        description: "Built on enterprise PostgreSQL with strict row-level security and point-in-time recovery.",
      },
      {
        title: "Event-Driven Microservices",
        description: "Asynchronous job queues handling high-volume inventory syncs and automated batch jobs.",
      },
    ],
    specs: {
      deployment: "Private Cloud / Dedicated On-Premise Docker Cluster",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Redis"],
      integrations: ["Tally", "Zoho Books", "Shopify", "SAP Connector", "Razorpay"],
      compliance: "Full Audit Trail Logging, Indian GST E-Way Bill Ready",
    },
    faqs: [
      {
        question: "Can this ERP integrate with Tally or Zoho Books?",
        answer: "Yes, our ERP includes bi-directional export/import adapters and API connectors to synchronize ledgers with Tally and Zoho Books.",
      },
      {
        question: "Is the system customizable to our manufacturing or retail process?",
        answer: "Because we own and engineer the core platform, our engineering squad can tailor custom workflow stages, custom fields, and reports to your exact operational model.",
      },
    ],
    relatedProductSlugs: ["tagverse-billing-engine", "vyra-crm"],
  },
  {
    id: "prod-tagverse-billing",
    slug: "tagverse-billing-engine",
    aliases: ["tagverse-billing"],
    name: "TAGVERSE Billing & Invoicing Engine",
    category: "Billing & Invoicing Software",
    categorySlug: "billing",
    tagline: "GST-compliant recurring subscriptions, estimates & automated payments.",
    status: "prototype",
    eyebrow: "REVENUE & INVOICING AUTOMATION",
    overview:
      "Automate retainer billing, milestone invoicing, GST calculation, reconciliation, and customer payment reminder sequences without chasing overdue payments manually.",
    longDescription:
      "Delayed client payments drain cash flow. TAGVERSE Billing & Invoicing Engine transforms invoicing into an automated pipeline. Convert accepted proposals into compliant GST tax invoices, collect recurring monthly agency retainers automatically, and let intelligent WhatsApp reminders nudge clients politely until payment is completed.",
    heroImage: "/assets/images/home/stepped-feature-bg-2.webp",
    metrics: [
      { label: "Days Sales Outstanding", value: "-40%" },
      { label: "Payment Success Rate", value: "99.1%" },
      { label: "GST Compliance", value: "100% Automated" },
    ],
    keyFeatures: [
      {
        title: "GST Invoicing & E-Way Generation",
        description: "Automatic HSN/SAC code mapping, CGST/SGST/IGST breakdown, and IRN invoice signing.",
      },
      {
        title: "Automated Payment Reminders",
        description: "Intelligent multi-channel reminders on WhatsApp and Email before, on, and after due dates.",
      },
      {
        title: "Recurring Retainer Subscriptions",
        description: "Automated recurring card and e-mandate charging for ongoing monthly service contracts.",
      },
      {
        title: "One-Click Payment Gateway Integration",
        description: "Embedded instant payment links with Razorpay, Cashfree, and Stripe support.",
      },
    ],
    modules: [
      {
        name: "Estimate to Invoice Pipeline",
        description: "Send interactive quotes that clients sign digitally, automatically generating the active invoice.",
        capabilities: ["Digital Signature", "Milestone Payments", "Automated PDF Delivery", "Credit Notes & Refunds"],
      },
      {
        name: "Collections & Dunning Automation",
        description: "Configurable escalation schedules sending friendly WhatsApp alerts and automated receipts.",
        capabilities: ["WhatsApp Template Triggers", "Late Fee Calculations", "Payment Gateway Webhook Sync", "Live Bank Reconciliation"],
      },
    ],
    architecture: [
      {
        title: "Bank-Grade Encryption",
        description: "TLS 1.3 in transit and AES-256 at rest with tokenized payment gateway credentials.",
      },
      {
        title: "Webhook Real-Time Ingestion",
        description: "Instantaneous settlement reconciliation when customers pay via UPI, cards, or netbanking.",
      },
    ],
    specs: {
      deployment: "SaaS Cloud Portal or Private Agency Subdomain",
      stack: ["Next.js", "Node.js", "PostgreSQL", "Razorpay APIs", "Tailwind CSS"],
      integrations: ["Razorpay", "Stripe", "Cashfree", "WhatsApp Cloud API", "VYRA CRM"],
      compliance: "RBI E-Mandate Guidelines & GST Tax Invoicing Standards",
    },
    faqs: [
      {
        question: "Does it support Indian GST and international foreign currency billing?",
        answer: "Yes! The system handles INR billing with full CGST/SGST/IGST tax breakdowns as well as USD/EUR/AED foreign currency invoicing with custom exchange rates.",
      },
      {
        question: "How do WhatsApp payment reminders work?",
        answer: "The platform triggers official WhatsApp utility templates with a secure payment link 3 days before due date, on the due date, and every 3 days if overdue.",
      },
    ],
    relatedProductSlugs: ["vyra-crm", "tagverse-enterprise-erp"],
  },
  {
    id: "prod-tagverse-lms",
    slug: "tagverse-lms-platform",
    aliases: ["tagverse-lms"],
    name: "TAGVERSE LMS Platform",
    category: "Learning Management Systems (LMS)",
    categorySlug: "lms",
    tagline: "Interactive creator education, cohort courses & student management.",
    status: "live",
    eyebrow: "CREATOR EDUCATION & LMS",
    overview:
      "A scalable learning management system powering online cohorts, certificate issuance, live masterclasses, and community engagement for modern digital academies.",
    longDescription:
      "Built on the engine powering our own TAGVERSE Academy, this LMS is engineered for creators, corporate trainers, and coaching institutes. Deliver high-retention video lessons with DRM protection, host interactive live Q&As, grade practical student assignments, and issue verifiable digital credentials automatically upon course completion.",
    heroImage: "/assets/images/insights/smart-suggestion-layer-3.webp",
    metrics: [
      { label: "Course Completion Rate", value: "78%" },
      { label: "Video DRM Protection", value: "Enterprise" },
      { label: "Active Learners", value: "1,500+" },
    ],
    keyFeatures: [
      {
        title: "Cohort-Based Course Delivery",
        description: "Drip content modules by week or milestone, keeping student cohorts focused and engaged.",
      },
      {
        title: "DRM-Protected Video Streaming",
        description: "Dynamic watermarking and encrypted HLS video streams preventing unauthorized recording.",
      },
      {
        title: "Assignment Review & Grading Portal",
        description: "Review submissions, provide audio/text feedback, and track student mastery scores.",
      },
      {
        title: "Verifiable Digital Certificates",
        description: "Automated generation of tamper-proof certificates with QR verification links for LinkedIn.",
      },
    ],
    modules: [
      {
        name: "Student Learning Experience",
        description: "Distraction-free video player, dark mode lesson viewer, downloadable resources, and quizzes.",
        capabilities: ["Playback Speed Controls", "Discussion Boards", "Bookmark Notes", "Mobile Responsive Viewer"],
      },
      {
        name: "Instructor & Cohort Admin",
        description: "Manage enrollments, broadcast announcements to cohorts, track drop-off heatmaps, and issue certificates.",
        capabilities: ["Cohort Schedule Builder", "Drop-Off Analytics", "Bulk Student Invitations", "Razorpay Checkout Integration"],
      },
    ],
    architecture: [
      {
        title: "Encrypted HLS Video Delivery",
        description: "Adaptive bitrate video streaming via Cloudflare Stream with dynamic viewer watermarks.",
      },
      {
        title: "Edge Cached Static Assets",
        description: "Sub-second global lesson loading backed by edge CDN points of presence.",
      },
    ],
    specs: {
      deployment: "Managed White-Label SaaS or Dedicated Subdomain",
      stack: ["Next.js", "React", "Cloudflare Stream", "Firebase", "Tailwind CSS"],
      integrations: ["Zoom", "Razorpay", "WhatsApp Cloud API", "Google Sheets", "Vimeo OTT"],
      compliance: "DRM Media Encryption, Student Data Privacy Standards",
    },
    faqs: [
      {
        question: "Can we use our own custom domain and branding?",
        answer: "Yes, 100%. The LMS runs under your custom domain (e.g., learn.yourbrand.com) with your logos, custom colors, and branding.",
      },
      {
        question: "How are video lessons protected from piracy?",
        answer: "We employ dynamic video watermarking that overlays each logged-in student's email/IP across the video, combined with encrypted HLS tokenized streaming.",
      },
    ],
    relatedProductSlugs: ["tagverse-virtual-office", "neuro-forge"],
  },
  {
    id: "prod-tagverse-ai",
    slug: "tagverse-ai",
    aliases: ["tagverse-ai-solutions"],
    name: "TAGVERSE AI Automation Solutions",
    category: "Custom SaaS Platforms",
    categorySlug: "custom-saas",
    tagline: "Custom enterprise AI assistants, RAG pipelines, and autonomous business workflows.",
    status: "live",
    eyebrow: "ENTERPRISE AI PLATFORM",
    overview:
      "End-to-end proprietary AI solutions bridging unstructured enterprise documents, CRM pipelines, and automated client interactions into intelligent business operations.",
    longDescription:
      "TAGVERSE AI Automation Solutions are tailored enterprise software modules that embed deep AI reasoning directly into your existing company infrastructure. We build customized customer intake bots, internal semantic knowledge search engines, and multi-step cognitive pipelines that automate days of repetitive manual work into milliseconds.",
    heroImage: "/assets/images/insights/smart-suggestion-layer-2.webp",
    metrics: [
      { label: "Manual Work Reduced", value: "80%" },
      { label: "Inference Latency", value: "< 1s" },
      { label: "Enterprise Security", value: "Zero Retention" },
    ],
    keyFeatures: [
      {
        title: "Enterprise Document Intelligence",
        description: "Extract structured data from invoices, contracts, receipts, and reports with zero manual typing.",
      },
      {
        title: "Semantic Vector Search & RAG",
        description: "Ask questions in natural language and get exact verified answers cited directly from company policies.",
      },
      {
        title: "Conversational Voice & Chat Agents",
        description: "Customer-facing agents that qualify inbound leads, answer technical questions, and book meetings.",
      },
      {
        title: "Custom LLM Fine-Tuning & Evaluation",
        description: "Fine-tuned models customized on your industry terminology with deterministic safety guardrails.",
      },
    ],
    modules: [
      {
        name: "Cognitive Document Ingestion",
        description: "Process thousands of PDFs, spreadsheets, and emails into standardized JSON schemas.",
        capabilities: ["OCR Extraction", "Table Parsing", "Entity Extraction", "Discrepancy Highlighting"],
      },
      {
        name: "Enterprise Agent Hub",
        description: "Deploy internal AI assistants connected directly to your Slack, Microsoft Teams, or web portals.",
        capabilities: ["Knowledge Base Linking", "Role-Based Data Access", "Usage Analytics", "Audit Logs"],
      },
    ],
    architecture: [
      {
        title: "High-Throughput Vector Storage",
        description: "Distributed Qdrant / Pinecone vector indexes for real-time semantic retrieval.",
      },
      {
        title: "Secure API Gateways",
        description: "Reverse proxies enforcing token limits, prompt-injection defenses, and rate limiting.",
      },
    ],
    specs: {
      deployment: "Managed SaaS or Private On-Premise GPU/VPC Cluster",
      stack: ["Next.js", "Python", "LangChain", "OpenAI", "Anthropic", "PostgreSQL"],
      integrations: ["Slack", "HubSpot", "Salesforce", "Google Drive", "Notion"],
      compliance: "Zero Training Data Retention, SOC-2 Ready Data Protection",
    },
    faqs: [
      {
        question: "How long does a custom AI automation deployment take?",
        answer: "A targeted document extraction or customer knowledge bot is typically deployed into production within 2 to 3 weeks.",
      },
      {
        question: "Can these AI tools operate completely behind our internal firewall?",
        answer: "Yes, we support private VPC deployments and self-hosted open-source models (Llama 3, Mistral) for clients with strict data localization mandates.",
      },
    ],
    relatedProductSlugs: ["neuro-forge", "vyra-crm", "tagverse-enterprise-erp"],
  },
  {
    id: "prod-voice-agents",
    slug: "ai-voice-agents",
    aliases: ["tagverse-voice-agents", "voice-agents", "tagverse-ai-voice-agents"],
    name: "TAGVERSE AI Voice Agents",
    category: "Custom SaaS Platforms",
    categorySlug: "custom-saas",
    tagline: "Your AI Voice Workforce. Always Available.",
    status: "live",
    eyebrow: "ENTERPRISE AI VOICE WORKFORCE",
    overview:
      "Automate every business conversation with intelligent AI voice agents that answer calls, reach prospects, recover missed enquiries and turn conversations into business opportunities.",
    longDescription:
      "TAGVERSE AI Voice Agents deliver an always-on, natural-sounding voice workforce for high-growth enterprises. Operating with sub-400ms conversational latency, human-like inflection, and full context awareness, our agents answer inbound calls 24/7, drive proactive outbound qualification campaigns, and instantly dial back missed web leads — updating your CRM and calendar in real time.",
    heroImage: "/assets/images/home/poster-voice-experience.webp",
    metrics: [
      { label: "Speech Latency", value: "< 400ms" },
      { label: "Call Recovery Rate", value: "99.8%" },
      { label: "Conversion Lift", value: "+44%" },
    ],
    keyFeatures: [
      {
        title: "24/7 Inbound Voice Automation",
        description: "Zero wait times. Answers customer calls, understands intent in natural language, resolves FAQs, and books meetings.",
      },
      {
        title: "Autonomous Outbound Sales Outreach",
        description: "Engages qualified leads immediately, conducts consultative sales scripts, qualifies budget/timeline, and syncs to CRM.",
      },
      {
        title: "Intelligent AI Callback & Recall",
        description: "Instantly dials back missed calls and abandoned web forms within 15 seconds, re-engaging cold prospects automatically.",
      },
      {
        title: "Live Human SIP Transfer",
        description: "Detects complex inquiries or high-value VIP requests and smoothly transfers calls to live agents with full context.",
      },
    ],
    modules: [
      {
        name: "Inbound Voice Concierge",
        description: "Handles high call volumes, answers multi-turn questions from your knowledge base, and qualifies leads.",
        capabilities: ["24/7 Availability", "Natural Dialogue & Interruption", "Calendar Booking", "Department Routing"],
      },
      {
        name: "Outbound Sales Accelerator",
        description: "Conducts proactive calling campaigns to website leads, webinar attendees, and renewal prospects.",
        capabilities: ["Lead Qualification", "Survey & Feedback Collection", "Proposal Follow-up", "CRM Field Updates"],
      },
      {
        name: "AI Callback & Dunning Engine",
        description: "Monitors dropped calls and missed inquiries, scheduling automatic recall rules and reminders.",
        capabilities: ["Sub-15s Missed Call Trigger", "Configurable Retry Schedules", "Quotation Follow-up", "WhatsApp Summary"],
      },
      {
        name: "Agent Orchestration & Telephony Gateway",
        description: "Connects to telecom trunks (Exotel, Plivo, Twilio) with real-time speech synthesis and neural transcription.",
        capabilities: ["Sub-400ms Latency", "Multi-Language Synthesis", "Voice Emotion & Pace Tuning", "SOC-2 Encryption"],
      },
    ],
    architecture: [
      {
        title: "Realtime Speech-to-Speech Streaming",
        description: "WebSocket duplex audio streaming powered by OpenAI Realtime and ElevenLabs conversational neural models.",
      },
      {
        title: "Deterministic Knowledge Vector Graph",
        description: "Real-time RAG grounding answers exclusively in your uploaded company documents, eliminating hallucinations.",
      },
    ],
    specs: {
      deployment: "Managed Cloud or Dedicated Private Telephony Trunk",
      stack: ["Next.js", "WebSockets", "OpenAI Realtime API", "ElevenLabs Conversational AI", "Python FastRTC", "Redis"],
      integrations: ["VYRA CRM", "n8n", "WhatsApp Business", "Google Calendar", "Exotel", "Plivo", "Twilio", "HubSpot"],
      compliance: "SOC-2 Ready, GDPR Compliant, Indian Telecom Regulatory & DNC Guardrails",
    },
    faqs: [
      {
        question: "Does the AI voice agent sound robotic?",
        answer: "No. Powered by modern neural speech models (ElevenLabs & OpenAI Realtime), our voice agents feature natural breathing pauses, conversational fillers ('um', 'I see', 'sure thing'), human-like inflection, and can handle user interruptions smoothly without talking over the customer.",
      },
      {
        question: "How fast is the response latency during a phone call?",
        answer: "Average speech-to-speech turnaround is under 400 milliseconds, mimicking real human conversation tempo so callers experience natural, uninterrupted dialogue.",
      },
      {
        question: "Can it integrate with our existing Indian phone numbers and telecom providers?",
        answer: "Yes! We integrate with Exotel, Plivo, Twilio, and standard SIP trunks. You can port your existing corporate numbers or provision virtual local/toll-free DIDs.",
      },
      {
        question: "What languages and regional accents are supported?",
        answer: "Our voice agents support English (with Indian, US, and UK accents), Hindi, Tamil, Telugu, Spanish, French, German, and Arabic.",
      },
    ],
    relatedProductSlugs: ["vyra-crm", "tagverse-ai", "neuro-forge"],
  },
];

export function getProductBySlug(slug: string): ProductDetailItem | undefined {
  return PRODUCTS_DATA.find(
    (p) => p.slug === slug || p.id === slug || (p.aliases && p.aliases.includes(slug))
  );
}

export function getProductsByCategorySlug(catSlug: string): ProductDetailItem[] {
  return PRODUCTS_DATA.filter((p) => p.categorySlug === catSlug);
}

export function getCategoryInfo(catSlug: string): ProductCategoryInfo | undefined {
  return PRODUCT_CATEGORIES_DATA[catSlug];
}
