"use client";

import { useState, useEffect } from "react";

export type OrderStage = "received" | "kitchen" | "delivery";

export interface ActiveOrder {
  id: string;
  stage: OrderStage;
}

// TODO(wire-up): replace with a poll (setInterval + fetch) or a WebSocket
// subscription against your order-status endpoint, per the spec:
// Order Received → In Kitchen → Sent to Delivery.
export function useOrderStatus(): { activeOrder: ActiveOrder | null; loading: boolean } {
  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadOrder() {
      try {
        // Example real implementation:
        // const res = await fetch("/api/orders/active", { credentials: "include" });
        // if (res.ok) {
        //   const data = await res.json();
        //   if (!cancelled) setActiveOrder(data.order ?? null);
        // }
        if (!cancelled) setActiveOrder(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadOrder();
    // Example polling: const id = setInterval(loadOrder, 15000); return () => clearInterval(id);
    return () => {
      cancelled = true;
    };
  }, []);

  return { activeOrder, loading };
}

export const ORDER_STAGES: { key: OrderStage; label: string }[] = [
  { key: "received", label: "Order Received" },
  { key: "kitchen", label: "In Kitchen" },
  { key: "delivery", label: "Sent to Delivery" },
];