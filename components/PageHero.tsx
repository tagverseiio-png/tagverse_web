import Reveal from "./Reveal";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-white text-black dark:bg-black dark:text-white pb-20 pt-40 transition-colors duration-200">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-home.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-15 dark:opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white dark:from-black/50 dark:via-black/40 dark:to-black transition-colors duration-200" />
      <div className="container-x relative">
        <Reveal>
          <p className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-black/50 dark:text-white/50">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.5rem,5.5vw,4rem)] font-light leading-[1.08] tracking-display text-black dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-xl text-lg leading-8 text-black/65 dark:text-white/65">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
