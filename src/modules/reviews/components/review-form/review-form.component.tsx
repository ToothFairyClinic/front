import { FC } from "react";
import { ReviewFormProps } from "./review-form.types";
import { useReviewForm } from "./use-reviews-from";
import { Controller } from "react-hook-form";
import { Input } from "@app/common/components/input/input.compnent";
import { TextArea } from "@app/common/components/text-area/text-area.component";
import { Button } from "@app/common/components/button/button.component";

export const ReviewForm: FC<ReviewFormProps> = ({ submitCallback }) => {
  const { control, onSubmit, reset } = useReviewForm({
    callback: submitCallback,
  });

  return (
    <form className="flex flex-col gap-2 " onSubmit={onSubmit}>
      <Controller
        name="client_name"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            lable="Ім'я"
            fullWidth
            placeholder="Введіть ваше ім'я"
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
            lable="Телефон"
            fullWidth
            placeholder="Введіть ваше телефон"
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
            lable="Коментар"
            fullWidth
            placeholder="Введіть ваш відгук"
            error={fieldState.error?.message}
          />
        )}
      />

      <Button fullWidth={true}>Підтвердити</Button>
    </form>
  );
};
