import { AuthProvider } from "@/shared/providers/check_tg";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Layout;
