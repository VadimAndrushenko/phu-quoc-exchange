"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Как обменять рубли на Фукуоке?",
    answer: "Напишите нам в Telegram или WhatsApp. Мы договоримся о встрече, обсудим курс и проведём обмен. Обычно процесс занимает от 15 до 40 минут.",
  },
  {
    question: "Как обменять USDT на донги?",
    answer: "Принимаем USDT (TRC20). После получения криптовалюты на наш кошелёк сразу выдаём наличные донги. Курс всегда актуальный.",
  },
  {
    question: "Какие способы оплаты вы принимаете?",
    answer: "Принимаем: российские карты (переводы RUB), USDT (TRC20). Возможны другие варианты — уточняйте в чате.",
  },
  {
    question: "Где проходит встреча?",
    answer: "Встреча проходит в удобном для вас месте на Фукуоке (Дуонг Донг, Ан Тхой, Лонг Бич и другие районы). Также возможна доставка.",
  },
  {
    question: "Где проходит встреча?",
    answer: "Встреча проходит в удобном для вас месте на Фукуоке (Дуонг Донг, Ан Тхой, Лонг Бич и другие районы). Также возможна доставка.",
  },
  {
    question: "Где проходит встреча?",
    answer: "Встреча проходит в удобном для вас месте на Фукуоке (Дуонг Донг, Ан Тхой, Лонг Бич и другие районы). Также возможна доставка.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const itemVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? -70 : 70,
      y: 40,
    }),
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 0.1, 0.25, 1] as const, // ← Добавили "as const"
        delay: 0.15 + index * 0.14,
      },
    }),
  };

  return (
    <section id="faq" className="relative py-20 max-md:py-10">
      <div className="container">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-10 h-auto text-accent max-sm:w-[6.5vw]" />
            <span className="text-accent font-semibold tracking-widest text-lg max-sm:text-[3vw]">
              ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
            </span>
          </div>
          <h2 className="text-4xl font-semibold uppercase tracking-wide text-white max-sm:text-[5vw]">
            У вас остались вопросы?
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={itemVariants}
                layout
                className={cn(
                  "group border rounded-3xl backdrop-blur-sm overflow-hidden transition-all duration-500",
                  "border-white/10 bg-background/50 hover:border-accent/40 hover:bg-background/80",
                  isOpen && "border-accent/50 bg-background/90"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={cn(
                    "w-full px-8 py-6 flex items-center justify-between text-left transition-all duration-500 max-sm:px-6 max-sm:py-4",
                    "hover:bg-white/5",
                    isOpen && "bg-white/5"
                  )}
                >
                  <span
                    className={cn(
                      "text-lg font-medium pr-8 transition-colors max-sm:text-[3.5vw]",
                      isOpen ? "text-accent" : "group-hover:text-accent"
                    )}
                  >
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0, scale: isOpen ? 1.08 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    <Plus className="w-6 h-6 text-accent" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-7 pt-3 text-white/70 leading-relaxed border-t border-white/10 max-sm:text-sm">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}