"use client";

import Link from "next/link";
import { useMedia } from "./MediaProvider";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Services", href: "/services" },
      { label: "Studio", href: "/studio" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Journal", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export default function Footer() {
  const video = useMedia("footer.video");
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
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />

      <div className="container-x relative pb-12 pt-24">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="font-orbitron text-[13px] font-semibold uppercase tracking-[0.08em]">
                TAGVERSE<span style={{ color: "var(--accent-purple-soft)" }}>.IO</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">
              An AI-first creative studio for ambitious brands — strategy,
              content, digital, and a live studio you can actually be part of.
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
          <p>© 2026 Tagverse AI, Inc.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="transition-colors hover:text-white">X</a>
            <a href="#" className="transition-colors hover:text-white">LinkedIn</a>
            <a href="#" className="transition-colors hover:text-white">YouTube</a>
          </div>
        </div>

      </div>

      {/* oversized wordmark — full width, outside container */}
      <div className="pointer-events-none select-none w-full overflow-hidden pb-2">
        <div className="font-display text-[20vw] font-light leading-none tracking-display text-white/20 text-center whitespace-nowrap">
          Tagverse
        </div>
      </div>
    </footer>
  );
}
