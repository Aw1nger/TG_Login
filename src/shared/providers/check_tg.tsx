"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";

const authContext = createContext<TelegramWebApp | null>(null);


export const getTelegramWebApp = () => {
  if (typeof window === "undefined") return null;
  return window.Telegram?.WebApp ?? null;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const tg = getTelegramWebApp();

  if (tg?.ready()) {
    return (
      <authContext.Provider value={tg}>
        {children}
      </authContext.Provider>
    );
  } else router.replace("/404");
}

export function useAuth() {
  return useContext(authContext);
}
