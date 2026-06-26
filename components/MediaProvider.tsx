"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MEDIA_DEFAULTS } from "@/lib/mediaSlots";

const MediaContext = createContext<Record<string, string>>({});

export function MediaProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    let active = true;
    getDocs(collection(db, "media"))
      .then((snap) => {
        if (!active) return;
        const map: Record<string, string> = {};
        snap.forEach((d) => {
          const url = (d.data() as { url?: string }).url;
          if (url) map[d.id] = url;
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
    <MediaContext.Provider value={overrides}>{children}</MediaContext.Provider>
  );
}

/** Resolve a single media slot: Firestore override if present, else the registry default. */
export function useMedia(key: string): string {
  const overrides = useContext(MediaContext);
  return overrides[key] ?? MEDIA_DEFAULTS[key] ?? "";
}

/**
 * Returns a resolver function for use inside loops (e.g. .map), where calling
 * useMedia per item would break the Rules of Hooks.
 */
export function useMediaResolver(): (key: string) => string {
  const overrides = useContext(MediaContext);
  return (key) => overrides[key] ?? MEDIA_DEFAULTS[key] ?? "";
}
