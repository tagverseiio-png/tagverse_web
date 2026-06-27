"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Project } from "@/lib/types";
import Reveal from "./Reveal";

export default function PortfolioGrid() {
  // null = loading, [] = empty, [...] = loaded
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const snap = await getDocs(collection(db, "projects"));
        if (!active) return;
        const docs = snap.docs.map(
          (d) => ({ id: d.id, ...d.data() }) as Project,
        );
        // Sort client-side so docs missing `order` aren't dropped.
        docs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
        setProjects(docs);
      } catch (e) {
        if (!active) return;
        setError(
          e instanceof Error ? e.message : "Could not load projects.",
        );
        setProjects([]);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Loading — skeleton grid
  if (projects === null) {
    return (
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={i % 4 === 0 ? "lg:col-span-2" : ""}>
            <div className="aspect-[4/3] animate-pulse rounded-[20px] bg-muted" />
            <div className="mt-4 h-4 w-1/2 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  // Empty — clean placeholder
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-line py-28 text-center">
        <div
          className="grid h-12 w-12 place-items-center rounded-full"
          style={{ background: "var(--accent-purple-muted)" }}
        >
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: "var(--accent-purple)" }}
          />
        </div>
        <h3 className="mt-5 font-brand text-xl font-medium tracking-tight">
          No projects yet
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-fg">
          {error
            ? "We couldn't reach the project library. Check your Firestore rules and try again."
            : "Work will appear here as soon as it's added to the studio library."}
        </p>
      </div>
    );
  }

  // Loaded
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {projects.map((p, i) => {
        const href = p.url?.trim() || undefined;
        const external = href ? /^https?:\/\//i.test(href) : false;
        return (
        <Reveal
          key={p.id}
          delay={(i % 3) * 90}
          className={`group ${p.featured ? "lg:col-span-2" : ""}`}
        >
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={`block ${href ? "" : "cursor-default"}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-line bg-muted">
              {p.img && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <h3 className="font-brand text-lg font-medium tracking-tight">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-fg">{p.category}</p>
              </div>
              <span className="font-mono-g text-sm text-muted-fg">{p.year}</span>
            </div>
          </a>
        </Reveal>
        );
      })}
    </div>
  );
}
