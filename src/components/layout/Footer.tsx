import Link from "next/link"
import Image from 'next/image';
import Logo from "../ui/Logo"
import FooterNavSection from "../ui/FooterNavSection"
import { MessageCircleMore, Send } from "lucide-react";

export const socialItems = [
  {
    href: "https://t.me/phuquoc_exchange",
    label: "Telegram",
    icon: "/svg/telegram.svg",
  },
  {
    href: "https://wa.me/84357662585",
    label: "Whatsapp",
    icon: "/svg/whatsapp.svg",
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: "/svg/instagram.svg",
  },
]

const footerNavSections = {
  УСЛУГИ: [
    { href: "#", label: 'RUB → VND' },
    { href: "#", label: 'USDT → VND' },
    { href: "#", label: 'USD → VND' },
    { href: "#", label: 'Доставка по Фукуоку' },
    { href: "#", label: 'Как проходит обмен' },
  ],

  ИНФОРМАЦИЯ: [
    { href: "#", label: 'Отзывы' },
    { href: "#", label: 'Блог' },
    { href: "/faq", label: 'FAQ' },
    { href: "/contacts", label: 'Контакты' },
    { href: "/about", label: 'О нас' },
  ],

  "ПРАВОВАЯ ИНФОРМАЦИЯ": [
    { href: "/privacy", label: 'Privacy Policy' },
    { href: "/terms", label: 'Terms of Use' },
    { href: "/disclaimer", label: 'Disclaimer' },
  ],
}

export default function Footer() {
  return (
    <>
      <div className="overflow-hidden rounded-t-4xl border border-white/10 mt-20 bg-background/50 backdrop-blur-sm max-md:mt-10">
        <div
          className="
            container
            flex min-h-[180px] items-center justify-center gap-x-[13vw] gap-y-5
            py-8
            max-md:flex-col
          "
        >


          {/* текст */}
          <div className="text-center ">
            <h3 className="text-[32px] sm:text-[40px] lg:text-[44px] font-semibold uppercase leading-none text-white ">
              НУЖЕН ОБМЕН?
            </h3>

            <p className="mt-3 text-[18px] sm:text-[22px] lg:text-[26px] font-semibold uppercase text-accent text-nowrap ">
              НАПИШИТЕ НАМ ПРЯМО СЕЙЧАС
            </p>

            <p className="mt-3 text-sm sm:text-base text-white/85 ">
              Быстро ответим и предложим лучший курс!
            </p>
          </div>

          {/* кнопки */}
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

          {/* мобильная адаптация */}
        </div>
      </div>

      <footer className="bg-gradient-to-b from-[#091A17] to-[#061210] text-white/90 border-t border-white/10">

        <div className="container py-12">

          <div className="flex max-xl:flex-col">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 basis-[80%]">

              {/* Brand */}
              <div className="">
                <Logo />

                <p className="mt-3 text-sm leading-6 text-white/70">
                  Лучший обмен валют на Фукуоке для туристов<br />
                  и жителей острова.
                </p>

                {/* Socials */}
                <div className="mt-7 flex items-center gap-2.5">
                  {socialItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      className="
                        group relative overflow-hidden rounded-2xl
                        border border-[#1A2725] bg-[#0C1A1C]
                        p-2 transition-all duration-500 ease-out

                        hover:-translate-y-1 hover:scale-110
                        hover:border-accent/40
                        hover:shadow-[0_0_25px_rgba(245,179,23,0.18)]
                      "
                    >
                      {/* glow */}
                      <div
                        className="
                          absolute inset-0 opacity-0 transition-opacity duration-500
                          group-hover:opacity-100
                          bg-[radial-gradient(circle_at_top,rgba(245,179,23,0.18),transparent_70%)]
                        "
                      />

                      <Image
                        src={item.icon}
                        alt={item.label}
                        width={32}
                        height={32}
                        className="
                          relative z-10 transition-all duration-500
                          group-hover:rotate-6 group-hover:scale-110
                        "
                      />
                    </Link>
                  ))}
                </div>
              </div>

              {Object.entries(footerNavSections).map(([title, items]) => (
                <FooterNavSection
                  key={title}
                  title={title}
                  items={items}
                />
              ))}
            </div>

            <div className="xl:w-px self-stretch bg-white/10 xl:mx-15 max-xl:h-px max-xl:w-full max-xl:my-15"/>

            <div className="flex flex-col min-[460px]:max-xl:items-center">
              <h4 className="font-semibold text-white mb-4 text-lg">КОНТАКТЫ</h4>
              
              <ul className="flex flex-wrap xl:flex-col gap-y-3 gap-x-5 text-sm text-white/80 max-[460px]:flex-col">
                <li className="space-y-0.5">
                  <span className="block text-white/60 text-sm">TELEGRAM</span>
                  <a 
                    href="https://t.me/phuquoc_exchange" 
                    target="_blank"
                    className="hover:text-accent hover-underline left transition-colors max-md:text-xs"
                  >
                    @phuquoc_exchange
                  </a>
                </li>
                
                <li className="space-y-0.5">
                  <span className="block text-white/60 text-sm">WHATSAPP</span>
                  <a 
                    href="https://wa.me/84357662585" 
                    target="_blank"
                    className="hover:text-accent hover-underline left transition-colors max-md:text-xs"
                  >
                    +84 35 766 2585
                  </a>
                </li >

                <li className="space-y-0.5">
                  <span className="block text-white/60 text-sm max-md:text-xs">РЕЖИМ РАБОТЫ</span>
                  <p className="text-sm">Ежедневно с 9:00 до 00:00</p>
                </li>

                <li className="space-y-0.5">
                  <span className="block text-white/60 text-sm max-md:text-xs">ЛОКАЦИЯ</span>
                  <p className="text-sm">Фукуок, Вьетнам</p>
                </li>
              </ul>
            </div>

          </div>  

          <div className="border-t border-white/10 mt-15 pt-8"/>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p className="text-center md:text-left">
              © 2026 PHU QUOC EXCHANGE. Все права защищены.
            </p>

            <div className="flex items-center flex-wrap gap-4 max-md:border-t max-md:border-white/10 max-sm:gap-2.5 text-nowrap max-sm:justify-center">
              <Link href="/about" className="hover:text-white transition-colors">О проекте</Link>
              <Link href="/contacts" className="hover:text-white transition-colors">Реклама</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
            </div>
          </div>

        </div>
      </footer>
    </>        
  )
}