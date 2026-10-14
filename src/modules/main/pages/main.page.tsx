import { FC, useMemo } from "react";
import { Slide } from "../components/slide/slide.component";
import { AdvantagesGroup } from "../components/advantages/advantages-group/advantages-group.component";
import { SerivcesList } from "../components/services-main/services-main-list/services-main-list.component";
import { useGetPageMetadataQuery, useGetServicesQuery } from "@app/core/types";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { PersonnelList } from "../components/personnel/personnel-list/personnel-list.component";
import { Helmet } from "@app/common/components/head/head";
import { useTranslation } from 'react-i18next';
import { getUrlLang } from "@app/common/components/get-lang/get.lang";
import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";
import { AboutClinic } from "../components/about-clinic/about-clinic.component";
import { SeoText } from "../components/seo-text/seo-text.component";
import { HomeFaq } from "../components/home-faq/home-faq.component";
import { HomeAdvantage, HomeDoctor, HomeFaqItem, HomeService, pick, useGetHomePageQuery } from "../graphql/home-page";

interface MainPageProps { }

export const MainPage: FC<MainPageProps> = ({ }) => {
  const { data, loading: servicesLoading, error } = useGetServicesQuery();
  const { data: homeData, loading: homeLoading } = useGetHomePageQuery();
  const { data: PageMetadata, loading: metaLoading } = useGetPageMetadataQuery({ variables: { route: '/' } });

  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const pageMeta = PageMetadata?.page_metadata[0];
  const home = homeData?.home_page_by_pk;
  const text = (field: Parameters<typeof pick>[1]) => pick<string>(home, field, isEn);

  const faqItems = pick<HomeFaqItem[]>(home, "faq", isEn) ?? [];
  const doctorIds = useMemo(
    () => (home?.home_doctors ?? []).map((doctor: HomeDoctor) => doctor.personnel_id).filter(Boolean),
    [home]
  );

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
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": (i18n.language === 'en' && service.seo_title_en)
            ? service.seo_title_en
            : service.name
        }
      }))
    }
  };


  const faqSchema = faqItems.length > 0 ? {
    "@type": "FAQPage",
    "@id": `${baseUrl}/${currentLang}/#faq`,
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
      }
    }))
  } : null;

  return (
    <main className="">
      {(!metaLoading && currentTitle && currentDescription) ? (
        <SEOMeta
          title={currentTitle}
          description={currentDescription}
          path=""
          type="WebPage"
          schemaData={faqSchema ? [dentistSchema, faqSchema] : dentistSchema}
        />
      ) : (
        <Helmet>
          <title>Стоматологія Зубна Фея — професійне лікування зубів у Білій Церкві</title>
          <meta name="description" content="Сучасна стоматологічна клініка Зубна Фея: дитяча стоматологія, імплантація, терапія." />
        </Helmet>
      )}

      <Slide
        isLoading={homeLoading}
        titleTop={text("hero_title_top")}
        titleMain={text("hero_title_main")}
        titleBottom={text("hero_title_bottom")}
        text={text("hero_text")}
        button={text("hero_button")}
      />
      <AboutClinic
        label={text("about_label")}
        title={text("about_title")}
        text={text("about_text")}
        button={text("about_button")}
        image={home?.about_image}
        imageAlt={text("about_image_alt")}
      />
      <AdvantagesGroup
        isLoading={homeLoading}
        title={text("advantages_title")}
        items={pick<HomeAdvantage[]>(home, "advantages", isEn)}
      />
      <SerivcesList
        isLoading={homeLoading}
        isEn={isEn}
        title={text("services_title")}
        intro={text("services_intro")}
        items={home?.home_services ?? ([] as HomeService[])}
        services={homeData?.services}
      />
      <PersonnelList
        isLoading={servicesLoading}
        title={text("doctors_title")}
        intro={text("doctors_intro")}
        selectedIds={doctorIds}
      />
      <SeoText
        title={text("text_title")}
        intro={text("text_intro")}
        more={text("text_more")}
        moreButton={text("text_more_button")}
        lessButton={text("text_less_button")}
      />
      <HomeFaq title={text("faq_title")} items={faqItems} />

      {error && <div className="text-red-500 text-center py-4">{t("Помилка завантаження даних")}</div>}
    </main>
  );
};

export default MainPage;