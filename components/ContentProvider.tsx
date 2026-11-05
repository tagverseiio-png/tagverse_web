"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CONTENT_DEFAULTS } from "@/lib/contentSlots";

const ContentContext = createContext<Record<string, string>>({});

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    let active = true;
    getDocs(collection(db, "content"))
      .then((snap) => {
        if (!active) return;
        const map: Record<string, string> = {};
        snap.forEach((d) => {
          const value = (d.data() as { value?: string }).value;
          if (typeof value === "string") map[d.id] = value;
        });
        setOverrides(map);
      })
      .catch(() => {
        /* fall back to defaults silently */
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <ContentContext.Provider value={overrides}>
      {children}
    </ContentContext.Provider>
  );
}

/** Resolve a single text slot: Firestore override if present, else the registry default. */
export function useContent(key: string): string {
  const overrides = useContext(ContentContext);
  return overrides[key] ?? CONTENT_DEFAULTS[key] ?? "";
}

/** Returns a resolver function for use inside loops (.map), where per-item hooks would break. */
export function useContentResolver(): (key: string) => string {
  const overrides = useContext(ContentContext);
  return (key) => overrides[key] ?? CONTENT_DEFAULTS[key] ?? "";
}
