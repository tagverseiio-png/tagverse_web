"use client";

import { useContactModal } from "./ContactModal";

interface DetailCTABannerProps {
  title: string;
  subtitle: string;
  primaryCtaText?: string;
  prefillName: string;
  whatsappMessage?: string;
}

export default function DetailCTABanner({
  title,
  subtitle,
  primaryCtaText = "Book a Strategy Call",
  prefillName,
  whatsappMessage,
}: DetailCTABannerProps) {
  const { open } = useContactModal();

  const defaultWaMsg = `Hi Tagverse team, I'd like to discuss ${prefillName}.`;
  const encodedWaMsg = encodeURIComponent(whatsappMessage || defaultWaMsg);
  const waUrl = `https://wa.me/919941968238?text=${encodedWaMsg}`;

  return (
    <section className="relative overflow-hidden bg-black py-20 text-white md:py-28">
      {/* Background glow & subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />
      <div className="container-x relative">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 text-center backdrop-blur-xl sm:p-12 md:p-16">
          <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 font-mono-g text-[11px] uppercase tracking-wider text-[var(--accent-purple-soft)]">
            Ready to Accelerate?
          </span>

          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.12] tracking-display text-white">
            {title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            {subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => open(prefillName)}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {primaryCtaText}
            </button>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              <span>WhatsApp Direct</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l10-10" />
                <path d="M17 17V7H7" />
              </svg>
            </a>
          </div>

          <p className="mt-6 font-mono-g text-[11px] text-white/40">
            Average response time: &lt; 15 minutes during business hours.
          </p>
        </div>
      </div>
    </section>
  );
}
