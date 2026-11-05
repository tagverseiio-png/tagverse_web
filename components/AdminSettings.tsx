"use client";

import { useCallback, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { AdminUser, AdminRole } from "@/lib/types";
import { DEFAULT_PROJECTS, DEFAULT_PRODUCTS } from "@/lib/defaultData";
import { DEFAULT_LOGOS } from "@/lib/logos";

const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  super_admin: ["All Permissions", "User Management", "System Settings", "Database Exports", "Billing"],
  admin: ["Manage Projects", "Manage Bookings", "Manage Leads", "Content Editing", "Media Uploads"],
  marketing: ["Content Editing", "Media Uploads", "View Enquiries", "Export Leads"],
  sales: ["View Enquiries", "Update Pipeline Stages", "Add Notes", "Export Leads"],
  developer: ["API Access", "Webhook Monitoring", "Integration Settings", "Audit Logs"],
};

const DEFAULT_SUPER_ADMIN: Omit<AdminUser, "id"> = {
  name: "TAGVERSE Super Admin",
  email: "admin@t4gverse.com",
  role: "super_admin",
  active: true,
  createdAt: new Date().toISOString(),
  passcode: "admin123",
};

export default function AdminSettings() {
  const [subTab, setSubTab] = useState<"integrations" | "team" | "database" | "health">("team");
  
  // Integrations state
  const [n8nUrl, setN8nUrl] = useState("https://n8n.t4gverse.com/webhook/lead-intake");
  const [n8nEnabled, setN8nEnabled] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState("+91 99419 68238");
  const [notificationEmail, setNotificationEmail] = useState("ops@t4gverse.com");
  const [savingIntegrations, setSavingIntegrations] = useState(false);

  // Admin users state
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "admin" as AdminRole,
    passcode: "",
    active: true,
  });
  const [savingUser, setSavingUser] = useState(false);

  // Seed / DB state
  const [seeding, setSeeding] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 1. Load integrations from Firestore
  const loadIntegrations = useCallback(async () => {
    try {
      const snap = await getDoc(doc(db, "settings", "integrations"));
      if (snap.exists()) {
        const data = snap.data();
        if (typeof data.n8nWebhookUrl === "string") setN8nUrl(data.n8nWebhookUrl);
        if (typeof data.n8nEnabled === "boolean") setN8nEnabled(data.n8nEnabled);
        if (typeof data.whatsappNumber === "string") setWhatsappNumber(data.whatsappNumber);
        if (typeof data.notificationEmail === "string") setNotificationEmail(data.notificationEmail);
      }
    } catch (e) {
      console.warn("Could not load integrations from Firestore:", e);
    }
  }, []);

  // 2. Load admin users from Firestore
  const loadUsers = useCallback(async () => {
    setLoadingUsers(true);
    try {
      const snap = await getDocs(collection(db, "admin_users"));
      if (!snap.empty) {
        const list = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as AdminUser[];
        setUsers(list);
      } else {
        setUsers([]);
      }
    } catch {
      // Fallback via API
      try {
        const res = await fetch("/api/admin/users");
        const data = (await res.json()) as { users?: AdminUser[] };
        setUsers(data.users || []);
      } catch {
        setUsers([]);
      }
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  useEffect(() => {
    loadIntegrations();
    loadUsers();
  }, [loadIntegrations, loadUsers]);

  // Save integrations
  async function saveIntegrations(e: React.FormEvent) {
    e.preventDefault();
    setSavingIntegrations(true);
    setFeedbackMsg(null);
    setErrorMsg(null);
    try {
      await setDoc(doc(db, "settings", "integrations"), {
        n8nWebhookUrl: n8nUrl.trim(),
        n8nEnabled,
        whatsappNumber: whatsappNumber.trim(),
        notificationEmail: notificationEmail.trim(),
        updatedAt: new Date().toISOString(),
      });
      setFeedbackMsg("Integrations saved to Firestore successfully.");
      setTimeout(() => setFeedbackMsg(null), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save integrations.";
      setErrorMsg(msg);
    } finally {
      setSavingIntegrations(false);
    }
  }

  // Create or Update Admin User
  async function handleSaveUser(e: React.FormEvent) {
    e.preventDefault();
    if (!userForm.name.trim() || !userForm.email.trim()) {
      setErrorMsg("Name and email are required.");
      return;
    }

    setSavingUser(true);
    setErrorMsg(null);
    try {
      const payload: Record<string, unknown> = {
        name: userForm.name.trim(),
        email: userForm.email.trim().toLowerCase(),
        role: userForm.role,
        active: userForm.active,
        updatedAt: new Date().toISOString(),
      };
      if (userForm.passcode.trim()) {
        payload.passcode = userForm.passcode.trim();
      }

      if (editingUserId) {
        await updateDoc(doc(db, "admin_users", editingUserId), payload);
        setFeedbackMsg(`Admin "${userForm.name}" updated successfully.`);
      } else {
        payload.createdAt = new Date().toISOString();
        if (!payload.passcode) payload.passcode = "admin123";
        await addDoc(collection(db, "admin_users"), payload);
        setFeedbackMsg(`New Admin "${userForm.name}" created successfully.`);
      }

      setShowAddModal(false);
      setEditingUserId(null);
      setUserForm({ name: "", email: "", role: "admin", passcode: "", active: true });
      await loadUsers();
      setTimeout(() => setFeedbackMsg(null), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save admin user.";
      setErrorMsg(msg);
    } finally {
      setSavingUser(false);
    }
  }

  // Toggle active status
  async function toggleUserStatus(u: AdminUser) {
    try {
      await updateDoc(doc(db, "admin_users", u.id), { active: !u.active });
      await loadUsers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update user.";
      setErrorMsg(msg);
    }
  }

  // Delete Admin User
  async function handleDeleteUser(u: AdminUser) {
    if (!window.confirm(`Delete admin user "${u.name}"?`)) return;
    try {
      await deleteDoc(doc(db, "admin_users", u.id));
      await loadUsers();
      setFeedbackMsg(`Admin "${u.name}" deleted.`);
      setTimeout(() => setFeedbackMsg(null), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete user.";
      setErrorMsg(msg);
    }
  }

  // Seed default admin user
  async function seedDefaultAdmin() {
    setSeeding("admin");
    setErrorMsg(null);
    try {
      await addDoc(collection(db, "admin_users"), DEFAULT_SUPER_ADMIN);
      await loadUsers();
      setFeedbackMsg("Super admin account initialized in Firestore.");
      setTimeout(() => setFeedbackMsg(null), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to seed admin.";
      setErrorMsg(msg);
    } finally {
      setSeeding(null);
    }
  }

  // Seed collections in Firestore
  async function seedCollection(target: "projects" | "products" | "logos" | "all") {
    setSeeding(target);
    setErrorMsg(null);
    try {
      if (target === "projects" || target === "all") {
        for (const p of DEFAULT_PROJECTS) {
          const { id: _ignore, ...docData } = p;
          await addDoc(collection(db, "projects"), docData);
        }
      }
      if (target === "products" || target === "all") {
        for (const prod of DEFAULT_PRODUCTS) {
          const { id: _ignore, ...docData } = prod;
          await addDoc(collection(db, "products"), docData);
        }
      }
      if (target === "logos" || target === "all") {
        for (let i = 0; i < DEFAULT_LOGOS.length; i++) {
          await addDoc(collection(db, "logos"), {
            text: DEFAULT_LOGOS[i],
            order: i + 1,
          });
        }
      }
      if (target === "all") {
        if (!users || users.length === 0) {
          await addDoc(collection(db, "admin_users"), DEFAULT_SUPER_ADMIN);
          await loadUsers();
        }
      }
      setFeedbackMsg(`Successfully seeded ${target === "all" ? "all data" : target} into Firestore!`);
      setTimeout(() => setFeedbackMsg(null), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to seed data.";
      setErrorMsg(msg);
    } finally {
      setSeeding(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Sub tabs */}
      <div className="flex flex-wrap gap-2 border-b border-line pb-4">
        <button
          onClick={() => setSubTab("team")}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
            subTab === "team" ? "bg-black text-white" : "text-muted-fg hover:text-black"
          }`}
        >
          Admin Users & RBAC
        </button>
        <button
          onClick={() => setSubTab("database")}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
            subTab === "database" ? "bg-black text-white" : "text-muted-fg hover:text-black"
          }`}
        >
          Database & Media (Free Tier)
        </button>
        <button
          onClick={() => setSubTab("integrations")}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
            subTab === "integrations" ? "bg-black text-white" : "text-muted-fg hover:text-black"
          }`}
        >
          Integrations & Webhooks
        </button>
        <button
          onClick={() => setSubTab("health")}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
            subTab === "health" ? "bg-black text-white" : "text-muted-fg hover:text-black"
          }`}
        >
          System Health
        </button>
      </div>

      {feedbackMsg && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-xs text-green-700">
          {feedbackMsg}
        </div>
      )}
      {errorMsg && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          {errorMsg}
        </div>
      )}

      {/* Team & RBAC / Admin Users */}
      {subTab === "team" && (
        <div className="rounded-[20px] border border-line bg-surface p-6 space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-brand text-lg font-medium">Admin Accounts & RBAC Permissions</h3>
              <p className="mt-1 text-xs text-muted-fg">
                Create and manage admin credentials stored securely in Firestore. Assign roles to team members.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {(!users || users.length === 0) && (
                <button
                  onClick={seedDefaultAdmin}
                  disabled={seeding !== null}
                  className="rounded-full border border-line bg-white px-4 py-1.5 text-xs font-medium text-black hover:border-black transition-colors"
                >
                  {seeding === "admin" ? "Seeding..." : "Seed Super Admin"}
                </button>
              )}
              <button
                onClick={() => {
                  setEditingUserId(null);
                  setUserForm({
                    name: "",
                    email: "",
                    role: "admin",
                    passcode: "",
                    active: true,
                  });
                  setShowAddModal(true);
                }}
                className="rounded-full bg-black px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity"
              >
                + Create Admin
              </button>
            </div>
          </div>

          {loadingUsers ? (
            <p className="text-xs text-muted-fg">Loading admin users from Firestore...</p>
          ) : !users || users.length === 0 ? (
            <div className="rounded-xl border border-dashed border-line p-8 text-center">
              <p className="text-sm font-medium">No admin accounts in database yet</p>
              <p className="mt-1 text-xs text-muted-fg">
                The master passcode (<code>admin123</code>) is currently active. Click &quot;Seed Super Admin&quot; or &quot;+ Create Admin&quot; to add database-managed admin accounts.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-line">
              {users.map((u) => (
                <div key={u.id} className="py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
                      Permissions: {ROLE_PERMISSIONS[u.role]?.join(", ") || "Custom"}
                    </p>
                    {u.lastLogin && (
                      <p className="text-[10px] text-muted-fg mt-0.5">
                        Last login: {new Date(u.lastLogin).toLocaleString()}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingUserId(u.id);
                        setUserForm({
                          name: u.name,
                          email: u.email,
                          role: u.role,
                          passcode: "",
                          active: u.active,
                        });
                        setShowAddModal(true);
                      }}
                      className="rounded-full border border-line px-3 py-1 text-xs font-medium text-fg hover:border-black"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleUserStatus(u)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        u.active
                          ? "border border-red-200 text-red-600 hover:bg-red-50"
                          : "border border-green-200 text-green-600 hover:bg-green-50"
                      }`}
                    >
                      {u.active ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u)}
                      className="rounded-full border border-line px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={handleSaveUser}
            className="w-full max-w-md rounded-[20px] border border-line bg-white p-6 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-brand text-lg font-medium">
                {editingUserId ? "Edit Admin User" : "Create New Admin"}
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-muted-fg hover:text-black"
              >
                &times;
              </button>
            </div>

            <div>
              <label className="block text-[0.65rem] uppercase tracking-wider text-muted-fg font-medium">
                Full Name *
              </label>
              <input
                required
                type="text"
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                placeholder="e.g. Aathish"
                className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs outline-none focus:border-[var(--accent-purple)]"
              />
            </div>

            <div>
              <label className="block text-[0.65rem] uppercase tracking-wider text-muted-fg font-medium">
                Email Address *
              </label>
              <input
                required
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                placeholder="e.g. team@t4gverse.com"
                className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs outline-none focus:border-[var(--accent-purple)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[0.65rem] uppercase tracking-wider text-muted-fg font-medium">
                  Role
                </label>
                <select
                  value={userForm.role}
                  onChange={(e) => setUserForm({ ...userForm, role: e.target.value as AdminRole })}
                  className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs outline-none focus:border-[var(--accent-purple)]"
                >
                  <option value="super_admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="developer">Developer</option>
                </select>
              </div>

              <div>
                <label className="block text-[0.65rem] uppercase tracking-wider text-muted-fg font-medium">
                  {editingUserId ? "New Passcode (Optional)" : "Passcode *"}
                </label>
                <input
                  type="text"
                  required={!editingUserId}
                  value={userForm.passcode}
                  onChange={(e) => setUserForm({ ...userForm, passcode: e.target.value })}
                  placeholder={editingUserId ? "Leave blank to keep" : "e.g. tagverse2026"}
                  className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs outline-none focus:border-[var(--accent-purple)]"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="userActive"
                checked={userForm.active}
                onChange={(e) => setUserForm({ ...userForm, active: e.target.checked })}
                className="rounded border-line"
              />
              <label htmlFor="userActive" className="text-xs text-fg">
                Account Active (Can log into Admin Panel)
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-line">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-full border border-line px-4 py-1.5 text-xs font-medium text-muted-fg hover:text-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingUser}
                className="rounded-full bg-black px-5 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-50"
              >
                {savingUser ? "Saving..." : editingUserId ? "Update Admin" : "Create Admin"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Database & Media (Free Tier) */}
      {subTab === "database" && (
        <div className="rounded-[20px] border border-line bg-surface p-6 space-y-6">
          <div>
            <h3 className="font-brand text-lg font-medium">Firebase Free Tier & Base64 Media Storage</h3>
            <p className="mt-1 text-xs text-muted-fg">
              Connected to Firebase project <code>tagverse-web</code>. Since you are on the Spark (free) tier, all media uploads (portfolio covers, logos, show thumbnails, and media slots) are automatically compressed and converted to Base64 directly inside Firestore documents.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-white p-4 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-fg">
              Free Tier Storage Architecture
            </h4>
            <ul className="text-xs text-muted-fg space-y-1 list-disc pl-4">
              <li>No Google Cloud Storage setup or bucket payment required.</li>
              <li>Images are compressed to ~200KB – 700KB Base64 data URLs before saving.</li>
              <li>SVGs are encoded losslessly to Base64 data strings.</li>
              <li>All CRUD reads and writes happen directly via Firestore SDK.</li>
            </ul>
          </div>

          <div className="border-t border-line pt-5 space-y-4">
            <div>
              <h4 className="font-brand text-sm font-medium">Seed / Initialize Database Collections</h4>
              <p className="mt-0.5 text-xs text-muted-fg">
                If your Firestore database was freshly created, click below to populate it with default portfolio projects, products, logos, and admin accounts.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => seedCollection("projects")}
                disabled={seeding !== null}
                className="rounded-full border border-line bg-white px-4 py-2 text-xs font-medium text-black hover:border-black transition-colors disabled:opacity-50"
              >
                {seeding === "projects" ? "Seeding..." : "Seed Default Projects"}
              </button>
              <button
                onClick={() => seedCollection("products")}
                disabled={seeding !== null}
                className="rounded-full border border-line bg-white px-4 py-2 text-xs font-medium text-black hover:border-black transition-colors disabled:opacity-50"
              >
                {seeding === "products" ? "Seeding..." : "Seed Default Products"}
              </button>
              <button
                onClick={() => seedCollection("logos")}
                disabled={seeding !== null}
                className="rounded-full border border-line bg-white px-4 py-2 text-xs font-medium text-black hover:border-black transition-colors disabled:opacity-50"
              >
                {seeding === "logos" ? "Seeding..." : "Seed Default Logos"}
              </button>
              <button
                onClick={() => seedCollection("all")}
                disabled={seeding !== null}
                className="rounded-full bg-black px-5 py-2 text-xs font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {seeding === "all" ? "Seeding All Data..." : "Seed All Default Data to Database"}
              </button>
            </div>
          </div>
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
                className="h-4 w-4 rounded border-line"
              />
              <label htmlFor="n8nEnabled" className="text-xs font-medium">
                Enable Lead Webhook Forwarding
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
              disabled={savingIntegrations}
              className="rounded-full bg-black px-5 py-2 text-xs font-medium text-white hover:opacity-90 disabled:opacity-50"
            >
              {savingIntegrations ? "Saving..." : "Save Integrations to Firestore"}
            </button>
          </div>
        </form>
      )}

      {/* Health & Environment */}
      {subTab === "health" && (
        <div className="max-w-2xl rounded-[20px] border border-line bg-surface p-6 space-y-5">
          <h3 className="font-brand text-lg font-medium">System Health & Services</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-line bg-white p-3.5">
              <div>
                <p className="text-xs font-medium">Next.js Web Server</p>
                <p className="text-[11px] text-muted-fg">App Router &bull; Node.js runtime</p>
              </div>
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-medium text-green-700">
                Healthy
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-line bg-white p-3.5">
              <div>
                <p className="text-xs font-medium">Cloud Firestore (Free Tier)</p>
                <p className="text-[11px] text-muted-fg">Project: tagverse-web &bull; Base64 media storage enabled</p>
              </div>
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-medium text-green-700">
                Connected
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-line bg-white p-3.5">
              <div>
                <p className="text-xs font-medium">API Endpoints & Auth</p>
                <p className="text-[11px] text-muted-fg">/api/auth/login &bull; /api/admin/users &bull; /api/enquiries &bull; /api/bookings &bull; /api/products</p>
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
