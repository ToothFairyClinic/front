import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useCreateReviewMutation, useGetPageMetadataQuery, useGetReviewsQuery } from "@app/core/types";
import { validatePhoneNumber } from "@app/core/phoneNumber";
import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { Breadcrumbs, buildBreadcrumbSchema, Crumb } from "@app/common/components/breadcrumbs/breadcrumbs.component";
import { Mascot } from "@app/modules/main/components/mascot/mascot.component";
import { ReviewFormValues } from "../components/review-form/review-form.types";
import { ReviewForm } from "../components/review-form/review-form.component";
import { PublicReview, ReviewsList } from "../components/reviews-list/reviews-list.component";

const BASE_URL = "https://toothfairy.clinic";

/** Картка клініки на Google Картах (CID місця). */
const GOOGLE_REVIEWS_URL = "https://maps.google.com/?cid=9840173224086134310";

const COPY = {
  ua: {
    h1: "Відгуки пацієнтів",
    title: "Відгуки про стоматологію Зубна Фея у Білій Церкві",
    description:
      "Відгуки пацієнтів про стоматологію Зубна Фея у Білій Церкві: якість лікування, сервіс, підхід лікарів до дітей і дорослих.",
    lead: "Що пишуть батьки маленьких пацієнтів і дорослі про лікування в клініці Зубна Фея. Більше відгуків - на нашій сторінці в Google Картах.",
    google: "Відгуки на Google Картах",
    leave: "Залишити відгук",
    formTitle: "Залишити відгук",
    formText:
      "Розкажіть, як пройшов прийом: що сподобалося і що нам варто покращити. Телефон бачить лише адміністратор, на сайті він не показується.",
    empty: "Тут поки немає відгуків. Будемо раді, якщо ви напишете перший.",
    thanks: "Дякуємо за відгук",
    phoneError: "Вкажіть правильний номер телефону",
  },
  en: {
    h1: "Patient reviews",
    title: "Tooth Fairy Dental Clinic Reviews in Bila Tserkva",
    description:
      "Patient reviews of Tooth Fairy dental clinic in Bila Tserkva: quality of treatment, service and how our dentists work with children and adults.",
    lead: "What parents of our young patients and adults say about treatment at Tooth Fairy. More reviews are on our Google Maps page.",
    google: "Reviews on Google Maps",
    leave: "Leave a review",
    formTitle: "Leave a review",
    formText:
      "Tell us how your visit went: what you liked and what we could do better. Only our reception team sees your phone number, it is never shown on the site.",
    empty: "There are no reviews yet. We would be glad if you wrote the first one.",
    thanks: "Thank you for your review",
    phoneError: "Please enter a valid phone number",
  },
};

/** Однакові відгуки (подвійна відправка форми) показуємо один раз. */
const uniqueReviews = (reviews: PublicReview[]) => {
  const seen = new Set<string>();
  return reviews.filter((review) => {
    const key = `${review.client_name.trim().toLowerCase()}|${review.comment.trim().toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const ReviewsPage: FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const lang = isEn ? "en" : "ua";
  const copy = COPY[lang];

  const [createReview] = useCreateReviewMutation();
  const { data, loading, error } = useGetReviewsQuery();
  const { data: metaData } = useGetPageMetadataQuery({ variables: { route: "/review" } });
  const meta = metaData?.page_metadata[0];

  const h1 = (isEn ? meta?.h1_en : meta?.h1) || copy.h1;
  const title = (isEn ? meta?.seo_title_en : meta?.seo_title) || copy.title;
  const description = (isEn ? meta?.seo_description_en : meta?.seo_description) || copy.description;

  const reviews = useMemo(
    () =>
      uniqueReviews(
        [...(data?.reviews ?? [])]
          .filter((review) => review.comment?.trim() && review.client_name?.trim())
          .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))
      ),
    [data]
  );

  const crumbs: Crumb[] = [
    { label: t("Головна"), to: `/${lang}` },
    { label: h1 },
  ];

  const schema = useMemo(() => {
    const nodes: Record<string, any>[] = [
      buildBreadcrumbSchema(crumbs, BASE_URL, `${BASE_URL}/${lang}/review/#breadcrumb`),
    ];
    if (reviews.length > 0) {
      nodes.push({
        "@type": "ItemList",
        "@id": `${BASE_URL}/${lang}/review/#reviews`,
        name: h1,
        numberOfItems: reviews.length,
        itemListElement: reviews.map((review, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Review",
            author: { "@type": "Person", name: review.client_name.trim() },
            datePublished: String(review.created_at).slice(0, 10),
            reviewBody: review.comment.trim(),
            itemReviewed: { "@id": `${BASE_URL}/#organization` },
          },
        })),
      });
    }
    return nodes;
    // crumbs залежать лише від h1 і мови
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews, h1, lang]);

  const handleSubmit = async (values: ReviewFormValues) => {
    let phoneNumber: string;
    try {
      phoneNumber = validatePhoneNumber(values.phoneNumber);
    } catch {
      throw new Error(copy.phoneError);
    }
    await createReview({
      variables: {
        client_name: values.client_name.trim(),
        client_phone: phoneNumber,
        comment: values.comment.trim(),
      },
    });
  };

  if (error) {
    return (
      <ShowInfo type="error">
        <p>{t("Упс, сталася помилка")}</p>
        <p>{t("Спробуйте трохи пізніше")}</p>
      </ShowInfo>
    );
  }

  if (loading && !data) {
    return (
      <ShowInfo type="info">
        <p>{t("Завантаження...")}</p>
      </ShowInfo>
    );
  }

  return (
    <>
      <SEOMeta title={title} description={description} path="/review" schemaData={schema} hasBreadcrumbs={false} />

      <main className="pt-10 lg:pt-12 pb-16 min-h-screen">
        <div className="px-4 md:px-10">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-12 md:gap-16">
            <section className="relative flex flex-col gap-6 lg:pr-56">
              <Breadcrumbs items={crumbs} />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-darkGray">{h1}</h1>
              <p className="text-lg md:text-xl leading-relaxed text-darkGray/80 max-w-4xl">{copy.lead}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#leave-review"
                  className="inline-flex items-center justify-center font-semibold text-base sm:text-lg px-8 py-3.5 rounded-full bg-darkGray text-white hover:bg-black transition-colors duration-150 active:scale-[0.98]"
                >
                  {copy.leave}
                </a>
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-semibold text-base sm:text-lg px-8 py-3 rounded-full border-2 border-darkGray text-darkGray hover:bg-darkGray hover:text-white transition-colors duration-150 active:scale-[0.98]"
                >
                  {copy.google}
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </a>
              </div>
              <Mascot pose="wave" height={190} className="right-6 bottom-0" />
            </section>

            <section aria-label={t("Список відгуків")}>
              {reviews.length > 0 ? (
                <ReviewsList reviews={reviews} isEn={isEn} />
              ) : (
                <p className="text-lg text-darkGray/80">{copy.empty}</p>
              )}
            </section>

            <section
              id="leave-review"
              aria-labelledby="leave-review-title"
              className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start scroll-mt-28 rounded-[2rem] bg-paleOlive/50 px-5 py-8 md:px-10 md:py-12"
            >
              <div className="lg:col-span-5 flex flex-col gap-4">
                <h2 id="leave-review-title" className="text-3xl md:text-5xl font-normal leading-tight text-darkGray">
                  {copy.formTitle}
                </h2>
                <p className="text-lg leading-relaxed text-darkGray/80">{copy.formText}</p>
              </div>
              <div className="lg:col-span-7">
                <ReviewForm submitCallback={handleSubmit} successMessage={copy.thanks} />
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default ReviewsPage;
