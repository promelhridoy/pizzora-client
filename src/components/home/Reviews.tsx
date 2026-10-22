"use client";

import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";

const REVIEWS = [
  { name: "Rafiul Islam", text: "The pizza was amazing and arrived hot! Crust was perfect.", rating: 5 },
  { name: "Nusrat Jahan", text: "Loved building my own pizza. Toppings were generous.", rating: 5 },
  { name: "Tanvir Ahmed", text: "Fastest delivery I've had in Dhaka. Will order again.", rating: 4 },
];

export default function Reviews() {
  return (
    <section className="bg-white py-16 dark:bg-[#0B0F14] sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-3xl">
          What our customers say
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-gray-100 bg-[#F8FAFC] p-6 dark:border-gray-800 dark:bg-[#151B23]"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={15}
                    className={s < r.rating ? "fill-[#F97316] text-[#F97316]" : "text-gray-300 dark:text-gray-700"}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#E63946] to-[#F97316] text-sm font-bold text-white">
                  {r.name[0]}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{r.name}</span>
                  <BadgeCheck size={14} className="text-[#F97316]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}