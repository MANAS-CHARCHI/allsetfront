import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useUser } from "../context/userContext";
import { loginUser, logoutUser } from "../services/user_urls";

export const useLogin = () => {
    const authContext = useAuth();
    const userContext = useUser();
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (email: string, password: string) => {
        try {
            const data=await loginUser({email,password});
            if(data){
                const {access, refresh, payload}=data;
                if(authContext){
                    authContext.login(access, refresh);
                }
                if(userContext){
                    userContext.setUser(payload);
                }
                return data;
            }
        } catch (error) {
            setError(error as string);
        }
    };

    const handleLogout = async () => {
        try{
            const refreshToken=sessionStorage.getItem("refreshToken");
            if(!refreshToken){
                throw new Error("Refresh token not found");
            }
            await logoutUser({refresh:refreshToken});
        }catch(error){
            setError(error as string);
        }finally{
            if(authContext){
                authContext.logout();
            }
            if(userContext){
                userContext.setUser(null);
            }
        }
    };

    return {
        handleLogin,
        handleLogout,
        error

        }
}