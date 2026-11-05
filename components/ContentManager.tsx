"use client";

import { useCallback, useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CONTENT_SLOTS, type ContentSlot } from "@/lib/contentSlots";

export default function ContentManager() {
  const [overrides, setOverrides] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, "content"));
      const map: Record<string, string> = {};
      snap.forEach((d) => {
        const value = (d.data() as { value?: string }).value;
        if (typeof value === "string") map[d.id] = value;
      });
      setOverrides(map);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load content.");
      setOverrides({});
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (overrides === null) {
    return <p className="text-sm text-muted-fg">Loading content…</p>;
  }

  const sections = Array.from(new Set(CONTENT_SLOTS.map((s) => s.section)));

  return (
    <div>
      <p className="text-sm text-muted-fg">
        Edit any text on the home page. Changes go live immediately; reset
        returns a field to the original copy.
      </p>
      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-8 space-y-10">
        {sections.map((section) => (
          <div key={section}>
            <h3 className="font-mono-g text-[0.7rem] uppercase tracking-[0.16em] text-muted-fg">
              {section}
            </h3>
            <div className="mt-4 space-y-3">
              {CONTENT_SLOTS.filter((s) => s.section === section).map((slot) => (
                <ContentRow
                  key={slot.key}
                  slot={slot}
                  savedValue={overrides[slot.key]}
                  onSaved={load}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentRow({
  slot,
  savedValue,
  onSaved,
}: {
  slot: ContentSlot;
  savedValue?: string;
  onSaved: () => void;
}) {
  const isCustom = savedValue !== undefined;
  const effective = savedValue ?? slot.default;

  const [value, setValue] = useState(effective);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // keep local field in sync when the saved value changes after a reload
  useEffect(() => {
    setValue(effective);
  }, [effective]);

  const dirty = value !== effective;

  async function save() {
    setBusy(true);
    setErr(null);
    try {
      await setDoc(doc(db, "content", slot.key), { value });
      onSaved();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    setBusy(true);
    setErr(null);
    try {
      await deleteDoc(doc(db, "content", slot.key));
      setValue(slot.default);
      onSaved();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Reset failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-line p-4">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">{slot.label}</label>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-medium"
          style={
            isCustom
              ? { background: "var(--accent-purple-muted)", color: "var(--accent-purple)" }
              : { background: "var(--muted)", color: "var(--muted-fg)" }
          }
        >
          {isCustom ? "Custom" : "Default"}
        </span>
      </div>

      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-start">
        {slot.multiline ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={3}
            className="w-full resize-y rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-[var(--accent-purple)]"
          />
        ) : (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-[var(--accent-purple)]"
          />
        )}

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={save}
            disabled={!dirty || busy}
            className="rounded-full px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
            style={{ background: "var(--accent-purple)" }}
          >
            {busy ? "…" : "Save"}
          </button>
          <button
            onClick={reset}
            disabled={!isCustom || busy}
            className="rounded-full border border-line px-4 py-2 text-xs font-medium transition-colors hover:bg-muted disabled:opacity-40"
          >
            Reset
          </button>
        </div>
      </div>

      {err && <p className="mt-1.5 text-xs text-red-600">{err}</p>}
    </div>
  );
}
