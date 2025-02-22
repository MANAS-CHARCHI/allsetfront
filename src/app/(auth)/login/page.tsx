"use client";
import { useState } from "react";
import Image from "next/image";
import InputBox from "../../props/input-box";
import Button from "../../props/button";
import Link from "next/link";

import { useLogin } from "@/app/hooks/userLogin";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ [key: string]: string } | null>(null);
  const { handleLogin } = useLogin();
  interface State {
    email: string;
    password: string;
  }

  const [formData, setFormData] = useState<State>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const validateInput = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }
    const payload = {
      email: formData.email,
      password: formData.password,
    };
    setIsLoading(true);
    await handleLogin(payload.email, payload.password);
    setIsLoading(false);
  };
  return (
    <>
      <div className="lg:pt-8">
        <div className="flex items-center justify-center">
          <Image src="/TieImage.png" alt="Tie" width={120} height={120} />
        </div>
        <div className="text-center lg:text-2xl text-xl text-gray-700  text-smooth font-medium">
          <p>Welcome back.</p>
          <p>Sign in to continue</p>
        </div>
        <div className="flex items-center justify-center  w-full">
          <form className="flex flex-col gap-3 pt-8" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-[13px] text-gray-500">Email</label>
              <InputBox
                type="email"
                name="email"
                placeholder=""
                value={formData.email}
                onChange={handleChange}
                className=" tracking-wide font-medium"
                error={error?.email}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <label className="text-[13px] text-gray-500">Password</label>
                <Link
                  href="/forget-password"
                  className="underline px-1 text-[13px] text-gray-500"
                >
                  Forget Password?
                </Link>
              </div>
              <InputBox
                type="password"
                name="password"
                placeholder=""
                value={formData.password}
                onChange={handleChange}
                className=" tracking-widest font-bold"
                error={error?.password}
              />
            </div>
            <div className="flex flex-col items-center pt-4">
              <Button
                text={isLoading ? "Loading..." : ""}
                label="Sign Up"
                type="submit"
              />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-500">
                Already have an account?
                <Link href="/login" className="underline px-1">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
