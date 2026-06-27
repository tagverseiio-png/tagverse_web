/**
 * Registry of every editable TEXT slot on the home page.
 *
 * Each slot has a stable `key` used as the Firestore document id in the
 * `content` collection. A document's `value` field overrides the `default`.
 * The admin "Content" tab is generated from this list, and components resolve
 * their copy with useContent(key) / useContentResolver().
 */
export type ContentSlot = {
  key: string;
  label: string;
  section: string;
  default: string;
  multiline?: boolean;
};

export const CONTENT_SLOTS: ContentSlot[] = [
  // ---- Hero ----
  { key: "hero.badge", label: "Badge tag", section: "Hero", default: "New" },
  { key: "hero.badgeText", label: "Badge text", section: "Hero", default: "TAGVERSE Studio Now Open in Chennai" },
  { key: "hero.title1", label: "Headline line 1", section: "Hero", default: "Marketing that thinks." },
  { key: "hero.title2", label: "Headline line 2 (italic)", section: "Hero", default: "Brands that move." },
  { key: "hero.subtitle", label: "Subtitle", section: "Hero", default: "AI-first creative studio for brands that want to grow faster, look better, and convert harder.", multiline: true },
  { key: "hero.cta", label: "Button label", section: "Hero", default: "Book a call" },

  // ---- Intro / showreel ----
  { key: "intro.title1", label: "Headline", section: "Intro / showreel", default: "Great marketing shouldn't take 6 months." },
  { key: "intro.title2", label: "Headline (italic)", section: "Intro / showreel", default: "Ours doesn't." },
  { key: "intro.watch", label: "Watch button label", section: "Intro / showreel", default: "Watch (1:30)" },
  { key: "intro.body", label: "Body", section: "Intro / showreel", default: "From strategy to execution — content, web, ads, and automation — live in weeks, not quarters.", multiline: true },

  // ---- Logo marquee (heading only; logos are managed in the Logos tab) ----
  { key: "marquee.heading", label: "Heading", section: "Logo marquee", default: "Trusted by brands we've helped grow" },

  // ---- Stats ----
  { key: "stats.0.value", label: "Stat 1 value", section: "Stats", default: "3x" },
  { key: "stats.0.label", label: "Stat 1 label", section: "Stats", default: "Average ROAS improvement" },
  { key: "stats.1.value", label: "Stat 2 value", section: "Stats", default: "8" },
  { key: "stats.1.label", label: "Stat 2 label", section: "Stats", default: "Markets served" },
  { key: "stats.2.value", label: "Stat 3 value", section: "Stats", default: "∞" },
  { key: "stats.2.label", label: "Stat 3 label", section: "Stats", default: "Custom campaigns" },

  // ---- What we do ----
  { key: "complexity.eyebrow", label: "Eyebrow", section: "What we do", default: "What we do" },
  { key: "complexity.heading", label: "Heading", section: "What we do", default: "Built to handle everything" },
  { key: "complexity.0.title", label: "Card 1 title", section: "What we do", default: "AI-powered execution" },
  { key: "complexity.0.body", label: "Card 1 body", section: "What we do", default: "Strategy, content, and ads built with AI at the core — faster output, smarter targeting", multiline: true },
  { key: "complexity.1.title", label: "Card 2 title", section: "What we do", default: "Done-in-weeks" },
  { key: "complexity.1.body", label: "Card 2 body", section: "What we do", default: "Onboarding to live campaigns in under 14 days", multiline: true },
  { key: "complexity.2.title", label: "Card 3 title", section: "What we do", default: "Full-stack creative" },
  { key: "complexity.2.body", label: "Card 3 body", section: "What we do", default: "Reels, web, ads, branding, automation — one studio handles it all", multiline: true },

  // ---- Process ----
  { key: "canvas.eyebrow", label: "Eyebrow", section: "Process", default: "The TAGVERSE System" },
  { key: "canvas.heading", label: "Heading", section: "Process", default: "We don't just make content. We build marketing systems that compound — every asset, every campaign, every automation works together.", multiline: true },
  { key: "canvas.cta", label: "Button label", section: "Process", default: "Explore our process" },
  { key: "canvas.0.title", label: "Step 1 title", section: "Process", default: "Discover" },
  { key: "canvas.0.body", label: "Step 1 body", section: "Process", default: "We audit your brand, market, and competitors to find the gaps worth owning.", multiline: true },
  { key: "canvas.1.title", label: "Step 2 title", section: "Process", default: "Strategise" },
  { key: "canvas.1.body", label: "Step 2 body", section: "Process", default: "We build a 90-day growth plan across content, paid, and digital channels.", multiline: true },
  { key: "canvas.2.title", label: "Step 3 title", section: "Process", default: "Create" },
  { key: "canvas.2.body", label: "Step 3 body", section: "Process", default: "Our studio produces content, ads, and digital assets — built for performance.", multiline: true },
  { key: "canvas.3.title", label: "Step 4 title", section: "Process", default: "Launch" },
  { key: "canvas.3.body", label: "Step 4 body", section: "Process", default: "Campaigns go live with full tracking, pixel setup, and automation in place.", multiline: true },
  { key: "canvas.4.title", label: "Step 5 title", section: "Process", default: "Scale" },
  { key: "canvas.4.body", label: "Step 5 body", section: "Process", default: "We optimise weekly and unlock new channels as data comes in.", multiline: true },

  // ---- Growth OS ----
  { key: "insights.eyebrow", label: "Eyebrow", section: "Growth OS", default: "Growth OS" },
  { key: "insights.heading", label: "Heading", section: "Growth OS", default: "Every client gets a custom Growth OS — a connected system of content, ads, automation, and analytics that runs your marketing like a machine.", multiline: true },
  { key: "insights.cta", label: "Button label", section: "Growth OS", default: "See how it works" },
  { key: "insights.0.title", label: "Card 1 title", section: "Growth OS", default: "Smart content engine" },
  { key: "insights.0.body", label: "Card 1 body", section: "Growth OS", default: "Reels, carousels, and copy built around your ICP and buying triggers", multiline: true },
  { key: "insights.1.title", label: "Card 2 title", section: "Growth OS", default: "Paid media that converts" },
  { key: "insights.1.body", label: "Card 2 body", section: "Growth OS", default: "Meta and Google campaigns managed with AI-assisted optimisation", multiline: true },
  { key: "insights.2.title", label: "Card 3 title", section: "Growth OS", default: "Automation layer" },
  { key: "insights.2.body", label: "Card 3 body", section: "Growth OS", default: "WhatsApp flows, lead nurture, CRM sync — zero manual follow-up", multiline: true },

  // ---- Results ----
  { key: "spotlight.eyebrow", label: "Eyebrow", section: "Results", default: "Results" },
  { key: "spotlight.heading", label: "Heading", section: "Results", default: "See how brands scaled with TAGVERSE" },
  { key: "spotlight.badge", label: "Badge", section: "Results", default: "Case study" },
  { key: "spotlight.statValue", label: "Stat value", section: "Results", default: "(X)%" },
  { key: "spotlight.statLabel", label: "Stat label", section: "Results", default: "Growth" },
  { key: "spotlight.cardTitle", label: "Card title", section: "Results", default: "How (Client Name) grew (X)% in (timeframe)" },
  { key: "spotlight.quote", label: "Testimonial quote", section: "Results", default: "(Placeholder for client testimonial)", multiline: true },
  { key: "spotlight.name", label: "Client name", section: "Results", default: "(Client name)" },
  { key: "spotlight.role", label: "Client role", section: "Results", default: "(Role, brand)" },
  { key: "spotlight.cta", label: "Button label", section: "Results", default: "View case study" },

  // ---- Call to action ----
  { key: "cta.eyebrow", label: "Eyebrow", section: "Call to action", default: "Let's build something" },
  { key: "cta.heading", label: "Heading", section: "Call to action", default: "Ready to see what TAGVERSE can do for your brand?", multiline: true },
  { key: "cta.body", label: "Body", section: "Call to action", default: "We work with founders, CMOs, and growth teams who want a creative partner that executes — not just advises. Spots are limited each month.", multiline: true },
  { key: "cta.button", label: "Button label", section: "Call to action", default: "Book a call" },

  // ---- Built on trust ----
  { key: "compliance.eyebrow", label: "Eyebrow", section: "Built on trust", default: "Built on trust" },
  { key: "compliance.0.title", label: "Card 1 title", section: "Built on trust", default: "AI-First Agency" },
  { key: "compliance.0.body", label: "Card 1 body", section: "Built on trust", default: "Every deliverable is built with AI tools that cut time and increase output quality.", multiline: true },
  { key: "compliance.1.title", label: "Card 2 title", section: "Built on trust", default: "Multi-market" },
  { key: "compliance.1.body", label: "Card 2 body", section: "Built on trust", default: "Active across India, UAE, Malaysia, Singapore, and beyond.", multiline: true },
  { key: "compliance.2.title", label: "Card 3 title", section: "Built on trust", default: "Performance-led" },
  { key: "compliance.2.body", label: "Card 3 body", section: "Built on trust", default: "We tie our work to metrics that matter — leads, ROAS, revenue.", multiline: true },

  // ---- Footer ----
  { key: "footer.tagline", label: "Tagline", section: "Footer", default: "An AI-first creative studio for ambitious brands — strategy, content, digital, and a live studio you can actually be part of.", multiline: true },
  { key: "footer.copyright", label: "Copyright", section: "Footer", default: "© 2026 Tagverse AI, Inc." },
];

export const CONTENT_DEFAULTS: Record<string, string> = Object.fromEntries(
  CONTENT_SLOTS.map((s) => [s.key, s.default]),
);
