"use client";

import { motion } from "framer-motion";
import Form from "../ui/Form";

export default function ExchangeForm() {
  return (
    <section id="exchange" className="relative py-20 max-md:py-5">
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.96, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="w-full md:max-w-[830px] rounded-[28px] border border-white/10 bg-background p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-6 max-md:w-full"
        >
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-2 mb-5">
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wide">
                РАСЧАТАТЬ ПО ВЫГОДНОМУ КУРСУ
              </h2>
            </div>
          </div>

          <Form />
        </motion.div>
      </div>
    </section>
  );
}
