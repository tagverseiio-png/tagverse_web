"use client";

import Link from "next/link";
import { useMedia } from "./MediaProvider";
import { useContentResolver } from "./ContentProvider";
import BrandLogo from "./BrandLogo";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Services", href: "/services" },
      { label: "Products", href: "/products" },
      { label: "Studio", href: "/studio" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "About", href: "/#hallucination" },
    ],
  },
  {
    title: "Academy",
    links: [
      { label: "Academy Overview", href: "/academy" },
      { label: "All Courses", href: "/academy/courses" },
      { label: "AI & Agentic AI", href: "/academy/courses/generative-ai-agentic-ai" },
      { label: "Full Stack Development", href: "/academy/courses/full-stack-development" },
      { label: "Digital Marketing", href: "/academy/courses/digital-marketing-growth" },
      { label: "Neurotech & BCI", href: "/academy/courses/neurotechnology-bci" },
      { label: "AI Automation", href: "/academy/courses/ai-automation-business-systems" },
      { label: "Projects & Buildathons", href: "/academy/projects" },
      { label: "Mentorship", href: "/academy/mentorship" },
    ],
  },
  {
    title: "Resources & Contact",
    links: [
      { label: "Book Strategy Call", href: "/#contact" },
      { label: "Book Free Orientation", href: "/academy/book-orientation" },
      { label: "Studio Booking", href: "/studio" },
      { label: "Contact Academy", href: "/academy/enroll" },
      { label: "Client Enquiries", href: "/#contact" },
    ],
  },
];

export default function Footer() {
  const video = useMedia("footer.video");
  const c = useContentResolver();
  return (
    <footer className="relative bg-black text-white">
      {/* ambient video backdrop */}
      <video
        key={video}
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />

      <div className="container-x relative pb-12 pt-24">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_0.9fr_1.3fr_0.9fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 group py-1" aria-label="TAGVERSE Home">
              <BrandLogo lightText={true} variant="wordmark" className="h-[13px] sm:h-[14px]" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">
              {c("footer.tagline")}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono-g text-[0.7rem] uppercase tracking-[0.16em] text-white/40">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/45 md:flex-row md:items-center">
          <p>{c("footer.copyright")}</p>
          <div className="flex items-center gap-5">
            <a href="https://www.instagram.com/tagverse.io/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/tagverse-io/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61585655193668" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* oversized wordmark — full width, outside container */}
      <div className="pointer-events-none select-none w-full overflow-hidden pb-2">
        <div
          className="font-display text-[20vw] font-light leading-none tracking-display text-center whitespace-nowrap"
          style={{ color: "var(--accent-purple-soft)", opacity: 0.45 }}
        >
          Tagverse
        </div>
      </div>
    </footer>
  );
}
