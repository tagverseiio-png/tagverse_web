"use client";

import { useCallback, useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MEDIA_SLOTS, type MediaSlot } from "@/lib/mediaSlots";
import { approxKB, compressImage } from "@/lib/compressImage";

export default function MediaManager() {
  const [overrides, setOverrides] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, "media"));
      const map: Record<string, string> = {};
      snap.forEach((d) => {
        const url = (d.data() as { url?: string }).url;
        if (url) map[d.id] = url;
      });
      setOverrides(map);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load media.");
      setOverrides({});
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (overrides === null) {
    return <p className="text-sm text-muted-fg">Loading media…</p>;
  }

  const sections = Array.from(new Set(MEDIA_SLOTS.map((s) => s.section)));

  return (
    <div>
      <p className="text-sm text-muted-fg">
        Replace any image or video used across the home page. Changes go live
        immediately; reset returns a slot to the bundled default.
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
              {MEDIA_SLOTS.filter((s) => s.section === section).map((slot) => (
                <MediaRow
                  key={slot.key}
                  slot={slot}
                  savedUrl={overrides[slot.key]}
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

function MediaRow({
  slot,
  savedUrl,
  onSaved,
}: {
  slot: MediaSlot;
  savedUrl?: string;
  onSaved: () => void;
}) {
  const isCustom = !!savedUrl;
  const effective = savedUrl ?? slot.default;

  // pending image data URL (images) or text input (videos)
  const [draftImg, setDraftImg] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState(
    slot.type === "video" && isCustom ? savedUrl! : "",
  );
  const [busy, setBusy] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const preview =
    slot.type === "image"
      ? (draftImg ?? effective)
      : (videoUrl.trim() || effective);

  const dirty =
    slot.type === "image"
      ? draftImg !== null
      : videoUrl.trim() !== "" && videoUrl.trim() !== savedUrl;

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCompressing(true);
    setErr(null);
    try {
      setDraftImg(await compressImage(file));
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Could not process image.");
    } finally {
      setCompressing(false);
      e.target.value = "";
    }
  }

  async function save() {
    const value = slot.type === "image" ? draftImg : videoUrl.trim();
    if (!value) return;
    setBusy(true);
    setErr(null);
    try {
      await setDoc(doc(db, "media", slot.key), { url: value, type: slot.type });
      setDraftImg(null);
      onSaved();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    setBusy(true);
    setErr(null);
    try {
      await deleteDoc(doc(db, "media", slot.key));
      setDraftImg(null);
      setVideoUrl("");
      onSaved();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Reset failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line p-4 sm:flex-row sm:items-center">
      {/* preview */}
      <div className="h-20 w-32 shrink-0 overflow-hidden rounded-lg border border-line bg-muted">
        {slot.type === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="h-full w-full object-cover" />
        ) : (
          <video
            key={preview}
            src={preview}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            autoPlay
          />
        )}
      </div>

      {/* meta + controls */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4 className="truncate text-sm font-medium">{slot.label}</h4>
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
          <span className="font-mono-g text-[0.65rem] uppercase tracking-wider text-muted-fg">
            {slot.type}
          </span>
        </div>

        {slot.type === "image" ? (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <label className="inline-flex cursor-pointer items-center rounded-full border border-line px-3 py-1.5 text-xs transition-colors hover:bg-muted">
              {compressing ? "Compressing…" : "Choose image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFile}
                disabled={compressing}
              />
            </label>
            {draftImg && (
              <span className="text-xs text-muted-fg">~{approxKB(draftImg)} KB ready</span>
            )}
          </div>
        ) : (
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://…/video.mp4 (or Storage URL)"
            className="mt-2 w-full rounded-lg border border-line bg-white px-3 py-1.5 text-xs outline-none focus:border-[var(--accent-purple)]"
          />
        )}

        {err && <p className="mt-1.5 text-xs text-red-600">{err}</p>}
      </div>

      {/* actions */}
      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={save}
          disabled={!dirty || busy || compressing}
          className="rounded-full px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          style={{ background: "var(--accent-purple)" }}
        >
          {busy ? "…" : "Save"}
        </button>
        <button
          onClick={reset}
          disabled={!isCustom || busy}
          className="rounded-full border border-line px-4 py-1.5 text-xs font-medium transition-colors hover:bg-muted disabled:opacity-40"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
