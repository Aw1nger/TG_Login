"use client";

import { useRouter } from "next/navigation";
import { saveUser, type User } from "@/shared/telegram/telegram-user";

export const AuthUser = ({ user }: { user: User }) => {
  saveUser(user);
  const { replace } = useRouter();
  replace("/profile");

  return null;
};
