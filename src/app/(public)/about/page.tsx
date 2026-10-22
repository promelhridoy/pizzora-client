"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChefHat,
  Clock3,
  CreditCard,
  Flame,
  Heart,
  MapPin,
  PackageCheck,
  Pizza,
  Search,
  ShoppingCart,
  Sparkles,
  Truck,
  Utensils,
} from "lucide-react";

/* ============================================================
   FEATURES
============================================================ */

const FEATURES = [
  {
    icon: Pizza,
    title: "Fresh Pizza",
    description:
      "Choose from a variety of pizzas prepared with quality ingredients and baked fresh.",
  },
  {
    icon: Utensils,
    title: "Build Your Pizza",
    description:
      "Customize your pizza with your preferred size, toppings, and ingredients.",
  },
  {
    icon: ShoppingCart,
    title: "Easy Ordering",
    description:
      "Browse the menu, add your favorites to cart, and place your order in just a few steps.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Get your freshly prepared pizza delivered to your doorstep without unnecessary waiting.",
  },
];

/* ============================================================
   HOW IT WORKS
============================================================ */

const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Explore the Menu",
    description:
      "Discover pizzas, compare options, and find something that matches your craving.",
  },
  {
    number: "02",
    icon: ShoppingCart,
    title: "Customize & Add to Cart",
    description:
      "Choose your pizza size, customize your order, and add it to your cart.",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Checkout Securely",
    description:
      "Review your order, provide your delivery details, and complete checkout.",
  },
  {
    number: "04",
    icon: MapPin,
    title: "Track Your Order",
    description:
      "Follow your order status and know when your pizza is on its way.",
  },
];

/* ============================================================
   WHY PIZZORA
============================================================ */

const REASONS = [
  "Freshly prepared pizzas",
  "Easy pizza customization",
  "Simple and intuitive ordering",
  "Secure online checkout",
  "Clear order status updates",
  "Convenient doorstep delivery",
];

/* ============================================================
   PAGE
============================================================ */

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-[#0B0F14]">

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative">
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#F97316]/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#E63946]/5 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-xl text-center lg:text-left"
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E63946]/15 bg-[#E63946]/5 px-4 py-2 text-xs font-semibold text-[#E63946] dark:border-[#F97316]/20 dark:bg-[#F97316]/10 dark:text-[#F97316]">
              <Sparkles size={14} />
              <span>About Pizzora</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-gray-950 dark:text-white sm:text-5xl lg:text-6xl">
              Your pizza.
              <br />

              <span className="bg-gradient-to-r from-[#E63946] via-[#F4511E] to-[#F97316] bg-clip-text text-transparent">
                Your way.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-base leading-7 text-gray-500 dark:text-gray-400 sm:text-lg">
              Pizzora is a modern pizza ordering platform built to make
              discovering, customizing, ordering, and tracking your favorite
              pizza simple and enjoyable.
            </p>

            {/* Feature points */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Freshly prepared pizza",
                "Easy customization",
                "Secure checkout",
                "Order tracking",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 lg:justify-start"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E63946]/10 text-[#E63946] dark:bg-[#F97316]/10 dark:text-[#F97316]">
                    <Check size={12} strokeWidth={3} />
                  </span>

                  {item}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex justify-center lg:justify-start">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E63946] to-[#F97316] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E63946]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Explore Our Menu

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="relative mx-auto h-[300px] w-full max-w-[520px] sm:h-[400px]"
          >
            {/* Glow */}
            <div className="absolute inset-10 rounded-full bg-[#F97316]/15 blur-3xl" />

            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative h-full w-full"
            >
              <Image
                src="/Pizza-hero.png"
                alt="Fresh pizza from Pizzora"
                fill
                priority
                sizes="(max-width: 640px) 100vw, 520px"
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Floating info card */}
            <div className="absolute bottom-2 left-2 rounded-2xl border border-gray-100 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md dark:border-gray-700 dark:bg-[#111827]/95">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#F97316] dark:bg-orange-500/10">
                  <Flame size={19} />
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    Made fresh
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Just the way you like it
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======================================================
          WHAT IS PIZZORA
      ====================================================== */}

      <section className="border-y border-gray-100 bg-[#F8FAFC] dark:border-gray-800 dark:bg-[#111827]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="text-sm font-bold uppercase tracking-wider text-[#E63946] dark:text-[#F97316]">
                What is Pizzora?
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 dark:text-white sm:text-4xl">
                Everything you need
                <br />
                for a better pizza
                <br />
                <span className="text-gray-400 dark:text-gray-600">
                  experience.
                </span>
              </h2>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-5 text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base"
            >
              <p>
                Pizzora is designed around one simple idea: ordering pizza
                should be easy, flexible, and enjoyable from start to finish.
              </p>

              <p>
                From exploring the menu and building your own pizza to secure
                checkout and order tracking, Pizzora brings the complete
                ordering experience into one simple platform.
              </p>

              <p>
                Whether you are ordering a quick meal for yourself or sharing
                pizza with friends and family, Pizzora helps you get exactly
                what you want without making the process complicated.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================================
          WHAT YOU CAN DO
      ====================================================== */}

      <section className="bg-white py-20 dark:bg-[#0B0F14] sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          {/* Section heading */}
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-[#E63946] dark:text-[#F97316]">
              What You Can Do
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 dark:text-white sm:text-4xl">
              Pizza ordering,
              <br />
              <span className="text-gray-400 dark:text-gray-600">
                made simple.
              </span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Pizzora gives you the tools to discover, customize, and manage
              your pizza orders with ease.
            </p>
          </div>

          {/* Feature cards */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.07,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-gray-100 bg-[#F8FAFC] p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-[#151B23]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E63946]/10 text-[#E63946] dark:bg-[#F97316]/10 dark:text-[#F97316]">
                    <Icon size={20} />
                  </div>

                  <h3 className="mt-5 text-base font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================
          HOW IT WORKS
      ====================================================== */}

      <section className="bg-[#F8FAFC] py-20 dark:bg-[#111827] sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-[#E63946] dark:text-[#F97316]">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-black text-gray-950 dark:text-white sm:text-4xl">
              From craving to
              <br />
              <span className="text-gray-400 dark:text-gray-600">
                doorstep.
              </span>
            </h2>
          </div>

          {/* Steps */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  className="relative"
                >
                  {/* Connector */}
                  {index !== STEPS.length - 1 && (
                    <div className="absolute left-[3.25rem] top-7 hidden h-px w-[calc(100%-2rem)] bg-gray-200 dark:bg-gray-700 lg:block" />
                  )}

                  <div className="relative rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#151B23]">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E63946]/10 text-[#E63946] dark:bg-[#F97316]/10 dark:text-[#F97316]">
                        <Icon size={19} />
                      </div>

                      <span className="text-xs font-black text-gray-300 dark:text-gray-700">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="mt-5 text-base font-bold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================
          WHY PIZZORA
      ====================================================== */}

      <section className="bg-white py-20 dark:bg-[#0B0F14] sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

          {/* Left visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#E63946] to-[#F97316] p-8 sm:p-10"
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                <ChefHat size={23} />
              </div>

              <h2 className="mt-7 text-3xl font-black text-white sm:text-4xl">
                Why choose
                <br />
                Pizzora?
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-white/75">
                We focus on keeping the pizza ordering experience simple,
                convenient, and enjoyable.
              </p>

              <div className="mt-8 space-y-4">
                {REASONS.slice(0, 4).map((reason) => (
                  <div
                    key={reason}
                    className="flex items-center gap-3 text-sm font-medium text-white"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15">
                      <Check size={13} strokeWidth={3} />
                    </span>

                    {reason}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-sm font-bold uppercase tracking-wider text-[#E63946] dark:text-[#F97316]">
              The Pizzora Difference
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 dark:text-white sm:text-4xl">
              Designed around
              <br />
              <span className="text-gray-400 dark:text-gray-600">
                your experience.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
              Good pizza is important, but the experience around it matters
              too. Pizzora is designed to remove unnecessary steps and give
              customers a clear, convenient way to get the pizza they want.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {REASONS.slice(4).map((reason, index) => (
                <div
                  key={reason}
                  className="flex items-start gap-3 rounded-xl border border-gray-100 bg-[#F8FAFC] p-4 dark:border-gray-800 dark:bg-[#111827]"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E63946]/10 text-[#E63946] dark:bg-[#F97316]/10 dark:text-[#F97316]">
                    {index === 0 ? (
                      <Clock3 size={13} />
                    ) : (
                      <PackageCheck size={13} />
                    )}
                  </span>

                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {reason}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======================================================
          MISSION
      ====================================================== */}

      <section className="border-y border-gray-100 bg-[#F8FAFC] dark:border-gray-800 dark:bg-[#111827]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E63946]/10 text-[#E63946] dark:bg-[#F97316]/10 dark:text-[#F97316]">
            <Heart size={22} />
          </div>

          <p className="mt-5 text-sm font-bold uppercase tracking-wider text-[#E63946] dark:text-[#F97316]">
            Our Goal
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 dark:text-white sm:text-4xl">
            Make every pizza order
            <br />
            <span className="text-gray-400 dark:text-gray-600">
              feel effortless.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
            Pizzora aims to create a reliable and enjoyable pizza ordering
            experience — from the moment you start browsing to the moment your
            order arrives at your door.
          </p>
        </div>
      </section>

      {/* ======================================================
          FINAL CTA
      ====================================================== */}

      <section className="bg-white px-4 py-16 dark:bg-[#0B0F14] sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#E63946] to-[#F97316] px-6 py-12 text-center shadow-xl shadow-[#E63946]/15 sm:px-10 sm:py-14"
        >
          <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/10 blur-2xl" />

          <div className="relative">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
              <Pizza size={22} />
            </div>

            <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
              Ready for your next pizza?
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/75">
              Explore the menu, build your perfect pizza, and order it your
              way.
            </p>

            <Link
              href="/menu"
              className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#E63946] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Order Your Pizza

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}