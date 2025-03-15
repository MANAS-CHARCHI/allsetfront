import axios from "axios";

// const API_URL=process.env.NEXT_PUBLIC_API_URL;
const API_URL = "http://127.0.0.1:8000/";

export const register_user = async (email: string, password: string) => {
  try {
    const RegisterUrl = `${API_URL}user/register/`;
    const response = await axios.post(
      RegisterUrl,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (e) {
    throw new Error("Registration Failed!");
  }
};

export const login_user = async (email: string, password: string) => {
  try {
    const LoginUrl = `${API_URL}user/login/`;
    const response = await axios.post(
      LoginUrl,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  } catch (e) {
    throw new Error("Login Failed!");
  }
};

export const logout_user = async () => {
  try {
    const LogoutUrl = `${API_URL}user/logout/`;
    const response = await axios.post(LogoutUrl, {}, { withCredentials: true });
    localStorage.removeItem("user");
    return response.data;
  } catch (e) {
    throw new Error("Logout Failed!");
  }
};
