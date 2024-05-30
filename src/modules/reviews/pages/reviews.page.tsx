import { useCreateReviewMutation } from "@app/core/types";
import { FC } from "react";
import { ReviewFormValues } from "../components/review-form/review-form.types";
import { Container } from "@app/common/components/container/container.component";
import { ActionPaper } from "@app/common/components/action-paper/action-paper.component";
import { ReviewForm } from "../components/review-form/review-form.component";
import { ReviewsList } from "../components/reviews-list/reviews-list.component";
import { validatePhoneNumber } from "@app/core/phoneNumber";

interface ReviewsPageProps {}

export const ReviewsPage: FC<ReviewsPageProps> = ({}) => {
  const [CreateReviewMutation] = useCreateReviewMutation();

  const handlerCheckoutSubmit = async (values: ReviewFormValues) => {
    let phoneNumber;

    try {
      phoneNumber = validatePhoneNumber(values.phoneNumber);
    } catch (error) {
      return JSON.parse("error");
    }

    const newReview = await CreateReviewMutation({
      variables: {
        client_name: values.client_name,
        client_phone: phoneNumber,
        comment: values.comment,
      },
    });
  };

  return (
    <div className="py-24 pt-11 dark:bg-darkGray ">
      <ReviewsList />
      <Container>
        <ActionPaper title="Відгук">
          <h1>Наші попередні відгуки доступні <a href="https://www.google.com/maps/place/%D0%A1%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F+%22%D0%97%D1%83%D0%B1%D0%BD%D0%B0+%D0%A4%D0%B5%D1%8F%22/@49.811069,30.1081881,17z/data=!4m18!1m9!3m8!1s0x40d3423b8b64085d:0x888f51696df6de26!2z0KHRgtC-0LzQsNGC0L7Qu9C-0LPRltGPICLQl9GD0LHQvdCwINCk0LXRjyI!8m2!3d49.811069!4d30.1081881!9m1!1b1!16s%2Fg%2F11c7s7p8z0!3m7!1s0x40d3423b8b64085d:0x888f51696df6de26!8m2!3d49.811069!4d30.1081881!9m1!1b1!16s%2Fg%2F11c7s7p8z0?hl=ru&entry=ttu">Тут</a></h1>
          <div className="flex gap-19 flex-col lg:flex-row ">
            <div className="flex-1">
              <ReviewForm submitCallback={handlerCheckoutSubmit} />
            </div>
          </div>
        </ActionPaper>
      </Container>
    </div>
  );
};
