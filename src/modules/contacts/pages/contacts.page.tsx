import { FC, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetPageMetadataQuery } from "@app/core/types";
import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";
import { Breadcrumbs, buildBreadcrumbSchema, Crumb } from "@app/common/components/breadcrumbs/breadcrumbs.component";
import { ConsultationModal } from "@app/common/components/consultation-modal/lazy-consultation-modal";
import { Mascot } from "@app/modules/main/components/mascot/mascot.component";
import { ContactsMap } from "../components/contacts.component";

const BASE_URL = "https://toothfairy.clinic";

/** Картка клініки на Google Картах (CID місця). */
const GOOGLE_MAPS_URL = "https://maps.google.com/?cid=9840173224086134310";

const PHONES = [
  { href: "tel:+380681689911", label: "+38 (068) 168-99-11", value: "+380681689911" },
  { href: "tel:+380934599911", label: "+38 (093) 459-99-11", value: "+380934599911" },
];

const EMAIL = "admin@toothfairy.clinic";

const SOCIALS = [
  { href: "https://www.instagram.com/toothfairy.clinic", label: "Instagram", external: true },
  { href: "https://www.facebook.com/bcdentist.toothfairy/", label: "Facebook", external: true },
  { href: "viber://chat?number=%2B380681689911", label: "Viber", external: false },
];

const COPY = {
  ua: {
    h1: "Контакти",
    title: "Контакти стоматології Зубна Фея у Білій Церкві",
    description: "Як нас знайти: м. Біла Церква, вул. Вокзальна 22. Телефони для запису, графік роботи.",
    lead: "Стоматологія Зубна Фея працює у Білій Церкві на вулиці Вокзальній. Записатися на прийом можна телефоном, у Viber або через форму на сайті.",
    address: "Адреса",
    addressValue: "вул. Вокзальна 22, м. Біла Церква, Київська область",
    route: "Відкрити в Google Картах",
    phones: "Телефони",
    hours: "Графік роботи",
    hoursValue: "Понеділок - субота: 9:30-19:00",
    email: "Пошта",
    socials: "Соцмережі та месенджери",
    map: "Карта проїзду до стоматології Зубна Фея",
    clinic: "Стоматологічна клініка Зубна Фея",
  },
  en: {
    h1: "Contacts",
    title: "Tooth Fairy Dental Clinic Contacts in Bila Tserkva",
    description: "How to find us: Bila Tserkva, Vokzalna St. 22. Phone numbers for appointments, working hours.",
    lead: "Tooth Fairy dental clinic is located on Vokzalna Street in Bila Tserkva. You can book a visit by phone, on Viber or with the form on the site.",
    address: "Address",
    addressValue: "Vokzalna St. 22, Bila Tserkva, Kyiv region",
    route: "Open in Google Maps",
    phones: "Phone numbers",
    hours: "Working hours",
    hoursValue: "Monday - Saturday: 9:30-19:00",
    email: "Email",
    socials: "Social media and messengers",
    map: "Map to Tooth Fairy dental clinic",
    clinic: "Tooth Fairy Dental Clinic",
  },
};

const LINK =
  "text-darkGray underline decoration-darkGray/30 decoration-2 underline-offset-4 hover:decoration-darkGray transition-colors duration-150";

const ContactRow: FC<{ label: string; children: ReactNode }> = ({ label, children }) => (
  <div className="flex flex-col gap-1.5 py-5 first:pt-0 last:pb-0 border-t border-paleOlive first:border-t-0">
    <dt className="text-base font-semibold text-darkGray">{label}</dt>
    <dd className="text-lg md:text-xl leading-relaxed text-darkGray">{children}</dd>
  </div>
);

export const ContactPage: FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const lang = isEn ? "en" : "ua";
  const copy = COPY[lang];
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const { data: metaData } = useGetPageMetadataQuery({ variables: { route: "/contacts" } });
  const meta = metaData?.page_metadata[0];

  const h1 = (isEn ? meta?.h1_en : meta?.h1) || copy.h1;
  const title = (isEn ? meta?.seo_title_en : meta?.seo_title) || copy.title;
  const description = (isEn ? meta?.seo_description_en : meta?.seo_description) || copy.description;

  const crumbs: Crumb[] = [
    { label: t("Головна"), to: `/${lang}` },
    { label: h1 },
  ];

  const schema = [
    buildBreadcrumbSchema(crumbs, BASE_URL, `${BASE_URL}/${lang}/contacts/#breadcrumb`),
    {
      "@type": "Dentist",
      "@id": `${BASE_URL}/#organization`,
      name: copy.clinic,
      url: `${BASE_URL}/${lang}`,
      image: `${BASE_URL}/assets/favicon/android-chrome-512x512.png`,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo-seo.svg` },
      telephone: PHONES.map((phone) => phone.value),
      email: EMAIL,
      address: {
        "@type": "PostalAddress",
        streetAddress: isEn ? "22 Vokzalna St" : "вул. Вокзальна, 22",
        addressLocality: isEn ? "Bila Tserkva" : "Біла Церква",
        addressRegion: isEn ? "Kyiv Oblast" : "Київська область",
        postalCode: "09100",
        addressCountry: "UA",
      },
      geo: { "@type": "GeoCoordinates", latitude: 49.81106092703584, longitude: 30.10824757616152 },
      hasMap: GOOGLE_MAPS_URL,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:30",
          closes: "19:00",
        },
      ],
      contactPoint: PHONES.map((phone) => ({
        "@type": "ContactPoint",
        telephone: phone.value,
        contactType: "customer service",
        areaServed: "UA",
        availableLanguage: ["uk", "en"],
      })),
      sameAs: SOCIALS.filter((social) => social.external).map((social) => social.href),
      priceRange: "$$",
    },
  ];

  return (
    <>
      <SEOMeta title={title} description={description} path="/contacts" type="ContactPage" schemaData={schema} hasBreadcrumbs={false} />

      <main className="pt-10 lg:pt-12 pb-16 min-h-screen">
        <div className="px-4 md:px-10">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-12 md:gap-16">
            <section className="relative flex flex-col gap-6 lg:pr-56">
              <Breadcrumbs items={crumbs} />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-darkGray">{h1}</h1>
              <p className="text-lg md:text-xl leading-relaxed text-darkGray/80 max-w-4xl">{copy.lead}</p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setIsConsultationOpen(true)}
                  className="inline-flex items-center justify-center font-semibold text-base sm:text-lg px-8 py-3.5 rounded-full bg-darkGray text-white hover:bg-black transition-colors duration-150 active:scale-[0.98]"
                >
                  {t("Записатися на консультацію")}
                </button>
                <a
                  href={PHONES[0].href}
                  className="inline-flex items-center justify-center font-semibold text-base sm:text-lg px-8 py-3 rounded-full border-2 border-darkGray text-darkGray hover:bg-darkGray hover:text-white transition-colors duration-150 active:scale-[0.98]"
                >
                  {PHONES[0].label}
                </a>
              </div>
              <Mascot pose="wave" height={190} className="right-6 bottom-0" />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              <address className="not-italic lg:col-span-5 rounded-2xl bg-white border border-black/5 p-6 md:p-8">
                <dl className="flex flex-col">
                  <ContactRow label={copy.address}>
                    <span className="block">{copy.addressValue}</span>
                    <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className={`${LINK} inline-flex items-center gap-1.5 mt-2 text-base md:text-lg`}>
                      {copy.route}
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M8 7h9v9" />
                      </svg>
                    </a>
                  </ContactRow>
                  <ContactRow label={copy.phones}>
                    <ul className="flex flex-col gap-1 list-none p-0">
                      {PHONES.map((phone) => (
                        <li key={phone.value}>
                          <a href={phone.href} className={`${LINK} tabular-nums`}>
                            {phone.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </ContactRow>
                  <ContactRow label={copy.hours}>
                    <time dateTime="Mo-Sa 09:30-19:00">{copy.hoursValue}</time>
                  </ContactRow>
                  <ContactRow label={copy.email}>
                    <a href={`mailto:${EMAIL}`} className={`${LINK} break-all`}>
                      {EMAIL}
                    </a>
                  </ContactRow>
                  <ContactRow label={copy.socials}>
                    <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none p-0">
                      {SOCIALS.map((social) => (
                        <li key={social.label}>
                          <a
                            href={social.href}
                            className={LINK}
                            {...(social.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          >
                            {social.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </ContactRow>
                </dl>
              </address>

              <div className="lg:col-span-7 h-[360px] md:h-[460px] lg:h-auto lg:min-h-[520px] rounded-2xl overflow-hidden border border-black/5 bg-paleOlive/40">
                <ContactsMap title={copy.map} />
              </div>
            </section>
          </div>
        </div>
        <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
      </main>
    </>
  );
};

export default ContactPage;
