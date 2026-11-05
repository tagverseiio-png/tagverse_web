export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  popular?: boolean;
  monthlyPrice: number | null; // null for custom
  annualPrice: number | null;  // per month when billed annually
  currency: string;
  trialDays: number;
  description: string;
  targetAudience: string;
  features: string[];
  limits: {
    users: string;
    contacts: string;
    whatsappNumbers: string;
    storage: string;
    support: string;
  };
  ctaText: string;
}

export const VYRA_PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Essential CRM & operations for small teams",
    monthlyPrice: 999,
    annualPrice: 799,
    currency: "₹",
    trialDays: 30,
    description: "Perfect for solopreneurs, boutique consultancies, and small teams seeking centralized customer tracking and GST invoicing.",
    targetAudience: "Solopreneurs & Teams of 1–3",
    features: [
      "Full CRM & Lead Management Pipeline",
      "Official WhatsApp 2-Way Inbox (1 Number)",
      "Project & Task Kanban Boards",
      "GST-Compliant Invoicing & Estimates",
      "Integrated Razorpay / Stripe Payment Links",
      "Basic Team Attendance & Leave Tracker",
      "Standard Sales Reports & CSV Export",
      "Community & Email Support",
    ],
    limits: {
      users: "Up to 3 Users",
      contacts: "Up to 2,500 Contacts",
      whatsappNumbers: "1 WhatsApp Number",
      storage: "5 GB Cloud Storage",
      support: "Standard Email Support (24h)",
    },
    ctaText: "Start Free 30-Day Trial",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Advanced automation for scaling sales teams",
    badge: "Most Popular",
    popular: true,
    monthlyPrice: 2499,
    annualPrice: 1999,
    currency: "₹",
    trialDays: 30,
    description: "The complete operating system for high-growth agencies and sales squads needing omnichannel nurture and automated workflows.",
    targetAudience: "Scaling Teams of 4–15",
    features: [
      "Everything in Starter, plus:",
      "Multi-Pipeline Kanban with Automation Rules",
      "Omnichannel WhatsApp & Email Drip Sequences",
      "Employee KPIs, Targets & Commission Tracking",
      "Branded Client Portal for Project Delivery",
      "Time Tracking & Billable Hour Timesheets",
      "Automated WhatsApp Payment Reminders",
      "Product & Service Catalog with Rate Cards",
      "Role-Based Access Control (5 Custom Roles)",
      "n8n & Webhooks Workflow Automation",
    ],
    limits: {
      users: "Up to 15 Users",
      contacts: "Up to 25,000 Contacts",
      whatsappNumbers: "Up to 3 WhatsApp Numbers",
      storage: "50 GB Cloud Storage",
      support: "Priority Chat & Email Support (4h)",
    },
    ctaText: "Start Free 30-Day Trial",
  },
  {
    id: "business",
    name: "Business",
    tagline: "Total operational control for established firms",
    badge: "Full Power",
    monthlyPrice: 4999,
    annualPrice: 3999,
    currency: "₹",
    trialDays: 30,
    description: "Uncompromised business intelligence, studio scheduling, document management, and AI agent readiness for mid-market firms.",
    targetAudience: "Established Companies (16–50 Users)",
    features: [
      "Everything in Growth, plus:",
      "Studio & Equipment Resource Booking Engine",
      "Document Vault with E-Sign & Expiration Tracking",
      "Executive BI Dashboards & Funnel Heatmaps",
      "AI Smart Replies & Call Summary Ready",
      "VYRA AI Voice Agent Integration Ready",
      "Vendor Procurement & Purchase Order Approvals",
      "Granular Field-Level Data Masking & RBAC",
      "Audit Trail & Compliance Security Logs",
      "Dedicated Onboarding & Migration Specialist",
    ],
    limits: {
      users: "Up to 50 Users",
      contacts: "Unlimited Contacts",
      whatsappNumbers: "Up to 10 WhatsApp Numbers",
      storage: "250 GB Cloud Storage",
      support: "Dedicated Account Manager (1h SLA)",
    },
    ctaText: "Start Free 30-Day Trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Custom architecture & private VPC infrastructure",
    monthlyPrice: null,
    annualPrice: null,
    currency: "₹",
    trialDays: 30,
    description: "Engineered for large enterprises and multi-branch networks requiring custom AI agent models, ERP sync, and private cloud deployment.",
    targetAudience: "Large Enterprises (50+ Users / Multi-Branch)",
    features: [
      "Everything in Business, plus:",
      "Dedicated Private VPC or On-Premise Deployment",
      "Custom Fine-Tuned AI Voice & Chat Models",
      "Full ERP, SAP, or Legacy Database Bi-Directional Sync",
      "Custom Microservice & Feature Engineering",
      "Custom SLA with 99.95% Uptime Guarantee",
      "Enterprise Single Sign-On (SSO / SAML 2.0)",
      "Dedicated Solutions Architect & 24/7 Phone Support",
    ],
    limits: {
      users: "Unlimited Users",
      contacts: "Unlimited",
      whatsappNumbers: "Unlimited Numbers",
      storage: "Unlimited Dedicated Storage",
      support: "24/7/365 Dedicated Phone & Slack",
    },
    ctaText: "Contact Sales",
  },
];
