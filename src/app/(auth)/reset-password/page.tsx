"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 8) return;
    if (password !== confirmPassword) return;

    // TODO:
    // Get reset token from URL
    // POST /api/v1/auth/reset-password

    setSuccess(true);
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-6 text-center"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
          <CheckCircle2 size={34} />
        </div>

        <h1 className="text-2xl font-black">
          Password updated!
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
          Your password has been successfully changed. You can now sign in
          with your new password.
        </p>

        <Link
          href="/login"
          className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 text-sm font-bold text-white transition hover:bg-orange-600"
        >
          Continue to Login
          <ArrowRight size={17} />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      {/* Icon */}
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
        <LockKeyhole size={28} />
      </div>

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
          Create a new password
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Choose a strong password that you haven't used before.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold"
          >
            New password
          </label>

          <div className="relative">
            <LockKeyhole
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.04]"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-semibold"
          >
            Confirm password
          </label>

          <div className="relative">
            <LockKeyhole
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/[0.04]"
            />

            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Password info */}
        <div className="rounded-xl bg-slate-100 p-4 text-xs leading-5 text-slate-500 dark:bg-white/[0.04] dark:text-slate-400">
          <p className="font-semibold text-slate-700 dark:text-slate-200">
            Password requirements
          </p>

          <ul className="mt-2 space-y-1">
            <li>• At least 8 characters</li>
            <li>• Avoid using common passwords</li>
            <li>• Use a mix of letters and numbers</li>
          </ul>
        </div>

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 active:scale-[0.98]"
        >
          Reset Password
          <ArrowRight size={18} />
        </button>
      </form>

      <Link
        href="/login"
        className="mt-7 flex items-center justify-center text-sm font-semibold text-slate-500 hover:text-orange-500 dark:text-slate-400"
      >
        Back to login
      </Link>
    </motion.div>
  );
}