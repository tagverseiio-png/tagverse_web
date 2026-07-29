import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import Studio from "@/components/Studio";

export const metadata: Metadata = {
  title: "Studio — Tagverse",
  description:
    "Our state-of-the-art content studio in Chennai for podcasts, shoots, and live sessions.",
};

const studioFeatures = [
  {
    title: "Podcast Production",
    body: "Professional multi-cam setups and broadcast-quality audio for your next chart-topping podcast. We handle recording, mixing, and distribution.",
    points: ["Multi-cam recording", "Broadcast audio", "Live mixing", "Post-production"],
  },
  {
    title: "Commercial Shoots",
    body: "Versatile setups with premium lighting and backdrops. Perfect for product shoots, interviews, and brand films.",
    points: ["Lighting grid", "Multiple backdrops", "Green screen", "Pro gear"],
  },
  {
    title: "Live Sessions",
    body: "Host webinars, live streams, and interactive sessions with high-speed internet and real-time vision mixing.",
    points: ["Vision mixing", "Low latency", "Teleprompter", "Audience seating"],
  },
  {
    title: "Post-Production",
    body: "Edit your content right after you shoot. Our suites are equipped with the latest hardware for editing, color grading, and VFX.",
    points: ["Color grading", "Sound design", "VFX & Motion", "Fast turnaround"],
  },
];

export default function StudioPage() {
  return (
    <main className="overflow-x-hidden">
      <PageHero
        eyebrow="Studio"
        title="Create. Record. Scale."
        subtitle="Our state-of-the-art content studio in Chennai — built for creators, brands, and live sessions."
      />

      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-5 md:grid-cols-2">
            {studioFeatures.map((f, i) => (
              <Reveal
                key={f.title}
                delay={(i % 2) * 90}
                className="flex flex-col rounded-[20px] border border-line bg-surface p-8 transition-shadow hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)]"
              >
                <h3 className="font-brand text-2xl font-medium tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-3 leading-7 text-muted-fg">{f.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {f.points.map((p) => (
                    <li
                      key={p}
                      className="rounded-full border border-line bg-white px-3 py-1 text-sm"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Studio />

      <CTA />
    </main>
  );
}
