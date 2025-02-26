// import axiosAuth from "./axios_auth";
import axiosNoAuth from "./axios_no_auth";
import { getUserUrl } from "./backend_urls";

const userUrl=getUserUrl();

export const registerUser = async (data: object) => {
    try {
      const response = await axiosNoAuth.post(`${userUrl}register`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
export const loginUser = async (data: object) => {
    try {
      const response = await axiosNoAuth.post(`${userUrl}login`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
}
export const logoutUser = async () => {
    try {
      const response = await axiosNoAuth.post(`${userUrl}logout`);
      return response.data;
    } catch (error) {
      throw error;
    }
}
export const refreshToken = async () => {
    try {
      const response = await axiosNoAuth.post(`${userUrl}token/refresh`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // export const activateUser = async (token: string) => {
  //   try {
  //     const response = await axiosNoAuth.post(`${userUrl}activate/${token}`);
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // export const resetPassword = async (data: object) => {
  //   try {
  //     const response = await axiosNoAuth.post(`${userUrl}password/reset`, data);
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // };