// pages/guilds/[guildid]/index.tsx
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { navItems } from "@/utils/constants";
import cookies from "next-cookies";
import { useUserData } from "@/hooks/useUserData";
import { useClientData } from "@/hooks/useClientData";
import { features } from "@/utils/constants";
import Link from "next/link";
import FeatureCard from "@/components/Feature";
import { IFeature } from "@/types/IFeature";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import styled from "styled-components";

const FeaturesContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  padding-left: ${({ isOpen }) => (isOpen ? "250px" : "0")};
  transition: padding-left 0.3s ease;
  min-height: calc(
    100vh - 60px
  ); // Subtract the height of the navbar (60px) from the viewport height
`;

const Features: React.FC<{ accessToken: string }> = ({ accessToken }) => {
  const router = useRouter();
  const { guildId } = router.query;

  const { userData } = useUserData(accessToken);
  const { clientData } = useClientData();
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <>
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
        <FeaturesContainer isOpen={sidebarVisible}>
          <div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {features.map((feature: IFeature) => (
                <Link
                  key={feature.id}
                  href={`/guilds/${guildId}/${feature.name}`}
                >
                  {/* <a> */}
                  <FeatureCard feature={feature} />
                  {/* </a> */}
                </Link>
              ))}
            </div>
          </div>
        </FeaturesContainer>
      </Layout>
    </>
  );
};

export default Features;

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

  return {
    props: {
      accessToken: access_token,
    },
  };
};
