import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DetailCTABanner from "@/components/DetailCTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import Reveal from "@/components/Reveal";
import ServiceHeroButtons from "@/components/ServiceHeroButtons";
import { SERVICES_DATA, getServiceBySlug } from "@/lib/servicesData";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) {
    return {
      title: "Service Not Found — Tagverse",
    };
  }

  const url = `https://www.t4gverse.com/services/${service.slug}`;

  return {
    title: `${service.title} — Tagverse | AI-First Creative & Growth Agency`,
    description: service.shortDesc,
    keywords: [
      service.title,
      ...service.techStack,
      "Tagverse services",
      "creative agency",
      "growth studio",
      "Chennai digital agency",
    ],
    openGraph: {
      title: `${service.title} — Tagverse`,
      description: service.shortDesc,
      url,
      siteName: "Tagverse",
      type: "website",
      images: [
        {
          url: service.heroImage,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} — Tagverse`,
      description: service.shortDesc,
      images: [service.heroImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug);
  if (!service) {
    notFound();
  }

  const relatedServices = service.relatedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => s !== undefined);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.longDesc,
    serviceType: service.title,
    provider: {
      "@type": "Organization",
      name: "Tagverse",
      url: "https://www.t4gverse.com",
      logo: "https://www.t4gverse.com/assets/images/logo.png",
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Deliverables`,
      itemListElement: service.deliverables.map((d, idx) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: d.title,
          description: d.description,
        },
        position: idx + 1,
      })),
    },
  };

  return (
    <main className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black pb-20 pt-32 text-white md:pb-28 md:pt-40">
        {/* Background glow and subtle hero texture */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-home.webp"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />

        <div className="container-x relative">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-[var(--accent-purple-soft)]">
                  <span>{service.eyebrow}</span>
                </div>

                <h1 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.25rem)] font-light leading-[1.08] tracking-display text-white">
                  {service.title}
                </h1>

                <p className="mt-6 text-lg leading-8 text-white/75 sm:text-xl">
                  {service.tagline}
                </p>

                {/* Hero CTAs */}
                <ServiceHeroButtons serviceTitle={service.title} />

                {/* Key Metrics */}
                <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                  {service.stats.map((stat, idx) => (
                    <div key={idx}>
                      <div className="font-brand text-2xl font-semibold text-white sm:text-3xl">
                        {stat.value}
                      </div>
                      <div className="mt-1 font-mono-g text-[11px] uppercase tracking-wider text-white/50">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Hero Image Card */}
            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.04] p-2 shadow-2xl backdrop-blur-xl">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-black/60">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.heroImage}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span className="font-mono-g uppercase tracking-wider">
                        TAGVERSE STUDIO • SPEC 2026
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Active Service
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Overview Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-4xl text-center">
            <span className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-muted-fg">
              Strategic Overview
            </span>
            <h2 className="mt-3 font-brand text-3xl font-medium tracking-tight text-fg md:text-4xl">
              Engineered for impact. Designed to compound.
            </h2>
            <p className="mt-6 text-base leading-8 text-muted-fg sm:text-lg">
              {service.longDesc}
            </p>
          </div>

          {/* Differentiators Grid */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.differentiators.map((diff, idx) => (
              <Reveal
                key={idx}
                delay={idx * 80}
                className="flex flex-col justify-between rounded-[22px] border border-line bg-surface p-8 transition-shadow hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]"
              >
                <div>
                  <span className="font-mono-g text-xs font-semibold text-muted-fg">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-4 font-brand text-xl font-medium tracking-tight text-fg">
                    {diff.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-fg">
                    {diff.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Grid */}
      <section id="deliverables" className="scroll-mt-28 bg-surface py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-8 md:flex-row md:items-end">
            <div>
              <span className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-muted-fg">
                Scope of Work
              </span>
              <h2 className="mt-3 font-brand text-3xl font-medium tracking-tight text-fg md:text-4xl">
                What we deliver.
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-fg">
              Transparent, accountable deliverables engineered to drive measurable client ROI.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((deliv, idx) => (
              <Reveal
                key={idx}
                delay={idx * 60}
                className="rounded-[20px] border border-line bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface font-mono-g text-sm font-semibold text-fg">
                  0{idx + 1}
                </div>
                <h3 className="mt-5 font-brand text-xl font-medium tracking-tight text-fg">
                  {deliv.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-fg">
                  {deliv.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process / How It Works */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-muted-fg">
              Our Methodology
            </span>
            <h2 className="mt-3 font-brand text-3xl font-medium tracking-tight text-fg md:text-4xl">
              How we execute from day one.
            </h2>
            <p className="mt-3 text-base text-muted-fg">
              A structured 4-phase delivery system ensuring velocity without sacrificing quality.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, idx) => (
              <Reveal
                key={idx}
                delay={idx * 90}
                className="relative flex flex-col justify-between rounded-[22px] border border-line bg-surface p-7"
              >
                <div>
                  <span className="font-mono-g text-2xl font-light text-muted-fg/60">
                    {step.step}
                  </span>
                  <h3 className="mt-4 font-brand text-lg font-medium tracking-tight text-fg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-fg">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack & Ecosystem */}
      <section className="border-t border-line bg-surface py-16 md:py-20">
        <div className="container-x">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <span className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-muted-fg">
                Stack & Integrations
              </span>
              <h3 className="mt-1 font-brand text-2xl font-medium tracking-tight text-fg">
                Powered by modern tooling.
              </h3>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
              {service.techStack.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-line bg-white px-4 py-2 font-mono-g text-xs font-medium text-fg shadow-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQAccordion
        faqs={service.faqs}
        title={`Frequently Asked Questions about ${service.title}`}
      />

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="bg-white py-20 border-t border-line">
          <div className="container-x">
            <div className="flex flex-col justify-between gap-3 border-b border-line pb-6 sm:flex-row sm:items-baseline">
              <h2 className="font-brand text-2xl font-medium tracking-tight text-fg md:text-3xl">
                Complementary Services
              </h2>
              <Link
                href="/services"
                className="font-mono-g text-xs font-semibold text-black hover:underline"
              >
                View All 10 Services &rarr;
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((rel, idx) => (
                <Reveal
                  key={rel.slug}
                  delay={idx * 80}
                  className="flex flex-col justify-between rounded-[20px] border border-line bg-surface p-7 transition-shadow hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]"
                >
                  <div>
                    <span className="font-mono-g text-xs text-muted-fg">
                      {rel.number}
                    </span>
                    <h3 className="mt-3 font-brand text-xl font-medium tracking-tight text-fg">
                      {rel.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-fg">
                      {rel.shortDesc}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-line/60 pt-4">
                    <Link
                      href={`/services/${rel.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-black transition-opacity hover:opacity-75"
                    >
                      <span>Explore Service</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* High-Conversion Bottom CTA Banner */}
      <DetailCTABanner
        title={`Scale your ${service.title} with TAGVERSE.`}
        subtitle="Schedule a 1-on-1 discovery call with our strategy and technical directors. We'll map out a bespoke roadmap tailored to your growth goals."
        primaryCtaText="Book a Strategy Call"
        prefillName={service.title}
      />
    </main>
  );
}
