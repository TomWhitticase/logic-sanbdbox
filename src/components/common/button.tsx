import React from "react";

type VariantType = "primary" | "secondary" | "menu";
type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  variant?: VariantType;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: Props) => {
  const { children, disabled, variant = "primary" } = props;
  const variantStyles: Record<VariantType, string> = {
    secondary:
      "items-center justify-center text-black bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-gray-200 px-2 py-1 border-2 rounded-md",
    primary:
      "items-center justify-center text-white bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-gray-700 px-2 py-1 border-2 rounded-md",
    menu: "items-center justify-start text-black bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 px-2 rounded-md w-full",
  };

  return (
    <button
      className={`flex gap-2 ${variantStyles[variant]} ${
        disabled && "opacity-50"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};
