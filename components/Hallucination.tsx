"use client";

import Reveal from "./Reveal";
import { useMedia } from "./MediaProvider";

export default function Hallucination() {
  const video = useMedia("hallucination.video");
  const poster = useMedia("hallucination.poster");
  return (
    <section id="hallucination" className="relative bg-black pb-24 pt-4 text-white">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[clamp(2rem,4.3vw,2.75rem)] font-light leading-[1.25] tracking-display">
            Great marketing shouldn&apos;t take 6 months.{" "}
            <span className="italic text-white/60">Ours doesn&apos;t.</span>
          </h2>
        </Reveal>

        <Reveal
          delay={120}
          className="group relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-[20px] border border-white/10"
        >
          <video
            key={video}
            className="aspect-video w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
          >
            <source src={video} type="video/mp4" />
          </video>
          <button className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-sm font-medium backdrop-blur-md transition-colors hover:bg-black/70">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch (1:30)
          </button>
        </Reveal>

        <Reveal delay={200} className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-lg leading-8 text-white/70">
            From strategy to execution — content, web, ads, and automation — live
            in weeks, not quarters.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
