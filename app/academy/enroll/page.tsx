"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import AcademySecondaryNav from "@/components/academy/AcademySecondaryNav";
import { ACADEMY_COURSES } from "@/lib/academyCoursesData";

export default function AcademyEnrollPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "Generative AI & Agentic AI",
    background: "Software Engineer / Developer",
    experienceLevel: "Intermediate",
    preferredMode: "Live Weekend Cohort",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      service: `Academy Enrolment: ${form.course}`,
      budget: "Academy Tuition",
      message: `Background: ${form.background} | Experience: ${form.experienceLevel} | Mode: ${form.preferredMode} | Notes: ${form.message}`,
      source: "academy_enrolment_page",
    };

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="academy-theme dark-adaptive min-h-screen bg-[#fcfcfd] text-[#0f172a] dark:bg-black dark:text-white selection:bg-purple-500/20 pb-24 transition-colors duration-200">
      <AcademySecondaryNav />

      <div className="container-x pt-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Academy", href: "/academy" },
            { label: "Enrolment Application" },
          ]}
        />
      </div>

      <section className="py-12 sm:py-16">
        <div className="container-x max-w-3xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 font-mono-g text-[11px] uppercase tracking-wider text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Step 1 of 2 &bull; Application &amp; Eligibility Review</span>
            </div>
            <h1 className="mt-4 font-brand text-3xl sm:text-4xl font-medium tracking-tight text-white">
              TAGVERSE Academy Enrolment Application
            </h1>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Submit your candidate background and course selection. Our admissions team evaluates prerequisites, confirms seat availability, and schedules your orientation interview.
            </p>
          </div>

          <div className="mt-10 rounded-[28px] border border-white/15 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
            {status === "success" ? (
              <div className="text-center py-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-2xl font-bold">
                  ✓
                </div>
                <h2 className="mt-5 font-brand text-2xl font-medium text-white">
                  Application Received!
                </h2>
                <p className="mt-3 text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                  Thank you for applying to <strong>{form.course}</strong>. Our admissions committee will review your background and reach out via WhatsApp/email with your orientation schedule.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <Link
                    href="/academy/courses"
                    className="rounded-full bg-white px-6 py-2.5 font-brand text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-white/90"
                  >
                    Explore Other Courses
                  </Link>
                  <Link
                    href="/academy"
                    className="rounded-full border border-white/20 bg-white/5 px-6 py-2.5 font-brand text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10"
                  >
                    Academy Overview
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-mono-g uppercase tracking-wider text-white/50 mb-2">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs sm:text-sm text-white placeholder-white/30 outline-none focus:border-[var(--accent-purple-soft)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono-g uppercase tracking-wider text-white/50 mb-2">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs sm:text-sm text-white placeholder-white/30 outline-none focus:border-[var(--accent-purple-soft)]"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-mono-g uppercase tracking-wider text-white/50 mb-2">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs sm:text-sm text-white placeholder-white/30 outline-none focus:border-[var(--accent-purple-soft)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono-g uppercase tracking-wider text-white/50 mb-2">
                      Course Interested In *
                    </label>
                    <select
                      value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#161616] px-4 py-3 text-xs sm:text-sm text-white outline-none focus:border-[var(--accent-purple-soft)]"
                    >
                      {ACADEMY_COURSES.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title} ({c.priceDisplay})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <label className="block text-[11px] font-mono-g uppercase tracking-wider text-white/50 mb-2">
                      Current Background
                    </label>
                    <select
                      value={form.background}
                      onChange={(e) => setForm({ ...form, background: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#161616] px-3.5 py-3 text-xs text-white outline-none focus:border-[var(--accent-purple-soft)]"
                    >
                      <option value="Software Engineer / Developer">Software Engineer</option>
                      <option value="College / University Student">Student</option>
                      <option value="Founder / Agency Owner">Founder / Operator</option>
                      <option value="Product Manager / Designer">Product / Design</option>
                      <option value="Career Transitioner">Career Transition</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-g uppercase tracking-wider text-white/50 mb-2">
                      Experience Level
                    </label>
                    <select
                      value={form.experienceLevel}
                      onChange={(e) => setForm({ ...form, experienceLevel: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#161616] px-3.5 py-3 text-xs text-white outline-none focus:border-[var(--accent-purple-soft)]"
                    >
                      <option value="Complete Beginner">Complete Beginner</option>
                      <option value="Intermediate">Intermediate (Familiar with code)</option>
                      <option value="Advanced Practitioner">Advanced Practitioner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-g uppercase tracking-wider text-white/50 mb-2">
                      Preferred Mode
                    </label>
                    <select
                      value={form.preferredMode}
                      onChange={(e) => setForm({ ...form, preferredMode: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#161616] px-3.5 py-3 text-xs text-white outline-none focus:border-[var(--accent-purple-soft)]"
                    >
                      <option value="Live Weekend Cohort">Live Weekend Cohort</option>
                      <option value="Self-Paced with Labs">Self-Paced with Labs</option>
                      <option value="Corporate Team Batch">Corporate Team Batch</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-g uppercase tracking-wider text-white/50 mb-2">
                    Questions or Specific Goals (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about what you want to build or any specific questions about the syllabus..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs sm:text-sm text-white placeholder-white/30 outline-none focus:border-[var(--accent-purple-soft)] resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">
                    Submission encountered a network error. Please verify your connection or contact our team directly via WhatsApp.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-full bg-white py-4 font-brand text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-white/90 disabled:opacity-50 shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                >
                  {status === "submitting" ? "Submitting Application..." : "Submit Enrolment Application"}
                </button>

                <p className="text-center font-mono-g text-[11px] text-white/40">
                  * Submission does not automatically charge your card. Our team reviews prerequisite qualifications before final admission.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
