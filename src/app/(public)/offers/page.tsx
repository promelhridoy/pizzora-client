"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BadgePercent,
  Clock3,
  Gift,
  Pizza,
  Sparkles,
  Truck,
} from "lucide-react";

import SpecialOffer from "../../../components/home/Specialoffer";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const benefits = [
  {
    icon: BadgePercent,
    title: "Best Value",
    description:
      "Enjoy more delicious pizza without spending more.",
  },
  {
    icon: Pizza,
    title: "Freshly Made",
    description:
      "Every pizza is prepared fresh with quality ingredients.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Hot and fresh pizza delivered right to your doorstep.",
  },
];

const offers = [
  {
    icon: "🍕",
    badge: "FAMILY FAVORITE",
    title: "Mega Family Feast",
    description:
      "Perfect for family nights with delicious pizzas and extra sides.",
    price: "৳1,499",
    oldPrice: "৳1,950",
  },
  {
    icon: "🔥",
    badge: "WEEKEND SPECIAL",
    title: "Weekend Pizza Party",
    description:
      "Make your weekend better with a delicious pizza combo.",
    price: "৳1,199",
    oldPrice: "৳1,550",
  },
  {
    icon: "🎉",
    badge: "PARTY DEAL",
    title: "Ultimate Party Pack",
    description:
      "A complete pizza feast designed for friends and celebrations.",
    price: "৳1,799",
    oldPrice: "৳2,250",
  },
];

export default function OfferPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white dark:bg-[#0B0F14]">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden px-4 pb-10 pt-16 sm:px-6 lg:px-8 lg:pb-16 lg:pt-24">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[130px]" />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">
            <Sparkles size={15} />
            <span>Exclusive Pizzora Deals</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
            Delicious deals.
            <br />
            <span className="bg-gradient-to-r from-[#E63946] via-[#F4511E] to-[#F97316] bg-clip-text text-transparent">
              Bigger savings.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base dark:text-slate-400">
            Discover our exclusive pizza offers made for family nights,
            weekend cravings, and every special moment worth celebrating.
          </p>
        </motion.div>
      </section>

      {/* =====================================================
          FEATURED OFFER
      ====================================================== */}

      <SpecialOffer />

      {/* =====================================================
          BENEFITS
      ====================================================== */}

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
              Why Pizzora?
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              More pizza. More value.
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Our offers are designed to give you more of what you love.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -5 }}
                  className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 transition-all duration-300 hover:border-orange-500/20 hover:bg-white hover:shadow-xl hover:shadow-orange-500/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-lg font-extrabold text-slate-900 dark:text-white">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          MORE OFFERS
      ====================================================== */}

      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-20 dark:bg-[#111827]/60">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
                More delicious choices
              </span>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                More ways to save
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Clock3 size={16} />
              Limited-time offers
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5 dark:border-white/10 dark:bg-[#111827]"
              >
                {/* Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-3xl">
                      {offer.icon}
                    </div>

                    <span className="rounded-full bg-orange-500/10 px-3 py-1.5 text-[10px] font-extrabold tracking-wider text-orange-600 dark:text-orange-400">
                      {offer.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-black text-slate-900 dark:text-white">
                    {offer.title}
                  </h3>

                  <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {offer.description}
                  </p>

                  <div className="mt-6 flex items-end justify-between border-t border-slate-100 pt-5 dark:border-white/10">
                    <div>
                      <span className="text-2xl font-black text-slate-950 dark:text-white">
                        {offer.price}
                      </span>

                      <span className="ml-2 text-sm text-slate-400 line-through">
                        {offer.oldPrice}
                      </span>
                    </div>

                    <Link
                      href="/menu"
                      className="group/btn flex h-10 items-center gap-1.5 rounded-xl bg-slate-950 px-4 text-xs font-bold text-white transition hover:bg-orange-500 dark:bg-white dark:text-slate-950 dark:hover:bg-orange-500 dark:hover:text-white"
                    >
                      Order
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover/btn:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#E63946] via-[#D62828] to-[#F97316] px-6 py-14 text-center shadow-2xl shadow-orange-500/20 sm:px-10"
        >
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-yellow-300/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur-md">
              <Gift size={26} className="text-white" />
            </div>

            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl">
              Your next pizza night just got better.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/80">
              Pick your favorite deal, customize your pizzas, and let Pizzora
              bring the feast to your door.
            </p>

            <Link
              href="/menu"
              className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-extrabold text-[#E63946] shadow-xl transition hover:bg-yellow-300 hover:text-[#B7091B]"
            >
              Explore Menu
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}