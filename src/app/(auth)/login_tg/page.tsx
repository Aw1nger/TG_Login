import { AuthUser } from "@/feature/auth_user";
import { type User, UserSchema } from "@/shared/telegram/telegram-user";

export const dynamic = "force-dynamic";

function parseUserFromUrl(url: string): User | null {
  try {
    const u = new URL(url);
    const params = Object.fromEntries(u.searchParams.entries());
    const result = UserSchema.safeParse(params);
    if (!result.success) {
      console.error("❌ Invalid Telegram data:", result.error);
      return null;
    }
    return result.data;
  } catch (err) {
    console.error("❌ parseUserFromUrl error:", err);
    return null;
  }
}

const Page = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const paramsUrl = `https://aw1nger.ru/login_tg?${new URLSearchParams(
    searchParams,
  ).toString()}`;

  const user = parseUserFromUrl(paramsUrl);

  if (!user) {
    return (
      <div className="text-center p-10">
        <h2>❌ Ошибка авторизации Telegram</h2>
        <p>Не удалось разобрать параметры запроса.</p>
      </div>
    );
  }

  return <AuthUser user={user} />;
};

export default Page;
