"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DEFAULT_PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/defaultData";
import type { Product } from "@/lib/types";

interface ProductsMegaMenuProps {
  onClose: () => void;
}

const categoryToSlug: Record<string, string> = {
  "CRM Software": "crm",
  "ERP Software": "erp",
  "Billing & Invoicing Software": "billing",
  "Learning Management Systems (LMS)": "lms",
  "Custom SaaS Platforms": "custom-saas",
};

const productIdToSlug: Record<string, string> = {
  "prod-vyra-crm": "vyra-crm",
  "prod-virtual-office": "tagverse-virtual-office",
  "prod-neuro-forge": "neuro-forge",
  "prod-tagverse-erp": "tagverse-enterprise-erp",
  "prod-tagverse-billing": "tagverse-billing-engine",
  "prod-tagverse-lms": "tagverse-lms-platform",
  "prod-tagverse-ai": "tagverse-ai",
  "prod-voice-agents": "ai-voice-agents",
};

const FLAGSHIP_ECOSYSTEM_PRODUCTS = [
  {
    name: "VYRA CRM",
    href: "/products/vyra-crm",
    tagline: "High-velocity pipeline management & omnichannel WhatsApp nurture.",
    status: "live",
  },
  {
    name: "TAGVERSE AI",
    href: "/products/tagverse-ai",
    tagline: "Custom enterprise AI assistants, RAG & autonomous business workflows.",
    status: "live",
  },
  {
    name: "Neuro Forge",
    href: "/products/neuro-forge",
    tagline: "Autonomous multi-agent orchestration for brand intelligence.",
    status: "live",
  },
  {
    name: "TAGVERSE Academy",
    href: "/academy",
    tagline: "Cohort-based generative & agentic AI engineering masterclasses.",
    status: "live",
  },
  {
    name: "TAGVERSE AI Voice Agents",
    href: "/products/ai-voice-agents",
    tagline: "Intelligent AI-powered inbound, outbound and callback voice automation.",
    status: "live",
  },
];

export default function ProductsMegaMenu({ onClose }: ProductsMegaMenuProps) {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch(() => {
        // Fall back gracefully to DEFAULT_PRODUCTS
      });
  }, []);

  // Featured product (VYRA CRM or first live product)
  const featured = products.find((p) => p.id === "prod-vyra-crm") || products[0] || DEFAULT_PRODUCTS[0];
  const featuredSlug = productIdToSlug[featured.id] || "vyra-crm";

  return (
    <div
      className="w-full rounded-[28px] border border-white/10 bg-black/95 p-6 text-white shadow-2xl backdrop-blur-2xl md:p-8"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.25fr_1.1fr_1.1fr_1.1fr]">
        {/* Column 1: Featured Product Card */}
        <div className="flex flex-col justify-between overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent p-6">
          <div>
            <Link
              href={`/products/${featuredSlug}`}
              onClick={onClose}
              className="group block relative aspect-[16/10] w-full overflow-hidden rounded-[14px] border border-white/10 bg-black/40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.img || "/assets/images/insights/smart-suggestion-layer-1.webp"}
                alt={featured.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 font-mono-g text-[10px] uppercase tracking-wider text-[var(--accent-purple-soft)] backdrop-blur-md">
                  Featured Product
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono-g text-[10px] text-emerald-400 border border-emerald-500/30">
                  Live
                </span>
              </div>
            </Link>

            <h3 className="mt-5 font-brand text-xl font-medium tracking-tight text-white">
              <Link
                href={`/products/${featuredSlug}`}
                onClick={onClose}
                className="hover:text-[var(--accent-purple-soft)] transition-colors"
              >
                {featured.name}
              </Link>
            </h3>
            <p className="mt-1 text-xs font-medium text-white/80">
              {featured.tagline}
            </p>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/60">
              {featured.description}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
            <Link
              href={`/products/${featuredSlug}`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-purple-soft)] transition-colors hover:text-white"
            >
              <span>Explore Product</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
            <a
              href="/#contact"
              onClick={onClose}
              className="rounded-full bg-white/10 px-3 py-1 font-mono-g text-[11px] font-medium text-white transition-colors hover:bg-white/20"
            >
              Request Demo
            </a>
          </div>
        </div>

        {/* Column 2: Business Management */}
        <div className="flex flex-col">
          <div className="border-b border-white/10 pb-2.5">
            <h4 className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-white/40">
              Business Management
            </h4>
          </div>
          <div className="mt-3 space-y-2">
            <Link
              href="/products/vyra-crm"
              onClick={onClose}
              className="group block rounded-xl p-2.5 transition-colors hover:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-white/90 group-hover:text-white">
                  CRM Software (VYRA CRM)
                </span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-mono-g text-emerald-400">
                  Live
                </span>
              </div>
              <div className="mt-1 text-[11px] leading-4 text-white/50 group-hover:text-white/70">
                Customer relationship and sales velocity pipeline management with omnichannel WhatsApp.
              </div>
            </Link>

            <Link
              href="/products/category/erp"
              onClick={onClose}
              className="group block rounded-xl p-2.5 transition-colors hover:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-white/90 group-hover:text-white">
                  ERP Software
                </span>
                <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-mono-g text-amber-300">
                  Beta
                </span>
              </div>
              <div className="mt-1 text-[11px] leading-4 text-white/50 group-hover:text-white/70">
                Unified business operations, warehouse inventory, and cross-departmental resource planning.
              </div>
            </Link>

            <Link
              href="/products/category/billing"
              onClick={onClose}
              className="group block rounded-xl p-2.5 transition-colors hover:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-white/90 group-hover:text-white">
                  Billing & Invoicing Software
                </span>
                <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-[9px] font-mono-g text-purple-300">
                  Upcoming
                </span>
              </div>
              <div className="mt-1 text-[11px] leading-4 text-white/50 group-hover:text-white/70">
                GST-compliant recurring subscriptions, estimate-to-invoice automation, and payment gateways.
              </div>
            </Link>
          </div>
        </div>

        {/* Column 3: Digital Platforms */}
        <div className="flex flex-col">
          <div className="border-b border-white/10 pb-2.5">
            <h4 className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-white/40">
              Digital Platforms
            </h4>
          </div>
          <div className="mt-3 space-y-2">
            <Link
              href="/products/category/lms"
              onClick={onClose}
              className="group block rounded-xl p-2.5 transition-colors hover:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-white/90 group-hover:text-white">
                  Learning Management Systems
                </span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-mono-g text-emerald-400">
                  Live
                </span>
              </div>
              <div className="mt-1 text-[11px] leading-4 text-white/50 group-hover:text-white/70">
                TAGVERSE Academy and LMS solutions for creator education, cohorts, and certification.
              </div>
            </Link>

            <Link
              href="/products/category/custom-saas"
              onClick={onClose}
              className="group block rounded-xl p-2.5 transition-colors hover:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-white/90 group-hover:text-white">
                  Custom SaaS Platforms
                </span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-mono-g text-emerald-400">
                  Live
                </span>
              </div>
              <div className="mt-1 text-[11px] leading-4 text-white/50 group-hover:text-white/70">
                Tailored cloud software platforms and subscription-based solutions built to client specs.
              </div>
            </Link>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <span className="font-mono-g text-[10px] uppercase tracking-wider text-white/40">
                Custom Engineering
              </span>
              <p className="mt-1 text-xs text-white/75">
                Have a unique software idea? We architect and launch full-stack MVPs in weeks.
              </p>
              <a
                href="/#contact"
                onClick={onClose}
                className="mt-3 inline-block font-mono-g text-[11px] font-medium text-[var(--accent-purple-soft)] hover:underline"
              >
                Discuss Architecture &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Column 4: TAGVERSE Product Ecosystem */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="border-b border-white/10 pb-2.5">
              <h4 className="font-mono-g text-[0.6875rem] uppercase tracking-[0.16em] text-white/40">
                TAGVERSE Product Ecosystem
              </h4>
            </div>
            <div className="mt-3 space-y-1.5">
              {FLAGSHIP_ECOSYSTEM_PRODUCTS.map((p) => (
                <Link
                  key={p.name}
                  href={p.href}
                  onClick={onClose}
                  className="group flex items-start justify-between rounded-xl p-2.5 transition-colors hover:bg-white/5"
                >
                  <div>
                    <div className="text-[13px] font-medium text-white/90 group-hover:text-white">
                      {p.name}
                    </div>
                    <div className="mt-0.5 line-clamp-1 text-[11px] text-white/50 group-hover:text-white/70">
                      {p.tagline}
                    </div>
                  </div>
                  <span
                    className={`ml-2 shrink-0 rounded px-1.5 py-0.5 text-[9px] font-mono-g ${
                      p.status === "live"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : p.status === "prototype"
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-purple-500/20 text-purple-300"
                    }`}
                  >
                    {p.status}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-4">
            <Link
              href="/products"
              onClick={onClose}
              className="flex items-center justify-between rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20"
            >
              <span>View All 5 Categories</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
