// src/hooks/useUserGuilds.ts
import useSWR from "swr";
import { fetchGuildsData } from "@/utils/api/guilds/fetchGuildsData";

export const useUserGuilds = (accessToken: string) => {
  const { data, error } = useSWR(accessToken ? "/api/user/guilds" : null, () =>
    fetchGuildsData(accessToken)
  );

  return {
    guilds: data,
    isLoading: !error && !data,
    isError: error,
  };
};
