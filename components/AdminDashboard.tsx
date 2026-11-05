"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Enquiry, StudioBooking, Project } from "@/lib/types";

export default function AdminDashboard({
  onNavigateTab,
}: {
  onNavigateTab: (tab: any) => void;
}) {
  const [enquiryCount, setEnquiryCount] = useState<number>(0);
  const [bookingCount, setBookingCount] = useState<{ total: number; pending: number; confirmed: number }>({
    total: 0,
    pending: 0,
    confirmed: 0,
  });
  const [projectCount, setProjectCount] = useState<number>(0);
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);
  const [recentBookings, setRecentBookings] = useState<StudioBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        // Enquiries
        try {
          const enqSnap = await getDocs(collection(db, "enquiries"));
          if (active) {
            const list = enqSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as Enquiry);
            list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setEnquiryCount(list.length);
            setRecentEnquiries(list.slice(0, 4));
          }
        } catch {
          // Fallback to API route
          const res = await fetch("/api/enquiries");
          const data = await res.json();
          if (active && data.enquiries) {
            setEnquiryCount(data.enquiries.length);
            setRecentEnquiries(data.enquiries.slice(0, 4));
          }
        }

        // Bookings
        try {
          const bkSnap = await getDocs(collection(db, "studioBookings"));
          if (active) {
            const list = bkSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as StudioBooking);
            list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            const pending = list.filter((b) => b.status === "pending").length;
            const confirmed = list.filter((b) => b.status === "confirmed").length;
            setBookingCount({ total: list.length, pending, confirmed });
            setRecentBookings(list.slice(0, 4));
          }
        } catch {
          const res = await fetch("/api/bookings");
          const data = await res.json();
          if (active && data.bookings) {
            const list: StudioBooking[] = data.bookings;
            const pending = list.filter((b) => b.status === "pending").length;
            const confirmed = list.filter((b) => b.status === "confirmed").length;
            setBookingCount({ total: list.length, pending, confirmed });
            setRecentBookings(list.slice(0, 4));
          }
        }

        // Projects
        try {
          const prjSnap = await getDocs(collection(db, "projects"));
          if (active) setProjectCount(prjSnap.size);
        } catch {
          setProjectCount(6);
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div className="text-sm text-muted-fg">Loading operations dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[20px] border border-line bg-surface p-6 shadow-sm">
          <p className="font-mono-g text-[0.65rem] uppercase tracking-wider text-muted-fg">Total Enquiries</p>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="font-brand text-3xl font-semibold tracking-tight">{enquiryCount}</h3>
            <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-[var(--accent-purple)]">
              Active CRM
            </span>
          </div>
          <button
            onClick={() => onNavigateTab("crm")}
            className="mt-4 text-xs font-medium text-[var(--accent-purple)] hover:underline"
          >
            View CRM Pipeline &rarr;
          </button>
        </div>

        <div className="rounded-[20px] border border-line bg-surface p-6 shadow-sm">
          <p className="font-mono-g text-[0.65rem] uppercase tracking-wider text-muted-fg">Studio Bookings</p>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="font-brand text-3xl font-semibold tracking-tight">{bookingCount.total}</h3>
            <span className="rounded-full bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-700">
              {bookingCount.pending} Pending
            </span>
          </div>
          <button
            onClick={() => onNavigateTab("studioBookings")}
            className="mt-4 text-xs font-medium text-[var(--accent-purple)] hover:underline"
          >
            Manage Bookings &rarr;
          </button>
        </div>

        <div className="rounded-[20px] border border-line bg-surface p-6 shadow-sm">
          <p className="font-mono-g text-[0.65rem] uppercase tracking-wider text-muted-fg">Confirmed Sessions</p>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="font-brand text-3xl font-semibold tracking-tight">{bookingCount.confirmed}</h3>
            <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
              Live
            </span>
          </div>
          <p className="mt-4 text-xs text-muted-fg">Chennai Podcast Studio</p>
        </div>

        <div className="rounded-[20px] border border-line bg-surface p-6 shadow-sm">
          <p className="font-mono-g text-[0.65rem] uppercase tracking-wider text-muted-fg">Showcase Projects</p>
          <div className="mt-2 flex items-baseline justify-between">
            <h3 className="font-brand text-3xl font-semibold tracking-tight">{projectCount || 6}</h3>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
              Published
            </span>
          </div>
          <button
            onClick={() => onNavigateTab("projects")}
            className="mt-4 text-xs font-medium text-[var(--accent-purple)] hover:underline"
          >
            Manage Portfolio &rarr;
          </button>
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Leads */}
        <div className="rounded-[20px] border border-line bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <h3 className="font-brand text-lg font-medium">Recent Lead Inquiries</h3>
            <button
              onClick={() => onNavigateTab("crm")}
              className="text-xs font-medium text-[var(--accent-purple)] hover:underline"
            >
              Open CRM
            </button>
          </div>
          {recentEnquiries.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-fg">No recent enquiries recorded.</p>
          ) : (
            <div className="mt-4 divide-y divide-line">
              {recentEnquiries.map((e) => (
                <div key={e.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{e.name}</p>
                    <p className="text-xs text-muted-fg">{e.email} &bull; {e.service || "General"}</p>
                  </div>
                  <span className="font-mono-g text-[0.65rem] text-muted-fg">
                    {new Date(e.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Studio Bookings */}
        <div className="rounded-[20px] border border-line bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <h3 className="font-brand text-lg font-medium">Recent Studio Bookings</h3>
            <button
              onClick={() => onNavigateTab("studioBookings")}
              className="text-xs font-medium text-[var(--accent-purple)] hover:underline"
            >
              All Bookings
            </button>
          </div>
          {recentBookings.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-fg">No recent bookings recorded.</p>
          ) : (
            <div className="mt-4 divide-y divide-line">
              {recentBookings.map((b) => (
                <div key={b.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{b.name}</p>
                    <p className="text-xs text-muted-fg">{b.date} &bull; {b.time}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                      b.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : b.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
