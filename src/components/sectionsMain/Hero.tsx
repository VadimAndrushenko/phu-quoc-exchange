"use client";

import { motion } from "framer-motion";
import { 
  MessageCircle,
  MoveRight,
  CircleDollarSign,
  ShieldCheck,
  CalendarDays,
  Van,
  Send,
  MessageCircleMore,
  Flame,
  ArrowRight,
  DollarSign,
  AlertTriangle,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import Form from "../ui/Form";
import Link from "next/link";
import Image from "next/image";
import type { Variants } from "framer-motion";
import { useOverlay } from "@/lib/overlay-context";
import ExchangeRates from "@/components/ui/ExchangeRates";


const benefits = [
  { icon: CircleDollarSign, title: "Выгодный курс" },
  { icon: ShieldCheck, title: "Русскоязычная поддержка" },
  { icon: CalendarDays, title: "Работаем ежедневно" },
  { icon: Van, title: "Доставка по острову" },
  { icon: MessageCircle, title: "Telegram и WhatsApp" },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: "easeOut" },
  },
};

export default function Hero() {
  const { openWhyUs, openImportant } = useOverlay();
  return (
    <section id="hero" className="relative">
      <div className="flex gap-x-20 items-center justify-between min-h-[calc(100vh-96px)] max-lg:flex-col py-5">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl max-md:w-full"
        >
          <motion.h1
            variants={item}
            className="font-extrabold uppercase leading-[0.95] tracking-tight text-7xl max-xl:text-6xl md:max-lg:text-4xl max-lg:text-[11vw]"
          >
            <span className="block text-white">Обмен валют</span>
            <span className="mt-2 block text-accent">на Фукуоке</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-2xl font-medium text-white/85 flex items-center gap-1.5 md:max-lg:text-xl"
          >
            RUB
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5B317]"></span>
            USDT
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5B317]"></span>
            USD
            <MoveRight className="text-accent" />
            VND
          </motion.p>

          <motion.p
            variants={item}
            className="mt-3 text-white lg:text-2xl flex items-center gap-1.5"
          >
            Лучшая цена, личная встреча и доставка по всему острову
          </motion.p>

          <motion.div
            variants={item}
            className="mt-6 border rounded-3xl backdrop-blur-sm border-accent/50 bg-background/9 p-4 flex items-start gap-4 max-w-xl"
          >
            <Image 
              src="/svg/fire.svg" 
              alt="fire_icon" 
              width={40} 
              height={40}
              className="shrink-0"
            />
            <div>
              <h3 className="text-accent font-extrabold uppercase tracking-wide text-lg">
                Нашли курс лучше?
              </h3>
              <p className="mt-1.5 text-white/80 text-sm leading-relaxed">
                Отправьте нам скриншот актуального предложения, и мы предложим ещё более выгодные условия обмена.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-4 flex gap-2 max-w-[576px] text-nowrap text-sm max-[400px]:text-xs"
          >
            <button
              onClick={openWhyUs}
              className="backdrop-blur-sm bg-background/9 flex-1 rounded-xl py-2.5 px-3 max-[400px]:px-1.5 font-medium border border-accent/30 hover:text-accent hover:bg-accent/10 hover:border-accent/60 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-accent" />
              Почему мы <ChevronRight className="w-4 h-4 " />
            </button>
            <button
              onClick={openImportant}
              className="backdrop-blur-sm bg-background/9 flex-1 rounded-xl py-2.5 px-3 max-[400px]:px-1.5 font-medium border border-amber-400/30 hover:text-accent hover:bg-amber-400/10 hover:border-amber-400/60 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-accent" />
              Важная информация <ChevronRight className="w-4 h-4 " />
            </button>
          </motion.div>
          
          <motion.div
            variants={container}
            className="mt-4 text-white/90 max-md:hidden"
          >
            {benefits.map((itemBenefit, i) => (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ x: 6 }}
                className="flex items-center gap-3 rounded-2xl py-3"
              >
                <itemBenefit.icon className="text-accent" strokeWidth={1.5} />
                <span>{itemBenefit.title}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={item}
            className="flex gap-3 mt-3 max-xl:flex-col"
          >
            <Link
              href="/"
              className="
                rounded-2xl py-4 px-6 text-black font-semibold relative overflow-hidden text-nowrap
                bg-[linear-gradient(90deg,#B38E35_0%,#E6BB79_40%)]
                shadow-[0_0_30px_rgba(255,223,122,0.3)]
                transition-all duration-300 hover:scale-105
                before:absolute before:top-0 before:left-[-120%]
                before:h-full before:w-[120%]
                before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent
                before:transition-all before:duration-700
                hover:before:left-[120%]
              "
            >
              Получить актуальный курс
            </Link>

          
            <Link
              href="/"
              target="_blank"
              className="
                rounded-2xl py-4 px-6 text-white font-semibold relative overflow-hidden flex items-center
                shadow-[0_8px_30px_rgba(0,0,0,0.45)]
                transition duration-500 hover:scale-105
                bg-[linear-gradient(90deg,#00334D_0%,#006699_35%,#0088cc_85%)]
                before:absolute before:top-0 before:left-[-120%]
                before:h-full before:w-[120%]
                before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent
                before:transition-all before:duration-700
                hover:before:left-[120%]
              "
            >
              <span className="flex items-center gap-4 z-10 max-sm:gap-2">
                <Send className="w-5.5" />
                Telegram
              </span>
            </Link>
          

          
            <Link
              href="/"
              target="_blank"
              className="
                rounded-2xl py-4 px-6 text-white font-semibold relative overflow-hidden flex items-center
                shadow-[0_8px_30px_rgba(0,0,0,0.45)]
                transition duration-500 hover:scale-105
                bg-[linear-gradient(90deg,#032E25_0%,#05493A_40%,#075E54_85%)]
                before:absolute before:top-0 before:left-[-120%]
                before:h-full before:w-[120%]
                before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent
                before:transition-all before:duration-700
                hover:before:left-[120%]
              "
            >
              <span className="flex items-center gap-4 z-10 max-sm:gap-2">
                <MessageCircleMore className="w-5.5" />
                WhatsApp
              </span>
            </Link>
            
          </motion.div>
          
        </motion.div>
          {/* Таблица курсов */}
        <motion.div
          variants={item}
          initial={{ opacity: 0, x: 60 }}     // старт: справа + прозрачный
          animate={{ opacity: 1, x: 0 }}      // конечное положение
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="mt-6 min-[550px]:min-w-[370px] text-nowrap max-lg:w-full rounded-[28px] border border-white/10 bg-background p-6 max-lg:p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] max-w-xl"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <h2 className="text-xl font-bold uppercase tracking-wide text-white max-[550px]:text-lg">
              КУРС НА СЕГОДНЯ
            </h2>
            <span className="text-white/60 text-sm">
              {new Date().toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <ExchangeRates />

          <p className="flex items-center justify-center gap-3 mt-3 text-xs text-white/70 ">
            <AlertTriangle className="text-accent shrink-0" />
            <span>
              <span className="text-accent">Важная информация</span>: 
              <span className="lg:block max-[550px]:block"> Курс может меняться в течение дня</span>
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}