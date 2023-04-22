// src/hooks/useClientData.ts
import useSWR from "swr";
import { fetchClientData } from "@/utils/api/fetchClientData";

export const useClientData = () => {
  const { data, error } = useSWR("/api/client", fetchClientData);

  return {
    clientData: data,
    isLoading: !error && !data,
    isError: error,
  };
};
