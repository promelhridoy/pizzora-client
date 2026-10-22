"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check } from "lucide-react";
import { useOrderStatus, ORDER_STAGES } from "../../lib/order-client";

export default function OrderStatusBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { activeOrder } = useOrderStatus();

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const activeIndex = activeOrder
    ? ORDER_STAGES.findIndex((s) => s.key === activeOrder.stage)
    : -1;

  return (
    <div ref={ref} className="relative">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Order status"
        aria-expanded={open}
        className="relative flex h-10 w-10 items-center justify-center rounded-2xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#F97316] dark:text-gray-400 dark:hover:bg-gray-800"
      >
        <Bell size={20} />
        {activeOrder && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#F97316]">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#F97316]" />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 hidden w-80 overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-xl dark:border-gray-800 dark:bg-gray-900 md:block"
          >
            {!activeOrder ? (
              <div className="flex flex-col items-center gap-2 py-6 text-center">
                <Bell size={20} className="text-gray-300 dark:text-gray-600" />
                <p className="text-sm text-gray-500 dark:text-gray-400">No active orders right now</p>
              </div>
            ) : (
              <>
                <p className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Order #{activeOrder.id}
                </p>
                <ol className="space-y-0">
                  {ORDER_STAGES.map((stage, i) => {
                    const done = i < activeIndex;
                    const current = i === activeIndex;
                    const isLast = i === ORDER_STAGES.length - 1;
                    return (
                      <li key={stage.key} className="relative flex gap-3 pb-6 last:pb-0">
                        {!isLast && (
                          <span
                            className={`absolute left-3 top-6 h-full w-0.5 -translate-x-1/2 ${
                              done ? "bg-[#E63946]" : "bg-gray-200 dark:bg-gray-700"
                            }`}
                          />
                        )}
                        <span
                          className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            done
                              ? "bg-[#E63946] text-white"
                              : current
                              ? "bg-gradient-to-br from-[#E63946] to-[#F97316] text-white"
                              : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                          }`}
                        >
                          {done ? <Check size={13} /> : i + 1}
                        </span>
                        <span
                          className={`pt-0.5 text-sm ${
                            current
                              ? "font-semibold text-gray-900 dark:text-gray-100"
                              : done
                              ? "text-gray-500 dark:text-gray-400"
                              : "text-gray-400 dark:text-gray-500"
                          }`}
                        >
                          {stage.label}
                          {current && (
                            <span className="ml-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#F97316] align-middle" />
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ol>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-2xl bg-gray-50 px-3 py-2 text-center text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Track full order
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}