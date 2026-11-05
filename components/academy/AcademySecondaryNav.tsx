"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContactModal } from "@/components/ContactModal";

const NAV_ITEMS = [
  { label: "Overview", href: "/academy#overview" },
  { label: "Courses", href: "/academy#courses" },
  { label: "Learning Experience", href: "/academy#experience" },
  { label: "Projects", href: "/academy/projects" },
  { label: "Mentorship", href: "/academy/mentorship" },
  { label: "Career Opportunities", href: "/academy#career-paths" },
  { label: "FAQs", href: "/academy#faqs" },
];

export default function AcademySecondaryNav() {
  const pathname = usePathname();
  const { open } = useContactModal();

  return (
    <div className="sticky top-[72px] z-30 w-full border-b border-black/10 bg-white/80 dark:border-white/10 dark:bg-black/80 backdrop-blur-xl transition-all">
      <div className="container-x flex items-center justify-between gap-4 py-2.5">
        {/* Navigation Items (Scrollable on mobile) */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 text-xs font-mono-g">
          <Link
            href="/academy"
            className="mr-2 hidden items-center gap-1.5 font-brand text-xs font-semibold uppercase tracking-wider text-[var(--accent-purple)] dark:text-[var(--accent-purple-soft)] sm:inline-flex shrink-0"
          >
            <span>ACADEMY</span>
          </Link>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href.split("#")[0];
            return (
              <a
                key={item.label}
                href={item.href}
                className="whitespace-nowrap rounded-full px-3 py-1.5 text-black/60 dark:text-white/60 transition-colors hover:bg-black/5 hover:text-black dark:hover:bg-white/5 dark:hover:text-white"
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="/academy#courses"
            className="hidden rounded-full border border-black/15 bg-black/5 px-3.5 py-1.5 font-brand text-[11px] font-medium text-black dark:border-white/20 dark:bg-white/5 dark:text-white transition-all hover:bg-black/10 dark:hover:bg-white/10 sm:inline-flex"
          >
            Explore Courses
          </a>
          <button
            type="button"
            onClick={() => open("TAGVERSE Academy - Book Free Orientation")}
            className="inline-flex items-center gap-1.5 rounded-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 px-3.5 py-1.5 font-brand text-[11px] font-semibold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,0,0,0.15)] dark:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
          >
            <span>Book Orientation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
