"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Logo from "../ui/Logo";
import ButtonWell from "../ui/ButtonWell";
import ButtonContact from "../ui/ButtonContact";
import { motion } from "framer-motion";
import BurgerButton from "../ui/BurgerButton";
import { useOverlay } from "@/lib/overlay-context";

const menuItems: { label: string; id: string; type: "scroll" | "overlay" }[] = [
  { label: "Обмен валют", id: "hero", type: "scroll" },
  { label: "Отзывы", id: "reviews", type: "scroll" },
  { label: "Как проходит обмен", id: "steps", type: "scroll" },
  { label: "Вопросы", id: "faq", type: "scroll" },
  { label: "Почему мы", id: "why-us", type: "overlay" },
  { label: "Важная информация", id: "important", type: "overlay" },
];

export default function Header() {
  const { openWhyUs, openImportant } = useOverlay();
  const [activeId, setActiveId] = useState<string>("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      const headerOffset = 90;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      const scrollItems = menuItems.filter((item) => item.type !== "overlay");
      let currentSection = scrollItems[0].id;

      scrollItems.forEach((item) => {
        const section = document.getElementById(item.id);

        if (section && scrollPosition >= section.offsetTop) {
          currentSection = item.id;
        }
      });

      setActiveId(currentSection);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        burgerRef.current &&
        !burgerRef.current.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -100,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.9,
        ease: "easeOut",
      }}
      className="sticky top-0 z-50 border-b border-white/5 bg-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all duration-500 will-change-transform supports-[backdrop-filter]:bg-black/10"
    >
      <div className="h-23.5 flex justify-between items-center container max-[480px]:h-17.5">
        <Logo />

        <div
          ref={menuRef}
          className={cn(
            "max-xl:absolute duration-300 transition max-xl:top-full max-xl:left-0 max-xl:w-full max-xl:bg-[#071311]/95 max-xl:border-t max-xl:border-white/5 max-xl:px-6 max-xl:py-8",
            isMenuOpen
              ? "max-xl:translate-y-0 max-xl:opacity-100 visible"
              : "max-xl:-translate-y-5 max-xl:opacity-0 max-xl:pointer-events-none max-xl:-z-10"
          )}
        >
          <nav className="flex items-center max-xl:flex-col max-xl:items-start gap-y-5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.type === "overlay") {
                    if (item.id === "why-us") openWhyUs();
                    if (item.id === "important") openImportant();
                  } else {
                    scrollToSection(item.id);
                  }
                  setIsMenuOpen(false);
                }}
                className={cn(
                  "hover:text-accent hover-underline px-1.5 py-1 center text-sm text-white transition-all duration-300",
                  activeId === item.id
                    ? "text-accent hover-underline active"
                    : "hover:hover-underline hover:text-accent"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 flex xl:hidden">
            <ButtonContact className="max-xl:w-full max-xl:max-w-[280px] max-xl:text-center" />
          </div>
        </div>

        <div className="flex items-center gap-3 max-lg:gap-2">
          <ButtonWell />

          <div
            className="max-xl:hidden"
          >
            <ButtonContact />
          </div>

          <BurgerButton
            burgerRef={burgerRef}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
      </div>
    </motion.header>
  );
}