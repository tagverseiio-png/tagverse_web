"use client";

import Reveal from "./Reveal";
import { useMedia } from "./MediaProvider";

export default function CTA() {
  const bg = useMedia("cta.bg");
  return (
    <section id="contact" className="scroll-mt-24 bg-white pb-8 pt-4">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[28px] bg-black px-8 py-24 text-center text-white md:px-16 md:py-32">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black" />
          <div className="relative mx-auto max-w-2xl">
            <p className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-white/50">
              Let&apos;s build something
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-light leading-[1.1] tracking-display">
              Ready to see what TAGVERSE can do for your brand?
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-7 text-white/65">
              We work with founders, CMOs, and growth teams who want a creative
              partner that executes — not just advises. Spots are limited each
              month.
            </p>
            <a
              href="#"
              className="mt-9 inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
            >
              Book a call
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
