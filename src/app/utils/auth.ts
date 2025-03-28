import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
// const API_URL = "http://127.0.0.1:8000/";

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
    console.log(email, password);
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

export const refresh_access_token = async () => {
  try {
    const RefreshUrl = `${API_URL}user/refresh/`;
    const response = await axios.post(
      RefreshUrl,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (e) {
    throw new Error("Refresh Failed!");
  }
};

export const verify_user = async () => {
  try {
    const VerifyUrl = `${API_URL}user/verify/`;
    const response = await axios.get(VerifyUrl, { withCredentials: true });
    return response.data;
  } catch (e) {
    throw new Error("Verify Failed!");
  }
};

export const forget_password = async (email: string) => {
  try {
    const ForgetPasswordUrl = `${API_URL}user/forget-password/`;
    const response = await axios.post(
      ForgetPasswordUrl,
      {
        email,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (e) {
    throw new Error("Forget Password Failed!");
  }
};

export const update_user = async (
  first_name: string,
  last_name: string,
  DOB: string,
  phone_number: string
) => {
  try {
    const UpdateUserUrl = `${API_URL}user/update/`;
    console.log("🔹 Sending request to:", UpdateUserUrl);
    console.log("🔹 Payload:", { first_name, last_name, DOB, phone_number });
    const response = await axios.post(
      UpdateUserUrl,
      {
        first_name,
        last_name,
        DOB,
        phone_number,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (e: any) {
    throw new Error(e.response?.data?.message || "Update User Failed!");
  }
};

export const get_user = async () => {
  try {
    const GetUserUrl = `${API_URL}user/profile/`;
    const response = await axios.get(GetUserUrl, { withCredentials: true });
    return response.data;
  } catch (e) {
    throw new Error("Get User Failed!");
  }
};
