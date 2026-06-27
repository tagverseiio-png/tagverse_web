"use client";

import Reveal from "./Reveal";
import { useContentResolver } from "./ContentProvider";

export default function Compliance() {
  const c = useContentResolver();
  return (
    <section className="bg-white py-24 md:py-28">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">{c("compliance.eyebrow")}</p>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden rounded-[20px] border border-line bg-line md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Reveal key={i} delay={i * 90} className="bg-white p-8">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-black text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h3 className="mt-6 font-brand text-lg font-medium tracking-tight">
                {c(`compliance.${i}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-fg">{c(`compliance.${i}.body`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
