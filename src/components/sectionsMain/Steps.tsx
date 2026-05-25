"use client";

import {
  MessageCircleMore,
  BadgeDollarSign,
  ArrowRightLeft,
  Wallet,
} from "lucide-react";
import { useCenterActiveCard } from "@/hooks/useCenterActiveCard";

const steps = [
  {
    id: "1",
    title: "Напишите нам",
    text: "Свяжитесь с нами удобным способом: Telegram, WhatsApp или через форму",
    icon: MessageCircleMore,
  },
  {
    id: "2",
    title: "Обсуждаем все детали",
    text: "Получаете актуальный курс и обсуждаете детали сделки",
    icon: BadgeDollarSign,
  },
  {
    id: "3",
    title: "Делаете перевод",
    text: "Переводите RUB или USDT любым удобным способом",
    icon: ArrowRightLeft,
  },
  {
    id: "4",
    title: "Получаете наличные",
    text: "Доставляем деньги лично или встречаемся в удобном месте",
    icon: Wallet,
  },
];

export default function Steps() {
  const { activeIndex, setItemRef } = useCenterActiveCard<HTMLDivElement>();

  return (
    <section id="steps" className="relative py-20 max-md:py-10">
      <div className="relative z-10">
        <h2 className="mb-14 text-center text-4xl font-semibold uppercase tracking-wide text-white max-sm:text-[6vw]">
          Как проходит <span className="text-accent">обмен?</span>
        </h2>

        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = activeIndex === i;

            return (
              <div
                key={step.id}
                ref={setItemRef(i)}
                className={`
                  group relative overflow-hidden rounded-3xl border
                  px-4 py-7 backdrop-blur-sm transition-all duration-500 ease-out
                  ${
                    isActive
                      ? "border-accent/40 bg-background/35 shadow-[0_0_40px_rgba(245,179,23,0.14)] -translate-y-2 scale-[1.02]"
                      : "border-white/10 bg-background/50"
                  }
                  hover:-translate-y-2 hover:scale-[1.02]
                  hover:border-accent/40 hover:bg-background/35
                  hover:shadow-[0_0_40px_rgba(245,179,23,0.14)]
                `}
              >
                <div
                  className={`
                    pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500
                    ${isActive ? "opacity-100" : "group-hover:opacity-100"}
                    bg-[radial-gradient(circle_at_top,rgba(245,179,23,0.16),transparent_70%)]
                  `}
                />

                <div className="relative z-10 mb-5 flex items-center gap-3">
                  <span
                    className={`
                      flex aspect-square w-8 shrink-0 items-center justify-center
                      rounded-full border text-lg font-semibold transition-all duration-500
                      ${
                        isActive
                          ? "border-accent bg-accent/10 text-accent scale-110"
                          : "border-accent text-accent group-hover:scale-110 group-hover:bg-accent/10"
                      }
                    `}
                  >
                    {step.id}
                  </span>

                  <h3
                    className={`
                      text-lg font-semibold transition-colors duration-300
                      ${isActive ? "text-accent" : "text-white group-hover:text-accent"}
                    `}
                  >
                    {step.title}
                  </h3>
                </div>

                <div className="relative z-10 flex items-center gap-4">
                  <div
                    className={`
                      flex h-12 w-12 shrink-0 items-center justify-center
                      rounded-2xl border transition-all duration-500
                      ${
                        isActive
                          ? "rotate-6 scale-110 border-accent/40 bg-accent/10"
                          : "border-accent/20 bg-accent/5 group-hover:rotate-6 group-hover:scale-110 group-hover:border-accent/40 group-hover:bg-accent/10"
                      }
                    `}
                  >
                    <Icon className="size-7 text-accent transition-transform duration-500 group-hover:scale-110" />
                  </div>

                  <p
                    className={`
                      text-sm leading-relaxed transition-colors duration-300
                      ${
                        isActive
                          ? "text-white/80"
                          : "text-white/60 group-hover:text-white/80"
                      }
                    `}
                  >
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}