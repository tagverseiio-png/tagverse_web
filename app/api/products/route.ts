import { NextRequest, NextResponse } from "next/server";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DEFAULT_PRODUCTS } from "@/lib/defaultData";
import type { Product } from "@/lib/types";

let inMemoryProducts: Product[] = [...DEFAULT_PRODUCTS];

export async function GET() {
  try {
    try {
      const snap = await getDocs(collection(db, "products"));
      if (!snap.empty) {
        const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Product);
        docs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
        return NextResponse.json({ products: docs });
      }
    } catch (e) {
      console.warn("Firestore products fetch failed, using default list:", e);
    }
    return NextResponse.json({ products: inMemoryProducts });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, category, tagline, description, features, status, demoUrl, repoUrl, img, order } = body;

    if (!name || !category) {
      return NextResponse.json({ error: "Name and category are required" }, { status: 400 });
    }

    const newProduct: Omit<Product, "id"> = {
      name,
      category,
      tagline: tagline || "",
      description: description || "",
      features: Array.isArray(features) ? features : [],
      status: status || "live",
      demoUrl: demoUrl || "",
      repoUrl: repoUrl || "",
      img: img || "",
      order: typeof order === "number" ? order : inMemoryProducts.length + 1,
    };

    let docId = `prod_${Date.now()}`;
    try {
      const docRef = await addDoc(collection(db, "products"), newProduct);
      docId = docRef.id;
    } catch {
      inMemoryProducts.push({ id: docId, ...newProduct });
    }

    return NextResponse.json({ success: true, id: docId });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
