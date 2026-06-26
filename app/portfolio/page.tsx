import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PortfolioGrid from "@/components/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio — Tagverse",
  description: "Selected work from the Tagverse studio — brand, film, and digital.",
};

export default function PortfolioPage() {
  return (
    <main className="overflow-x-hidden">
      <PageHero
        eyebrow="Portfolio"
        title="Work we're proud of."
        subtitle="Brand, content, web, and campaign projects from the TAGVERSE studio."
      />

      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <PortfolioGrid />
        </div>
      </section>
    </main>
  );
}
