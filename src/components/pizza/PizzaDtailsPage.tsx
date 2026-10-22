"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingCart,
  Loader2,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  X,
} from "lucide-react";
import { toast } from "sonner";

// ==================== Types ====================

interface PizzaSize {
  label: string;
  price: number;
  _id?: string;
}

interface PizzaIngredient {
  ingredientId: string;
  name: string;
  quantity: number;
  unit: "g" | "kg" | "ml" | "l" | "piece";
  removable: boolean;
  removalPrice: number;
}

interface Pizza {
  _id: string;
  name: string;
  description: string;
  category: string;
  image?: string;
  available: boolean;
  sizes: PizzaSize[];
  defaultIngredients?: PizzaIngredient[];
}

interface CartItem {
  pizzaId: string;
  name: string;
  image?: string;
  size: string;
  price: number;
  quantity: number;
  totalPrice: number;
  removedIngredients?: string[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: Pizza;
}

// ==================== Component ====================

export default function PizzaDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const pizzaId = params.id as string;

  // ==================== State ====================

  const [pizza, setPizza] = useState<Pizza | null>(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);

  const [selectedSize, setSelectedSize] =
    useState<PizzaSize | null>(null);

     const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);

  // ==================== Fetch Pizza Details ====================

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        setLoading(true);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error("API URL is not configured");
        }

        if (!pizzaId) {
          throw new Error("Pizza ID is missing");
        }

        const response = await fetch(
          `${apiUrl}/api/v1/pizza/${pizzaId}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const responseText = await response.text();

        let result: ApiResponse;

        try {
          result = JSON.parse(responseText);
        } catch {
          console.error("Invalid API response:", responseText);

          throw new Error(
            "The server returned an invalid response. Please check your API URL."
          );
        }

        if (!response.ok || !result.success || !result.data) {
          throw new Error(result.message || "Pizza not found");
        }

        const pizzaData = result.data;

        setPizza({
          ...pizzaData,
          sizes: Array.isArray(pizzaData.sizes)
            ? pizzaData.sizes
            : [],
          defaultIngredients: Array.isArray(
            pizzaData.defaultIngredients
          )
            ? pizzaData.defaultIngredients
            : [],
        });

        // Select first size automatically
        if (pizzaData.sizes?.length > 0) {
          setSelectedSize(pizzaData.sizes[0]);
        }

        // Reset customization when pizza changes
        setRemovedIngredients([]);
        setQuantity(1);
      } catch (error) {
        console.error("Pizza details error:", error);

        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to load pizza details";

        toast.error(errorMessage);
        setPizza(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPizza();
  }, [pizzaId]);

  // ==================== Quantity Handlers ====================

  const handleQuantityDecrease = () => {
    setQuantity((previous) => Math.max(1, previous - 1));
  };

  const handleQuantityIncrease = () => {
    setQuantity((previous) => previous + 1);
  };

  // ==================== Ingredient Handlers ====================

  const handleToggleIngredient = (ingredientId: string) => {
    setRemovedIngredients((previous) => {
      if (previous.includes(ingredientId)) {
        return previous.filter((id) => id !== ingredientId);
      }

      return [...previous, ingredientId];
    });
  };

  const handleResetIngredients = () => {
    setRemovedIngredients([]);
    toast.success("All ingredients restored");
  };

  // ==================== Price Calculation ====================

  const ingredientDiscount =
  (pizza?.defaultIngredients ?? [])
    .filter((ingredient) =>
      removedIngredients.includes(ingredient.ingredientId)
    )
    .reduce(
      (total, ingredient) =>
        total + (ingredient.removalPrice || 0),
      0
    );

const customizedUnitPrice = Math.max(
  0,
  (selectedSize?.price ?? 0) - ingredientDiscount
);

const totalPrice = customizedUnitPrice * quantity;

  // ==================== Add To Cart ====================

  const handleAddToCart = () => {
    if (!pizza || !selectedSize) {
      toast.error("Please select a pizza size");
      return;
    }

    if (!pizza.available) {
      toast.error("This pizza is currently unavailable");
      return;
    }

    const cartItem: CartItem = {
      pizzaId: pizza._id,
      name: pizza.name,
      image: pizza.image,
      size: selectedSize.label,
      price: customizedUnitPrice,
      quantity,
      totalPrice: customizedUnitPrice * quantity,
      removedIngredients,
    };

    let existingCart: CartItem[] = [];

    try {
      const storedCart = localStorage.getItem("pizzora-cart");

      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);

        if (Array.isArray(parsedCart)) {
          existingCart = parsedCart;
        }
      }
    } catch (error) {
      console.error("Cart parsing error:", error);
      existingCart = [];
    }

    // Find same pizza + size + same customization
    const existingItemIndex = existingCart.findIndex((item) => {
      const existingRemoved = [
        ...(item.removedIngredients ?? []),
      ].sort();

      const currentRemoved = [
        ...(cartItem.removedIngredients ?? []),
      ].sort();

      return (
        item.pizzaId === cartItem.pizzaId &&
        item.size === cartItem.size &&
        JSON.stringify(existingRemoved) ===
          JSON.stringify(currentRemoved)
      );
    });

    if (existingItemIndex !== -1) {
      const existingItem = existingCart[existingItemIndex];

      const updatedQuantity =
        existingItem.quantity + quantity;

      existingCart[existingItemIndex] = {
        ...existingItem,
        quantity: updatedQuantity,
        totalPrice:
          customizedUnitPrice * updatedQuantity,
      };
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem(
      "pizzora-cart",
      JSON.stringify(existingCart)
    );

    toast.success("Pizza added to cart successfully 🍕");

    router.push("/cart");
  };

  // ==================== Loading State ====================

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f8fafc] dark:bg-[#0b0f14]">
        <div className="flex flex-col items-center gap-4">
          <Loader2
            size={42}
            className="animate-spin text-orange-500"
          />

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Loading pizza details...
          </p>
        </div>
      </main>
    );
  }

  // ==================== Not Found State ====================

  if (!pizza) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-5 bg-[#f8fafc] px-4 text-center dark:bg-[#0b0f14]">
        <div className="rounded-full bg-orange-100 p-6 dark:bg-orange-500/10">
          <AlertCircle
            size={64}
            className="text-orange-500"
          />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Pizza Not Found
        </h2>

        <p className="max-w-md text-slate-500 dark:text-slate-400">
          The pizza you are looking for does not exist or could
          not be loaded.
        </p>

        <Link
          href="/menu"
          className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Back to Menu
        </Link>
      </main>
    );
  }

  const ingredients = pizza.defaultIngredients ?? [];

  // ==================== Main UI ====================

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-8 text-slate-900 dark:bg-[#0b0f14] dark:text-white md:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}

        <Link
          href="/menu"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-orange-500 dark:text-slate-300"
        >
          <ArrowLeft size={18} />
          Back to Menu
        </Link>

        {/* Main Details Card */}

        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#111827] md:grid-cols-2">
          {/* ==================== Image Section ==================== */}

          <div className="relative min-h-[350px] overflow-hidden bg-slate-100 dark:bg-[#0f172a] md:min-h-[650px]">
            {pizza.image ? (
              <Image
                src={pizza.image}
                alt={pizza.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover brightness-105 contrast-105"
              />
            ) : (
              <div className="flex h-full min-h-[350px] items-center justify-center text-8xl">
                🍕
              </div>
            )}

            {!pizza.available && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="rounded-full bg-white px-5 py-3 font-bold text-slate-900">
                  Currently Unavailable
                </span>
              </div>
            )}

            {/* Subtle gradient — only enough to keep bottom badges/text readable */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

            {/* Category Badge — top-left */}
            <div className="absolute left-5 top-5">
              <span className="rounded-full bg-white/95 px-4 py-2 text-sm font-bold capitalize text-orange-600 shadow-lg backdrop-blur-sm dark:bg-slate-900/90 dark:text-orange-400">
                {pizza.category}
              </span>
            </div>

            {/* ==================== Corner Ribbon Badge — top-right ==================== */}
            <div className="absolute -right-14 top-7 z-10 w-48 rotate-45">
              <div className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#E63946] to-[#F97316] py-2 text-center text-xs font-black uppercase tracking-wider text-white shadow-[0_4px_14px_rgba(0,0,0,0.35)]">
                🔥 Chef's Pick
              </div>
            </div>
          </div>

          {/* ==================== Details Section ==================== */}

          <div className="flex flex-col p-6 md:p-10">
            {/* Category */}

            <span className="mb-4 w-fit rounded-full bg-orange-100 px-3 py-1.5 text-sm font-bold capitalize text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
              {pizza.category} pizza
            </span>

            {/* Name */}

            <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              {pizza.name}
            </h1>

            {/* Description */}

            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
              {pizza.description ||
                "A delicious pizza made with fresh ingredients."}
            </p>

            {/* Availability */}

            <div className="mt-5 flex items-center gap-2 text-sm">
              <CheckCircle2
                size={18}
                className={
                  pizza.available
                    ? "text-green-500"
                    : "text-red-500"
                }
              />

              <span
                className={
                  pizza.available
                    ? "font-semibold text-green-600"
                    : "font-semibold text-red-500"
                }
              >
                {pizza.available
                  ? "Available Now"
                  : "Currently Unavailable"}
              </span>
            </div>

            {/* ==================== Size Selection ==================== */}

            <div className="mt-8">
              <h3 className="mb-3 text-lg font-bold">
                Choose Your Size
              </h3>

              {pizza.sizes.length > 0 ? (
                <div className="grid grid-cols-3 gap-3">
                  {pizza.sizes.map((size) => {
                    const isSelected =
                      selectedSize?.label === size.label;

                    return (
                      <button
                        key={
                          size._id ??
                          `${pizza._id}-${size.label}`
                        }
                        type="button"
                        onClick={() =>
                          setSelectedSize(size)
                        }
                        className={`rounded-xl border px-3 py-3 text-center transition-all duration-200 ${
                          isSelected
                            ? "border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                            : "border-slate-300 bg-transparent hover:border-orange-500 dark:border-white/20"
                        }`}
                      >
                        <p className="font-bold">
                          {size.label}
                        </p>

                        <p className="mt-1 text-sm">
                          ৳{size.price}
                        </p>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-red-500">
                  No sizes available
                </p>
              )}
            </div>

            {/* ==================== Ingredients ==================== */}

            {ingredients.length > 0 && (
              <div className="mt-8">
                {/* Header */}

                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold">
                      Customize Your Pizza
                    </h3>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Remove any ingredient you do not want.
                    </p>
                  </div>

                  {removedIngredients.length > 0 && (
                    <button
                      type="button"
                      onClick={handleResetIngredients}
                      className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-orange-500 transition hover:text-orange-600"
                    >
                      <RotateCcw size={15} />
                      Reset
                    </button>
                  )}
                </div>

                {/* Ingredients List */}

                <div className="space-y-3">
                  {ingredients.map((ingredient) => {
                    const isRemoved =
                      removedIngredients.includes(
                        ingredient.ingredientId
                      );

                    return (
                      <div
                        key={ingredient.ingredientId}
                        className={`flex items-center justify-between gap-4 rounded-2xl border p-4 transition-all duration-200 ${
                          isRemoved
                            ? "border-red-200 bg-red-50 dark:border-red-500/20 dark:bg-red-500/10"
                            : "border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5"
                        }`}
                      >
                        {/* Ingredient Info */}

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p
                              className={`font-semibold ${
                                isRemoved
                                  ? "text-slate-400 line-through"
                                  : "text-slate-900 dark:text-white"
                              }`}
                            >
                              {ingredient.name}
                            </p>

                            {/* Status */}

                            {isRemoved ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600 dark:bg-red-500/10 dark:text-red-400">
                                <X size={12} />
                                Removed
                              </span>
                            ) : (
                              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-600 dark:bg-green-500/10 dark:text-green-400">
                                Included
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {ingredient.quantity}
                            {ingredient.unit}
                          </p>

                          {ingredient.removable && (
                            <p
                              className={`mt-1 text-xs font-medium ${
                                isRemoved
                                  ? "text-red-500"
                                  : "text-slate-500 dark:text-slate-400"
                              }`}
                            >
                              {isRemoved
                                ? `Price reduced by ৳${ingredient.removalPrice}`
                                : `Remove & save ৳${ingredient.removalPrice}`}
                            </p>
                          )}
                        </div>

                        {/* Remove Button */}

                        {ingredient.removable ? (
                          <button
                            type="button"
                            onClick={() =>
                              handleToggleIngredient(
                                ingredient.ingredientId
                              )
                            }
                            className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                              isRemoved
                                ? "bg-green-500 text-white hover:bg-green-600"
                                : "bg-red-500 text-white hover:bg-red-600"
                            }`}
                          >
                            {isRemoved
                              ? "Add Back"
                              : "Remove"}
                          </button>
                        ) : (
                          <span className="shrink-0 rounded-full bg-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500 dark:bg-white/10 dark:text-slate-400">
                            Required
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ==================== Price Summary ==================== */}

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Base Price
                </span>

                <span className="font-semibold">
                  ৳{selectedSize?.price ?? 0}
                </span>
              </div>

              {ingredientDiscount > 0 && (
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-red-500">
                    Ingredient Discount
                  </span>

                  <span className="font-semibold text-red-500">
                    -৳{ingredientDiscount}
                  </span>
                </div>
              )}

              <div className="my-4 border-t border-slate-200 dark:border-white/10" />

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Price per pizza
                  </p>

                  <h2 className="mt-1 text-3xl font-extrabold text-orange-500">
                    ৳{customizedUnitPrice}
                  </h2>
                </div>

                {quantity > 1 && (
                  <div className="text-right">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {quantity} pizzas
                    </p>

                    <p className="font-bold">
                      ৳{totalPrice}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ==================== Quantity ==================== */}

            <div className="mt-8 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">
                  Quantity
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  How many pizzas?
                </p>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-slate-300 px-3 py-2 dark:border-white/20">
                <button
                  type="button"
                  onClick={handleQuantityDecrease}
                  disabled={quantity <= 1}
                  className="rounded-lg p-1 transition hover:bg-orange-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} />
                </button>

                <span className="min-w-5 text-center font-bold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={handleQuantityIncrease}
                  className="rounded-lg p-1 transition hover:bg-orange-500 hover:text-white"
                  aria-label="Increase quantity"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* ==================== Final Total ==================== */}

            <div className="mt-8 border-t border-slate-200 pt-6 dark:border-white/10">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Total Price
                  </p>

                  <h2 className="mt-1 text-3xl font-extrabold text-orange-500">
                    ৳{totalPrice}
                  </h2>
                </div>

                <button
                  type="button"
                  disabled={
                    !pizza.available ||
                    !selectedSize ||
                    pizza.sizes.length === 0
                  }
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  <ShoppingCart size={20} />

                  {pizza.available
                    ? "Add to Cart"
                    : "Unavailable"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== Bottom Info ==================== */}

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#111827]">
            <p className="text-sm font-bold">
              🍕 Freshly Prepared
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Made fresh after you place your order.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#111827]">
            <p className="text-sm font-bold">
              🧀 Customize Your Pizza
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Remove ingredients you do not want.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#111827]">
            <p className="text-sm font-bold">
              🚚 Fast Delivery
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Hot and fresh pizza delivered to you.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}