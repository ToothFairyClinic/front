import { FC } from "react";
import { useTranslation } from 'react-i18next';
import { OurWorkList } from "../components/our-work-list/our-work-list.components";
import { MainTitle } from "@app/common/components/main-title/main-title.component";
import { useGetPageMetadataQuery, useGetOurWorkQuery } from "@app/core/types";
import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";

export const OurWorkPage: FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const { data: metaData } = useGetPageMetadataQuery({ variables: { route: '/our-work' } });

  const { data: worksData } = useGetOurWorkQuery();

  const pageMeta = metaData?.page_metadata[0];
  const currentTitle = isEn ? pageMeta?.seo_title_en : pageMeta?.seo_title;
  const currentDescription = isEn ? pageMeta?.seo_description_en : pageMeta?.seo_description;


  const galleryItems = worksData?.our_works?.map((work) => ({
    "@type": "ImageObject",
    "name": t(work.title),
    "description": t(work.description),
    "contentUrl": `https://res.cloudinary.com/dc7d3byxg/image/upload/f_jpg,q_auto/v1/${work.image_before}`,
    "author": {
      "@id": "https://toothfairy.clinic/#organization"
    }
  }));

  return (
    <main className="bg-palePeach dark:bg-darkGray min-h-screen">
      <SEOMeta
        title={currentTitle || t("Наші роботи | Стоматологія Зубна Фея")}
        description={currentDescription || t("Перегляньте результати роботи наших стоматологів: реставрації, протезування та інше.")}
        path="/our-work"
        schemaData={{
          "@type": "ImageGallery",
          "name": currentTitle || t("Галерея робіт стоматології Зубна Фея"),
          "description": currentDescription || t("Фото результатів лікування пацієнтів до та після."),
          "provider": {
            "@id": "https://toothfairy.clinic/#organization"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://toothfairy.clinic/${isEn ? 'en' : 'ua'}/our-work`
          },
          "associatedMedia": galleryItems
        }}
      />

      <section className="px-9 pt-15 pb-24">
        <MainTitle as="h1" size="base">
          {t("Наші роботи")}
        </MainTitle>

        <article className="mt-10">
          <h2 className="sr-only">{t("Галерея результатів лікування до та після")}</h2>
          <OurWorkList />
        </article>
      </section>
    </main>
  );
};

export default OurWorkPage;