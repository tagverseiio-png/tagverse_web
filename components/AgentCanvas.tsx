"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { useMediaResolver } from "./MediaProvider";
import { useContentResolver } from "./ContentProvider";

const STEP_COUNT = 5;
const steps = Array.from({ length: STEP_COUNT }, (_, i) => ({
  i,
  n: String(i + 1).padStart(2, "0"),
}));

export default function AgentCanvas() {
  const media = useMediaResolver();
  const c = useContentResolver();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="canvas" className="scroll-mt-24 bg-white py-24 md:py-32">
      <div className="container-canvas">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{c("canvas.eyebrow")}</p>
          <h2 className="mt-5 font-display text-section-h2 font-light leading-[1.18] tracking-display">
            {c("canvas.heading")}
          </h2>
          <a href="#" className="btn-primary mt-8">
            {c("canvas.cta")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </a>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* scrolling steps */}
          <div className="order-2 lg:order-1">
            {steps.map((s, i) => (
              <div
                key={s.n}
                data-idx={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="border-t border-line py-8 transition-opacity duration-300"
                style={{ opacity: active === i ? 1 : 0.4 }}
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-mono-g text-sm tabular-nums text-muted-fg">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-brand text-2xl font-medium tracking-tight">
                      {c(`canvas.${i}.title`)}
                    </h3>
                    <p className="mt-3 max-w-md leading-7 text-muted-fg">
                      {c(`canvas.${i}.body`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* sticky media */}
          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-line bg-surface">
                {steps.map((s, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={s.n}
                    src={media(`agentcanvas.${i}`)}
                    alt={c(`canvas.${i}.title`)}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                    style={{ opacity: active === i ? 1 : 0 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
