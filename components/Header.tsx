"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/studio" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-hero pt-3">
        <div
          className={`flex h-14 items-center justify-between rounded-full px-3 pl-5 text-white transition-all duration-300 ${
            scrolled
              ? "border border-white/10 bg-black/40 backdrop-blur-xl"
              : "border border-transparent"
          }`}
        >
          <Link href="/" className="flex items-center gap-2 text-[17px] font-medium">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="11" fill="currentColor" />
              <path d="M16 9.5a4.5 4.5 0 1 0 .5 5H12" stroke="var(--bg, #000)" strokeWidth="1.6" fill="none" />
            </svg>
            <span className="font-brand tracking-tight">Tagverse</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm md:flex">
            {nav.map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`transition-opacity hover:opacity-100 ${
                    active ? "opacity-100" : "opacity-80"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
            >
              Book a call
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
