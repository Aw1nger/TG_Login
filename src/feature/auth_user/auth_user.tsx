"use client";

import { useRouter } from "next/navigation";
import { setUserCookie } from "@/shared/auth/action";
import type { User } from "@/shared/auth/user";

export const AuthUser = ({ user }: { user: User }) => {
  setUserCookie(user);
  const { replace } = useRouter();
  replace("/profile");

  return null;
};
