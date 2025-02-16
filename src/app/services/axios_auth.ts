import axios from "axios";
import { getBackendUrl } from "./backend_urls";
import {refreshToken} from "./user_urls";

const backendUrl=getBackendUrl();
const axiosAuth = axios.create({
    baseURL: `${backendUrl}`,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosAuth.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let refreshInProgress = false;
let pendingRequests: Array<{ resolve: Function; reject: Function }> = [];

axiosAuth.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            if(refreshInProgress) {
                return new Promise((resolve, reject) => {
                    pendingRequests.push({resolve, reject});
                })
            }
            originalRequest._retry = true;
            refreshInProgress = true;

            try {
                const refreshTokenValue=sessionStorage.getItem("refreshToken");
                if (!refreshTokenValue) {
                    throw new Error("Refresh token not found");
                }
                const response=await refreshToken({
                    "refresh":refreshTokenValue
                });
                if(!response.access){
                    throw new Error("Access token not found");
                }
                if(response.refresh){
                    sessionStorage.setItem("refreshToken",response.refresh);
                }
                originalRequest.headers.Authorization = `Bearer ${response.access}`;
                pendingRequests.forEach(({resolve}) => resolve(axiosAuth(originalRequest)));
                pendingRequests = [];

                return axiosAuth(originalRequest);
            } catch (error) {
                return Promise.reject(error);
            } finally {
                refreshInProgress = false;
            }
        }
        return Promise.reject(error);
    }
);

export default axiosAuth;