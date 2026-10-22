"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  LockKeyhole,
  Mail,
  RefreshCw,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setServerError("");

    try {
      /*
       * TODO: Connect with Pizzora backend
       *
       * const response = await fetch(
       *   `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/forgot-password`,
       *   {
       *     method: "POST",
       *     headers: {
       *       "Content-Type": "application/json",
       *     },
       *     body: JSON.stringify({
       *       email: data.email,
       *     }),
       *   }
       * );
       *
       * const result = await response.json();
       *
       * if (!response.ok) {
       *   throw new Error(result.message || "Something went wrong");
       * }
       */

      // Temporary UI simulation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmittedEmail(data.email);
      setIsSuccess(true);
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  const handleTryAgain = () => {
    setIsSuccess(false);
    setServerError("");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8FAFC] px-4 py-10 dark:bg-[#0B0F14]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Top Brand */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-7 text-center"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2"
            aria-label="Pizzora home"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#E63946] to-[#F97316] text-white shadow-lg shadow-orange-500/20 transition-transform duration-300 group-hover:scale-105">
              <span className="text-lg">🍕</span>
            </span>

            <span className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              Pizz<span className="text-orange-500">o</span>ra
            </span>
          </Link>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 dark:border-white/10 dark:bg-[#111827] dark:shadow-black/20"
        >
          {!isSuccess ? (
            <>
              {/* Header Icon */}
              <div className="mb-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                  <LockKeyhole size={27} strokeWidth={2} />
                </div>
              </div>

              {/* Heading */}
              <div className="mb-8">
                <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl dark:text-white">
                  Forgot your password?
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  No worries. Enter the email address associated with your
                  Pizzora account and we&apos;ll send you a secure reset link.
                </p>
              </div>

              {/* Server Error */}
              {serverError && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                >
                  <TriangleAlert
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <p>{serverError}</p>
                </motion.div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      {...register("email")}
                      className={`h-12 w-full rounded-xl border bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 focus:ring-orange-500/10 dark:bg-[#0B0F14] dark:text-white ${
                        errors.email
                          ? "border-red-500 focus:border-red-500"
                          : "border-slate-200 focus:border-orange-500 dark:border-white/10 dark:focus:border-orange-500"
                      }`}
                    />
                  </div>

                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 text-xs font-medium text-red-500"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E63946] to-[#F97316] text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Sending reset link...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Security Note */}
              <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-50 p-4 dark:bg-white/[0.04]">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-500"
                />

                <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                  For your security, we&apos;ll never reveal whether an email
                  is registered with Pizzora.
                </p>
              </div>

              {/* Back */}
              <Link
                href="/login"
                className="mt-7 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-orange-500 dark:text-slate-400"
              >
                <ArrowLeft size={16} />
                Back to login
              </Link>
            </>
          ) : (
            /* ================= SUCCESS ================= */
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="py-3 text-center"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.1,
                  duration: 0.35,
                }}
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500"
              >
                <CheckCircle2 size={34} />
              </motion.div>

              {/* Heading */}
              <h1 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                Check your inbox
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                If an account exists for
              </p>

              {/* Email */}
              <div className="mx-auto mt-3 flex w-fit max-w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-white/10 dark:bg-white/[0.04]">
                <Mail
                  size={16}
                  className="shrink-0 text-orange-500"
                />

                <span className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {submittedEmail}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
                we&apos;ve sent a password reset link. Please check your
                inbox and follow the instructions.
              </p>

              {/* Helpful info */}
              <div className="mt-6 rounded-xl bg-slate-50 p-4 text-left dark:bg-white/[0.04]">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Didn&apos;t receive the email?
                </p>

                <ul className="mt-2 space-y-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  <li>• Check your spam or junk folder.</li>
                  <li>• Make sure your email address is correct.</li>
                  <li>• Wait a few minutes before trying again.</li>
                </ul>
              </div>

              {/* Login */}
              <Link
                href="/login"
                className="mt-7 flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E63946] to-[#F97316] text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:shadow-xl"
              >
                Back to Login
                <ArrowRight size={17} />
              </Link>

              {/* Try Again */}
              <button
                type="button"
                onClick={handleTryAgain}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-orange-500 dark:text-slate-400"
              >
                <RefreshCw size={15} />
                Try another email
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <p className="mt-6 text-center text-[11px] leading-5 text-slate-400">
          © {new Date().getFullYear()} Pizzora. All rights reserved.
        </p>
      </div>
    </main>
  );
}