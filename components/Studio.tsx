"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Reveal from "./Reveal";

type Show = {
  id: string;
  title: string;
  guest: string;
  date: string;
  day: string;
  time: string;
  venue: string;
  seatsLeft: number;
  tag: string;
};

const shows: Show[] = [
  {
    id: "ep-114",
    title: "Building in Public",
    guest: "with Aarav Mehta",
    date: "Jul 12",
    day: "Fri",
    time: "7:00 PM",
    venue: "Tagverse Studio · Floor 3",
    seatsLeft: 8,
    tag: "Live recording",
  },
  {
    id: "ep-115",
    title: "The Creator Economy",
    guest: "with Diya Krishnan",
    date: "Jul 19",
    day: "Fri",
    time: "7:00 PM",
    venue: "Tagverse Studio · Floor 3",
    seatsLeft: 21,
    tag: "Live recording",
  },
  {
    id: "ep-116",
    title: "Founders After Dark",
    guest: "with Kabir & Sana",
    date: "Jul 26",
    day: "Fri",
    time: "8:30 PM",
    venue: "Rooftop · Sold in pairs",
    seatsLeft: 3,
    tag: "Special",
  },
];

export default function Studio() {
  const [selected, setSelected] = useState<string>(shows[0].id);
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const active = shows.find((s) => s.id === selected)!;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await addDoc(collection(db, "studioBookings"), {
        showId: active.id,
        showTitle: active.title,
        ...form,
        qty,
        createdAt: new Date().toISOString(),
      });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <section id="studio" className="bg-black pb-28 pt-4 text-white">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-section-h2 font-light leading-[1.15] tracking-display">
            Upcoming live recordings
          </h2>
          <p className="mt-4 max-w-xl leading-7 text-white/60">
            Be in the room for our live recordings. Limited seats, real
            conversations, and an after-show with the guest.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* show list */}
          <div className="flex flex-col gap-4">
            {shows.map((s, i) => {
              const isSel = s.id === selected;
              return (
                <Reveal key={s.id} delay={i * 80}>
                  <button
                    onClick={() => {
                      setSelected(s.id);
                      setQty(1);
                      setStatus("idle");
                    }}
                    className={`flex w-full items-center gap-5 rounded-[20px] border p-5 text-left transition-colors ${
                      isSel
                        ? "border-white/40 bg-white/[0.06]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/25"
                    }`}
                  >
                    {/* date chip */}
                    <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-center">
                      <span className="font-mono-g text-[0.65rem] uppercase tracking-wider text-white/50">
                        {s.date.split(" ")[0]}
                      </span>
                      <span className="font-display text-2xl font-light leading-none">
                        {s.date.split(" ")[1]}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-[var(--accent-violet)]/20 px-2.5 py-0.5 text-[11px] font-medium text-[var(--accent-violet)]">
                          {s.tag}
                        </span>
                        <span className="font-mono-g text-[0.7rem] text-white/40">
                          {s.day} · {s.time}
                        </span>
                      </div>
                      <h3 className="mt-2 font-brand text-lg font-medium tracking-tight">
                        {s.title}
                      </h3>
                      <p className="text-sm text-white/55">
                        {s.guest} · {s.venue}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <div
                        className={`mt-1 text-[0.7rem] ${
                          s.seatsLeft <= 5 ? "text-[var(--accent-orange)]" : "text-white/40"
                        }`}
                      >
                        {s.seatsLeft} seats left
                      </div>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* booking panel */}
          <Reveal delay={120}>
            <div className="sticky top-24 rounded-[20px] border border-white/10 bg-white/[0.03] p-7">
              <p className="font-mono-g text-[0.7rem] uppercase tracking-[0.16em] text-white/40">
                Your booking
              </p>
              <h3 className="mt-3 font-brand text-xl font-medium tracking-tight">
                {active.title}
              </h3>
              <p className="text-sm text-white/55">
                {active.day}, {active.date} · {active.time}
              </p>

              {status === "success" ? (
                <div className="mt-8 py-8 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white/10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  </div>
                  <h4 className="mt-4 font-brand text-lg font-medium tracking-tight">Request received</h4>
                  <p className="mt-2 text-sm text-white/60">We&apos;ll be in touch shortly to confirm your seats.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between pb-6">
                    <span className="text-sm text-white/70">Tickets</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label="Decrease"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-lg leading-none transition-colors hover:bg-white/10"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-medium tabular-nums">{qty}</span>
                      <button
                        type="button"
                        aria-label="Increase"
                        onClick={() =>
                          setQty((q) => Math.min(active.seatsLeft, q + 1))
                        }
                        className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-lg leading-none transition-colors hover:bg-white/10"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-wider text-white/50">
                        Name
                      </label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-white/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-wider text-white/50">
                        Email
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-white/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-wider text-white/50">
                        Phone (optional)
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-white/30"
                      />
                    </div>
                  </div>

                  {status === "error" && (
                    <p className="mt-4 text-sm text-red-400">
                      Failed to submit. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-6 w-full rounded-full bg-white py-3 text-sm font-medium text-black transition-transform hover:scale-[1.01] disabled:opacity-50"
                  >
                    {status === "submitting" ? "Submitting…" : "Request tickets"}
                  </button>

                  <p className="mt-4 text-center text-[0.7rem] text-white/35">
                    No payment required now. We will confirm availability via email.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
