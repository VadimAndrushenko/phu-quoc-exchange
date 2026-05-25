'use client';

import { useState } from 'react';
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
    question: "Безопасно ли обменивать деньги?",
    answer: "Да. Мы работаем только по личной встрече, все сделки конфиденциальны. Тысячи довольных клиентов. Подробности в разделе «Важная информация».",
  },
  {
    question: "Какая минимальная сумма обмена?",
    answer: "Минимальная сумма — от 5 000 RUB. Работаем с любыми суммами, но чем больше сумма — тем выгоднее курс.",
  },
  {
    question: "Сколько времени занимает обмен?",
    answer: "В среднем 15–40 минут. Всё зависит от скорости подтверждения перевода и выбранного места встречи.",
  },
  {
    question: "Работаете ли вы вечером и ночью?",
    answer: "Да, мы на связи практически круглосуточно. Лучше заранее написать, чтобы мы могли спланировать встречу.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-20 max-md:py-10">
      <div className="container">
        {/* Заголовок */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-10 h-auto text-accent max-sm:w-[6.5vw]"/>
            <span className="text-accent font-semibold tracking-widest text-lg max-sm:text-[3vw]">ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ</span>
          </div>
          <h2 className="text-4xl font-semibold uppercase tracking-wide text-white max-sm:text-[5vw]">
            У вас остались вопросы?
          </h2>
        </div>

        {/* FAQ Список */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={cn(
                  "group border rounded-3xl backdrop-blur-sm overflow-hidden transition-all duration-500",
                  // Базовые стили + hover всегда работает
                  "border-white/10 bg-background/50 hover:border-accent/40 hover:bg-background/80",
                  // При открытии — усиливаем
                  isOpen && "border-accent/50 bg-background/90"
                )}
              >
                <button
                  onClick={() => toggleFAQ(index)}
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

                  <div className="shrink-0">
                    <Plus
                      className={cn(
                        "w-6 h-6 text-accent transition-all duration-500",
                        isOpen ? "rotate-45 scale-110" : "group-hover:rotate-12"
                      )}
                    />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-8 pb-7 pt-3 text-white/70 leading-relaxed border-t border-white/10 max-sm:text-sm">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-white/60 mt-10">
          Не нашли ответ на свой вопрос? Напишите нам в Telegram или WhatsApp
        </p>
      </div>
    </section>
  );
}