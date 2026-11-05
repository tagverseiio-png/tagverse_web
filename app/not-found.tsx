import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80svh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono-g text-[0.7rem] uppercase tracking-[0.16em] text-muted-fg">
        404
      </p>
      <h1 className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.15] tracking-display">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base text-muted-fg">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
      >
        Back to home
      </Link>
    </main>
  );
}
