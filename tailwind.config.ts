import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        "muted-fg": "var(--muted-fg)",
        surface: "var(--surface)",
        line: "var(--border)",
        "accent-orange": "var(--accent-orange-bright)",
        "accent-violet": "var(--accent-violet)",
      },
      fontFamily: {
        sans: ["var(--font-text)"],
        display: ["var(--font-display)"],
        brand: ["var(--font-brand-display)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        hero: "var(--text-hero)",
        "section-h2": "var(--text-section-h2)",
        headline: "var(--text-headline)",
        "product-eyebrow": "var(--text-product-eyebrow)",
        "canvas-title": "var(--text-canvas-title)",
      },
      letterSpacing: {
        display: "var(--tracking-display)",
      },
      borderRadius: {
        image: "var(--radius-image)",
      },
    },
  },
  plugins: [],
};

export default config;
