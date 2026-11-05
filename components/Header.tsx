"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useContactModal } from "./ContactModal";
import ServicesMegaMenu from "./ServicesMegaMenu";
import ProductsMegaMenu from "./ProductsMegaMenu";
import BrandLogo from "./BrandLogo";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";
import { TAGVERSE_SERVICES, PRODUCT_CATEGORIES } from "@/lib/defaultData";

const categoryToAnchor: Record<string, string> = {
  "CRM Software": "crm",
  "ERP Software": "erp",
  "Billing & Invoicing Software": "billing",
  "Learning Management Systems (LMS)": "lms",
  "Custom SaaS Platforms": "saas",
};

const categoryToSlug: Record<string, string> = {
  "CRM Software": "crm",
  "ERP Software": "erp",
  "Billing & Invoicing Software": "billing",
  "Learning Management Systems (LMS)": "lms",
  "Custom SaaS Platforms": "custom-saas",
};

const serviceIdToSlug: Record<string, string> = {
  "digital-marketing": "digital-marketing",
  "performance-ads": "performance-marketing",
  "brand-identity": "branding-design",
  "web-app-dev": "web-development",
  "ai-agents-llm": "ai-agents-llm",
  "n8n-webhooks": "workflow-automation",
  "whatsapp-chatbots": "whatsapp-automation",
  "seo-aeo-geo": "seo-aeo-geo",
  "video-podcast-studio": "video-podcast-production",
  "influencer-management": "influencer-management",
};

// Routes whose hero is dark at the top — the header needs white text there.
const darkHeroRoutes = ["/portfolio", "/services", "/products", "/academy", "/studio"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"services" | "products" | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const navRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();
  const { open } = useContactModal();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on page route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMenu(null);
    setMobileServicesOpen(false);
    setMobileProductsOpen(false);
  }, [pathname]);

  // Click outside to close desktop mega menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // White text when in dark mode, or when scrolled (dark frosted bar), or when mega menu is open.
  const lightText = isDark || scrolled || activeMenu !== null;

  function handleMouseEnter(menu: "services" | "products") {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  }

  function handleMenuClick(menu: "services" | "products") {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50" ref={navRef}>
      <div className="container-hero pt-3">
        <div
          className={`flex h-14 items-center justify-between rounded-full px-3 pl-5 transition-all duration-300 ${
            scrolled || activeMenu !== null
              ? "border border-white/10 bg-black/60 backdrop-blur-xl shadow-lg shadow-black/20"
              : isDark
              ? "border border-white/10 bg-black/40 backdrop-blur-md"
              : "border border-transparent"
          } ${lightText ? "text-white" : "text-black"}`}
        >
          <Link href="/" className="flex items-center gap-2 group py-1" aria-label="TAGVERSE Home">
            <BrandLogo lightText={lightText} variant="wordmark" className="h-[13px] sm:h-[14px]" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 text-sm md:flex">
            {/* Services Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => handleMenuClick("services")}
                className={`inline-flex items-center gap-1.5 transition-all hover:opacity-100 ${
                  pathname === "/services" || activeMenu === "services"
                    ? "opacity-100 font-medium"
                    : "opacity-80"
                }`}
                aria-expanded={activeMenu === "services"}
              >
                <span>Services</span>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${
                    activeMenu === "services" ? "rotate-180" : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>

            {/* Products Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("products")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => handleMenuClick("products")}
                className={`inline-flex items-center gap-1.5 transition-all hover:opacity-100 ${
                  pathname === "/products" || activeMenu === "products"
                    ? "opacity-100 font-medium"
                    : "opacity-80"
                }`}
                aria-expanded={activeMenu === "products"}
              >
                <span>Products</span>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${
                    activeMenu === "products" ? "rotate-180" : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>

            {/* Academy */}
            <Link
              href="/academy"
              className={`transition-opacity hover:opacity-100 ${
                pathname === "/academy" ? "opacity-100 font-medium" : "opacity-80"
              }`}
            >
              Academy
            </Link>

            {/* Portfolio */}
            <Link
              href="/portfolio"
              className={`transition-opacity hover:opacity-100 ${
                pathname === "/portfolio" ? "opacity-100 font-medium" : "opacity-80"
              }`}
            >
              Portfolio
            </Link>

            {/* Studio */}
            <Link
              href="/studio"
              className={`transition-opacity hover:opacity-100 ${
                pathname === "/studio" ? "opacity-100 font-medium" : "opacity-80"
              }`}
            >
              Studio
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle lightText={lightText} />
            <button
              onClick={open}
              className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all ${
                lightText
                  ? "border border-white/30 text-white hover:bg-white/10"
                  : "bg-black text-white hover:opacity-90"
              }`}
            >
              Book a call
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className={`grid h-9 w-9 place-items-center rounded-full transition-colors md:hidden ${
                lightText
                  ? "border border-white/20 text-white hover:bg-white/10"
                  : "border border-black/10 text-black hover:bg-black/5"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="8" x2="20" y2="8" />
                    <line x1="4" y1="16" x2="20" y2="16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu Dropdown Container */}
        {activeMenu !== null && (
          <div
            className="hidden pt-2 md:block animate-in fade-in slide-in-from-top-2 duration-200"
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            {activeMenu === "services" && (
              <ServicesMegaMenu onClose={() => setActiveMenu(null)} />
            )}
            {activeMenu === "products" && (
              <ProductsMegaMenu onClose={() => setActiveMenu(null)} />
            )}
          </div>
        )}

        {/* Mobile Accordion Menu Drawer */}
        {mobileMenuOpen && (
          <div className="mt-2 max-h-[85vh] overflow-y-auto rounded-[24px] border border-white/10 bg-black/95 p-5 text-white shadow-2xl backdrop-blur-2xl md:hidden">
            <nav className="flex flex-col space-y-2 text-base">
              {/* Mobile Services Accordion */}
              <div className="border-b border-white/10 pb-2">
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-white/90 hover:bg-white/5"
                >
                  <span className="font-medium">Services</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {mobileServicesOpen && (
                  <div className="mt-1 space-y-1 pl-4">
                    <Link
                      href="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-lg px-3 py-2 text-xs font-semibold text-[var(--accent-purple-soft)] hover:bg-white/5"
                    >
                      View All Services →
                    </Link>
                    {TAGVERSE_SERVICES.map((s) => (
                      <Link
                        key={s.id}
                        href={`/services/${serviceIdToSlug[s.id] || s.id}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-lg px-3 py-2 text-xs text-white/70 hover:bg-white/5 hover:text-white"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Products Accordion */}
              <div className="border-b border-white/10 pb-2">
                <button
                  type="button"
                  onClick={() => setMobileProductsOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-white/90 hover:bg-white/5"
                >
                  <span className="font-medium">Products</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {mobileProductsOpen && (
                  <div className="mt-1 space-y-1 pl-4">
                    <Link
                      href="/products"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-lg px-3 py-2 text-xs font-semibold text-[var(--accent-purple-soft)] hover:bg-white/5"
                    >
                      View All Products →
                    </Link>
                    <Link
                      href="/products/vyra-crm"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-white hover:bg-white/5"
                    >
                      <span>VYRA CRM</span>
                      <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-mono-g text-emerald-400">Live</span>
                    </Link>
                    <Link
                      href="/products/ai-voice-agents"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-white hover:bg-white/5"
                    >
                      <span>AI Voice Agents</span>
                      <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-mono-g text-emerald-400">Live</span>
                    </Link>
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <Link
                        key={cat}
                        href={`/products/category/${categoryToSlug[cat] || "crm"}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-lg px-3 py-2 text-xs text-white/70 hover:bg-white/5 hover:text-white"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Top-level Links */}
              <Link
                href="/academy"
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-4 py-2.5 transition-colors ${
                  pathname === "/academy"
                    ? "bg-white/10 font-medium text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                Academy
              </Link>

              <Link
                href="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-4 py-2.5 transition-colors ${
                  pathname === "/portfolio"
                    ? "bg-white/10 font-medium text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                Portfolio
              </Link>

              <Link
                href="/studio"
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-4 py-2.5 transition-colors ${
                  pathname === "/studio"
                    ? "bg-white/10 font-medium text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                Studio
              </Link>

              <div className="flex items-center justify-between rounded-xl px-4 py-2.5 text-white/80 border border-white/10 bg-white/5 my-1">
                <span className="text-sm font-medium">Appearance</span>
                <ThemeToggle lightText={true} showLabel />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    open();
                  }}
                  className="w-full rounded-full bg-white py-3 text-center text-sm font-medium text-black transition-opacity hover:opacity-90"
                >
                  Book a call
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
