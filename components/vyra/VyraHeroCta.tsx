"use client";

import { useContactModal } from "@/components/ContactModal";

export default function VyraHeroCta() {
  const { open } = useContactModal();

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <button
        type="button"
        onClick={() => open("VYRA CRM - 30-Day Free Trial")}
        className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white px-7 py-3.5 font-brand text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-white/90 hover:shadow-[0_0_35px_rgba(255,255,255,0.4)]"
      >
        <span>Start Free 30-Day Trial</span>
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => open("VYRA CRM - Product Demo")}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-brand text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-400"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        <span>Book a Demo</span>
      </button>

      <button
        type="button"
        onClick={() => scrollToSection("capabilities")}
        className="inline-flex items-center gap-1.5 px-4 py-3 font-mono-g text-xs font-medium text-white/60 transition-colors hover:text-white"
      >
        <span>Explore Features</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}
