"use client";

import { ArrowRight, CircleDollarSign, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { Rates } from "@/shared/data/exchangeRate.data";

const currencyIcons: Record<string, React.ReactNode> = {
  RUB: <span className="text-lg font-bold">₽</span>,
  USD: <DollarSign className="w-5 h-5" />,
  USDT: <CircleDollarSign className="w-5 h-5" />,
};

const currencyColors: Record<string, string> = {
  RUB: "border-[#B38E35] text-[#B38E35]",
  USDT: "border-green-400 text-green-400",
  USD: "border-[#B38E35] text-[#B38E35]",
};

const ratesData = [
  { from: "RUB", to: "VND", value: Rates.RUB.VND },
  { from: "USDT", to: "VND", value: Rates.USDT.VND },
  { from: "USD", to: "VND", value: Rates.USD.VND },
];

export default function ExchangeRates({ compact }: { compact?: boolean }) {
  return (
    <div className={compact ? "space-y-2" : "space-y-3 max-lg:flex max-lg:w-full gap-x-1.5 max-[550px]:flex-col"}>
      {ratesData.map((rate) => (
        <div
          key={rate.from}
          className={cn(
            "flex items-center justify-between rounded-2xl border border-white/5 transition-all duration-300",
            compact
              ? "gap-3 px-3 py-2.5 bg-white/[0.02] hover:bg-white/[0.04]"
              : "gap-4 p-4 bg-white/[0.02] hover:bg-white/[0.04] max-lg:w-full max-lg:h-full min-[550px]:max-lg:flex-col"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "rounded-full border-2 flex items-center justify-center",
                compact ? "w-9 h-9" : "w-11 aspect-square max-lg:w-9",
                currencyColors[rate.from]
              )}
            >
              {currencyIcons[rate.from]}
            </div>
            <span className="text-white font-semibold text-sm max-lg:text-sm">
              1 {rate.from}
            </span>
          </div>

          {!compact && (
            <ArrowRight className="text-white/40 w-5 h-5 shrink-0 min-[550px]:max-lg:hidden" />
          )}

          <span className={cn(
            "text-accent font-bold",
            compact ? "text-sm" : "text-xl max-[550px]:text-lg"
          )}>
            {rate.value.toLocaleString()} {rate.to}
          </span>
        </div>
      ))}
    </div>
  );
}
