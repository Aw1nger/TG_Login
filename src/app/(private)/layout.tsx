import { AuthProvider } from "@/shared/auth/check_tg";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Layout;
