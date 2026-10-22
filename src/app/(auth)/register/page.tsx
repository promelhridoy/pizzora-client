"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Pizza,
  Sparkles,
  User,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { registerUserApi } from "@/src/lib/auth";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),

    terms: z.boolean().refine((value) => value === true, {
      message: "You must accept the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError("");

    try {
      await registerUserApi({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      router.push("/login"); // register er por login page e pathao
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setServerError(
          err.response?.data?.message || "Registration failed."
        );
      } else {
        setServerError("Something went wrong.");
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F14]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =====================================================
            LEFT — BRAND PANEL
        ===================================================== */}

        <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#E63946] via-[#F4511E] to-[#F97316] lg:flex lg:order-2">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-40 -right-32 h-[30rem] w-[30rem] rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Logo */}
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2 text-white"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md">
                <Pizza size={22} />
              </div>

              <span className="text-xl font-black">
                Pizzora
              </span>
            </Link>

            {/* Center */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-lg"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
                <Sparkles size={14} />
                Join Pizzora
              </div>

              <h1 className="text-5xl font-black leading-tight text-white xl:text-6xl">
                Good pizza
                <br />
                starts here.
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-white/75">
                Create your Pizzora account and make ordering your favorite
                pizza faster, easier, and more personal.
              </p>

              {/* Benefits */}
              <div className="mt-8 space-y-4">
                {[
                  "Save your favorite pizzas",
                  "Track your orders",
                  "Customize your pizza",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-white"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                      <Check size={14} strokeWidth={3} />
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} Pizzora. All rights reserved.
            </p>
          </div>
        </section>

        {/* =====================================================
            RIGHT — REGISTER FORM
        ===================================================== */}

        <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:order-1 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            {/* Mobile logo */}
            <Link
              href="/"
              className="mb-8 flex items-center justify-center gap-2 lg:hidden"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#E63946] to-[#F97316] text-white">
                <Pizza size={21} />
              </span>

              <span className="text-xl font-black text-gray-900 dark:text-white">
                Pizzora
              </span>
            </Link>

            {/* Heading */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-black tracking-tight text-gray-950 dark:text-white">
                Create your account
              </h2>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Join Pizzora and start ordering
              </p>
            </div>

            {/* Card */}
            <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#111827] sm:p-8">

              {/* Server error */}
              {serverError && (
                <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  {serverError}
                </p>
              )}

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
                  >
                    Full name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      {...register("name")}
                      className={`h-12 w-full rounded-xl border bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#E63946] focus:ring-4 focus:ring-[#E63946]/10 dark:bg-[#0B0F14] dark:text-white ${
                        errors.name
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    />
                  </div>

                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register("email")}
                      className={`h-12 w-full rounded-xl border bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#E63946] focus:ring-4 focus:ring-[#E63946]/10 dark:bg-[#0B0F14] dark:text-white ${
                        errors.email
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      {...register("password")}
                      className={`h-12 w-full rounded-xl border bg-gray-50 pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#E63946] focus:ring-4 focus:ring-[#E63946]/10 dark:bg-[#0B0F14] dark:text-white ${
                        errors.password
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
                  >
                    Confirm password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm your password"
                      {...register("confirmPassword")}
                      className={`h-12 w-full rounded-xl border bg-gray-50 pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#E63946] focus:ring-4 focus:ring-[#E63946]/10 dark:bg-[#0B0F14] dark:text-white ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword,
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <div className="pt-1">
                  <label className="flex cursor-pointer items-start gap-2">
                    <input
                      type="checkbox"
                      {...register("terms")}
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#E63946] focus:ring-[#E63946]"
                    />

                    <span className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="font-semibold text-gray-700 underline dark:text-gray-300"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="font-semibold text-gray-700 underline dark:text-gray-300"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>

                  {errors.terms && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.terms.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E63946] to-[#F97316] text-sm font-bold text-white shadow-lg shadow-[#E63946]/20 transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Creating account..."
                    : "Create account"}

                  {!isSubmitting && (
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />

                <span className="text-xs text-gray-400">
                  OR
                </span>

                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
              </div>

              {/* Google */}
              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-[#0B0F14] dark:text-gray-200 dark:hover:bg-gray-900"
              >
                <span className="text-base font-black">G</span>
                Continue with Google
              </button>

              {/* Login */}
              <p className="mt-7 text-center text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#E63946] hover:text-[#F97316]"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}