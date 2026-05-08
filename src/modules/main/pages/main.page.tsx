import { FC, useMemo } from "react";
import { Slide } from "../components/slide/slide.component";
import { AdvantagesGroup } from "../components/advantages/advantages-group/advantages-group.component";
import { SerivcesList } from "../components/services-main/services-main-list/services-main-list.component";
import { useGetPageMetadataQuery, useGetServicesQuery } from "@app/core/types";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { PersonnelList } from "../components/personnel/personnel-list/personnel-list.component";
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';
import { getUrlLang } from "@app/common/components/get-lang/get.lang";
import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";

interface MainPageProps { }

export const MainPage: FC<MainPageProps> = ({ }) => {
  const { data, loading, error } = useGetServicesQuery();

  const { data: PageMetadata } = useGetPageMetadataQuery({ variables: { route: '/' } });
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const pageMeta = PageMetadata?.page_metadata[0];

  const currentTitle = isEn ? pageMeta?.seo_title_en : pageMeta?.seo_title;
  const currentDescription = isEn ? pageMeta?.seo_description_en : pageMeta?.seo_description;

  const order = [
    "Консультація",
    "Дитяча стоматологія",
    "Терапія",
    "Імплантація",
    "Ентодонтія",
    "Ортодонтія",
    "Спеціаліст з грудного вигодовування",
    "Наркоз",
    "Хірургія",
    "Ортопедія",
    "Естетична стоматологія",
    "Кабінет комп'ютерної томографії, ТРГ, ОПТГ"
  ];

  const sortedServices = useMemo(() => {
    if (!data?.services) return [];
    return [...data.services].sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
  }, [data]);


  if (error) {
    return (
      <ShowInfo type="error">
        <p>{t("Упс, сталася помилка")}</p>
        <p>{t("Спробуйте трохи пізніше")}</p>
      </ShowInfo>
    );
  }


  const currentLang = getUrlLang(i18n.language);

  const baseUrl = "https://toothfairy.clinic";

  const dentistSchema = {
    "@type": "Dentist",
    "@id": `${baseUrl}/#organization`,
    "name": i18n.language === 'en' ? "Tooth Fairy Dental Clinic" : "Стоматологічна клініка Зубна Фея",
    "url": `${baseUrl}/${currentLang}`,
    "additionalType": "https://schema.org/Organization",
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo-seo.svg`,
      "width": "500",
      "height": "500"
    },
    "image": `${baseUrl}/assets/favicon/android-chrome-512x512.png`,
    "telephone": "+380681689911",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": isEn ? "22 Vokzalna St" : "вул. Вокзальна, 22",
      "addressLocality": isEn ? "Bila Tserkva" : "Біла Церква",
      "addressRegion": isEn ? "Kyiv Oblast" : "Київська область",
      "postalCode": "09100",
      "addressCountry": "UA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 49.81106092703584,
      "longitude": 30.10824757616152
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:30",
        "closes": "19:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/toothfairy.clinic",
      "https://www.facebook.com/bcdentist.toothfairy/"
    ],
    "priceRange": "$$",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": i18n.language === 'en' ? "Dental Services" : "Послуги стоматології",
      "itemListElement": sortedServices.map((service) => ({
        "@type": "OfferCatalog",
        "itemOffered": {
          "@type": "Service",
          "name": (i18n.language === 'en' && service.seo_title_en)
            ? service.seo_title_en
            : service.name
        }
      }))
    }
  };

  return (
    <main className="">
      {currentTitle && currentDescription ? (
        <SEOMeta
          title={currentTitle}
          description={currentDescription}
          path=""
          type="Webpage"
          schemaData={dentistSchema}
        />
      ) : (
        <Helmet>
          <title>Стоматологія Зубна Фея — професійне лікування зубів у Білій Церкві</title>
          <meta name="description" content="Сучасна стоматологічна клініка Зубна Фея: дитяча стоматологія, імплантація, терапія." />
        </Helmet>
      )}

      <Slide />
      <AdvantagesGroup />
      <SerivcesList items={sortedServices} />
      <PersonnelList />

      {error && <div className="text-red-500 text-center py-4">{t("Помилка завантаження даних")}</div>}
    </main>
  );
};

export default MainPage;