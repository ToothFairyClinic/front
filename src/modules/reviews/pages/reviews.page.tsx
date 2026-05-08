import { useCreateReviewMutation, useGetPageMetadataQuery, useGetReviewsQuery } from "@app/core/types";
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
import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";


interface ReviewsPageProps { }

export const ReviewsPage: FC<ReviewsPageProps> = ({ }) => {
  const [CreateReviewMutation] = useCreateReviewMutation();

  const { data, loading, error } = useGetReviewsQuery();
  const { t, i18n } = useTranslation();
  const { data: PageMetadata } = useGetPageMetadataQuery({ variables: { route: '/review' } });

  if (error) {
    return (
      <ShowInfo type="error">
        <p>{t("Упс, спалася помилка")}</p>
        <p>{t("Спробуйте трохи пізніше")}</p>
      </ShowInfo>
    );
  }

  if (loading) {
    return (
      <ShowInfo type="info">
        <p>{t("Завантаження...")}</p>
      </ShowInfo>
    );
  }

  if (!data) {
    return (
      <ShowInfo type="info">
        <p>{t("Нажаль тут пусто")}</p>
      </ShowInfo>
    );
  }




  const isEn = i18n.language === 'en';

  const pageMeta = PageMetadata?.page_metadata[0];

  const currentTitle = isEn ? pageMeta?.seo_title_en : pageMeta?.seo_title;

  const currentDescription = isEn ? pageMeta?.seo_description_en : pageMeta?.seo_description;

  const handlerCheckoutSubmit = async (values: ReviewFormValues) => {
    let phoneNumber;

    try {
      phoneNumber = validatePhoneNumber(values.phoneNumber);
    } catch (error) {
      // Можна додати тост-повідомлення про помилку валідації номера
      return console.error("Validation error", error);
    }

    await CreateReviewMutation({
      variables: {
        client_name: values.client_name,
        client_phone: phoneNumber,
        comment: values.comment,
      },
    });
  };

  return (
    <main className="py-24 pt-11 dark:bg-darkGray ">

      <SEOMeta
        title={currentTitle || t("Відгуки пацієнтів | Стоматологія Зубна Фея")}
        description={currentDescription || t("Дізнайтеся, що говорять пацієнти про лікування в клініці Зубна Фея.")}
        path="/review"
        schemaData={{
          "@type": "ItemList",
          "numberOfItems": data?.reviews?.length,
          "itemListElement": data?.reviews?.map((r, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": r.client_name
              },
              "reviewBody": r.comment,
              "itemReviewed": {
                "@type": "Dentist",
                "@id": "https://toothfairy.clinic/#organization",
                "name": i18n.language === 'en' ? "Tooth Fairy Dental Clinic" : "Стоматологічна клініка Зубна Фея"
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "publisher": {
                "@id": "https://toothfairy.clinic/#organization"
              }
            }
          }))
        }}
      />

      <MainTitle size="base" as="h1">{t("Відгуки пацієнтів")}</MainTitle>

      <section aria-label={t("Список відгуків")}>
        <ReviewsList />
      </section>

      <Container>
        <div aria-label={t("Залишити відгук")}>
          <ActionPaper title={t("Залишити свій відгук")}>
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

export default ReviewsPage;