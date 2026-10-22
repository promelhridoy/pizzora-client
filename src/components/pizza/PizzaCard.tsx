"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Star,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

import type { Pizza } from "../../types/pizza";

type PizzaCardProps = {
  pizza: Pizza;
  showBadge?: boolean;
  onFavorite?: (pizza: Pizza, liked: boolean) => void;
};

export default function PizzaCard({
  pizza,
  showBadge = false,
  onFavorite,
}: PizzaCardProps) {
  const availableSizes = pizza.sizes ?? [];

  const [selectedSize, setSelectedSize] = useState(
    availableSizes[0]?.label ?? ""
  );

  const [liked, setLiked] = useState(false);

  const selectedSizeData = availableSizes.find(
    (size) => size.label === selectedSize
  );

  const currentPrice = selectedSizeData?.price ?? 0;

  const handleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent card navigation
    event.preventDefault();
    event.stopPropagation();

    const newLikedState = !liked;

    setLiked(newLikedState);
    onFavorite?.(pizza, newLikedState);
  };

  const handleSizeChange = (
    event: React.MouseEvent<HTMLButtonElement>,
    sizeLabel: string
  ) => {
    // Prevent card navigation
    event.preventDefault();
    event.stopPropagation();

    setSelectedSize(sizeLabel);
  };

  return (
    <Link
      href={`/menu/${pizza._id}`}
      aria-label={`View details of ${pizza.name}`}
      className="block h-full"
    >
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{ y: -6 }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        className="
          group relative flex h-full cursor-pointer flex-col
          overflow-hidden rounded-3xl
          border border-slate-200
          bg-white shadow-sm
          transition-all duration-300
          hover:shadow-2xl
          dark:border-white/10
          dark:bg-[#111827]
        "
      >
        {/* ================= IMAGE SECTION ================= */}

        <div
          className="
            relative aspect-[4/3]
            overflow-hidden
            bg-slate-100
            dark:bg-[#0B0F14]
          "
        >
          {pizza.image ? (
            <Image
              src={pizza.image}
              alt={pizza.name}
              fill
              sizes="
                (max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw
              "
              className="
                object-cover
                transition-transform duration-700
                group-hover:scale-110
              "
            />
          ) : (
            <div
              className="
                flex h-full w-full items-center justify-center
                bg-gradient-to-br
                from-orange-100 via-red-50 to-yellow-100
                dark:from-orange-950/40
                dark:via-red-950/30
                dark:to-yellow-950/20
              "
            >
              <div className="text-center">
                <div className="mb-2 text-6xl">🍕</div>

                <p
                  className="
                    text-sm font-medium
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Fresh Pizza
                </p>
              </div>
            </div>
          )}

          {/* Image Overlay */}

          <div
            className="
              pointer-events-none absolute inset-0
              bg-gradient-to-t from-black/30
              via-transparent to-transparent
              opacity-0 transition-opacity duration-300
              group-hover:opacity-100
            "
          />

          {/* ================= BADGE ================= */}

          {showBadge && (
            <div
              className="
                absolute left-4 top-4
                flex items-center gap-1.5
                rounded-full
                bg-gradient-to-r from-orange-500 to-red-500
                px-3 py-1.5
                text-xs font-bold text-white
                shadow-lg
              "
            >
              <Sparkles size={13} />
              Popular
            </div>
          )}

          {/* ================= CATEGORY ================= */}

          <div
            className="
              absolute bottom-4 left-4
              rounded-full
              bg-white/90
              px-3 py-1
              text-xs font-semibold capitalize
              text-slate-800 shadow-md
              backdrop-blur-md
              dark:bg-slate-900/90
              dark:text-white
            "
          >
            {pizza.category}
          </div>

          {/* ================= FAVORITE BUTTON ================= */}

          <button
            type="button"
            onClick={handleFavorite}
            aria-label={
              liked
                ? `Remove ${pizza.name} from favorites`
                : `Add ${pizza.name} to favorites`
            }
            className="
              absolute right-4 top-4
              z-10 flex h-10 w-10
              items-center justify-center
              rounded-full
              border border-white/30
              bg-white/90
              text-slate-700
              shadow-lg backdrop-blur-md
              transition-all duration-300
              hover:scale-110
              dark:bg-slate-900/90
              dark:text-white
            "
          >
            <Heart
              size={19}
              className={
                liked
                  ? "fill-red-500 text-red-500"
                  : "text-slate-700 dark:text-white"
              }
            />
          </button>

          {/* ================= UNAVAILABLE OVERLAY ================= */}

          {!pizza.available && (
            <div
              className="
                absolute inset-0 z-[5]
                flex items-center justify-center
                bg-black/55
                backdrop-blur-[2px]
              "
            >
              <span
                className="
                  rounded-full bg-white
                  px-4 py-2
                  text-sm font-bold
                  text-slate-900 shadow-lg
                "
              >
                Currently Unavailable
              </span>
            </div>
          )}
        </div>

        {/* ================= CONTENT ================= */}

        <div className="flex flex-1 flex-col p-5">
          {/* ================= NAME ================= */}

          <h3
            className="
              mb-2 line-clamp-1
              text-xl font-bold tracking-tight
              text-slate-900
              transition-colors
              group-hover:text-orange-500
              dark:text-white
            "
          >
            {pizza.name}
          </h3>

          {/* ================= DESCRIPTION ================= */}

          <p
            className="
              mb-4 line-clamp-2 min-h-10
              text-sm leading-5
              text-slate-500
              dark:text-slate-400
            "
          >
            {pizza.description}
          </p>

          {/* ================= RATING ================= */}

          {(pizza.rating !== undefined ||
            pizza.reviewCount !== undefined) && (
            <div className="mb-5 flex items-center gap-2">
              {pizza.rating !== undefined && (
                <div className="flex items-center gap-1">
                  <Star
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span
                    className="
                      text-sm font-semibold
                      text-slate-800
                      dark:text-white
                    "
                  >
                    {pizza.rating.toFixed(1)}
                  </span>
                </div>
              )}

              {pizza.reviewCount !== undefined && (
                <span
                  className="
                    text-xs text-slate-400
                    dark:text-slate-500
                  "
                >
                  ({pizza.reviewCount} reviews)
                </span>
              )}
            </div>
          )}

          {/* ================= SIZE SELECTOR ================= */}

          {availableSizes.length > 0 && (
            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between">
                <span
                  className="
                    text-sm font-semibold
                    text-slate-800
                    dark:text-slate-200
                  "
                >
                  Choose Size
                </span>

                <span className="text-xs text-slate-400">
                  {selectedSize}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => {
                  const isActive = selectedSize === size.label;

                  return (
                    <button
                      key={`${pizza._id}-${size.label}`}
                      type="button"
                      onClick={(event) =>
                        handleSizeChange(event, size.label)
                      }
                      className={`
                        rounded-xl border
                        px-3 py-2
                        text-xs font-semibold
                        transition-all duration-200
                        ${
                          isActive
                            ? "border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/20"
                            : "border-slate-200 bg-slate-50 text-slate-600 hover:border-orange-300 hover:text-orange-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-orange-500/50"
                        }
                      `}
                    >
                      {size.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= BOTTOM SECTION ================= */}

          <div
            className="
              mt-auto border-t
              border-slate-100 pt-5
              dark:border-white/10
            "
          >
            <div className="flex items-center justify-between gap-4">
              {/* Price */}

              <div>
                <p className="mb-0.5 text-xs text-slate-400">
                  Starting from
                </p>

                <div className="flex items-center gap-1">
                  <span
                    className="
                      text-sm font-medium
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    ৳
                  </span>

                  <span
                    className="
                      text-2xl font-extrabold tracking-tight
                      text-slate-900
                      dark:text-white
                    "
                  >
                    {currentPrice}
                  </span>
                </div>
              </div>

              {/* View Details Indicator */}

              <div
                className="
                  flex items-center gap-2
                  rounded-2xl
                  bg-slate-900
                  px-4 py-3
                  text-sm font-bold text-white
                  shadow-lg shadow-slate-900/10
                  transition-all duration-300
                  group-hover:bg-orange-500
                  group-hover:shadow-orange-500/20
                  dark:bg-white
                  dark:text-slate-900
                  dark:group-hover:bg-orange-500
                  dark:group-hover:text-white
                "
              >
                <ShoppingBag size={17} />
                View Details
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}