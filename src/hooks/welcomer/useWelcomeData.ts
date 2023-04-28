import useSWR from "swr";
import { fetchWelcomerData } from "@/utils/api/guilds/welcomer/fetchWelcomerData";

export const useWelcomeData = (accessToken: string, guildId: string) => {
  const { data, error } = useSWR(
    accessToken ? `/api/guild/${guildId}/welcomer` : null,
    () => fetchWelcomerData(accessToken, guildId)
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
