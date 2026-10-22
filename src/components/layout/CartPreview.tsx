"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../lib/cart-client";

export default function CartPreview() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { items, count, subtotal } = useCart();

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Cart"
        aria-expanded={open}
        className="relative flex h-10 w-10 items-center justify-center rounded-2xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#E63946] dark:text-gray-400 dark:hover:bg-gray-800"
      >
        <ShoppingCart size={20} />
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            className="absolute -right-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#E63946] px-1 text-[10px] font-bold text-white"
          >
            {count}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 hidden w-80 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900 md:block"
          >
            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
                <ShoppingCart size={22} className="text-gray-300 dark:text-gray-600" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Your cart is empty</p>
                <Link
                  href="/menu"
                  onClick={() => setOpen(false)}
                  className="mt-1 text-sm font-semibold text-[#E63946] hover:underline"
                >
                  Browse the menu
                </Link>
              </div>
            ) : (
              <>
                <ul className="max-h-72 divide-y divide-gray-100 overflow-y-auto dark:divide-gray-800">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                        {item.image && (
                          <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.size} · Qty {item.qty}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-semibold text-gray-900 dark:text-gray-100">
                        ৳{item.price * item.qty}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-100 px-4 py-3 dark:border-gray-800">
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">৳{subtotal}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href="/cart"
                      onClick={() => setOpen(false)}
                      className="flex-1 rounded-2xl border border-gray-200 px-3 py-2 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      View Cart
                    </Link>
                    <Link
                      href="/checkout"
                      onClick={() => setOpen(false)}
                      className="flex-1 rounded-2xl bg-gradient-to-r from-[#E63946] to-[#F97316] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}