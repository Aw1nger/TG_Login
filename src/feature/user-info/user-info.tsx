"use client";

import { useAuth } from "@/shared/providers/check_tg";

export const UserInfo = () => {
  const user = useAuth();

  return (
    <>
      <p>
        Username: <code>{user?.initDataUnsafe?.user?.username ?? "unknown"}</code>
      </p>
    </>
  );
};
