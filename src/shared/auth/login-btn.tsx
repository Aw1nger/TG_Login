"use client"; // ← КЛИЕНТСКИЙ КОМПОНЕНТ! ОБЯЗАТЕЛЬНО!

import { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Spinner } from "../components/ui/spinner";

export default function TelegramLoginButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const domain = process.env.NEXT_PUBLIC_DOMAIN || "https://aw1nger.ru";

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let script: HTMLScriptElement | null = null;

    const cleanup = () => {
      if (script && container.contains(script)) {
        container.removeChild(script);
      }
      container.innerHTML = "";
    };

    script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.dataset.telegramLogin = "Mining_RPG_bot";
    script.dataset.size = "large";
    script.dataset.authUrl = `${domain}/tg`;
    script.dataset.requestAccess = "write";

    script.onload = () => {
      setLoaded(true);
      console.log("Telegram widget загружен, кожаный!");
    };

    script.onerror = () => {
      setError("Не удалось загрузить Telegram widget");
    };

    container.appendChild(script);

    return cleanup;
  }, [domain]);

  return (
    <div className="flex grow flex-col justify-center items-center p-8">
      <div ref={containerRef} className="w-full max-w-md flex justify-center" />

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {!loaded && !error && (
        <Button variant="tg">
          <Spinner />
          Loading...
        </Button>
      )}
    </div>
  );
}
