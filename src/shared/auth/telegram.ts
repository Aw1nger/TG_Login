/**
 * Check if the current environment is Telegram Web App.
 */
export const isTelegram = () => {
  if (typeof window !== "undefined" && window.Telegram?.WebApp) {
    try {
      const initData = window.Telegram.WebApp.initData;
      if (initData) {
        console.log("InitData:", initData);
        return true;
      }
    } catch (error) {
      console.error("Error accessing Telegram.WebApp:", error);
    }
  }
  return false;
};

/**
 * Get the Telegram Web App instance.
 */
export const getTelegramWebApp = () => {
  if (typeof window === "undefined") return null;
  return window.Telegram?.WebApp ?? null;
};
