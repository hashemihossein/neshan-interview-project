import axios from "axios";
import { BASE_URL, API_KEY } from "../../constants/api/api.constants";

export const axiosConfig = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    "Api-Key": API_KEY,
  },
});
