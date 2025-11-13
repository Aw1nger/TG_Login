import z from "zod";

export const UserSchema = z.object({
  id: z.coerce.number(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  username: z.string().min(1),
  photo_url: z.url(),
  auth_date: z.coerce.number().optional(),
  hash: z.string().length(64).optional(),
});

export type User = z.infer<typeof UserSchema>;

export function parseUser(data: unknown): User | null {
  const result = UserSchema.safeParse(data);
  if (!result.success) {
    console.warn("⚠️ parseUser failed:", result.error);
    return null;
  }
  return result.data;
}

const STORAGE_KEY = "telegram_user";

export function saveUser(user: User) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (err) {
    console.error("❌ Не удалось сохранить юзера в localStorage:", err);
  }
}

export function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    const result = UserSchema.safeParse(data);
    return result.success ? result.data : null;
  } catch (err) {
    console.error("❌ Ошибка чтения юзера из localStorage:", err);
    return null;
  }
}

export function clearUser() {
  localStorage.removeItem(STORAGE_KEY);
}

export function useLogout() {
  return () => {
    clearUser();
    window.location.reload();
  };
}
