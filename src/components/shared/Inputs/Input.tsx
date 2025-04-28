import React from "react";

import { Input as NextUiInput } from "@heroui/react";

interface InputProps {
  name: string;
  label?: string;
  value?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  placeholder?: string;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  variant?: "flat" | "bordered" | "underlined" | "faded";
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  className?: string;
  inputWrapperClassName?: string;
  size?: "sm" | "md" | "lg";
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  handleChange,
  onBlur,
  onFocus,
  type,
  error,
  placeholder,
  isReadOnly,
  isDisabled,
  isRequired,
  variant,
  startContent,
  endContent,
  className,
  inputWrapperClassName,
  value,
  size = "md",
}) => {
  return (
    <NextUiInput
      className={className}
      classNames={{ inputWrapper: inputWrapperClassName }}
      name={name}
      placeholder={placeholder}
      label={label}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      type={type || "text"}
      value={value}
      isReadOnly={isReadOnly}
      isDisabled={isDisabled}
      isRequired={isRequired}
      variant={variant}
      isInvalid={!!error}
      errorMessage={error}
      startContent={startContent}
      endContent={endContent}
      size={size}
      fullWidth
    />
  );
};

export default Input;
