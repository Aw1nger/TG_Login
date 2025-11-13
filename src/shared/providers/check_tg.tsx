"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { Spinner } from "../components/ui/spinner";

interface authContextType {
  username: string;
  balance: number;
}

const authContext = createContext<authContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <section className="flex justify-center items-center flex-col grow">
      <Spinner />
    </section>
  );
}

export function useAuth() {
  return useContext(authContext);
}
