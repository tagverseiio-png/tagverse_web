import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Services — Tagverse",
  description:
    "An AI-first creative studio that handles everything your brand needs — from strategy to screen to scale.",
};

const services = [
  {
    n: "01",
    title: "Social Media Management",
    body: "We run your social presence like a growth engine — consistent content, sharp copy, and a strategy that builds audience and drives action.",
    points: [
      "Content calendars",
      "Reel production",
      "Caption writing",
      "Community management",
      "Analytics",
    ],
  },
  {
    n: "02",
    title: "AI & Automation",
    body: "We build the systems that run your marketing while you sleep — CRM flows, lead nurture, WhatsApp automation, and AI-powered pipelines.",
    points: [
      "n8n workflows",
      "WhatsApp automation",
      "CRM integration",
      "AI content systems",
      "Lead qualification",
    ],
  },
  {
    n: "03",
    title: "SaaS & Website",
    body: "From landing pages to full SaaS products — designed to convert, built to scale, and shipped fast.",
    points: [
      "Web design",
      "Next.js builds",
      "SaaS development",
      "Landing pages",
      "E-commerce",
    ],
  },
  {
    n: "04",
    title: "WebGL & Interactive",
    body: "Immersive, scroll-driven web experiences that make your brand impossible to forget.",
    points: [
      "3D web",
      "Scroll animations",
      "GSAP",
      "Three.js",
      "Interactive storytelling",
    ],
  },
  {
    n: "05",
    title: "Brand Strategy & Identity",
    body: "We define who you are, what you stand for, and how you show up — across every touchpoint.",
    points: [
      "Brand audits",
      "Naming",
      "Logo & identity",
      "Design systems",
      "Messaging & positioning",
    ],
  },
  {
    n: "06",
    title: "Paid Media",
    body: "Performance campaigns on Meta and Google — built around your goals, optimised with data, and scaled with intent.",
    points: [
      "Meta Ads",
      "Google Ads",
      "Lead gen",
      "Retargeting",
      "Campaign strategy",
    ],
  },
  {
    n: "07",
    title: "Podcast Studio",
    body: "Full-service podcast production — recording, editing, distribution, and a live studio your audience can actually attend.",
    points: [
      "Production",
      "Editing & mix",
      "Live recordings",
      "Distribution",
      "Studio booking",
    ],
  },
  {
    n: "08",
    title: "Video Marketing",
    body: "From brand films to social-first reels — cinematic storytelling that moves people and drives results.",
    points: [
      "Brand films",
      "Reels",
      "Commercials",
      "Motion graphics",
      "Post-production",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="overflow-x-hidden">
      <PageHero
        eyebrow="Services"
        title="What we do."
        subtitle="An AI-first creative studio that handles everything your brand needs — from strategy to screen to scale."
      />

      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal
                key={s.n}
                delay={(i % 2) * 90}
                className="flex flex-col rounded-[20px] border border-line bg-surface p-8 transition-shadow hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)]"
              >
                <span className="font-mono-g text-sm text-muted-fg">{s.n}</span>
                <h3 className="mt-4 font-brand text-2xl font-medium tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 leading-7 text-muted-fg">{s.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.points.map((p) => (
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

          <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[24px] bg-black p-10 text-white md:flex-row md:items-center md:p-12">
            <div>
              <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-tight tracking-display">
                Have a project in mind?
              </h3>
              <p className="mt-3 max-w-md text-white/60">
                Tell us what you&apos;re building and we&apos;ll put a plan
                together.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
            >
              Start a project
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
