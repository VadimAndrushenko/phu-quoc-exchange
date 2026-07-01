"use client";

import { useEffect, useRef, useState } from "react";

export function useCenterActiveCard<T extends HTMLElement>(
  enabledQuery = "(max-width: 639px)",
  threshold = 180,
  scrollContainer?: HTMLElement | null
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

      const container = scrollContainer || window;
      const isWindow = container === window;
      const el = container as HTMLElement;
      const clientHeight = isWindow ? window.innerHeight : el.clientHeight;
      const centerY = isWindow ? clientHeight / 2 : el.getBoundingClientRect().top + clientHeight / 2;

      let closestIndex: number | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;
      let lastIndex = 0;

      itemRefs.current.forEach((card, index) => {
        if (!card) return;
        lastIndex = index;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - centerY);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      const isAtBottom = isWindow
        ? window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60
        : el.scrollTop + el.clientHeight >= el.scrollHeight - 60;

      if (isAtBottom) {
        for (let i = lastIndex; i >= 0; i--) {
          const card = itemRefs.current[i];
          if (card && card.getBoundingClientRect().top < clientHeight) {
            setActiveIndex(i);
            return;
          }
        }
      }

      setActiveIndex(closestDistance < threshold ? closestIndex : null);
    };

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActiveCard);
    };

    const scrollTarget = scrollContainer || window;

    updateActiveCard();
    scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveCard);

    const onMediaChange = () => updateActiveCard();
    media.addEventListener("change", onMediaChange);

    return () => {
      cancelAnimationFrame(raf);
      scrollTarget.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveCard);
      media.removeEventListener("change", onMediaChange);
    };
  }, [enabledQuery, threshold, scrollContainer]);

  return { activeIndex, setItemRef };
}