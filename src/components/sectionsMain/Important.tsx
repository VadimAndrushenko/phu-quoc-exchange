"use client";

import {
  ShieldCheck,
  AlertTriangle,
  Users,
  Handshake,
  PhoneCall,
  FileCheck,
  Lock,
} from "lucide-react";
import { useCenterActiveCard } from "@/hooks/useCenterActiveCard";

const infoBlocks = [
  {
    icon: ShieldCheck,
    title: "Усиленный контроль банков",
    text: "В связи с усилением контроля за банковскими переводами в России банк клиента может запросить дополнительную проверку перевода.",
    color: "text-emerald-400",
  },
  {
    icon: AlertTriangle,
    title: "Банк может запросить",
    text: "• Подтверждение перевода\n• Объяснение назначения платежа\n• Данные получателя\n• Дополнительную идентификацию",
    color: "text-amber-400",
  },
  {
    icon: Users,
    title: "Важно понимать",
    text: "Реквизиты для перевода могут принадлежать разным физическим лицам. Это нормальная практика при проведении обмена.",
    color: "text-white",
  },
  {
    icon: Handshake,
    title: "Мы не банк",
    text: "Мы не являемся банком или финансовой организацией. Мы оказываем помощь в проведении обмена RUB → VND.",
    color: "text-accent",
  },
  {
    icon: PhoneCall,
    title: "В случае проверки банком",
    text: "Мы постараемся помочь и предоставить доступную информацию. Однако мы не можем передавать паспортные и банковские данные третьих лиц.",
    color: "text-rose-400",
  },
  {
    icon: FileCheck,
    title: "Выдача средств",
    text: "Обмен считается завершённым только после получения PDF-чека / подтверждения перевода и подтверждения зачисления получателю.",
    color: "text-emerald-400",
  },
  {
    icon: Lock,
    title: "Безопасность и ответственность",
    text: "Все сделки проводятся конфиденциально. Клиент самостоятельно взаимодействует со своим банком и несёт ответственность за подтверждение операции.",
    color: "text-white",
  },
];

export default function Important() {
  const { activeIndex, setItemRef } = useCenterActiveCard<HTMLDivElement>();

  return (
    <section id="important" className="relative py-20 max-md:py-10">
      <div className="container">
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <AlertTriangle className="h-10 w-10 text-accent" />
            <span className="text-xl font-semibold tracking-widest text-accent max-sm:text-[3.5vw]">
              ВАЖНАЯ ИНФОРМАЦИЯ
            </span>
          </div>

          <h2 className="text-4xl font-semibold uppercase tracking-wide text-white max-sm:text-[6vw]">
            По переводам и банковским операциям
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-white/70 max-sm:text-[4vw]">
            Пожалуйста, внимательно ознакомьтесь с информацией перед обменом
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {infoBlocks.map((block, i) => {
            const Icon = block.icon;
            const isActive = activeIndex === i;

            return (
              <div
                key={i}
                ref={setItemRef(i)}
                className={`
                  group relative overflow-hidden rounded-3xl border
                  py-5 px-7 backdrop-blur-sm transition-all duration-500 ease-out
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

                <div
                  className={`
                    relative z-10 mb-6 flex h-16 w-16 items-center justify-center
                    rounded-2xl border bg-accent/5 transition-all duration-500 ease-out
                    ${
                      isActive
                        ? "rotate-6 scale-110 border-accent/40 bg-accent/10"
                        : "border-accent/20 group-hover:rotate-6 group-hover:scale-110 group-hover:border-accent/40 group-hover:bg-accent/10"
                    }
                  `}
                >
                  <Icon
                    className={`size-9 transition-transform duration-500 ${
                      isActive ? "scale-110" : "group-hover:scale-110"
                    } ${block.color}`}
                  />
                </div>

                <div className="relative z-10">
                  <h3
                    className={`
                      mb-4 text-xl font-semibold leading-tight transition-colors duration-300 max-sm:text-lg
                      ${
                        isActive ? "text-accent" : "text-white group-hover:text-accent"
                      }
                    `}
                  >
                    {block.title}
                  </h3>

                  <p
                    className={`
                      whitespace-pre-line leading-relaxed transition-colors duration-300 max-sm:text-sm
                      ${
                        isActive
                          ? "text-white/85"
                          : "text-white/70 group-hover:text-white/85"
                      }
                    `}
                  >
                    {block.text}
                  </p>
                </div>

                <div className="absolute bottom-0 left-7 right-7 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}