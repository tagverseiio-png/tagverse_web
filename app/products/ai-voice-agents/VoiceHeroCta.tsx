"use client";

import { useContactModal } from "@/components/ContactModal";

export default function VoiceHeroCta() {
  const { open } = useContactModal();

  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <button
        type="button"
        onClick={() => open("TAGVERSE AI Voice Agents")}
        className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Book a Demo
      </button>

      <a
        href="#solutions"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
      >
        <span>Explore Voice Agents</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>
    </div>
  );
}
