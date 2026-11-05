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
import type { Project, Enquiry, StudioBooking, StudioShow, PortfolioCategory } from "@/lib/types";
import { approxKB, compressImage } from "@/lib/compressImage";
import { PORTFOLIO_CATEGORIES } from "@/lib/defaultData";
import MediaManager from "./MediaManager";

const TIME_SLOTS = [
  { label: "9 AM – 12 PM", icon: "☀️", sub: "Morning" },
  { label: "1 PM – 4 PM", icon: "🌤️", sub: "Afternoon" },
  { label: "5 PM – 8 PM", icon: "🌙", sub: "Evening" },
];
import ContentManager from "./ContentManager";
import LogosManager from "./LogosManager";
import AdminDashboard from "./AdminDashboard";
import ProductsManager from "./ProductsManager";
import CRMManager from "./CRMManager";
import AdminSettings from "./AdminSettings";

const PASSCODE = process.env.NEXT_PUBLIC_ADMIN_PASSCODE;
const SESSION_KEY = "tv_admin_ok";

const inputClass =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--accent-purple)]";
const labelClass =
  "font-mono-g text-[0.65rem] uppercase tracking-[0.14em] text-muted-fg";

type FormState = {
  title: string;
  slug: string;
  category: string;
  categories: string[];
  year: string;
  client: string;
  summary: string;
  services: string;
  technologies: string;
  url: string;
  liveUrl: string;
  iframeUrl: string;
  featured: boolean;
  published: boolean;
  order: string;
  img: string;
  challenge: string;
  solution: string;
  outcome: string;
};

const emptyForm: FormState = {
  title: "",
  slug: "",
  category: "",
  categories: [],
  year: "",
  client: "",
  summary: "",
  services: "",
  technologies: "",
  url: "",
  liveUrl: "",
  iframeUrl: "",
  featured: false,
  published: true,
  order: "",
  img: "",
  challenge: "",
  solution: "",
  outcome: "",
};

export default function AdminPanel() {
  const [unlocked, setUnlocked] = useState(false);
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") setUnlocked(true);
  }, []);

  async function tryUnlock(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: pass }),
      });
      if (res.ok) {
        sessionStorage.setItem(SESSION_KEY, "1");
        setUnlocked(true);
        setPassError(false);
        return;
      }
    } catch {
      // Fallback
    }

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
            Enter the passcode to manage portfolio, CRM, and studio bookings.
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
  const [tab, setTab] = useState<
    | "dashboard"
    | "crm"
    | "products"
    | "projects"
    | "studioBookings"
    | "logos"
    | "content"
    | "media"
    | "studioShows"
    | "settings"
  >("dashboard");

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    sessionStorage.removeItem(SESSION_KEY);
    window.location.reload();
  }

  return (
    <div>
      <div className="container-x">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4">
          <div className="inline-flex flex-wrap gap-1 rounded-full border border-line p-1">
            <TabButton active={tab === "dashboard"} onClick={() => setTab("dashboard")}>
              Dashboard
            </TabButton>
            <TabButton active={tab === "crm"} onClick={() => setTab("crm")}>
              CRM & Leads
            </TabButton>
            <TabButton active={tab === "products"} onClick={() => setTab("products")}>
              Products & Solutions
            </TabButton>
            <TabButton active={tab === "projects"} onClick={() => setTab("projects")}>
              Portfolio
            </TabButton>
            <TabButton active={tab === "studioBookings"} onClick={() => setTab("studioBookings")}>
              Studio Bookings
            </TabButton>
            <TabButton active={tab === "logos"} onClick={() => setTab("logos")}>
              Logos
            </TabButton>
            <TabButton active={tab === "content"} onClick={() => setTab("content")}>
              Content
            </TabButton>
            <TabButton active={tab === "media"} onClick={() => setTab("media")}>
              Media
            </TabButton>
            <TabButton active={tab === "studioShows"} onClick={() => setTab("studioShows")}>
              Shows
            </TabButton>
            <TabButton active={tab === "settings"} onClick={() => setTab("settings")}>
              Integrations & RBAC
            </TabButton>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-full border border-line px-4 py-1.5 text-xs font-medium text-muted-fg hover:border-black/30 hover:text-black self-start sm:self-auto"
          >
            Log Out
          </button>
        </div>
      </div>
      <div className="mt-6">
        {tab === "dashboard" && (
          <div className="container-x">
            <AdminDashboard onNavigateTab={(t) => setTab(t)} />
          </div>
        )}
        {tab === "crm" && (
          <div className="container-x">
            <CRMManager />
          </div>
        )}
        {tab === "products" && (
          <div className="container-x">
            <ProductsManager />
          </div>
        )}
        {tab === "projects" && <Dashboard />}
        {tab === "logos" && (
          <div className="container-x">
            <h1 className="font-brand text-2xl font-medium tracking-tight">
              Trusted-by logos
            </h1>
            <div className="mt-6">
              <LogosManager />
            </div>
          </div>
        )}
        {tab === "content" && (
          <div className="container-x">
            <h1 className="font-brand text-2xl font-medium tracking-tight">
              Home content
            </h1>
            <div className="mt-6">
              <ContentManager />
            </div>
          </div>
        )}
        {tab === "media" && (
          <div className="container-x">
            <h1 className="font-brand text-2xl font-medium tracking-tight">
              Home media
            </h1>
            <div className="mt-6">
              <MediaManager />
            </div>
          </div>
        )}
        {tab === "studioBookings" && (
          <div className="container-x">
            <h1 className="font-brand text-2xl font-medium tracking-tight">
              Studio Bookings
            </h1>
            <div className="mt-6">
              <StudioBookingsManager />
            </div>
          </div>
        )}
        {tab === "studioShows" && (
          <div className="container-x">
            <h1 className="font-brand text-2xl font-medium tracking-tight">
              Manage Shows
            </h1>
            <div className="mt-6">
              <StudioShowsManager />
            </div>
          </div>
        )}
        {tab === "settings" && (
          <div className="container-x">
            <AdminSettings />
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
    const pCats =
      p.categories && p.categories.length > 0
        ? p.categories
        : p.category
        ? [p.category]
        : [];
    setForm({
      title: p.title ?? "",
      slug: p.slug ?? "",
      category: p.category ?? "",
      categories: pCats,
      year: p.year ?? "",
      client: p.client ?? "",
      summary: p.summary ?? "",
      services: p.services ? p.services.join(", ") : "",
      technologies: p.technologies ? p.technologies.join(", ") : "",
      url: p.url ?? "",
      liveUrl: p.liveUrl ?? "",
      iframeUrl: p.iframeUrl ?? "",
      featured: !!p.featured,
      published: p.published !== false,
      order: p.order != null ? String(p.order) : "",
      img: p.img ?? "",
      challenge: p.challenge ?? "",
      solution: p.solution ?? "",
      outcome: p.outcome ?? "",
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

    const servicesArr = form.services
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const techArr = form.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const primaryCat =
      form.categories[0] || form.category.trim() || "Website & App Development";

    const payload: Record<string, unknown> = {
      title: form.title.trim(),
      slug:
        form.slug.trim() ||
        form.title
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-"),
      category: primaryCat,
      categories: form.categories.length > 0 ? form.categories : [primaryCat],
      year: form.year.trim(),
      client: form.client.trim(),
      summary: form.summary.trim(),
      services: servicesArr,
      technologies: techArr,
      url: form.url.trim(),
      liveUrl: form.liveUrl.trim(),
      iframeUrl: form.iframeUrl.trim(),
      featured: form.featured,
      published: form.published,
      challenge: form.challenge.trim(),
      solution: form.solution.trim(),
      outcome: form.outcome.trim(),
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Title *</label>
                <input
                  className={`${inputClass} mt-1.5`}
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Aurora Rebrand"
                />
              </div>
              <div>
                <label className={labelClass}>URL Slug</label>
                <input
                  className={`${inputClass} mt-1.5 font-mono-g text-xs`}
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="aurora-rebrand"
                />
              </div>
            </div>

            {/* Multi-Category Selector */}
            <div>
              <label className={labelClass}>
                Categories (Select all that apply)
              </label>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl border border-line bg-muted/20 p-3">
                {PORTFOLIO_CATEGORIES.map((cat) => {
                  const isChecked = form.categories.includes(cat);
                  return (
                    <label
                      key={cat}
                      className={`flex items-center gap-2 rounded-lg p-2 text-xs transition-colors cursor-pointer ${
                        isChecked
                          ? "bg-[var(--accent-purple)]/10 font-medium text-[var(--accent-purple)]"
                          : "hover:bg-muted text-fg/80"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setForm((f) => ({
                            ...f,
                            categories: checked
                              ? [...f.categories, cat]
                              : f.categories.filter((c) => c !== cat),
                          }));
                        }}
                        className="h-3.5 w-3.5 accent-[var(--accent-purple)] rounded"
                      />
                      <span>{cat}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Client Name</label>
                <input
                  className={`${inputClass} mt-1.5`}
                  value={form.client}
                  onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))}
                  placeholder="Aurora Design Studio"
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

            <div>
              <label className={labelClass}>Short Summary</label>
              <textarea
                rows={2}
                className={`${inputClass} mt-1.5`}
                value={form.summary}
                onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
                placeholder="High-level overview of the project delivered..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Technologies (comma-separated)</label>
                <input
                  className={`${inputClass} mt-1.5 font-mono-g text-xs`}
                  value={form.technologies}
                  onChange={(e) => setForm((f) => ({ ...f, technologies: e.target.value }))}
                  placeholder="Next.js, Python, PostgreSQL, Docker"
                />
              </div>
              <div>
                <label className={labelClass}>Services Delivered (comma-separated)</label>
                <input
                  className={`${inputClass} mt-1.5`}
                  value={form.services}
                  onChange={(e) => setForm((f) => ({ ...f, services: e.target.value }))}
                  placeholder="Web App Dev, AI Automation, Branding"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Live Website / Demo URL</label>
                <input
                  type="text"
                  className={`${inputClass} mt-1.5`}
                  value={form.liveUrl}
                  onChange={(e) => setForm((f) => ({ ...f, liveUrl: e.target.value }))}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className={labelClass}>External Link (Optional)</label>
                <input
                  type="text"
                  className={`${inputClass} mt-1.5`}
                  value={form.url}
                  onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                  placeholder="https://client-portal.com"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Live Preview (Iframe URL)</label>
              <input
                type="url"
                className={`${inputClass} mt-1.5`}
                value={form.iframeUrl}
                onChange={(e) => setForm((f) => ({ ...f, iframeUrl: e.target.value }))}
                placeholder="https://example.com"
              />
            </div>

            {/* Case Study Details */}
            <div className="rounded-xl border border-line p-4 space-y-3 bg-muted/10">
              <span className="font-mono-g text-[10px] uppercase tracking-wider text-muted-fg block">
                Case Study Narrative
              </span>
              <div>
                <label className={labelClass}>The Challenge</label>
                <textarea
                  rows={2}
                  className={`${inputClass} mt-1`}
                  value={form.challenge}
                  onChange={(e) => setForm((f) => ({ ...f, challenge: e.target.value }))}
                  placeholder="Describe the client's problem or bottlenecks..."
                />
              </div>
              <div>
                <label className={labelClass}>The Solution & Architecture</label>
                <textarea
                  rows={2}
                  className={`${inputClass} mt-1`}
                  value={form.solution}
                  onChange={(e) => setForm((f) => ({ ...f, solution: e.target.value }))}
                  placeholder="Technical strategy, architecture, and execution..."
                />
              </div>
              <div>
                <label className={labelClass}>Outcomes & Impact</label>
                <textarea
                  rows={2}
                  className={`${inputClass} mt-1`}
                  value={form.outcome}
                  onChange={(e) => setForm((f) => ({ ...f, outcome: e.target.value }))}
                  placeholder="Concrete results, speedups, or scale achieved..."
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center">
              <div>
                <label className={labelClass}>Display Order</label>
                <input
                  type="number"
                  className={`${inputClass} mt-1.5`}
                  value={form.order}
                  onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))}
                  placeholder="1"
                />
              </div>
              <label className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, featured: e.target.checked }))
                  }
                  className="h-4 w-4 accent-[var(--accent-purple)]"
                />
                <span className="text-xs font-medium">Featured (Spotlight)</span>
              </label>
              <label className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, published: e.target.checked }))
                  }
                  className="h-4 w-4 accent-[var(--accent-purple)]"
                />
                <span className="text-xs font-medium">Published (Live)</span>
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
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {p.iframeUrl ? (
                      <div 
                        className="absolute inset-0 overflow-hidden pointer-events-none"
                        style={{ transform: "translateZ(0)", willChange: "transform" }}
                      >
                        <iframe
                          src={p.iframeUrl}
                          loading="lazy"
                          style={{ 
                            width: "400%", 
                            height: "400%", 
                            transform: "scale(0.25) translateZ(0)", 
                            transformOrigin: "0 0",
                            willChange: "transform"
                          }}
                          className="absolute top-0 left-0 border-0"
                        />
                      </div>
                    ) : p.img ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={p.img} alt="" className="h-full w-full object-cover" />
                    ) : null}
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
                    {p.url?.trim() && (
                      <p className="mt-0.5 truncate text-xs text-[var(--accent-purple)]">
                        ↗ {p.url}
                      </p>
                    )}
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

function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, "enquiries"));
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Enquiry);
      docs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setEnquiries(docs);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load enquiries.");
      setEnquiries([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function onDelete(id: string) {
    if (!window.confirm("Delete this enquiry?")) return;
    setBusyId(id);
    try {
      await deleteDoc(doc(db, "enquiries", id));
      await load();
    } catch (e) {
      alert("Failed to delete");
    } finally {
      setBusyId(null);
    }
  }

  if (error) return <div className="text-red-500">{error}</div>;
  if (!enquiries) return <div className="text-muted-fg">Loading enquiries...</div>;
  if (enquiries.length === 0) return <div className="rounded-[20px] border border-dashed border-line py-16 text-center text-sm text-muted-fg">No enquiries yet.</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {enquiries.map((e) => (
        <div key={e.id} className="rounded-[20px] border border-line bg-surface p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-brand text-lg font-medium">{e.name}</h3>
              <p className="text-sm text-muted-fg">{e.email}</p>
              {e.phone && <p className="text-sm text-muted-fg">{e.phone}</p>}
            </div>
            <button
              onClick={() => onDelete(e.id)}
              disabled={busyId === e.id}
              className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
            >
              Delete
            </button>
          </div>
          <div className="mt-4 rounded-lg bg-muted p-4 text-sm text-fg">
            <p className="whitespace-pre-wrap">{e.message}</p>
          </div>
          <div className="mt-4 text-[0.65rem] text-muted-fg uppercase tracking-wider">
            {new Date(e.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

function StudioBookingsManager() {
  const [bookings, setBookings] = useState<StudioBooking[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "rejected">("all");

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, "studioBookings"));
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as StudioBooking);
      docs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setBookings(docs);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load bookings.");
      setBookings([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /* ── Service ID → label mapping ── */
  const SERVICE_LABELS: Record<string, string> = {
    podcast: "Podcast Production",
    commercial: "Commercial Shoots",
    live: "Live Sessions",
    post: "Post-Production",
  };

  function formatServices(services: string[] | undefined): string {
    if (!services || services.length === 0) return "—";
    return services.map((id) => SERVICE_LABELS[id] || id).join(", ");
  }

  function formatTimeWithPeriod(time: string): string {
    const slot = TIME_SLOTS.find((t) => t.label === time);
    return slot ? `${time} (${slot.sub})` : time;
  }

  function cleanPhone(phone: string): string {
    return phone.replace(/[^0-9]/g, "");
  }

  async function updateStatus(id: string, newStatus: "confirmed" | "rejected") {
    const label = newStatus === "confirmed" ? "confirm" : "reject";
    if (!window.confirm(`Are you sure you want to ${label} this booking?`)) return;
    setBusyId(id);
    try {
      await updateDoc(doc(db, "studioBookings", id), { status: newStatus });

      const b = bookings?.find((x) => x.id === id);
      if (b && b.phone) {
        const phone = cleanPhone(b.phone);
        const dateFormatted = b.date
          ? new Date(b.date + "T00:00:00").toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "";
        const serviceText = formatServices(b.services);

        if (newStatus === "confirmed") {
          const msg = [
            `✅ *Booking Confirmed!*`,
            ``,
            `Hi ${b.name}, your studio booking has been confirmed.`,
            ``,
            `*Date:* ${dateFormatted}`,
            `*Time:* ${b.time ? formatTimeWithPeriod(b.time) : "N/A"}`,
            `*Services:* ${serviceText}`,
            ``,
            `See you at Tagverse Studio! 🎬`,
          ]
            .filter(Boolean)
            .join("%0A");
          window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
        } else {
          const msg = [
            `❌ *Booking Update*`,
            ``,
            `Hi ${b.name}, unfortunately your studio booking could not be confirmed.`,
            ``,
            `*Date:* ${dateFormatted}`,
            `*Time:* ${b.time ? formatTimeWithPeriod(b.time) : "N/A"}`,
            `*Services:* ${serviceText}`,
            ``,
            `Please contact us to reschedule. We apologize for the inconvenience.`,
          ]
            .filter(Boolean)
            .join("%0A");
          window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
        }
      }

      await load();
    } catch (e) {
      alert(`Failed to ${label} booking`);
    } finally {
      setBusyId(null);
    }
  }

  async function onDelete(id: string) {
    if (!window.confirm("Delete this booking?")) return;
    setBusyId(id);
    try {
      await deleteDoc(doc(db, "studioBookings", id));
      await load();
    } catch (e) {
      alert("Failed to delete");
    } finally {
      setBusyId(null);
    }
  }

  if (error) return <div className="text-red-500">{error}</div>;
  if (!bookings) return <div className="text-muted-fg">Loading bookings...</div>;

  const filtered = bookings.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;
  const rejectedCount = bookings.filter((b) => b.status === "rejected").length;

  function statusBadge(status: string) {
    switch (status) {
      case "confirmed":
        return (
          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-medium text-green-700">
            Confirmed
          </span>
        );
      case "rejected":
        return (
          <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[10px] font-medium text-red-600">
            Rejected
          </span>
        );
      default:
        return (
          <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-[10px] font-medium text-yellow-700">
            Pending
          </span>
        );
    }
  }

  function exportBookingsCSV() {
    if (!bookings || bookings.length === 0) return;
    const headers = ["ID", "Name", "Email", "Phone", "Date", "Time", "Services", "Status", "Notes", "Created"];
    const rows = bookings.map((b) => [
      `"${b.id}"`,
      `"${b.name}"`,
      `"${b.email}"`,
      `"${b.phone}"`,
      `"${b.date}"`,
      `"${b.time}"`,
      `"${formatServices(b.services).replace(/"/g, '""')}"`,
      `"${b.status}"`,
      `"${(b.notes || "").replace(/"/g, '""')}"`,
      `"${b.createdAt}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tagverse_studio_bookings_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div>
      {/* filter tabs & export */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(["all", "pending", "confirmed", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === f ? "bg-fg text-white" : "text-muted-fg hover:text-fg"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === "all" && ` (${bookings.length})`}
              {f === "pending" && ` (${pendingCount})`}
              {f === "confirmed" && ` (${confirmedCount})`}
              {f === "rejected" && ` (${rejectedCount})`}
            </button>
          ))}
        </div>

        <button
          onClick={exportBookingsCSV}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-black hover:bg-black/5"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export CSV
        </button>
      </div>

      {filtered.length === 0 && (
        <div className="rounded-[20px] border border-dashed border-line py-16 text-center text-sm text-muted-fg">
          {filter === "all"
            ? "No studio bookings yet."
            : `No ${filter} bookings.`}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((b) => {
          const serviceList = formatServices(b.services);
          const dateDisplay = b.date
            ? new Date(b.date + "T00:00:00").toLocaleDateString("en-IN", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "—";
          const timeDisplay = b.time ? formatTimeWithPeriod(b.time) : "—";
          return (
            <div
              key={b.id}
              className="rounded-[20px] border border-line bg-surface p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-brand text-lg font-medium">
                      {b.name}
                    </h3>
                    {statusBadge(b.status)}
                  </div>
                  <p className="text-sm text-muted-fg">{b.email}</p>
                  {b.phone && <p className="text-sm text-muted-fg">{b.phone}</p>}
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-[var(--accent-purple-muted)] p-4 text-sm text-[var(--accent-purple)]">
                <p className="font-medium">{serviceList}</p>
                <p className="mt-1 opacity-80">
                  📅 {dateDisplay}
                </p>
                <p className="opacity-80">
                  🕐 {timeDisplay}
                </p>
                {b.qty ? (
                  <p className="mt-0.5 opacity-80">
                    {b.qty} ticket{b.qty > 1 ? "s" : ""} requested
                  </p>
                ) : null}
                {b.notes && (
                  <p className="mt-2 text-xs opacity-70 italic">
                    &ldquo;{b.notes}&rdquo;
                  </p>
                )}
              </div>

              {/* action buttons */}
              <div className="mt-4 flex items-center gap-2">
                {b.status === "pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(b.id, "confirmed")}
                      disabled={busyId === b.id}
                      className="rounded-full bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                    >
                      {busyId === b.id ? "…" : "Confirm"}
                    </button>
                    <button
                      onClick={() => updateStatus(b.id, "rejected")}
                      disabled={busyId === b.id}
                      className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </>
                )}
                {b.status === "confirmed" && (
                  <button
                    onClick={() => updateStatus(b.id, "rejected")}
                    disabled={busyId === b.id}
                    className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                  >
                    Revoke
                  </button>
                )}
                {b.status === "rejected" && (
                  <button
                    onClick={() => updateStatus(b.id, "confirmed")}
                    disabled={busyId === b.id}
                    className="rounded-full bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                  >
                    Re-confirm
                  </button>
                )}
                <button
                  onClick={() => onDelete(b.id)}
                  disabled={busyId === b.id}
                  className="ml-auto rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>

              <div className="mt-3 text-[0.65rem] text-muted-fg uppercase tracking-wider">
                {new Date(b.createdAt).toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StudioShowsManager() {
  const [shows, setShows] = useState<StudioShow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, "studioShows"));
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as StudioShow);
      docs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setShows(docs);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load shows.");
      setShows([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function onDelete(id: string) {
    if (!window.confirm("Delete this show?")) return;
    setBusyId(id);
    try {
      await deleteDoc(doc(db, "studioShows", id));
      await load();
    } catch (e) {
      alert("Failed to delete");
    } finally {
      setBusyId(null);
    }
  }

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusyId("add");
    try {
      const fd = new FormData(e.currentTarget);
      const newShow = {
        title: fd.get("title") as string,
        guest: fd.get("guest") as string,
        date: fd.get("date") as string,
        day: fd.get("day") as string,
        time: fd.get("time") as string,
        venue: fd.get("venue") as string,
        seatsLeft: parseInt(fd.get("seatsLeft") as string, 10),
        tag: fd.get("tag") as string,
        createdAt: new Date().toISOString(),
      };
      await addDoc(collection(db, "studioShows"), newShow);
      setAdding(false);
      await load();
    } catch (err) {
      alert("Failed to add show");
    } finally {
      setBusyId(null);
    }
  }

  if (error) return <div className="text-red-500">{error}</div>;
  if (!shows) return <div className="text-muted-fg">Loading shows...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setAdding(!adding)}
          className="rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg hover:opacity-90"
        >
          {adding ? "Cancel" : "Add new show"}
        </button>
      </div>

      {adding && (
        <form onSubmit={handleAdd} className="rounded-[20px] border border-line bg-surface p-6 shadow-sm">
          <h3 className="mb-4 font-brand text-lg font-medium">Add New Show</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-fg">Title (e.g. Building in Public)</label>
              <input name="title" required className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm text-fg" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-fg">Guest (e.g. with Aarav Mehta)</label>
              <input name="guest" required className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm text-fg" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-fg">Date (e.g. Jul 12)</label>
              <input name="date" required className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm text-fg" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-fg">Day (e.g. Fri)</label>
              <input name="day" required className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm text-fg" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-fg">Time (e.g. 7:00 PM)</label>
              <input name="time" required className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm text-fg" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-fg">Venue (e.g. Tagverse Studio)</label>
              <input name="venue" required className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm text-fg" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-fg">Seats Left (e.g. 21)</label>
              <input name="seatsLeft" type="number" required className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm text-fg" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-fg">Tag (e.g. Live recording)</label>
              <input name="tag" required className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm text-fg" />
            </div>
          </div>
          <button disabled={busyId === "add"} className="mt-4 rounded-full bg-fg px-6 py-2 text-sm font-medium text-bg disabled:opacity-50">
            {busyId === "add" ? "Saving..." : "Save Show"}
          </button>
        </form>
      )}

      {shows.length === 0 && !adding && (
        <div className="rounded-[20px] border border-dashed border-line py-16 text-center text-sm text-muted-fg">
          No shows scheduled yet.
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shows.map((s) => (
          <div key={s.id} className="rounded-[20px] border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <span className="mb-2 inline-block rounded-full bg-line px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-muted-fg">
                  {s.tag}
                </span>
                <h3 className="font-brand text-lg font-medium">{s.title}</h3>
                <p className="text-sm text-muted-fg">{s.guest}</p>
                <p className="mt-2 text-sm text-muted-fg">
                  {s.date} ({s.day}) · {s.time}
                </p>
                <p className="text-sm text-muted-fg">{s.venue}</p>
                <p className="mt-1 text-xs font-medium text-[var(--accent-orange)]">{s.seatsLeft} seats left</p>
              </div>
              <button
                onClick={() => onDelete(s.id)}
                disabled={busyId === s.id}
                className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
