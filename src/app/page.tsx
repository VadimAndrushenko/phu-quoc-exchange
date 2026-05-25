'use client';

import Image from "next/image";
import { motion } from "framer-motion";

import Hero from "@/components/sectionsMain/Hero";
import Steps from "@/components/sectionsMain/Steps";
import WhyUs from "@/components/sectionsMain/WhyUs";
import ImportantInfo from "@/components/sectionsMain/Important";
import FAQ from "@/components/sectionsMain/Faq";
import Reviews from "@/components/sectionsMain/Reviews";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-96px)] overflow-hidden">

      {/* Фон */}
      <div className="fixed inset-0 -z-20 max-md:hidden">

        {/* Картинка */}
        <Image
          src="/imagee.png"
          alt=""
          fill
          priority
          className="object-cover object-center select-none"
        />

        {/* Постоянный градиент (цель) */}
        <div
          className="
            absolute inset-0
            bg-[linear-gradient(to_right,var(--background)_0%,var(--background)_35%,rgba(1,17,15,0.45)_65%,transparent_100%)]
            max-xl:bg-[linear-gradient(to_right,var(--background)_0%,var(--background)_40%,rgba(1,17,15,0.45)_75%,transparent_100%)]
          "
        />

        {/* Анимированный overlay — полностью залитый цвет, который плавно исчезает */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ 
            duration: 2.0, 
            ease: "easeInOut",
            delay: 0.1 
          }}
          className="absolute inset-0 bg-[var(--background)]"
        />
      </div>

      {/* Основной контент */}
      <main className="relative z-10 container">
        <Hero />
        <WhyUs />
        <Steps />
        <ImportantInfo />
        <Reviews />
        <FAQ />
      </main>
    </div>
  );
}