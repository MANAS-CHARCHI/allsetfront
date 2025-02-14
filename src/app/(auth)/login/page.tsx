"use client";
import { useState } from "react";
import Image from "next/image";
import InputBox from "../../props/input-box";
import Button from "../../props/button";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
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
              />
            </div>
            <div className="flex flex-col items-center pt-4">
              <Button label="Sign Up" type="submit" />
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
