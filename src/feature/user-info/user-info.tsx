"use client";

import { useAuth } from "@/shared/auth/check_tg";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

export const UserInfo = () => {
  const user = useAuth();

  return (
    <section className="flex container mx-auto flex-col gap-2">
      <div className="flex gap-2">
        <Avatar className="rounded-lg size-10 sm:size-20">
          <AvatarImage src={user?.photo_url} alt={user?.username} />
          <AvatarFallback>
            {user?.username?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="">
          <p className="text-lg font-bold">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="text-sm opacity-80">@{user?.username}</p>
        </div>
      </div>
    </section>
  );
};
