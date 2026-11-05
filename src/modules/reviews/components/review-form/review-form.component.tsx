import { FC } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ReviewFormProps } from "./review-form.types";
import { useReviewForm } from "./use-reviews-from";

const FIELD =
  "w-full px-4 py-3 text-base rounded-lg border outline-none bg-white text-darkGray placeholder-gray-400 transition-colors duration-150";

const fieldBorder = (hasError: boolean) =>
  hasError ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:border-darkGray";

export const ReviewForm: FC<ReviewFormProps> = ({ submitCallback, successMessage }) => {
  const { control, onSubmit, isSubmitting } = useReviewForm({ callback: submitCallback, successMessage });
  const { t } = useTranslation();

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Controller
          name="client_name"
          control={control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="review-name" className="text-base font-semibold text-darkGray">
                {t("Ім'я")}
              </label>
              <input
                {...field}
                id="review-name"
                type="text"
                autoComplete="name"
                placeholder={t("Введіть ваше ім'я")}
                aria-invalid={!!fieldState.error}
                aria-describedby={fieldState.error ? "review-name-error" : undefined}
                className={`${FIELD} ${fieldBorder(!!fieldState.error)}`}
              />
              {fieldState.error && (
                <span id="review-name-error" role="alert" className="text-sm text-red-600 font-medium">
                  {t(fieldState.error.message || "")}
                </span>
              )}
            </div>
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="review-phone" className="text-base font-semibold text-darkGray">
                {t("Телефон")}
              </label>
              <input
                {...field}
                id="review-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+38 (___) ___-__-__"
                aria-invalid={!!fieldState.error}
                aria-describedby={fieldState.error ? "review-phone-error" : undefined}
                className={`${FIELD} ${fieldBorder(!!fieldState.error)}`}
              />
              {fieldState.error && (
                <span id="review-phone-error" role="alert" className="text-sm text-red-600 font-medium">
                  {t(fieldState.error.message || "")}
                </span>
              )}
            </div>
          )}
        />
      </div>

      <Controller
        name="comment"
        control={control}
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="review-comment" className="text-base font-semibold text-darkGray">
              {t("Відгук")}
            </label>
            <textarea
              {...field}
              id="review-comment"
              rows={5}
              placeholder={t("Введіть ваш відгук")}
              aria-invalid={!!fieldState.error}
              aria-describedby={fieldState.error ? "review-comment-error" : undefined}
              className={`${FIELD} resize-y min-h-[8rem] ${fieldBorder(!!fieldState.error)}`}
            />
            {fieldState.error && (
              <span id="review-comment-error" role="alert" className="text-sm text-red-600 font-medium">
                {t(fieldState.error.message || "")}
              </span>
            )}
          </div>
        )}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="self-start inline-flex items-center justify-center font-semibold text-base sm:text-lg px-8 py-3.5 rounded-full bg-darkGray text-white hover:bg-black transition-colors duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {t("Надіслати відгук")}
      </button>
    </form>
  );
};
