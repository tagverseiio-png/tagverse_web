import { NextRequest, NextResponse } from "next/server";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { StudioBooking } from "@/lib/types";

const inMemoryBookings: StudioBooking[] = [];

// Helper to construct Google Calendar event URL
function createGoogleCalendarUrl(booking: {
  date: string;
  time: string;
  services: string[];
  name: string;
}) {
  const [startHourStr] = booking.time.split(" – ");
  let startHour = 9;
  let endHour = 12;
  if (startHourStr.includes("1 PM")) {
    startHour = 13;
    endHour = 16;
  } else if (startHourStr.includes("5 PM")) {
    startHour = 17;
    endHour = 20;
  }

  const cleanDate = booking.date.replace(/-/g, "");
  const startIso = `${cleanDate}T${String(startHour).padStart(2, "0")}0000Z`;
  const endIso = `${cleanDate}T${String(endHour).padStart(2, "0")}0000Z`;

  const title = encodeURIComponent(`Tagverse Studio Session: ${booking.services.join(", ")}`);
  const details = encodeURIComponent(`Studio session for ${booking.name}.\nTagverse Studio, Chennai.`);
  const location = encodeURIComponent("Tagverse Studio, Chennai, Tamil Nadu, India");

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, time, services, name, email, phone, notes } = body;

    if (!date || !time || !Array.isArray(services) || services.length === 0) {
      return NextResponse.json({ error: "Date, time, and at least one service are required" }, { status: 400 });
    }
    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Name, email, and phone number are required" }, { status: 400 });
    }

    // Availability re-check for double bookings
    let isAlreadyBooked = false;
    try {
      const snap = await getDocs(collection(db, "studioBookings"));
      isAlreadyBooked = snap.docs.some((d) => {
        const data = d.data();
        return data.date === date && data.time === time && data.status === "confirmed";
      });
    } catch {
      isAlreadyBooked = inMemoryBookings.some(
        (b) => b.date === date && b.time === time && b.status === "confirmed"
      );
    }

    if (isAlreadyBooked) {
      return NextResponse.json(
        { error: "This time slot is already confirmed for another booking. Please choose another time." },
        { status: 409 }
      );
    }

    const newBooking: Omit<StudioBooking, "id"> = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: String(phone).trim(),
      date,
      time,
      services,
      notes: notes ? String(notes).trim() : "",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    let docId = `bk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    try {
      const docRef = await addDoc(collection(db, "studioBookings"), newBooking);
      docId = docRef.id;
    } catch (dbErr) {
      console.warn("Firestore unavailable, storing booking in-memory:", dbErr);
      inMemoryBookings.unshift({ id: docId, ...newBooking });
    }

    const googleCalendarUrl = createGoogleCalendarUrl({
      date,
      time,
      services,
      name,
    });

    // Notify via n8n webhook if configured
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "studio.booking_requested", data: { id: docId, ...newBooking } }),
      }).catch((webhookErr) => {
        console.error("n8n studio booking webhook error:", webhookErr);
      });
    }

    return NextResponse.json({
      success: true,
      id: docId,
      googleCalendarUrl,
    });
  } catch (err: any) {
    console.error("Studio booking API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");

    try {
      const snap = await getDocs(collection(db, "studioBookings"));
      let docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as StudioBooking);
      if (dateParam) {
        docs = docs.filter((b) => b.date === dateParam);
      }
      return NextResponse.json({ bookings: docs });
    } catch {
      let docs = inMemoryBookings;
      if (dateParam) {
        docs = docs.filter((b) => b.date === dateParam);
      }
      return NextResponse.json({ bookings: docs });
    }
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
