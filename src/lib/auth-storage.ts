export interface StoredUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
  [key: string]: unknown;
}

export const saveAuth = (token: string, user: StoredUser) => {
  localStorage.setItem("pizzora_token", token);
  localStorage.setItem("pizzora_user", JSON.stringify(user));
  // navbar ke same-tab e update janano jonno
  window.dispatchEvent(new Event("pizzora-auth-change"));
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("pizzora_token");
};

// cache — raw string na bodlale notun object banabe na,
// tai useSyncExternalStore-e infinite loop hobe na
let cachedRaw: string | null = null;
let cachedUser: StoredUser | null = null;

export const getUser = (): StoredUser | null => {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem("pizzora_user");

  if (raw === cachedRaw) {
    // data change hoyni — age-r SAME object reference ferot dao
    return cachedUser;
  }

  cachedRaw = raw;

  if (!raw) {
    cachedUser = null;
    return null;
  }

  try {
    cachedUser = JSON.parse(raw) as StoredUser;
  } catch {
    cachedUser = null;
  }

  return cachedUser;
};

export const clearAuth = () => {
  localStorage.removeItem("pizzora_token");
  localStorage.removeItem("pizzora_user");
  window.dispatchEvent(new Event("pizzora-auth-change"));
};