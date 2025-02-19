"use client";

import { ChangeEvent } from "react";

interface InputBoxProps {
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
}

export default function InputBox({
  type = "text",
  name,
  placeholder = "",
  value,
  onChange,
  className = "w-[330px] h-[47px]",
  error,
}: InputBoxProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className} 
      ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-gray-400"}`}
    />
  );
}
