import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { GetOurWorkQuery } from "@app/core/types";
import { Link } from "@app/common/router/router";
import { AdvancedImage } from "@cloudinary/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { casePath } from "../../utils/case-path";

type OurWork = GetOurWorkQuery["our_works"][number];

interface OurWorkItemProps {
  fitImage?: boolean;
}

/** Картка прикладу роботи. Якщо до неї опубліковано кейс - фото, назва і підпис ведуть на сторінку кейсу. */
export const OurWorkItem: FC<OurWork & OurWorkItemProps> = ({
  image_before,
  title,
  title_en,
  description,
  description_en,
  slug,
  slug_en,
  is_case_published,
  fitImage = false,
}) => {
  const transformations = ["w_460", "h_440", "f_auto", "q_auto"];
  if (fitImage) {
    transformations.unshift("c_pad");
  }
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const lang = isEn ? "en" : "ua";

  const imageCldBefore = useCloudinaryImage(image_before, transformations);
  const cardTitle = (isEn && title_en) || t(title);
  const cardDescription = (isEn && description_en) || t(description);
  const caseSlug = isEn ? slug_en : slug;
  const href = is_case_published && caseSlug ? casePath(lang, caseSlug) : undefined;

  const image = (
    <AdvancedImage
      cldImg={imageCldBefore}
      width={460}
      height={440}
      alt={`${cardTitle}: ${t("Результат до та після лікування")}`}
      className="w-full h-auto"
      style={{ width: "100%", height: "100%" }}
    />
  );

  return (
    <article className="relative h-full flex flex-col w-full dark:text-white bg-white pb-6 rounded-2xl hover:shadow-md transition-shadow dark:shadow-white dark:bg-darkGray overflow-hidden">
      <figure className="flex flex-col flex-1">
        <div className="relative">{image}</div>

        <figcaption className="px-4 mt-4 flex flex-col flex-1">
          <h3 className="text-2xl font-semibold leading-tight">
            {href ? (
              <Link to={href} className="after:absolute after:inset-0 hover:underline underline-offset-4 decoration-paleOlive decoration-2">
                {cardTitle}
              </Link>
            ) : (
              cardTitle
            )}
          </h3>
          <div className="h-px w-24 bg-paleOlive mt-2 mb-3"></div>
          <p className="text-sm opacity-90 leading-relaxed">{cardDescription}</p>
          {href && (
            <span className="mt-4 self-start inline-flex items-center gap-2 font-semibold text-base text-darkGray dark:text-white">
              {t("Як проходило лікування")}
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          )}
        </figcaption>
      </figure>
    </article>
  );
};
