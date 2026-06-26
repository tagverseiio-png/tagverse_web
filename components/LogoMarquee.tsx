const logos = [
  "Waves",
  "Dust2Glow",
  "Simple Krew",
  "Soora Express",
  "KTH",
  "Elephant Production",
  "Adroit Design",
  "Abroadly",
];

export default function LogoMarquee() {
  const row = [...logos, ...logos];
  return (
    <section className="border-t border-white/5 bg-black py-14">
      <p className="container-x mb-9 text-center font-mono-g text-[0.7rem] uppercase tracking-[0.16em] text-white/35">
        Trusted by brands we&apos;ve helped grow
      </p>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-black to-transparent" />
        <div className="flex w-max animate-marquee items-center">
          {row.map((logo, i) => (
            <span
              key={i}
              className="mx-9 whitespace-nowrap font-brand text-xl font-medium tracking-tight text-white/45 transition-colors hover:text-white/90 md:text-2xl"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
