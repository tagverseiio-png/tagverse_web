import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Portfolio — Tagverse",
  description: "Selected work from the Tagverse studio — brand, film, and digital.",
};

const projects = [
  {
    title: "Aurora Rebrand",
    category: "Brand identity",
    year: "2026",
    img: "/assets/images/home/stepped-feature-bg-1.webp",
    span: "lg:col-span-2",
  },
  {
    title: "Nightline",
    category: "Film & motion",
    year: "2025",
    img: "/assets/images/home/poster-voice-experience.webp",
    span: "",
  },
  {
    title: "Meridian Labs",
    category: "Web & product",
    year: "2025",
    img: "/assets/images/insights/smart-suggestion-layer-1.webp",
    span: "",
  },
  {
    title: "DoorDash Films",
    category: "Campaign",
    year: "2026",
    img: "/assets/images/home/spotlight-doordash-background.jpg",
    span: "lg:col-span-2",
  },
  {
    title: "Halo Audio",
    category: "Sound & podcast",
    year: "2024",
    img: "/assets/images/insights/smart-suggestion-layer-2.webp",
    span: "",
  },
  {
    title: "Field Notes",
    category: "Editorial",
    year: "2024",
    img: "/assets/images/home/stepped-feature-bg-2.webp",
    span: "",
  },
];

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
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal
                key={p.title}
                delay={(i % 3) * 90}
                className={`group ${p.span}`}
              >
                <a href="#" className="block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-line">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.img}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
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
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
