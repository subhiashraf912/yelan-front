import { IWelcomeScreenSettings } from "@/types/Welcomer/IWelcomeScreenSettings";
import { IWelcomeSystem } from "@/types/Welcomer/IWelcomeSystem";
import axios, { AxiosResponse } from "axios";

export const fetchWelcomerData = async (
  accessToken: string | undefined,
  guildId: string
): Promise<{
  welcomeSystem: IWelcomeSystem;
  welcomeScreenSettings: IWelcomeScreenSettings;
}> => {
  try {
    if (!accessToken) {
      throw new Error("Unauthorized");
    }

    const response: AxiosResponse<{
      welcomeSystem: IWelcomeSystem;
      welcomeScreenSettings: IWelcomeScreenSettings;
    }> = await axios.get(
      `http://localhost:3000/api/guild/${guildId}/welcomer`,
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
    console.error("Error fetching guild welcomer data:", err);
    // return {
    //   welcomeSystem: {
    //     channelId: null,
    //     content: "Welcome to {guildName}, {userMention}!",
    //     enabled: false,
    //     guildId: guildId,
    //     sendAttachment: false,
    //   },
    //   welcomeScreenSettings: IWelcomeScreenSettings,
    // };
    throw new Error("Error fetching guild welcomer data");
  }
};
