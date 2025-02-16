"use client";
import { useState } from "react";
import Image from "next/image";
import InputBox from "../../props/input-box";
import Button from "../../props/button";
import Link from "next/link";

import { registerUser } from "../../services/user_urls";
import { useRouter } from "next/navigation";

export default function Registration() {
  const [error, setError] = useState<{ [key: string]: string }>({});
  interface State {
    email: string;
    password: string;
    confirmPassword: string;
  }

  const [formData, setFormData] = useState<State>({
    email: "",
    password: "",
    confirmPassword: "",
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
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setError(newErrors);
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
      const data = await registerUser(payload);
      console.log(data);
      if (data) {
        alert(
          "registration successful! Please check your email to activate your account"
        );
        router.push("/login");
      }
    } catch (error) {
      setError(error as any);
    }
  };
  return (
    <>
      <div className="lg:pt-8">
        <div className="flex items-center justify-center">
          <Image src="/TieImage.png" alt="Tie" width={120} height={120} />
        </div>
        <div className="text-center lg:text-2xl text-xl text-gray-700  text-smooth font-medium">
          <p>Create an account to</p>
          <p> plan everything.</p>
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
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[13px] text-gray-500">Password</label>
              <InputBox
                type="password"
                name="password"
                placeholder=""
                value={formData.password}
                onChange={handleChange}
                className=" tracking-widest font-bold"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[13px] text-gray-500">
                Confirm Password
              </label>
              <InputBox
                type="password"
                name="confirmPassword"
                placeholder=""
                value={formData.confirmPassword}
                onChange={handleChange}
                className=" tracking-widest font-bold"
              />
            </div>
            <div className="flex flex-col items-center pt-4">
              <Button type="submit" label="Create account" />
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
