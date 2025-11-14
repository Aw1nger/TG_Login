import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { isTelegram } from "@/shared/auth/telegram";
import { cn } from "@/shared/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Aw1nger Test TGWebApp",
  description:
    "Проект для тестирования Telegram Web Apps и авторизации с помощью Telegram Login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          "antialiased flex flex-col min-h-dvh",
          !isTelegram() &&
            "[--tg-theme-text-color:#000] [--tg-theme-bg-color:#fff] [--tg-theme-button-text-color:#fff] [--tg-theme-button-color:#54a9eb]",
          "text-(--tg-theme-text-color) bg-(--tg-theme-bg-color)",
        )}
      >
        {children}
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
