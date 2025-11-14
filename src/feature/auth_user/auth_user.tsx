"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setUserCookie } from "@/shared/auth/action";
import type { User } from "@/shared/auth/user";
import { Spinner } from "@/shared/components/ui/spinner";

export const AuthUser = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { replace } = useRouter();

  useEffect(() => {
    const setUser = async () => {
      await setUserCookie(user);
      setIsLoading(false);
    };

    setUser();
  }, [user]);

  useEffect(() => {
    if (!isLoading) {
      replace("/profile");
    }
  }, [isLoading, replace]);

  return (
    <div className="flex justify-center items-center grow">
      <Spinner className="size-8" />
    </div>
  );
};
