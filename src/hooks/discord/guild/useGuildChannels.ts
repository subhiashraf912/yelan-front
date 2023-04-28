import useSWR from "swr";
import { fetchGuildChannels } from "@/utils/api/guilds/discord/fetchGuildChannels";

export const useGuildChannels = (accessToken: string, guildId: string) => {
  const { data, error } = useSWR(
    accessToken ? `/api/guild/${guildId}/channels` : null,
    () => fetchGuildChannels(accessToken, guildId)
  );

  return {
    data: data!,
    isLoading: !error && !data,
    isError: error,
  };
};
