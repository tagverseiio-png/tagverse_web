export interface BuildathonEvent {
  id: string;
  title: string;
  theme: string;
  status: "Upcoming" | "Registration Open" | "In Review";
  timeline: string;
  format: "48-Hour Virtual Sprint" | "Weekend Buildathon" | "7-Day Project Challenge";
  problemStatement: string;
  eligibility: string;
  deliverables: string[];
  perks: string[];
}

export const BUILDATHON_EVENTS: BuildathonEvent[] = [
  {
    id: "buildathon-agentic-swarms",
    title: "Autonomous Agent Swarms Challenge",
    theme: "Generative AI & Agentic Workflows",
    status: "Registration Open",
    timeline: "Upcoming Weekend Sprint",
    format: "48-Hour Virtual Sprint",
    problemStatement:
      "Design and deploy an autonomous multi-agent swarm that decomposes a complex enterprise operation (e.g. competitor research, automated code audit, or lead enrichment) into deterministic tasks with tool execution and human-in-the-loop validation.",
    eligibility: "Open to all enrolled Academy builders and alumni. Solo or teams of up to 3.",
    deliverables: [
      "Working Python / LangGraph or CrewAI codebase on GitHub",
      "Live interactive interface or CLI demonstration",
      "Recorded 3-minute technical architecture walkthrough",
    ],
    perks: [
      "Direct code evaluation by TAGVERSE senior engineering leads",
      "Featured placement on the TAGVERSE Academy Student Wall",
      "Invitation to interview for internal project builder cohorts",
    ],
  },
  {
    id: "buildathon-fullstack-mvp",
    title: "Micro-SaaS MVP Sprint",
    theme: "Full Stack & Cloud Architecture",
    status: "Upcoming",
    timeline: "Next Month Challenge",
    format: "7-Day Project Challenge",
    problemStatement:
      "Build a functional micro-SaaS application from scratch using Next.js, PostgreSQL, and Stripe/Razorpay webhooks solving a specific operational bottleneck for creative agencies or freelancers.",
    eligibility: "Open to enrolled Full Stack students and community builders.",
    deliverables: [
      "Live deployed web application URL with authentication",
      "Database schema documentation and Prisma seed script",
      "User onboarding flow with payment gateway checkout simulation",
    ],
    perks: [
      "Architecture feedback from production web architects",
      "Cloud hosting credits support",
      "Digital verification badge added to portfolio",
    ],
  },
  {
    id: "buildathon-automation-hack",
    title: "Zero-Touch Business Systems Sprint",
    theme: "n8n & Enterprise Integrations",
    status: "Upcoming",
    timeline: "Scheduled Cohort Challenge",
    format: "Weekend Buildathon",
    problemStatement:
      "Construct a zero-touch business workflow utilizing self-hosted n8n and official WhatsApp Cloud API that resolves customer queries, extracts invoice data from PDFs, and writes structured records to a relational database.",
    eligibility: "Automation cohort learners and practical engineering students.",
    deliverables: [
      "Exported modular n8n workflow JSONs",
      "Live end-to-end webhook execution recording",
      "Error handling and exception alerting schema",
    ],
    perks: [
      "Template showcase in TAGVERSE workflow library",
      "Peer review and optimization feedback",
    ],
  },
];

export interface MentorProfile {
  name: string;
  role: string;
  expertise: string[];
  bio: string;
  sessionTypes: string[];
}

export const ACADEMY_MENTORS: MentorProfile[] = [
  {
    name: "TAGVERSE AI Engineering Team",
    role: "Senior AI & LLM Systems Architects",
    expertise: ["LangGraph", "Multi-Agent Swarms", "RAG Pipelines", "Vector Databases", "FastAPI"],
    bio: "Practicing machine learning and systems engineers currently deploying autonomous multi-agent pipelines, enterprise RAG search engines, and real-time voice intelligence at TAGVERSE.",
    sessionTypes: ["Architecture Teardowns", "Prompt & Swarm Debugging", "Production Deployment Reviews"],
  },
  {
    name: "TAGVERSE Full-Stack Squad",
    role: "Lead Software & Cloud Engineers",
    expertise: ["Next.js App Router", "TypeScript", "PostgreSQL & Prisma", "System Design", "Cloud Infrastructure"],
    bio: "Experienced full-stack engineers building high-throughput web applications, multi-tenant SaaS architectures, and real-time collaborative workspaces across client and proprietary platforms.",
    sessionTypes: ["Live Pair Programming", "Database Schema Reviews", "PR Code Audits"],
  },
  {
    name: "Growth & Performance Strategy Leads",
    role: "Media Buying & CRO Directors",
    expertise: ["Meta & Google Performance Ads", "AEO / GEO Optimization", "GA4 Attribution", "Funnel CRO"],
    bio: "Data-driven growth practitioners managing performance ad budgets, building generative engine visibility strategies, and engineering conversion-optimized landing pages.",
    sessionTypes: ["Campaign Teardowns", "Copy & Creative Feedback", "Attribution Modeling Guidance"],
  },
  {
    name: "Workflow & Operations Architects",
    role: "Enterprise Automation Specialists",
    expertise: ["Self-Hosted n8n", "WhatsApp Cloud API", "REST Webhooks", "CRM Architecture", "Docker"],
    bio: "Specialists in business process engineering, eliminating manual operational bottlenecks, and connecting enterprise telecom and database ecosystems into unified automations.",
    sessionTypes: ["Workflow Logic Optimization", "Webhook Security Reviews", "Client Delivery Strategy"],
  },
];

export interface ProjectShowcaseItem {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  technologies: string[];
  problemStatement: string;
  solutionDescription: string;
  type: "Representative Student Architecture" | "Capstone Prototype" | "Buildathon Winner";
}

export const STUDENT_PROJECT_ARCHITECTURES: ProjectShowcaseItem[] = [
  {
    id: "proj-support-agent",
    title: "AI-Powered Customer Support Assistant",
    category: "Artificial Intelligence",
    categorySlug: "ai",
    technologies: ["Python", "FastAPI", "Pinecone", "LangChain", "OpenAI"],
    problemStatement: "High volume of repetitive Tier-1 customer support inquiries creating 4-hour response delays.",
    solutionDescription: "Hybrid RAG assistant indexing 400+ technical documentation pages, providing citation-backed answers with fallback human escalation tickets.",
    type: "Representative Student Architecture",
  },
  {
    id: "proj-voice-assistant",
    title: "AI Voice Assistant Prototype",
    category: "Artificial Intelligence",
    categorySlug: "ai",
    technologies: ["OpenAI Realtime", "WebRTC", "Next.js", "Python"],
    problemStatement: "Missed phone inquiries during off-hours leading to lost commercial leads.",
    solutionDescription: "Sub-400ms latency voice agent conducting natural qualification conversations, gathering caller briefs, and scheduling calendar invites.",
    type: "Capstone Prototype",
  },
  {
    id: "proj-lead-management",
    title: "Automated Lead Management System",
    category: "Automation",
    categorySlug: "automation",
    technologies: ["n8n", "WhatsApp Cloud API", "PostgreSQL", "Google Sheets"],
    problemStatement: "Inbound leads taking up to 6 hours for sales rep manual follow-up.",
    solutionDescription: "Instant 15-second multi-channel webhook ingestion, automated WhatsApp conversational response, and round-robin rep assignment.",
    type: "Representative Student Architecture",
  },
  {
    id: "proj-business-app",
    title: "Full-Stack Business Application",
    category: "Software Development",
    categorySlug: "development",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    problemStatement: "Disparate spreadsheet tracking causing inventory discrepancy and invoice delays.",
    solutionDescription: "Unified multi-tenant dashboard with role-based access, inventory tracking, GST invoice generator, and Razorpay payment checkout.",
    type: "Capstone Prototype",
  },
  {
    id: "proj-analytics-dashboard",
    title: "AI-Powered Analytics Dashboard",
    category: "Software Development",
    categorySlug: "development",
    technologies: ["React", "Next.js", "FastAPI", "PostgreSQL", "Tailwind CSS"],
    problemStatement: "Non-technical founders struggling to write SQL queries to understand customer churn.",
    solutionDescription: "Natural language interface translating plain English questions into verified SQL queries with dynamic charting and anomaly alerts.",
    type: "Representative Student Architecture",
  },
  {
    id: "proj-marketing-automation",
    title: "Marketing Automation Workflow",
    category: "Digital Marketing",
    categorySlug: "marketing",
    technologies: ["Meta API", "n8n", "Claude API", "Google Analytics 4"],
    problemStatement: "Manual ad copy generation and slow multi-platform campaign scheduling.",
    solutionDescription: "Automated copy generation matrix tailoring hooks across audience personas, triggering automated Slack approvals before ad staging.",
    type: "Representative Student Architecture",
  },
  {
    id: "proj-eeg-classifier",
    title: "EEG Signal Classification Prototype",
    category: "Neurotechnology",
    categorySlug: "neurotech",
    technologies: ["Python", "MNE-Python", "SciPy", "Scikit-Learn", "CSP"],
    problemStatement: "High ocular and muscular noise obscuring discriminant sensorimotor rhythm signals.",
    solutionDescription: "Automated DSP pipeline applying bandpass filtering and ICA artifact removal, extracting CSP features to classify motor imagery with >84% accuracy.",
    type: "Capstone Prototype",
  },
  {
    id: "proj-document-processor",
    title: "Intelligent Document Processing System",
    category: "Artificial Intelligence",
    categorySlug: "ai",
    technologies: ["Python", "FastAPI", "Pydantic", "OCR", "Claude 3.5 Sonnet"],
    problemStatement: "Manual data entry of scanned invoices, receipts, and vendor agreements.",
    solutionDescription: "Vision-based multi-modal extraction engine transforming scanned PDF documents into strictly typed, validated JSON structures.",
    type: "Representative Student Architecture",
  },
  {
    id: "proj-research-assistant",
    title: "Autonomous AI Research Assistant",
    category: "Artificial Intelligence",
    categorySlug: "ai",
    technologies: ["LangGraph", "Python", "Tavily Search", "ChromaDB"],
    problemStatement: "Hours lost conducting manual industry literature surveys and source verifications.",
    solutionDescription: "Stateful agent swarm conducting parallel web searches, evaluating source authority, summarizing takeaways, and compiling formatted briefing docs.",
    type: "Representative Student Architecture",
  },
];

export interface CareerPathItem {
  id: string;
  goal: string;
  recommendedCourseSlug: string;
  recommendedCourseTitle: string;
  startingSkills: string;
  learningRoadmap: string[];
  keyOutcome: string;
}

export const CAREER_PATHS: CareerPathItem[] = [
  {
    id: "path-ai",
    goal: "I want to learn Artificial Intelligence.",
    recommendedCourseSlug: "generative-ai-agentic-ai",
    recommendedCourseTitle: "Generative AI & Agentic AI",
    startingSkills: "Basic Python programming (variables, loops, functions). No machine learning math needed.",
    learningRoadmap: [
      "Master LLM API integration & structured JSON outputs",
      "Build hybrid RAG systems over private knowledge bases",
      "Construct deterministic agent state machines with LangGraph",
      "Deploy production multi-agent systems with guardrails & telemetry",
    ],
    keyOutcome: "Build and deploy production-ready AI agents, enterprise search assistants, and autonomous swarms.",
  },
  {
    id: "path-web",
    goal: "I want to become a Software Developer.",
    recommendedCourseSlug: "full-stack-development",
    recommendedCourseTitle: "Full Stack Development",
    startingSkills: "Basic computer familiarity and problem-solving mindset. No prior coding degree required.",
    learningRoadmap: [
      "Modern TypeScript, responsive UI & Tailwind CSS",
      "React component architecture & Next.js App Router",
      "PostgreSQL database modeling, Prisma ORM & REST APIs",
      "Authentication, payment integrations & cloud deployment",
    ],
    keyOutcome: "Engineer, launch, and host production web applications with databases, payments, and modern UI.",
  },
  {
    id: "path-marketing",
    goal: "I want to learn Digital Marketing.",
    recommendedCourseSlug: "digital-marketing-growth",
    recommendedCourseTitle: "Digital Marketing & Growth",
    startingSkills: "Social media awareness and analytical curiosity. Zero coding required.",
    learningRoadmap: [
      "Direct-response copywriting & landing page conversion optimization",
      "Meta Ads & Google Ads scalable media buying architecture",
      "SEO, Answer Engine Optimization (AEO) & GEO brand visibility",
      "Google Analytics 4 attribution modeling & CAC economics",
    ],
    keyOutcome: "Run high-ROI paid ad campaigns, optimize conversion funnels, and capture organic AI search traffic.",
  },
  {
    id: "path-automation",
    goal: "I want to build AI Automation Systems.",
    recommendedCourseSlug: "ai-automation-business-systems",
    recommendedCourseTitle: "AI Automation & Business Systems",
    startingSkills: "Familiarity with cloud apps (Google Sheets, CRM). Logical workflow mindset.",
    learningRoadmap: [
      "Self-hosted n8n deployment, Docker & webhooks",
      "Official Meta WhatsApp Business Cloud API automation",
      "Generative AI node integration for document extraction",
      "Multi-channel CRM lead routing and billing automation",
    ],
    keyOutcome: "Eliminate manual operational bottlenecks and offer high-ticket workflow automation solutions.",
  },
  {
    id: "path-bci",
    goal: "I am interested in Neuroscience and BCI.",
    recommendedCourseSlug: "neurotechnology-bci",
    recommendedCourseTitle: "Neurotechnology & Brain-Computer Interfaces",
    startingSkills: "Intermediate Python, linear algebra fundamentals, scientific computing curiosity.",
    learningRoadmap: [
      "Electrophysiology fundamentals & EEG signal acquisition",
      "Digital Signal Processing (DSP) & ICA artifact removal",
      "Neural frequency feature extraction & wavelets",
      "Machine learning & deep learning classification of brain signals",
    ],
    keyOutcome: "Decode and classify raw electrophysiological brain signals with Python DSP and machine learning.",
  },
  {
    id: "path-founder",
    goal: "I want to create my own technology product.",
    recommendedCourseSlug: "full-stack-development",
    recommendedCourseTitle: "Full Stack Development (with AI Automation)",
    startingSkills: "Product vision, determination, and willingness to learn modern web architecture.",
    learningRoadmap: [
      "Rapid UI prototyping with Next.js & Tailwind CSS",
      "PostgreSQL database design for multi-tenant users",
      "Connecting payment gateways (Razorpay/Stripe) for revenue",
      "Automating user onboarding and support with AI nodes",
    ],
    keyOutcome: "Ship a functional, paying-customer-ready MVP without hiring expensive external development agencies.",
  },
];

export interface LearningCalendarEvent {
  id: string;
  title: string;
  type: "Orientation Session" | "Cohort Kickoff" | "Masterclass" | "Buildathon";
  date: string;
  time: string;
  duration: string;
  mode: "Live Virtual via Google Meet" | "Interactive Workshop";
  description: string;
  status: "Registration Open" | "Limited Slots Available" | "Admissions Review";
}

export const ACADEMY_EVENTS: LearningCalendarEvent[] = [
  {
    id: "event-genai-orientation",
    title: "Generative AI & Agentic AI — Live Orientation & Curriculum Teardown",
    type: "Orientation Session",
    date: "Saturday, 11:00 AM IST",
    time: "11:00 AM – 12:00 PM IST",
    duration: "60 mins",
    mode: "Live Virtual via Google Meet",
    description:
      "Walk through the 8-week curriculum with our AI practitioners. Learn how projects are structured, inspect student agent swarms, and ask technical questions before enrolling.",
    status: "Registration Open",
  },
  {
    id: "event-fullstack-masterclass",
    title: "Building Modern SaaS with Next.js 14 App Router & PostgreSQL",
    type: "Masterclass",
    date: "Sunday, 4:00 PM IST",
    time: "4:00 PM – 5:30 PM IST",
    duration: "90 mins",
    mode: "Interactive Workshop",
    description:
      "A hands-on live code session exploring Server Components, Server Actions, Prisma ORM schema migrations, and real-time database transactions.",
    status: "Registration Open",
  },
  {
    id: "event-buildathon-sprint",
    title: "Autonomous Agent Swarms 48-Hour Buildathon",
    type: "Buildathon",
    date: "Upcoming Weekend",
    time: "Friday 6:00 PM – Sunday 8:00 PM IST",
    duration: "48 Hours",
    mode: "Interactive Workshop",
    description:
      "Collaborative project challenge where learners build and showcase working autonomous agent prototypes reviewed by industry mentors.",
    status: "Limited Slots Available",
  },
  {
    id: "event-automation-orientation",
    title: "Enterprise Automation & WhatsApp Bots — Live Orientation",
    type: "Orientation Session",
    date: "Next Wednesday, 7:00 PM IST",
    time: "7:00 PM – 8:00 PM IST",
    duration: "60 mins",
    mode: "Live Virtual via Google Meet",
    description:
      "Discover how self-hosted n8n workflows and Meta WhatsApp Cloud API integrations eliminate manual business bottlenecks. Live demo of working pipelines.",
    status: "Registration Open",
  },
];
