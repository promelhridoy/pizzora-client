"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  MailCheck,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

export default function VerifyEmailPage() {
  const [resent, setResent] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleResend = () => {
    // TODO:
    // POST /api/v1/auth/resend-verification

    setResent(true);

    setTimeout(() => {
      setResent(false);
    }, 3000);
  };

  const handleDemoVerify = () => {
    // TODO:
    // Backend verification will happen using token from URL

    setVerified(true);
  };

  if (verified) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-6 text-center"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
          <CheckCircle2 size={34} />
        </div>

        <h1 className="text-2xl font-black">
          Email verified!
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
          Your email has been successfully verified. Welcome to Pizzora!
        </p>

        <Link
          href="/login"
          className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-orange-500 px-6 text-sm font-bold text-white transition hover:bg-orange-600"
        >
          Continue to Login
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="text-center"
    >
      {/* Icon */}
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
        <MailCheck size={32} />
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
        Verify your email
      </h1>

      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
        We've sent a verification link to your email address. Please check
        your inbox and click the link to activate your account.
      </p>

      {/* Email placeholder */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
        <div className="flex items-center justify-center gap-2 text-sm font-semibold">
          <MailCheck size={17} className="text-orange-500" />
          Check your inbox
        </div>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          The verification link may expire for security reasons.
        </p>
      </div>

      {/* Resend */}
      <div className="mt-7">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Didn't receive the email?
        </p>

        <button
          type="button"
          onClick={handleResend}
          disabled={resent}
          className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-orange-500 transition hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={resent ? "animate-spin" : ""}
          />

          {resent ? "Verification email sent" : "Resend verification email"}
        </button>
      </div>

      {/* Temporary demo action */}
      <button
        type="button"
        onClick={handleDemoVerify}
        className="mt-8 text-xs text-slate-400 underline underline-offset-4 transition hover:text-orange-500"
      >
        Demo: Mark as verified
      </button>

      {/* Back */}
      <Link
        href="/login"
        className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 hover:text-orange-500 dark:text-slate-400"
      >
        <ArrowLeft size={16} />
        Back to login
      </Link>
    </motion.div>
  );
}