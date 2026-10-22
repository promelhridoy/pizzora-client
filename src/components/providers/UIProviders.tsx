// src/components/providers/UIProviders.tsx
"use client";

import { ThemeProvider } from "next-themes";

export default function UIProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}