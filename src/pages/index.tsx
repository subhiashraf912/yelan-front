// src/pages/index.tsx
import { GetServerSideProps } from "next";
import cookies from "next-cookies";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { fetchUserData } from "@/utils/fetchUserData";
import User from "@/types/User";
import { fetchClientData } from "@/utils/fetchClientData";
const navItems = [
  { url: "/leveling", name: "Leveling" },
  { url: "/welcomer", name: "Welcomer" },
  // Add more navigation items as needed
];

interface HomeProps {
  accessToken?: string;
  bot: User;
  user?: User;
  error?: string;
}

const Home: React.FC<HomeProps> = ({ accessToken, bot, user, error }) => {
  if (!bot) {
    return <div>Loading...</div>;
  }

  return (
    <Layout bot={bot} user={user} navItems={navItems} error={error || null}>
      <div>
        <h1></h1>
      </div>
    </Layout>
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
