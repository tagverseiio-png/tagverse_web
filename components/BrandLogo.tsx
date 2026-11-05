"use client";

interface BrandLogoProps {
  lightText?: boolean;
  variant?: "wordmark" | "full";
  className?: string;
  imgClassName?: string;
}

/**
 * TAGVERSE Official Dual-Color Logo
 * - lightText = true (dark backgrounds): White text (TAG / IO / Subtitle) + Electric Purple (VERSE / .)
 * - lightText = false (light backgrounds): Black text (TAG / IO / Subtitle) + Electric Purple (VERSE / .)
 *
 * Smooth zero-flicker transition between white and black modes.
 */
export default function BrandLogo({
  lightText = true,
  variant = "wordmark",
  className = "h-[13px] sm:h-[14px]",
  imgClassName = "",
}: BrandLogoProps) {
  const darkSrc =
    variant === "full" ? "/logo-dark@2x.png" : "/wordmark-dark@2x.png";
  const lightSrc =
    variant === "full" ? "/logo-light@2x.png" : "/wordmark-light@2x.png";

  return (
    <span className={`relative inline-flex items-center select-none ${className}`}>
      {/* Dark background variant (White text + Purple VERSE) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={darkSrc}
        alt="TAGVERSE.IO"
        className={`h-full w-auto max-h-full object-contain transition-opacity duration-300 ${
          lightText
            ? "opacity-100 relative"
            : "opacity-0 absolute inset-0 pointer-events-none"
        } ${imgClassName}`}
        loading="eager"
      />

      {/* Light background variant (Black text + Purple VERSE) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={lightSrc}
        alt="TAGVERSE.IO"
        className={`h-full w-auto max-h-full object-contain transition-opacity duration-300 ${
          !lightText
            ? "opacity-100 relative"
            : "opacity-0 absolute inset-0 pointer-events-none"
        } ${imgClassName}`}
        loading="eager"
      />
    </span>
  );
}
