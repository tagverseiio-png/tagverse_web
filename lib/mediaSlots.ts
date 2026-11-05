/**
 * Registry of every editable media slot on the home page.
 *
 * Each slot has a stable `key` used as the Firestore document id in the
 * `media` collection. A document's `url` field overrides the `default` here:
 *   - images: a compressed base64 data URL (stored straight in the doc)
 *   - videos: an external/Storage URL (videos are too large for Firestore)
 *
 * The admin "Home media" tab is generated from this list, and components
 * resolve their media with useMedia(key) — so adding a slot is one entry.
 */
export type MediaType = "image" | "video";

export type MediaSlot = {
  key: string;
  label: string;
  section: string;
  type: MediaType;
  default: string;
};

export const MEDIA_SLOTS: MediaSlot[] = [
  // Hero
  {
    key: "hero.video",
    label: "Ambient background video",
    section: "Hero",
    type: "video",
    default: "/assets/videos/home/footer-ambient.mp4",
  },
  // Hallucination
  {
    key: "hallucination.video",
    label: "Showreel video",
    section: "Intro / showreel",
    type: "video",
    default: "/assets/videos/home/hero-hallucinations-preview.mp4",
  },
  {
    key: "hallucination.poster",
    label: "Showreel poster image",
    section: "Intro / showreel",
    type: "image",
    default: "/hero-home.webp",
  },
  // Complexity ("What we do")
  {
    key: "complexity.0",
    label: "Card 1 background",
    section: "What we do",
    type: "image",
    default: "/assets/images/home/stepped-feature-bg-1.webp",
  },
  {
    key: "complexity.1",
    label: "Card 2 background",
    section: "What we do",
    type: "image",
    default: "/assets/images/home/stepped-feature-bg-2.webp",
  },
  {
    key: "complexity.2",
    label: "Card 3 background",
    section: "What we do",
    type: "image",
    default: "/assets/images/home/stepped-feature-bg-1.webp",
  },
  // AgentCanvas (process steps)
  {
    key: "agentcanvas.0",
    label: "Step 1 — Discover",
    section: "Process",
    type: "image",
    default: "/assets/images/home/create-the-agent-1.png",
  },
  {
    key: "agentcanvas.1",
    label: "Step 2 — Strategise",
    section: "Process",
    type: "image",
    default: "/assets/images/home/define-policies-1.webp",
  },
  {
    key: "agentcanvas.2",
    label: "Step 3 — Create",
    section: "Process",
    type: "image",
    default: "/assets/images/home/design-the-logic-1.webp",
  },
  {
    key: "agentcanvas.3",
    label: "Step 4 — Launch",
    section: "Process",
    type: "image",
    default: "/assets/images/home/test-and-launch-1.webp",
  },
  {
    key: "agentcanvas.4",
    label: "Step 5 — Scale",
    section: "Process",
    type: "image",
    default: "/assets/images/home/monitor-and-improve-1.webp",
  },
  // Insights (Growth OS)
  {
    key: "insights.0",
    label: "Card 1 — Smart content engine",
    section: "Growth OS",
    type: "image",
    default: "/assets/images/insights/smart-suggestion-layer-1.webp",
  },
  {
    key: "insights.1",
    label: "Card 2 — Paid media",
    section: "Growth OS",
    type: "image",
    default: "/assets/images/insights/smart-suggestion-layer-2.webp",
  },
  {
    key: "insights.2",
    label: "Card 3 — Automation layer",
    section: "Growth OS",
    type: "image",
    default: "/assets/images/insights/smart-suggestion-layer-3.webp",
  },
  // Spotlight (case study)
  {
    key: "spotlight.bg",
    label: "Case study background",
    section: "Results",
    type: "image",
    default: "/assets/images/home/spotlight-doordash-background.jpg",
  },
  {
    key: "spotlight.headshot",
    label: "Client headshot",
    section: "Results",
    type: "image",
    default: "/assets/images/home/spotlight-andy-fang-headshot.webp",
  },
  // CTA
  {
    key: "cta.bg",
    label: "CTA background",
    section: "Call to action",
    type: "image",
    default: "/hero-home.webp",
  },
  // Footer
  {
    key: "footer.video",
    label: "Ambient background video",
    section: "Footer",
    type: "video",
    default: "/assets/videos/home/footer-ambient.mp4",
  },
];

export const MEDIA_DEFAULTS: Record<string, string> = Object.fromEntries(
  MEDIA_SLOTS.map((s) => [s.key, s.default]),
);
