import { AuthUser } from "@/feature/auth_user";
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
  return <AuthUser user={user} />;
};

export default Page;
