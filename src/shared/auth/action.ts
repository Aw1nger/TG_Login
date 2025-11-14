"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import type { User } from "./user";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET не задан, иди на хуй с незащищённым сервером!");
}

export const setUserCookie = async (user: User) => {
  const cookieStore = await cookies();

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      photo_url: user.photo_url,
      iat: Math.floor(Date.now() / 1000),
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  );

  cookieStore.set("user_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return user;
};

export const getUser = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("user_token")?.value;

  if (!token) return null;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as User & { iat: number };
    return {
      id: payload.id,
      username: payload.username,
      first_name: payload.first_name,
      last_name: payload.last_name,
      photo_url: payload.photo_url,
    };
  } catch (error) {
    console.error("JWT говно, токен битый:", error);
    return null;
  }
};
