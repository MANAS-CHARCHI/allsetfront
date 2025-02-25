import axios from "axios";
import { getBackendUrl } from "./backend_urls";

const backendUrl=getBackendUrl();
const axiosAuth = axios.create({
    baseURL: `${backendUrl}`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default axiosAuth;