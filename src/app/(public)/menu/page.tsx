"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Filter,
  Loader2,
  RefreshCw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import PizzaCard from "../../../components/pizza/PizzaCard";
import type { Pizza, PizzaSize } from "../../../types/pizza";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Category = "all" | "veg" | "non-veg" | "specialty";

type SortOption =
  | "default"
  | "price-low"
  | "price-high"
  | "name"
  | "newest";

const categories: {
  value: Category;
  label: string;
}[] = [
  {
    value: "all",
    label: "All Pizzas",
  },
  {
    value: "veg",
    label: "Veg",
  },
  {
    value: "non-veg",
    label: "Non-Veg",
  },
  {
    value: "specialty",
    label: "Specialty",
  },
];

const sortOptions: {
  value: SortOption;
  label: string;
}[] = [
  {
    value: "default",
    label: "Recommended",
  },
  {
    value: "price-low",
    label: "Price: Low to High",
  },
  {
    value: "price-high",
    label: "Price: High to Low",
  },
  {
    value: "name",
    label: "Name: A-Z",
  },
  {
    value: "newest",
    label: "Newest",
  },
];

function getStartingPrice(pizza: Pizza) {
  if (!pizza.sizes || pizza.sizes.length === 0) {
    return 0;
  }

  return Math.min(...pizza.sizes.map((size) => size.price));
}

function getDateValue(pizza: Pizza) {
  const value = (pizza as Pizza & { createdAt?: string }).createdAt;

  if (!value) return 0;

  return new Date(value).getTime();
}

export default function MenuPage() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState<Category>("all");

  const [sort, setSort] = useState<SortOption>("default");

  const [showFilters, setShowFilters] = useState(false);

  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const [selectedPrice, setSelectedPrice] = useState("all");

  /*
   * ============================
   * FETCH PIZZAS
   * ============================
   */

  const fetchPizzas = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      params.set("page", "1");
      params.set("limit", "50");

      if (category !== "all") {
        params.set("category", category);
      }

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (maxPrice !== null) {
        params.set("maxPrice", String(maxPrice));
      }

      /*
       * Backend sort mapping
       *
       * If your backend uses different sort values,
       * change these values here.
       */
      if (sort === "price-low") {
        params.set("sort", "price_asc");
      }

      if (sort === "price-high") {
        params.set("sort", "price_desc");
      }

      if (sort === "newest") {
        params.set("sort", "newest");
      }

      const response = await fetch(
        `${API_URL}/api/v1/pizza?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load pizzas");
      }

      const result = await response.json();

      /*
       * Supports common API response formats:
       *
       * {
       *   success: true,
       *   data: [...]
       * }
       *
       * OR
       *
       * {
       *   success: true,
       *   data: {
       *     pizzas: [...]
       *   }
       * }
       */

      let pizzaData: Pizza[] = [];

      if (Array.isArray(result.data)) {
        pizzaData = result.data;
      } else if (Array.isArray(result.data?.pizzas)) {
        pizzaData = result.data.pizzas;
      } else if (Array.isArray(result.pizzas)) {
        pizzaData = result.pizzas;
      }

      setPizzas(pizzaData);
    } catch (err) {
      console.error("Pizza fetch error:", err);

      setError(
        "Unable to load pizzas right now. Please try again."
      );

      setPizzas([]);
    } finally {
      setLoading(false);
    }
  }, [category, search, maxPrice, sort]);

  /*
   * ============================
   * FETCH ON FILTER CHANGE
   * ============================
   */

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPizzas();
    }, 350);

    return () => clearTimeout(timer);
  }, [fetchPizzas]);

  /*
   * ============================
   * LOCAL SORTING
   * ============================
   */

  const displayedPizzas = useMemo(() => {
    const result = [...pizzas];

    if (sort === "name") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sort === "price-low") {
      result.sort(
        (a, b) =>
          getStartingPrice(a) -
          getStartingPrice(b)
      );
    }

    if (sort === "price-high") {
      result.sort(
        (a, b) =>
          getStartingPrice(b) -
          getStartingPrice(a)
      );
    }

    if (sort === "newest") {
      result.sort(
        (a, b) =>
          getDateValue(b) -
          getDateValue(a)
      );
    }

    return result;
  }, [pizzas, sort]);

  /*
   * ============================
   * CLEAR FILTERS
   * ============================
   */

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("default");
    setMaxPrice(null);
    setSelectedPrice("all");
  };

  /*
   * ============================
   * ADD TO CART
   * ============================
   */

  const handleAddToCart = (
    pizza: Pizza,
    size: PizzaSize
  ) => {
    console.log("Add to cart:", {
      pizza,
      size,
    });

    /*
     * TODO:
     * Connect your cart state/context here.
     *
     * Example:
     *
     * addToCart({
     *   pizzaId: pizza._id,
     *   name: pizza.name,
     *   size: size.label,
     *   price: size.price,
     *   quantity: 1,
     * });
     */
  };

  /*
   * ============================
   * FAVORITE
   * ============================
   */

  const handleFavorite = (
    pizza: Pizza,
    liked: boolean
  ) => {
    console.log(
      liked
        ? `Added ${pizza.name} to favorites`
        : `Removed ${pizza.name} from favorites`
    );

    /*
     * TODO:
     * Connect favorite API/context.
     */
  };

  /*
   * ============================
   * PRICE OPTIONS
   * ============================
   */

  const priceOptions = [
    {
      value: "all",
      label: "Any Price",
      max: null,
    },
    {
      value: "400",
      label: "Under ৳400",
      max: 400,
    },
    {
      value: "600",
      label: "Under ৳600",
      max: 600,
    },
    {
      value: "800",
      label: "Under ৳800",
      max: 800,
    },
    {
      value: "1000",
      label: "Under ৳1000",
      max: 1000,
    },
  ];

  /*
   * ============================
   * RENDER
   * ============================
   */

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 dark:bg-[#0B0F14] dark:text-white">
      {/* ============================
          HERO
      ============================ */}

      <section className="relative overflow-hidden border-b border-slate-200 dark:border-white/10">
        {/* Background decorations */}

        <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-red-500/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-6 lg:px-8 lg:pb-14 lg:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="mx-auto max-w-3xl text-center"
          >
            {/* Small badge */}

            <div
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-orange-500/20
                bg-orange-500/10
                px-4
                py-2
                text-sm
                font-semibold
                text-orange-600
                dark:text-orange-400
              "
            >
              <span className="h-2 w-2 rounded-full bg-orange-500" />

              Fresh from our kitchen
            </div>

            {/* Heading */}

            <h1
              className="
                text-4xl
                font-black
                tracking-tight
                sm:text-5xl
                lg:text-6xl
              "
            >
              Find your perfect{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                pizza
              </span>
            </h1>

            {/* Description */}

            <p
              className="
                mx-auto
                mt-5
                max-w-2xl
                text-base
                leading-7
                text-slate-500
                sm:text-lg
                dark:text-slate-400
              "
            >
              From classic favorites to bold new flavors,
              discover a pizza made exactly for your taste.
            </p>
          </motion.div>

          {/* ============================
              SEARCH
          ============================ */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.5,
            }}
            className="mx-auto mt-8 max-w-3xl"
          >
            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-2
                shadow-xl
                shadow-slate-900/5
                dark:border-white/10
                dark:bg-[#111827]
                dark:shadow-black/20
              "
            >
              <Search
                size={21}
                className="ml-3 shrink-0 text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search pizza..."
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  px-1
                  py-3
                  text-sm
                  outline-none
                  placeholder:text-slate-400
                "
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    text-slate-400
                    transition
                    hover:bg-slate-100
                    hover:text-slate-700
                    dark:hover:bg-white/10
                    dark:hover:text-white
                  "
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================
          FILTER SECTION
      ============================ */}

      <section className="sticky top-0 z-30 border-b border-slate-200/80 bg-[#F8FAFC]/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#0B0F14]/90">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-16 items-center justify-between gap-4">
            {/* Categories */}

            <div className="hidden items-center gap-2 overflow-x-auto md:flex">
              {categories.map((item) => {
                const active = category === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      setCategory(item.value)
                    }
                    className={`
                      whitespace-nowrap
                      rounded-xl
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      transition-all
                      ${
                        active
                          ? "bg-slate-900 text-white shadow-lg dark:bg-white dark:text-slate-900"
                          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                      }
                    `}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile filter */}

            <button
              type="button"
              onClick={() =>
                setShowFilters((value) => !value)
              }
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-2.5
                text-sm
                font-semibold
                md:hidden
                dark:border-white/10
                dark:bg-[#111827]
              "
            >
              <SlidersHorizontal size={17} />

              Filters
            </button>

            {/* Right controls */}

            <div className="flex items-center gap-2">
              {/* Sort */}

              <div className="relative hidden sm:block">
                <select
                  value={sort}
                  onChange={(event) =>
                    setSort(
                      event.target.value as SortOption
                    )
                  }
                  className="
                    appearance-none
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-2.5
                    pl-4
                    pr-10
                    text-sm
                    font-semibold
                    outline-none
                    transition
                    focus:border-orange-500
                    dark:border-white/10
                    dark:bg-[#111827]
                  "
                >
                  {sortOptions.map((item) => (
                    <option
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />
              </div>

              {/* Refresh */}

              <button
                type="button"
                onClick={fetchPizzas}
                disabled={loading}
                aria-label="Refresh pizzas"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-500
                  transition
                  hover:text-orange-500
                  disabled:opacity-50
                  dark:border-white/10
                  dark:bg-[#111827]
                "
              >
                <RefreshCw
                  size={17}
                  className={
                    loading ? "animate-spin" : ""
                  }
                />
              </button>
            </div>
          </div>

          {/* Mobile filters */}

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                className="overflow-hidden md:hidden"
              >
                <div className="space-y-5 pb-5 pt-2">
                  {/* Category */}

                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Category
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {categories.map((item) => {
                        const active =
                          category === item.value;

                        return (
                          <button
                            key={item.value}
                            type="button"
                            onClick={() =>
                              setCategory(item.value)
                            }
                            className={`
                              rounded-xl
                              px-4
                              py-2
                              text-sm
                              font-semibold
                              ${
                                active
                                  ? "bg-orange-500 text-white"
                                  : "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300"
                              }
                            `}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sort */}

                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Sort
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {sortOptions.map((item) => {
                        const active =
                          sort === item.value;

                        return (
                          <button
                            key={item.value}
                            type="button"
                            onClick={() =>
                              setSort(item.value)
                            }
                            className={`
                              rounded-xl
                              px-4
                              py-2
                              text-sm
                              font-semibold
                              ${
                                active
                                  ? "bg-orange-500 text-white"
                                  : "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300"
                              }
                            `}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price */}

                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Price
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {priceOptions.map((item) => {
                        const active =
                          selectedPrice === item.value;

                        return (
                          <button
                            key={item.value}
                            type="button"
                            onClick={() => {
                              setSelectedPrice(
                                item.value
                              );

                              setMaxPrice(item.max);
                            }}
                            className={`
                              rounded-xl
                              px-4
                              py-2
                              text-sm
                              font-semibold
                              ${
                                active
                                  ? "bg-orange-500 text-white"
                                  : "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300"
                              }
                            `}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm font-semibold text-red-500"
                  >
                    Clear all filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ============================
          MENU CONTENT
      ============================ */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Header */}

        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-sm font-semibold text-orange-500">
              Our menu
            </p>

            <h2 className="text-2xl font-black sm:text-3xl">
              Delicious choices
            </h2>
          </div>

          {!loading && !error && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {displayedPizzas.length}{" "}
              {displayedPizzas.length === 1
                ? "pizza"
                : "pizzas"}
            </p>
          )}
        </div>

        {/* ============================
            ERROR
        ============================ */}

        {error && !loading && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="
              flex
              flex-col
              items-center
              justify-center
              rounded-3xl
              border
              border-red-200
              bg-red-50
              px-6
              py-16
              text-center
              dark:border-red-500/20
              dark:bg-red-500/5
            "
          >
            <div
              className="
                mb-4
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-red-100
                text-red-500
                dark:bg-red-500/10
              "
            >
              <Filter size={24} />
            </div>

            <h3 className="text-lg font-bold">
              Something went wrong
            </h3>

            <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchPizzas}
              className="
                mt-6
                flex
                items-center
                gap-2
                rounded-xl
                bg-slate-900
                px-5
                py-3
                text-sm
                font-bold
                text-white
                transition
                hover:bg-orange-500
                dark:bg-white
                dark:text-slate-900
              "
            >
              <RefreshCw size={17} />

              Try Again
            </button>
          </motion.div>
        )}

        {/* ============================
            LOADING
        ============================ */}

        {loading && (
          <div
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {Array.from({ length: 8 }).map(
              (_, index) => (
                <PizzaSkeleton key={index} />
              )
            )}
          </div>
        )}

        {/* ============================
            PIZZAS
        ============================ */}

        {!loading &&
          !error &&
          displayedPizzas.length > 0 && (
            <motion.div
              layout
              className="
                grid
                grid-cols-1
                gap-6
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >
              <AnimatePresence mode="popLayout">
                {displayedPizzas.map(
                  (pizza, index) => (
                    <motion.div
                      layout
                      key={pizza._id}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.95,
                      }}
                      transition={{
                        delay: Math.min(
                          index * 0.04,
                          0.25
                        ),
                        duration: 0.35,
                      }}
                    >
                      <PizzaCard
                        pizza={pizza}
                        showBadge={
                          index < 2 &&
                          sort === "default"
                        }
                        onAddToCart={
                          handleAddToCart
                        }
                        onFavorite={
                          handleFavorite
                        }
                      />
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </motion.div>
          )}

        {/* ============================
            EMPTY STATE
        ============================ */}

        {!loading &&
          !error &&
          displayedPizzas.length === 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                flex
                flex-col
                items-center
                justify-center
                rounded-3xl
                border
                border-dashed
                border-slate-300
                bg-white
                px-6
                py-20
                text-center
                dark:border-white/10
                dark:bg-[#111827]
              "
            >
              <div
                className="
                  mb-5
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-3xl
                  bg-orange-500/10
                  text-4xl
                "
              >
                🍕
              </div>

              <h3 className="text-xl font-bold">
                No pizzas found
              </h3>

              <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
                We couldn't find any pizza matching
                your current search or filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="
                  mt-6
                  rounded-xl
                  bg-orange-500
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-orange-500/20
                  transition
                  hover:bg-orange-600
                "
              >
                Clear Filters
              </button>
            </motion.div>
          )}
      </section>

      {/* ============================
          BOTTOM CTA
      ============================ */}

      <section className="border-t border-slate-200 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              bg-gradient-to-br
              from-orange-500
              via-red-500
              to-orange-600
              px-6
              py-12
              text-center
              text-white
              shadow-2xl
              shadow-orange-500/20
              sm:px-12
            "
          >
            {/* Decorations */}

            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
                Can't decide?
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Build your pizza your way.
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
                Customize ingredients, choose your size,
                and create a pizza that is uniquely yours.
              </p>

              <a
                href="/customize"
                className="
                  mt-7
                  inline-flex
                  items-center
                  rounded-2xl
                  bg-white
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  text-orange-600
                  shadow-xl
                  transition
                  hover:scale-105
                "
              >
                Customize Your Pizza
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

/*
 * ============================
 * PIZZA SKELETON
 * ============================
 */

function PizzaSkeleton() {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        dark:border-white/10
        dark:bg-[#111827]
      "
    >
      {/* Image */}

      <div className="aspect-[4/3] animate-pulse bg-slate-200 dark:bg-white/5" />

      {/* Content */}

      <div className="space-y-4 p-5">
        <div className="h-6 w-3/4 animate-pulse rounded-lg bg-slate-200 dark:bg-white/5" />

        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-slate-200 dark:bg-white/5" />

          <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-white/5" />
        </div>

        <div className="flex gap-2">
          <div className="h-9 w-14 animate-pulse rounded-xl bg-slate-200 dark:bg-white/5" />

          <div className="h-9 w-14 animate-pulse rounded-xl bg-slate-200 dark:bg-white/5" />

          <div className="h-9 w-14 animate-pulse rounded-xl bg-slate-200 dark:bg-white/5" />
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/10">
          <div className="h-8 w-20 animate-pulse rounded-lg bg-slate-200 dark:bg-white/5" />

          <div className="h-11 w-24 animate-pulse rounded-2xl bg-slate-200 dark:bg-white/5" />
        </div>
      </div>
    </div>
  );
}