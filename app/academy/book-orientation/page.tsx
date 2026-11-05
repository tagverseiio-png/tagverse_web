"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import AcademySecondaryNav from "@/components/academy/AcademySecondaryNav";
import { ACADEMY_COURSES } from "@/lib/academyCoursesData";
import { ACADEMY_EVENTS } from "@/lib/academyEcosystemData";

export default function BookOrientationPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "Generative AI & Agentic AI",
    slot: "Saturday, 11:00 AM IST (Live Zoom / Meet)",
    customTime: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      service: `Academy Orientation: ${form.course}`,
      budget: "Orientation Request",
      message: `Preferred Slot: ${form.slot} | Notes: ${form.customTime}`,
      source: "academy_orientation_booking_page",
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
            { label: "Book Free Orientation" },
          ]}
        />
      </div>

      <section className="py-12 sm:py-16">
        <div className="container-x max-w-3xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-purple-soft)]/30 bg-[var(--accent-purple-soft)]/10 px-3.5 py-1 font-mono-g text-[11px] uppercase tracking-wider text-[var(--accent-purple-soft)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-purple-soft)] animate-pulse" />
              <span>Free 45-Min Virtual Orientation</span>
            </div>
            <h1 className="mt-4 font-brand text-3xl sm:text-4xl font-medium tracking-tight text-white">
              Experience the Learning Approach Before You Enrol.
            </h1>
            <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-xl mx-auto">
              Join our engineering mentors for a live walkthrough of the curriculum, sample project codebases, and student portfolio outcomes. Ask any questions before you decide.
            </p>
          </div>

          <div className="mt-10 rounded-[28px] border border-white/15 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
            {status === "success" ? (
              <div className="text-center py-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-2xl font-bold">
                  ✓
                </div>
                <h2 className="mt-5 font-brand text-2xl font-medium text-white">
                  Orientation Request Confirmed!
                </h2>
                <p className="mt-3 text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                  We have received your request for <strong>{form.course}</strong> ({form.slot}). An orientation meeting link and calendar invite will be sent to <strong>{form.email}</strong>.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <Link
                    href="/academy/courses"
                    className="rounded-full bg-white px-6 py-2.5 font-brand text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-white/90"
                  >
                    View All Courses
                  </Link>
                  <Link
                    href="/academy"
                    className="rounded-full border border-white/20 bg-white/5 px-6 py-2.5 font-brand text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10"
                  >
                    Back to Academy
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
                      placeholder="e.g. Priya Sundaram"
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
                      placeholder="e.g. priya@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs sm:text-sm text-white placeholder-white/30 outline-none focus:border-[var(--accent-purple-soft)]"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-mono-g uppercase tracking-wider text-white/50 mb-2">
                      WhatsApp / Phone Number *
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
                      Course to Explore *
                    </label>
                    <select
                      value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#161616] px-4 py-3 text-xs sm:text-sm text-white outline-none focus:border-[var(--accent-purple-soft)]"
                    >
                      {ACADEMY_COURSES.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-g uppercase tracking-wider text-white/50 mb-2">
                    Select an Upcoming Orientation Slot
                  </label>
                  <select
                    value={form.slot}
                    onChange={(e) => setForm({ ...form, slot: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#161616] px-4 py-3 text-xs sm:text-sm text-white outline-none focus:border-[var(--accent-purple-soft)]"
                  >
                    <option value="Saturday, 11:00 AM IST (Live Zoom / Meet)">Saturday, 11:00 AM IST (Live Google Meet)</option>
                    <option value="Sunday, 4:00 PM IST (Live Zoom / Meet)">Sunday, 4:00 PM IST (Live Google Meet)</option>
                    <option value="Wednesday, 7:00 PM IST (Live Zoom / Meet)">Wednesday, 7:00 PM IST (Live Google Meet)</option>
                    <option value="Request 1-on-1 Call at Custom Time">Request 1-on-1 Call at Custom Time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-g uppercase tracking-wider text-white/50 mb-2">
                    Topics you want us to cover (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. I want to understand if my Python level is enough for Agentic AI..."
                    value={form.customTime}
                    onChange={(e) => setForm({ ...form, customTime: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs sm:text-sm text-white placeholder-white/30 outline-none focus:border-[var(--accent-purple-soft)] resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">
                    Submission error. Please check your network or message us on WhatsApp.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-full bg-white py-4 font-brand text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-white/90 disabled:opacity-50 shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                >
                  {status === "submitting" ? "Reserving Orientation Slot..." : "Confirm Orientation Slot"}
                </button>

                <p className="text-center font-mono-g text-[11px] text-white/40">
                  * 100% Free. No commitment or upfront payment required to attend.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
