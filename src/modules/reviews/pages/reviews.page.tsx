import { useCreateReviewMutation } from "@app/core/types";
import { FC } from "react";
import { ReviewFormValues } from "../components/review-form/review-form.types";
import { Container } from "@app/common/components/container/container.component";
import { ActionPaper } from "@app/common/components/action-paper/action-paper.component";
import { ReviewForm } from "../components/review-form/review-form.component";
import { ReviewsList } from "../components/reviews-list/reviews-list.component";
import { validatePhoneNumber } from "@app/core/phoneNumber";
import { useTranslation } from 'react-i18next';
import { MainTitle } from "@app/common/components/main-title/main-title.component";
import { Helmet } from "react-helmet-async";

interface ReviewsPageProps { }

export const ReviewsPage: FC<ReviewsPageProps> = ({ }) => {
  const [CreateReviewMutation] = useCreateReviewMutation();
  const { t } = useTranslation();

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
    <main className="py-24 pt-11 dark:bg-darkGray ">
      <Helmet>
        <title>{t("Відгуки")}</title>
        <meta
          name="description"
          content={t("Відгуки наших пацієнтів про лікування в клініці Зубна Фея. Поділіться своїм досвідом та допоможіть іншим зробити правильний вибір.")}
        />
      </Helmet>

      <MainTitle size="sm" as="h1">Відгук</MainTitle>

      <section aria-label={t("Список відгуків")}>
        <ReviewsList />
      </section>

      <Container>
        <div aria-label={t("Залишити відгук")}>
          <ActionPaper title={t("Відгук")}>
            <div className="flex gap-19 flex-col lg:flex-row ">
              <div className="flex-1">
                <ReviewForm submitCallback={handlerCheckoutSubmit} />
              </div>
            </div>
          </ActionPaper>
        </div>
      </Container>
    </main>

  );
};
