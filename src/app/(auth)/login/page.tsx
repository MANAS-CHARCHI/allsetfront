"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import InputBox from "../../props/input-box";
import Button from "../../props/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login_user } from "@/app/utils/auth";
import { toast } from "sonner";

export default function Login() {
  const [invalidError, setInvalidError] = useState<{ [key: string]: string }>(
    {}
  );
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
    setInvalidError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }
    const payload = {
      email: formData.email,
      password: formData.password,
    };
    try {
      await login_user(payload.email, payload.password);
      toast("Welcome to Allset!");
      router.push("/");
    } catch (e) {
      toast("Please check your credentials!");
    }
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
                error={invalidError?.email}
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
                error={invalidError?.password}
              />
            </div>
            <div className="flex flex-col items-center pt-4">
              <Button label="Sign Up" type="submit" />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-500">
                Create you account?
                <Link href="/registration" className="underline px-1">
                  Registration
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
