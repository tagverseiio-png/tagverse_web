"use client";

import { useMedia } from "./MediaProvider";

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default function Hero() {
  const video = useMedia("hero.video");
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-white text-black">
      {/* ambient video backdrop */}
      <video
        key={video}
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={video} type="video/mp4" />
      </video>
      {/* gradient overlays — mirrors footer but white */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-white" />

      <div className="container-hero relative flex min-h-[100svh] flex-col items-center justify-center pb-28 pt-32 text-center">
        <a
          href="#hallucination"
          className="animate-hero-rise group inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-black/5 py-1.5 pl-2 pr-4 text-[13px] font-medium backdrop-blur-md transition-colors hover:bg-black/10"
          style={{ animationDelay: "60ms" }}
        >
          <span className="rounded-full bg-black px-2.5 py-0.5 text-[11px] font-semibold text-white">
            New
          </span>
          TAGVERSE Studio Now Open in Chennai
          <Arrow />
        </a>

        <h1
          className="animate-hero-rise mt-7 font-display text-hero font-light leading-[1.2] tracking-display min-[810px]:whitespace-nowrap"
          style={{ animationDelay: "120ms" }}
        >
          Marketing that thinks.
          <br />
          <span className="italic text-black/40">Brands that move.</span>
        </h1>

        <p
          className="animate-hero-rise mx-auto mt-4 max-w-xl text-base leading-8 text-black/60"
          style={{ animationDelay: "200ms" }}
        >
          AI-first creative studio for brands that want to grow faster, look
          better, and convert harder.
        </p>

        <div
          className="animate-hero-rise mt-7"
          style={{ animationDelay: "280ms" }}
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
          >
            Book a call
          </a>
        </div>
      </div>
    </section>
  );
}
