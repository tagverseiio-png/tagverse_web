import Reveal from "./Reveal";

export default function Spotlight() {
  return (
    <section id="customers" className="bg-white py-24 md:py-32">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Results</p>
          <h2 className="mt-5 font-display text-section-h2 font-light leading-[1.15] tracking-display">
            See how brands scaled with TAGVERSE
          </h2>
        </Reveal>

        <Reveal
          delay={120}
          className="relative mt-12 overflow-hidden rounded-[24px] border border-line"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/home/spotlight-doordash-background.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />

          <div className="relative flex min-h-[560px] flex-col justify-between p-8 text-white md:p-12">
            <div className="flex items-start justify-between gap-6">
              <span className="rounded-full border border-white/25 px-4 py-1.5 font-mono-g text-[0.7rem] uppercase tracking-[0.16em] text-white/80">
                Case study
              </span>
              <div className="text-right">
                <div className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light leading-none tracking-display">
                  (X)%
                </div>
                <div className="mt-1 font-mono-g text-[0.7rem] uppercase tracking-[0.16em] text-white/60">
                  Growth
                </div>
              </div>
            </div>

            <div className="max-w-3xl">
              <h3 className="font-brand text-xl font-medium tracking-tight md:text-2xl">
                How (Client Name) grew (X)% in (timeframe)
              </h3>
              <blockquote className="mt-6 font-display text-[clamp(1.25rem,2vw,1.6rem)] font-light leading-snug text-white/90">
                &ldquo;(Placeholder for client testimonial)&rdquo;
              </blockquote>

              <div className="mt-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/images/home/spotlight-andy-fang-headshot.webp"
                    alt="Client"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium">(Client name)</div>
                    <div className="text-sm text-white/60">(Role, brand)</div>
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
                >
                  View case study
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
