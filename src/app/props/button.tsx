import React from "react";

interface ButtonProps {
  // text?: string;
  label: string;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  // text = "",
  type = "submit",
  disabled = false,
  className = "",
  onClick,
}) => {
  return (
    <button
      // name={text}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-[330px] h-[45px] bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-300 disabled:opacity-50 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
