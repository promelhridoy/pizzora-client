"use client";

import Link from "next/link";
import { ChefHat, MapPin, Mail } from "lucide-react";

import FooterLinkColumn from "./FooterLinkColumn";
import SocialLinks from "./SocialLinks";

const EXPLORE = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Offers", href: "/offers" },
];

const SUPPORT = [
  { label: "Help Center", href: "/help" },
  { label: "Delivery Info", href: "/delivery-info" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Contact", href: "/contact" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "FAQ", href: "/faq" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-[#0B0F14]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E63946] to-[#F97316] text-white shadow-sm">
                <ChefHat size={18} strokeWidth={2.2} />
              </span>

              <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Pizzora
              </span>
            </Link>

            {/* Description */}
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Better pizza. Happier days. Freshly baked and delivered hot, or
              built exactly your way.
            </p>

            {/* Contact */}
            <div className="mt-5 space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={14} className="shrink-0" />

                <a
                  href="mailto:hello@pizzora.app"
                  className="transition-colors hover:text-[#E63946] dark:hover:text-[#F97316]"
                >
                  hello@pizzora.app
                </a>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
            <FooterLinkColumn
              title="Explore"
              links={EXPLORE}
            />

            <FooterLinkColumn
              title="Support"
              links={SUPPORT}
            />

            <FooterLinkColumn
              title="Legal"
              links={LEGAL}
            />
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-gray-100 pt-8 dark:border-gray-800 sm:flex-row">
          {/* Copyright */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 sm:text-left">
            © {new Date().getFullYear()} Pizzora. All rights reserved.
          </p>

          {/* Social Links */}
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
