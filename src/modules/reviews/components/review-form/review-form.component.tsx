import { FC } from "react";
import { ReviewFormProps } from "./review-form.types";
import { useReviewForm } from "./use-reviews-from";
import { Controller } from "react-hook-form";
import { Input } from "@app/common/components/input/input.compnent";
import { TextArea } from "@app/common/components/text-area/text-area.component";
import { Button } from "@app/common/components/button/button.component";
import { useTranslation } from 'react-i18next';


export const ReviewForm: FC<ReviewFormProps> = ({ submitCallback }) => {
  const { control, onSubmit, reset } = useReviewForm({
    callback: submitCallback,
  });

  const { t } = useTranslation();

  return (
    <form className="flex flex-col gap-2 " onSubmit={onSubmit}>
      <Controller
        name="client_name"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            lable={t("Ім'я")}
            fullWidth
            placeholder={t("Введіть ваше ім'я")}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            lable={t('Телефон')}
            fullWidth
            placeholder={t('Введіть ваше телефон')}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="comment"
        control={control}
        render={({ field, fieldState }) => (
          <TextArea
            {...field}
            lable={t('Коментар')}
            fullWidth
            placeholder={t('Введіть ваш відгук')}
            error={fieldState.error?.message}
          />
        )}
      />

      <Button fullWidth={true}>{t('Підтвердити')}</Button>
    </form>
  );
};
