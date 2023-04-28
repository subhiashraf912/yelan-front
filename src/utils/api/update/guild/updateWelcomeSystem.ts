import axios from "axios";

export const updateWelcomeSystem = async (
  guildId: string,
  data: {
    enabled: boolean;
    channelId: string | null;
    content: string;
    sendAttachment: boolean;
  },
  accessToken: string
) => {
  try {
    await axios.post(
      `http://localhost:3000/api/guild/${guildId}/welcomer/welcome-system`,
      data,
      {
        headers: {
          cookie: `access_token=${accessToken}`,
          "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true,
      }
    );
    alert("Settings updated successfully!");
  } catch (error) {
    console.error("Error updating settings:", error);
    alert("Failed to update settings.");
  }
};
