import React from "react";
import useTheme from "@/hooks/application/useTheme";
import Head from "next/head";
import Navbar from "./Navbar";
import User from "@/types/User";

interface LayoutProps {
  bot?: User;
  user?: User;
  navItems?: { url: string; name: string }[];
  error: string | null;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  bot,
  user,
  navItems,
  error,
}) => {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/api/discord/login";
  };
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Your Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {bot && (user || error) && navItems && (
        <Navbar
          bot={bot}
          user={user || null}
          navItems={navItems}
          error={error}
          onLogin={handleLogin}
        />
      )}
      <div
        style={{ minHeight: "100vh", backgroundColor: theme.colors.background }}
      >
        <main style={{ minHeight: "100vh" }}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
