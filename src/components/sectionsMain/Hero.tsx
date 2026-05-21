
import Link from "next/link"
import { 
  ArrowRight, 
  MessageCircle, 
  Send, 
  MoveRight,
  CircleDollarSign ,
  ShieldCheck ,
  CalendarDays  ,
  Van ,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Form from "../ui/Form"

type ExchangeHeroProps = {
  className?: string
}



const benefits = [
  {
    icon: CircleDollarSign,
    title: "Выгодный курс",
  },
  {
    icon: ShieldCheck    ,
    title: "Русскоязычная поддержка",
  },
  {
    icon: CalendarDays  ,
    title: "Работаем ежедневно",
  },
  {
    icon: Van ,
    title: "Доставка по острову",
  },
  {
    icon: MessageCircle,
    title: "Telegram и WhatsApp",
  },
];

export default function Hero({
  className,
}: ExchangeHeroProps) {
  return (
    <section
    >
      {/* Content */}
      <div className="py-20 flex gap-10 items-center justify-between min-h-[calc(100vh-94px)] max-md:flex-col max-md:py-10">
          {/* Left side */}
          <div className="md:max-w-2xl max-md:w-full">
            

            <h1 className="font-extrabold uppercase leading-[0.95] tracking-tight text-7xl max-xl:text-6xl md:max-lg:text-4xl max-lg:text-[11vw]">
              <span className="block text-white">Обмен валют</span>
              <span className="mt-2 block text-accent">на Фукуоке</span>
            </h1>

            <p className="mt-6 text-2xl font-medium text-white/85 flex items-center gap-1.5 md:max-lg:text-xl">
              RUB
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5B317]"></span>
              USDT
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5B317]"></span>
              USD
              <MoveRight className="text-accent"/>
              VND
            </p>

            <p className="mt-3 text-white/75 lg:text-lg flex items-center gap-1.5 ">
              Быстро 
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5B317]"></span>
              Безопасно 
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5B317]"></span>
              Удобно
            </p>

            <p className="text-sm text-accent mt-3 max-w-[400px] md:max-lg:text-xs md:max-lg:max-w-[300px]">
              Наша условная акция: свяжитесь с нами и покажите, что где-то есть курс выгодней — мы сделаем обмен на +1 донг.
            </p>

            <div className="mt-8 text-white/90 max-md:hidden">
              {benefits.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl py-3 "
                >
                 <item.icon className="text-accent" strokeWidth={1.5}/>
                  <span>{item.title}</span>
                </div>
              ))}
            </div>

            {/* <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#rates"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green px-6 py-4 font-semibold text-white shadow-lg shadow-black/20 transition hover:scale-[1.01] hover:bg-green/90"
              >
                Получить курс
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="https://t.me/"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-accent/80 bg-black/20 px-6 py-4 font-semibold text-white backdrop-blur-md transition hover:bg-black/30"
              >
                <Send className="h-4 w-4" />
                Написать в Telegram
              </Link>

              <Link
                href="https://wa.me/"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#f59e0b] px-6 py-4 font-semibold text-white shadow-lg shadow-black/20 transition hover:scale-[1.01] hover:bg-[#f59e0b]/90"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Link>
            </div> */}
          </div>

          {/* калькулятор */}
          <div
            className="w-full md:max-w-[430px] rounded-[28px] border border-white/10 bg-background p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6 md:max-xl:max-w-[400px] md:max-lg:max-w-[350px] max-md:w-full"
          >
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-2 mb-2">
              <div>
                <h2 className="text-xl font-bold uppercase tracking-wide">
                  Обмен по выгодному курсу
                </h2>
              </div>
            </div>

            <Form/>
            
          </div>

          
        </div>
    </section>
  )
}



