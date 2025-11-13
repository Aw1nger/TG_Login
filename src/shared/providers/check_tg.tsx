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
import Script from "next/script";

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
        <Script
          async
          src="https://telegram.org/js/telegram-widget.js?22"
          data-telegram-login="Mining_RPG_bot"
          data-size="large"
          data-auth-url="aw1nger.ru/login_tg"
          data-request-access="write"
        />
      </div>
    );
  }

  return <authContext.Provider value={tg}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}
