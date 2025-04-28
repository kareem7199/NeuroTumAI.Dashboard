import React from "react";
import { Button as NextUiButton } from "@heroui/button";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  isLoading?: boolean;
  handleClick?: () => void;
  type?: "submit" | "reset" | "button";
  children: React.ReactNode;
  className?: string;
  variant?:
    | "solid"
    | "faded"
    | "bordered"
    | "light"
    | "flat"
    | "ghost"
    | "shadow";
  isDisabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
  isLoading,
  handleClick,
  type,
  children,
  className,
  variant,
  isDisabled,
  size,
}) => {
  return (
    <NextUiButton
      type={type}
      color="primary"
      className={twMerge("min-w-32 p-2 text-lg", className)}
      isLoading={isLoading}
      onPress={handleClick}
      isDisabled={isDisabled}
      variant={variant}
      size={size || "md"}
    >
      {children}
    </NextUiButton>
  );
};

export default Button;
