"use client";

import { useCallback, useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Enquiry, CRMNote } from "@/lib/types";

const STAGES = [
  { id: "all", label: "All Leads" },
  { id: "new", label: "New", color: "bg-blue-100 text-blue-700" },
  { id: "contacted", label: "Contacted", color: "bg-yellow-100 text-yellow-700" },
  { id: "qualified", label: "Qualified", color: "bg-indigo-100 text-indigo-700" },
  { id: "proposal", label: "Proposal", color: "bg-purple-100 text-purple-700" },
  { id: "won", label: "Won", color: "bg-green-100 text-green-700" },
  { id: "lost", label: "Lost", color: "bg-gray-100 text-gray-700" },
];

const TEAM_MEMBERS = ["Aathish", "Growth Team", "Sales Lead", "Studio Manager"];

export default function CRMManager() {
  const [enquiries, setEnquiries] = useState<Enquiry[] | null>(null);
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [activeLead, setActiveLead] = useState<Enquiry | null>(null);
  const [newNote, setNewNote] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, "enquiries"));
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Enquiry);
      docs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setEnquiries(docs);
    } catch {
      // Fallback to server API
      try {
        const res = await fetch("/api/enquiries");
        const data = await res.json();
        setEnquiries(data.enquiries || []);
      } catch {
        setEnquiries([]);
      }
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Update lead stage
  async function handleStageChange(id: string, stage: Enquiry["stage"]) {
    setBusyId(id);
    try {
      await updateDoc(doc(db, "enquiries", id), { stage });
      await load();
      if (activeLead && activeLead.id === id) {
        setActiveLead((prev) => (prev ? { ...prev, stage } : null));
      }
    } catch {
      // Fallback local update
      setEnquiries((prev) =>
        prev ? prev.map((e) => (e.id === id ? { ...e, stage } : e)) : null
      );
      if (activeLead && activeLead.id === id) {
        setActiveLead((prev) => (prev ? { ...prev, stage } : null));
      }
    } finally {
      setBusyId(null);
    }
  }

  // Assign lead
  async function handleAssign(id: string, assignedTo: string) {
    setBusyId(id);
    try {
      await updateDoc(doc(db, "enquiries", id), { assignedTo });
      await load();
      if (activeLead && activeLead.id === id) {
        setActiveLead((prev) => (prev ? { ...prev, assignedTo } : null));
      }
    } catch {
      setEnquiries((prev) =>
        prev ? prev.map((e) => (e.id === id ? { ...e, assignedTo } : e)) : null
      );
    } finally {
      setBusyId(null);
    }
  }

  // Add interaction note
  async function handleAddNote(id: string) {
    if (!newNote.trim()) return;
    const noteObj: CRMNote = {
      id: `note_${Date.now()}`,
      text: newNote.trim(),
      date: new Date().toISOString(),
      author: "Admin",
    };
    const currentNotes = activeLead?.notes || [];
    const updatedNotes = [noteObj, ...currentNotes];

    setBusyId(id);
    try {
      await updateDoc(doc(db, "enquiries", id), { notes: updatedNotes });
      setNewNote("");
      await load();
      setActiveLead((prev) => (prev ? { ...prev, notes: updatedNotes } : null));
    } catch {
      setNewNote("");
      setActiveLead((prev) => (prev ? { ...prev, notes: updatedNotes } : null));
    } finally {
      setBusyId(null);
    }
  }

  // Delete lead
  async function handleDelete(id: string) {
    if (!window.confirm("Delete this lead record permanently?")) return;
    setBusyId(id);
    try {
      await deleteDoc(doc(db, "enquiries", id));
      if (activeLead?.id === id) setActiveLead(null);
      await load();
    } catch {
      alert("Failed to delete lead");
    } finally {
      setBusyId(null);
    }
  }

  // Export CSV
  function exportCSV() {
    if (!enquiries || enquiries.length === 0) return;
    const headers = ["ID", "Name", "Email", "Phone", "Service", "Budget", "Stage", "AssignedTo", "Created", "Message"];
    const rows = enquiries.map((e) => [
      `"${e.id}"`,
      `"${e.name}"`,
      `"${e.email}"`,
      `"${e.phone || ""}"`,
      `"${e.service || ""}"`,
      `"${e.budget || ""}"`,
      `"${e.stage || "new"}"`,
      `"${e.assignedTo || "Unassigned"}"`,
      `"${e.createdAt}"`,
      `"${(e.message || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tagverse_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (!enquiries) {
    return <div className="text-sm text-muted-fg">Loading CRM Pipeline...</div>;
  }

  const filtered = enquiries.filter((e) => {
    const matchesStage = stageFilter === "all" || (e.stage || "new") === stageFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      (e.service || "").toLowerCase().includes(q);
    return matchesStage && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {STAGES.map((s) => (
            <button
              key={s.id}
              onClick={() => setStageFilter(s.id)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                stageFilter === s.id
                  ? "bg-black text-white"
                  : "border border-line bg-white text-muted-fg hover:text-black"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs outline-none focus:border-[var(--accent-purple)]"
          />
          <button
            onClick={exportCSV}
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
      </div>

      {/* Main Grid: Leads List & Detail Drawer */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Leads Table/Cards */}
        <div className="space-y-3 lg:col-span-2">
          {filtered.length === 0 ? (
            <div className="rounded-[20px] border border-dashed border-line py-16 text-center text-sm text-muted-fg">
              No leads found matching the criteria.
            </div>
          ) : (
            filtered.map((e) => {
              const currentStage = e.stage || "new";
              const stageBadge = STAGES.find((s) => s.id === currentStage);
              const isSelected = activeLead?.id === e.id;

              return (
                <div
                  key={e.id}
                  onClick={() => setActiveLead(e)}
                  className={`cursor-pointer rounded-[20px] border p-5 transition-all ${
                    isSelected
                      ? "border-[var(--accent-purple)] bg-purple-50/20 shadow-md"
                      : "border-line bg-surface hover:border-black/20"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-brand text-base font-medium">{e.name}</h4>
                      <p className="text-xs text-muted-fg">{e.email} &bull; {e.phone || "No phone"}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${stageBadge?.color || "bg-gray-100 text-gray-700"}`}>
                      {stageBadge?.label || currentStage}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-fg">
                    <span className="rounded bg-muted px-2 py-0.5 font-medium text-fg">
                      {e.service || "General"}
                    </span>
                    {e.budget && <span>Budget: {e.budget}</span>}
                    {e.assignedTo && <span>Assigned: {e.assignedTo}</span>}
                    <span className="ml-auto font-mono-g text-[0.65rem]">
                      {new Date(e.createdAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Lead Inspection & Action Pane */}
        <div>
          {activeLead ? (
            <div className="sticky top-24 rounded-[20px] border border-line bg-surface p-6 shadow-sm space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-brand text-lg font-medium">{activeLead.name}</h3>
                  <p className="text-xs text-muted-fg">{activeLead.email}</p>
                  {activeLead.phone && (
                    <a
                      href={`https://wa.me/${activeLead.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs text-green-600 hover:underline"
                    >
                      WhatsApp: {activeLead.phone} &rarr;
                    </a>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(activeLead.id)}
                  className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
                >
                  Delete
                </button>
              </div>

              {/* Stage selector */}
              <div>
                <label className="block text-[0.65rem] uppercase tracking-wider text-muted-fg font-medium">
                  Pipeline Stage
                </label>
                <select
                  value={activeLead.stage || "new"}
                  onChange={(e) => handleStageChange(activeLead.id, e.target.value as any)}
                  disabled={busyId === activeLead.id}
                  className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs outline-none focus:border-[var(--accent-purple)]"
                >
                  <option value="new">New Lead</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="proposal">Proposal Sent</option>
                  <option value="won">Won Deal</option>
                  <option value="lost">Lost Deal</option>
                </select>
              </div>

              {/* Assignee */}
              <div>
                <label className="block text-[0.65rem] uppercase tracking-wider text-muted-fg font-medium">
                  Assign To
                </label>
                <select
                  value={activeLead.assignedTo || ""}
                  onChange={(e) => handleAssign(activeLead.id, e.target.value)}
                  disabled={busyId === activeLead.id}
                  className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs outline-none focus:border-[var(--accent-purple)]"
                >
                  <option value="">Unassigned</option>
                  {TEAM_MEMBERS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Client message */}
              <div>
                <label className="block text-[0.65rem] uppercase tracking-wider text-muted-fg font-medium">
                  Requirement Details
                </label>
                <div className="mt-1 rounded-lg bg-muted p-3 text-xs text-fg leading-relaxed whitespace-pre-wrap">
                  {activeLead.message}
                </div>
              </div>

              {/* Interaction Notes */}
              <div>
                <label className="block text-[0.65rem] uppercase tracking-wider text-muted-fg font-medium">
                  Notes & Interaction History
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add follow-up note..."
                    className="flex-1 rounded-lg border border-line bg-white px-3 py-1.5 text-xs outline-none focus:border-[var(--accent-purple)]"
                  />
                  <button
                    onClick={() => handleAddNote(activeLead.id)}
                    disabled={busyId === activeLead.id || !newNote.trim()}
                    className="rounded-lg bg-black px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>

                <div className="mt-3 max-h-48 overflow-y-auto space-y-2">
                  {activeLead.notes && activeLead.notes.length > 0 ? (
                    activeLead.notes.map((n) => (
                      <div key={n.id} className="rounded-lg border border-line bg-white p-2.5 text-xs">
                        <p>{n.text}</p>
                        <span className="mt-1 block font-mono-g text-[0.6rem] text-muted-fg">
                          {new Date(n.date).toLocaleString()} &bull; {n.author}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="py-2 text-[0.7rem] text-muted-fg">No notes added yet.</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-[20px] border border-line bg-surface p-8 text-center text-xs text-muted-fg">
              Select a lead on the left to inspect details, advance pipeline stage, or add notes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
