import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { AdminRole } from "@/lib/types";

interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  permissions: string[];
}

const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  super_admin: [
    "projects:read",
    "projects:write",
    "products:read",
    "products:write",
    "enquiries:read",
    "enquiries:manage",
    "bookings:read",
    "bookings:manage",
    "crm:manage",
    "settings:manage",
    "export:data",
  ],
  admin: [
    "projects:read",
    "projects:write",
    "products:read",
    "products:write",
    "enquiries:read",
    "enquiries:manage",
    "bookings:read",
    "bookings:manage",
    "crm:manage",
  ],
  marketing: [
    "projects:read",
    "products:read",
    "enquiries:read",
    "crm:manage",
  ],
  sales: [
    "enquiries:read",
    "enquiries:manage",
    "bookings:read",
    "crm:manage",
  ],
  developer: [
    "projects:read",
    "products:read",
    "settings:manage",
  ],
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { passcode?: string; email?: string };
    const { passcode, email } = body;

    const expectedPasscode =
      process.env.ADMIN_PASSCODE ||
      process.env.NEXT_PUBLIC_ADMIN_PASSCODE ||
      "admin123";

    let sessionUser: SessionUser | null = null;

    // 1. Direct master passcode check
    if (passcode && passcode === expectedPasscode) {
      let role: AdminRole = "super_admin";
      if (email?.includes("sales")) role = "sales";
      else if (email?.includes("marketing")) role = "marketing";
      else if (email?.includes("dev")) role = "developer";

      sessionUser = {
        id: "usr_admin_master",
        name: "TAGVERSE Operations",
        email: email || "admin@t4gverse.com",
        role,
        permissions: ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.super_admin,
      };
    } else if (passcode) {
      // 2. Query Firestore admin_users collection
      try {
        const snap = await getDocs(collection(db, "admin_users"));
        const matchedDoc = snap.docs.find((d) => {
          const u = d.data();
          if (u.active === false) return false;
          if (email && email.trim()) {
            return (
              typeof u.email === "string" &&
              u.email.toLowerCase() === email.trim().toLowerCase() &&
              u.passcode === passcode
            );
          }
          return u.passcode === passcode;
        });

        if (matchedDoc) {
          const data = matchedDoc.data();
          const userRole: AdminRole =
            data.role && data.role in ROLE_PERMISSIONS
              ? (data.role as AdminRole)
              : "admin";

          sessionUser = {
            id: matchedDoc.id,
            name: typeof data.name === "string" ? data.name : "Admin",
            email: typeof data.email === "string" ? data.email : email || "admin@t4gverse.com",
            role: userRole,
            permissions: ROLE_PERMISSIONS[userRole] || ROLE_PERMISSIONS.admin,
          };

          // Update lastLogin
          try {
            await updateDoc(doc(db, "admin_users", matchedDoc.id), {
              lastLogin: new Date().toISOString(),
            });
          } catch {
            // non-fatal
          }
        }
      } catch (dbErr) {
        console.warn("Firestore admin_users verification error:", dbErr);
      }
    }

    if (!sessionUser) {
      return NextResponse.json(
        { error: "Invalid admin credentials or account is inactive." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      user: sessionUser,
    });

    // Set secure session cookie
    response.cookies.set("tv_admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
