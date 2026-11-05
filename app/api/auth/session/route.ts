import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get("tv_admin_session");
  const isAuthenticated = sessionCookie?.value === "authenticated";

  if (!isAuthenticated) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: "usr_admin_1",
      name: "TAGVERSE Operations",
      email: "admin@t4gverse.com",
      role: "super_admin",
      permissions: [
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
    },
  });
}
