import { redirect } from "next/navigation";
import { setUserCookie } from "@/shared/auth/action";
import { parseUser, type User } from "@/shared/auth/user";

export const dynamic = "force-dynamic";

const Page = async ({ searchParams }: { searchParams: Promise<User> }) => {
  const params = await searchParams;
  const user = parseUser(params);

  if (!user) {
    return (
      <div className="text-center p-10">
        <h2>❌ Ошибка авторизации Telegram</h2>
        <p>Не удалось разобрать параметры запроса.</p>
      </div>
    );
  }

  await setUserCookie(user);

  redirect("/profile");
};

export default Page;
