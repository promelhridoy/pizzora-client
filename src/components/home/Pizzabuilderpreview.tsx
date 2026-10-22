"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Pizza,
  Droplet,
  Sandwich,
  Leaf,
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Pizza,
    title: "Choose Your Base",
    desc: "Start with the perfect pizza base for your creation.",
  },
  {
    number: "02",
    icon: Droplet,
    title: "Pick Your Sauce",
    desc: "Add your favorite sauce and give it the flavor you love.",
  },
  {
    number: "03",
    icon: Sandwich,
    title: "Add Cheese",
    desc: "Make your pizza creamy, cheesy, and extra delicious.",
  },
  {
    number: "04",
    icon: Leaf,
    title: "Top It Your Way",
    desc: "Finish it with fresh vegetables and your favorite toppings.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const iconVariants: Variants = {
  hidden: {
    scale: 0.7,
    rotate: -10,
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

export default function PizzaBuilderPreview() {
  return (
    <section className="relative overflow-hidden bg-white py-20 dark:bg-[#0B1120] sm:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#E63946]/5 blur-3xl dark:bg-[#E63946]/10" />

        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#F97316]/5 blur-3xl dark:bg-[#F97316]/10" />

        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-100/20 blur-3xl dark:bg-orange-500/5" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E63946]/10 bg-[#E63946]/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#E63946] dark:border-[#E63946]/20 dark:bg-[#E63946]/10">
            <Sparkles size={14} />

            <span>Made Just For You</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Create your{" "}
            <span className="bg-gradient-to-r from-[#E63946] to-[#F97316] bg-clip-text text-transparent">
              perfect pizza
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
            Your pizza should be as unique as you are. Choose your favorite
            ingredients and build a pizza made exactly your way.
          </p>
        </motion.div>

        {/* Builder Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative mx-auto mt-14 max-w-6xl"
        >
          {/* Desktop Connector */}
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-10 hidden h-px bg-gradient-to-r from-[#E63946]/20 via-[#F97316]/60 to-[#E63946]/20 lg:block" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  variants={cardVariants}
                  className="group relative"
                >
                  {/* Card */}
                  <div className="relative h-full overflow-hidden rounded-3xl border border-gray-200/70 bg-[#F8FAFC]/90 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#E63946]/20 hover:shadow-xl hover:shadow-[#E63946]/5 dark:border-white/10 dark:bg-[#111827]/80 dark:hover:border-[#E63946]/30">
                    {/* Top Gradient */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#E63946] to-[#F97316] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Number */}
                    <span className="absolute right-5 top-4 text-4xl font-black text-gray-200/70 dark:text-white/[0.04]">
                      {step.number}
                    </span>

                    {/* Icon */}
                    <motion.div
                      variants={iconVariants}
                      className="relative z-10 mb-6"
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E63946] to-[#F97316] text-white shadow-lg shadow-[#E63946]/20 transition-transform duration-300 group-hover:scale-105">
                        <Icon size={30} strokeWidth={2} />

                        <div className="absolute -z-10 h-20 w-20 rounded-2xl bg-[#E63946]/20 blur-xl" />
                      </div>
                    </motion.div>

                    {/* Step */}
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E63946]">
                      Step {step.number}
                    </p>

                    {/* Title */}
                    <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                      {step.desc}
                    </p>

                    {/* Bottom */}
                    <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-gray-400 transition-colors duration-300 group-hover:text-[#E63946]">
                      <Check size={14} />

                      <span>Ready to customize</span>
                    </div>

                    {/* Hover Glow */}
                    <div className="pointer-events-none absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-[#F97316]/5 blur-3xl transition-all duration-500 group-hover:bg-[#F97316]/15" />
                  </div>

                  {/* Mobile Arrow */}
                  {index < STEPS.length - 1 && (
                    <div className="my-2 flex justify-center text-[#F97316]/40 sm:hidden">
                      <ArrowRight size={18} className="rotate-90" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-col items-center justify-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/dashboard/pizza-builder"
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#E63946] to-[#F97316] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E63946]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#E63946]/30"
            >
              <Pizza size={18} />

              <span>Build My Pizza</span>

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          <p className="text-xs text-gray-400 dark:text-gray-500">
            Pick it. Customize it. Love it. 🍕
          </p>
        </motion.div>
      </div>
    </section>
  );
}
