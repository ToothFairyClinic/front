import { FC, useMemo, useState } from "react";
import { Link, useParams } from "@app/common/router/router";
import { useTranslation } from "react-i18next";
import { Helmet } from "@app/common/components/head/head";

import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { Breadcrumbs, buildBreadcrumbSchema, Crumb } from "@app/common/components/breadcrumbs/breadcrumbs.component";
import { HtmlContent } from "@app/common/components/html-content/html-content.component";
import { ConsultationModal } from "@app/common/components/consultation-modal/lazy-consultation-modal";
import { SectionHeading } from "@app/modules/main/components/section-heading/section-heading.component";
import { ServiceBookingCard } from "@app/modules/services/components/service-booking-card.component";
import { useGetOurWorkCaseQuery, useGetOurWorkQuery } from "@app/core/types";
import { OurWorkItem } from "../components/our-work-item/our-work-item.component";
import { casePath, ourWorkPath } from "../utils/case-path";
import { splitCaseContent } from "../utils/case-content";

const CLOUD = "https://res.cloudinary.com/dc7d3byxg/image/upload";
const imageUrl = (publicId: string, width: number) => `${CLOUD}/c_limit,w_${width},f_auto,q_auto/${publicId}`;

const PHONES = [
  { href: "tel:+380681689911", label: "+38 (068) 168-99-11" },
  { href: "tel:+380934599911", label: "+38 (093) 459-99-11" },
];

const NotFound: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t("Сторінку не знайдено | Стоматологія Зубна Фея")}</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <ShowInfo type="info">
        <p>{t("На жаль, таку сторінку не знайдено")}</p>
      </ShowInfo>
    </>
  );
};

/**
 * Сторінка кейсу: перший екран з фото до і після, текст лікування з кроками,
 * виділений результат, блок запису і інші приклади робіт.
 */
export const OurWorkCasePage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const lang = isEn ? "en" : "ua";
  const baseUrl = "https://toothfairy.clinic";
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const { data, loading, error } = useGetOurWorkCaseQuery({ variables: { slug: slug! }, skip: !slug });
  const { data: worksData } = useGetOurWorkQuery();
  const work = data?.our_works[0];

  const heading = (isEn ? work?.h1_en : work?.h1) || (isEn ? work?.title_en : work?.title) || "";
  const intro = isEn ? work?.intro_en : work?.intro;
  const seoTitle = isEn ? work?.seo_title_en : work?.seo_title;
  const seoDescription = (isEn ? work?.seo_description_en : work?.seo_description) || intro || "";
  const alt = (isEn ? work?.image_alt_en : work?.image_alt) || `${heading}: ${t("до і після лікування")}`;
  const { body, cta } = useMemo(() => splitCaseContent(isEn ? work?.content_en : work?.content), [isEn, work]);

  const otherWorks = (worksData?.our_works ?? []).filter((w) => w.id !== work?.id).slice(0, 3);

  const crumbs: Crumb[] = useMemo(
    () => [
      { label: t("Головна"), to: `/${lang}` },
      { label: t("Наші роботи"), to: ourWorkPath(lang) },
      { label: heading },
    ],
    [t, lang, heading]
  );

  const schema = useMemo(() => {
    if (!work) return undefined;
    const url = `${baseUrl}${casePath(lang, isEn ? work.slug_en : work.slug)}`;
    const image = imageUrl(work.image_before, 1280);
    return [
      {
        "@type": "Article",
        "@id": `${url}/#article`,
        headline: heading,
        description: seoDescription,
        inLanguage: isEn ? "en-US" : "uk-UA",
        image: { "@type": "ImageObject", url: image, caption: alt },
        ...(work.case_published_at ? { datePublished: work.case_published_at } : {}),
        ...(work.updated_at ? { dateModified: work.updated_at } : {}),
        author: { "@id": `${baseUrl}/#organization` },
        publisher: { "@id": `${baseUrl}/#organization` },
        mainEntityOfPage: { "@id": `${url}/#webpage` },
      },
      buildBreadcrumbSchema(crumbs, baseUrl, `${url}/#breadcrumb`),
    ];
  }, [work, lang, isEn, heading, seoDescription, alt, crumbs]);

  if (error) {
    return (
      <ShowInfo type="error">
        <p>{t("Упс, сталася помилка")}</p>
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
  if (!work || (isEn && !work.slug_en)) return <NotFound />;

  return (
    <>
      <SEOMeta
        title={seoTitle || `${heading} | ${t("Стоматологія Зубна Фея")}`}
        description={seoDescription}
        ogType="article"
        schemaData={schema}
        hasBreadcrumbs={false}
        pathUa={work.slug ? casePath("ua", work.slug) : undefined}
        pathEn={work.slug_en ? casePath("en", work.slug_en) : undefined}
        hasEn={Boolean(work.slug_en)}
      />

      <main className="pt-10 lg:pt-12 pb-16 dark:bg-darkGray min-h-screen">
        <div className="px-4 md:px-10">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-12 md:gap-16">
            <section className="flex flex-col gap-6">
              <Breadcrumbs items={crumbs} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="flex flex-col gap-6 md:gap-8 text-darkGray dark:text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">{heading}</h1>
                  {intro && (
                    <p className="text-lg md:text-xl leading-relaxed text-darkGray/80 dark:text-white/80 max-w-2xl">{intro}</p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setIsConsultationOpen(true)}
                      className="inline-flex items-center justify-center font-semibold text-base sm:text-lg px-8 py-3.5 rounded-full bg-darkGray text-white hover:bg-black dark:bg-paleOlive dark:text-darkGray dark:hover:bg-white transition-all duration-300 shadow-md hover:shadow-xl active:scale-95"
                    >
                      {t("Записатися на консультацію")}
                    </button>
                    <Link
                      to={ourWorkPath(lang)}
                      className="inline-flex items-center justify-center font-semibold text-base sm:text-lg px-8 py-3 rounded-full border-2 border-darkGray text-darkGray hover:bg-darkGray hover:text-white dark:border-paleOlive dark:text-paleOlive dark:hover:bg-paleOlive dark:hover:text-darkGray transition-colors duration-300"
                    >
                      {t("Усі роботи")}
                    </Link>
                  </div>
                </div>

                <figure className="relative w-full max-w-xl lg:max-w-none mx-auto overflow-hidden rounded-[2rem] bg-paleOlive/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl(work.image_before, 960)}
                    srcSet={[480, 720, 960, 1280].map((w) => `${imageUrl(work.image_before, w)} ${w}w`).join(", ")}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    width={960}
                    height={960}
                    alt={alt}
                    decoding="async"
                    {...{ fetchpriority: "high" }}
                    className="w-full h-auto"
                  />
                  <span className="absolute left-4 bottom-4 rounded-full bg-white/95 text-darkGray text-sm md:text-base font-semibold px-4 py-1.5 shadow">
                    {t("До")}
                  </span>
                  <span className="absolute right-4 bottom-4 rounded-full bg-white/95 text-darkGray text-sm md:text-base font-semibold px-4 py-1.5 shadow">
                    {t("Після")}
                  </span>
                </figure>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <article className="lg:col-span-8 flex flex-col gap-10 min-w-0">
                <HtmlContent
                  html={body}
                  className={[
                    "prose-p:leading-relaxed prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:font-normal prose-h2:mt-12 prose-h2:mb-5",
                    // кроки лікування: нумерований список стає стрічкою карток з номером у колі
                    "[&_ol]:list-none [&_ol]:pl-0 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-4 [&_ol]:[counter-reset:step]",
                    "[&_ol>li]:relative [&_ol>li]:m-0 [&_ol>li]:rounded-2xl [&_ol>li]:bg-white [&_ol>li]:border [&_ol>li]:border-black/5 [&_ol>li]:py-5 [&_ol>li]:pr-5 [&_ol>li]:pl-20 [&_ol>li]:[counter-increment:step]",
                    "[&_ol>li]:before:content-[counter(step)] [&_ol>li]:before:absolute [&_ol>li]:before:left-5 [&_ol>li]:before:top-5 [&_ol>li]:before:w-10 [&_ol>li]:before:h-10 [&_ol>li]:before:rounded-full [&_ol>li]:before:bg-paleOlive [&_ol>li]:before:flex [&_ol>li]:before:items-center [&_ol>li]:before:justify-center [&_ol>li]:before:font-semibold [&_ol>li]:before:text-darkGray",
                    "[&_ol>li>p]:my-0 [&_ol>li_strong]:block [&_ol>li_strong]:text-xl [&_ol>li_strong]:mb-1",
                    // результат лікування - окремий світлий блок
                    "[&_.tf-case-result]:mt-12 [&_.tf-case-result]:rounded-[2rem] [&_.tf-case-result]:bg-paleOlive/40 [&_.tf-case-result]:px-6 [&_.tf-case-result]:py-2 md:[&_.tf-case-result]:px-10 md:[&_.tf-case-result]:py-4 [&_.tf-case-result_h2]:mt-6",
                  ].join(" ")}
                />

                {cta && (
                  <section
                    aria-labelledby="case-cta-title"
                    className="rounded-[2rem] bg-darkGray text-white px-6 py-8 md:px-10 md:py-10 flex flex-col gap-5"
                  >
                    <h2 id="case-cta-title" className="text-3xl md:text-4xl font-normal">
                      {cta.title}
                    </h2>
                    <HtmlContent html={cta.html} className="text-white prose-p:text-white/85 prose-p:leading-relaxed prose-a:text-white" />
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                      <button
                        type="button"
                        onClick={() => setIsConsultationOpen(true)}
                        className="inline-flex items-center justify-center font-semibold text-base sm:text-lg px-8 py-3.5 rounded-full bg-paleOlive text-darkGray hover:bg-white transition-colors"
                      >
                        {t("Записатися на консультацію")}
                      </button>
                      {PHONES.map((phone) => (
                        <a key={phone.href} href={phone.href} className="text-lg font-semibold hover:underline underline-offset-4">
                          {phone.label}
                        </a>
                      ))}
                    </div>
                  </section>
                )}
              </article>
              <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24">
                <ServiceBookingCard hasPrices={false} mascot="wave" />
              </aside>
            </div>

            {otherWorks.length > 0 && (
              <section aria-labelledby="other-works-title" className="flex flex-col gap-8">
                <SectionHeading id="other-works-title" title={t("Інші приклади робіт")} />
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
                  {otherWorks.map((item) => (
                    <li key={item.id}>
                      <OurWorkItem {...item} />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </main>

      <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
    </>
  );
};

export default OurWorkCasePage;
