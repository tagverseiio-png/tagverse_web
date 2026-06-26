import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Studio — Coming soon · Tagverse",
  description:
    "The Tagverse podcast studio is coming soon. Live recordings and ticketed seats — stay tuned.",
};

export default function StudioPage() {
  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-black text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-home.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />

      <div className="container-x relative text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[13px] font-medium backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-violet)]" />
            Tagverse Studio
          </span>

          <h1 className="mt-7 font-display text-[clamp(3rem,9vw,7rem)] font-light leading-[0.95] tracking-display">
            Coming soon.
          </h1>

          <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-white/65">
            Our content studio — shoots, podcasts, and live sessions — is opening
            soon in Chennai. Be the first to book a seat.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
            >
              Back to home
            </Link>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Notify me
            </a>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
