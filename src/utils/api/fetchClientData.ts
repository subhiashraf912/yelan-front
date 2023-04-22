// src/utils/fetchUserData.ts
import axios, { AxiosResponse } from "axios";
import User from "@/types/User";
interface IFetchClientResponse extends User {
  // user: User;
}

export const fetchClientData = async () => {
  try {
    const response: AxiosResponse<IFetchClientResponse> =
      await axios.get<IFetchClientResponse>(
        "http://localhost:3000/api/client",
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
          withCredentials: true,
        }
      );

    return { user: response.data };
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      return { error: "Unauthorized" };
    }

    console.error("Error fetching user data:", error);
    return { error: "Error fetching user data" };
  }
};
