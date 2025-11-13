"use client";

import { useAuth } from "@/shared/providers/check_tg";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

export const UserInfo = () => {
  const user = useAuth();

  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-center">
        <Avatar className="rounded-lg">
          <AvatarImage
            src={user?.initDataUnsafe?.user?.photo_url}
            alt={user?.initDataUnsafe?.user?.username}
          />
          <AvatarFallback>
            {user?.initDataUnsafe?.user?.username?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <p>
        Firstname: <code>{user?.initDataUnsafe?.user?.first_name}</code>
      </p>
      <p>
        Lastname: <code>{user?.initDataUnsafe?.user?.last_name}</code>
      </p>
      <p>
        Username: <code>{user?.initDataUnsafe?.user?.username}</code>
      </p>
    </section>
  );
};
