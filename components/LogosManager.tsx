"use client";

import { useCallback, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Logo } from "@/lib/types";
import { approxKB, compressImage } from "@/lib/compressImage";

const inputClass =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--accent-purple)]";
const labelClass =
  "font-mono-g text-[0.65rem] uppercase tracking-[0.14em] text-muted-fg";

type FormState = {
  text: string;
  url: string;
  order: string;
  img: string;
};

const emptyForm: FormState = { text: "", url: "", order: "", img: "" };

export default function LogosManager() {
  const [logos, setLogos] = useState<Logo[] | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, "logos"));
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Logo);
      docs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      setLogos(docs);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load logos.");
      setLogos([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function startEdit(l: Logo) {
    setEditingId(l.id);
    setForm({
      text: l.text ?? "",
      url: l.url ?? "",
      order: l.order != null ? String(l.order) : "",
      img: l.img ?? "",
    });
    setMsg(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCompressing(true);
    setError(null);
    try {
      const dataUrl = await compressImage(file);
      setForm((f) => ({ ...f, img: dataUrl }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not process image.");
    } finally {
      setCompressing(false);
      e.target.value = "";
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.text.trim() && !form.img) {
      setError("Add a logo image or some text.");
      return;
    }
    setBusy(true);
    setError(null);
    setMsg(null);

    const payload: Record<string, unknown> = {
      text: form.text.trim(),
      url: form.url.trim(),
    };
    if (form.order.trim() !== "") payload.order = Number(form.order);
    if (form.img) payload.img = form.img;

    try {
      if (editingId) {
        await updateDoc(doc(db, "logos", editingId), payload);
        setMsg("Logo updated.");
      } else {
        await addDoc(collection(db, "logos"), payload);
        setMsg("Logo added.");
      }
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(l: Logo) {
    if (!window.confirm(`Delete "${l.text || "this logo"}"?`)) return;
    setBusy(true);
    setError(null);
    try {
      await deleteDoc(doc(db, "logos", l.id));
      if (editingId === l.id) resetForm();
      await load();
      setMsg("Logo deleted.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="text-sm text-muted-fg">
        The &ldquo;trusted by&rdquo; strip. Each logo can be an image or text,
        with an optional link. When empty, the default names are shown.
      </p>

      {(msg || error) && (
        <div
          className={`mt-5 rounded-lg border px-4 py-3 text-sm ${
            error
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-line bg-muted text-fg"
          }`}
        >
          {error ?? msg}
        </div>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        {/* ---- form ---- */}
        <form onSubmit={onSubmit} className="rounded-[20px] border border-line p-6">
          <h2 className="font-brand text-lg font-medium tracking-tight">
            {editingId ? "Edit logo" : "New logo"}
          </h2>

          <div className="mt-5 space-y-4">
            <div>
              <label className={labelClass}>Text</label>
              <input
                className={`${inputClass} mt-1.5`}
                value={form.text}
                onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                placeholder="Brand name (used when no image)"
              />
            </div>

            <div>
              <label className={labelClass}>Link URL</label>
              <input
                type="url"
                className={`${inputClass} mt-1.5`}
                value={form.url}
                onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                placeholder="https://brand.com"
              />
            </div>

            <div>
              <label className={labelClass}>Order</label>
              <input
                type="number"
                className={`${inputClass} mt-1.5`}
                value={form.order}
                onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))}
                placeholder="1"
              />
            </div>

            <div>
              <label className={labelClass}>Logo image (optional)</label>
              <div className="mt-1.5 flex items-center gap-4">
                <div className="grid h-16 w-28 shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-black p-2">
                  {form.img ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={form.img} alt="" className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-[0.65rem] text-white/40">No image</span>
                  )}
                </div>
                <div className="text-sm">
                  <label className="inline-flex cursor-pointer items-center rounded-full border border-line px-3 py-1.5 text-sm transition-colors hover:bg-muted">
                    {compressing ? "Compressing…" : "Choose image"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={onFile}
                      disabled={compressing}
                    />
                  </label>
                  {form.img && (
                    <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-fg">
                      <span>~{approxKB(form.img)} KB</span>
                      <button
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, img: "" }))}
                        className="underline hover:text-fg"
                      >
                        remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              disabled={busy || compressing}
              className="rounded-full px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: "var(--accent-purple)" }}
            >
              {busy ? "Saving…" : editingId ? "Save changes" : "Add logo"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* ---- list ---- */}
        <div>
          {logos === null ? (
            <p className="text-sm text-muted-fg">Loading…</p>
          ) : logos.length === 0 ? (
            <div className="rounded-[20px] border border-dashed border-line py-16 text-center text-sm text-muted-fg">
              No logos yet — the default names are showing on the site. Add your
              first one on the left.
            </div>
          ) : (
            <ul className="space-y-3">
              {logos.map((l) => (
                <li
                  key={l.id}
                  className={`flex items-center gap-4 rounded-2xl border p-3 transition-colors ${
                    editingId === l.id ? "border-[var(--accent-purple)]" : "border-line"
                  }`}
                >
                  <div className="grid h-12 w-20 shrink-0 place-items-center overflow-hidden rounded-lg bg-black p-1.5">
                    {l.img ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={l.img} alt="" className="max-h-full max-w-full object-contain" />
                    ) : (
                      <span className="truncate text-xs font-medium text-white/70">
                        {l.text || "—"}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-brand font-medium tracking-tight">
                      {l.text || (l.img ? "Image logo" : "—")}
                    </h3>
                    {l.url?.trim() && (
                      <p className="truncate text-xs text-[var(--accent-purple)]">
                        ↗ {l.url}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={() => startEdit(l)}
                      className="rounded-full border border-line px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(l)}
                      disabled={busy}
                      className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
