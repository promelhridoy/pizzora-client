"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import PizzaCard from "@/src/components/pizza/PizzaCard";
import type {
  Pizza,
  PizzaSize,
} from "@/src/types/pizza";

const PIZZAS: Pizza[] = [
  {
    id: "p1",
    name: "Pepperoni Blast",
    slug: "pepperoni-blast",
    description:
      "Classic tomato sauce, mozzarella, spicy pepperoni & fresh herbs.",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviewCount: 128,
    price: 499,
    category: "Classic",
  },
  {
    id: "p2",
    name: "Veggie Supreme",
    slug: "veggie-supreme",
    description:
      "Fresh bell peppers, black olives, mushrooms & mozzarella cheese.",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviewCount: 94,
    price: 450,
    category: "Veggie",
  },
  {
    id: "p3",
    name: "BBQ Chicken",
    slug: "bbq-chicken",
    description:
      "Smoky BBQ sauce, grilled chicken, red onions & melted cheese.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviewCount: 116,
    price: 550,
    category: "Chicken",
  },
  {
    id: "p4",
    name: "Four Cheese",
    slug: "four-cheese",
    description:
      "Mozzarella, cheddar, parmesan & gouda blended into one rich pizza.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviewCount: 87,
    price: 520,
    category: "Cheese",
  },
  {
    id: "p5",
    name: "Spicy Beef",
    slug: "spicy-beef",
    description:
      "Tender beef, jalapeño, mozzarella & spicy house sauce.",
    image:
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    reviewCount: 71,
    price: 590,
    category: "Beef",
  },
  {
    id: "p6",
    name: "Chicken Tikka",
    slug: "chicken-tikka",
    description:
      "Juicy chicken tikka, onions, peppers & creamy mozzarella.",
    image:
      "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviewCount: 102,
    price: 540,
    category: "Chicken",
  },
];

const BEST_SELLERS = [...PIZZAS]
  .sort((a, b) => {
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }

    return b.reviewCount - a.reviewCount;
  })
  .slice(0, 4);

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

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
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

export default function BestSellers() {
  const handleAddToCart = (
    pizza: Pizza,
    size: PizzaSize
  ) => {
    console.log("Add to cart:", {
      pizzaId: pizza.id,
      pizzaName: pizza.name,
      size,
      price: pizza.price,
    });
  };

  const handleFavorite = (
    pizza: Pizza,
    liked: boolean
  ) => {
    console.log("Favorite:", {
      pizzaId: pizza.id,
      pizzaName: pizza.name,
      liked,
    });
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 dark:bg-[#0B0F14] sm:py-20 lg:py-24">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#E63946]/5 blur-3xl dark:bg-[#E63946]/10" />

        <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#F97316]/5 blur-3xl dark:bg-[#F97316]/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            {/* Label */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E63946]/10 bg-[#E63946]/5 px-3 py-1.5 text-xs font-semibold text-[#E63946] dark:border-[#E63946]/20 dark:bg-[#E63946]/10 dark:text-[#F97316]">
              <Sparkles size={13} />

              <span>Top Rated</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl">
              Customer Favorites
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
              Our highest-rated pizzas, loved and
              recommended by our customers.
            </p>
          </div>

          {/* View All */}
          <motion.button
            type="button"
            whileHover={{
              x: 4,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-gray-700 transition-colors hover:text-[#E63946] dark:text-gray-300 dark:hover:text-[#F97316]"
          >
            View all pizzas

            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </motion.button>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {BEST_SELLERS.map((pizza) => (
            <motion.div
              key={pizza.id}
              variants={cardVariants}
            >
              <PizzaCard
                pizza={pizza}
                showBadge
                onAddToCart={handleAddToCart}
                onFavorite={handleFavorite}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}