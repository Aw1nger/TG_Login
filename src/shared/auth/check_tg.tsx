"use client";

import Script from "next/script";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Spinner } from "../components/ui/spinner";
import { getUser, setUserCookie } from "./action";
import TelegramLoginButton from "./login-btn";
import { getTelegramWebApp, isTelegram } from "./telegram";
import { parseUser, type User } from "./user";

const authContext = createContext<User | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGetUser = async () => {
      const saved = await getUser();
      if (saved) {
        setUser(saved);
        setIsLoading(false);
        return;
      }

      const telegram = getTelegramWebApp();
      if (!telegram) {
        setIsLoading(false);
        return;
      }

      telegram.ready();

      if (telegram.initDataUnsafe?.user) {
        const parsed = parseUser(telegram.initDataUnsafe.user);
        if (parsed) {
          setUser(parsed);
          setUserCookie(parsed);
        }
      }

      setIsLoading(false);
    };

    loadGetUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex grow flex-col justify-center items-center">
        <Spinner className="size-8" />
        Loading...
      </div>
    );
  }

  if (!isTelegram() && !user) {
    return (
      <div className="flex grow flex-col justify-center items-center">
        <TelegramLoginButton />
      </div>
    );
  }

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}
