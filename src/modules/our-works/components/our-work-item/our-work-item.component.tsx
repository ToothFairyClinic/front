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

/** Підпис-заглушка з адмінки, який нічого не каже пацієнту. */
const PLACEHOLDER_DESCRIPTION = /^(приклад роботи|example of work|work example)\.?$/i;

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
  const rawDescription = ((isEn && description_en) || t(description) || "").trim();
  const cardDescription = PLACEHOLDER_DESCRIPTION.test(rawDescription) ? "" : rawDescription;
  const caseSlug = isEn ? slug_en : slug;
  const href = is_case_published && caseSlug ? casePath(lang, caseSlug) : undefined;

  return (
    <article className="group relative h-full flex flex-col w-full bg-white rounded-2xl border border-black/5 overflow-hidden">
      <AdvancedImage
        cldImg={imageCldBefore}
        width={460}
        height={440}
        loading="lazy"
        alt={`${cardTitle}: ${t("Результат до та після лікування")}`}
        className="block w-full h-auto aspect-[23/22] object-cover bg-palePeach"
      />

      <div className="flex flex-col flex-1 gap-3 p-5 md:p-6">
        <h3 className="text-xl md:text-2xl font-semibold leading-snug text-darkGray">
          {href ? (
            <Link
              to={href}
              className="after:absolute after:inset-0 underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-darkGray/40 transition-colors duration-150"
            >
              {cardTitle}
            </Link>
          ) : (
            cardTitle
          )}
        </h3>
        {cardDescription && <p className="text-base leading-relaxed text-darkGray/80">{cardDescription}</p>}
        {href && (
          <span className="mt-auto pt-1 self-start inline-flex items-center gap-2 font-semibold text-base text-darkGray" aria-hidden="true">
            {t("Як проходило лікування")}
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        )}
      </div>
    </article>
  );
};
