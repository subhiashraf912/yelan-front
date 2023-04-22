import styled from "styled-components";
import User from "@/types/User";
import { fetchUserData } from "@/utils/api/fetchUserData";
import { fetchClientData } from "@/utils/api/fetchClientData";
import Layout from "@/components/Layout";
import cookies from "next-cookies";
import { GetServerSideProps } from "next";
import { navItems } from "@/utils/constants";
import { useClientData } from "@/hooks/useClientData";
import { useUserData } from "@/hooks/useUserData";
import Link from "next/link";
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url("https://i.redd.it/x4esim9lgly41.png");
  background-size: cover;
  background-position: center;
  color: #fff;
`;

const HeroTitle = styled.h1`
  font-size: 5rem;ne
  margin-bottom: 1rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const HeroSubtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 3rem;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;
const HeroButton = styled.a<{ href?: string }>`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  margin: 5px;
  border-radius: 5px;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

const FeaturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
`;

const FeatureCard = styled.div`
  width: 30%;
  margin: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      30deg,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0)
    );
    transform: translateY(100%);
    transition: transform 0.3s;
    z-index: -1;
  }

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-10px) scale(0.9) rotate(5deg);

    &::before {
      transform: translateY(0%);
    }
  }
`;
const FeatureImageWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 200px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const FeatureImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;

  ${FeatureCard}:hover & {
    transform: scale(1.5);
  }
`;
const FeatureText = styled.div`
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s;

  ${FeatureCard}:hover & {
    opacity: 1;
  }
`;

interface HomeProps {
  accessToken?: string;
  bot: User;
  user?: User;
  error?: string;
}

const Home: React.FC<HomeProps> = ({ accessToken }) => {
  const {
    clientData,
    isError: isClientDataError,
    isLoading: isClientDataLoading,
  } = useClientData();
  const { userData, isError: isUserDataError } = useUserData(accessToken);
  if (isClientDataLoading || isClientDataError) {
    return <div>Something went wrong</div>;
  }
  const bot = clientData?.user!;

  console.log(bot);
  const user = userData?.user;
  return (
    <Layout bot={bot} user={user} navItems={navItems} error={null}>
      <HeaderContainer>
        <HeroTitle>{bot.username}</HeroTitle>
        <HeroSubtitle>Introduction text for the bot</HeroSubtitle>
        <HeroButton
          href="http://localhost:3000/api/client/invite"
          target="_blank"
        >
          Invite the bot
        </HeroButton>{" "}
        <Link
          href={user ? "/guilds" : "http://localhost:3000/api/auth/login"}
          passHref
        >
          <HeroButton>{user ? "Go to Servers" : "Log In"}</HeroButton>
        </Link>
      </HeaderContainer>

      <FeaturesContainer>
        <FeatureCard>
          <FeatureImageWrapper>
            <FeatureImage src="/feature1.png" />
          </FeatureImageWrapper>
          <FeatureText>
            <h3>Feature 1</h3>
            <p>Feature 1 description</p>
          </FeatureText>
        </FeatureCard>

        <FeatureCard>
          <FeatureImageWrapper>
            <FeatureImage src="/feature2.png" />
          </FeatureImageWrapper>
          <FeatureText>
            <h3>Feature 2</h3>
            <p>Feature 2 description</p>
          </FeatureText>
        </FeatureCard>

        <FeatureCard>
          <FeatureImageWrapper>
            <FeatureImage src="/feature3.png" />
          </FeatureImageWrapper>
          <FeatureText>
            <h3>Feature 3</h3>
            <p>Feature 3 description</p>
          </FeatureText>
        </FeatureCard>
      </FeaturesContainer>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { access_token } = cookies(context);
  return {
    props: {
      accessToken: access_token || null,
    },
  };
};
