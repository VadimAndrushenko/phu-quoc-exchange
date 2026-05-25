import Image from "next/image";

import Hero from "@/components/sectionsMain/Hero";
import Steps from "@/components/sectionsMain/Steps";
import WhyUs from "@/components/sectionsMain/WhyUs";
import ImportantInfo from "@/components/sectionsMain/Important";
import FAQ from "@/components/sectionsMain/Faq";
import Reviews from "@/components/sectionsMain/Reviews";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-96px)] overflow-hidden">

      {/* задний фон - картинка */}
      <div className="fixed inset-0 -z-20 max-md:hidden">

        <Image
          src="/imagee.png"
          alt=""
          fill
          priority
          className="
            object-cover
            object-center
            select-none
          "
        />

        
        <div
          className="
            absolute inset-0
            bg-[linear-gradient(to_right,var(--background)_0%,var(--background)_35%,rgba(1,17,15,0.45)_65%,transparent_100%)]
            max-xl:bg-[linear-gradient(to_right,var(--background)_0%,var(--background)_40%,rgba(1,17,15,0.45)_75%,transparent_100%)]
          "
        />
      </div>

      {/* основной контент */}
      <main className="relative z-10 container">

        <Hero />
        <WhyUs />
        <Steps />
        <ImportantInfo />
        <Reviews/>
        <FAQ />

      </main>
    </div>
  );
}