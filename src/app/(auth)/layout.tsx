import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Pizzora",
    template: "%s | Pizzora",
  },
  description: "Fresh pizza, delivered with love.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 dark:bg-[#0B0F14] dark:text-white">
      {children}
    </main>
  );
}