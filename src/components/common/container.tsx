import React from "react";

type VariantType = "default" | "no-padding";
type Props = {
  children: React.ReactNode;
  variant?: VariantType;
  label?: string;
  className?: string;
};

/** The visual body of a node on the canvas */
export const Container = ({
  children,
  variant = "default",
  label,
  className = "",
}: Props) => (
  <div
    className={`node-card ${
      variant === "default" ? "px-2.5 py-2" : ""
    } ${className}`}
  >
    {children}
    {label && <span className="node-label">{label}</span>}
  </div>
);
