"use client";
import { useEffect, useState } from "react";
import Button from "./props/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  logout_user,
  refresh_access_token,
  verify_user,
} from "@/app/utils/auth";

type UserData = {
  email: string;
  first_name?: string;
  last_name?: string;
};

export default function Home() {
  const [loginData, setLoginData] = useState<UserData | null>(null);

  const router = useRouter();

  useEffect(() => {
    // Retrieve the item from localStorage
    const storedData = localStorage.getItem("user");
    if (storedData) {
      // Parse and set the retrieved data
      setLoginData(JSON.parse(storedData));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout_user();
      localStorage.removeItem("user");
      toast("Loged Out Successfully!");
      router.push("/login");
    } catch (e) {
      toast("Something is wrong while logging out!");
    }
  };
  const handleVerifyUser = async () => {
    try {
      await verify_user();
      console.log("verification success");
    } catch (e) {
      console.log("verification failed");
    }
  };

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1>Home</h1>
      <h1>
        Hi:{" "}
        {loginData
          ? `${loginData.first_name || loginData.email || "Stranger"}`
          : "Stranger"}
      </h1>
      <Button
        className="mt-4"
        label="Logout"
        type="submit"
        onClick={handleLogout}
      />
      <Button
        className="mt-4"
        label="Refresh Token"
        type="submit"
        onClick={refresh_access_token}
      />
      <Button
        className="mt-4"
        label="Verify User"
        type="submit"
        onClick={handleVerifyUser}
      />
    </main>
  );
}
