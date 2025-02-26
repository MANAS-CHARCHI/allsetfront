import axios from "axios";
import { getBackendUrl } from "./backend_urls";
import {refreshToken} from "./user_urls"
import {useRouter} from "next/navigation"

const backendUrl=getBackendUrl();
const axiosAuth = axios.create({
    baseURL: `${backendUrl}`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

const router=useRouter()
axiosAuth.interceptors.request.use(
    (response)=>response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try{
                await refreshToken();
                return axiosAuth.request(originalRequest);
            }catch (refreshError) {
                router.push("/login");
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)



export default axiosAuth;

