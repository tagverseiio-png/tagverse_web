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
          className={`flex h-14 items-center justify-between rounded-full px-3 pl-5 transition-all duration-300 ${
            scrolled
              ? "border border-white/10 bg-black/40 text-white backdrop-blur-xl"
              : "border border-transparent text-black"
          }`}
        >
          <Link href="/" className="flex items-center gap-2">
            <span className="font-orbitron text-[13px] font-semibold uppercase tracking-[0.08em]">
              TAGVERSE<span style={{ color: "var(--accent-purple)" }}>.IO</span>
            </span>
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
              className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all ${
                scrolled
                  ? "border border-white/30 text-white hover:bg-white/10"
                  : "bg-black text-white hover:opacity-90"
              }`}
            >
              Book a call
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
