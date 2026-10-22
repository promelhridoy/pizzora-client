"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-4 text-center dark:bg-[#0B0F14]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-[#E63946]/15 via-[#F97316]/10 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#F97316]/5 blur-3xl"
      />

      {/* Rotating rings + dropped pizza slice */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-48 w-48 items-center justify-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute h-48 w-48 rounded-full border border-dashed border-[#F97316]/25"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="absolute h-36 w-36 rounded-full border border-[#E63946]/15"
        />
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-28 w-28 rounded-full bg-gradient-to-br from-[#F97316]/25 to-[#E63946]/10 blur-2xl"
        />
        <motion.span
          animate={{ y: [0, -10, 0], rotate: [-6, 6, -6] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 text-7xl"
        >
          🍕
        </motion.span>

        <motion.span
          animate={{ y: [0, -8, 0], opacity: [0.3, 1, 0.3], rotate: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-2 top-4 text-lg text-[#F97316]"
        >
          ✦
        </motion.span>
        <motion.span
          animate={{ y: [0, 8, 0], opacity: [0.2, 0.9, 0.2], rotate: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-1 bottom-6 text-sm text-[#E63946]"
        >
          ✦
        </motion.span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 bg-gradient-to-r from-[#E63946] via-[#F4511E] to-[#F97316] bg-clip-text text-6xl font-black tracking-tight text-transparent sm:text-7xl"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-2 text-xl font-bold text-gray-950 dark:text-white sm:text-2xl"
      >
        This slice went missing
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400"
      >
        The page you're looking for doesn't exist, moved, or maybe someone
        already ate it.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 flex flex-col gap-3 sm:flex-row"
      >
        <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#E63946] to-[#F97316] px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#E63946]/20"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/menu"
            className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white/80 px-7 py-3.5 text-sm font-bold text-gray-700 backdrop-blur-sm dark:border-gray-700 dark:bg-white/[0.03] dark:text-gray-200"
          >
            <ArrowLeft size={16} />
            Browse Menu
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}