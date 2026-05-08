import { useTranslation } from 'react-i18next';

export const OldReviewsItem = () => {
  const { t } = useTranslation();

  const reviews = [
    { id: 1, src: "/assets/review_1.svg" },
    { id: 2, src: "/assets/review_2.svg" },
    { id: 3, src: "/assets/review_3.svg" },
  ];

  return (
    <ul className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-10">
      {reviews.map((review) => (
        <li key={review.id}>
          <figure>
            <img
              src={review.src}
              alt={t("Позитивний відгук пацієнта про клініку")}
              loading="lazy"
              className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl transition-all duration-300"
            />
          </figure>
        </li>
      ))}
    </ul>
  );
};