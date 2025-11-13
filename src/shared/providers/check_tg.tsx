"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Spinner } from "../components/ui/spinner";

const authContext = createContext<TelegramWebApp | null>(null);

export const getTelegramWebApp = () => {
  if (typeof window === "undefined") return null;
  return window.Telegram?.WebApp ?? null;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [tg, setTg] = useState<TelegramWebApp | null>(null);

  useEffect(() => {
    const telegram = getTelegramWebApp();
    if (!telegram) return;

    telegram.ready();
    setTg(telegram);

  }, []);

  if (!tg) {
    return (
      <div className="flex grow flex-col justify-center items-center">
        <Spinner scale={2} />
      </div>)
  }


  return <authContext.Provider value={tg}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}
