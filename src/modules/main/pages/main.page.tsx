import { FC } from "react";
import { Slide } from "../components/slide/slide.component";
import { AdvantagesGroup } from "../components/advantages/advantages-group/advantages-group.component";
import { SerivcesList } from "../components/services-main/services-main-list/services-main-list.component";
import { useGetPageMetadataQuery, useGetServicesQuery } from "@app/core/types";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { PersonnelList } from "../components/personnel/personnel-list/personnel-list.component";
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';

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

  if (error) {
    return (
      <ShowInfo type="error">
        <p>{t("Упс, сталася помилка")}</p>
        <p>{t("Спробуйте трохи пізніше")}</p>
      </ShowInfo>
    );
  }

  if (loading) {
    return (
      <ShowInfo type="info">
        <p>{t("Завантаження...")} </p>
      </ShowInfo>
    );
  }

  if (!data) {
    return (
      <ShowInfo type="info">
        <p>{t("Нажаль тут пусто")} </p>
      </ShowInfo>
    );
  }

  const sortedServices = [...data.services].sort((a, b) => {
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  const currentLang = i18n.language === 'ua' ? 'ua' : 'en';

  const baseUrl = "https://toothfairy.clinic";

  const mainSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": `${baseUrl}/${currentLang}`,
        "name": "Зубна Фея",
        "publisher": {
          "@id": `${baseUrl}/#organization`
        },
        "inLanguage": currentLang === "ua" ? "uk-UA" : "en-US"
      },
      {
        "@type": "Dentist",
        "@id": `${baseUrl}/#organization`,
        "name": "Стоматологічна клініка Зубна Фея",
        "url": `${baseUrl}/${currentLang}`,
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
          "streetAddress": "вул. Вокзальна, 22",
          "addressLocality": "Біла Церква",
          "addressRegion": "Київська область",
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
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            "opens": "09:30",
            "closes": "19:00"
          }
        ],
        "sameAs": [
          "https://www.instagram.com/toothfairy.clinic",
          "https://www.facebook.com/bcdentist.toothfairy/"
        ],
        "priceRange": "$$"
      }
    ]
  };

  return (
    <main className="">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(mainSchema)}</script>

        <title>{currentTitle || "Стоматологія Зубна Фея — професійне лікування зубів у Білій Церкві"}</title>
        <meta
          name="description"
          content={currentDescription || "Сучасна стоматологічна клініка Зубна Фея: дитяча стоматологія, імплантація, терапія та професійна гігієна. Забезпечуємо здорову посмішку для всієї родини."}
        />
      </Helmet>

      <Slide />
      <AdvantagesGroup />
      <SerivcesList items={sortedServices} />
      <PersonnelList />
    </main>
  );
};