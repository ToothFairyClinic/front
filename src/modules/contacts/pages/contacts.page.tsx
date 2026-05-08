import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Contacts } from "../components/contacts.component";
import { useMediaQuery } from "react-responsive";
import { ReactComponent as AccessTimeIcon } from "@app/assets/icons/access_time.svg";
import { ReactComponent as SmartPhoneIcon } from "@app/assets/icons/smartphone.svg";
import { ReactComponent as MailIcon } from "@app/assets/icons/mail.svg";
import { ReactComponent as LocationIcon } from "@app/assets/icons/location.svg";
import { useTranslation } from "react-i18next";
import { useGetPageMetadataQuery } from "@app/core/types";
import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";

export const ContactPage: FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });


  const { data: PageMetadata } = useGetPageMetadataQuery({ variables: { route: '/contacts' } });
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const pageMeta = PageMetadata?.page_metadata[0];

  const currentTitle = isEn ? pageMeta?.seo_title_en : pageMeta?.seo_title;

  const currentDescription = isEn ? pageMeta?.seo_description_en : pageMeta?.seo_description;

  const contactSchema = {
    "@type": "ContactPage",
    "mainEntity": {
      "@id": "https://toothfairy.clinic/#organization",
      "@type": "Dentist",
      "name": isEn ? "Tooth Fairy Dental Clinic" : "Зубна Фея",
      "image": "https://toothfairy.clinic/assets/favicon/android-chrome-512x512.png",
      "telephone": ["+380681689911", "+380934599911"],
      "email": "admin@toothfairy.clinic",
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
      ]
    }
  };

  return (
    <main className="flex lg:flex-row flex-col-reverse dark:bg-darkGray gap-14 py-24 justify-center items-center lg:items-start">
      <SEOMeta
        title={currentTitle || t("Контакти стоматології Зубна Фея у Білій Церкві")}
        description={currentDescription || t("Як нас знайти: м. Біла Церква, вул. Вокзальна 22. Телефони для запису, графік роботи.")}
        path="/contacts"
        type="ContactPage"
        schemaData={contactSchema}
      />

      <section aria-label={t("Карта проїзду")}>
        <Contacts mapHeight={isMobile ? "350" : "586"} mapWidth={isMobile ? "320" : "749"} />
      </section>

      <div className="flex flex-col max-w-xl">
        <h1 className="text-4xl sm:text-6xl lg:text-6xl dark:text-white border-b border-paleOlive px-15 py-4">
          {t("Контакти")}
        </h1>

        <address className="not-italic">
          <div className="px-15 dark:text-white border-b border-paleOlive py-4">
            <ul className="flex flex-col gap-7 md:gap-3 text-lg sm:text-3xl lg:text-3xl">
              <li className="flex gap-2 items-center">
                <AccessTimeIcon width={31} height={31} aria-hidden="true" />
                <span>
                  {t("ПН-СБ")}: <time dateTime="Mo-Sa 09:30-19:00">9:30-19:00</time>
                </span>
              </li>
              <li className="flex gap-2 dark:hover:text-paleOlive items-center">
                <SmartPhoneIcon width={31} height={31} aria-hidden="true" />
                <a href="tel:+380681689911" aria-label={t("Подзвонити на Київстар")}>
                  +38 (068) 168-99-11
                </a>
              </li>
              <li className="flex gap-2 dark:hover:text-paleOlive items-center">
                <SmartPhoneIcon width={31} height={31} aria-hidden="true" />
                <a href="tel:+380934599911" aria-label={t("Подзвонити на Lifecell")}>
                  +38 (093) 459-99-11
                </a>
              </li>
              <li className="flex gap-2 dark:hover:text-paleOlive items-center">
                <MailIcon width={31} height={31} aria-hidden="true" />
                <a href="mailto:admin@toothfairy.clinic">admin@toothfairy.clinic</a>
              </li>
            </ul>
          </div>

          <div className="px-15 dark:text-white border-b border-paleOlive py-4">
            <ul className="flex flex-col gap-7 md:gap-3 text-lg sm:text-3xl lg:text-3xl">
              <li className="flex gap-2 dark:hover:text-paleOlive items-center">
                <LocationIcon width={31} height={31} />
                <span>{t("Київська область, Біла Церква, Вокзальна 22")}</span>
              </li>
            </ul>
          </div>
        </address>
      </div>
    </main>
  );
};

export default ContactPage;