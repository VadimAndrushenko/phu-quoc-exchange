"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type ReviewItem = {
  id: string;
  name: string;
  title: string;
  text: string;
  rating?: number;
  type: "image" | "video";
  src: string;
  poster?: string;
  duration?: string;
};

const reviews: ReviewItem[] = [
  {
    id: "1",
    name: "Александр",
    title: "Отличный сервис",
    text: "Обменяли рубли на донги быстро и без проблем.",
    rating: 5,
    type: "image",
    src: "/imagee.png",
  },
  {
    id: "2",
    name: "Мария",
    title: "Лучший курс на острове",
    text: "Поддержка 24/7, всегда на связи.",
    rating: 5,
    type: "image",
    src: "/reviews/review-2.jpg",
  },
  {
    id: "3",
    name: "Telegram отзыв",
    title: "Спасибо за обмен",
    text: "Всё чётко и безопасно. Рекомендую!",
    rating: 5,
    type: "video",
    src: "/videos/example.mp4",
    poster: "/reviews/review-3.jpg",
    duration: "0:28",
  },
  {
    id: "4",
    name: "Дмитрий",
    title: "Обмен USDT на донги",
    text: "Всё прошло идеально, рекомендую.",
    rating: 5,
    type: "image",
    src: "/reviews/review-4.jpg",
  },
  {
    id: "5",
    name: "Telegram отзыв",
    title: "Быстро и удобно",
    text: "Донги получил через 20 минут после перевода.",
    rating: 5,
    type: "video",
    src: "/reviews/review-5.mp4",
    poster: "/reviews/review-5.jpg",
    duration: "0:15",
  },
  {
    id: "6",
    name: "Telegram отзыв",
    title: "Быстро и удобно",
    text: "Донги получил через 20 минут после перевода.",
    rating: 5,
    type: "video",
    src: "/reviews/review-5.mp4",
    poster: "/reviews/review-5.jpg",
    duration: "0:15",
  },
];

export default function Reviews() {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    slidesToScroll: 1,
    containScroll: false,
    dragFree: false,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section id="reviews" className="relative overflow-hidden py-20 max-md:py-10">
      <div className="px-4">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-semibold uppercase tracking-wide text-white max-sm:text-[6vw]">
            Отзывы наших <span className="text-accent">клиентов</span>
          </h2>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Предыдущий"
            className={`
              group absolute left-0 top-1/2 z-20 -translate-y-1/2
              flex h-12 w-12 items-center justify-center rounded-full
              border border-accent/20 bg-[#081714]/90 text-accent
              transition-all duration-300 ease-out
              hover:-translate-x-1 hover:scale-105 hover:border-accent/50
              hover:bg-accent/10 
              active:scale-95 active:translate-x-0
              ${!canScrollPrev ? "pointer-events-none opacity-0" : "opacity-100"}
            `}
          >
            <ChevronLeft className="size-6 transition-transform duration-300 group-hover:-translate-x-0.5 group-active:-translate-x-1" />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="Следующий"
            className={`
              group absolute right-0 top-1/2 z-20 -translate-y-1/2
              flex h-12 w-12 items-center justify-center rounded-full
              border border-accent/20 bg-[#081714]/90 text-accent
              transition-all duration-300 ease-out
              hover:translate-x-1 hover:scale-105 hover:border-accent/50
              hover:bg-accent/10
              active:scale-95 active:translate-x-0
              ${!canScrollNext ? "pointer-events-none opacity-0" : "opacity-100"}
            `}
          >
            <ChevronRight className="size-6 transition-transform duration-300 group-hover:translate-x-0.5 group-active:translate-x-1" />
          </button>

          <div className="px-14 max-md:px-0" ref={emblaRef}>
            <div className="flex gap-8">
              {reviews.map((item, i) => {
                const isActive = activeIndex === i;

                return (
                  <div
                    key={item.id}
                    className="flex-[0_0_280px] flex justify-center"
                  >
                    <article
                      className={`
                        group relative w-full overflow-hidden rounded-[26px]
                        border bg-[linear-gradient(180deg,rgba(7,22,18,0.96),rgba(2,17,15,0.98))]
                        
                        transition-all duration-500 ease-out
                        ${
                          isActive
                            ? "border-accent/30 -translate-y-2 shadow-[0_0_40px_rgba(245,179,23,0.12)]"
                            : "border-white/10 shadow-[0_14px_40px_rgba(0,0,0,0.35)] hover:shadow-[0_0_40px_rgba(245,179,23,0.12)]"
                        }
                        hover:-translate-y-2 hover:border-accent/30
                        
                      `}
                    >
                      <div
                        className={`
                          pointer-events-none absolute inset-0 transition-opacity duration-500
                          bg-[radial-gradient(circle_at_top,rgba(245,179,23,0.12),transparent_70%)]
                          ${
                            isActive
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100"
                          }
                        `}
                      />

                      <div className="p-3 pb-0">
                        <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-black/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                          <div className="relative aspect-[4/3] overflow-hidden">
                            {item.type === "image" ? (
                              <Image
                                src={item.src}
                                alt={item.name}
                                fill
                                className="
                                  object-cover
                                  transition-transform duration-700 ease-out
                                "
                              />
                            ) : (
                              <video
                                src="/videos/example.mp4"
                                poster={item.poster}
                                className="
                                  h-full w-full object-cover
                                  transition-transform duration-700 ease-out
                                "
                                controls
                                playsInline
                                preload="metadata"
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`
                          relative z-10 px-4 pb-5 pt-4 transition-transform duration-500
                          ${isActive ? "-translate-y-0.5" : "group-hover:-translate-y-0.5"}
                        `}
                      >
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div>
                            <div
                              className={`
                                text-[15px] font-semibold transition-colors duration-300
                                ${
                                  isActive
                                    ? "text-accent"
                                    : "text-white group-hover:text-accent"
                                }
                              `}
                            >
                              {item.name}
                            </div>
                            <div className="mt-0.5 text-[12px] text-white/55">
                              {item.title}
                            </div>
                          </div>

                          <div
                            className={`
                              flex items-center gap-0.5 text-accent transition-all duration-300
                              ${
                                isActive
                                  ? "scale-105"
                                  : "group-hover:scale-105"
                              }
                            `}
                          >
                            {Array.from({ length: item.rating ?? 5 }).map((_, i) => (
                              <span key={i} className="text-sm leading-none">
                                ★
                              </span>
                            ))}
                          </div>
                        </div>

                        <p
                          className={`
                            text-[13px] leading-6 transition-colors duration-300
                            ${
                              isActive
                                ? "text-white/85"
                                : "text-white/72 group-hover:text-white/85"
                            }
                          `}
                        >
                          {item.text}
                        </p>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}