'use client'

import { Send, MessageCircleMore, } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";


export default function ButtonContact() {
    const [connectionOpen, setConnectionOpen] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setConnectionOpen(false)
            }
        }

        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    return (
        <div ref={wrapperRef} className="relative">
            <button
                onClick={() => setConnectionOpen(!connectionOpen)}
                className={cn(
                    `
                    rounded-2xl py-5 px-10 text-black font-semibold relative overflow-hidden text-nowrap
                    bg-[linear-gradient(90deg,#B38E35_0%,#E6BB79_40%)]
                    shadow-[0_0_30px_rgba(255,223,122,0.3)]
                    transition-all duration-300
                    before:absolute before:top-0 before:left-[-120%]
                    before:h-full before:w-[120%]
                    before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent
                    before:transition-all before:duration-700

                    max-lg:px-5 max-lg:py-3 max-lg:text-sm max-lg:min-h-[50px]
                    max-sm:text-[11px] max-sm:px-3 max-sm:min-h-10.5
                    max-[480px]:!text-[9px] max-[480px]:!px-1.5 max-[480px]:!min-h-[35px]
                    `,
                    
                    connectionOpen
                        ? "scale-105 before:left-[120%]"
                        : "hover:scale-105 hover:before:left-[120%]"
                )}
            >
                Связаться с нами
            </button>

        <div className={
            cn(
                "absolute z-10 right-0 -z-10 -top-2 mt-5 flex flex-col gap-3 w-full transition duration-500",
                connectionOpen ? "" : " opacity-0"
            )}
        >
            {[
            { 
                label: "Telegram", 
                icon: Send, 
                href: "/",
            },
            { 
                label: "WhatsApp", 
                icon: MessageCircleMore, 
                href: "/",
            }
            ].map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    className={cn(
                        `
                            rounded-2xl py-4 px-10 text-white font-semibold relative overflow-hidden flex items-center
                            shadow-[0_8px_30px_rgba(0,0,0,0.45)]
                            hover:scale-[1.03] active:scale-95
                            before:absolute before:top-0 before:left-[-120%]
                            before:h-full before:w-[120%]
                            before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent
                            hover:before:left-[120%]
                            before:transition-all before:duration-700
                            transition duration-500
                            max-lg:px-5 max-lg:py-3 max-lg:text-sm max-lg:min-h-[50px]
                            max-sm:text-[11px] max-sm:px-3 max-sm:min-h-[40px] max-sm:py-0 
                            max-[480px]:!text-[10px] max-[480px]:!min-h-[35px]
                        `,
                        
                        item.label === 'Telegram' 
                            ? 
                                `
                                    ${connectionOpen ? "translate-y-[120%] max-lg:translate-y-[100%] max-[480px]:!translate-y-[90%]" : "opacity-0"}

                                    relative overflow-hidden

                                    bg-[linear-gradient(90deg,#00334D_0%,#006699_35%,#0088cc_85%)]

                                    after:absolute after:inset-0
                                    after:-z-10

                                    after:opacity-0
                                    hover:after:opacity-100

                                    after:transition-opacity after:duration-500

                                    after:bg-[linear-gradient(90deg,#002233_0%,#004466_30%,#0077b3_75%,#0099dd_100%)]
                                `
                            : 
                                `
                                    ${connectionOpen ? "translate-y-[240%] max-lg:translate-y-[230%] max-sm:translate-y-[260%] " : "opacity-0"}

                                    bottom-[68px]
                                    -z-10 

                                    relative overflow-hidden

                                    bg-[linear-gradient(90deg,#032E25_0%,#05493A_40%,#075E54_85%)]

                                    after:absolute after:inset-0
                                    after:-z-10

                                    after:opacity-0
                                    hover:after:opacity-100

                                    after:transition-opacity after:duration-500

                                    after:bg-[linear-gradient(90deg,#021F1A_0%,#033F2E_35%,#06513F_70%,#0A6B52_100%)]
                                `
                    
                    )}
                >
                    <span className="flex items-center gap-4 z-10 max-sm:gap-2 " >
                        <item.icon className="w-5.5 max-sm:w-4 max-[480px]:!w-3" />
                        {item.label}
                    </span>
                </Link>
            ))}
            </div>
        </div>
    )
}