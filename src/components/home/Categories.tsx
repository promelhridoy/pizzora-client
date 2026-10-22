"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const CATEGORIES = [
  {
    label: "Classic Pizza",
    description: "Timeless favorites",
    image: "/classic.jfif",
    href: "/menu?cat=classic",
  },
  {
    label: "Pepperoni Pizza",
    description: "Loaded with flavor",
    image: "/pepperoni.jfif",
    href: "/menu?cat=pepperoni",
  },
  {
    label: "Cheese Pizza",
    description: "Extra cheesy goodness",
    image: "/cheese.jfif",
    href: "/menu?cat=cheese",
  },
  {
    label: "Veggie Pizza",
    description: "Fresh & delicious",
    image: "/veggie.jfif",
    href: "/menu?cat=veggie",
  },
  {
    label: "Spicy Pizza",
    description: "Turn up the heat",
    image: "/spicy.jfif",
    href: "/menu?cat=spicy",
  },
  {
    label: "Premium Pizza",
    description: "Made for pizza lovers",
    image: "/premium.jfif",
    href: "/menu?cat=premium",
  },
];

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
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
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ============================================================
   COMPONENT
   ============================================================ */

export default function Categories() {
  return (
    <section className="relative overflow-hidden bg-white py-20 dark:bg-[#0B0F14] sm:py-24 lg:py-28">
      {/* ============================================================
          AMBIENT BACKGROUND
      ============================================================ */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-64 top-20 h-[32rem] w-[32rem] rounded-full bg-[#F97316]/[0.06] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-64 bottom-0 h-[36rem] w-[36rem] rounded-full bg-[#E63946]/[0.05] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F97316]/[0.025] blur-3xl"
      />

      {/* ============================================================
          MAIN CONTAINER
      ============================================================ */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ==========================================================
            SECTION HEADER
        ========================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            {/* Small label */}

            <div className="mb-4 inline-flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#E63946] to-[#F97316] text-white shadow-md shadow-[#E63946]/20">
                <Sparkles size={13} />
              </span>

              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#E63946] dark:text-[#F97316]">
                Our selection
              </span>
            </div>

            {/* Heading */}

            <h2 className="text-3xl font-black leading-tight tracking-[-0.04em] text-gray-950 dark:text-white sm:text-4xl lg:text-[2.8rem]">
              Find your perfect
              <br className="hidden sm:block" />

              <span className="bg-gradient-to-r from-[#E63946] to-[#F97316] bg-clip-text text-transparent">
                {" "}
                pizza.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
              From timeless classics to bold new flavors, there&apos;s a
              perfect slice waiting for you.
            </p>
          </div>

          {/* Desktop View All */}

          <Link
            href="/menu"
            className="group hidden shrink-0 items-center gap-2 text-sm font-bold text-gray-700 transition-colors hover:text-[#E63946] dark:text-gray-300 dark:hover:text-[#F97316] sm:flex"
          >
            Explore full menu

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white transition-all duration-300 group-hover:border-[#F97316]/30 group-hover:bg-[#F97316]/5 dark:border-gray-700 dark:bg-[#11161D]">
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </Link>
        </motion.div>

        {/* ==========================================================
            CATEGORY GRID
        ========================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
          }}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {CATEGORIES.map((category) => (
            <motion.div
              key={category.label}
              variants={cardVariants}
            >
              <Link
                href={category.href}
                className="group block h-full"
              >
                <motion.article
                  whileHover={{
                    y: -8,
                  }}
                  whileTap={{
                    scale: 0.985,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 24,
                  }}
                  className="relative h-full overflow-hidden rounded-[1.75rem] border border-gray-200/70 bg-white p-2.5 shadow-[0_8px_35px_rgba(15,23,42,0.045)] transition-all duration-500 group-hover:border-[#F97316]/25 group-hover:shadow-[0_25px_60px_rgba(249,115,22,0.12)] dark:border-white/[0.07] dark:bg-[#11161D] dark:shadow-none dark:group-hover:border-[#F97316]/25 dark:group-hover:shadow-[0_25px_60px_rgba(249,115,22,0.08)]"
                >
                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem] bg-gray-100 dark:bg-[#151B23]">
                    <Image
                      src={category.image}
                      alt={category.label}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                    />

                    {/* Premium gradient overlay */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Top right arrow */}

                    <motion.div
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:opacity-100"
                    >
                      <ArrowRight size={16} />
                    </motion.div>

                    {/* Bottom content on image */}

                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                      <h3 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                        {category.label}
                      </h3>

                      <p className="mt-1.5 text-xs font-medium text-white/75 sm:text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* =================================================
                      CARD FOOTER
                  ================================================= */}

                  <div className="flex items-center justify-between px-2 pb-1 pt-4">
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                      Explore flavor
                    </span>

                    <span className="flex items-center gap-1.5 text-xs font-bold text-[#E63946] transition-all duration-300 group-hover:gap-2 group-hover:text-[#F97316]">
                      View pizza

                      <ArrowRight
                        size={13}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* ==========================================================
            MOBILE VIEW ALL
        ========================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mt-9 flex justify-center sm:hidden"
        >
          <Link
            href="/menu"
            className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition-all hover:border-[#F97316]/30 hover:text-[#E63946] dark:border-gray-700 dark:bg-[#11161D] dark:text-gray-200 dark:hover:text-[#F97316]"
          >
            Explore full menu

            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}