import { useCreateReviewMutation } from "@app/core/types";
import { FC } from "react";
import { ReviewFormValues } from "../components/review-form/review-form.types";
import { Container } from "@app/common/components/container/container.component";
import { ActionPaper } from "@app/common/components/action-paper/action-paper.component";
import { ReviewForm } from "../components/review-form/review-form.component";
import { ReviewsList } from "../components/reviews-list/reviews-list.component";

interface ReviewsPageProps {}

export const ReviewsPage: FC<ReviewsPageProps> = ({}) => {
  const [CreateReviewMutation] = useCreateReviewMutation();

  const handlerCheckoutSubmit = async (values: ReviewFormValues) => {
    const newReview = await CreateReviewMutation({
      variables: {
        client_name: values.client_name,
        client_phone: values.phoneNumber,
        comment: values.comment,
      },
    });
  };

  return (
    <div className="py-24 pt-11 dark:bg-darkGray ">
      <ReviewsList />
      <Container>
        <ActionPaper title="Відгук">
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
