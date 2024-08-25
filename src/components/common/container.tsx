import React from "react";
type VariantType = "default" | "menu" | "no-padding";
type Props = {
  children: React.ReactNode;
  variant?: VariantType;
};
export const Container = ({ children, variant = "default" }: Props) => {
  const variantStyles: Record<VariantType, string> = {
    default: "flex flex-col gap-2 bg-white border-2 rounded-md p-1",
    "no-padding": "flex flex-col gap-2 bg-white border-2 rounded-md p-0",
    menu: "flex flex-col bg-white border-2 rounded-md p-1",
  };

  return <div className={`${variantStyles[variant]}`}>{children}</div>;
};
