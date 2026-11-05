import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DetailCTABanner from "@/components/DetailCTABanner";
import Reveal from "@/components/Reveal";
import {
  PRODUCT_CATEGORIES_DATA,
  getCategoryInfo,
  getProductsByCategorySlug,
} from "@/lib/productsData";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.keys(PRODUCT_CATEGORIES_DATA).map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = getCategoryInfo(params.slug);
  if (!category) {
    return {
      title: "Category Not Found — Tagverse",
    };
  }

  const url = `https://www.t4gverse.com/products/category/${category.slug}`;

  return {
    title: `${category.name} — Tagverse | Software Platforms & Enterprise SaaS`,
    description: category.description,
    keywords: [
      category.name,
      ...category.features,
      "enterprise software",
      "SaaS India",
      "Tagverse products",
    ],
    openGraph: {
      title: `${category.name} — Tagverse`,
      description: category.description,
      url,
      siteName: "Tagverse",
      type: "website",
      images: [
        {
          url: category.heroImage,
          width: 1200,
          height: 630,
          alt: category.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} — Tagverse`,
      description: category.description,
      images: [category.heroImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function ProductCategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryInfo(params.slug);
  if (!category) {
    notFound();
  }

  const products = getProductsByCategorySlug(params.slug);

  const otherCategories = Object.values(PRODUCT_CATEGORIES_DATA).filter(
    (c) => c.slug !== category.slug
  );

  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.name,
    description: category.description,
    itemListElement: products.map((p, idx) => ({
      "@type": "SoftwareApplication",
      position: idx + 1,
      name: p.name,
      description: p.overview,
      applicationCategory: p.category,
      operatingSystem: "Web",
      url: `https://www.t4gverse.com/products/${p.slug}`,
    })),
  };

  return (
    <main className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
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
              { label: "Products", href: "/products" },
              { label: category.name },
            ]}
          />

          <div className="mt-8 max-w-4xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-[var(--accent-purple-soft)]">
                <span>{category.eyebrow}</span>
              </div>

              <h1 className="mt-6 font-display text-[clamp(2.5rem,5.5vw,4.25rem)] font-light leading-[1.08] tracking-display text-white">
                {category.title}
              </h1>

              <p className="mt-6 text-lg leading-8 text-white/75 sm:text-xl">
                {category.description}
              </p>

              {/* Key Features Pills */}
              <div className="mt-8 flex flex-wrap gap-2">
                {category.features.map((feat) => (
                  <span
                    key={feat}
                    className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono-g text-xs text-white/80 backdrop-blur-md"
                  >
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Category Products Catalog */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-3 border-b border-line pb-6 sm:flex-row sm:items-baseline">
            <div>
              <span className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-muted-fg">
                Available Systems
              </span>
              <h2 className="mt-2 font-brand text-3xl font-medium tracking-tight text-fg">
                {category.name} in this Suite
              </h2>
            </div>
            <span className="font-mono-g text-xs text-muted-fg">
              {products.length} {products.length === 1 ? "Product" : "Products"} Active
            </span>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {products.map((p, idx) => (
              <Reveal
                key={p.slug}
                delay={idx * 80}
                className="flex flex-col justify-between rounded-[24px] border border-line bg-surface p-8 transition-shadow hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-line bg-white px-3 py-0.5 font-mono-g text-[10px] uppercase tracking-wider text-muted-fg">
                      {p.category}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide ${
                        p.status === "live"
                          ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                          : p.status === "prototype"
                          ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                          : "bg-purple-500/10 text-purple-600 border border-purple-500/20"
                      }`}
                    >
                      {p.status === "live"
                        ? "● Live Product"
                        : p.status === "prototype"
                        ? "▲ Beta / Prototype"
                        : "○ Upcoming"}
                    </span>
                  </div>

                  <h3 className="mt-5 font-brand text-2xl font-medium tracking-tight text-fg">
                    {p.name}
                  </h3>
                  <p className="mt-2 font-medium text-sm text-fg/80">
                    {p.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-fg">
                    {p.overview}
                  </p>

                  {/* Highlights */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="rounded-full border border-line bg-white px-3 py-1 font-mono-g text-xs text-fg"
                      >
                        {feat.title}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-line/60 pt-5">
                  <Link
                    href={`/products/${p.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-black transition-opacity hover:opacity-75"
                  >
                    <span>View Product Details & Specifications</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                  <span className="font-mono-g text-[11px] text-muted-fg">
                    TAGVERSE Cloud
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Custom Engineering Callout */}
          <Reveal className="mt-16 rounded-[24px] border border-line bg-surface p-8 sm:p-12">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <span className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-muted-fg">
                  Custom Architecture
                </span>
                <h3 className="mt-2 font-brand text-2xl font-medium tracking-tight text-fg sm:text-3xl">
                  Require a bespoke {category.name} build?
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-fg sm:text-base">
                  Every business operates with unique workflows. Our technical architects design, build, and deploy custom enterprise web applications tailored to your exact operational specifications.
                </p>
              </div>

              <Link
                href="/services/web-development"
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-black px-7 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Explore Custom Dev
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Explore Other Categories */}
      <section className="border-t border-line bg-surface py-20">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-3 border-b border-line pb-6 sm:flex-row sm:items-baseline">
            <h2 className="font-brand text-2xl font-medium tracking-tight text-fg">
              Other Software Suites
            </h2>
            <Link
              href="/products"
              className="font-mono-g text-xs font-semibold text-black hover:underline"
            >
              View All Products &rarr;
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/products/category/${c.slug}`}
                className="group rounded-2xl border border-line bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="font-mono-g text-[10px] uppercase tracking-wider text-muted-fg">
                  Software Suite
                </span>
                <h3 className="mt-2 font-brand text-lg font-medium tracking-tight text-fg group-hover:text-black">
                  {c.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-fg">
                  {c.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-black">
                  <span>Explore Suite</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* High-Conversion Bottom CTA Banner */}
      <DetailCTABanner
        title={`Deploy ${category.name} tailored to your business.`}
        subtitle="Talk directly with our software engineering leads to evaluate sandbox demos, custom integrations, or private VPC deployment."
        primaryCtaText="Request Solution Demo"
        prefillName={category.name}
      />
    </main>
  );
}
