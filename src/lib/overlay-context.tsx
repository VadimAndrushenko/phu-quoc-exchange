"use client";

import { createContext, useContext, useState, type ReactNode, useCallback } from "react";

type OverlayType = "why-us" | "important" | null;

interface OverlayContextType {
  activeOverlay: OverlayType;
  openWhyUs: () => void;
  openImportant: () => void;
  closeOverlay: () => void;
}

const OverlayContext = createContext<OverlayContextType | null>(null);

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null);

  const openWhyUs = useCallback(() => setActiveOverlay("why-us"), []);
  const openImportant = useCallback(() => setActiveOverlay("important"), []);
  const closeOverlay = useCallback(() => setActiveOverlay(null), []);

  return (
    <OverlayContext.Provider value={{ activeOverlay, openWhyUs, openImportant, closeOverlay }}>
      {children}
    </OverlayContext.Provider>
  );
}

export function useOverlay() {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error("useOverlay must be used within OverlayProvider");
  return ctx;
}
