"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/app/utils/axiosInstance";
import { Progress } from "@/components/ui/progress";

import {
  verify_user,
  logout_user,
  refresh_access_token,
} from "@/app/utils/auth";
import { useRouter } from "next/navigation";

const AuthGuard = ({ children }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await verify_user();
        setIsAuthenticated(true);
      } catch (error) {
        console.log("user is not authenticated");
        try {
          await refresh_access_token();
          setIsAuthenticated(true);
        } catch (refreshError) {
          console.log("Access token refresh failed, logging out...");
          await logout_user();
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Progress value={60} />
      </div>
    );
  }
  return <>{isAuthenticated ? children : null}</>;
};

export default AuthGuard;
