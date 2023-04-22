// src/pages/index.tsx
import { GetServerSideProps } from "next";
import cookies from "next-cookies";
import Layout from "@/components/Layout";
import { fetchUserData } from "@/utils/fetchUserData";
import User from "@/types/User";
import styled, { DefaultTheme } from "styled-components";
import { fetchClientData } from "@/utils/fetchClientData";
const navItems = [
  { url: "/", name: "Home" },
  { url: "/docs", name: "Docs" },
  { url: "/commands", name: "Commands" },
  { url: "/discord", name: "Discord Server" },
  { url: "/invite", name: "Invite" },
];

interface HomeProps {
  accessToken?: string;
  bot: User;
  user?: User;
  error?: string;
}
interface FeatureBlockProps {
  reverse?: boolean;
  theme: DefaultTheme;
}

const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5rem 0;
  // overflow: hidden;
`;

const FeatureBlock = styled.div<FeatureBlockProps>`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
  width: 80%;
  height: 100px
  border: 0px solid ${({ theme }) => theme.colors.border};
  padding: 2rem;
  margin-bottom: 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  opacity: 0;

    transition: 0.5s;
  filter: blur(2px);

  &:hover {
    opacity: 1;
    transform: translateY(-20px);
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: 0 30px 30px rgba(0, 0, 0, 1);
    transition: 0.5s;
    filter: blur(0px);
  }
`;

const FeatureText = styled.div`
  width: 75%;
  padding: 0 2rem;
`;

const FeatureImage = styled.img<FeatureBlockProps>`
  width: 35%;
  height:200px
  object-fit: contain;
  border-radius: 50px;
  border: 0px solid ${({ theme }) => theme.colors.border};
  transform: ${({ reverse }) =>
    reverse
      ? "rotateY(10deg) rotateZ(10deg) scale(0.5)"
      : "rotateY(-10deg) rotateZ(-10deg) scale(1.1)"};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: 0.5s;
  filter: blur(0.2px);

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.border};
    transform: translateY(-10px) rotateX(10deg) rotateY(0deg) rotateZ(0deg)
      scale(1.1);
    box-shadow: 0 20px 20px rgba(0, 0, 0, 0.7);
    transition: 0.5s;
    filter: blur(0px);
  }
`;

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 5rem;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  // position: relative;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("https://i.redd.it/x4esim9lgly41.png");
  background-size: cover;
  background-position: center;
  // opacity: 0.;
  z-index: -1;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
`;

const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`;

const Button = styled.a`
  display: block;
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  background-color: transparent;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.primary};
  }
`;
const Home: React.FC<HomeProps> = ({ accessToken, bot, user, error }) => {
  if (!bot) {
    return <div>ERROR: CLIENT NOT FOUND</div>;
  }

  return (
    <>
      {/* <WavesBackground /> */}
      <Layout bot={bot} user={user} navItems={navItems} error={error || null}>
        <MainContainer>
          <IntroContainer>
            <h1>{bot.username}</h1>
            <p>Introduction text for the bot</p>
            <div style={{ display: "flex" }}>
              <Button
                onClick={() =>
                  (window.location.href =
                    "http://localhost:3000/api/client/invite")
                }
              >
                Invite the bot
              </Button>
              {user ? (
                <Button href="/dashboard">Manage servers</Button>
              ) : (
                <Button
                  onClick={() =>
                    (window.location.href =
                      "http://localhost:3000/api/discord/login")
                  }
                >
                  Login
                </Button>
              )}
            </div>
          </IntroContainer>

          <FeaturesContainer>
            <FeatureBlock>
              <FeatureText>
                <h2>Feature 1</h2>
                <p>Feature 1 description</p>
              </FeatureText>
              <FeatureImage src="/feature1.png" alt="Feature 1" />
            </FeatureBlock>
            <FeatureBlock reverse>
              <FeatureText>
                <h2>Feature 2</h2>
                <p>Feature 2 description</p>
              </FeatureText>
              <FeatureImage src="/feature2.png" alt="Feature 2" />
            </FeatureBlock>
            <FeatureBlock>
              <FeatureText>
                <h2>Feature 3</h2>
                <p>Feature 3 description</p>
              </FeatureText>
              <FeatureImage src="/feature3.png" alt="Feature 1" />
            </FeatureBlock>
            {/* Add more FeatureBlock components for additional features */}
          </FeaturesContainer>
        </MainContainer>
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { access_token } = cookies(context);
  const { user: bot } = await fetchClientData();
  const { user, error } = await fetchUserData(access_token);

  return {
    props: {
      accessToken: access_token || null,
      bot: bot || null,
      user: user || null,
      error: error || null,
    },
  };
};
