// components/Welcomer.tsx
import React, { useEffect, useState } from "react";
import { IWelcomeScreenSettings } from "@/types/Welcomer/IWelcomeScreenSettings";
import { useRouter } from "next/router";
import { useWelcomeData } from "@/hooks/welcomer/useWelcomeData";
import cookies from "next-cookies";
import { GetServerSideProps } from "next";
import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar";
import { navItems } from "@/utils/constants";
import { useUserData } from "@/hooks/useUserData";
import { useClientData } from "@/hooks/useClientData";
import ReactSelect, { StylesConfig } from "react-select";
import { useGuildChannels } from "@/hooks/discord/guild/useGuildChannels";
import { updateWelcomeSystem } from "@/utils/api/update/guild/updateWelcomeSystem";
import useTheme from "@/hooks/application/useTheme";
import WelcomeSystem from "@/components/welcomer/WelcomeSettings";
import styled from "styled-components";
import WelcomeScreenSettings from "@/components/welcomer/WelcomeScreen";

interface WelcomerProps {
  accessToken: string;
}
const Container = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
  max-width: 1200px;
  padding-left: ${({ isOpen }) => (isOpen ? "250px" : "0")};
  transition: padding-left 0.3s ease;
  padding-top: 60px; // Add the height of the navbar (60px) as padding-top
`;

interface NavigationProps {
  onClick: (page: string) => void;
  activePage: string;
}

const Navigation = ({ onClick, activePage }: NavigationProps) => {
  return (
    <Nav>
      <NavItem
        selected={activePage === "system"}
        onClick={() => onClick("system")}
      >
        Welcomer System
      </NavItem>
      <NavItem
        selected={activePage === "screen"}
        onClick={() => onClick("screen")}
      >
        Welcome Screen Settings
      </NavItem>
    </Nav>
  );
};

const Welcomer: React.FC<WelcomerProps> = ({ accessToken }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [activePage, setActivePage] = useState<string>("system");
  const handleNavigation = (page: string) => {
    setActivePage(page);
  };
  const router = useRouter();
  const { guildId } = router.query;
  const { data, isError, isLoading } = useWelcomeData(
    accessToken,
    guildId as string
  );
  const {
    data: channels,
    isLoading: channelsLoading,
    isError: channelsError,
  } = useGuildChannels(accessToken, guildId as string);

  const { userData } = useUserData(accessToken);
  const { clientData } = useClientData();

  if (isLoading || channelsLoading) return <div>Loading...</div>;
  if (isError || channelsError) return <div>Error</div>;

  const { welcomeSystem, welcomeScreenSettings } = data!;
  console.log(welcomeSystem, welcomeScreenSettings);

  return (
    <Layout
      navItems={navItems}
      bot={clientData?.user}
      user={userData?.user}
      error={null}
    >
      <Sidebar
        onToggle={() => setSidebarVisible(!sidebarVisible)}
        isOpen={sidebarVisible}
      />
      <Container isOpen={sidebarVisible}>
        <Navigation onClick={handleNavigation} activePage={activePage} />
        {activePage === "system" && (
          <WelcomeSystem
            accessToken={accessToken}
            guildId={guildId as string}
            channels={channels}
            welcomeSystem={welcomeSystem}
          />
        )}
        {activePage === "screen" && (
          <WelcomeScreenSettings
            welcomeScreenSettings={welcomeScreenSettings}
          />
        )}
      </Container>
    </Layout>
  );
};
export default Welcomer;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { access_token } = cookies(context);

  if (!access_token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    return {
      props: {
        accessToken: access_token,
      },
    };
  } catch (error) {
    console.error("Error fetching guilds data:", error);
    return {
      props: {
        accessToken: access_token,
      },
    };
  }
};
const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 60px; // Add the height of the navbar (60px) as margin-top
  background-color: ${({ theme }) => theme.colors.block};
  padding: 10px;
`;

const NavItem = styled.a<{ selected: boolean }>`
  display: inline-block;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: bold;
  margin: 0 10px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.background : "transparent"};
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.secondary};
  }

  &:active {
    transform: scale(0.95);
  }
`;
