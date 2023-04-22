// src/hooks/useUserData.ts
import useSWR from "swr";
import { fetchUserData } from "@/utils/api/fetchUserData";

export function useUserData(accessToken?: string) {
  const { data, error } = useSWR(
    accessToken ? ["userData", accessToken] : null,
    () => fetchUserData(accessToken)
  );

  return {
    userData: data,
    isLoading: !error && !data,
    isError: error,
  };
}
