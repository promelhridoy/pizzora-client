"use client";

import { motion, type Variants } from "framer-motion";
import {
  ShoppingBag,
  ChefHat,
  Bike,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: ShoppingBag,
    title: "Choose Your Pizza",
    desc: "Explore our delicious menu and pick the pizza that makes you hungry.",
  },
  {
    number: "02",
    icon: ChefHat,
    title: "Customize & Order",
    desc: "Choose your size, toppings, and extras, then place your order securely.",
  },
  {
    number: "03",
    icon: Bike,
    title: "Enjoy Your Pizza",
    desc: "Relax while our chefs prepare your pizza and our riders bring it to you.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const iconVariants: Variants = {
  hidden: {
    scale: 0.7,
    rotate: -15,
  },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-20 dark:bg-[#0B1120] sm:py-24">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#E63946]/5 blur-3xl dark:bg-[#E63946]/10" />

        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#F97316]/5 blur-3xl dark:bg-[#F97316]/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E63946]/10 bg-white/80 px-4 py-2 text-sm font-semibold text-[#E63946] shadow-sm backdrop-blur dark:border-[#E63946]/20 dark:bg-white/5">
            <Sparkles size={15} />

            <span>Simple & Delicious</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            How it{" "}
            <span className="bg-gradient-to-r from-[#E63946] to-[#F97316] bg-clip-text text-transparent">
              works
            </span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
            From choosing your favorite pizza to getting it at your doorstep,
            we make every step quick and effortless.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3 md:gap-8"
        >
          {/* Desktop Connecting Line */}
          <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-[76px] hidden h-px bg-gradient-to-r from-[#E63946]/20 via-[#F97316]/50 to-[#E63946]/20 md:block" />

          {STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                variants={cardVariants}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full overflow-hidden rounded-3xl border border-gray-200/70 bg-white/80 p-7 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#E63946]/20 hover:shadow-xl hover:shadow-[#E63946]/5 dark:border-white/10 dark:bg-[#111827]/80 dark:hover:border-[#E63946]/30">
                  {/* Top Gradient Glow */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#E63946] to-[#F97316] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Step Number */}
                  <div className="absolute right-5 top-5 text-4xl font-black text-gray-100 dark:text-white/[0.04]">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <motion.div
                    variants={iconVariants}
                    className="relative z-10 mb-7 flex items-center"
                  >
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E63946] to-[#F97316] text-white shadow-lg shadow-[#E63946]/20 transition-transform duration-300 group-hover:scale-105">
                      <Icon size={28} strokeWidth={2} />

                      {/* Small glow */}
                      <div className="absolute inset-0 -z-10 rounded-2xl bg-[#E63946]/30 blur-xl" />
                    </div>

                    {/* Connector dot */}
                    {index < STEPS.length - 1 && (
                      <div className="ml-5 hidden h-2 w-2 rounded-full bg-[#F97316] md:block" />
                    )}
                  </motion.div>

                  {/* Content */}
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#E63946]">
                      Step {step.number}
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom Arrow */}
                  <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors duration-300 group-hover:text-[#E63946]">
                    <span>
                      {index === 0
                        ? "Explore menu"
                        : index === 1
                          ? "Place order"
                          : "Track delivery"}
                    </span>

                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>

                  {/* Hover Glow */}
                  <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-[#E63946]/5 blur-3xl transition-all duration-500 group-hover:bg-[#E63946]/10 dark:bg-[#E63946]/10" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Fresh ingredients.{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              Hot pizza.
            </span>{" "}
            Delivered with care. 🍕
          </p>
        </motion.div>
      </div>
    </section>
  );
}
