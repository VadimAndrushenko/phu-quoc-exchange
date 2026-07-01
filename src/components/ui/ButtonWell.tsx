'use client'

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Rates } from "@/shared/data/exchangeRate.data";
import ExchangeRates from "@/components/ui/ExchangeRates";

export default function RatesButton() {
    const [open, setOpen] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null)




    
    useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    wrapperRef.current &&
                    !wrapperRef.current.contains(event.target as Node)
                ) {
                    setOpen(false)
                }
            }

            document.addEventListener("click", handleClickOutside)

            return () => {
                document.removeEventListener("click", handleClickOutside)
            }
    }, [])

    return (
        <div className="min-[480px]:relative" ref={wrapperRef}>

            {/* BUTTON */}
            <button
                onClick={() => setOpen((open) => !open)}
                className={`
                    group
                    relative overflow-hidden

                    h-[64px]
                    px-4

                    rounded-2xl text-nowrap

                    bg-black/40
                    backdrop-blur-sm

                    border border-white/10
                    ${open ? "border-yellow-400/30 scale-[1.03]" : "hover:border-yellow-400/30 hover:scale-[1.03]"}
                    

                    shadow-[0_10px_40px_rgba(0,0,0,0.45)]

                    transition-all duration-300
                    

                    flex items-center gap-3

                    max-lg:h-13 max-sm:h-10.5 max-sm:gap-1.5 max-sm:px-2
                    
                `}
            >

                {/* GOLD GLOW */}
                <div className={`
                    absolute inset-0 opacity-0
                    ${open ? "opacity-100" : "group-hover:opacity-100"} 
                    transition-opacity duration-500
                    bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.12),transparent_70%)]
                `}/>

                {/* LIVE DOT */}
                <div className="relative flex items-center justify-center">

                    <div className="
                        absolute
                        w-3 aspect-square
                        rounded-full
                        bg-green-400
                        animate-ping
                        max-sm:w-2.5
                    "/>

                    <div className="
                        relative
                        w-3 aspect-square
                        rounded-full
                        bg-green-400
                        max-sm:w-2.5
                    "/>

                </div>

                 {/* TEXT */}
                <div className="flex flex-col items-start leading-none  text-[14px] max-lg:text-[12px] ">

                    <span className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5 max-sm:text-[8.5px]">
                        Live Rate
                    </span>

                    <div className="flex items-center gap-2">

                        <span className="text-white font-semibold">
                            RUB → VND
                        </span>

                        <span className="text-yellow-400 font-bold max-md:hidden">
                            {Rates.RUB.VND}
                        </span>

                    </div>

                </div>

                {/* ARROW */}
                <ChevronDown
                    className={cn(
                        "text-white/40 transition-transform duration-300 w-[18px] ",
                        open && "rotate-180"
                    )}
                />

            </button>

            {/* POPUP */}
            <div
                className={cn(
                    `
                        absolute min-[480px]:right-0 top-[115%]
                        w-[320px]

                        max-[480px]:left-1/2 max-[480px]:-translate-x-1/2  max-[480]:top-[px]

                        rounded-3xl
                        overflow-hidden

                        bg-[#071212]/95
                        backdrop-blur-sm

                        border border-white/10

                        shadow-[0_30px_80px_rgba(0,0,0,0.55)]

                        p-4

                        transition-all duration-300 origin-top

                    `,
                    open
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                )}
            >

                {/* BACKGROUND GLOW */}
                <div className="
                    absolute inset-0
                    bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.08),transparent_35%)]
                "/>

                <div className="relative space-y-3">
                    <ExchangeRates compact />

                    <p className="flex items-center justify-center gap-3 text-xs text-white/70">
                        <AlertTriangle className="text-accent shrink-0"/>
                        <span>
                            <span className="text-accent">Важная информация</span>: курс часто меняется чтобы получить актуальный курус свяжитесь с нами
                        </span>
                    </p>
                </div>

            </div>

        </div>
    )
}