import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { passcode, email } = await req.json();

    const expectedPasscode =
      process.env.ADMIN_PASSCODE ||
      process.env.NEXT_PUBLIC_ADMIN_PASSCODE ||
      "admin123";

    if (!passcode || passcode !== expectedPasscode) {
      return NextResponse.json(
        { error: "Invalid admin credentials" },
        { status: 401 }
      );
    }

    // Role detection: if email provided with marketing/sales, assign respective role, otherwise super_admin
    let role = "super_admin";
    if (email?.includes("sales")) role = "sales";
    else if (email?.includes("marketing")) role = "marketing";
    else if (email?.includes("dev")) role = "developer";

    const sessionUser = {
      id: "usr_admin_1",
      name: "TAGVERSE Operations",
      email: email || "admin@t4gverse.com",
      role,
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
    };

    const response = NextResponse.json({
      success: true,
      user: sessionUser,
    });

    // Set secure cookie
    response.cookies.set("tv_admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
