"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Reveal from "./Reveal";

const SERVICES = [
  { id: "podcast", label: "Podcast Production", icon: "🎙️", desc: "Multi-cam recording & mixing" },
  { id: "commercial", label: "Commercial Shoots", icon: "🎬", desc: "Product shoots & brand films" },
  { id: "live", label: "Live Sessions", icon: "📡", desc: "Webinars & live streams" },
  { id: "post", label: "Post-Production", icon: "✂️", desc: "Editing, color & VFX" },
];

const TIME_SLOTS = [
  { label: "9 AM – 12 PM", icon: "☀️", sub: "Morning" },
  { label: "1 PM – 4 PM", icon: "🌤️", sub: "Afternoon" },
  { label: "5 PM – 8 PM", icon: "🌙", sub: "Evening" },
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const inputClass =
  "w-full rounded-xl border border-black/15 bg-white text-black dark:border-white/10 dark:bg-white/5 dark:text-white placeholder-black/40 dark:placeholder-white/30 outline-none transition-all focus:border-[var(--accent-purple)] focus:ring-1 focus:ring-[var(--accent-purple)]/30";
const labelClass =
  "mb-2 block text-[0.7rem] font-medium uppercase tracking-wider text-black/60 dark:text-white/50";

type Status = "idle" | "submitting" | "success" | "error";

/* ── Calendar helper ── */
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
}

export default function Studio() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [calendarLink, setCalendarLink] = useState("");

  /* ── Calendar state ── */
  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());

  /* ── Availability state ── */
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  /* ── Fetch booked slots when date changes ── */
  const fetchAvailability = useCallback(async (selectedDate: string) => {
    if (!selectedDate) {
      setBookedSlots([]);
      return;
    }
    setLoadingAvailability(true);
    try {
      const snap = await getDocs(collection(db, "studioBookings"));
      const confirmed = snap.docs.filter((d) => {
        const data = d.data();
        return data.date === selectedDate && data.status === "confirmed";
      });
      const booked = confirmed.map((d) => d.data().time as string);
      setBookedSlots(booked);
    } catch {
      // If Firestore fails, allow all slots (fail open)
      setBookedSlots([]);
    } finally {
      setLoadingAvailability(false);
    }
  }, []);

  useEffect(() => {
    fetchAvailability(date);
  }, [date, fetchAvailability]);

  /* ── Build calendar grid ── */
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(calYear, calMonth);
    const firstDay = getFirstDayOfMonth(calYear, calMonth);
    const cells: { day: number; disabled: boolean; dateStr: string }[] = [];

    // padding cells before month starts
    for (let i = 0; i < firstDay; i++) {
      cells.push({ day: 0, disabled: true, dateStr: "" });
    }

    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    for (let d = 1; d <= daysInMonth; d++) {
      const dt = new Date(calYear, calMonth, d);
      const isSunday = dt.getDay() === 0;
      const isPast = dt < startOfToday;
      const iso = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({ day: d, disabled: isSunday || isPast, dateStr: iso });
    }
    return cells;
  }, [calYear, calMonth]);

  /* ── Availability check ── */
  function toggleService(id: string) {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function prevMonth() {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else {
      setCalMonth((m) => m - 1);
    }
  }
  function nextMonth() {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else {
      setCalMonth((m) => m + 1);
    }
  }

  /* ── Submit ── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !time || selectedServices.length === 0) return;

    setStatus("submitting");
    const serviceLabels = selectedServices
      .map((id) => SERVICES.find((s) => s.id === id)?.label)
      .filter(Boolean)
      .join(", ");

    try {
      // 1. Post to server API with double-booking prevention & calendar URL generation
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          date,
          time,
          services: selectedServices,
          notes: form.notes.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setStatus("error");
          setStatusMsg(data.error || "This time slot was just booked. Please pick another time.");
          setBookedSlots((prev) => [...prev, time]);
          setTime("");
          return;
        }
        throw new Error(data.error || "Server booking failed");
      }

      if (data.googleCalendarUrl) {
        setCalendarLink(data.googleCalendarUrl);
      }


      // Construct and trigger direct WhatsApp confirmation message
      const timeSlot = TIME_SLOTS.find((t) => t.label === time);
      const dateFormatted = new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const msg = [
        `🎬 *Studio Booking Request*`,
        ``,
        `*Date:* ${dateFormatted}`,
        `*Time:* ${time}${timeSlot ? ` (${timeSlot.sub})` : ""}`,
        `*Services:* ${serviceLabels}`,
        form.notes ? `*Notes:* ${form.notes}` : "",
        ``,
        `*Name:* ${form.name}`,
        `*Email:* ${form.email}`,
        form.phone ? `*Phone:* ${form.phone}` : "",
        ``,
        `Please confirm this booking. Thank you!`,
      ]
        .filter(Boolean)
        .join("%0A");
      window.open(`https://wa.me/919941968238?text=${msg}`, "_blank");

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setStatusMsg("Something went wrong while booking. Please try again or use WhatsApp directly.");
    }
  }

  /* ── Success view ── */
  if (status === "success") {
    return (
      <section id="studio" className="dark-adaptive bg-white text-black dark:bg-black dark:text-white pb-28 pt-4 transition-colors">
        <div className="container-x">
          <Reveal className="mx-auto max-w-lg text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/10">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h2 className="mt-6 font-display text-section-h2 font-light leading-[1.15] tracking-display">
              Booking request received
            </h2>
            <p className="mt-4 text-white/60">
              We&apos;ll review your request and confirm via WhatsApp or email within 24 hours.
              You&apos;ll receive a confirmation message shortly.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {calendarLink && (
                <a
                  href={calendarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Add to Google Calendar
                </a>
              )}
              <button
                onClick={() => {
                  setStatus("idle");
                  setStatusMsg("");
                  setDate("");
                  setTime("");
                  setSelectedServices([]);
                  setCalendarLink("");
                  setForm({ name: "", email: "", phone: "", notes: "" });
                }}
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Book another session
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  /* ── Main form ── */
  return (
    <section id="studio" className="dark-adaptive bg-white text-black dark:bg-black dark:text-white pb-28 pt-4 transition-colors">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-section-h2 font-light leading-[1.15] tracking-display">
            Book our studio
          </h2>
          <p className="mt-4 max-w-xl leading-7 text-white/60">
            Select a date, time slot, and the services you need. We&apos;ll confirm
            availability and get back to you within 24 hours.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-12 max-w-2xl rounded-[24px] border border-white/10 bg-white/[0.03] p-8"
          >
            {/* ══════ CALENDAR ══════ */}
            <div>
              <label className={labelClass}>Select Date</label>
              <div className="mt-2 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                {/* month nav */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={prevMonth}
                    className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <span className="font-brand text-sm font-medium tracking-tight">
                    {MONTHS[calMonth]} {calYear}
                  </span>
                  <button
                    type="button"
                    onClick={nextMonth}
                    className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>

                {/* weekday headers */}
                <div className="mt-3 grid grid-cols-7 gap-1">
                  {WEEKDAYS.map((w) => (
                    <div key={w} className="py-1 text-center text-[0.6rem] font-medium uppercase tracking-wider text-white/30">
                      {w}
                    </div>
                  ))}
                </div>

                {/* day cells */}
                <div className="mt-1 grid grid-cols-7 gap-1">
                  {calendarDays.map((cell, i) => {
                    if (cell.day === 0) return <div key={`empty-${i}`} />;
                    const isSelected = date === cell.dateStr;
                    return (
                      <button
                        key={cell.dateStr}
                        type="button"
                        disabled={cell.disabled}
                        onClick={() => setDate(cell.dateStr)}
                        className={`relative flex h-10 w-full items-center justify-center rounded-xl text-sm transition-all ${
                          cell.disabled
                            ? "cursor-not-allowed text-white/15"
                            : isSelected
                              ? "bg-[var(--accent-purple)] text-white font-medium shadow-[0_0_16px_-2px_var(--accent-purple)]"
                              : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {cell.day}
                      </button>
                    );
                  })}
                </div>
              </div>
              {date && (
                <p className="mt-2 text-xs text-white/40">
                  Selected:{" "}
                  <span className="text-white/70">
                    {new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </p>
              )}
            </div>

            {/* ══════ TIME SLOTS ══════ */}
            <div className="mt-8">
              <label className={labelClass}>Select Time Slot</label>
              {!date && (
                <p className="mt-2 text-xs text-white/30">Select a date first to see available slots</p>
              )}
              {date && loadingAvailability && (
                <p className="mt-2 text-xs text-white/40">Checking availability…</p>
              )}
              <div className="mt-2 grid grid-cols-3 gap-3">
                {TIME_SLOTS.map((t) => {
                  const isBooked = bookedSlots.includes(t.label);
                  const isSelected = time === t.label && !isBooked;
                  return (
                    <button
                      key={t.label}
                      type="button"
                      disabled={isBooked}
                      onClick={() => !isBooked && setTime(t.label)}
                      className={`group flex flex-col items-center rounded-2xl border px-4 py-5 transition-all ${
                        isBooked
                          ? "cursor-not-allowed border-white/5 bg-white/[0.01] opacity-40"
                          : isSelected
                            ? "border-[var(--accent-purple)] bg-[var(--accent-purple)]/15 shadow-[0_0_20px_-4px_var(--accent-purple)]"
                            : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]"
                      }`}
                    >
                      <span className="text-2xl">{isBooked ? "🔴" : t.icon}</span>
                      <span className={`mt-2 text-sm font-medium ${isBooked ? "text-white/30 line-through" : isSelected ? "text-white" : "text-white/70 group-hover:text-white/90"}`}>
                        {t.label}
                      </span>
                      <span className={`mt-1 text-[0.65rem] ${isBooked ? "text-red-400/60" : isSelected ? "text-white/60" : "text-white/30"}`}>
                        {isBooked ? "Already Booked" : t.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ══════ SERVICES ══════ */}
            <div className="mt-8">
              <label className={labelClass}>Select Services</label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {SERVICES.map((s) => {
                  const checked = selectedServices.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleService(s.id)}
                      className={`group flex flex-col items-start rounded-2xl border px-5 py-4 text-left transition-all ${
                        checked
                          ? "border-[var(--accent-purple)] bg-[var(--accent-purple)]/15 shadow-[0_0_20px_-4px_var(--accent-purple)]"
                          : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{s.icon}</span>
                        <span className={`text-sm font-medium ${checked ? "text-white" : "text-white/70 group-hover:text-white/90"}`}>
                          {s.label}
                        </span>
                      </div>
                      <span className={`mt-1 ml-[32px] text-[0.7rem] ${checked ? "text-white/50" : "text-white/25"}`}>
                        {s.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ══════ CONTACT FIELDS ══════ */}
            <div className="mt-10 space-y-4 border-t border-white/10 pt-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Name *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`${inputClass} mt-2`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`${inputClass} mt-2`}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Phone (optional)</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={`${inputClass} mt-2`}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className={labelClass}>Notes (optional)</label>
                  <input
                    type="text"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className={`${inputClass} mt-2`}
                    placeholder="Any specific requirements"
                  />
                </div>
              </div>
            </div>

            {/* ══════ ERROR ══════ */}
            {status === "error" && (
              <p className="mt-4 text-sm text-red-400">{statusMsg}</p>
            )}

            {/* ══════ SUBMIT ══════ */}
            <button
              type="submit"
              disabled={
                status === "submitting" ||
                !date ||
                !time ||
                selectedServices.length === 0
              }
              className="mt-8 w-full rounded-full bg-white py-3.5 text-sm font-medium text-black transition-all hover:scale-[1.01] hover:shadow-[0_0_30px_-4px_rgba(255,255,255,0.3)] disabled:opacity-40 disabled:hover:scale-100"
            >
              {status === "submitting"
                ? "Submitting…"
                : "Book via WhatsApp"}
            </button>

            <p className="mt-4 text-center text-[0.7rem] text-white/35">
              You&apos;ll be redirected to WhatsApp to send your booking request. We&apos;ll confirm within 24 hours.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
