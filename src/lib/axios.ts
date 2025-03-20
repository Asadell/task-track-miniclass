import axios from "axios";
import { useApi } from "../context/ApiContext";

export const useApiRequest = () => {
  const { backendUrl } = useApi();

  const api = axios.create({
    baseURL: backendUrl,
  });

  return api;
};
