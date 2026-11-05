import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PortfolioGrid from "@/components/PortfolioGrid";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Portfolio — TAGVERSE | Projects, Software & Case Studies",
  description:
    "Explore selected projects and software products by TAGVERSE across web & app development, AI solutions, SaaS, CRM, automation, branding, performance marketing, and e-commerce.",
  keywords: [
    "TAGVERSE portfolio",
    "web development case studies",
    "AI agent solutions",
    "SaaS CRM software",
    "automation integrations",
    "brand identity design",
    "performance marketing case studies",
    "e-commerce platforms",
  ],
  openGraph: {
    title: "Portfolio — TAGVERSE | Projects, Software & Case Studies",
    description:
      "Explore selected client and product case studies by TAGVERSE across modern engineering, AI, and digital growth.",
    url: "https://www.t4gverse.com/portfolio",
    siteName: "TAGVERSE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio — TAGVERSE",
    description:
      "Explore selected work and software products from TAGVERSE.",
  },
};

export default function PortfolioPage() {
  return (
    <main className="overflow-x-clip">
      <PageHero
        eyebrow="Portfolio & Case Studies"
        title="Work we're proud of."
        subtitle="Explore our client projects, internal software products, AI platforms, and creative campaigns."
      />

      <section className="bg-white dark:bg-black py-20 md:py-28 transition-colors duration-200">
        <div className="container-x">
          <PortfolioGrid />
        </div>
      </section>
      <CTA />
    </main>
  );
}
