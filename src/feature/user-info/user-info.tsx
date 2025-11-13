"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { useAuth } from "@/shared/telegram/check_tg";

export const UserInfo = () => {
  const user = useAuth();

  return (
    <section className="flex container mx-auto flex-col gap-2">
      <div className="flex justify-center w-full">
        <Avatar className="rounded-lg basis-1/3 w-auto h-auto">
          <AvatarImage src={user?.photo_url} alt={user?.username} />
          <AvatarFallback>
            {user?.username?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <p>
        Firstname: <code>{user?.first_name}</code>
      </p>
      <p>
        Lastname: <code>{user?.last_name}</code>
      </p>
      <p>
        Username: <code>{user?.username}</code>
      </p>
    </section>
  );
};
