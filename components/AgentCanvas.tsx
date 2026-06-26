"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { useMediaResolver } from "./MediaProvider";

const steps = [
  {
    n: "01",
    title: "Discover",
    body: "We audit your brand, market, and competitors to find the gaps worth owning.",
  },
  {
    n: "02",
    title: "Strategise",
    body: "We build a 90-day growth plan across content, paid, and digital channels.",
  },
  {
    n: "03",
    title: "Create",
    body: "Our studio produces content, ads, and digital assets — built for performance.",
  },
  {
    n: "04",
    title: "Launch",
    body: "Campaigns go live with full tracking, pixel setup, and automation in place.",
  },
  {
    n: "05",
    title: "Scale",
    body: "We optimise weekly and unlock new channels as data comes in.",
  },
];

export default function AgentCanvas() {
  const media = useMediaResolver();
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
          <p className="eyebrow">The TAGVERSE System</p>
          <h2 className="mt-5 font-display text-section-h2 font-light leading-[1.18] tracking-display">
            We don&apos;t just make content. We build marketing systems that
            compound — every asset, every campaign, every automation works
            together.
          </h2>
          <a href="#" className="btn-primary mt-8">
            Explore our process
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
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-md leading-7 text-muted-fg">
                      {s.body}
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
                    alt={s.title}
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
