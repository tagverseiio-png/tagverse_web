import Reveal from "./Reveal";

const signals = [
  {
    title: "AI-First Agency",
    body: "Every deliverable is built with AI tools that cut time and increase output quality.",
  },
  {
    title: "Multi-market",
    body: "Active across India, UAE, Malaysia, Singapore, and beyond.",
  },
  {
    title: "Performance-led",
    body: "We tie our work to metrics that matter — leads, ROAS, revenue.",
  },
];

export default function Compliance() {
  return (
    <section className="bg-white py-24 md:py-28">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Built on trust</p>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden rounded-[20px] border border-line bg-line md:grid-cols-3">
          {signals.map((s, i) => (
            <Reveal key={s.title} delay={i * 90} className="bg-white p-8">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-black text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h3 className="mt-6 font-brand text-lg font-medium tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-fg">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
