"use client";
import { useState } from "react";
import Image from "next/image";
import InputBox from "../../props/input-box";
import Button from "../../props/button";
import Link from "next/link";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  return (
    <>
      <div className="lg:pt-8">
        <div className="flex items-center justify-center">
          <Image src="/TieImage.png" alt="Tie" width={120} height={120} />
        </div>
        <div className="text-center lg:text-2xl text-xl text-gray-700  text-smooth font-medium">
          <p>Forget your password?</p>
          <p className="text-[14px] lg:text-black text-gray-600">
            Enter your email, a password reset link will be sent.
          </p>
        </div>
        <div className="flex items-center justify-center  w-full">
          <form className="flex flex-col gap-3 pt-8">
            <div className="flex flex-col">
              <label className="text-[13px] text-gray-500">Email</label>
              <InputBox
                type="text"
                name="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col"></div>
            <div className="flex flex-col items-center">
              <Button label="Sign Up" type="submit" />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-500">
                Don&apos;t have an account?
                <Link href="/registration" className="underline px-1">
                  Create account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
