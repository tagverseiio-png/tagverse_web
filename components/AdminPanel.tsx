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
import type { Project } from "@/lib/types";
import { approxKB, compressImage } from "@/lib/compressImage";
import MediaManager from "./MediaManager";

const PASSCODE = process.env.NEXT_PUBLIC_ADMIN_PASSCODE;
const SESSION_KEY = "tv_admin_ok";

const inputClass =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--accent-purple)]";
const labelClass =
  "font-mono-g text-[0.65rem] uppercase tracking-[0.14em] text-muted-fg";

type FormState = {
  title: string;
  category: string;
  year: string;
  featured: boolean;
  order: string;
  img: string;
};

const emptyForm: FormState = {
  title: "",
  category: "",
  year: "",
  featured: false,
  order: "",
  img: "",
};

export default function AdminPanel() {
  const [unlocked, setUnlocked] = useState(false);
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") setUnlocked(true);
  }, []);

  function tryUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (PASSCODE && pass === PASSCODE) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setUnlocked(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  }

  if (!unlocked) {
    return (
      <div className="container-x flex min-h-[70vh] items-center justify-center">
        <form
          onSubmit={tryUnlock}
          className="w-full max-w-sm rounded-[20px] border border-line p-7"
        >
          <h1 className="font-brand text-xl font-medium tracking-tight">
            Admin access
          </h1>
          <p className="mt-1 text-sm text-muted-fg">
            Enter the passcode to manage portfolio projects.
          </p>
          <input
            type="password"
            autoFocus
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
              setPassError(false);
            }}
            placeholder="Passcode"
            className={`${inputClass} mt-5`}
          />
          {passError && (
            <p className="mt-2 text-sm text-red-600">Incorrect passcode.</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full rounded-full py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--accent-purple)" }}
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return <AdminShell />;
}

function AdminShell() {
  const [tab, setTab] = useState<"projects" | "media">("projects");

  return (
    <div>
      <div className="container-x">
        <div className="inline-flex gap-1 rounded-full border border-line p-1">
          <TabButton active={tab === "projects"} onClick={() => setTab("projects")}>
            Projects
          </TabButton>
          <TabButton active={tab === "media"} onClick={() => setTab("media")}>
            Home media
          </TabButton>
        </div>
      </div>
      <div className="mt-6">
        {tab === "projects" ? (
          <Dashboard />
        ) : (
          <div className="container-x">
            <h1 className="font-brand text-2xl font-medium tracking-tight">
              Home media
            </h1>
            <div className="mt-6">
              <MediaManager />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        active ? "bg-fg text-white" : "text-muted-fg hover:text-fg"
      }`}
    >
      {children}
    </button>
  );
}

function Dashboard() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, "projects"));
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Project);
      docs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      setProjects(docs);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load projects.");
      setProjects([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function startEdit(p: Project) {
    setEditingId(p.id);
    setForm({
      title: p.title ?? "",
      category: p.category ?? "",
      year: p.year ?? "",
      featured: !!p.featured,
      order: p.order != null ? String(p.order) : "",
      img: p.img ?? "",
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
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    setBusy(true);
    setError(null);
    setMsg(null);

    const payload: Record<string, unknown> = {
      title: form.title.trim(),
      category: form.category.trim(),
      year: form.year.trim(),
      featured: form.featured,
    };
    if (form.order.trim() !== "") payload.order = Number(form.order);
    if (form.img) payload.img = form.img;

    try {
      if (editingId) {
        await updateDoc(doc(db, "projects", editingId), payload);
        setMsg("Project updated.");
      } else {
        await addDoc(collection(db, "projects"), payload);
        setMsg("Project created.");
      }
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(p: Project) {
    if (!window.confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    setBusy(true);
    setError(null);
    try {
      await deleteDoc(doc(db, "projects", p.id));
      if (editingId === p.id) resetForm();
      await load();
      setMsg("Project deleted.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container-x">
      <div className="flex items-end justify-between border-b border-line pb-6">
        <div>
          <p className="font-mono-g text-[0.65rem] uppercase tracking-[0.16em] text-muted-fg">
            Portfolio admin
          </p>
          <h1 className="mt-2 font-brand text-2xl font-medium tracking-tight">
            Manage projects
          </h1>
        </div>
        <span className="font-mono-g text-sm text-muted-fg">
          {projects ? `${projects.length} item${projects.length === 1 ? "" : "s"}` : "…"}
        </span>
      </div>

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
            {editingId ? "Edit project" : "New project"}
          </h2>

          <div className="mt-5 space-y-4">
            <div>
              <label className={labelClass}>Title *</label>
              <input
                className={`${inputClass} mt-1.5`}
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Aurora Rebrand"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Category</label>
                <input
                  className={`${inputClass} mt-1.5`}
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  placeholder="Brand identity"
                />
              </div>
              <div>
                <label className={labelClass}>Year</label>
                <input
                  className={`${inputClass} mt-1.5`}
                  value={form.year}
                  onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                  placeholder="2026"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
              <label className="flex items-end gap-2 pb-2.5">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, featured: e.target.checked }))
                  }
                  className="h-4 w-4 accent-[var(--accent-purple)]"
                />
                <span className="text-sm">Featured (wide)</span>
              </label>
            </div>

            <div>
              <label className={labelClass}>Image</label>
              <div className="mt-1.5 flex items-center gap-4">
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-line bg-muted">
                  {form.img ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={form.img}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="grid h-full w-full place-items-center text-[0.65rem] text-muted-fg">
                      No image
                    </span>
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
              {busy ? "Saving…" : editingId ? "Save changes" : "Create project"}
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
          {projects === null ? (
            <p className="text-sm text-muted-fg">Loading…</p>
          ) : projects.length === 0 ? (
            <div className="rounded-[20px] border border-dashed border-line py-16 text-center text-sm text-muted-fg">
              No projects yet. Create your first one on the left.
            </div>
          ) : (
            <ul className="space-y-3">
              {projects.map((p) => (
                <li
                  key={p.id}
                  className={`flex items-center gap-4 rounded-2xl border p-3 transition-colors ${
                    editingId === p.id ? "border-[var(--accent-purple)]" : "border-line"
                  }`}
                >
                  <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {p.img && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={p.img} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-brand font-medium tracking-tight">
                        {p.title}
                      </h3>
                      {p.featured && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                          style={{
                            background: "var(--accent-purple-muted)",
                            color: "var(--accent-purple)",
                          }}
                        >
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="truncate text-sm text-muted-fg">
                      {[p.category, p.year].filter(Boolean).join(" · ") || "—"}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={() => startEdit(p)}
                      className="rounded-full border border-line px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(p)}
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
