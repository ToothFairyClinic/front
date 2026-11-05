import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGetPageMetadataQuery, useGetPersonnelQuery } from "@app/core/types";
import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { Breadcrumbs, buildBreadcrumbSchema, Crumb } from "@app/common/components/breadcrumbs/breadcrumbs.component";
import { Mascot } from "@app/modules/main/components/mascot/mascot.component";
import { doctorPath, doctorsPath } from "@app/common/utils/doctors-path";
import { categoriesLine, categoryTitle, experienceText, isChiefDoctor } from "@app/common/utils/doctor-format";
import { DoctorCard } from "../components/doctor-card.component";

const BASE_URL = "https://toothfairy.clinic";

const COPY = {
  ua: {
    h1: "Наші лікарі",
    title: "Лікарі стоматологічної клініки Зубна Фея у Білій Церкві",
    description: "Наша команда досвідчених дитячих та дорослих стоматологів у Білій Церкві.",
    lead: "Дитячі та дорослі стоматологи, ортодонт, хірург-імплантолог, пародонтолог і гігієніст клініки Зубна Фея. Відкрийте сторінку лікаря, щоб побачити освіту, курси, сертифікати і послуги, з якими працює лікар.",
    experience: "Досвід",
    crumb: "Лікарі",
    listName: "Лікарі стоматологічної клініки Зубна Фея",
    alt: (name: string) => `${name}, стоматолог клініки Зубна Фея`,
  },
  en: {
    h1: "Our doctors",
    title: "Doctors of Tooth Fairy Dental Clinic in Bila Tserkva",
    description: "Our team of experienced pediatric and adult dentists in Bila Tserkva.",
    lead: "Pediatric and adult dentists, an orthodontist, an oral surgeon and implantologist, a periodontist and a hygienist at Tooth Fairy. Open a doctor's page to see their education, courses, certificates and the services they provide.",
    experience: "Experience",
    crumb: "Doctors",
    listName: "Doctors of Tooth Fairy Dental Clinic",
    alt: (name: string) => `${name}, dentist at Tooth Fairy Dental Clinic`,
  },
};

export const DoctorsPage: FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const lang = isEn ? "en" : "ua";
  const copy = COPY[lang];

  const { data: metaData } = useGetPageMetadataQuery({ variables: { route: "/doctors" } });
  const { data: personnelData, loading, error } = useGetPersonnelQuery();
  const meta = metaData?.page_metadata[0];

  const h1 = (isEn ? meta?.h1_en : meta?.h1) || copy.h1;
  const title = (isEn ? meta?.seo_title_en : meta?.seo_title) || copy.title;
  const description = (isEn ? meta?.seo_description_en : meta?.seo_description) || copy.description;

  const doctors = useMemo(() => {
    const list = [...(personnelData?.personnel ?? [])];
    // головний лікар першим, решта в порядку з адмінки
    return list.sort((a, b) => Number(isChiefDoctor(b.categories)) - Number(isChiefDoctor(a.categories)));
  }, [personnelData]);

  const crumbs: Crumb[] = [
    { label: t("Головна"), to: `/${lang}` },
    { label: copy.crumb },
  ];

  const schema = useMemo(
    () => [
      buildBreadcrumbSchema(crumbs, BASE_URL, `${BASE_URL}${doctorsPath(lang)}/#breadcrumb`),
      {
        "@type": "ItemList",
        "@id": `${BASE_URL}${doctorsPath(lang)}/#doctors`,
        name: copy.listName,
        numberOfItems: doctors.length,
        itemListElement: doctors.map((doctor, index) => {
          const name = (isEn && doctor.name_en) || doctor.name;
          const slug = (isEn && doctor.slug_en) || doctor.slug || doctor.id;
          return {
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Person",
              "@id": `${BASE_URL}${doctorPath(lang, slug)}/#person`,
              name,
              jobTitle: doctor.categories.map((item) => categoryTitle(item, isEn)).filter(Boolean),
              image: `https://res.cloudinary.com/dc7d3byxg/image/upload/c_fill,g_auto,w_385,h_440,f_jpg,q_auto/${doctor.image}`,
              url: `${BASE_URL}${doctorPath(lang, slug)}`,
              worksFor: { "@id": `${BASE_URL}/#organization` },
            },
          };
        }),
      },
    ],
    // crumbs залежать лише від мови
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [doctors, isEn, lang]
  );

  return (
    <>
      <SEOMeta
        title={title}
        description={description}
        path={doctorsPath(lang)}
        pathUa={doctorsPath("ua")}
        pathEn={doctorsPath("en")}
        type="CollectionPage"
        schemaData={schema}
        hasBreadcrumbs={false}
      />

      <main className="pt-10 lg:pt-12 pb-16 min-h-screen">
        <div className="px-4 md:px-10">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-12 md:gap-16">
            <section className="relative flex flex-col gap-6 lg:pr-56">
              <Breadcrumbs items={crumbs} />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-darkGray">{h1}</h1>
              <p className="text-lg md:text-xl leading-relaxed text-darkGray/80 max-w-4xl">{copy.lead}</p>
              <Mascot pose="book" height={190} className="right-6 bottom-0" />
            </section>

            <section aria-label={copy.listName}>
              {error ? (
                <ShowInfo type="error">
                  <p>{t("Упс, сталася помилка")}</p>
                </ShowInfo>
              ) : loading && doctors.length === 0 ? (
                <ShowInfo type="info">
                  <p>{t("Завантаження...")}</p>
                </ShowInfo>
              ) : (
                <ul className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 list-none p-0">
                  {doctors.map((doctor, index) => {
                    const name = (isEn && doctor.name_en) || doctor.name;
                    const slug = (isEn && doctor.slug_en) || doctor.slug || doctor.id;
                    const alt = (isEn ? doctor.image_alt_en : doctor.image_alt) || copy.alt(name);
                    return (
                      <li key={doctor.id}>
                        <DoctorCard
                          href={doctorPath(lang, slug)}
                          name={name}
                          specialties={categoriesLine(doctor.categories, isEn)}
                          experience={experienceText(doctor.experience, doctor.experience_en, isEn)}
                          experienceLabel={copy.experience}
                          image={doctor.image}
                          alt={alt}
                          priority={index === 0}
                        />
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

          </div>
        </div>
      </main>
    </>
  );
};

export default DoctorsPage;
