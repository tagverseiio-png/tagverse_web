import { NextRequest, NextResponse } from "next/server";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { AdminUser, AdminRole } from "@/lib/types";

export async function GET() {
  try {
    const snap = await getDocs(collection(db, "admin_users"));
    const users: AdminUser[] = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: typeof data.name === "string" ? data.name : "Admin",
        email: typeof data.email === "string" ? data.email : "",
        role: (data.role || "admin") as AdminRole,
        active: data.active !== false,
        createdAt:
          typeof data.createdAt === "string"
            ? data.createdAt
            : new Date().toISOString(),
        lastLogin: typeof data.lastLogin === "string" ? data.lastLogin : undefined,
      };
    });

    return NextResponse.json({ users });
  } catch {
    return NextResponse.json({ error: "Failed to fetch admin users" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      id?: string;
      name?: string;
      email?: string;
      role?: AdminRole;
      passcode?: string;
      active?: boolean;
    };

    const { id, name, email, role, passcode, active } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const userData: Record<string, unknown> = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: role || "admin",
      active: active !== false,
      updatedAt: new Date().toISOString(),
    };

    if (passcode && passcode.trim()) {
      userData.passcode = passcode.trim();
    }

    if (id) {
      await updateDoc(doc(db, "admin_users", id), userData);
      return NextResponse.json({ success: true, id });
    } else {
      userData.createdAt = new Date().toISOString();
      if (!passcode) {
        userData.passcode = "admin123";
      }
      const docRef = await addDoc(collection(db, "admin_users"), userData);
      return NextResponse.json({ success: true, id: docRef.id });
    }
  } catch {
    return NextResponse.json({ error: "Failed to save admin user" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await deleteDoc(doc(db, "admin_users", id));
    return NextResponse.json({ success: true, id });
  } catch {
    return NextResponse.json({ error: "Failed to delete admin user" }, { status: 500 });
  }
}
