import Reveal from "./Reveal";

const features = [
  { title: "Personalized voices", body: "Tailor your agent's voice to match your brand" },
  { title: "Dynamic interrupts", body: "Designed to adapt to a global audience" },
  { title: "Ultra-low latency", body: "Industry-leading voice response time" },
];

export default function Voice() {
  return (
    <section
      id="voice"
      className="bg-[var(--page-voice)] py-24 text-white md:py-32"
    >
      <div className="container-x">
        <Reveal>
          <p className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--accent-violet)]">
            Natural voice
          </p>
          <h2 className="mt-5 font-display text-section-h2 font-light leading-[1.15] tracking-display">
            Engage with empathy
          </h2>
        </Reveal>

        {/* demo video */}
        <Reveal
          delay={120}
          className="group relative mt-12 overflow-hidden rounded-[20px] border border-white/10"
        >
          <video
            className="aspect-video w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/images/home/poster-voice-experience.webp"
          >
            <source src="/assets/videos/home/video-voice-demo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-voice)]/60 to-transparent" />
          <button className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md transition-colors hover:bg-white/20">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
            Play
          </button>
        </Reveal>

        <div className="mt-6 grid gap-px overflow-hidden rounded-[20px] border border-white/10 bg-white/10 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 90}
              className="bg-[var(--surface-voice)] p-7"
            >
              <h3 className="font-brand text-lg font-medium tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm text-white/55">{f.body}</p>
            </Reveal>
          ))}
        </div>

        {/* Voice Experience intro */}
        <Reveal className="mt-28 max-w-3xl">
          <p className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--accent-violet)]">
            Voice Experience
          </p>
          <h2 className="mt-5 font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.25] tracking-display">
            Emotionally-aware agents that understand tone, intent, and context.
            Fluidly handle accents, interruptions, and rapid turns of
            conversation to ensure every conversation feels natural.
          </h2>
          <a href="#" className="btn-light mt-8">
            Explore Voice Experience
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
