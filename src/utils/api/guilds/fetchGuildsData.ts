import axios, { AxiosResponse } from "axios";

export const fetchGuildsData = async (
  accessToken: string | undefined
): Promise<{ managedMutualGuilds: any[]; managedUnmutualGuilds: any[] }> => {
  try {
    if (!accessToken) {
      throw new Error("Unauthorized");
    }

    const response: AxiosResponse<{
      managedMutualGuilds: any[];
      managedUnmutualGuilds: any[];
    }> = await axios.get(
      "http://localhost:3000/api/user/guilds/mutual-unmutual-managed",
      {
        headers: {
          cookie: `access_token=${accessToken}`,
          "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching guilds data:", err);
    return { managedMutualGuilds: [], managedUnmutualGuilds: [] };
  }
};
