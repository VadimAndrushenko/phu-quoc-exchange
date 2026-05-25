'use client'

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Rates } from "@/shared/data/exchangeRate.data";

export default function RatesButton() {
    const [open, setOpen] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null)

    const rates = Object.entries(Rates)
        .filter(([from]) => from !== 'VND')
        .map(([from, values]) => ({
            pair: `${from} → VND`,
            value: values.VND,
            color:
                from === 'USD'
                    ? 'text-yellow-400'
                    : 'text-green-400'
        }));


    
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
                    backdrop-blur-2xl

                    border border-white/10
                    ${open ? "border-yellow-400/30 scale-[1.03]" : "hover:border-yellow-400/30 hover:scale-[1.03]"}
                    

                    shadow-[0_10px_40px_rgba(0,0,0,0.45)]

                    transition-all duration-300
                    

                    flex items-center gap-3

                    max-lg:h-13 max-sm:h-10.5 max-sm:gap-1.5 max-sm:px-2
                    max-[480px]:!px-1.5 max-[480px]:!h-[38px]
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
                        max-sm:w-2
                        max-[480px]:!w-1.5
                    "/>

                    <div className="
                        relative
                        w-3 aspect-square
                        rounded-full
                        bg-green-400
                        max-sm:w-2
                        max-[480px]:!w-1.5
                    "/>

                </div>

                {/* TEXT */}
                <div className="flex flex-col items-start leading-none  text-white text-xs uppercase tracking-wider max-sm:text-[8px] max-[480px]:!text-[6px]">
                    Live Rate
                </div>

                {/* ARROW */}
                <ChevronDown
                    className={cn(
                        "text-white/40 transition-transform duration-300 w-[18px] max-sm:w-4 max-[480px]:!w-3",
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
                        backdrop-blur-2xl

                        border border-white/10

                        shadow-[0_30px_80px_rgba(0,0,0,0.55)]

                        p-4

                        transition-all duration-300 origin-top

                        max-sm:w-[250px] max-sm:p-3
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

                    {rates.map((item) => (
                        <div
                            key={item.pair}
                            className="
                                rounded-2xl
                                bg-white/[0.03]
                                border border-white/5

                                p-4

                                flex items-center justify-between

                                hover:bg-white/[0.05]
                                transition-all duration-300

                                max-sm:text-xs max-sm:p-3
                            "
                        >

                            <div>
                                <p className="text-white font-medium">
                                    {item.pair}
                                </p>
                            </div>

                            <span className={cn(
                                "font-bold text-lg",
                                item.color
                            )}>
                                {item.value.toLocaleString()}
                            </span>

                        </div>
                    ))}
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