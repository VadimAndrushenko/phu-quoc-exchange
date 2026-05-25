"use client";

import { useEffect, useRef, useState } from "react";

export function useCenterActiveCard<T extends HTMLElement>(
  enabledQuery = "(max-width: 639px)",
  threshold = 180
) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const itemRefs = useRef<Array<T | null>>([]);

  const setItemRef = (index: number) => (el: T | null) => {
    itemRefs.current[index] = el;
  };

  useEffect(() => {
    const media = window.matchMedia(enabledQuery);

    const updateActiveCard = () => {
      if (!media.matches) {
        setActiveIndex(null);
        return;
      }

      const centerY = window.innerHeight / 2;
      let closestIndex: number | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((card, index) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - centerY);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestDistance < threshold ? closestIndex : null);
    };

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActiveCard);
    };

    updateActiveCard();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveCard);

    const onMediaChange = () => updateActiveCard();
    media.addEventListener("change", onMediaChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveCard);
      media.removeEventListener("change", onMediaChange);
    };
  }, [enabledQuery, threshold]);

  return { activeIndex, setItemRef };
}