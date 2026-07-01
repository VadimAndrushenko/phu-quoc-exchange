"use client";

import { useRef, useState, useEffect } from "react";
import { useOverlay } from "@/lib/overlay-context";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import WhyUs from "@/components/sectionsMain/WhyUs";
import ImportantInfo from "@/components/sectionsMain/Important";

export default function OverlaySections() {
  const { activeOverlay, closeOverlay } = useOverlay();
  const [scrollEl, setScrollEl] = useState<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeOverlay) {
      document.body.style.overflow = "hidden";
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeOverlay();
      };
      window.addEventListener("keydown", onKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [activeOverlay, closeOverlay]);

  return (
    <AnimatePresence>
      {activeOverlay && (
        <motion.div
          key={activeOverlay}
          ref={(node) => {
            scrollRef.current = node;
            setScrollEl(node);
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeOverlay}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 w-full max-w-6xl my-8 mx-4 max-lg:max-w-4xl max-md:max-w-full"
          >
            <button
              onClick={closeOverlay}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/80 border border-white/10 text-white/70 hover:text-white hover:bg-background transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="rounded-3xl bg-background border border-white/10 p-6 shadow-2xl max-sm:p-3">
              {activeOverlay === "why-us" && <WhyUs scrollContainer={scrollEl} />}
              {activeOverlay === "important" && <ImportantInfo scrollContainer={scrollEl} />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
