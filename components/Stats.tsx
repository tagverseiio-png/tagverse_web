import Reveal from "./Reveal";

const stats = [
  { value: "3x", label: "Average ROAS improvement" },
  { value: "8", label: "Markets served" },
  { value: "∞", label: "Custom campaigns" },
];

export default function Stats() {
  return (
    <section className="bg-black pb-28 pt-10 text-white">
      <div className="container-x">
        <div className="grid gap-px overflow-hidden rounded-[20px] border border-white/10 bg-white/10 md:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 90}
              className="bg-black px-8 py-12 text-center"
            >
              <div className="font-display text-[clamp(3rem,7vw,5rem)] font-light leading-none tracking-display">
                {s.value}
              </div>
              <div className="mt-4 font-mono-g text-[0.75rem] uppercase tracking-[0.16em] text-white/50">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
