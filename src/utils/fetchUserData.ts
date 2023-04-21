// src/utils/fetchUserData.ts
import axios, { AxiosResponse } from "axios";
import User from "@/types/User";

interface FetchUserDataResult {
  user?: User;
  error?: string;
}

interface IFetchUserResponse {
  guilds: any[];
  user: User;
}
export const fetchUserData = async (
  accessToken: string | undefined
): Promise<FetchUserDataResult> => {
  try {
    if (!accessToken) {
      return { error: "Unauthorized" };
    }

    const response: AxiosResponse<IFetchUserResponse> =
      await axios.get<IFetchUserResponse>("http://localhost:3000/api/user", {
        headers: {
          cookie: `access_token=${accessToken}`,
          "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true,
      });
    console.log(response.data.user);
    return { user: response.data.user };
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      return { error: "Unauthorized" };
    }

    console.error("Error fetching user data:", error);
    return { error: "Error fetching user data" };
  }
};
