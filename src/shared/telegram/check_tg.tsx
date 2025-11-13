"use client";

import Script from "next/script";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { loadUser, parseUser, saveUser, type User } from "./telegram-user";

const authContext = createContext<User | null>(null);

export const getTelegramWebApp = () => {
  if (typeof window === "undefined") return null;
  return window.Telegram?.WebApp ?? null;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = loadUser();
    if (saved) {
      setUser(saved);
      return;
    }

    const telegram = getTelegramWebApp();
    if (!telegram) return;

    telegram.ready();

    if (telegram.initDataUnsafe?.user) {
      const parsed = parseUser(telegram.initDataUnsafe.user);
      if (parsed) {
        saveUser(parsed);
        setUser(parsed);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="flex grow flex-col justify-center items-center">
        <Script
          async
          src="https://telegram.org/js/telegram-widget.js?22"
          data-telegram-login="Mining_RPG_bot"
          data-size="large"
          data-auth-url="https://aw1nger.ru/login_tg"
          data-request-access="write"
        />
      </div>
    );
  }

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}
