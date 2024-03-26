import clsx from "clsx";
import { ComponentProps, forwardRef, useId } from "react";
import { ReactComponent as ExclamationCircleSolid } from "@app/assets/icons/exclamation-circle-solid.svg";

interface InputProps {
  onChange?: ComponentProps<"input">["onChange"];
  onBlur?: ComponentProps<"input">["onBlur"];
  value?: ComponentProps<"input">["value"];
  name?: ComponentProps<"input">["name"];
  disabled?: ComponentProps<"input">["disabled"];
  lable: string;
  placeholder: string;
  error?: string;
  type?: ComponentProps<"input">["type"];
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ lable, error, fullWidth, ...props }, ref) => {
    const inputId = useId();
    const inputClasses = clsx(
      "border shadow-sm bg-white   rounded-md px-3 pr-8 py-2 text-sm placeholder-gray-300  mb-2 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed 0 dark:bg-darkGray dark:shadow-paleOlive dark:border-paleOlive dark:text-white",
      {
        "border-gray-300": !error,
        "border-red-300 focus:border-red-500 text-red-900": error,
        "w-full": fullWidth,
      }
    );
    const inputWrapperClasses = clsx("relative inline-block", {
      "w-full": fullWidth,
    });
    return (
      <div>
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-900 mb-1 dark:text-white "
        >
          {lable}
        </label>
        <div className={inputWrapperClasses}>
          <input className={inputClasses} id={inputId} ref={ref} {...props} />
          {error && (
            <ExclamationCircleSolid className="h-4 w-4 absolute right-3 top-2.75 fill-red-500" />
          )}
        </div>

        <span
          className="block text-sm text-red-600"
          dangerouslySetInnerHTML={{ __html: error || "&nbsp" }}
        />
      </div>
    );
  }
);
