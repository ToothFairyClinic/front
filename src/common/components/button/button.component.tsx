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
  header = "header",
}

interface ButtonProps {
  size?: keyof typeof ButtonSize;
  disabled?: boolean;
  variant?: keyof typeof ButtonVariant;
  type?: ComponentProps<"button">["type"];
  onClick?: ComponentProps<"button">["onClick"];
  fullWidth?: boolean;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  size = ButtonSize.base,
  disabled,
  variant = ButtonVariant.primary,
  fullWidth = false,
  ...props
}) => {
  const buttonClasses = clsx(
    "text-sm font-semibold border outline-none rounded-md transition-all duration-200 flex items-center justify-center gap-2",
    {
      "w-full": fullWidth,
      "py-2 px-4": size === ButtonSize.base,
      "py-1 px-3 text-xs": size === ButtonSize.sm,
      "py-3 px-6": size === ButtonSize.md,
      "opacity-50 cursor-not-allowed": disabled,

      "bg-paleOlive dark:bg-darkGray text-white border-paleOlive hover:bg-white hover:text-black hover:border-paleOlive dark:hover:text-paleOlive disabled:hover:border-lightBlue disabled:hover:bg-lightBlue":
        variant === ButtonVariant.primary,

      "bg-red-400 dark:bg-red-400 text-white border-red-400 hover:bg-red-500 hover:border-red-500 disabled:hover:border-red-400 disabled:hover:bg-red-400":
        variant === ButtonVariant.danger,

      "bg-transparent font-medium border border-darkGray shadow-md shadow-darkGray/10 text-darkGray dark:border-paleOlive dark:shadow-paleOlive/20 dark:text-white hover:bg-darkGray hover:text-white dark:hover:bg-paleOlive dark:hover:text-darkGray hover:scale-105 active:scale-95": variant === ButtonVariant.header,
    }
  );

  return (
    <button disabled={disabled} {...props} className={buttonClasses}>
      {children}
    </button>
  );
};