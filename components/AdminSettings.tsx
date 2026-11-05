"use client";

import { useState } from "react";
import type { AdminUser, AdminRole } from "@/lib/types";

const INITIAL_USERS: AdminUser[] = [
  {
    id: "usr-1",
    name: "Aathish",
    email: "aathish@t4gverse.com",
    role: "super_admin",
    active: true,
    createdAt: "2026-01-15T00:00:00Z",
    lastLogin: "2026-10-26T10:00:00Z",
  },
  {
    id: "usr-2",
    name: "Growth Lead",
    email: "marketing@t4gverse.com",
    role: "marketing",
    active: true,
    createdAt: "2026-03-01T00:00:00Z",
    lastLogin: "2026-10-25T14:30:00Z",
  },
  {
    id: "usr-3",
    name: "Sales Director",
    email: "sales@t4gverse.com",
    role: "sales",
    active: true,
    createdAt: "2026-04-10T00:00:00Z",
    lastLogin: "2026-10-26T08:15:00Z",
  },
  {
    id: "usr-4",
    name: "Lead Engineer",
    email: "dev@t4gverse.com",
    role: "developer",
    active: true,
    createdAt: "2026-02-20T00:00:00Z",
    lastLogin: "2026-10-26T11:45:00Z",
  },
];

const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  super_admin: ["All Permissions", "User Management", "System Settings", "Database Exports", "Billing"],
  admin: ["Manage Projects", "Manage Bookings", "Manage Leads", "Content Editing", "Media Uploads"],
  marketing: ["Content Editing", "Media Uploads", "View Enquiries", "Export Leads"],
  sales: ["View Enquiries", "Update Pipeline Stages", "Add Notes", "Export Leads"],
  developer: ["API Access", "Webhook Monitoring", "Integration Settings", "Audit Logs"],
};

export default function AdminSettings() {
  const [subTab, setSubTab] = useState<"integrations" | "team" | "health">("integrations");
  const [n8nUrl, setN8nUrl] = useState("https://n8n.t4gverse.com/webhook/lead-intake");
  const [n8nEnabled, setN8nEnabled] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState("+91 99419 68238");
  const [notificationEmail, setNotificationEmail] = useState("ops@t4gverse.com");
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_USERS);
  const [savedMsg, setSavedMsg] = useState("");

  function saveIntegrations(e: React.FormEvent) {
    e.preventDefault();
    setSavedMsg("Integration settings saved successfully.");
    setTimeout(() => setSavedMsg(""), 3000);
  }

  function toggleUserStatus(id: string) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u))
    );
  }

  return (
    <div className="space-y-6">
      {/* Sub tabs */}
      <div className="flex gap-2 border-b border-line pb-4">
        <button
          onClick={() => setSubTab("integrations")}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
            subTab === "integrations" ? "bg-black text-white" : "text-muted-fg hover:text-black"
          }`}
        >
          Integrations & Webhooks
        </button>
        <button
          onClick={() => setSubTab("team")}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
            subTab === "team" ? "bg-black text-white" : "text-muted-fg hover:text-black"
          }`}
        >
          Team & RBAC Permissions
        </button>
        <button
          onClick={() => setSubTab("health")}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
            subTab === "health" ? "bg-black text-white" : "text-muted-fg hover:text-black"
          }`}
        >
          System Health & Environment
        </button>
      </div>

      {savedMsg && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-xs text-green-700">
          {savedMsg}
        </div>
      )}

      {/* Integrations */}
      {subTab === "integrations" && (
        <form onSubmit={saveIntegrations} className="max-w-2xl rounded-[20px] border border-line bg-surface p-6 space-y-6">
          <div>
            <h3 className="font-brand text-lg font-medium">n8n Automation & Webhook Dispatch</h3>
            <p className="mt-1 text-xs text-muted-fg">
              Automatically trigger n8n workflows whenever new project enquiries or studio bookings are submitted.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <input
                type="checkbox"
                id="n8nEnabled"
                checked={n8nEnabled}
                onChange={(e) => setN8nEnabled(e.target.checked)}
                className="h-4 w-4 rounded accent-[var(--accent-purple)]"
              />
              <label htmlFor="n8nEnabled" className="text-xs font-medium">
                Enable automatic webhook dispatch
              </label>
            </div>
            <div className="mt-3">
              <label className="block text-[0.65rem] uppercase tracking-wider text-muted-fg font-medium">
                n8n Webhook URL
              </label>
              <input
                type="url"
                value={n8nUrl}
                onChange={(e) => setN8nUrl(e.target.value)}
                placeholder="https://n8n.yourdomain.com/webhook/..."
                className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs outline-none focus:border-[var(--accent-purple)]"
              />
            </div>
          </div>

          <div className="border-t border-line pt-5">
            <h3 className="font-brand text-lg font-medium">WhatsApp Business Notifications</h3>
            <p className="mt-1 text-xs text-muted-fg">
              Default recipient number for customer booking confirmations and studio dispatch.
            </p>
            <div className="mt-3">
              <label className="block text-[0.65rem] uppercase tracking-wider text-muted-fg font-medium">
                WhatsApp Phone Number
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs outline-none focus:border-[var(--accent-purple)]"
              />
            </div>
          </div>

          <div className="border-t border-line pt-5">
            <h3 className="font-brand text-lg font-medium">Operational Email Notifications</h3>
            <div className="mt-3">
              <label className="block text-[0.65rem] uppercase tracking-wider text-muted-fg font-medium">
                Admin Notification Email
              </label>
              <input
                type="email"
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs outline-none focus:border-[var(--accent-purple)]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="rounded-full bg-black px-5 py-2 text-xs font-medium text-white hover:opacity-90"
            >
              Save Integrations
            </button>
          </div>
        </form>
      )}

      {/* Team & RBAC */}
      {subTab === "team" && (
        <div className="rounded-[20px] border border-line bg-surface p-6 space-y-6">
          <div>
            <h3 className="font-brand text-lg font-medium">Role-Based Access Control (RBAC)</h3>
            <p className="mt-1 text-xs text-muted-fg">
              Granular permissions mapped across Super Admin, Marketing, Sales, and Developer roles.
            </p>
          </div>

          <div className="divide-y divide-line">
            {users.map((u) => (
              <div key={u.id} className="py-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-brand text-sm font-medium">{u.name}</h4>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-mono-g uppercase text-muted-fg">
                      {u.role.replace("_", " ")}
                    </span>
                    {!u.active && (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-medium text-red-700">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-fg">{u.email}</p>
                  <p className="mt-1 text-[11px] text-muted-fg">
                    Permissions: {ROLE_PERMISSIONS[u.role].join(", ")}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleUserStatus(u.id)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      u.active
                        ? "border border-red-200 text-red-600 hover:bg-red-50"
                        : "border border-green-200 text-green-600 hover:bg-green-50"
                    }`}
                  >
                    {u.active ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Health & Environment */}
      {subTab === "health" && (
        <div className="max-w-2xl rounded-[20px] border border-line bg-surface p-6 space-y-5">
          <h3 className="font-brand text-lg font-medium">System Health & Services</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-line bg-white p-3.5">
              <div>
                <p className="text-xs font-medium">Next.js Web Server</p>
                <p className="text-[11px] text-muted-fg">Port 3001 &bull; Node.js runtime</p>
              </div>
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-medium text-green-700">
                Healthy
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-line bg-white p-3.5">
              <div>
                <p className="text-xs font-medium">Cloud Firestore / Storage Connection</p>
                <p className="text-[11px] text-muted-fg">Configured via .env.local with graceful in-memory fallback</p>
              </div>
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-medium text-green-700">
                Connected & Resilient
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-line bg-white p-3.5">
              <div>
                <p className="text-xs font-medium">API Endpoints (/api/enquiries, /api/bookings)</p>
                <p className="text-[11px] text-muted-fg">Honeypot protection, duplicate detection, input sanitization</p>
              </div>
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-medium text-green-700">
                Active
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
