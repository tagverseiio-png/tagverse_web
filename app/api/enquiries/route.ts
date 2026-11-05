import { NextRequest, NextResponse } from "next/server";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Enquiry } from "@/lib/types";

// In-memory fallback store if Firestore is unavailable or unconfigured
const inMemoryEnquiries: Enquiry[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, service, budget, timeline, utm, hp } = body;

    // Spam honeypot protection: if hidden field is filled, silently succeed
    if (hp) {
      return NextResponse.json({ success: true, id: "filtered" });
    }

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const newEnquiry: Omit<Enquiry, "id"> = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? String(phone).trim() : "",
      message: message.trim(),
      service: service || "General Enquiry",
      budget: budget || "Not specified",
      timeline: timeline || "Flexible",
      stage: "new",
      createdAt: new Date().toISOString(),
      source: "website_contact_modal",
      utm: utm || {},
    };

    let docId = `enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Save to Firestore
    try {
      const docRef = await addDoc(collection(db, "enquiries"), newEnquiry);
      docId = docRef.id;
    } catch (dbErr) {
      console.warn("Firestore unavailable, caching enquiry in-memory:", dbErr);
      inMemoryEnquiries.unshift({ id: docId, ...newEnquiry });
    }

    // Forward to n8n webhook if configured
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "lead.created", data: { id: docId, ...newEnquiry } }),
      }).catch((webhookErr) => {
        console.error("n8n webhook dispatch error:", webhookErr);
      });
    }

    return NextResponse.json({ success: true, id: docId });
  } catch (err: any) {
    console.error("Enquiry API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    try {
      const snap = await getDocs(collection(db, "enquiries"));
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Enquiry);
      docs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return NextResponse.json({ enquiries: docs });
    } catch {
      return NextResponse.json({ enquiries: inMemoryEnquiries });
    }
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}
