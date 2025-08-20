// src/components/ui/button.tsx
import React, { ReactNode, isValidElement } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "outline" | "default";
  children: ReactNode;
}

export function Button({
  asChild,
  variant = "default",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded px-4 py-2 font-semibold transition";

  const variantClasses =
    variant === "outline"
      ? " border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
      : " bg-indigo-600 text-white hover:bg-indigo-700";

  const combinedClasses = `${baseClasses}${variantClasses} ${className}`.trim();

  if (asChild && isValidElement(children)) {
    const childClassName = children.props.className || "";
    return React.cloneElement(children, {
      ...props,
      className: `${childClassName} ${combinedClasses}`.trim(),
    });
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
