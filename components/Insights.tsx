"use client";

import Reveal from "./Reveal";
import { useMediaResolver } from "./MediaProvider";
import { useContentResolver } from "./ContentProvider";

export default function Insights() {
  const media = useMediaResolver();
  const c = useContentResolver();
  return (
    <section id="growth-os" className="bg-[var(--page-lp)] py-24 text-white md:py-32">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--accent-violet)]">
            {c("insights.eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-section-h2 font-light leading-[1.18] tracking-display">
            {c("insights.heading")}
          </h2>
          <a href="#" className="btn-light mt-8">
            {c("insights.cta")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </a>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Reveal
              key={i}
              delay={i * 90}
              className="overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03]"
            >
              <div className="aspect-[16/10] overflow-hidden border-b border-white/10 bg-white/[0.02]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={media(`insights.${i}`)} alt={c(`insights.${i}.title`)} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-brand text-lg font-medium tracking-tight">{c(`insights.${i}.title`)}</h3>
                <p className="mt-1.5 text-sm leading-6 text-white/55">{c(`insights.${i}.body`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
