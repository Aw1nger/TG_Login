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
    console.log(tg.initDataUnsafe.user)
    return (
      <authContext.Provider value={tg}>
        {children}
      </authContext.Provider>
    );
  } else {
    console.log("tg is undefind")
    router.replace("/404");
  }
}

export function useAuth() {
  return useContext(authContext);
}
