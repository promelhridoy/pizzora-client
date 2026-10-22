"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/src/data/NavLink";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center gap-1 md:flex">
      {NAV_LINKS.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <li key={link.href} className="relative">
            <Link
              href={link.href}
              className={`relative z-10 block rounded-2xl px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "text-white"
                  : "text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400"
              }`}
            >
              {link.label}
            </Link>

            {isActive && (
              <motion.span
                layoutId="nav-active-pill"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#E63946] to-[#F97316] shadow-sm"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}