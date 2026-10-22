"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Clock3, Gift, Flame } from "lucide-react";

const contentVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const imageVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function SpecialOffer() {
  return (
    <section className="bg-white px-4 py-8 dark:bg-[#0B1120] sm:px-6 sm:py-10 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#E63946] via-[#D62828] to-[#F97316] shadow-2xl shadow-[#E63946]/20"
      >
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
        </div>

        <div className="relative grid min-h-[440px] items-center lg:grid-cols-[1.05fr_0.95fr]">
          {/* Content */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-10 px-7 py-10 text-center sm:px-12 sm:py-14 lg:px-16 lg:py-16 lg:text-left"
          >
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md">
              <Flame size={15} className="text-yellow-300 fill-yellow-300" />
              <span>Mega Pizza Bundle</span>
            </div>

            {/* Heading */}
            <h2 className="max-w-xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Buy 2 Large,
              <br />
              <span className="text-yellow-300">
                Get 1 Small FREE!
              </span>
            </h2>

            {/* Price */}
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
                  Total Bundle Price
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white sm:text-5xl">
                    ৳999
                  </span>
                  <span className="text-lg font-medium text-white/60 line-through">
                    ৳1550
                  </span>
                </div>
              </div>

              <div className="hidden h-12 w-px bg-white/20 sm:block" />

              {/* Free Item Box */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 rounded-2xl border border-white/25 bg-white/15 px-4 py-3 backdrop-blur-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-[#E63946] shadow-md">
                  <Gift size={20} />
                </div>

                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-yellow-300">
                    SPECIAL GIFT
                  </p>
                  <p className="text-sm font-extrabold text-white">
                    1 Small Pizza Free
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-white/80 lg:mx-0">
              Order any 2 delicious large pizzas and get 1 small pizza absolutely free. The ultimate feast for family and friends!
            </p>

            {/* CTA Button */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-center">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  href="/offers"
                  className="group inline-flex items-center gap-2.5 rounded-2xl bg-white px-7 py-3.5 text-sm font-extrabold text-[#E63946] shadow-xl transition-all duration-300 hover:bg-yellow-300 hover:text-[#B7091B] hover:shadow-2xl"
                >
                  <span>Grab the Deal</span>
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>

              <div className="flex items-center gap-2 text-xs font-semibold text-white/80">
                <Clock3 size={16} />
                <span>Limited time availability</span>
              </div>
            </div>
          </motion.div>

          {/* Pizza Bundle Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative flex min-h-[320px] items-center justify-center px-6 pb-12 sm:min-h-[380px] sm:px-10 lg:min-h-[440px] lg:px-8 lg:pb-0"
          >
            <div className="absolute h-72 w-72 rounded-full bg-yellow-400/20 blur-3xl sm:h-96 sm:w-96" />

            {/* Image container resized for 3 pizzas */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 h-[280px] w-[320px] sm:h-[360px] sm:w-[420px] lg:h-[400px] lg:w-[480px]"
            >
              <Image
                src="/offer-pizza.png"
                alt="3 Pizza Combo Special Offer"
                fill
                priority
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, 480px"
                className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]"
              />
            </motion.div>

            {/* Bottom Label */}
            <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/30 bg-black/30 px-6 py-2.5 text-xs font-bold text-white shadow-lg backdrop-blur-md lg:bottom-6">
              🍕 2 Large Pizzas + 1 Small Pizza FREE
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}