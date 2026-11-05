"use client";

import { useCallback, useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DEFAULT_PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/defaultData";
import type { Product } from "@/lib/types";

const emptyProduct: Omit<Product, "id"> = {
  name: "",
  category: "CRM Software",
  tagline: "",
  description: "",
  features: [],
  status: "live",
  demoUrl: "",
  repoUrl: "",
  img: "",
  order: 1,
};

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [editingProduct, setEditingProduct] = useState<(Omit<Product, "id"> & { id?: string }) | null>(null);
  const [featureInput, setFeatureInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, "products"));
      if (!snap.empty) {
        const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Product);
        docs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
        setProducts(docs);
        return;
      }
    } catch {
      // Fallback to server API
    }
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || DEFAULT_PRODUCTS);
    } catch {
      setProducts(DEFAULT_PRODUCTS);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name.trim()) return;

    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      });

      if (!res.ok) throw new Error("Failed to save product");

      setEditingProduct(null);
      await load();
    } catch (err: any) {
      setError(err.message || "Failed to save product");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this product entry?")) return;
    setBusy(true);
    try {
      await deleteDoc(doc(db, "products", id));
      await load();
    } catch {
      // Fallback local update
      setProducts((prev) => (prev ? prev.filter((p) => p.id !== id) : null));
    } finally {
      setBusy(false);
    }
  }

  function addFeature() {
    if (!featureInput.trim() || !editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      features: [...editingProduct.features, featureInput.trim()],
    });
    setFeatureInput("");
  }

  function removeFeature(idx: number) {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      features: editingProduct.features.filter((_, i) => i !== idx),
    });
  }

  if (!products) {
    return <div className="text-sm text-muted-fg">Loading products...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-brand text-xl font-medium tracking-tight">Products & Internal Solutions</h2>
          <p className="mt-1 text-xs text-muted-fg">
            Manage live products, prototypes, and upcoming solutions (VYRA CRM, TAGVERSE AI, Neuro Forge).
          </p>
        </div>
        {!editingProduct && (
          <button
            onClick={() => setEditingProduct({ ...emptyProduct, order: products.length + 1 })}
            className="rounded-full bg-black px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
          >
            + Add Product
          </button>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-xs text-red-700">
          {error}
        </div>
      )}

      {/* Editor Form Modal / Inline */}
      {editingProduct && (
        <form onSubmit={handleSave} className="rounded-[20px] border border-line bg-surface p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h3 className="font-brand text-lg font-medium">
              {editingProduct.id ? "Edit Product" : "New Product"}
            </h3>
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="text-xs text-muted-fg hover:text-black"
            >
              Cancel
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[0.65rem] uppercase tracking-wider text-muted-fg font-medium">
                Product Name
              </label>
              <input
                required
                type="text"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                placeholder="e.g. VYRA CRM"
                className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs outline-none focus:border-[var(--accent-purple)]"
              />
            </div>
            <div>
              <label className="block text-[0.65rem] uppercase tracking-wider text-muted-fg font-medium">
                Category
              </label>
              <select
                required
                value={editingProduct.category}
                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs outline-none focus:border-[var(--accent-purple)]"
              >
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[0.65rem] uppercase tracking-wider text-muted-fg font-medium">
                Publication Status
              </label>
              <select
                value={editingProduct.status}
                onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value as any })}
                className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs outline-none focus:border-[var(--accent-purple)]"
              >
                <option value="live">Live Product</option>
                <option value="prototype">Prototype / Beta</option>
                <option value="upcoming">Upcoming Solution</option>
              </select>
            </div>
            <div>
              <label className="block text-[0.65rem] uppercase tracking-wider text-muted-fg font-medium">
                Demo URL / Link
              </label>
              <input
                type="url"
                value={editingProduct.demoUrl || ""}
                onChange={(e) => setEditingProduct({ ...editingProduct, demoUrl: e.target.value })}
                placeholder="https://..."
                className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs outline-none focus:border-[var(--accent-purple)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[0.65rem] uppercase tracking-wider text-muted-fg font-medium">
              Tagline
            </label>
            <input
              type="text"
              value={editingProduct.tagline}
              onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
              placeholder="High-velocity pipeline management..."
              className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs outline-none focus:border-[var(--accent-purple)]"
            />
          </div>

          <div>
            <label className="block text-[0.65rem] uppercase tracking-wider text-muted-fg font-medium">
              Description
            </label>
            <textarea
              rows={3}
              value={editingProduct.description}
              onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
              className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs outline-none focus:border-[var(--accent-purple)]"
            />
          </div>

          <div>
            <label className="block text-[0.65rem] uppercase tracking-wider text-muted-fg font-medium">
              Key Features
            </label>
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="e.g. WhatsApp 2-Way Inbox"
                className="flex-1 rounded-lg border border-line bg-white px-3 py-1.5 text-xs outline-none focus:border-[var(--accent-purple)]"
              />
              <button
                type="button"
                onClick={addFeature}
                className="rounded-lg bg-black px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
              >
                Add Feature
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {editingProduct.features.map((feat, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-2.5 py-1 text-[11px]"
                >
                  {feat}
                  <button
                    type="button"
                    onClick={() => removeFeature(i)}
                    className="ml-1 text-muted-fg hover:text-red-500"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="rounded-full border border-line bg-white px-4 py-2 text-xs font-medium text-muted-fg hover:text-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="rounded-full bg-black px-5 py-2 text-xs font-medium text-white hover:opacity-90 disabled:opacity-50"
            >
              {busy ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      )}

      {/* Products Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="rounded-[20px] border border-line bg-surface p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono-g text-[0.65rem] uppercase tracking-wider text-muted-fg">
                    {p.category}
                  </span>
                  <h3 className="mt-1 font-brand text-lg font-medium">{p.name}</h3>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium capitalize ${
                    p.status === "live"
                      ? "bg-green-100 text-green-700"
                      : p.status === "prototype"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-muted-fg">{p.description}</p>

              {p.features && p.features.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.features.map((f, i) => (
                    <li key={i} className="rounded-full border border-line bg-white px-2.5 py-0.5 text-[10px] text-muted-fg">
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
              {p.demoUrl ? (
                <a
                  href={p.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[var(--accent-purple)] hover:underline"
                >
                  Visit Demo &rarr;
                </a>
              ) : (
                <span className="text-xs text-muted-fg">Internal Only</span>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingProduct(p)}
                  className="text-xs text-muted-fg hover:text-black font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
