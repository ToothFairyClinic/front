import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { UseReviewFormOptions, ReviewFormValues } from "./review-form.types";
import { useForm } from "react-hook-form";
import { phoneRegexp } from "@app/common/utils/regex";
import { toast } from "react-toastify";

const validation = yup.object({
  client_name: yup.string().required("Поле обов'язкове!"),
  phoneNumber: yup
    .string()
    .trim()
    .matches(phoneRegexp, "Введіть коректний телефонний номер")
    .required("Введіть телефонний номер"),
  comment: yup.string().required("Поле обов'язкове!"),
});

export const useReviewForm = (options?: UseReviewFormOptions) => {
  const { handleSubmit, control, reset } = useForm<ReviewFormValues>({
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
        await options?.callback(values);
        toast.success("Відгук створений!");
      } catch (e) {
        toast.error((e as Error).message);
      }
    }
  };
  const onSubmit = handleSubmit(submitForm);

  return { control, onSubmit, reset };
};
