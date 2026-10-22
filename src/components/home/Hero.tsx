"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Flame,
  ShoppingCart,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

const TRUST = [
  {
    icon: Flame,
    label: "Freshly Baked",
  },
  {
    icon: Zap,
    label: "Fast Delivery",
  },
  {
    icon: Star,
    label: "4.8 Rated",
  },
];

const FLOATING_ITEMS = [
  {
    emoji: "🍅",
    className: "-left-1 top-16 sm:left-0 sm:top-24",
    delay: 0,
    duration: 4,
  },
  {
    emoji: "🌿",
    className: "right-0 top-8 sm:right-4 sm:top-14",
    delay: 0.7,
    duration: 4.5,
  },
  {
    emoji: "🧀",
    className: "right-0 bottom-20 sm:right-2 sm:bottom-24",
    delay: 1.3,
    duration: 3.8,
  },
  {
    emoji: "🫒",
    className: "left-3 bottom-8 sm:left-10 sm:bottom-14",
    delay: 1.9,
    duration: 4.2,
  },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white dark:bg-[#0B0F14]">
      {/* ============================================================ */}
      {/* BACKGROUND GLOWS                                             */}
      {/* ============================================================ */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-52 -top-52 h-[38rem] w-[38rem] rounded-full bg-gradient-to-br from-[#E63946]/15 via-[#F97316]/10 to-transparent blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -left-52 h-[32rem] w-[32rem] rounded-full bg-[#F97316]/5 blur-3xl"
      />

      {/* Pizza glow */}
      <motion.div
        aria-hidden="true"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[5%] top-[38%] h-[22rem] w-[22rem] -translate-y-1/2 rounded-full bg-gradient-to-br from-[#F97316]/20 to-[#E63946]/5 blur-3xl sm:h-[30rem] sm:w-[30rem] lg:right-[7%] lg:top-1/2 lg:h-[34rem] lg:w-[34rem]"
      />

      {/* Decorative dots */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-[30%] h-2 w-2 rounded-full bg-[#F97316]/30"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[11%] top-[22%] h-1.5 w-1.5 rounded-full bg-[#E63946]/30"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[16%] left-[44%] h-1.5 w-1.5 rounded-full bg-[#F97316]/30"
      />

      {/* ============================================================ */}
      {/* MAIN CONTAINER                                                */}
      {/* ============================================================ */}

      <div className="relative mx-auto grid min-h-[calc(100svh-72px)] w-full max-w-7xl grid-cols-1 items-center gap-2 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-0 lg:px-8 lg:py-12">
        {/* ========================================================== */}
        {/* PIZZA — FIRST ON MOBILE                                    */}
        {/* ========================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
            x: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative order-1 mx-auto flex w-full max-w-[32rem] items-center justify-center lg:order-2 lg:max-w-none"
        >
          {/* ======================================================== */}
          {/* OUTER ROTATING RING                                      */}
          {/* ======================================================== */}

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-[18rem] w-[18rem] rounded-full border border-dashed border-[#F97316]/20 sm:h-[25rem] sm:w-[25rem] lg:h-[31rem] lg:w-[31rem]"
          />

          {/* ======================================================== */}
          {/* SECOND RING                                              */}
          {/* ======================================================== */}

          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-[20rem] w-[20rem] rounded-full border border-[#E63946]/10 sm:h-[27rem] sm:w-[27rem] lg:h-[33rem] lg:w-[33rem]"
          />

          {/* ======================================================== */}
          {/* INNER GLOW                                               */}
          {/* ======================================================== */}

          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              opacity: [0.3, 0.55, 0.3],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute h-52 w-52 rounded-full bg-gradient-to-br from-[#F97316]/25 to-[#E63946]/10 blur-2xl sm:h-72 sm:w-72 lg:h-[25rem] lg:w-[25rem]"
          />

          {/* ======================================================== */}
          {/* PIZZA IMAGE                                              */}
          {/* ======================================================== */}

          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [-1, 1, -1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.045,
              rotate: 0,
              transition: {
                duration: 0.3,
              },
            }}
            className="relative z-10 h-[20rem] w-[20rem] sm:h-[28rem] sm:w-[28rem] lg:h-[34rem] lg:w-[34rem] xl:h-[37rem] xl:w-[37rem]"
          >
            <Image
              src="/Pizza-hero.png"
              alt="Freshly baked Pizzora pizza"
              fill
              priority
              sizes="(max-width: 640px) 320px, (max-width: 1024px) 500px, 600px"
              className="object-contain drop-shadow-[0_28px_35px_rgba(0,0,0,0.18)]"
            />
          </motion.div>

          {/* ======================================================== */}
          {/* FLOATING INGREDIENTS                                     */}
          {/* ======================================================== */}

          {FLOATING_ITEMS.map((item) => (
            <motion.div
              key={item.emoji}
              animate={{
                y: [0, -14, 0],
                rotate: [0, 8, -5, 0],
              }}
              transition={{
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`absolute z-20 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/70 bg-white/90 text-xl shadow-xl backdrop-blur-md dark:border-gray-700 dark:bg-[#151B22]/90 sm:h-12 sm:w-12 sm:text-2xl ${item.className}`}
            >
              {item.emoji}
            </motion.div>
          ))}

          {/* ======================================================== */}
          {/* FRESHLY BAKED BADGE                                     */}
          {/* ======================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
              y: 10,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.9,
            }}
            className="absolute left-0 top-10 z-30 rounded-2xl border border-white/70 bg-white/90 px-3 py-2.5 shadow-xl backdrop-blur-md dark:border-gray-700 dark:bg-[#11161D]/90 sm:left-2 sm:top-14 sm:px-4 sm:py-3"
          >
            <div className="flex items-center gap-2">
              <motion.span
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="h-2.5 w-2.5 rounded-full bg-green-500"
              />

              <span className="text-[11px] font-bold text-gray-800 dark:text-gray-200 sm:text-xs">
                Freshly Baked
              </span>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* RATING CARD                                              */}
          {/* ======================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 25,
              y: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 1.05,
            }}
            className="absolute bottom-7 right-0 z-30 rounded-2xl border border-white/70 bg-white/90 px-3 py-2.5 shadow-xl backdrop-blur-md dark:border-gray-700 dark:bg-[#11161D]/90 sm:bottom-12 sm:right-2 sm:px-4 sm:py-3"
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F97316]/10 text-[#F97316] sm:h-9 sm:w-9">
                <Star size={15} fill="currentColor" />
              </span>

              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white sm:text-sm">
                  4.8/5
                </p>

                <p className="text-[10px] text-gray-500 dark:text-gray-400 sm:text-xs">
                  Loved by pizza fans
                </p>
              </div>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* SPARKLES                                                */}
          {/* ======================================================== */}

          <motion.span
            animate={{
              y: [0, -12, 0],
              opacity: [0.3, 1, 0.3],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-10 top-2 text-lg text-[#F97316] sm:right-12"
          >
            ✦
          </motion.span>

          <motion.span
            animate={{
              y: [0, 10, 0],
              opacity: [0.2, 0.9, 0.2],
              rotate: [0, -15, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-5 left-16 text-sm text-[#E63946] sm:bottom-8 sm:left-20"
          >
            ✦
          </motion.span>

          <motion.span
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
            }}
            className="absolute right-16 top-20 h-1.5 w-1.5 rounded-full bg-[#F97316] sm:right-20 sm:top-24"
          />
        </motion.div>

        {/* ========================================================== */}
        {/* LEFT CONTENT — SECOND ON MOBILE                            */}
        {/* ========================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: -45,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 order-2 lg:order-1"
        >
          {/* ======================================================== */}
          {/* HOT & FRESH BADGE                                        */}
          {/* ======================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.15,
            }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E63946]/10 bg-[#E63946]/5 px-3.5 py-1.5 text-xs font-semibold text-[#E63946] dark:border-[#F97316]/20 dark:bg-[#F97316]/10 dark:text-[#F97316] sm:mb-6 sm:px-4 sm:py-2 sm:text-sm"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm dark:bg-[#151B22]">
              <Flame size={13} />
            </span>

            <span>Hot & Fresh</span>

            <Sparkles size={13} />
          </motion.div>

          {/* ======================================================== */}
          {/* HEADING                                                  */}
          {/* ======================================================== */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.75,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-3xl text-[2.8rem] font-black leading-[0.98] tracking-[-0.045em] text-gray-950 dark:text-white sm:text-6xl lg:text-[4rem] xl:text-[4.7rem]"
          >
            Better pizza.
            <br />

            <span className="bg-gradient-to-r from-[#E63946] via-[#F4511E] to-[#F97316] bg-clip-text text-transparent">
              Happier days.
            </span>
          </motion.h1>

          {/* ======================================================== */}
          {/* DESCRIPTION                                              */}
          {/* ======================================================== */}

          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.4,
            }}
            className="mt-5 max-w-lg text-sm leading-6 text-gray-500 dark:text-gray-400 sm:mt-6 sm:text-lg sm:leading-7"
          >
            Freshly baked pizzas made with premium ingredients and delivered
            hot to your door — or built exactly your way.
          </motion.p>

          {/* ======================================================== */}
          {/* CTA BUTTONS                                               */}
          {/* ======================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.5,
            }}
            className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row"
          >
            {/* Order Now */}
            <motion.div
              whileHover={{
                scale: 1.035,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              <Link
                href="/menu"
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#E63946] to-[#F97316] px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#E63946]/20 transition-all hover:shadow-2xl hover:shadow-[#E63946]/30 sm:w-auto"
              >
                <ShoppingCart size={17} />

                <span>Order Now</span>

                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            {/* Explore Menu */}
            <motion.div
              whileHover={{
                scale: 1.035,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              <Link
                href="/menu"
                className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white/80 px-7 py-3.5 text-sm font-bold text-gray-700 backdrop-blur-sm transition-all hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-white/[0.03] dark:text-gray-200 dark:hover:border-gray-600 dark:hover:bg-white/[0.06] sm:w-auto"
              >
                <span>Explore Menu</span>

                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* ======================================================== */}
          {/* TRUST INDICATORS                                         */}
          {/* ======================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.65,
            }}
            className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 sm:mt-10 sm:gap-x-6 lg:gap-x-7"
          >
            {TRUST.map(({ icon: Icon, label }, index) => (
              <div
                key={label}
                className="flex items-center gap-2"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 bg-white text-[#F97316] shadow-sm dark:border-gray-700 dark:bg-[#11161D] sm:h-9 sm:w-9">
                  <Icon size={15} />
                </span>

                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
                  {label}
                </span>

                {index !== TRUST.length - 1 && (
                  <span className="ml-1 hidden h-5 w-px bg-gray-200 dark:bg-gray-700 sm:block" />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* BOTTOM FADE                                                  */}
      {/* ============================================================ */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-white/20 to-transparent dark:from-[#0B0F14]/20"
      />
    </section>
  );
}