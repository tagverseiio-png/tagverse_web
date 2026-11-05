export interface VyraCapability {
  id: string;
  number: string;
  title: string;
  domain: "growth" | "operations" | "finance" | "enterprise";
  tagline: string;
  overview: string;
  highlightMetric: { value: string; label: string };
  keyFeatures: string[];
  specs: string[];
}

export const VYRA_CAPABILITIES: VyraCapability[] = [
  {
    id: "crm-sales",
    number: "01",
    title: "CRM & Sales Management",
    domain: "growth",
    tagline: "High-velocity pipeline momentum and omnichannel lead conversion.",
    overview:
      "Transform chaotic sales communications into an organized revenue engine. VYRA CRM unifies official WhatsApp messaging, visual deal boards, lead scoring, and automated reminders so your sales squad never drops a high-intent conversation.",
    highlightMetric: { value: "< 10s", label: "Lead Response Velocity" },
    keyFeatures: [
      "Visual Kanban deal pipelines with drag-and-drop opportunity cards and custom stage triggers",
      "Instant omnichannel lead ingestion from Meta Ads, Google Ads, website forms, and WhatsApp",
      "Algorithmic deal scoring ranking leads by engagement velocity, budget, and firmographics",
      "Round-robin automated lead distribution across sales reps with SLA escalation timers",
      "Comprehensive 360° contact timelines logging every call, WhatsApp chat, email, and proposal",
      "One-click estimate and proposal generation with instant online client approvals",
    ],
    specs: ["WhatsApp Cloud API", "Kanban Stage Triggers", "Meta Ads Webhooks", "UTM Tracking"],
  },
  {
    id: "project-operations",
    number: "02",
    title: "Project & Operations Management",
    domain: "operations",
    tagline: "Total project clarity, milestone governance, and operational predictability.",
    overview:
      "Deliver client work on time and within budget. VYRA integrates multi-view task boards, automated milestone tracking, team time logs, and project health indicators into a seamless operational workspace.",
    highlightMetric: { value: "+42%", label: "On-Time Milestone Delivery" },
    keyFeatures: [
      "Multi-view task tracking: flexible Kanban boards, Gantt charts, interactive lists, and calendars",
      "Milestone governance with automated dependency mapping and delivery deadline alerts",
      "Built-in time tracker with live stopwatches, billable vs non-billable hour categorisation",
      "Comprehensive task delegation with subtasks, markdown checklists, priority tags, and file attachments",
      "Real-time project budget burn-rate tracking and margin profitability monitors",
      "Client milestone sign-off workflows preventing scope creep and unapproved revisions",
    ],
    specs: ["Gantt / Kanban / List", "Live Timers", "Dependency Engine", "Profitability Calc"],
  },
  {
    id: "employee-team",
    number: "03",
    title: "Employee & Team Management",
    domain: "operations",
    tagline: "Centralized people operations, attendance governance, and performance metrics.",
    overview:
      "Unify HR operations, employee directories, and performance tracking. Eliminate fragmented spreadsheets with transparent check-ins, automated leave approvals, and transparent sales commission leaderboards.",
    highlightMetric: { value: "100%", label: "Timesheet & HR Transparency" },
    keyFeatures: [
      "Digital employee directory with department org charts, emergency contacts, and skill tags",
      "Smart attendance tracking with geofenced check-in, overtime logs, and biometric/web clocking",
      "Automated leave management workflow with multi-level approvals and leave balance ledgers",
      "Sales rep target vs achievement dashboards with automated commission calculations",
      "Shift scheduling and workload capacity heatmaps to balance team bandwidth",
      "New hire onboarding checklists, document collection, and company policy library",
    ],
    specs: ["Geofence Check-in", "Leave Ledgers", "Commission Engine", "Org Architecture"],
  },
  {
    id: "marketing-management",
    number: "04",
    title: "Marketing Management",
    domain: "growth",
    tagline: "Omnichannel broadcast campaigns, audience segmentation, and attribution.",
    overview:
      "Orchestrate high-converting WhatsApp and email campaigns with laser-targeted segmentation. Track lead sources from first ad click to closed revenue with native UTM attribution.",
    highlightMetric: { value: "3.8x", label: "Average Campaign ROI Lift" },
    keyFeatures: [
      "Omnichannel broadcast hub supporting official Meta WhatsApp templates, SMS, and email",
      "Dynamic customer segmentation based on purchase history, tags, engagement, and deal stage",
      "Pre-approved WhatsApp Cloud API templates with dynamic variables and interactive CTA buttons",
      "Automated drip nurture sequences triggering personalized follow-ups after form submissions",
      "Full-funnel campaign ROI analytics calculating Customer Acquisition Cost (CAC) per ad channel",
      "UTM parameter tracking across landing pages, social ads, and influencer campaigns",
    ],
    specs: ["Meta Verified Templates", "Dynamic Drip Engine", "Attribution Modeling", "Tag Filtering"],
  },
  {
    id: "finance-billing",
    number: "05",
    title: "Finance & Billing",
    domain: "finance",
    tagline: "GST-compliant invoicing, subscription retainers, and bank-grade reconciliation.",
    overview:
      "Accelerate receivables and eliminate billing friction. Generate professional GST invoices in seconds, collect advance payments via integrated gateways, and automate recurring retainer collections.",
    highlightMetric: { value: "-65%", label: "Overdue Receivables" },
    keyFeatures: [
      "GST-compliant invoice generation with automated CGST, SGST, IGST calculations and HSN/SAC codes",
      "One-click estimate-to-invoice conversion with client acceptance tracking and revision logs",
      "Recurring retainer billing with automated milestone invoices and advance payment tracking",
      "Native payment gateway links (Razorpay, Stripe, Cashfree, UPI QR) for instant online checkout",
      "Automated WhatsApp & Email payment reminders with custom escalation schedules",
      "Expense logging, vendor bills, receipt capture, and real-time P&L ledger reconciliation",
    ],
    specs: ["GST E-Way Ready", "Auto-Reminders", "Multi-Gateway Webhooks", "P&L Summaries"],
  },
  {
    id: "products-services",
    number: "06",
    title: "Products & Services Management",
    domain: "finance",
    tagline: "Multi-tier service catalog, inventory tracking, and dynamic rate cards.",
    overview:
      "Standardize your company's offerings across packages, hourly retainers, and physical SKU inventory. Maintain uniform pricing guidelines across your entire sales organization.",
    highlightMetric: { value: "Zero", label: "Pricing Discrepancies" },
    keyFeatures: [
      "Unified catalog supporting physical product SKUs, digital assets, and recurring services",
      "Multi-tier price books with custom margins for distributors, VIP clients, and agency retainers",
      "Dynamic inventory level monitoring with automated reorder alerts and low-stock warnings",
      "Service package builder bundling creative design, video production, and advertising retainers",
      "Custom rate cards for specialized consulting, rush deliverables, and studio rentals",
      "Comprehensive cost-of-goods-sold (COGS) tracking against final billed invoice revenues",
    ],
    specs: ["SKU Tracking", "Tiered Price Books", "Bundled Retainers", "Stock Alerts"],
  },
  {
    id: "studio-booking",
    number: "07",
    title: "Studio & Booking Management",
    domain: "operations",
    tagline: "Resource scheduling, studio room reservations, and calendar synchronization.",
    overview:
      "Maximize production facility utilization. Manage podcast studios, video production floors, editing bays, and high-end equipment bookings without double-booking conflicts.",
    highlightMetric: { value: "+85%", label: "Studio Resource Utilization" },
    keyFeatures: [
      "Visual resource booking calendar with real-time slot availability across all studio bays",
      "Equipment checkout logs preventing gear loss and tracking camera/lens availability",
      "Self-service client booking portal with upfront deposit collection via integrated payment links",
      "Instant calendar 2-way sync with Google Calendar, Outlook, and Apple iCal",
      "Automated WhatsApp appointment confirmations, directions, and pre-shoot checklists",
      "Flexible cancellation policies, buffer times between sessions, and overtime rate calculation",
    ],
    specs: ["2-Way Calendar Sync", "Equipment Tagging", "Slot Buffers", "WhatsApp Confirmations"],
  },
  {
    id: "client-portal",
    number: "08",
    title: "Client Portal",
    domain: "enterprise",
    tagline: "White-label client experience, transparent progress, and fast invoice approval.",
    overview:
      "Elevate client trust with a dedicated, cinema-grade branded digital portal. Clients can review project deliverables, download finalized assets, approve proposals, and pay invoices 24/7.",
    highlightMetric: { value: "4.9/5", label: "Client Satisfaction Rating" },
    keyFeatures: [
      "Secure client self-service portal accessible via customized company domain and branding",
      "Real-time milestone tracker displaying active sprint deliverables and completed phases",
      "Asset review gallery with timestamped revision comments and one-click final sign-offs",
      "Online invoice hub allowing clients to view billing history and settle payments via credit card or UPI",
      "Integrated support ticket desk and direct messaging thread with the assigned project squad",
      "Confidential document vault with secure, expiration-gated downloads for NDAs and contracts",
    ],
    specs: ["White-Label Domain", "Asset Proofing", "1-Click Payments", "Encrypted Vault"],
  },
  {
    id: "ai-automation",
    number: "09",
    title: "AI & Automation",
    domain: "growth",
    tagline: "Autonomous workflow triggers, smart replies, and predictive deal intelligence.",
    overview:
      "Empower your staff with generative and deterministic AI. Automate repetitive data entry, generate instant suggested replies for WhatsApp conversations, and predict deal close probabilities.",
    highlightMetric: { value: "-70%", label: "Manual Data Entry Time" },
    keyFeatures: [
      "No-code visual workflow builder connecting triggers, conditions, delays, and multi-step actions",
      "AI smart reply suggestions contextualized on your uploaded business PDFs and past customer chats",
      "Automated meeting and audio note transcription with structured executive action item summaries",
      "Predictive deal health scoring alerting account executives before high-value deals churn",
      "Native bi-directional webhooks integrating with n8n, Zapier, Make, and internal REST APIs",
      "Automated lead enrichment gathering company size, industry, and social presence upon submission",
    ],
    specs: ["Visual Workflow Canvas", "Contextual AI RAG", "Speech Transcription", "Webhook Dispatcher"],
  },
  {
    id: "reports-bi",
    number: "10",
    title: "Reports & Business Intelligence",
    domain: "growth",
    tagline: "Executive command center, revenue forecasting, and funnel conversion audits.",
    overview:
      "Gain complete visibility over organizational performance. Transform raw data into executive insights with real-time dashboards for sales velocity, employee billability, and cash flow forecasts.",
    highlightMetric: { value: "100%", label: "Real-Time Revenue Visibility" },
    keyFeatures: [
      "Executive dashboard aggregating real-time MRR, weighted pipeline value, and cash flow projections",
      "Sales conversion funnel analytics uncovering bottleneck stages and rep win/loss ratios",
      "Employee productivity and billable utilization heatmaps across project sprints",
      "Accounts receivable aging schedules tracking overdue client balances and average collection periods",
      "Interactive drill-down reports by lead source, service category, and customer segment",
      "One-click high-resolution PDF report generation and automated weekly email digests for directors",
    ],
    specs: ["Real-Time Aggregations", "Cohort Funnel Heatmaps", "PDF Engine", "Automated Digests"],
  },
  {
    id: "document-management",
    number: "11",
    title: "Document Management",
    domain: "enterprise",
    tagline: "Centralized cloud vault, legal agreement templates, and built-in e-signatures.",
    overview:
      "Eliminate misplaced contracts and paperwork chaos. Store proposals, master service agreements (MSAs), NDAs, and client invoices in an encrypted, compliant cloud repository.",
    highlightMetric: { value: "99.9%", label: "Document Traceability" },
    keyFeatures: [
      "Cloud document repository organized by client, project, vendor, and legal contract folders",
      "Pre-built template library for Master Service Agreements (MSAs), NDAs, and project statements of work",
      "Integrated legally-binding electronic signature collection with full timestamped audit logs",
      "Document versioning history with side-by-side diffing and author modification tracking",
      "Full-text search indexing across scanned contracts, PDFs, invoices, and project briefs",
      "Granular access permissions ensuring sensitive salary sheets or contracts stay strictly confidential",
    ],
    specs: ["E-Sign Audit Trails", "AES-256 Storage", "Version Control", "Full-Text Indexing"],
  },
  {
    id: "rbac-security",
    number: "12",
    title: "Role-Based Access Control (RBAC)",
    domain: "enterprise",
    tagline: "Enterprise security architecture, field-level masking, and complete audit logs.",
    overview:
      "Safeguard critical business records with granular role governance. Ensure team members only view the exact data necessary for their role while maintaining tamper-evident audit trails.",
    highlightMetric: { value: "Zero", label: "Unauthorized Data Exposure" },
    keyFeatures: [
      "Granular role hierarchy: Super Admin, Branch Manager, Sales Lead, Rep, Finance, and Client Guest",
      "Field-level data masking (e.g. concealing customer phone numbers or company P&L from junior reps)",
      "Strict data isolation between regional branches, independent agency accounts, and franchises",
      "Comprehensive tamper-evident security audit trails tracking every record view, export, or edit",
      "Two-Factor Authentication (2FA) enforcement via authenticator apps and SMS OTPs",
      "IP whitelisting, session timeout governance, and device authentication management",
    ],
    specs: ["Field Masking", "Multi-Tenant Isolation", "Tamper-Evident Logs", "2FA / IP Shield"],
  },
];
