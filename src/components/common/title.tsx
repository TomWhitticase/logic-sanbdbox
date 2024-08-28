import React from "react";
type Props = {
  content: React.ReactNode;
  variant?: "large" | "small";
};
export const Title = ({ content, variant = "large" }: Props) => {
  return (
    <h3
      className={`pb-1 font-semibold ${
        variant === "small" ? "text-sm" : "text-md"
      }`}
    >
      {content}
    </h3>
  );
};
