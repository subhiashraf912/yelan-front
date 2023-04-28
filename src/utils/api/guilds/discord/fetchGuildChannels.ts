import IGuildChannel from "@/types/discord/IGuildChannel";
import axios, { AxiosResponse } from "axios";

export const fetchGuildChannels = async (
  accessToken: string | undefined,
  guildId: string
): Promise<IGuildChannel[]> => {
  try {
    if (!accessToken) {
      throw new Error("Unauthorized");
    }

    const response: AxiosResponse<IGuildChannel[]> = await axios.get(
      `http://localhost:3000/api/guild/${guildId}/channels`,
      {
        headers: {
          cookie: `access_token=${accessToken}`,
          "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching guild channels data:", err);
    throw new Error("Error fetching guild channels data");
  }
};
