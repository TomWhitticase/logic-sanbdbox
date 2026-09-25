import React from "react";

type Props = {
  icon?: React.ReactNode;
  children: React.ReactNode;
  shortcut?: React.ReactNode;
  destructive?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const MenuItem = ({
  icon,
  children,
  shortcut,
  destructive,
  className = "",
  ...props
}: Props) => (
  <button
    type="button"
    role="menuitem"
    className={`flex items-center w-full gap-2.5 px-2.5 py-1.5 text-[13px] rounded-lg text-left transition-colors ${
      destructive
        ? "text-rose-300 hover:bg-rose-500/15 hover:text-rose-200"
        : "text-slate-200 hover:bg-white/[0.07] hover:text-white"
    } ${className}`}
    {...props}
  >
    {icon && (
      <span
        className={`flex w-4 justify-center ${
          destructive ? "" : "text-slate-400"
        }`}
      >
        {icon}
      </span>
    )}
    <span className="flex-1">{children}</span>
    {shortcut && <span className="ml-4 text-slate-500">{shortcut}</span>}
  </button>
);

export const MenuSeparator = () => <div className="h-px my-1 bg-white/5" />;
