import Reveal from "./Reveal";

const items = [
  {
    title: "Smart content engine",
    body: "Reels, carousels, and copy built around your ICP and buying triggers",
    img: "/assets/images/insights/smart-suggestion-layer-1.webp",
  },
  {
    title: "Paid media that converts",
    body: "Meta and Google campaigns managed with AI-assisted optimisation",
    img: "/assets/images/insights/smart-suggestion-layer-2.webp",
  },
  {
    title: "Automation layer",
    body: "WhatsApp flows, lead nurture, CRM sync — zero manual follow-up",
    img: "/assets/images/insights/smart-suggestion-layer-3.webp",
  },
];

export default function Insights() {
  return (
    <section id="growth-os" className="bg-[var(--page-lp)] py-24 text-white md:py-32">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--accent-violet)]">
            Growth OS
          </p>
          <h2 className="mt-5 font-display text-section-h2 font-light leading-[1.18] tracking-display">
            Every client gets a custom Growth OS — a connected system of content,
            ads, automation, and analytics that runs your marketing like a
            machine.
          </h2>
          <a href="#" className="btn-light mt-8">
            See how it works
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </a>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal
              key={it.title}
              delay={i * 90}
              className="overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03]"
            >
              <div className="aspect-[16/10] overflow-hidden border-b border-white/10 bg-white/[0.02]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.img} alt={it.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-brand text-lg font-medium tracking-tight">{it.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-white/55">{it.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
