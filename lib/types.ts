export type PortfolioCategory =
  | "Website & App Development"
  | "AI & Intelligent Solutions"
  | "SaaS, CRM & Business Software"
  | "Automation & Integrations"
  | "Branding & Creative Design"
  | "Digital Marketing & Growth"
  | "Video & Media Production"
  | "E-commerce & Digital Platforms";

/**
 * Firestore `projects` collection — document shape.
 */
export type Project = {
  id: string;
  slug?: string;
  title: string;
  category: string; // Primary category for backward compatibility
  categories?: string[]; // Multiple categories support
  year: string;
  client?: string;
  summary?: string;
  description?: string;
  services?: string[];
  technologies?: string[];
  liveUrl?: string;
  url?: string;
  iframeUrl?: string;
  img?: string;
  gallery?: string[];
  featured?: boolean;
  order?: number;
  published?: boolean;
  // Complete case study fields:
  challenge?: string;
  solution?: string;
  keyDeliverables?: string[];
  outcome?: string;
  impactNotes?: string;
};

export type ProductCategory =
  | "CRM Software"
  | "ERP Software"
  | "Billing & Invoicing Software"
  | "Learning Management Systems (LMS)"
  | "Custom SaaS Platforms";

/**
 * Products & Internal Solutions (VYRA CRM, TAGVERSE Virtual Office, Neuro Forge, etc.)
 */
export type Product = {
  id: string;
  name: string;
  category: ProductCategory | string;
  tagline: string;
  description: string;
  features: string[];
  status: "live" | "prototype" | "upcoming";
  demoUrl?: string;
  repoUrl?: string;
  img?: string;
  order?: number;
};

/**
 * Firestore `logos` collection — the "trusted by" marquee.
 */
export type Logo = {
  id: string;
  text?: string;
  img?: string;
  url?: string;
  order?: number;
};

/**
 * CRM Note structure
 */
export type CRMNote = {
  id: string;
  text: string;
  date: string;
  author: string;
};

/**
 * Firestore `enquiries` collection — contact form submissions & CRM Leads.
 */
export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  service?: string;
  budget?: string;
  timeline?: string;
  stage?: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";
  assignedTo?: string;
  notes?: CRMNote[];
  source?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
};

/**
 * Firestore `studioBookings` collection — studio service bookings.
 */
export type StudioBooking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;          // e.g. "2026-09-15"
  time: string;          // e.g. "9AM - 12PM"
  services: string[];    // e.g. ["Podcast Production", "Commercial Shoots"]
  notes?: string;
  status: "pending" | "confirmed" | "rejected";
  createdAt: string;
  /** Legacy show-based booking fields (kept for old data) */
  showId?: string;
  showTitle?: string;
  qty?: number;
};

/**
 * Firestore `studioShows` collection — dynamic studio live recordings.
 */
export type StudioShow = {
  id: string;
  title: string;
  guest: string;
  date: string;
  day: string;
  time: string;
  venue: string;
  seatsLeft: number;
  tag: string;
  createdAt: string;
};

/**
 * Admin User & Role-Based Access Control (RBAC)
 */
export type AdminRole = "super_admin" | "admin" | "marketing" | "sales" | "developer";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  active: boolean;
  createdAt: string;
  lastLogin?: string;
};

/**
 * Integration & Webhook Settings
 */
export type IntegrationSettings = {
  n8nWebhookUrl?: string;
  n8nEnabled?: boolean;
  whatsappEnabled?: boolean;
  whatsappNumber?: string;
  emailNotificationsEnabled?: boolean;
  notificationEmail?: string;
};
