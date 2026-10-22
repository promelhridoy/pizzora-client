"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, Send, Sparkles } from "lucide-react";

export default function FinalCtaAndNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    setIsSubmitting(true);

    // TODO: Connect newsletter API here
    await new Promise((resolve) => setTimeout(resolve, 700));

    setSubmitted(true);
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <>
      {/* =========================
          FINAL CTA
      ========================== */}
      <section className="relative overflow-hidden bg-white py-20 dark:bg-[#030712] sm:py-24">
        {/* Background Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E63946]/10 blur-[120px] dark:bg-[#E63946]/15"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-orange-400/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-red-500/10 blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
        >
          {/* Small Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-[#E63946] dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
          >
            <Sparkles size={15} />
            Create something delicious
          </motion.div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Ready to build your{" "}
            <span className="bg-gradient-to-r from-[#E63946] via-[#F97316] to-[#FB923C] bg-clip-text text-transparent">
              perfect pizza?
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-500 dark:text-gray-400 sm:text-lg">
            Choose your favorite ingredients, customize every detail, and
            create a pizza that is uniquely yours.
          </p>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="mt-9 inline-block"
          >
            <Link
              href="/dashboard/pizza-builder"
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#E63946] to-[#F97316] px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#E63946]/20 transition-all duration-300 hover:shadow-2xl hover:shadow-[#E63946]/30 sm:px-8"
            >
              Build Your Pizza

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* =========================
          NEWSLETTER
      ========================== */}
      <section className="relative overflow-hidden border-t border-gray-100 bg-[#F8FAFC] py-16 dark:border-gray-800/70 dark:bg-[#0B0F14] sm:py-20">
        {/* Decorative Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-400/10 blur-[100px]"
        />

        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E63946] to-[#F97316] text-white shadow-lg shadow-orange-500/20"
          >
            <Mail size={21} />
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Get{" "}
              <span className="text-[#E63946]">10% off</span> your first order
            </h3>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
              Join our pizza lovers community and get exclusive offers,
              delicious updates, and special discounts straight to your inbox.
            </p>
          </motion.div>

          {/* Newsletter Form */}
          <motion.form
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            onSubmit={handleSubscribe}
            className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            {/* Input */}
            <div className="relative flex-1">
              <Mail
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSubmitted(false);
                }}
                placeholder="Enter your email address"
                className="h-13 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#F97316] focus:ring-4 focus:ring-orange-500/10 dark:border-gray-700 dark:bg-[#151B23] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-[#F97316]"
              />
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-13 shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#E63946] to-[#F97316] px-6 text-sm font-bold text-white shadow-lg shadow-orange-500/15 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/25 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Subscribing...
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Get Discount</span>
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Success Message */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mx-auto mt-4 flex max-w-xl items-center justify-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400"
            >
              <CheckCircle2 size={17} />

              <span>
                You&apos;re subscribed! Check your inbox for your discount
                code.
              </span>
            </motion.div>
          )}

          {/* Privacy Text */}
          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            No spam. Just pizza, offers, and delicious updates. 🍕
          </p>
        </div>
      </section>
    </>
  );
}