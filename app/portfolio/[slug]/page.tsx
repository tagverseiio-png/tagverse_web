import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DEFAULT_PROJECTS } from "@/lib/defaultData";
import type { Project } from "@/lib/types";

async function getProject(slug: string): Promise<Project | undefined> {
  try {
    const snap = await getDocs(collection(db, "projects"));
    if (!snap.empty) {
      const match = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }) as Project)
        .find((p) => (p.slug || p.id).toLowerCase() === slug.toLowerCase());
      if (match) return match;
    }
  } catch {
    // fallback
  }
  return DEFAULT_PROJECTS.find(
    (p) => (p.slug || p.id).toLowerCase() === slug.toLowerCase()
  );
}
import ProjectDetailButtons, {
  ProjectContactBanner,
} from "@/components/ProjectDetailButtons";
import Reveal from "@/components/Reveal";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return DEFAULT_PROJECTS.map((p) => ({
    slug: p.slug || p.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) {
    return {
      title: "Case Study — TAGVERSE Portfolio",
      description: "Explore selected client and product case studies by TAGVERSE.",
    };
  }

  return {
    title: `${project.title} — Case Study | TAGVERSE Portfolio`,
    description: project.summary || project.description || `Case study for ${project.title}.`,
    openGraph: {
      title: `${project.title} — Case Study | TAGVERSE`,
      description: project.summary || project.description,
      images: project.img ? [{ url: project.img }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = await getProject(params.slug);
  if (!project) {
    notFound();
  }

  const projectCats =
    project.categories && project.categories.length > 0
      ? project.categories
      : [project.category];

  // Related projects (same category, excluding current)
  const relatedProjects = DEFAULT_PROJECTS.filter(
    (p) =>
      p.id !== project.id &&
      (p.categories || [p.category]).some((c) => projectCats.includes(c)),
  ).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.summary || project.description,
    author: {
      "@type": "Organization",
      name: "TAGVERSE",
      url: "https://www.t4gverse.com",
    },
    creator: {
      "@type": "Organization",
      name: "TAGVERSE",
    },
    datePublished: project.year,
    image: project.img,
    keywords: [
      ...projectCats,
      ...(project.technologies || []),
      ...(project.services || []),
    ].join(", "),
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[var(--accent-purple)] selection:text-white overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 pb-16 pt-36 sm:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[var(--accent-purple-soft)]/10 via-transparent to-transparent pointer-events-none" />

        <div className="container-x relative">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 font-mono-g text-[11px] text-white/50">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/portfolio" className="hover:text-white transition-colors">
              Portfolio
            </Link>
            <span>/</span>
            <span className="text-white/80 truncate max-w-[200px] sm:max-w-none">
              {project.title}
            </span>
          </nav>

          {/* Categories & Metadata Pill */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {projectCats.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono-g text-[11px] text-white/80 backdrop-blur-md"
              >
                {cat}
              </span>
            ))}
            <span className="rounded-full bg-white/10 px-2.5 py-1 font-mono-g text-[11px] text-white/60">
              {project.year}
            </span>
            {project.client && (
              <span className="rounded-full border border-[var(--accent-purple-soft)]/30 bg-[var(--accent-purple-soft)]/10 px-2.5 py-1 font-mono-g text-[11px] text-[var(--accent-purple-soft)]">
                Client: {project.client}
              </span>
            )}
          </div>

          {/* Title & Tagline */}
          <h1 className="mt-5 font-brand text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1]">
            {project.title}
          </h1>

          <p className="mt-6 max-w-3xl text-base sm:text-lg leading-relaxed text-white/70">
            {project.summary || project.description}
          </p>

          {/* Action Buttons */}
          <div className="mt-8">
            <ProjectDetailButtons
              projectTitle={project.title}
              liveUrl={project.liveUrl || project.url}
            />
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="relative py-16 sm:py-24">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
            {/* Left: Case Study Narrative */}
            <div className="space-y-16">
              {/* Featured Media Container */}
              <div className="overflow-hidden rounded-[24px] border border-white/15 bg-white/[0.02] shadow-2xl">
                {project.iframeUrl ? (
                  <div
                    className="relative aspect-[16/10] overflow-hidden"
                    style={{ transform: "translateZ(0)" }}
                  >
                    <iframe
                      src={project.iframeUrl}
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
                ) : project.img ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={project.img}
                    alt={project.title}
                    className="aspect-[16/10] w-full object-cover"
                  />
                ) : null}
              </div>

              {/* Section 1: Overview & Background */}
              <div>
                <span className="font-mono-g text-[11px] uppercase tracking-wider text-[var(--accent-purple-soft)]">
                  01 &bull; PROJECT BRIEF
                </span>
                <h2 className="mt-2 font-brand text-2xl sm:text-3xl font-medium text-white">
                  Overview & Background
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70">
                  {project.description || project.summary}
                </p>
              </div>

              {/* Section 2: The Challenge */}
              {project.challenge && (
                <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl">
                  <span className="font-mono-g text-[11px] uppercase tracking-wider text-amber-400">
                    02 &bull; THE PROBLEM
                  </span>
                  <h2 className="mt-2 font-brand text-xl sm:text-2xl font-medium text-white">
                    The Challenge & Bottlenecks
                  </h2>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/70">
                    {project.challenge}
                  </p>
                </div>
              )}

              {/* Section 3: The Strategic Solution */}
              {project.solution && (
                <div>
                  <span className="font-mono-g text-[11px] uppercase tracking-wider text-emerald-400">
                    03 &bull; ARCHITECTURE & EXECUTION
                  </span>
                  <h2 className="mt-2 font-brand text-2xl sm:text-3xl font-medium text-white">
                    The Solution & Strategic Approach
                  </h2>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70">
                    {project.solution}
                  </p>
                </div>
              )}

              {/* Section 4: Key Deliverables */}
              {project.keyDeliverables && project.keyDeliverables.length > 0 && (
                <div>
                  <span className="font-mono-g text-[11px] uppercase tracking-wider text-[var(--accent-purple-soft)]">
                    04 &bull; WHAT WAS BUILT
                  </span>
                  <h2 className="mt-2 font-brand text-2xl sm:text-3xl font-medium text-white">
                    Key Deliverables & Systems Shipped
                  </h2>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {project.keyDeliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md"
                      >
                        <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent-purple-soft)]/20 font-mono-g text-[10px] text-[var(--accent-purple-soft)]">
                          ✓
                        </span>
                        <span className="text-xs sm:text-sm text-white/80 leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 5: Tangible Outcomes */}
              {project.outcome && (
                <div className="rounded-[24px] border border-emerald-500/20 bg-emerald-500/[0.03] p-8 backdrop-blur-xl">
                  <span className="font-mono-g text-[11px] uppercase tracking-wider text-emerald-400">
                    05 &bull; IMPACT & RESULTS
                  </span>
                  <h2 className="mt-2 font-brand text-xl sm:text-2xl font-medium text-white">
                    Measurable Results & Outcomes
                  </h2>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-emerald-100/80">
                    {project.outcome}
                  </p>
                </div>
              )}
            </div>

            {/* Right Sidebar: Metadata & Tech Specs */}
            <aside className="space-y-8">
              {/* Project Specs Card */}
              <div className="rounded-[24px] border border-white/15 bg-white/[0.03] p-6 backdrop-blur-2xl">
                <h3 className="font-brand text-base font-medium text-white border-b border-white/10 pb-3">
                  Project Specifications
                </h3>

                <div className="mt-5 space-y-5">
                  {/* Client */}
                  {project.client && (
                    <div>
                      <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/40 block">
                        Client / Stakeholder
                      </span>
                      <span className="mt-1 font-brand text-sm text-white block">
                        {project.client}
                      </span>
                    </div>
                  )}

                  {/* Year */}
                  <div>
                    <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/40 block">
                      Year Completed
                    </span>
                    <span className="mt-1 font-brand text-sm text-white block">
                      {project.year}
                    </span>
                  </div>

                  {/* Categories */}
                  <div>
                    <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/40 block">
                      Categories
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {projectCats.map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono-g text-[11px] text-white/80"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Services Delivered */}
                  {project.services && project.services.length > 0 && (
                    <div>
                      <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/40 block">
                        Services Delivered
                      </span>
                      <ul className="mt-2 space-y-1.5">
                        {project.services.map((svc) => (
                          <li
                            key={svc}
                            className="flex items-center gap-2 text-xs text-white/70"
                          >
                            <span className="h-1 w-1 rounded-full bg-[var(--accent-purple-soft)]" />
                            <span>{svc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies Stack */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div>
                      <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/40 block">
                        Technologies & Tools
                      </span>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {project.technologies.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono-g text-[11px] text-white/90"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Action */}
                <div className="mt-6 border-t border-white/10 pt-4">
                  <ProjectDetailButtons
                    projectTitle={project.title}
                    liveUrl={project.liveUrl || project.url}
                    className="flex-col w-full !items-stretch"
                  />
                </div>
              </div>
            </aside>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="mt-24 border-t border-white/10 pt-16">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono-g text-[11px] uppercase tracking-wider text-white/40">
                    EXPLORE MORE
                  </span>
                  <h2 className="mt-1 font-brand text-2xl font-medium text-white">
                    Related Projects
                  </h2>
                </div>
                <Link
                  href="/portfolio"
                  className="font-mono-g text-xs text-[var(--accent-purple-soft)] hover:text-white transition-colors"
                >
                  View All Portfolio &rarr;
                </Link>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((rel) => {
                  const relHref = `/portfolio/${rel.slug || rel.id}`;
                  return (
                    <Link
                      key={rel.id}
                      href={relHref}
                      className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/[0.04]"
                    >
                      <div>
                        {rel.img && (
                          <div className="aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-white/5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={rel.img}
                              alt={rel.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <span className="mt-4 font-mono-g text-[10px] text-[var(--accent-purple-soft)] block">
                          {rel.category}
                        </span>
                        <h3 className="mt-1 font-brand text-base font-medium text-white group-hover:text-[var(--accent-purple-soft)] transition-colors">
                          {rel.title}
                        </h3>
                        <p className="mt-1.5 text-xs text-white/50 line-clamp-2">
                          {rel.summary || rel.description}
                        </p>
                      </div>
                      <span className="mt-4 font-mono-g text-xs font-medium text-white/80 group-hover:text-white transition-colors">
                        Read Case Study &rarr;
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Contact Conversion Banner */}
          <div className="mt-20">
            <ProjectContactBanner projectTitle={project.title} />
          </div>
        </div>
      </section>
    </main>
  );
}
