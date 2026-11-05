"use client";

import { useContactModal } from "@/components/ContactModal";

interface CourseDetailStickyCtaProps {
  courseTitle: string;
  priceDisplay: string;
  duration: string;
}

export default function CourseDetailStickyCta({
  courseTitle,
  priceDisplay,
  duration,
}: CourseDetailStickyCtaProps) {
  const { open } = useContactModal();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/10 bg-white/90 dark:border-white/15 dark:bg-black/90 p-3 sm:p-4 backdrop-blur-xl shadow-2xl transition-colors">
      <div className="container-x flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <div className="font-brand text-sm font-medium text-black dark:text-white line-clamp-1">
            {courseTitle}
          </div>
          <div className="font-mono-g text-[11px] text-black/50 dark:text-white/50">
            {duration} &bull; <span className="text-emerald-600 dark:text-emerald-400 font-bold">{priceDisplay}</span>
          </div>
        </div>

        <div className="flex w-full sm:w-auto items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={() => open(`TAGVERSE Academy - Orientation for ${courseTitle}`)}
            className="flex-1 sm:flex-none rounded-full border border-black/15 bg-black/5 text-black hover:bg-black/10 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 px-4 py-2.5 text-center font-brand text-xs font-medium transition-all"
          >
            Book Free Orientation
          </button>
          <button
            type="button"
            onClick={() => open(`Course Enrolment: ${courseTitle}`)}
            className="flex-1 sm:flex-none rounded-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 px-6 py-2.5 text-center font-brand text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,0,0,0.15)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Enrol Now
          </button>
        </div>
      </div>
    </div>
  );
}
