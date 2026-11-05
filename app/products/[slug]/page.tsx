import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DetailCTABanner from "@/components/DetailCTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import ProductHeroButtons from "@/components/ProductHeroButtons";
import Reveal from "@/components/Reveal";
import { PRODUCTS_DATA, getProductBySlug } from "@/lib/productsData";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const slugs: { slug: string }[] = [];
  PRODUCTS_DATA.forEach((p) => {
    if (p.slug !== "ai-voice-agents" && p.slug !== "vyra-crm") {
      slugs.push({ slug: p.slug });
    }
    if (p.aliases) {
      p.aliases.forEach((alias) => {
        if (alias !== "ai-voice-agents" && alias !== "vyra-crm") {
          slugs.push({ slug: alias });
        }
      });
    }
  });
  return slugs;
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: "Product Not Found — Tagverse",
    };
  }

  const url = `https://www.t4gverse.com/products/${product.slug}`;

  return {
    title: `${product.name} — Tagverse | Software Platforms & Enterprise SaaS`,
    description: product.overview,
    keywords: [
      product.name,
      product.category,
      ...product.specs.stack,
      ...product.specs.integrations,
      "enterprise software",
      "SaaS platform",
      "Tagverse products",
    ],
    openGraph: {
      title: `${product.name} — Tagverse`,
      description: product.overview,
      url,
      siteName: "Tagverse",
      type: "website",
      images: [
        {
          url: product.heroImage,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — Tagverse`,
      description: product.overview,
      images: [product.heroImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const relatedProducts = product.relatedProductSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.longDescription,
    applicationCategory: product.category,
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    provider: {
      "@type": "Organization",
      name: "Tagverse",
      url: "https://www.t4gverse.com",
    },
  };

  return (
    <main className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
              { label: product.category, href: `/products/category/${product.categorySlug}` },
              { label: product.name },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-[var(--accent-purple-soft)]">
                    {product.eyebrow}
                  </span>
                  <Link
                    href={`/products/category/${product.categorySlug}`}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono-g text-[11px] text-white/70 transition-colors hover:bg-white/15 hover:text-white"
                  >
                    {product.category}
                  </Link>
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-mono-g text-[10px] uppercase tracking-wider ${
                      product.status === "live"
                        ? "border border-emerald-500/30 bg-emerald-500/20 text-emerald-400"
                        : product.status === "prototype"
                        ? "border border-amber-500/30 bg-amber-500/20 text-amber-300"
                        : "border border-purple-500/30 bg-purple-500/20 text-purple-300"
                    }`}
                  >
                    {product.status === "live"
                      ? "● Live Product"
                      : product.status === "prototype"
                      ? "▲ Beta / Prototype"
                      : "○ Upcoming"}
                  </span>
                </div>

                <h1 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.25rem)] font-light leading-[1.08] tracking-display text-white">
                  {product.name}
                </h1>

                <p className="mt-4 font-brand text-xl text-white/90 sm:text-2xl">
                  {product.tagline}
                </p>

                <p className="mt-4 text-base leading-7 text-white/70 sm:text-lg">
                  {product.overview}
                </p>

                {/* Hero CTAs */}
                <ProductHeroButtons productName={product.name} />

                {/* Key Metrics */}
                <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                  {product.metrics.map((metric, idx) => (
                    <div key={idx}>
                      <div className="font-brand text-2xl font-semibold text-white sm:text-3xl">
                        {metric.value}
                      </div>
                      <div className="mt-1 font-mono-g text-[11px] uppercase tracking-wider text-white/50">
                        {metric.label}
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
                      src={product.heroImage}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span className="font-mono-g uppercase tracking-wider">
                        TAGVERSE SOFTWARE • {product.category}
                      </span>
                      <span className="font-mono-g text-white/40">
                        v2.4 Production
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Overview & Architecture */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-4xl text-center">
            <span className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-muted-fg">
              Platform Architecture
            </span>
            <h2 className="mt-3 font-brand text-3xl font-medium tracking-tight text-fg md:text-4xl">
              Engineered for velocity, scalability, and zero downtime.
            </h2>
            <p className="mt-6 text-base leading-8 text-muted-fg sm:text-lg">
              {product.longDescription}
            </p>
          </div>

          {/* Architecture Highlights */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {product.architecture.map((arch, idx) => (
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
                    {arch.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-fg">
                    {arch.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section id="features" className="scroll-mt-28 bg-surface py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-8 md:flex-row md:items-end">
            <div>
              <span className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-muted-fg">
                Capabilities
              </span>
              <h2 className="mt-3 font-brand text-3xl font-medium tracking-tight text-fg md:text-4xl">
                Core Feature Suite
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-fg">
              High-throughput tools crafted to automate repetitive operations and accelerate revenue.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {product.keyFeatures.map((feat, idx) => (
              <Reveal
                key={idx}
                delay={idx * 60}
                className="rounded-[20px] border border-line bg-white p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface font-mono-g text-sm font-semibold text-fg">
                  0{idx + 1}
                </div>
                <h3 className="mt-5 font-brand text-xl font-medium tracking-tight text-fg">
                  {feat.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-fg">
                  {feat.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Deep Dive */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-muted-fg">
              Deep Dive
            </span>
            <h2 className="mt-3 font-brand text-3xl font-medium tracking-tight text-fg md:text-4xl">
              System Modules
            </h2>
            <p className="mt-3 text-base text-muted-fg">
              Modular microservices engineered to adapt to your organizational hierarchy.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {product.modules.map((mod, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-[24px] border border-line bg-surface p-8"
              >
                <div>
                  <h3 className="font-brand text-2xl font-medium tracking-tight text-fg">
                    {mod.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-fg">
                    {mod.description}
                  </p>

                  <div className="mt-6 border-t border-line/60 pt-6">
                    <span className="font-mono-g text-[11px] uppercase tracking-wider text-muted-fg">
                      Key Capabilities:
                    </span>
                    <ul className="mt-3 space-y-2">
                      {mod.capabilities.map((cap, capIdx) => (
                        <li key={capIdx} className="flex items-center gap-2.5 text-sm text-fg">
                          <span className="h-1.5 w-1.5 rounded-full bg-black" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications & Tech Stack */}
      <section id="specifications" className="scroll-mt-28 border-t border-line bg-surface py-20 md:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <span className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-muted-fg">
                Technical Specifications
              </span>
              <h2 className="mt-3 font-brand text-3xl font-medium tracking-tight text-fg">
                Built on enterprise standards.
              </h2>
            </div>

            <div className="mt-12 overflow-hidden rounded-[24px] border border-line bg-white shadow-sm">
              <div className="divide-y divide-line text-sm">
                <div className="grid grid-cols-1 gap-2 p-6 sm:grid-cols-3 sm:items-center">
                  <span className="font-mono-g text-xs uppercase tracking-wider text-muted-fg">
                    Deployment Options
                  </span>
                  <span className="col-span-2 font-medium text-fg">
                    {product.specs.deployment}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2 p-6 sm:grid-cols-3 sm:items-center">
                  <span className="font-mono-g text-xs uppercase tracking-wider text-muted-fg">
                    Core Tech Stack
                  </span>
                  <div className="col-span-2 flex flex-wrap gap-2">
                    {product.specs.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-line bg-surface px-3 py-1 font-mono-g text-xs text-fg"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 p-6 sm:grid-cols-3 sm:items-center">
                  <span className="font-mono-g text-xs uppercase tracking-wider text-muted-fg">
                    Native Integrations
                  </span>
                  <div className="col-span-2 flex flex-wrap gap-2">
                    {product.specs.integrations.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-line bg-surface px-3 py-1 font-mono-g text-xs text-fg"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 p-6 sm:grid-cols-3 sm:items-center">
                  <span className="font-mono-g text-xs uppercase tracking-wider text-muted-fg">
                    Security & Compliance
                  </span>
                  <span className="col-span-2 font-medium text-fg">
                    {product.specs.compliance}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQAccordion
        faqs={product.faqs}
        title={`Frequently Asked Questions about ${product.name}`}
      />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-white py-20 border-t border-line">
          <div className="container-x">
            <div className="flex flex-col justify-between gap-3 border-b border-line pb-6 sm:flex-row sm:items-baseline">
              <h2 className="font-brand text-2xl font-medium tracking-tight text-fg md:text-3xl">
                Explore Related Products
              </h2>
              <Link
                href="/products"
                className="font-mono-g text-xs font-semibold text-black hover:underline"
              >
                View Full Software Catalog &rarr;
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rel, idx) => (
                <Reveal
                  key={rel.slug}
                  delay={idx * 80}
                  className="flex flex-col justify-between rounded-[20px] border border-line bg-surface p-7 transition-shadow hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]"
                >
                  <div>
                    <span className="rounded-full border border-line bg-white px-2.5 py-0.5 font-mono-g text-[10px] uppercase tracking-wider text-muted-fg">
                      {rel.category}
                    </span>
                    <h3 className="mt-3 font-brand text-xl font-medium tracking-tight text-fg">
                      {rel.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-fg">
                      {rel.tagline}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-line/60 pt-4">
                    <Link
                      href={`/products/${rel.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-black transition-opacity hover:opacity-75"
                    >
                      <span>Explore Product</span>
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
        title={`Deploy ${product.name} for your organization.`}
        subtitle="Request a live guided product walkthrough and sandbox demo environment. We'll show you how to streamline your operations from day one."
        primaryCtaText="Request a Demo"
        prefillName={product.name}
      />
    </main>
  );
}
