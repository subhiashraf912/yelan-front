import { GetServerSideProps } from "next";
import cookies from "next-cookies";
import { fetchUserData } from "@/utils/api/fetchUserData";
import { fetchClientData } from "@/utils/api/fetchClientData";
import { fetchGuildsData as fetchGuildData } from "@/utils/api/guilds/fetchGuildsData";
import Layout from "@/components/Layout";
import styled from "styled-components";
import GuildCard from "@/components/GuildCard";
import User from "@/types/User";
import { navItems } from "@/utils/constants";
import { useUserData } from "@/hooks/useUserData";
import { useUserGuilds } from "@/hooks/useUserGuilds";
import { useClientData } from "@/hooks/useClientData";
import LoadingSpinner from "@/components/LoadingSpinner";
const GuildsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
`;

interface GuildsProps {
  accessToken: string;
}

const Guilds: React.FC<GuildsProps> = ({ accessToken }) => {
  const {
    userData,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
  } = useUserData(accessToken);
  const {
    guilds,
    isLoading: isGuildsLoading,
    isError: isGuildsError,
  } = useUserGuilds(accessToken);
  const {
    clientData,
    isLoading: isClientDataLoading,
    isError: isClientDataError,
  } = useClientData();
  if (isClientDataLoading || isUserDataLoading || isGuildsLoading) {
    return <LoadingSpinner />;
  }
  const { managedMutualGuilds, managedUnmutualGuilds } = guilds!;
  const user = userData?.user!;

  clientData?.user;
  return (
    <Layout navItems={navItems} bot={clientData?.user} user={user} error={null}>
      <GuildsContainer>
        {managedMutualGuilds.map((guild) => (
          <GuildCard key={guild.id} guild={guild} isBotMember />
        ))}
        {managedUnmutualGuilds.map((guild) => (
          <GuildCard key={guild.id} guild={guild} />
        ))}
      </GuildsContainer>
    </Layout>
  );
};

export default Guilds;

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
