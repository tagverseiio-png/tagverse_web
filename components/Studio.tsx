"use client";

import { useState } from "react";
import Reveal from "./Reveal";

type Show = {
  id: string;
  title: string;
  guest: string;
  date: string;
  day: string;
  time: string;
  venue: string;
  price: number;
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
    price: 499,
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
    price: 499,
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
    price: 899,
    seatsLeft: 3,
    tag: "Special",
  },
];

export default function Studio() {
  const [selected, setSelected] = useState<string>(shows[0].id);
  const [qty, setQty] = useState(1);
  const [booked, setBooked] = useState<string | null>(null);

  const active = shows.find((s) => s.id === selected)!;
  const total = active.price * qty;

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
                      setBooked(null);
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
                      <div className="font-display text-xl font-light">
                        ₹{s.price}
                      </div>
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

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                <span className="text-sm text-white/70">Tickets</span>
                <div className="flex items-center gap-3">
                  <button
                    aria-label="Decrease"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-lg leading-none transition-colors hover:bg-white/10"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-medium tabular-nums">{qty}</span>
                  <button
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

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
                <span className="text-sm text-white/70">Total</span>
                <span className="font-display text-2xl font-light">₹{total}</span>
              </div>

              <button
                onClick={() => setBooked(active.id)}
                className="mt-6 w-full rounded-full bg-white py-3 text-sm font-medium text-black transition-transform hover:scale-[1.01]"
              >
                {booked === active.id ? "Booked ✓ — see you there" : "Book tickets"}
              </button>

              {booked === active.id && (
                <p className="mt-3 text-center text-[0.75rem] text-white/45">
                  Confirmation sent. Doors open 30 min before showtime.
                </p>
              )}
              <p className="mt-4 text-center text-[0.7rem] text-white/35">
                Free cancellation up to 24h before the show.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
