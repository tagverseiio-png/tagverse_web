export interface CourseCurriculumPhase {
  phase: string;
  title: string;
  duration: string;
  topics: string[];
  projectOutcome: string;
}

export interface AcademyCourse {
  id: string;
  slug: string;
  number: string;
  title: string;
  category:
    | "Artificial Intelligence"
    | "Software Development"
    | "Digital Marketing"
    | "Automation"
    | "Neurotechnology"
    | "Business Technology";
  categorySlug: string;
  tagline: string;
  shortDescription: string;
  overview: string;
  skillLevel: "Beginner" | "Intermediate" | "Advanced" | "Beginner – Intermediate" | "Intermediate – Advanced" | "All Levels";
  duration: string;
  mode: string;
  prerequisites: string;
  whoShouldEnrol: string[];
  skillsDeveloped: string[];
  technologiesCovered: string[];
  projectOutcomes: string[];
  curriculumPhases: CourseCurriculumPhase[];
  capstoneProject: {
    title: string;
    description: string;
    deliverables: string[];
  };
  mentorshipApproach: string;
  assessmentMethodology: string;
  certificateDetails: string;
  priceDisplay: string;
  priceValue?: number;
  priceNote: string;
  availability: "Enrollment Open" | "Upcoming Cohort" | "Admissions Review";
  nextCohortDate: string;
  faqs: { question: string; answer: string }[];
}

export const ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: "course-genai-agentic-ai",
    slug: "generative-ai-agentic-ai",
    number: "01",
    title: "Generative AI & Agentic AI",
    category: "Artificial Intelligence",
    categorySlug: "ai",
    tagline: "Architect autonomous agent swarms, RAG pipelines, and generative applications.",
    shortDescription:
      "Learn how modern AI systems work and develop practical applications using large language models, AI agents, generative AI and automation.",
    overview:
      "This program takes you from LLM fundamentals to architecting autonomous multi-agent systems and enterprise RAG pipelines. You will write clean Python, interface with open and proprietary models, construct stateful agent swarms using LangGraph and CrewAI, implement tool-calling protocols, and deploy production-ready AI applications with cost governance and guardrails.",
    skillLevel: "Intermediate – Advanced",
    duration: "8 Weeks (Part-time / Weekend Cohort)",
    mode: "Live Interactive Virtual Sessions + Hands-on Lab Sprints",
    prerequisites:
      "Basic familiarity with Python programming (functions, loops, data structures) and foundational programming concepts. No prior machine learning or deep math background required.",
    whoShouldEnrol: [
      "Software engineers looking to transition into applied AI engineering and LLM orchestration",
      "Full stack developers wanting to integrate generative AI agents and vector search into web products",
      "Technical product managers and founders aiming to prototype and launch agentic AI products",
      "Automation engineers and data practitioners seeking to build autonomous multi-agent pipelines",
    ],
    skillsDeveloped: [
      "LLM API integration and structured outputs with Pydantic",
      "Advanced prompt engineering, few-shot conditioning, and chain-of-thought steering",
      "End-to-end Retrieval-Augmented Generation (RAG) with vector databases (Pinecone, Chroma, pgvector)",
      "Stateful agentic architectures, task decomposition, and memory management",
      "Deterministic agent workflows using LangGraph and CrewAI",
      "MCP (Model Context Protocol) and custom tool execution",
      "Evaluation benchmarks, hallucination mitigation, and LLM guardrails",
    ],
    technologiesCovered: [
      "Python 3.11",
      "OpenAI API",
      "Anthropic Claude",
      "LangChain",
      "LangGraph",
      "CrewAI",
      "Pinecone",
      "ChromaDB",
      "FastAPI",
      "Ollama",
      "Hugging Face",
      "Docker",
    ],
    projectOutcomes: [
      "Enterprise Multi-Document Hybrid RAG Knowledge Assistant with citation grounding",
      "Autonomous Multi-Agent Sales & Research Swarm with web browsing and CRM sync",
      "Self-Correcting Code Review and Automated Testing Agent with MCP execution",
    ],
    curriculumPhases: [
      {
        phase: "Phase 1",
        title: "Generative AI Fundamentals & Python for AI",
        duration: "Weeks 1–2",
        topics: [
          "Transformers architecture, tokenization, context windows, and attention mechanisms",
          "OpenAI, Claude, and Gemini API integration using async Python",
          "Advanced prompt engineering, system instructions, and structured JSON outputs",
          "Token usage optimization, caching mechanisms, and rate limit handling",
        ],
        projectOutcome: "CLI-based intelligent data extraction tool converting unstructured text to validated schemas.",
      },
      {
        phase: "Phase 2",
        title: "Embeddings, Vector Databases & Advanced RAG",
        duration: "Weeks 3–4",
        topics: [
          "Dense vector embeddings, similarity metrics (Cosine, Euclidean), and dimensional indexing",
          "Document parsing pipelines for PDFs, docx, CSV, and markdown",
          "Chunking strategies: recursive character, semantic chunking, and parent-document retrieval",
          "Hybrid search: combining BM25 keyword matching with dense vector ranking",
          "Reranking models (Cohere Rerank) and contextual compression",
        ],
        projectOutcome: "Production-grade RAG knowledge base answering queries over hundreds of technical whitepapers.",
      },
      {
        phase: "Phase 3",
        title: "Agentic AI Architecture & Tool Calling",
        duration: "Weeks 5–6",
        topics: [
          "Agent design patterns: ReAct, Plan-and-Solve, and Reflection loops",
          "Function calling, dynamic parameter schema validation, and tool execution",
          "Model Context Protocol (MCP) integration and custom server architecture",
          "Deterministic state machines with LangGraph: nodes, edges, conditional routers, and persistence",
          "Short-term and long-term memory architectures (episodic, semantic, procedural)",
        ],
        projectOutcome: "Autonomous research agent executing web searches, scraping sources, and synthesizing verified reports.",
      },
      {
        phase: "Phase 4",
        title: "Multi-Agent Swarms, Production Guardrails & Deployment",
        duration: "Weeks 7–8",
        topics: [
          "Multi-agent orchestration with CrewAI and hierarchical delegators",
          "Human-in-the-loop approval gates for critical actions",
          "Guardrails and safety: NeMo Guardrails, hallucination detection, prompt injection defense",
          "FastAPI microservice packaging, Docker containerization, and cloud deployment",
          "Token telemetry, latency tracing with Langfuse/Arize, and cost accounting",
        ],
        projectOutcome: "Full-stack multi-agent autonomous enterprise assistant deployed to live cloud infrastructure.",
      },
    ],
    capstoneProject: {
      title: "Autonomous Enterprise Knowledge & Task Execution Swarm",
      description:
        "Architect, implement, and deploy a multi-agent system combining hybrid RAG over internal company documentation with external API tool execution (emailing, CRM updates, report generation), complete with human-in-the-loop approvals and latency telemetry.",
      deliverables: [
        "Public or private GitHub repository with modular, documented Python codebase",
        "FastAPI backend microservice with OpenAPI documentation",
        "Interactive Next.js or Streamlit frontend for demonstration",
        "Recorded 5-minute technical demo presentation",
      ],
    },
    mentorshipApproach:
      "Weekly live code walkthroughs, 1-on-1 architecture review sessions with senior AI practitioners, and asynchronous code review on GitHub pull requests.",
    assessmentMethodology:
      "Hands-on project deliverables evaluated on code modularity, error resilience, hallucination resistance, latency benchmarks, and documentation clarity.",
    certificateDetails:
      "Verifiable digital certificate with cryptographic hash and direct link to your capstone project repository and live deployment URL.",
    priceDisplay: "₹20,000",
    priceValue: 20000,
    priceNote: "Starting fee for upcoming cohort. Flexible installment options available.",
    availability: "Enrollment Open",
    nextCohortDate: "Upcoming Cohort Starting Soon",
    faqs: [
      {
        question: "Do I need a GPU machine to take this course?",
        answer:
          "No. All development is performed using cloud APIs and cloud-hosted vector databases. Local inference examples use lightweight quantized models via Ollama or free Google Colab GPU runtimes.",
      },
      {
        question: "Will I get help with code reviews and errors?",
        answer:
          "Yes. Every assignment and project includes line-by-line GitHub pull request code reviews and weekly live office hours with industry mentors.",
      },
      {
        question: "Can I attend while working full-time?",
        answer:
          "Yes. The cohort is designed for working professionals and university students, featuring weekend live masterclasses (Saturday/Sunday) and asynchronous lab exercises during the week.",
      },
    ],
  },
  {
    id: "course-full-stack-dev",
    slug: "full-stack-development",
    number: "02",
    title: "Full Stack Development",
    category: "Software Development",
    categorySlug: "development",
    tagline: "Build scalable web applications with modern TypeScript, React, Next.js & PostgreSQL.",
    shortDescription:
      "Learn how to design, develop and deploy modern web applications using frontend and backend technologies.",
    overview:
      "A pragmatic engineering program focused on building production-grade web applications from scratch. You will master modern JavaScript/TypeScript, React 18/19 paradigms, Next.js App Router, Tailwind CSS design systems, Node.js server architectures, relational databases (PostgreSQL) with Prisma ORM, RESTful API design, authentication, and cloud deployment pipelines.",
    skillLevel: "Beginner – Intermediate",
    duration: "10 Weeks (Part-time)",
    mode: "Live Practical Coding + Real Project Sprints",
    prerequisites:
      "Basic computer literacy and enthusiasm to write code. Prior programming experience in any language is helpful but not mandatory; foundational concepts are covered in Week 1.",
    whoShouldEnrol: [
      "Aspiring software engineers seeking a comprehensive, portfolio-driven path to modern web development",
      "Frontend developers wanting to master backend architecture, databases, and full-stack engineering",
      "Designers, marketers, and product managers wanting to build their own functional digital products",
    ],
    skillsDeveloped: [
      "Semantic HTML5, modern CSS3 layout engines (Flexbox, Grid), and Tailwind CSS",
      "Modern TypeScript: types, interfaces, generics, and strict type safety",
      "React component architecture, hooks, state management, and server components",
      "Next.js App Router, Server Actions, SSR, SSG, and route handlers",
      "Relational database modeling with PostgreSQL and Prisma ORM",
      "Secure authentication (JWT, OAuth, NextAuth) and role-based access control",
      "Git version control, collaborative PR workflows, and automated CI/CD deployments (Vercel, Railway)",
    ],
    technologiesCovered: [
      "TypeScript",
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "Prisma ORM",
      "NextAuth.js",
      "REST APIs",
      "Git & GitHub",
      "Vercel",
      "Docker",
    ],
    projectOutcomes: [
      "Responsive Glassmorphic Marketing Landing Page with dynamic content rendering",
      "Full-Stack Collaborative Project Task Board with real-time updates and authentication",
      "E-Commerce SaaS Application with PostgreSQL catalog, cart state, and payment integration",
    ],
    curriculumPhases: [
      {
        phase: "Phase 1",
        title: "Frontend Foundations & Modern TypeScript",
        duration: "Weeks 1–2",
        topics: [
          "Semantic HTML, accessibility (a11y), responsive design, and CSS variables",
          "Tailwind CSS design systems, responsive typography, and layout composition",
          "Modern JavaScript ES6+ (Promises, async/await, array pipelines)",
          "TypeScript type safety, union types, interfaces, and compiler configurations",
        ],
        projectOutcome: "Pixel-perfect, fully responsive portfolio website with custom dark-mode theme.",
      },
      {
        phase: "Phase 2",
        title: "React Architecture & Next.js App Router",
        duration: "Weeks 3–5",
        topics: [
          "Component lifecycles, hooks (useState, useEffect, useMemo, useCallback, custom hooks)",
          "Next.js App Router: layout hierarchies, dynamic routes, and streaming with Suspense",
          "Server Components vs Client Components: architecture, boundary rules, and serialization",
          "Client-side state management, URL search params, and optimistic UI updates",
        ],
        projectOutcome: "Interactive multi-page dashboard with client filtering, sorting, and state persistence.",
      },
      {
        phase: "Phase 3",
        title: "Backend Engineering, PostgreSQL & Prisma ORM",
        duration: "Weeks 6–8",
        topics: [
          "Node.js server runtime, REST API design principles, and HTTP status codes",
          "PostgreSQL database modeling: tables, relationships (1:1, 1:N, N:M), foreign keys, and indexes",
          "Prisma ORM: schema modeling, migrations, seeding, and ACID transactions",
          "Server Actions, validation with Zod, error handling, and rate limiting",
          "Authentication: OAuth providers, session tokens, and password hashing (bcrypt)",
        ],
        projectOutcome: "Secure backend API service powering an end-to-end multi-user CRUD application.",
      },
      {
        phase: "Phase 4",
        title: "Full-Stack Integration, Testing & Cloud Deployment",
        duration: "Weeks 9–10",
        topics: [
          "Payment gateway integration (Stripe / Razorpay webhooks and checkout sessions)",
          "Media storage: AWS S3 / Cloudinary upload pipelines and presigned URLs",
          "Testing fundamentals: unit tests and end-to-end flows",
          "Production deployment on Vercel and cloud database hosting (Supabase / Neon)",
          "Lighthouse performance audits, Core Web Vitals optimization, and SEO metadata",
        ],
        projectOutcome: "Complete production-ready SaaS application deployed with custom domain and live payment processing.",
      },
    ],
    capstoneProject: {
      title: "Commercial-Grade Full-Stack SaaS Application",
      description:
        "Build and launch a full-featured multi-tenant SaaS application (e.g. project collaboration portal, digital booking engine, or billing tool) featuring user authentication, PostgreSQL database with Prisma, payment gateway webhooks, and responsive dashboard UI.",
      deliverables: [
        "Clean GitHub repository with comprehensive README, setup instructions, and database seeds",
        "Live deployed application URL with working authentication and demo credentials",
        "Technical architecture documentation detailing database ERD and API specifications",
      ],
    },
    mentorshipApproach:
      "Weekly live pair-programming sessions, architectural reviews, and continuous code quality mentoring on GitHub pull requests.",
    assessmentMethodology:
      "Graded milestones based on code architecture, database normalization, type safety, UI polish, and functional test coverage.",
    certificateDetails:
      "Official TAGVERSE Academy Full Stack Engineer Certification with verified repository verification.",
    priceDisplay: "Contact for Pricing",
    priceNote: "Flexible payment plans and merit scholarships available upon application review.",
    availability: "Enrollment Open",
    nextCohortDate: "Upcoming Cohort Starting Soon",
    faqs: [
      {
        question: "Can I learn full-stack development without a computer science degree?",
        answer:
          "Absolutely. Our curriculum focuses on practical, modern engineering workflows used in fast-paced software companies rather than theoretical academic proofs.",
      },
      {
        question: "Will this course teach me how to deploy applications?",
        answer:
          "Yes. Every student deploys multiple real-world applications to production using modern cloud platforms (Vercel, Supabase, Railway, Neon).",
      },
    ],
  },
  {
    id: "course-digital-marketing",
    slug: "digital-marketing-growth",
    number: "03",
    title: "Digital Marketing & Growth",
    category: "Digital Marketing",
    categorySlug: "marketing",
    tagline: "Drive high-ROI paid acquisition, organic visibility (SEO/AEO/GEO) & conversion funnels.",
    shortDescription:
      "Learn how businesses attract customers, grow online and generate measurable results through modern digital marketing.",
    overview:
      "Step into the modern growth engine. This course teaches you data-driven performance marketing across Meta Ads, Google Ads, programmatic campaigns, and YouTube. You will also master next-generation organic visibility, including traditional SEO, Answer Engine Optimization (AEO for ChatGPT/Perplexity), Generative Engine Optimization (GEO), landing page conversion rate optimization (CRO), and automated attribution modeling.",
    skillLevel: "Beginner – Intermediate",
    duration: "6 Weeks (Part-time)",
    mode: "Live Interactive Strategy Sprints + Real Campaign Audits",
    prerequisites:
      "No coding background required. Familiarity with social media platforms and basic analytical thinking is recommended.",
    whoShouldEnrol: [
      "Marketing professionals looking to master performance ads, AI marketing tools, and modern algorithmic growth",
      "Founders and entrepreneurs wanting to acquire paying customers with profitable unit economics",
      "Freelancers, agency media buyers, and creators wanting to manage 6-figure advertising budgets",
    ],
    skillsDeveloped: [
      "Media buying on Meta Ads Manager (Advantage+ campaigns, custom audiences, pixel setup)",
      "High-intent Google Search, Performance Max, and YouTube video ad structuring",
      "Full-funnel SEO, keyword intent clustering, and technical site health audits",
      "Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) strategies",
      "High-converting landing page copywriting, wireframing, and conversion rate optimization (CRO)",
      "Google Analytics 4 (GA4), UTM parameter taxonomy, and attribution modeling",
      "AI creative production using Midjourney, Claude, and programmatic video pipelines",
    ],
    technologiesCovered: [
      "Meta Ads Manager",
      "Google Ads",
      "Google Analytics 4 (GA4)",
      "Google Search Console",
      "Ahrefs / SEMrush",
      "Shopify / Webflow",
      "Canva / Figma",
      "Midjourney",
      "Claude & ChatGPT for Copy",
      "n8n / Zapier",
    ],
    projectOutcomes: [
      "Comprehensive Paid Acquisition Strategy & Creative Matrix for a D2C/B2B Brand",
      "Full Technical SEO & Generative Engine Optimization (GEO) Audit with schema recommendations",
      "Complete Marketing Attribution Dashboard with GA4 custom events and conversion tracking",
    ],
    curriculumPhases: [
      {
        phase: "Phase 1",
        title: "Growth Foundations, Copywriting & High-Converting Funnels",
        duration: "Weeks 1–2",
        topics: [
          "Customer persona mapping, pain point discovery, and offer positioning",
          "Direct-response copywriting frameworks (AIDA, PAS, Problem-Agitate-Solve)",
          "High-converting landing page architecture and mobile-first CRO principles",
          "Tracking pixel implementation, Conversions API (CAPI), and GA4 event architecture",
        ],
        projectOutcome: "Wireframe and direct-response copy for a high-converting lead generation landing page.",
      },
      {
        phase: "Phase 2",
        title: "Meta Ads & Performance Creative Production",
        duration: "Weeks 3–4",
        topics: [
          "Meta Ads auction mechanics, campaign budget optimization (CBO), and ad set targeting",
          "Creative strategy: video hooks, UGC frameworks, statics, and AI image synthesis",
          "Scaling frameworks: horizontal vs vertical budget scaling and fatigue management",
          "Retargeting funnels, WhatsApp click-to-chat ad campaigns, and instant form leads",
        ],
        projectOutcome: "Complete Meta advertising campaign structure with 10 creative variants and budget allocation sheet.",
      },
      {
        phase: "Phase 3",
        title: "Google Ads, Intent Capture & Search Funnels",
        duration: "Weeks 4–5",
        topics: [
          "Search intent taxonomy: transactional, commercial, informational queries",
          "Keyword bidding strategies, match types, negative keywords, and Quality Score mechanics",
          "Google Performance Max (PMax) campaigns and audience signal curation",
          "YouTube video ads for intent building and remarketing",
        ],
        projectOutcome: "Structured Google Ads Search & PMax campaign ready for deployment with budget models.",
      },
      {
        phase: "Phase 4",
        title: "Modern SEO, AEO, GEO & Analytics Attribution",
        duration: "Weeks 5–6",
        topics: [
          "Technical SEO: crawl budgets, Core Web Vitals, Schema.org structured data",
          "Answer Engine Optimization (AEO): ranking in Perplexity, ChatGPT Search, and Google AI Overviews",
          "Generative Engine Optimization (GEO): entity citations and brand knowledge graph presence",
          "Marketing attribution, CAC/LTV economics, and executive weekly reporting",
        ],
        projectOutcome: "Complete growth marketing master blueprint including paid media structure, SEO strategy, and analytics reporting.",
      },
    ],
    capstoneProject: {
      title: "Omnichannel Growth & Customer Acquisition Blueprint",
      description:
        "Develop an end-to-end customer acquisition strategy for a live business or approved case study, complete with Meta/Google campaign structures, ad creative assets, landing page CRO specifications, and an automated GA4 reporting dashboard.",
      deliverables: [
        "Executive presentation deck detailing customer economics and acquisition strategy",
        "Ready-to-deploy Meta Ads and Google Ads campaign architecture spreadsheets",
        "Landing page wireframe and copy document optimized for conversions",
      ],
    },
    mentorshipApproach:
      "Campaign teardowns, live ad account reviews with performance marketers, and interactive creative feedback sessions.",
    assessmentMethodology:
      "Evaluation on strategic coherence, CAC/ROAS economic feasibility, creative quality, and attribution rigor.",
    certificateDetails:
      "TAGVERSE Certified Growth & Performance Marketer Credential with digital badge.",
    priceDisplay: "Contact for Pricing",
    priceNote: "Corporate sponsorship and installment options available.",
    availability: "Enrollment Open",
    nextCohortDate: "Upcoming Cohort Starting Soon",
    faqs: [
      {
        question: "Will I learn how to optimize campaigns with actual ad spend?",
        answer:
          "Yes. Students analyze live ad account data, review historical campaign metrics, and construct deployable campaigns using verified media buying frameworks.",
      },
    ],
  },
  {
    id: "course-neurotech-bci",
    slug: "neurotechnology-bci",
    number: "04",
    title: "Neurotechnology & Brain-Computer Interfaces",
    category: "Neurotechnology",
    categorySlug: "neurotech",
    tagline: "Explore EEG signal processing, neural feature extraction & BCI machine learning.",
    shortDescription:
      "Explore the intersection of neuroscience, signal processing, machine learning and brain-computer interface technology.",
    overview:
      "An advanced interdisciplinary program exploring how electrical neural activity is recorded, filtered, decoded, and translated into digital commands. You will work with real EEG datasets, master digital signal processing (DSP), design artifact removal pipelines (ICA, Butterworth filters), extract frequency domain features (power spectral density, wavelets), and train machine learning classifiers for motor imagery and cognitive state classification.",
    skillLevel: "Intermediate – Advanced",
    duration: "8 Weeks (Part-time)",
    mode: "Live Research Seminars + Python Signal Processing Labs",
    prerequisites:
      "Working knowledge of Python programming (NumPy, SciPy, Matplotlib) and foundational concepts in linear algebra and calculus. Prior neuroscience knowledge is helpful but not mandatory.",
    whoShouldEnrol: [
      "Engineers and researchers eager to enter neurotechnology, biomedical engineering, or wearable device tech",
      "Data scientists and ML practitioners interested in biosignals, time-series data, and biological neural interfaces",
      "Innovators wanting to explore hands-on BCI applications, motor imagery, and EEG signal analysis",
    ],
    skillsDeveloped: [
      "Electrophysiology fundamentals: 10-20 electrode placement, synaptic potentials, and signal noise",
      "Digital signal processing in Python using MNE-Python, SciPy, and NumPy",
      "Artifact rejection: Independent Component Analysis (ICA), notch filtering, and bandpass pipelines",
      "Frequency domain analysis: Fourier transforms (FFT), Power Spectral Density (PSD), and Wavelets",
      "Feature engineering for EEG: Common Spatial Pattern (CSP), band power, and spatial filters",
      "Machine learning for BCI: Support Vector Machines (SVM), Random Forests, and EEGNet (Deep Learning)",
      "Real-time streaming protocols: Lab Streaming Layer (LSL) and OpenBCI architecture",
    ],
    technologiesCovered: [
      "Python 3.11",
      "MNE-Python",
      "NumPy & SciPy",
      "Scikit-Learn",
      "PyTorch",
      "Lab Streaming Layer (LSL)",
      "OpenBCI GUI",
      "Matplotlib & Seaborn",
      "Jupyter Lab",
    ],
    projectOutcomes: [
      "Automated EEG Preprocessing Pipeline with ICA artifact removal and filter logs",
      "Motor Imagery Classifier decoding left-hand vs right-hand intention from public PhysioNet data",
      "Cognitive Workload & Focus State Detector utilizing frontal theta/beta ratio analysis",
    ],
    curriculumPhases: [
      {
        phase: "Phase 1",
        title: "Introduction to Neurotechnology & EEG Data Acquisition",
        duration: "Weeks 1–2",
        topics: [
          "Neuron biology, action potentials, synaptic currents, and the 10-20 international electrode system",
          "EEG hardware architectures: electrodes (wet vs dry), impedance checks, ADC sampling, and noise sources",
          "Working with EEG data structures in Python: EDF, BDF, and MNE Raw objects",
          "Time-domain visualization and epoching raw continuous signals",
        ],
        projectOutcome: "Interactive script loading raw multi-channel EEG recordings, plotting sensor topography, and epoching trials.",
      },
      {
        phase: "Phase 2",
        title: "Digital Signal Processing & Artifact Removal",
        duration: "Weeks 3–4",
        topics: [
          "Sampling theorem (Nyquist rate), aliasing, and frequency domain representation",
          "Designing digital filters: bandpass, bandstop (notch 50/60Hz), and Butterworth filters",
          "Identifying artifacts: ocular blinks (EOG), cardiac (ECG), muscular (EMG), and line noise",
          "Independent Component Analysis (ICA) for automated ocular artifact decomposition",
        ],
        projectOutcome: "Complete DSP artifact cleaning pipeline transforming noisy EEG records into clean neural signals.",
      },
      {
        phase: "Phase 3",
        title: "Neural Feature Extraction & Spectral Analysis",
        duration: "Weeks 5–6",
        topics: [
          "Neural frequency bands: Delta (0.5–4Hz), Theta (4–8Hz), Alpha (8–13Hz), Beta (13–30Hz), Gamma (>30Hz)",
          "Power Spectral Density (PSD) estimation: Welch's method and multitaper spectral estimation",
          "Time-frequency analysis with Morlet wavelets and Spectrograms",
          "Spatial filtering: Common Spatial Patterns (CSP) for discriminant motor imagery signals",
        ],
        projectOutcome: "Feature extraction engine computing spatial covariance and spectral power distributions across experimental conditions.",
      },
      {
        phase: "Phase 4",
        title: "BCI Machine Learning, Motor Imagery & Deep Learning",
        duration: "Weeks 7–8",
        topics: [
          "Binary and multi-class classification: SVM, LDA, and Regularized Common Spatial Patterns",
          "Deep learning architectures for EEG: EEGNet and compact convolutional neural networks",
          "Real-time streaming integration using Lab Streaming Layer (LSL)",
          "Ethics, privacy considerations, and future horizons in invasive and non-invasive BCIs",
        ],
        projectOutcome: "Trained BCI classification pipeline evaluating cross-subject decoding accuracy with confusion matrices.",
      },
    ],
    capstoneProject: {
      title: "Motor Imagery BCI Decoding & Classification Pipeline",
      description:
        "Engineer a complete end-to-end BCI pipeline using public electrophysiological datasets (such as BCI Competition IV or PhysioNet EEG Motor Movement). Preprocess multi-channel raw EEG, apply ICA for artifact removal, extract CSP spatial features, train a machine learning model to classify user intent, and benchmark cross-validation metrics.",
      deliverables: [
        "Documented Jupyter notebook and modular Python repository with unit tests",
        "Comprehensive technical report with spectral plots, topographic maps, and classification benchmarks",
        "Recorded video presentation explaining signal processing choices and decoding accuracy",
      ],
    },
    mentorshipApproach:
      "Research paper discussions, signal processing code walk-throughs, and 1-on-1 algorithm troubleshooting with neurotechnology engineers.",
    assessmentMethodology:
      "Rigorous code reviews evaluating signal processing pipeline validity, filtering fidelity, cross-validation methodology, and mathematical rigor.",
    certificateDetails:
      "TAGVERSE Academy Neurotechnology & BCI Engineering Certification with verified project repository.",
    priceDisplay: "Contact for Pricing",
    priceNote: "Limited seats per cohort to ensure deep research mentoring. Prerequisites strictly evaluated.",
    availability: "Enrollment Open",
    nextCohortDate: "Upcoming Cohort Starting Soon",
    faqs: [
      {
        question: "Do I need physical EEG hardware to complete this course?",
        answer:
          "No physical headset is required. The curriculum utilizes verified research-grade public clinical and BCI competition datasets (PhysioNet, BCI Competition IV). Hardware interfacing with OpenBCI/Muse is covered for students who have devices.",
      },
      {
        question: "What is the technical difficulty of this course?",
        answer:
          "This is an advanced technical course requiring comfort with Python, scientific libraries (NumPy, SciPy), and basic linear algebra concepts.",
      },
    ],
  },
  {
    id: "course-ai-automation",
    slug: "ai-automation-business-systems",
    number: "05",
    title: "AI Automation & Business Systems",
    category: "Automation",
    categorySlug: "automation",
    tagline: "Engineer zero-touch enterprise workflows with n8n, webhooks, WhatsApp & LLMs.",
    shortDescription:
      "Learn to automate business workflows, connect applications and build intelligent systems that reduce repetitive work.",
    overview:
      "Eliminate repetitive manual operations. This course teaches you how to design, deploy, and scale autonomous business systems. You will learn to self-host n8n workflow infrastructure, connect disparate cloud applications with webhooks and REST APIs, build WhatsApp Business automation bots with official Meta APIs, integrate generative AI for dynamic document extraction, and orchestrate automated CRM deal pipelines.",
    skillLevel: "All Levels",
    duration: "6 Weeks (Part-time)",
    mode: "Live Practical Labs + Production Workflow Deployments",
    prerequisites:
      "No advanced programming knowledge required. Logical thinking, familiarity with cloud tools (Google Sheets, Notion), and basic understanding of web services are recommended.",
    whoShouldEnrol: [
      "Operations leads, founders, and agency owners wanting to automate internal workflows and eliminate manual data entry",
      "Freelancers and consultants wanting to offer high-ticket workflow automation services to clients",
      "Sales and marketing teams looking to automate lead enrichment, CRM syncing, and customer notifications",
    ],
    skillsDeveloped: [
      "Self-hosted n8n server setup, Docker containerization, and webhook security",
      "API integration fundamentals: authentication (OAuth, API keys, Bearer tokens), payloads, and response parsing",
      "Meta WhatsApp Business Cloud API integration for automated 2-way client communication",
      "Generative AI node integration: contextual reply generation, document parsing, and sentiment classification",
      "CRM automation: lead ingestion, round-robin assignment, and automated deal pipeline staging",
      "Error handling: retry queues, fallback notification routing, and Discord/Slack telemetry",
      "Database integration: syncing PostgreSQL, Airtable, Google Sheets, and cloud databases",
    ],
    technologiesCovered: [
      "n8n (Self-Hosted)",
      "Webhooks & REST APIs",
      "Meta WhatsApp Cloud API",
      "OpenAI & Claude APIs",
      "PostgreSQL & Supabase",
      "Airtable",
      "Google Workspace APIs",
      "Slack / Discord Bots",
      "Docker",
      "VPS Hosting (DigitalOcean / Hetzner)",
    ],
    projectOutcomes: [
      "Zero-Touch Multi-Channel Lead Ingestion & WhatsApp Instant Response System",
      "Automated Invoice & Contract Processing Pipeline extracting structured data with AI",
      "Autonomous Social Content Repurposing & Multi-Platform Publishing Engine",
    ],
    curriculumPhases: [
      {
        phase: "Phase 1",
        title: "Automation Fundamentals, Webhooks & n8n Architecture",
        duration: "Weeks 1–2",
        topics: [
          "Understanding APIs, REST methods (GET, POST, PUT, DELETE), and JSON payload structures",
          "Webhooks: triggers, payloads, listeners, and webhook signature verification",
          "Self-hosting n8n using Docker on a virtual private server (VPS) with SSL certificates",
          "Building deterministic multi-step workflows with branch logic, loops, and data transformations",
        ],
        projectOutcome: "Live self-hosted n8n instance running automated webhook listeners with error notifications.",
      },
      {
        phase: "Phase 2",
        title: "CRM Sync, Database Automation & Lead Routing",
        duration: "Weeks 3–4",
        topics: [
          "Connecting website forms, Meta Ads, and landing pages to automated intake pipelines",
          "Deduplicating leads, data normalization, and database storage (PostgreSQL/Supabase/Airtable)",
          "Round-robin lead assignment logic and automated rep notification sequences via Slack/Telegram",
          "Calendar scheduling automation with Google Calendar and automated booking confirmations",
        ],
        projectOutcome: "Autonomous sales pipeline automatically routing incoming leads to sales reps with calendar links.",
      },
      {
        phase: "Phase 3",
        title: "Official WhatsApp Cloud API & Conversational Bots",
        duration: "Weeks 4–5",
        topics: [
          "Meta WhatsApp Cloud API onboarding, phone number verification, and business manager setup",
          "Creating and submitting verified WhatsApp message templates with dynamic variables and interactive buttons",
          "Building 2-way interactive conversational bots answering FAQs and collecting user requirements",
          "Connecting LLMs to WhatsApp for contextual customer support and lead qualification",
        ],
        projectOutcome: "Fully functional WhatsApp Business bot handling lead intake, answering FAQs, and booking meetings.",
      },
      {
        phase: "Phase 4",
        title: "AI Document Extraction, Error Telemetry & Client Delivery",
        duration: "Weeks 5–6",
        topics: [
          "Automated PDF and receipt parsing using vision models and structured JSON schemas",
          "Automated GST invoice generation and email dispatch upon payment confirmation",
          "Enterprise error handling: retry mechanisms, dead-letter queues, and incident alerts",
          "Packaging and delivering automation solutions as a service to business clients",
        ],
        projectOutcome: "Complete end-to-end enterprise business operations automation system operating 24/7.",
      },
    ],
    capstoneProject: {
      title: "Autonomous Enterprise Operations & WhatsApp Automation Hub",
      description:
        "Design, build, and deploy an automated business operating system linking inbound web leads, instant WhatsApp conversational qualification, CRM database record creation, calendar booking, and automatic invoice generation with robust error telemetry.",
      deliverables: [
        "Exported, documented n8n JSON workflow templates with environment configuration files",
        "Live demonstrated end-to-end test run from web form submission to WhatsApp delivery",
        "Technical architecture and client handover documentation",
      ],
    },
    mentorshipApproach:
      "Live workflow debugging sessions, architecture consulting, and review of student workflow templates.",
    assessmentMethodology:
      "Tested on workflow execution speed, failure recovery, data integrity, and real-world business applicability.",
    certificateDetails:
      "TAGVERSE Certified Automation Architect Credential with verifiable workflow portfolio.",
    priceDisplay: "Contact for Pricing",
    priceNote: "Includes complete n8n deployment blueprints and verified workflow templates.",
    availability: "Enrollment Open",
    nextCohortDate: "Upcoming Cohort Starting Soon",
    faqs: [
      {
        question: "Can I use these skills to offer automation services to clients?",
        answer:
          "Yes. Many students utilize this curriculum to build and sell workflow automation and WhatsApp chatbot solutions to agencies, clinics, real estate firms, and e-commerce brands.",
      },
      {
        question: "What are the hosting costs for running self-hosted n8n?",
        answer:
          "Self-hosting n8n on a modern cloud VPS costs approximately $5 to $10 per month, giving you unlimited workflow executions without costly per-task fees charged by Zapier or Make.",
      },
    ],
  },
];

export function getAcademyCourseBySlug(slug: string): AcademyCourse | undefined {
  return ACADEMY_COURSES.find((c) => c.slug === slug || c.id === slug);
}
