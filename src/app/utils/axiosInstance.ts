import axios from "axios";
import { logout_user, refresh_access_token } from "./auth";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  withCredentials: true,
});

// Response Interceptor for Automatic Token Refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        console.log("Refreshing access token...");
        await refresh_access_token();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("Access token refresh failed, logging out...");
        await logout_user();
        window.location.href = "/login";
      }
    }
    if (error.response?.status === 401) {
      return; // Just return to suppress the error
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
