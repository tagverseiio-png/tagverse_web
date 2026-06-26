"use client";

import Reveal from "./Reveal";
import { useMediaResolver } from "./MediaProvider";

const features = [
  {
    title: "AI-powered execution",
    body: "Strategy, content, and ads built with AI at the core — faster output, smarter targeting",
  },
  {
    title: "Done-in-weeks",
    body: "Onboarding to live campaigns in under 14 days",
  },
  {
    title: "Full-stack creative",
    body: "Reels, web, ads, branding, automation — one studio handles it all",
  },
];

export default function Complexity() {
  const media = useMediaResolver();
  return (
    <section id="product" className="scroll-mt-24 bg-white py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">What we do</p>
          <h2 className="mt-5 max-w-2xl font-display text-section-h2 font-light leading-[1.15] tracking-display">
            Built to handle everything
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 100}
              className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[20px] border border-line"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={media(`complexity.${i}`)}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="relative p-7 text-white">
                <h3 className="font-brand text-xl font-medium tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-white/75">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
