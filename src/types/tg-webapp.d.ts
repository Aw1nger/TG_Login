interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    query_id?: string;
    user?: TelegramWebAppUser;
    receiver?: TelegramWebAppUser;
    start_param?: string;
    auth_date?: number;
    hash?: string;
  };
  version: string;
  platform: string;
  colorScheme: "light" | "dark";
  themeParams: TelegramWebAppTheme;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  isClosingConfirmationEnabled: boolean;

  onEvent(eventType: string, callback: (...args: any[]) => void): void;
  offEvent(eventType: string, callback: (...args: any[]) => void): void;
  sendData(data: string): void;
  openLink(url: string, options?: { try_instant_view?: boolean }): void;
  openTelegramLink(url: string): void;
  showAlert(message: string, callback?: () => void): void;
  showConfirm(message: string, callback?: (confirmed: boolean) => void): void;
  showPopup(
    params: TelegramWebAppPopupParams,
    callback?: (buttonId: string | null) => void,
  ): void;
  showScanQrPopup(
    params: TelegramWebAppScanQrParams,
    callback?: (text: string) => void,
  ): void;
  closeScanQrPopup(): void;
  ready(): void;
  expand(): void;
  close(): void;
  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
}

interface TelegramWebAppUser {
  id: number;
  is_bot?: boolean;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

interface TelegramWebAppTheme {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
}

interface TelegramWebAppPopupParams {
  title?: string;
  message: string;
  buttons?: {
    id?: string;
    type?: "default" | "ok" | "close" | "cancel" | "destructive";
    text?: string;
  }[];
}

interface TelegramWebAppScanQrParams {
  text?: string;
}

interface Window {
  Telegram?: {
    WebApp: TelegramWebApp;
  };
}
