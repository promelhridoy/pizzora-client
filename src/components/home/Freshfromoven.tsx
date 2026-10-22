"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";

import PizzaCard from "@/src/components/pizza/PizzaCard";
import type { Pizza } from "@/src/types/pizza";

const TRENDING: Pizza[] = [
  {
    id: "pizza-101",
    name: "Smoky Jalapeño",
    slug: "smoky-jalapeno",
    description: "Smoky chicken, jalapeño, mozzarella & spicy sauce.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviewCount: 124,
    price: 480,
    category: "Spicy",
  },
  {
    id: "pizza-102",
    name: "Truffle Mushroom",
    slug: "truffle-mushroom",
    description: "Creamy truffle sauce, mushroom, mozzarella & herbs.",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviewCount: 98,
    price: 620,
    category: "Premium",
  },
  {
    id: "pizza-103",
    name: "Hawaiian Twist",
    slug: "hawaiian-twist",
    description: "Juicy chicken, pineapple, mozzarella & signature sauce.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviewCount: 87,
    price: 470,
    category: "Classic",
  },
  {
    id: "pizza-104",
    name: "Spicy Beef Sausage",
    slug: "spicy-beef-sausage",
    description: "Spicy beef sausage, peppers, onion & melted cheese.",
    image:
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviewCount: 112,
    price: 560,
    category: "Beef",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function FreshFromOven() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-16 dark:bg-[#111827] sm:py-20">
      {/* Decorative Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex items-end justify-between gap-4"
        >
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100 text-[#F97316] dark:bg-orange-500/10">
                <Flame size={16} />
              </span>

              <span className="text-sm font-bold uppercase tracking-wider text-[#E63946] dark:text-[#F97316]">
                Trending Now
              </span>
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 sm:text-3xl">
              Fresh from the oven
            </h2>

            <p className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
              Discover the pizzas everyone is loving right now.
            </p>
          </div>

          <Link
            href="/menu"
            className="group hidden shrink-0 items-center gap-1.5 text-sm font-bold text-[#E63946] transition-colors hover:text-[#F97316] sm:flex dark:text-[#F97316]"
          >
            View All
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* Mobile View All */}
        <div className="mt-5 sm:hidden">
          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E63946] dark:text-[#F97316]"
          >
            View All
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Pizza Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-8 flex gap-5 overflow-x-auto pb-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4"
        >
          {TRENDING.map((pizza) => (
            <div key={pizza.id} className="w-[280px] shrink-0 sm:w-auto">
              <PizzaCard
                pizza={pizza}
                showBadge
                onAddToCart={(selectedPizza, size) => {
                  console.log("Add to cart:", {
                    pizzaId: selectedPizza.id,
                    pizzaName: selectedPizza.name,
                    size,
                    price: selectedPizza.price,
                  });
                }}
                onFavorite={(selectedPizza, liked) => {
                  console.log(
                    liked ? "Added to favorites:" : "Removed from favorites:",
                    selectedPizza.name,
                  );
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}