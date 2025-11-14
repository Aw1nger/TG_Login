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
