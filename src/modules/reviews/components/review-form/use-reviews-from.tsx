import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { UseReviewFormOptions, ReviewFormValues } from "./review-form.types";
import { useForm } from "react-hook-form";
import { phoneRegexp } from "@app/common/utils/regex";
import { toast } from "react-toastify";

const validation = yup.object({
  client_name: yup.string().trim().required("Вкажіть ваше ім'я"),
  phoneNumber: yup
    .string()
    .trim()
    // номер у форматі підказки "+38 (067) 123-45-67" зводимо до цифр
    .transform((value: string) => value.replace(/[\s()-]/g, ""))
    .matches(phoneRegexp, "Вкажіть правильний номер телефону")
    .required("Вкажіть правильний номер телефону"),
  comment: yup.string().trim().required("Напишіть кілька слів про візит"),
});

export const useReviewForm = (options?: UseReviewFormOptions) => {
  const { handleSubmit, control, reset, formState } = useForm<ReviewFormValues>({
    resolver: yupResolver(validation),
    defaultValues: {
      client_name: "",
      phoneNumber: "",
      comment: "",
    },
  });

  const submitForm = async (values: ReviewFormValues) => {
    if (options?.callback) {
      try {
        await options.callback(values);
        toast.success(options.successMessage || "Дякуємо за відгук");
        reset();
      } catch (e) {
        toast.error((e as Error).message);
      }
    }
  };
  const onSubmit = handleSubmit(submitForm);

  return { control, onSubmit, reset, isSubmitting: formState.isSubmitting };
};
