import { FC, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@app/common/components/input/input.compnent";
import { TextArea } from "@app/common/components/text-area/text-area.component";
import { Button } from "@app/common/components/button/button.component";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ReactComponent as SmartPhoneIcon } from "@app/assets/icons/smartphone.svg";
import { ReactComponent as ViberIcon } from "@app/assets/icons/viber.svg";
import { formatUaPhoneNumber, isCompleteUaPhoneNumber } from "@app/common/utils/phone-mask";

export interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ConsultationFormValues {
  name: string;
  phoneNumber: string;
  comment?: string;
  website_hp?: string;
}

export const ConsultationModal: FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ConsultationFormValues>({
    defaultValues: {
      name: "",
      phoneNumber: "",
      comment: "",
      website_hp: "",
    },
  });

  // Handle ESC key and scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const WEBHOOK_URL = 'https://hook.eu1.make.com/ekpj1dzkr5s3ni76m32a4p2aw24gl8i3';

  const onSubmit = async (data: ConsultationFormValues) => {
    if (data.website_hp) {
      reset();
      onClose();
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
        form_id: "consultation-modal",
        name: trimmedName,
        phone: data.phoneNumber,
        comment: data.comment || "",
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

      toast.success(t("Дякуємо! Вашу заявку успішно відправлено. Наш адміністратор зв'яжеться з вами найближчим часом."));
      reset();
      onClose();
    } catch (err) {
      toast.error(t("Не вдалося відправити заявку. Спробуйте ще раз або зателефонуйте нам."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const PHONE_PRIMARY = "+380681689911";
  const PHONE_SECONDARY = "+380934599911";
  const viberLink = `viber://chat?number=%2B380681689911`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-darkGray border border-paleOlive/60 dark:border-paleOlive/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-darkGray dark:text-white transition-all duration-300 transform scale-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label={t("Закрити")}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:text-darkGray dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6 pr-6">
          <h2
            id="consultation-modal-title"
            className="text-2xl sm:text-3xl font-semibold text-darkGray dark:text-white mb-2"
          >
            {t("Форма запису на консультацію")}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            {t("Залиште ваші контактні дані, і ми зв'яжемося з вами найближчим часом для надання консультації.")}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-3">
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

          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  if (fieldState.error) clearErrors("name");
                }}
                lable={t("Ім'я")}
                fullWidth
                placeholder={t("Введіть ваше ім'я")}
                error={fieldState.error?.message}
                autoComplete="name"
              />
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                value={field.value || ""}
                onChange={(e) => {
                  const formatted = formatUaPhoneNumber(e.target.value);
                  setValue("phoneNumber", formatted);
                  if (fieldState.error) clearErrors("phoneNumber");
                }}
                type="tel"
                lable={t("Телефон")}
                fullWidth
                placeholder="+38 (___) ___-__-__"
                error={fieldState.error?.message}
                autoComplete="tel"
              />
            )}
          />

          <Controller
            name="comment"
            control={control}
            render={({ field, fieldState }) => (
              <TextArea
                {...field}
                lable={t("Ваше повідомлення або запитання (необов'язково)")}
                fullWidth
                placeholder={t("Введіть ваше повідомлення")}
                error={fieldState.error?.message}
              />
            )}
          />

          <div className="mt-2">
            <Button type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? t("Завантаження...") : t("Надіслати заявку")}
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-5 border-t border-gray-200 dark:border-white/10 text-center">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3">
            {t("Зателефонувати нам:")}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm font-medium">
            <a
              href={`tel:${PHONE_PRIMARY}`}
              className="flex items-center gap-1.5 text-darkGray dark:text-paleOlive hover:underline transition-all"
            >
              <SmartPhoneIcon className="w-4 h-4 text-darkGray dark:text-paleOlive" />
              <span>+38 (068) 168-99-11</span>
            </a>
            <a
              href={`tel:${PHONE_SECONDARY}`}
              className="flex items-center gap-1.5 text-darkGray dark:text-paleOlive hover:underline transition-all"
            >
              <SmartPhoneIcon className="w-4 h-4 text-darkGray dark:text-paleOlive" />
              <span>+38 (093) 459-99-11</span>
            </a>
            <a
              href={viberLink}
              className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 hover:underline transition-all"
            >
              <ViberIcon className="w-4 h-4" />
              <span>Viber</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
