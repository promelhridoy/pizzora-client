"use client";

import { motion } from "framer-motion";

const DOTS = [0, 1, 2];

export default function Loading() {
  return (
    <div className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white dark:bg-[#0B0F14]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#E63946]/15 via-[#F97316]/10 to-transparent blur-3xl"
      />

      <div className="relative flex flex-col items-center gap-6">
        {/* Rotating dashed ring around the pizza, echoes the Hero rings */}
        <div className="relative flex h-32 w-32 items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute h-32 w-32 rounded-full border-2 border-dashed border-[#F97316]/30"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute h-24 w-24 rounded-full border border-[#E63946]/20"
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-20 w-20 rounded-full bg-gradient-to-br from-[#F97316]/25 to-[#E63946]/10 blur-xl"
          />
          <motion.span
            animate={{ rotate: [0, -8, 8, 0], y: [0, -4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 text-5xl"
          >
            🍕
          </motion.span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Firing up the oven
          </p>
          <div className="flex gap-1.5">
            {DOTS.map((i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                className="h-2 w-2 rounded-full bg-gradient-to-br from-[#E63946] to-[#F97316]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}