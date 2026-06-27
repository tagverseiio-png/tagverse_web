"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Logo } from "@/lib/types";
import { DEFAULT_LOGOS } from "@/lib/logos";
import { useContent } from "./ContentProvider";

export default function LogoMarquee() {
  const heading = useContent("marquee.heading");
  const [logos, setLogos] = useState<Logo[] | null>(null);

  useEffect(() => {
    let active = true;
    getDocs(collection(db, "logos"))
      .then((snap) => {
        if (!active) return;
        const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Logo);
        docs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
        setLogos(docs);
      })
      .catch(() => {
        if (active) setLogos([]);
      });
    return () => {
      active = false;
    };
  }, []);

  // Fall back to the default names while loading or when none are set,
  // so the strip is never blank.
  const items: Logo[] =
    logos && logos.length > 0
      ? logos
      : DEFAULT_LOGOS.map((text, i) => ({ id: `default-${i}`, text }));

  const row = [...items, ...items];

  return (
    <section className="border-t border-white/5 bg-black py-14">
      <p className="container-x mb-9 text-center font-mono-g text-[0.7rem] uppercase tracking-[0.16em] text-white/35">
        {heading}
      </p>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-black to-transparent" />
        <div className="flex w-max animate-marquee items-center">
          {row.map((logo, i) => {
            const href = logo.url?.trim() || undefined;
            const external = href ? /^https?:\/\//i.test(href) : false;
            const inner = logo.img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo.img}
                alt={logo.text || ""}
                className="h-8 w-auto object-contain opacity-70 transition-opacity hover:opacity-100 md:h-9"
              />
            ) : (
              <span className="whitespace-nowrap font-brand text-xl font-medium tracking-tight text-white/45 transition-colors hover:text-white/90 md:text-2xl">
                {logo.text}
              </span>
            );

            return href ? (
              <a
                key={i}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="mx-9 flex items-center"
              >
                {inner}
              </a>
            ) : (
              <span key={i} className="mx-9 flex items-center">
                {inner}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
