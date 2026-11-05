"use client";

import { useState } from "react";
import { VYRA_PRICING_PLANS, PricingPlan } from "@/lib/vyraPricingData";
import { useContactModal } from "@/components/ContactModal";

export default function VyraPricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const { open } = useContactModal();

  return (
    <section id="pricing" className="relative scroll-mt-24 py-24 border-t border-white/10 bg-black">
      <div className="container-x">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono-g text-[11px] uppercase tracking-wider text-white/80 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Transparent, Predictable Pricing</span>
          </div>
          <h2 className="mt-4 font-brand text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white">
            Start with a 30-Day Free Trial. Upgrade as You Scale.
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/60">
            Unrestricted access to all modules for 30 days. No credit card required to begin. Seamlessly scale from small boutique squads to enterprise operations.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-full px-5 py-2 font-mono-g text-xs font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-white text-black shadow-md"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 font-mono-g text-xs font-medium transition-all ${
                billingCycle === "annual"
                  ? "bg-white text-black shadow-md"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-400 font-semibold border border-emerald-500/30">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VYRA_PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              billingCycle={billingCycle}
              onSelect={() =>
                open(
                  plan.id === "enterprise"
                    ? "VYRA CRM - Enterprise Sales"
                    : `VYRA CRM - 30-Day Free Trial (${plan.name} Plan)`
                )
              }
            />
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-14 mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-white/70">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>30-Day Unrestricted Free Trial</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                <circle cx="12" cy="12" r="10" />
                <path d="m4.93 4.93 4.24 4.24" />
                <path d="m14.83 9.17 4.24-4.24" />
                <path d="m14.83 14.83 4.24 4.24" />
                <path d="m9.17 14.83-4.24 4.24" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              <span>Free Guided Migration & Onboarding</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  billingCycle,
  onSelect,
}: {
  plan: PricingPlan;
  billingCycle: "monthly" | "annual";
  onSelect: () => void;
}) {
  const price =
    plan.monthlyPrice === null
      ? "Custom"
      : billingCycle === "annual"
      ? `${plan.currency}${plan.annualPrice?.toLocaleString()}`
      : `${plan.currency}${plan.monthlyPrice?.toLocaleString()}`;

  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden rounded-[24px] border p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 ${
        plan.popular
          ? "border-[var(--accent-purple-soft)] bg-gradient-to-b from-[var(--accent-purple-soft)]/[0.12] via-white/[0.04] to-transparent shadow-[0_0_40px_rgba(168,85,247,0.15)]"
          : "border-white/10 bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent hover:border-white/20"
      }`}
    >
      {/* Popular Badge */}
      {plan.badge && (
        <div className="absolute top-4 right-4">
          <span
            className={`rounded-full px-2.5 py-0.5 font-mono-g text-[10px] font-semibold uppercase tracking-wider ${
              plan.popular
                ? "bg-[var(--accent-purple-soft)] text-black font-bold"
                : "border border-white/20 bg-white/10 text-white"
            }`}
          >
            {plan.badge}
          </span>
        </div>
      )}

      <div>
        {/* Trial Pill */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono-g text-[10px] text-emerald-400">
          <span className="h-1 w-1 rounded-full bg-emerald-400" />
          <span>{plan.trialDays}-Day Free Trial Included</span>
        </div>

        {/* Plan Name & Tagline */}
        <h3 className="mt-4 font-brand text-xl font-medium text-white">{plan.name}</h3>
        <p className="mt-1 text-xs text-white/60 leading-snug">{plan.tagline}</p>

        {/* Price Display */}
        <div className="mt-5 border-t border-white/10 pt-5">
          <div className="flex items-baseline gap-1">
            <span className="font-brand text-3xl font-bold tracking-tight text-white">
              {price}
            </span>
            {plan.monthlyPrice !== null && (
              <span className="font-mono-g text-xs text-white/50">/ month</span>
            )}
          </div>
          {billingCycle === "annual" && plan.monthlyPrice !== null && (
            <div className="mt-1 font-mono-g text-[10px] text-emerald-400">
              Billed annually (Save ₹{((plan.monthlyPrice - (plan.annualPrice || 0)) * 12).toLocaleString()}/yr)
            </div>
          )}
        </div>

        {/* Target Audience */}
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-mono-g text-white/70">
          {plan.targetAudience}
        </div>

        {/* Limits Specs */}
        <div className="mt-5 space-y-1.5 border-t border-white/10 pt-4 text-xs text-white/70">
          <div className="flex justify-between">
            <span className="text-white/40">Users:</span>
            <span className="font-medium text-white">{plan.limits.users}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">Contacts:</span>
            <span className="font-medium text-white">{plan.limits.contacts}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">WhatsApp:</span>
            <span className="font-medium text-white">{plan.limits.whatsappNumbers}</span>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="mt-6 border-t border-white/10 pt-4">
          <div className="font-mono-g text-[10px] uppercase tracking-wider text-white/40">
            Included Capabilities
          </div>
          <ul className="mt-2.5 space-y-2 text-xs text-white/75">
            {plan.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5 shrink-0 text-emerald-400">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="leading-snug">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action CTA Button */}
      <div className="mt-8 border-t border-white/10 pt-5">
        <button
          type="button"
          onClick={onSelect}
          className={`w-full rounded-full py-3 text-center font-brand text-xs font-semibold uppercase tracking-wider transition-all ${
            plan.popular
              ? "bg-white text-black hover:bg-white/90 shadow-[0_0_25px_rgba(255,255,255,0.3)]"
              : "border border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
          }`}
        >
          {plan.ctaText}
        </button>
      </div>
    </div>
  );
}
