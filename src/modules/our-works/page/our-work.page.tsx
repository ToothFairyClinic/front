import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetPageMetadataQuery, useGetOurWorkQuery } from "@app/core/types";
import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { Breadcrumbs, buildBreadcrumbSchema, Crumb } from "@app/common/components/breadcrumbs/breadcrumbs.component";
import { ConsultationModal } from "@app/common/components/consultation-modal/lazy-consultation-modal";
import { Mascot } from "@app/modules/main/components/mascot/mascot.component";
import { OurWorkList } from "../components/our-work-list/our-work-list.components";
import { casePath } from "../utils/case-path";

const BASE_URL = "https://toothfairy.clinic";

const COPY = {
  ua: {
    h1: "Наші роботи",
    title: "Наші роботи | Стоматологія Зубна Фея",
    description: "Перегляньте результати роботи наших стоматологів: реставрації, протезування та інше.",
    lead: "Фото до і після лікування пацієнтів клініки Зубна Фея. Відкрийте роботу, щоб прочитати, з чим прийшов пацієнт, як проходило лікування і який вийшов результат.",
    ctaTitle: "Запис на консультацію",
    ctaText: "Розкажіть, що вас турбує, і адміністратор підбере зручний час прийому у потрібного лікаря.",
    gallery: "Галерея робіт стоматології Зубна Фея",
    empty: "На жаль, тут порожньо",
  },
  en: {
    h1: "Our work",
    title: "Our Work | Tooth Fairy Dental Clinic",
    description: "See the results of our dentists' work: restorations, prosthetics and more.",
    lead: "Before and after photos of Tooth Fairy patients. Open a case to read what the patient came with, how the treatment went and what the result was.",
    ctaTitle: "Book a consultation",
    ctaText: "Tell us what is bothering you and our reception team will find a convenient time with the right dentist.",
    gallery: "Tooth Fairy dental clinic work gallery",
    empty: "Sorry, there is nothing here yet",
  },
};

const PHONES = [
  { href: "tel:+380681689911", label: "+38 (068) 168-99-11" },
  { href: "tel:+380934599911", label: "+38 (093) 459-99-11" },
];

export const OurWorkPage: FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const lang = isEn ? "en" : "ua";
  const copy = COPY[lang];
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const { data: metaData } = useGetPageMetadataQuery({ variables: { route: "/our-work" } });
  const { data: worksData, loading, error } = useGetOurWorkQuery();
  const meta = metaData?.page_metadata[0];
  const works = worksData?.our_works ?? [];

  const h1 = (isEn ? meta?.h1_en : meta?.h1) || copy.h1;
  const title = (isEn ? meta?.seo_title_en : meta?.seo_title) || copy.title;
  const description = (isEn ? meta?.seo_description_en : meta?.seo_description) || copy.description;

  const crumbs: Crumb[] = [
    { label: t("Головна"), to: `/${lang}` },
    { label: h1 },
  ];

  const schema = [
    buildBreadcrumbSchema(crumbs, BASE_URL, `${BASE_URL}/${lang}/our-work/#breadcrumb`),
    {
      "@type": "ImageGallery",
      "@id": `${BASE_URL}/${lang}/our-work/#gallery`,
      name: copy.gallery,
      description,
      provider: { "@id": `${BASE_URL}/#organization` },
      mainEntityOfPage: { "@id": `${BASE_URL}/${lang}/our-work/#webpage` },
      associatedMedia: works.map((work) => {
        const name = (isEn && work.title_en) || work.title;
        const caseSlug = isEn ? work.slug_en : work.slug;
        return {
          "@type": "ImageObject",
          name,
          contentUrl: `https://res.cloudinary.com/dc7d3byxg/image/upload/f_jpg,q_auto/v1/${work.image_before}`,
          author: { "@id": `${BASE_URL}/#organization` },
          ...(work.is_case_published && caseSlug ? { url: `${BASE_URL}${casePath(lang, caseSlug)}` } : {}),
        };
      }),
    },
  ];

  return (
    <>
      <SEOMeta title={title} description={description} path="/our-work" type="CollectionPage" schemaData={schema} hasBreadcrumbs={false} />

      <main className="pt-10 lg:pt-12 pb-16 min-h-screen">
        <div className="px-4 md:px-10">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-12 md:gap-16">
            <section className="relative flex flex-col gap-6 lg:pr-56">
              <Breadcrumbs items={crumbs} />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-darkGray">{h1}</h1>
              <p className="text-lg md:text-xl leading-relaxed text-darkGray/80 max-w-4xl">{copy.lead}</p>
              <Mascot pose="toothbrush" height={190} className="right-6 bottom-0" />
            </section>

            <section aria-label={t("Галерея результатів лікування до та після")}>
              {error ? (
                <ShowInfo type="error">
                  <p>{t("Упс, сталася помилка")}</p>
                  <p>{t("Спробуйте трохи пізніше")}</p>
                </ShowInfo>
              ) : loading && works.length === 0 ? (
                <ShowInfo type="info">
                  <p>{t("Завантаження...")}</p>
                </ShowInfo>
              ) : works.length > 0 ? (
                <OurWorkList works={works} />
              ) : (
                <p className="text-lg text-darkGray/80">{copy.empty}</p>
              )}
            </section>

            <section
              aria-labelledby="our-work-cta-title"
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-12 rounded-[2rem] bg-paleOlive/50 px-5 py-8 md:px-10 md:py-12"
            >
              <div className="flex flex-col gap-3 max-w-2xl">
                <h2 id="our-work-cta-title" className="text-3xl md:text-5xl font-normal leading-tight text-darkGray">
                  {copy.ctaTitle}
                </h2>
                <p className="text-lg leading-relaxed text-darkGray/80">{copy.ctaText}</p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:items-center lg:items-start xl:items-center gap-4 sm:gap-6 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsConsultationOpen(true)}
                  className="self-start sm:self-auto inline-flex items-center justify-center font-semibold text-base sm:text-lg px-8 py-3.5 rounded-full bg-darkGray text-white hover:bg-black transition-colors duration-150 active:scale-[0.98]"
                >
                  {t("Записатися на консультацію")}
                </button>
                <div className="flex flex-col gap-1">
                  {PHONES.map((phone) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      className="text-lg font-semibold text-darkGray tabular-nums underline decoration-darkGray/30 decoration-2 underline-offset-4 hover:decoration-darkGray transition-colors duration-150"
                    >
                      {phone.label}
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
        <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
      </main>
    </>
  );
};

export default OurWorkPage;
