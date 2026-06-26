"use client";

import { useEffect, useRef } from "react";

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 700);
        el.style.transform = `translateY(${y * 0.28}px) scale(${1 + y * 0.0002})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black text-white">
      {/* parallax background */}
      <div ref={imgRef} className="absolute inset-0 -z-10 will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-home.webp"
          alt=""
          className="h-[120%] w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black" />
      </div>

      <div className="container-hero flex min-h-[100svh] flex-col items-center justify-center pb-28 pt-32 text-center">
        <a
          href="#hallucination"
          className="animate-hero-rise group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 py-1.5 pl-2 pr-4 text-[13px] font-medium backdrop-blur-md transition-colors hover:bg-white/15"
          style={{ animationDelay: "60ms" }}
        >
          <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-black">
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
          <span className="italic text-white/65">Brands that move.</span>
        </h1>

        <p
          className="animate-hero-rise mx-auto mt-4 max-w-xl text-base leading-8 text-white/85"
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
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
          >
            Book a call
          </a>
        </div>
      </div>
    </section>
  );
}
