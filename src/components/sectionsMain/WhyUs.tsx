"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  TrendingUp,
  Clock3,
  Wallet,
  Truck,
  MessageCircleMore,
  Banknote,
} from "lucide-react";
import { useCenterActiveCard } from "@/hooks/useCenterActiveCard";

const items = [
  {
    title: "Обмен от 5 000 RUB",
    text: "Работаем даже с небольшими суммами и идём навстречу клиентам",
    icon: Banknote,
  },
  {
    title: "Мгновенная сделка",
    text: "Стараемся провести обмен максимально быстро",
    icon: Clock3,
  },
  {
    title: "Переводы с российских карт",
    text: "Работаем с RUB ● USDT ● USD → VND переводами",
    icon: Wallet,
  },
  {
    title: "Выгодный курс",
    text: "Чем больше сумма — тем выгоднее курс",
    icon: TrendingUp,
  },
  {
    title: "Работаем ежедневно",
    text: "Всегда на связи даже поздно вечером",
    icon: Clock3,
  },
  {
    title: "Доставка по острову",
    text: "Доставляем наличные по всему Фукуоку",
    icon: Truck,
  },
  {
    title: "Безопасность сделки",
    text: "Личная встреча и полная конфиденциальность",
    icon: ShieldCheck,
  },
  {
    title: "Telegram & WhatsApp",
    text: "Отвечаем быстро и всегда готовы помочь",
    icon: MessageCircleMore,
  },
];

export default function WhyUs() {
  const { activeIndex, setItemRef } = useCenterActiveCard<HTMLDivElement>();

  return (
    <section id="why-us" className="relative py-20 max-md:py-10">
      <div className="relative z-10">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-14 text-center"
        >
          <h2 className="text-4xl font-semibold uppercase tracking-wide text-white max-sm:text-[6vw]">
            Почему выбирают <span className="text-accent">нас?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-4 gap-5 max-xl:grid-cols-2 max-sm:grid-cols-1">
          {items.map((item, i) => {
            const Icon = item.icon;
            const isActive = activeIndex === i;
            const isLeftSide = i % 4 === 0 || i % 4 === 1;

            return (
              <motion.div
                key={item.title}
                ref={setItemRef(i)}
                initial={{
                  opacity: 0,
                  x: isLeftSide ? -90 : 90,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.06,
                }}
                className={`
                  group relative overflow-hidden rounded-3xl border
                  p-5 backdrop-blur-sm transition-all duration-500 ease-out
                  ${
                    isActive
                      ? "border-accent/40 bg-background/35 shadow-[0_0_35px_rgba(245,179,23,0.12)] -translate-y-2 scale-[1.02]"
                      : "border-white/10 bg-background/50"
                  }
                  hover:-translate-y-2 hover:scale-[1.02]
                  hover:border-accent/40 hover:bg-background/35
                  hover:shadow-[0_0_35px_rgba(245,179,23,0.12)]
                `}
              >
                <div
                  className={`
                    pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500
                    ${isActive ? "opacity-100" : "group-hover:opacity-100"}
                    bg-[radial-gradient(circle_at_top,rgba(245,179,23,0.14),transparent_70%)]
                  `}
                />

                <div
                  className={`
                    relative z-10 mb-5 flex h-16 w-16 items-center justify-center
                    rounded-2xl border transition-all duration-500 ease-out
                    ${
                      isActive
                        ? "rotate-6 scale-110 border-accent/40 bg-accent/15"
                        : "border-accent/20 bg-accent/10 group-hover:rotate-6 group-hover:scale-110 group-hover:border-accent/40 group-hover:bg-accent/15"
                    }
                  `}
                >
                  <Icon className="size-8 text-accent transition-transform duration-500 group-hover:scale-110" />
                </div>

                <div className="relative z-10">
                  <h3
                    className={`
                      mb-3 text-[17px] font-semibold transition-colors duration-300
                      ${isActive ? "text-accent" : "text-white group-hover:text-accent"}
                    `}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`
                      text-sm leading-relaxed transition-colors duration-300
                      ${
                        isActive
                          ? "text-white/75"
                          : "text-white/60 group-hover:text-white/75"
                      }
                    `}
                  >
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}