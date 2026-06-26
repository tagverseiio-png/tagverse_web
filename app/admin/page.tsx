import type { Metadata } from "next";
import AdminPanel from "@/components/AdminPanel";

export const metadata: Metadata = {
  title: "Admin — Tagverse",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-white pb-24 pt-32 text-fg">
      <AdminPanel />
    </main>
  );
}
