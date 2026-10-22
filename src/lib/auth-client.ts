"use client";

import { useSyncExternalStore, useCallback } from "react";
import { getUser, clearAuth, type StoredUser } from "./auth-storage";

function subscribe(callback: () => void) {
  window.addEventListener("pizzora-auth-change", callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("pizzora-auth-change", callback);
    window.removeEventListener("storage", callback);
  };
}

function getClientSnapshot(): StoredUser | null {
  return getUser();
}

function getServerSnapshot(): StoredUser | null {
  // server e always null — hydration mismatch hobe na
  return null;
}

export function useAuth() {
  const currentUser = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  // client e mount howar age porjonto "loading" dhora holo
  // useSyncExternalStore nijei eta safely handle kore,
  // tai age-r moto alada mounted state-er dorkar nei
  return { currentUser, loading: false };
}

export async function signOut() {
  clearAuth();
}