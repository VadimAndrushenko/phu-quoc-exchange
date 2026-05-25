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
} from "lucide-react";
import Form from "../ui/Form";
import Link from "next/link";
import type { Variants } from "framer-motion";


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
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section id="hero" className="relative">
      <div className="py-20 flex gap-20 items-center justify-between min-h-[calc(100vh-96px)] max-md:flex-col max-md:py-10">
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
            у нас самый выгодный курс
          </motion.p>

          <motion.p
            variants={item}
            className="text-sm text-accent mt-3 max-w-[400px] md:max-lg:text-xs md:max-lg:max-w-[300px]"
          >
            Наша условная акция: свяжитесь с нами и покажите, что где-то есть курс выгодней — мы сделаем обмен на +1 донг.
          </motion.p>

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

        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.96, filter: "blur(12px)" }}
          animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="w-full md:max-w-[430px] rounded-[28px] border border-white/10 bg-background p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-6 md:max-xl:max-w-[400px] md:max-lg:max-w-[350px] max-md:w-full"
        >
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-2 mb-2">
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wide">
                Обмен по выгодному курсу
              </h2>
            </div>
          </div>

          <Form />
        </motion.div>
      </div>
    </section>
  );
}