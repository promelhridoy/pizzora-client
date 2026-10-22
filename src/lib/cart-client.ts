"use client";

import { useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  size: string;
  qty: number;
  price: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  count: number;
  subtotal: number;
  loading: boolean;
}

// TODO(wire-up): replace with real calls to GET /api/cart (and ideally a
// CartContext so add-to-cart actions elsewhere in the app update this instantly
// instead of waiting for the next fetch/poll).
export function useCart(): CartState {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadCart() {
      try {
        // Example real implementation:
        // const res = await fetch("/api/cart", { credentials: "include" });
        // if (res.ok) {
        //   const data = await res.json();
        //   if (!cancelled) setItems(data.items);
        // }
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCart();
    return () => {
      cancelled = true;
    };
  }, []);

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  return { items, count, subtotal, loading };
}