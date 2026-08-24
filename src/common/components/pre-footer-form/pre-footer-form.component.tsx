import React, { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { formatUaPhoneNumber, isCompleteUaPhoneNumber } from "@app/common/utils/phone-mask";

const WEBHOOK_URL = "https://hook.eu1.make.com/ekpj1dzkr5s3ni76m32a4p2aw24gl8i3";

interface PreFooterFormValues {
  name: string;
  phoneNumber: string;
  website_hp?: string;
}

export const PreFooterConsultationForm: FC = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
  } = useForm<PreFooterFormValues>({
    defaultValues: {
      name: "",
      phoneNumber: "",
      website_hp: "",
    },
  });

  const onSubmit = async (data: PreFooterFormValues) => {
    // Anti-spam honeypot check
    if (data.website_hp) {
      reset();
      return;
    }

    let hasError = false;
    const trimmedName = (data.name || "").trim();
    const hasLetters = /[a-zA-Zа-яА-ЯіІїЇєЄґҐ]/.test(trimmedName);
    const isDigitsOnly = /^\d+$/.test(trimmedName);

    if (!trimmedName || !hasLetters || isDigitsOnly) {
      setError("name", { type: "manual", message: t("Вкажіть ваше ім'я") });
      hasError = true;
    }

    if (!data.phoneNumber || !isCompleteUaPhoneNumber(data.phoneNumber)) {
      setError("phoneNumber", { type: "manual", message: t("Вкажіть правильний номер телефону") });
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);

    try {
      const payload = {
        page: typeof window !== "undefined" ? window.location.href : "https://toothfairy.clinic",
        form_id: "pre-footer-consultation-form",
        name: trimmedName,
        phone: data.phoneNumber,
        phoneNumber: data.phoneNumber,
      };

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });

      if (!response.ok && response.status !== 0) {
        throw new Error("Network response was not ok");
      }

      toast.success(
        t("Дякуємо! Вашу заявку успішно відправлено. Наш адміністратор зв'яжеться з вами найближчим часом.")
      );

      reset();
    } catch (error) {
      toast.error(
        t("Не вдалося відправити заявку. Спробуйте ще раз або зателефонуйте нам.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="w-full bg-paleOlive/25 dark:bg-darkGray/90 border-t border-paleOlive/50 dark:border-paleOlive/20 py-12 md:py-16 transition-colors duration-300"
      aria-label={t("Записатись на консультацію")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          
          <div className="lg:w-5/12 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-darkGray dark:text-white mb-3">
              {t("Записатись на консультацію")}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t("Заповніть форму, і наш адміністратор зв'яжеться з вами, щоб уточнити деталі та підібрати зручний час.")}
            </p>
          </div>

          <div className="lg:w-7/12 w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-start"
            >
              <Controller
                name="website_hp"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="opacity-0 absolute -left-[9999px] h-0 w-0 pointer-events-none"
                  />
                )}
              />

              <div className="flex-1 flex flex-col">
                <label htmlFor="prefooter-name" className="sr-only">
                  {t("Введіть ваше ім'я")}
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <input
                        {...field}
                        id="prefooter-name"
                        type="text"
                        autoComplete="name"
                        onChange={(e) => {
                          field.onChange(e);
                          if (fieldState.error) clearErrors("name");
                        }}
                        placeholder={t("Введіть ваше ім'я")}
                        aria-invalid={!!fieldState.error}
                        aria-describedby={fieldState.error ? "prefooter-name-error" : undefined}
                        className={`w-full px-4 py-3 text-sm sm:text-base rounded-lg border outline-none transition-all duration-200 bg-white dark:bg-darkGray text-darkGray dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm ${
                          fieldState.error
                            ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 dark:border-paleOlive/40 focus:border-darkGray dark:focus:border-paleOlive"
                        }`}
                      />
                      {fieldState.error && (
                        <span
                          id="prefooter-name-error"
                          role="alert"
                          className="text-xs text-red-600 dark:text-red-400 mt-1.5 text-left font-medium"
                        >
                          {fieldState.error.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="flex-1 flex flex-col">
                <label htmlFor="prefooter-phone" className="sr-only">
                  {t("Введіть ваш телефон")}
                </label>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <input
                        {...field}
                        id="prefooter-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={field.value || ""}
                        onChange={(e) => {
                          const formatted = formatUaPhoneNumber(e.target.value);
                          setValue("phoneNumber", formatted);
                          if (fieldState.error) clearErrors("phoneNumber");
                        }}
                        placeholder="+38 (___) ___-__-__"
                        aria-invalid={!!fieldState.error}
                        aria-describedby={fieldState.error ? "prefooter-phone-error" : undefined}
                        className={`w-full px-4 py-3 text-sm sm:text-base rounded-lg border outline-none transition-all duration-200 bg-white dark:bg-darkGray text-darkGray dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm ${
                          fieldState.error
                            ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 dark:border-paleOlive/40 focus:border-darkGray dark:focus:border-paleOlive"
                        }`}
                      />
                      {fieldState.error && (
                        <span
                          id="prefooter-phone-error"
                          role="alert"
                          className="text-xs text-red-600 dark:text-red-400 mt-1.5 text-left font-medium"
                        >
                          {fieldState.error.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="sm:w-auto flex flex-col">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto whitespace-nowrap px-8 py-3 rounded-lg font-semibold text-sm sm:text-base shadow-md transition-all duration-200 flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? "opacity-60 cursor-not-allowed bg-gray-400 text-white"
                      : "bg-darkGray text-white hover:bg-black dark:bg-paleOlive dark:text-darkGray dark:hover:bg-white hover:shadow-lg active:scale-95"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      {t("Завантаження...")}
                    </>
                  ) : (
                    t("Записатись")
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
