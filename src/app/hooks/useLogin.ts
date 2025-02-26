import {loginUser, logoutUser} from "../services/user_urls";
import {useUser} from "../context/UserContext";
import { useState } from "react";

export const useLogin = () => {
    const userContext=useUser();
    const [error,setError]=useState<string|null>(null);

    const handleLogin=async(email: string,password: string)=>{
        try{
            const data=await loginUser({email,password});
            if(data && data.payload){
                if(userContext){
                    userContext.setUser(data.payload);
                }
                localStorage.setItem("payload",JSON.stringify(data.payload));
                return data;  
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
              setError(error.message);
            } else {
              setError("An unknown error occurred.");
            }
          }
    };

    const handleLogout=async()=>{
        try{
            await logoutUser();
            localStorage.removeItem("payload");
            if(userContext){
                userContext.setUser(null);
            }
        }catch(error){
            setError(error as string);
        }
    };
    return {handleLogin,handleLogout,error};
};