import clsx from "clsx";
import { ComponentProps, FC, PropsWithChildren } from "react";

enum ButtonSize {
  sm = "sm",
  base = "base",
  md = "md",
}

enum ButtonVariant {
  primary = "primary",
  danger = "danger",
}

interface ButtonProps {
  size?: keyof typeof ButtonSize;
  disbled?: boolean;
  variant?: keyof typeof ButtonVariant;
  type?: ComponentProps<"button">["type"];
  onClick?: ComponentProps<"button">["onClick"];
  fullWidth?: boolean;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  size = ButtonSize.base,
  disbled,
  variant = ButtonVariant.primary,
  fullWidth = false,
  ...props
}) => {
  const buttonClasses = clsx(
    "text-sm text-gray-900  border  outline-none  rounded-md  transition-all",
    {
      "w-full": fullWidth,
      "py-2 px-4": size === ButtonSize.base,
      "py-0.5 px-4 ": size === ButtonSize.sm,
      "py-4 px-10 rounded-none": size === ButtonSize.md,
      "opacity-50 cursor-not-allowed": disbled,
      "bg-darkTea  text-white  border-darkTea hover:bg-white hover:text-black hover:border-darkTea disabled:hover:border-lightBlue disabled:hover:bg-lightBlue":
        variant === ButtonVariant.primary,
      "bg-red-400  border-red-400 hover:bg-red-500 hover:border-red-500  disabled:hover:border-red-400 disabled:hover:bg-red-400":
        variant === ButtonVariant.danger,
    }
  );

  return (
    <button disabled={disbled} {...props} className={buttonClasses}>
      {children}
    </button>
  );
};
