"use client";

import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

const SOCIALS = [
  {
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: FaFacebookF,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: FaTwitter,
    href: "https://twitter.com",
    label: "Twitter",
  },
  {
    icon: FaGithub,
    href: "https://github.com",
    label: "GitHub",
  },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {SOCIALS.map(({ icon: Icon, href, label }) => (
        <motion.a
          key={label}
          whileHover={{
            scale: 1.15,
            y: -2,
          }}
          whileTap={{
            scale: 0.9,
          }}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-2xl border border-gray-200 text-gray-500 transition-all duration-200 hover:border-[#F97316] hover:text-[#F97316] hover:shadow-sm dark:border-gray-700 dark:text-gray-400 dark:hover:border-[#F97316] dark:hover:text-[#F97316]"
        >
          <Icon size={14} />
        </motion.a>
      ))}
    </div>
  );
}

