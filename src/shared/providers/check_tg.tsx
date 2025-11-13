"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Spinner } from "../components/ui/spinner";
import { Cross } from "lucide-react";

const authContext = createContext<TelegramWebApp | null>(null);

export const getTelegramWebApp = () => {
  if (typeof window === "undefined") return null;
  return window.Telegram?.WebApp ?? null;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [tg, setTg] = useState<TelegramWebApp | null>(null);

  useEffect(() => {
    const telegram = getTelegramWebApp();
    console.log(telegram);
    if (!telegram) return;

    telegram.ready();

    setTg(telegram);
  }, []);

  if (!tg) {
    return (
      <div className="flex grow flex-col justify-center items-center">
        <Spinner scale={2} />
      </div>
    );
  }

  if (!tg.initData) {
    return (
      <div className="flex grow flex-col justify-center items-center">
        <Cross />
      </div>
    );
  }

  return <authContext.Provider value={tg}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}
