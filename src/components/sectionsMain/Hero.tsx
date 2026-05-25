
import { 
  MessageCircle,  
  MoveRight,
  CircleDollarSign ,
  ShieldCheck ,
  CalendarDays  ,
  Van, 
  Send,
  MessageCircleMore,
} from "lucide-react"
import Form from "../ui/Form"
import ButtonContact from "../ui/ButtonContact";
import Link from 'next/link';

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
    <section id="hero">
      {/* Content */}
      <div className="py-20 flex gap-20 items-center justify-between min-h-[calc(100vh-96px)] max-md:flex-col max-md:py-10 ">
          {/* Left side */}
          <div className="max-w-2xl max-md:w-full">
            

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
            
            <p className="mt-3 text-white lg:text-2xl flex items-center gap-1.5 ">
              у нас самый выгодный курс
            </p>

            <p className="text-sm text-accent mt-3 max-w-[400px] md:max-lg:text-xs md:max-lg:max-w-[300px]">
              Наша условная акция: свяжитесь с нами и покажите, что где-то есть курс выгодней — мы сделаем обмен на +1 донг.
            </p>

            <div className="mt-4 text-white/90 max-md:hidden">
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

            <div className="flex gap-3 mt-3 max-xl:flex-col">
              <Link href="/" className="
                  rounded-2xl py-4 px-6 text-black font-semibold relative overflow-hidden text-nowrap
                  bg-[linear-gradient(90deg,#B38E35_0%,#E6BB79_40%)]
                  shadow-[0_0_30px_rgba(255,223,122,0.3)]
                  hover:scale-103 hover:before:left-[120%]
                  transition-all duration-300
                  before:absolute before:top-0 before:left-[-120%]
                  before:h-full before:w-[120%]
                  before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent
                  before:transition-all before:duration-700
              ">
                Получить актуальный курс
              </Link>
              
              <Link
                href="/"
                target="_blank"
                className={`
                  rounded-2xl py-4 px-6 text-white font-semibold relative overflow-hidden flex items-center
                  shadow-[0_8px_30px_rgba(0,0,0,0.45)]
                  hover:scale-[1.03] active:scale-95
                  before:absolute before:top-0 before:left-[-120%]
                  before:h-full before:w-[120%]
                  before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent
                  hover:before:left-[120%]
                  before:transition-all before:duration-700
                  transition duration-500
                  bg-[linear-gradient(90deg,#00334D_0%,#006699_35%,#0088cc_85%)]
                  after:absolute after:inset-0 after:-z-10
                  after:opacity-0 hover:after:opacity-100
                  after:transition-opacity after:duration-500
                  after:bg-[linear-gradient(90deg,#002233_0%,#004466_30%,#0077b3_75%,#0099dd_100%)]

                `}
              >
                <span className="flex items-center gap-4 z-10 max-sm:gap-2">
                  <Send className="w-5.5" />
                  Telegram
                </span>
              </Link>

              {/* WhatsApp */}
              <Link
                href="/"
                target="_blank"
                className={`
                  rounded-2xl py-4 px-6 text-white font-semibold relative overflow-hidden flex items-center
                  shadow-[0_8px_30px_rgba(0,0,0,0.45)]
                  hover:scale-[1.03] active:scale-95
                  before:absolute before:top-0 before:left-[-120%]
                  before:h-full before:w-[120%]
                  before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent
                  hover:before:left-[120%]
                  before:transition-all before:duration-700
                  transition duration-500
                  bg-[linear-gradient(90deg,#032E25_0%,#05493A_40%,#075E54_85%)]
                  after:absolute after:inset-0 after:-z-10
                  after:opacity-0 hover:after:opacity-100
                  after:transition-opacity after:duration-500
                  after:bg-[linear-gradient(90deg,#021F1A_0%,#033F2E_35%,#06513F_70%,#0A6B52_100%)]

                `}
              >
                <span className="flex items-center gap-4 z-10 max-sm:gap-2">
                  <MessageCircleMore className="w-5.5 " />
                  WhatsApp
                </span>
              </Link>
            </div>

          </div>

          {/* калькулятор */}
          <div
            className="w-full md:max-w-[430px] rounded-[28px] border border-white/10 bg-background p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-6 md:max-xl:max-w-[400px] md:max-lg:max-w-[350px] max-md:w-full"
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



