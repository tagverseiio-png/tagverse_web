"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Project, PortfolioCategory } from "@/lib/types";
import { DEFAULT_PROJECTS, PORTFOLIO_CATEGORIES } from "@/lib/defaultData";
import Reveal from "./Reveal";

export default function PortfolioGrid() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Projects");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const snap = await getDocs(collection(db, "projects"));
        if (!active) return;
        if (!snap.empty) {
          const docs = snap.docs.map(
            (d) => ({ id: d.id, ...d.data() }) as Project,
          );
          docs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
          setProjects(docs);
        } else {
          setProjects(DEFAULT_PROJECTS);
        }
      } catch {
        if (!active) return;
        setProjects(DEFAULT_PROJECTS);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Filter projects by category and search query
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return projects.filter((p) => {
      if (p.published === false) return false;

      // Category filter (support multiple categories per project)
      const projectCats = p.categories && p.categories.length > 0 ? p.categories : [p.category];
      const matchesCategory =
        selectedCategory === "All Projects" ||
        projectCats.some(
          (c) => c.trim().toLowerCase() === selectedCategory.trim().toLowerCase(),
        );

      if (!matchesCategory) return false;

      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title?.toLowerCase().includes(q);
      const matchSummary = (p.summary || p.description || "").toLowerCase().includes(q);
      const matchClient = p.client?.toLowerCase().includes(q);
      const matchTech = p.technologies?.some((t) => t.toLowerCase().includes(q));
      const matchServices = p.services?.some((s) => s.toLowerCase().includes(q));
      const matchCats = projectCats.some((c) => c.toLowerCase().includes(q));

      return matchTitle || matchSummary || matchClient || matchTech || matchServices || matchCats;
    });
  }, [projects, selectedCategory, searchQuery]);

  // Featured projects for the top spotlight (when on "All Projects" with no search)
  const featuredProjects = useMemo(() => {
    if (!projects) return [];
    return projects.filter((p) => p.featured && p.published !== false);
  }, [projects]);

  // Category counts
  const categoryCounts = useMemo(() => {
    if (!projects) return {};
    const counts: Record<string, number> = { "All Projects": projects.length };
    PORTFOLIO_CATEGORIES.forEach((cat) => {
      counts[cat] = projects.filter((p) => {
        const cats = p.categories && p.categories.length > 0 ? p.categories : [p.category];
        return cats.some((c) => c.trim().toLowerCase() === cat.trim().toLowerCase());
      }).length;
    });
    return counts;
  }, [projects]);

  // Loading skeleton
  if (projects === null) {
    return (
      <div className="space-y-12">
        <div className="h-10 w-full animate-pulse rounded-full bg-muted" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-4 rounded-[24px] border border-line p-5">
              <div className="aspect-[16/10] w-full animate-pulse rounded-[16px] bg-muted" />
              <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
              <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const isBrowsingAll = selectedCategory === "All Projects" && !searchQuery.trim();

  return (
    <div className="space-y-16">
      {/* Search & Filter Controls Header */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by title, tech, or service..."
              className="w-full rounded-full border border-line bg-muted/40 pl-10 pr-10 py-2.5 text-xs text-fg placeholder:text-muted-fg focus:border-black focus:bg-white focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-fg hover:text-black transition-colors"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="font-mono-g text-xs text-muted-fg flex items-center justify-between sm:justify-end gap-2">
            <span>Showing</span>
            <span className="rounded-full bg-black/5 px-2 py-0.5 font-medium text-black">
              {filteredProjects.length}
            </span>
            <span>of {projects.length} projects</span>
          </div>
        </div>

        {/* Categories Bar: Horizontal scroll on mobile, compact wrap on desktop */}
        <div className="relative">
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1">
            <button
              onClick={() => setSelectedCategory("All Projects")}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                selectedCategory === "All Projects"
                  ? "bg-black text-white shadow-sm"
                  : "border border-line bg-white text-muted-fg hover:border-black/30 hover:text-black"
              }`}
            >
              All Projects ({categoryCounts["All Projects"] ?? projects.length})
            </button>

            {PORTFOLIO_CATEGORIES.map((cat) => {
              const count = categoryCounts[cat] ?? 0;
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all flex items-center gap-1.5 ${
                    active
                      ? "bg-black text-white shadow-sm"
                      : "border border-line bg-white text-muted-fg hover:border-black/30 hover:text-black"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      active ? "bg-white/20 text-white" : "bg-muted text-muted-fg"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Projects Spotlight (Shown when on "All Projects" with no search) */}
      {isBrowsingAll && featuredProjects.length > 0 && (
        <section className="space-y-6 pt-2">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-purple)]" />
              <h2 className="font-brand text-lg font-medium tracking-tight text-fg">
                Featured Flagship Works
              </h2>
            </div>
            <span className="font-mono-g text-[11px] uppercase tracking-wider text-muted-fg">
              Highlight Reel
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {featuredProjects.map((p, idx) => {
              const detailHref = `/portfolio/${p.slug || p.id}`;
              const externalHref = p.liveUrl || p.url;
              return (
                <Reveal key={`feat-${p.id}`} delay={idx * 100}>
                  <div className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-line bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-black/20">
                    <div>
                      {/* Media Container */}
                      <Link href={detailHref} className="block relative aspect-[16/10] overflow-hidden rounded-[16px] bg-muted border border-line">
                        {p.iframeUrl ? (
                          <div
                            className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-700 group-hover:scale-[1.03]"
                            style={{ transform: "translateZ(0)", willChange: "transform" }}
                          >
                            <iframe
                              src={p.iframeUrl}
                              loading="lazy"
                              style={{
                                width: "400%",
                                height: "400%",
                                transform: "scale(0.25) translateZ(0)",
                                transformOrigin: "0 0",
                              }}
                              className="absolute top-0 left-0 border-0"
                            />
                          </div>
                        ) : p.img ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={p.img}
                            alt={p.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center font-mono-g text-xs text-muted-fg">
                            TAGVERSE Case Study
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-5">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 font-mono-g text-xs font-medium text-black">
                            Explore Case Study &rarr;
                          </span>
                        </div>
                      </Link>

                      {/* Header & Categories */}
                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[var(--accent-purple)]/10 px-2.5 py-0.5 font-mono-g text-[10px] font-semibold text-[var(--accent-purple)]">
                          FEATURED
                        </span>
                        {p.categories?.slice(0, 2).map((cat) => (
                          <span
                            key={cat}
                            className="rounded-full border border-line bg-muted/60 px-2.5 py-0.5 font-mono-g text-[10px] text-muted-fg"
                          >
                            {cat}
                          </span>
                        ))}
                        <span className="ml-auto font-mono-g text-xs text-muted-fg">
                          {p.year}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="mt-3 font-brand text-xl font-medium tracking-tight text-fg group-hover:text-[var(--accent-purple)] transition-colors">
                        <Link href={detailHref}>{p.title}</Link>
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-fg line-clamp-2">
                        {p.summary || p.description}
                      </p>

                      {/* Technology Pills */}
                      {p.technologies && p.technologies.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {p.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-mono-g text-fg/80"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom CTA Row */}
                    <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                      <Link
                        href={detailHref}
                        className="inline-flex items-center gap-1 font-mono-g text-xs font-medium text-fg group-hover:text-[var(--accent-purple)] transition-colors"
                      >
                        <span>Read Case Study</span>
                        <span>&rarr;</span>
                      </Link>

                      {externalHref && (
                        <a
                          href={externalHref}
                          target={externalHref.startsWith("http") ? "_blank" : undefined}
                          rel={externalHref.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center gap-1 font-mono-g text-xs text-muted-fg hover:text-black transition-colors"
                        >
                          <span>Live Link</span>
                          <span>↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* Main Filtered Projects Grid */}
      <section className="space-y-6">
        {isBrowsingAll && featuredProjects.length > 0 && (
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h2 className="font-brand text-lg font-medium tracking-tight text-fg">
              All Projects Directory
            </h2>
            <span className="font-mono-g text-xs text-muted-fg">
              {filteredProjects.length} Projects Available
            </span>
          </div>
        )}

        {filteredProjects.length === 0 ? (
          <div className="rounded-[24px] border border-line bg-muted/20 p-12 text-center">
            <p className="font-brand text-lg font-medium text-fg">
              No projects found matching your criteria.
            </p>
            <p className="mt-1 text-sm text-muted-fg">
              Try adjusting your search query or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Projects");
                setSearchQuery("");
              }}
              className="mt-5 rounded-full bg-black px-5 py-2 text-xs font-medium text-white transition-opacity hover:opacity-80"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((p, i) => {
              const detailHref = `/portfolio/${p.slug || p.id}`;
              const externalHref = p.liveUrl || p.url;
              const cats = p.categories && p.categories.length > 0 ? p.categories : [p.category];

              return (
                <Reveal key={p.id} delay={(i % 3) * 80}>
                  <div className="group flex flex-col justify-between h-full rounded-[20px] border border-line bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-black/20">
                    <div>
                      {/* Image / Preview */}
                      <Link
                        href={detailHref}
                        className="block relative aspect-[16/10] overflow-hidden rounded-[14px] border border-line bg-muted"
                      >
                        {p.iframeUrl ? (
                          <div
                            className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-700 group-hover:scale-[1.03]"
                            style={{ transform: "translateZ(0)", willChange: "transform" }}
                          >
                            <iframe
                              src={p.iframeUrl}
                              loading="lazy"
                              style={{
                                width: "400%",
                                height: "400%",
                                transform: "scale(0.25) translateZ(0)",
                                transformOrigin: "0 0",
                              }}
                              className="absolute top-0 left-0 border-0"
                            />
                          </div>
                        ) : p.img ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={p.img}
                            alt={p.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center font-mono-g text-xs text-muted-fg">
                            TAGVERSE
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-3.5">
                          <span className="font-mono-g text-[11px] font-medium text-white">
                            View Case Study &rarr;
                          </span>
                        </div>
                      </Link>

                      {/* Category Badges & Year */}
                      <div className="mt-4 flex items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1">
                          {cats.slice(0, 2).map((cat) => (
                            <span
                              key={cat}
                              className="rounded-full bg-muted px-2 py-0.5 font-mono-g text-[10px] text-muted-fg"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                        <span className="font-mono-g text-xs text-muted-fg shrink-0">
                          {p.year}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="mt-2.5 font-brand text-base font-medium tracking-tight text-fg group-hover:text-[var(--accent-purple)] transition-colors">
                        <Link href={detailHref}>{p.title}</Link>
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-fg line-clamp-2">
                        {p.summary || p.description}
                      </p>

                      {/* Tech & Service Tags */}
                      {p.technologies && p.technologies.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {p.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="rounded border border-line bg-muted/40 px-1.5 py-0.5 text-[10px] font-mono-g text-fg/70"
                            >
                              {tech}
                            </span>
                          ))}
                          {p.technologies.length > 3 && (
                            <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono-g text-muted-fg">
                              +{p.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-5 flex items-center justify-between border-t border-line pt-3.5">
                      <Link
                        href={detailHref}
                        className="font-mono-g text-xs font-medium text-fg hover:text-[var(--accent-purple)] transition-colors"
                      >
                        Case Study &rarr;
                      </Link>

                      {externalHref && (
                        <a
                          href={externalHref}
                          target={externalHref.startsWith("http") ? "_blank" : undefined}
                          rel={externalHref.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="font-mono-g text-xs text-muted-fg hover:text-black transition-colors"
                        >
                          Live Site ↗
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

