"use client";

import { useContactModal } from "./ContactModal";

interface ProjectDetailButtonsProps {
  projectTitle: string;
  liveUrl?: string;
  className?: string;
}

export default function ProjectDetailButtons({
  projectTitle,
  liveUrl,
  className = "",
}: ProjectDetailButtonsProps) {
  const { open } = useContactModal();

  return (
    <div className={`flex flex-wrap items-center gap-3.5 ${className}`}>
      <button
        type="button"
        onClick={() => open(`Portfolio: ${projectTitle}`)}
        className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"
      >
        <span>Discuss Similar Project</span>
        <span className="ml-1.5">&rarr;</span>
      </button>

      {liveUrl && (
        <a
          href={liveUrl}
          target={liveUrl.startsWith("http") ? "_blank" : undefined}
          rel={liveUrl.startsWith("http") ? "noopener noreferrer" : undefined}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10 backdrop-blur-sm"
        >
          <span>Visit Live Project</span>
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      )}
    </div>
  );
}

export function ProjectContactBanner({ projectTitle }: { projectTitle: string }) {
  const { open } = useContactModal();

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-transparent p-8 sm:p-12 text-center text-white backdrop-blur-2xl">
      <div className="mx-auto max-w-xl">
        <span className="font-mono-g text-[11px] uppercase tracking-wider text-[var(--accent-purple-soft)]">
          START A PROJECT
        </span>
        <h2 className="mt-3 font-brand text-2xl sm:text-3xl font-medium tracking-tight text-white">
          Want a result like this for your business?
        </h2>
        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-white/60">
          From custom software and AI agents to high-converting performance campaigns and brand design, TAGVERSE delivers production-ready excellence.
        </p>
        <button
          type="button"
          onClick={() => open(`Portfolio Inquiry: ${projectTitle}`)}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Contact TAGVERSE</span>
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}
