"use client";

import { motion, type Variants } from "framer-motion";
import {
  BadgeCheck,
  ChefHat,
  Flame,
  ShieldCheck,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: Flame,
    title: "Fresh Ingredients",
    desc: "Freshly sourced ingredients in every bite.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "Hot, fresh pizza delivered right to your door.",
  },
  {
    icon: ChefHat,
    title: "Expert Chefs",
    desc: "Crafted with care by passionate pizza makers.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Guaranteed",
    desc: "Great taste and quality, every single time.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
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

export default function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 dark:bg-[#080D14] sm:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-[#E63946]/5 blur-3xl dark:bg-[#E63946]/10" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#F97316]/5 blur-3xl dark:bg-[#F97316]/10" />

        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/5 blur-3xl" />
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E63946]/10 bg-[#E63946]/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#E63946] dark:border-[#F97316]/20 dark:bg-[#F97316]/10 dark:text-[#F97316]">
            <Sparkles size={14} />
            <span>Why Pizzora</span>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Made fresh.
            <br className="sm:hidden" />{" "}
            <span className="bg-gradient-to-r from-[#E63946] to-[#F97316] bg-clip-text text-transparent">
              Delivered happy.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
            From carefully selected ingredients to your doorstep, we make
            every pizza experience worth remembering.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ y: -7 }}
                className="group relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#E63946]/20 hover:shadow-xl hover:shadow-[#E63946]/5 dark:border-white/[0.06] dark:bg-[#101720] dark:hover:border-[#F97316]/20"
              >
                {/* Hover Glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#E63946]/5 blur-2xl transition-opacity duration-300 group-hover:bg-[#E63946]/10 dark:bg-[#F97316]/5 dark:group-hover:bg-[#F97316]/10" />

                {/* Number */}
                <span className="absolute right-5 top-5 text-xs font-bold text-gray-200 dark:text-gray-700">
                  0{index + 1}
                </span>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.08, rotate: -4 }}
                  className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E63946]/10 to-[#F97316]/10 text-[#E63946] transition-colors duration-300 group-hover:from-[#E63946] group-hover:to-[#F97316] group-hover:text-white dark:text-[#F97316]"
                >
                  <Icon size={24} strokeWidth={2.2} />
                </motion.div>

                {/* Content */}
                <h3 className="relative mt-6 text-lg font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="relative mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  {feature.desc}
                </p>

                {/* Bottom Accent */}
                <div className="mt-6 h-1 w-8 rounded-full bg-gradient-to-r from-[#E63946] to-[#F97316] transition-all duration-300 group-hover:w-16" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center gap-5 rounded-2xl border border-gray-200/70 bg-white/70 px-6 py-5 backdrop-blur-md dark:border-white/[0.06] dark:bg-[#101720]/70 sm:flex-row sm:gap-8"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <ShieldCheck
              size={18}
              className="text-[#E63946] dark:text-[#F97316]"
            />
            Quality you can trust
          </div>

          <div className="hidden h-5 w-px bg-gray-200 dark:bg-white/10 sm:block" />

          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Truck
              size={18}
              className="text-[#E63946] dark:text-[#F97316]"
            />
            Fresh to your doorstep
          </div>

          <div className="hidden h-5 w-px bg-gray-200 dark:bg-white/10 sm:block" />

          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <BadgeCheck
              size={18}
              className="text-[#E63946] dark:text-[#F97316]"
            />
            Satisfaction guaranteed
          </div>
        </motion.div>
      </div>
    </section>
  );
}