import clsx from "clsx";
import { ComponentProps, forwardRef, useId } from "react";
import { ReactComponent as ExclamationCircleSolid } from "@app/assets/icons/exclamation-circle-solid.svg";

interface TextareaProps {
  lable: string;
  placeholder: string;
  onChange?: ComponentProps<"textarea">["onChange"];
  onBlur?: ComponentProps<"textarea">["onBlur"];
  value?: ComponentProps<"textarea">["value"];
  name?: ComponentProps<"textarea">["name"];
  disabled?: ComponentProps<"textarea">["disabled"];
  error?: string;
  fullWidth?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ lable, error, fullWidth, ...props }, ref) => {
    const inputId = useId();
    const inputClasses = clsx(
      "border shadow-sm bg-white  rounded-md px-3 pr-8 py-2 text-sm placeholder-gray-300  mb-2 outline-none transition-all dark:bg-darkGray dark:shadow-paleOlive " +
        "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed resize-none  dark:text-white",
      {
        "border-gray-300  dark:border-paleOlive": !error,
        "border-red-300 focus:border-red-500 text-red-900": error,
        "w-full": fullWidth,
      }
    );
    const inputWrapperClasses = clsx("relative inline-block ", {
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
          <textarea
            className={inputClasses}
            id={inputId}
            ref={ref}
            {...props}
            rows={7}
          />
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
