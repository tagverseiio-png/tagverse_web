"use client";

import Reveal from "./Reveal";
import { useContentResolver } from "./ContentProvider";

export default function Stats() {
  const c = useContentResolver();
  return (
    <section className="bg-white text-black dark:bg-black dark:text-white pb-28 pt-10 transition-colors duration-200">
      <div className="container-x">
        <div className="grid gap-px overflow-hidden rounded-[20px] border border-black/10 bg-black/10 dark:border-white/10 dark:bg-white/10 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Reveal
              key={i}
              delay={i * 90}
              className="bg-white text-black dark:bg-black dark:text-white px-8 py-12 text-center"
            >
              <div className="font-display text-[clamp(3rem,7vw,5rem)] font-light leading-none tracking-display">
                {c(`stats.${i}.value`)}
              </div>
              <div className="mt-4 font-mono-g text-[0.75rem] uppercase tracking-[0.16em] text-black/50 dark:text-white/50">
                {c(`stats.${i}.label`)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
