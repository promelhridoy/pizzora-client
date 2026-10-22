"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Search, Menu, X, User, LogOut, LayoutDashboard, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import CartPreview from "./CartPreview";
import OrderStatusBell from "./OrderStatusBell";
// TODO(wire-up): swap this mock for your real JWT auth hook once /api/auth/me exists
import { useAuth, signOut } from "../../lib/auth-client";
import { useCart } from "../../lib/cart-client";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  const router = useRouter();
  const { currentUser } = useAuth();
  const { count: cartCount } = useCart();

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 8);
      // Hide on scroll down past the header height, reveal on scroll up.
      // Never hide while a menu/dropdown is open, and never hide near the top.
      if (!mobileOpen && !searchOpen && !profileOpen) {
        if (y > lastScrollY.current && y > 120) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      }
      lastScrollY.current = y;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen, searchOpen, profileOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    window.location.href = `/menu?search=${encodeURIComponent(query.trim())}`;
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    setProfileOpen(false);
    setMobileOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <motion.header
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
  scrolled
    ? "border-b border-gray-200 bg-white shadow-sm backdrop-blur-lg dark:border-gray-800 dark:bg-[#0B0F14]"
    : "border-b border-transparent bg-white/95 backdrop-blur-md dark:bg-[#0B0F14]/95"
}`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="./" className="group flex shrink-0 items-center gap-2">
           <Image
    src="/pizzora-logo.png"
    alt="Pizzora"
    width={140}
    height={45}
    priority
    className="h-auto w-[120px] object-contain sm:w-[140px]"
  />

        </Link>

        {/* Desktop nav links — active route auto-highlighted */}
        <NavLinks />

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search — desktop only */}
          <div className="hidden md:block">
            <AnimatePresence initial={false} mode="wait">
              {searchOpen ? (
                <motion.form
                  key="search-input"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 240, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  onSubmit={handleSearchSubmit}
                  className="flex items-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 shadow-inner dark:border-gray-700 dark:bg-gray-800"
                >
                  <Search size={16} className="shrink-0 text-gray-400 dark:text-gray-500" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={() => !query && setSearchOpen(false)}
                    placeholder="Search pizzas or ingredients..."
                    className="ml-2 w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
                  />
                </motion.form>
              ) : (
                <motion.button
                  key="search-icon"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchOpen(true)}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#F97316] dark:text-gray-400 dark:hover:bg-gray-800"
                  aria-label="Open search"
                >
                  <Search size={20} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Order status — only meaningful once someone is logged in */}
          {currentUser && (
            <div className="hidden md:block">
              <OrderStatusBell />
            </div>
          )}

          {/* Cart preview — always visible */}
          <CartPreview />

          {currentUser ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setProfileOpen((v) => !v)}
                className="relative hidden h-10 w-10 items-center justify-center overflow-hidden rounded-2xl ring-2 ring-[#F97316]/30 md:flex"
                aria-label="Open profile menu"
              >
                <Image
                  src={currentUser.avatar || "/default-avatar.png"}
                  alt={currentUser.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500 dark:border-gray-900" />
              </motion.button>

              <div className="relative h-9 w-9 overflow-hidden rounded-2xl ring-2 ring-[#F97316]/30 md:hidden">
                <Image
                  src={currentUser.avatar || "/default-avatar.png"}
                  alt={currentUser.name}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 hidden w-52 overflow-hidden rounded-2xl border border-gray-100 bg-white py-2 shadow-xl dark:border-gray-800 dark:bg-gray-900 md:block"
                  >
                    <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                    {currentUser.role === "admin" && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-[#E63946] hover:bg-red-50 dark:text-[#F97316] dark:hover:bg-orange-900/20"
                      >
                        <ShieldCheck size={16} /> Admin Panel
                      </Link>
                    )}
                    <Link href="/profile/me" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
                      <User size={16} /> My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-[#E63946] hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/login"
                className="rounded-2xl px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Log in
              </Link>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/register"
                  className="rounded-2xl bg-gradient-to-r from-[#E63946] to-[#F97316] px-4 py-2 text-sm font-semibold text-white shadow-sm"
                >
                  Sign up
                </Link>
              </motion.div>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-2xl text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 md:hidden"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile menu — search + links + cart + order status + theme + auth actions */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <div className="border-t border-gray-100 px-4 pt-4 dark:border-gray-800 md:hidden">
              <form onSubmit={handleSearchSubmit} className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
                <Search size={16} className="text-gray-400 dark:text-gray-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pizzas..."
                  className="ml-2 w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
                />
              </form>
            </div>
            <MobileMenu
              currentUser={
                currentUser
                  ? {
                      name: currentUser.name,
                      email: currentUser.email,
                      avatar: currentUser.avatar || "/default-avatar.png",
                      role: currentUser.role ?? "user",
                    }
                  : null
              }
              cartCount={cartCount}
              onLinkClick={() => setMobileOpen(false)}
              onLogout={handleLogout}
            />
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}