import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQAccordion from "@/components/FAQAccordion";
import Reveal from "@/components/Reveal";
import CourseDetailStickyCta from "@/components/academy/CourseDetailStickyCta";
import AcademySecondaryNav from "@/components/academy/AcademySecondaryNav";
import { ACADEMY_COURSES, getAcademyCourseBySlug } from "@/lib/academyCoursesData";

interface CoursePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return ACADEMY_COURSES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: CoursePageProps): Metadata {
  const course = getAcademyCourseBySlug(params.slug);
  if (!course) {
    return { title: "Course Not Found — TAGVERSE Academy" };
  }

  const url = `https://www.t4gverse.com/academy/courses/${course.slug}`;

  return {
    title: `${course.title} — TAGVERSE Academy`,
    description: course.shortDescription,
    keywords: [
      course.title,
      course.category,
      ...course.technologiesCovered,
      "TAGVERSE Academy",
      "project based learning",
      "tech mentorship",
    ],
    openGraph: {
      title: `${course.title} — TAGVERSE Academy`,
      description: course.overview,
      url,
      siteName: "Tagverse",
      images: [
        {
          url: "/assets/images/insights/smart-suggestion-layer-3.webp",
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} — TAGVERSE Academy`,
      description: course.shortDescription,
      images: ["/assets/images/insights/smart-suggestion-layer-3.webp"],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function CourseDetailPage({ params }: CoursePageProps) {
  const course = getAcademyCourseBySlug(params.slug);
  if (!course) notFound();

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.overview,
    provider: {
      "@type": "Organization",
      name: "TAGVERSE Academy",
      url: "https://www.t4gverse.com/academy",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: course.mode,
      duration: course.duration,
      courseWorkload: course.duration,
    },
    offers: {
      "@type": "Offer",
      price: course.priceValue ? String(course.priceValue) : undefined,
      priceCurrency: course.priceValue ? "INR" : undefined,
      category: course.priceDisplay,
    },
  };

  return (
    <main className="academy-theme dark-adaptive min-h-screen bg-[#fcfcfd] text-[#0f172a] dark:bg-black dark:text-white selection:bg-purple-500/20 pb-24 transition-colors duration-200">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <AcademySecondaryNav />

      {/* Breadcrumb Navigation */}
      <div className="container-x pt-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Academy", href: "/academy" },
            { label: "Courses", href: "/academy/courses" },
            { label: course.title },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-[var(--accent-purple-soft)]/15 blur-[120px]" />

        <div className="container-x relative z-10">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono-g text-[11px] uppercase tracking-wider text-[var(--accent-purple-soft)]">
                COURSE {course.number} &bull; {course.category}
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono-g text-[10px] text-emerald-400 border border-emerald-500/30">
                {course.availability}
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono-g text-[10px] text-white/70">
                {course.skillLevel}
              </span>
            </div>

            <h1 className="mt-4 font-brand text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              {course.title}
            </h1>

            <p className="mt-3 font-brand text-lg sm:text-xl text-[var(--accent-purple-soft)]">
              {course.tagline}
            </p>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-white/70">
              {course.overview}
            </p>

            {/* Quick Meta Cards */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4 font-mono-g text-xs">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
                <span className="text-white/40 block text-[10px]">DURATION</span>
                <span className="mt-1 font-bold text-white block">{course.duration}</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
                <span className="text-white/40 block text-[10px]">DELIVERY MODE</span>
                <span className="mt-1 font-bold text-white block">{course.mode.split("+")[0]}</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
                <span className="text-white/40 block text-[10px]">NEXT COHORT</span>
                <span className="mt-1 font-bold text-white block">{course.nextCohortDate}</span>
              </div>
              <div className="rounded-xl border border-[var(--accent-purple-soft)]/30 bg-[var(--accent-purple-soft)]/10 p-3.5">
                <span className="text-[var(--accent-purple-soft)] block text-[10px]">INVESTMENT</span>
                <span className="mt-1 font-bold text-white text-sm block">{course.priceDisplay}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Enrol & Prerequisites */}
      <section className="py-14 border-t border-white/10 bg-white/[0.01]">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Who Should Enrol */}
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
              <span className="font-mono-g text-[11px] uppercase tracking-wider text-[var(--accent-purple-soft)]">
                TARGET AUDIENCE
              </span>
              <h2 className="mt-2 font-brand text-xl font-medium text-white">
                Who Should Enrol in This Track?
              </h2>
              <ul className="mt-5 space-y-3 text-xs sm:text-sm text-white/75">
                {course.whoShouldEnrol.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                      ✓
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prerequisites */}
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">
              <span className="font-mono-g text-[11px] uppercase tracking-wider text-emerald-400">
                REQUIREMENTS &amp; PREPARATION
              </span>
              <h2 className="mt-2 font-brand text-xl font-medium text-white">
                Prerequisites &amp; Prior Knowledge
              </h2>
              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-white/70">
                {course.prerequisites}
              </p>

              <div className="mt-6 border-t border-white/10 pt-4">
                <div className="font-mono-g text-[10px] uppercase tracking-wider text-white/40 mb-2">
                  Skills You Will Develop
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {course.skillsDeveloped.map((skill, idx) => (
                    <span
                      key={idx}
                      className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono-g text-[11px] text-white/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Sprints (Phase by Phase) */}
      <section className="py-20 border-t border-white/10 bg-black">
        <div className="container-x">
          <div className="max-w-3xl">
            <span className="font-mono-g text-[11px] uppercase tracking-wider text-[var(--accent-purple-soft)]">
              COMPLETE SYLLABUS
            </span>
            <h2 className="mt-2 font-brand text-2xl sm:text-3xl font-medium text-white">
              Curriculum Sprints &amp; Learning Phases
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Structured into sequential sprint phases combining concept walkthroughs, live coding labs, and portfolio milestone deliverables.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {course.curriculumPhases.map((phase) => (
              <div
                key={phase.phase}
                className="rounded-[24px] border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-[var(--accent-purple-soft)]/20 px-3 py-1 font-mono-g text-xs font-bold text-[var(--accent-purple-soft)]">
                      {phase.phase}
                    </span>
                    <h3 className="font-brand text-lg sm:text-xl font-medium text-white">
                      {phase.title}
                    </h3>
                  </div>
                  <span className="font-mono-g text-xs text-white/50">{phase.duration}</span>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-[1.5fr_1fr]">
                  <div>
                    <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/40 block mb-3">
                      Topics &amp; Deep-Dives
                    </span>
                    <ul className="space-y-2 text-xs text-white/75">
                      {phase.topics.map((t, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/40 shrink-0" />
                          <span className="leading-relaxed">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                    <span className="font-mono-g text-[10px] uppercase tracking-wider text-emerald-400 block mb-1">
                      Sprint Milestone Deliverable
                    </span>
                    <p className="text-xs text-white/90 leading-relaxed font-sans">
                      {phase.projectOutcome}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capstone Project Showcase */}
      <section className="py-20 border-t border-white/10 bg-gradient-to-b from-black via-white/[0.02] to-black">
        <div className="container-x">
          <div className="rounded-[28px] border border-[var(--accent-purple-soft)]/30 bg-gradient-to-br from-[var(--accent-purple-soft)]/[0.08] via-white/[0.02] to-transparent p-8 sm:p-12 backdrop-blur-2xl">
            <span className="font-mono-g text-[11px] uppercase tracking-wider text-[var(--accent-purple-soft)]">
              FLAGSHIP CAPSTONE SPRINT
            </span>
            <h2 className="mt-2 font-brand text-2xl sm:text-3xl font-medium text-white">
              Capstone: {course.capstoneProject.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70 max-w-3xl">
              {course.capstoneProject.description}
            </p>

            <div className="mt-8 border-t border-white/10 pt-6">
              <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/40 block mb-3">
                Required Capstone Deliverables
              </span>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 font-mono-g text-xs">
                {course.capstoneProject.deliverables.map((del, i) => (
                  <div key={i} className="rounded-xl border border-white/10 bg-black/40 p-3.5">
                    <span className="text-emerald-400 font-bold block mb-1">0{i + 1}</span>
                    <span className="text-white/80 text-[11px] font-sans">{del}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentorship & Certification */}
      <section className="py-16 border-t border-white/10 bg-black">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-3 font-mono-g text-xs">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-[var(--accent-purple-soft)] text-[10px] uppercase">MENTORSHIP APPROACH</div>
              <h3 className="mt-2 font-brand text-base text-white">Practitioner Reviews</h3>
              <p className="mt-2 text-xs text-white/60 font-sans leading-relaxed">
                {course.mentorshipApproach}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-emerald-400 text-[10px] uppercase">ASSESSMENT</div>
              <h3 className="mt-2 font-brand text-base text-white">Milestone Evaluation</h3>
              <p className="mt-2 text-xs text-white/60 font-sans leading-relaxed">
                {course.assessmentMethodology}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-blue-400 text-[10px] uppercase">CERTIFICATION</div>
              <h3 className="mt-2 font-brand text-base text-white">Verifiable Credential</h3>
              <p className="mt-2 text-xs text-white/60 font-sans leading-relaxed">
                {course.certificateDetails}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course FAQs */}
      <section className="py-20 border-t border-white/10">
        <div className="container-x max-w-4xl">
          <FAQAccordion
            faqs={course.faqs}
            title={`Frequently Asked Questions — ${course.title}`}
            subtitle="Details regarding prerequisites, hardware requirements, and time commitments."
          />
        </div>
      </section>

      {/* Sticky Enrolment CTA */}
      <CourseDetailStickyCta
        courseTitle={course.title}
        priceDisplay={course.priceDisplay}
        duration={course.duration}
      />
    </main>
  );
}
