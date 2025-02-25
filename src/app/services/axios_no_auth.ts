import axios from "axios";
import { getBackendUrl } from "./backend_urls";

const backendUrl = getBackendUrl();

const axiosNoAuth = axios.create({
  baseURL: `${backendUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosNoAuth.defaults.withCredentials = true;

export default axiosNoAuth;
