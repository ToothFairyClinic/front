import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGetPageMetadataQuery, useGetServicesQuery } from "@app/core/types";
import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";
import { Breadcrumbs, Crumb } from "@app/common/components/breadcrumbs/breadcrumbs.component";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { ServicesItem } from "@app/modules/main/components/services-main/services-main-item/services-main-item.component";
import { Mascot } from "@app/modules/main/components/mascot/mascot.component";
import { useGetHomePageQuery } from "@app/modules/main/graphql/home-page";

const BASE_URL = "https://toothfairy.clinic";

const FALLBACK = {
  ua: {
    h1: "Послуги стоматології Зубна Фея у Білій Церкві",
    title: "Послуги стоматології у Білій Церкві | Зубна Фея",
    description:
      "Усі послуги стоматології Зубна Фея у Білій Церкві: дитяча й доросла стоматологія, лікування карієсу, ортодонтія, імплантація, протезування, хірургія та КТ.",
  },
  en: {
    h1: "Dental services at Tooth Fairy in Bila Tserkva",
    title: "Dental Services in Bila Tserkva | Tooth Fairy",
    description:
      "All Tooth Fairy dental services in Bila Tserkva: children's and adult dentistry, cavity treatment, orthodontics, implants, prosthodontics, oral surgery and CT scans.",
  },
};

/** Хаб /services: усі напрями клініки з підпослугами. */
export const ServicesHubPage: FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const lang = isEn ? "en" : "ua";

  const { data, loading, error } = useGetServicesQuery();
  const { data: homeData } = useGetHomePageQuery();
  const { data: metaData } = useGetPageMetadataQuery({ variables: { route: "/services" } });
  const meta = metaData?.page_metadata[0];

  const fallback = FALLBACK[lang];
  const h1 = (isEn ? meta?.h1_en : meta?.h1) || fallback.h1;
  const title = (isEn ? meta?.seo_title_en : meta?.seo_title) || fallback.title;
  const description = (isEn ? meta?.seo_description_en : meta?.seo_description) || fallback.description;

  const cards = useMemo(() => {
    const services = data?.services ?? [];
    const homeCards = homeData?.home_page_by_pk?.home_services ?? [];
    const homeById = new Map(homeCards.map((card) => [card.service_id, card]));
    const order = new Map(homeCards.map((card, index) => [card.service_id, index]));

    return [...services]
      .sort((a, b) => (order.get(a.id) ?? 999) - (order.get(b.id) ?? 999))
      .flatMap((service) => {
        const slug = isEn ? service.slug_en : service.slug;
        if (!slug) return [];
        const card = homeById.get(service.id);
        const name = (isEn ? service.name_en : service.name) || service.name;
        const links = (service.child_services ?? [])
          .filter((child) => !child.is_geo_page)
          .flatMap((child) => {
            const childSlug = isEn ? child.slug_en : child.slug;
            const label = (isEn ? child.name_en : child.name) || child.name;
            return childSlug ? [{ label, to: `/${lang}/services/${childSlug}` }] : [];
          });

        return [{
          id: service.id,
          title: (isEn ? card?.title_en : card?.title) || name,
          description: isEn ? card?.description_en : card?.description,
          to: `/${lang}/services/${slug}`,
          image: service.mainImage,
          imageAlt: name,
          links,
        }];
      });
  }, [data, homeData, isEn, lang]);

  const crumbs: Crumb[] = [
    { label: t("Головна"), to: `/${lang}` },
    { label: t("Послуги") },
  ];

  const schema = cards.length > 0 ? {
    "@type": "ItemList",
    "@id": `${BASE_URL}/${lang}/services/#list`,
    "name": h1,
    "itemListElement": cards.map((card, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": card.title,
      "url": `${BASE_URL}${card.to}`,
    })),
  } : undefined;

  if (error) return <ShowInfo type="error"><p>{t("Упс, сталася помилка")}</p></ShowInfo>;

  return (
    <>
      <SEOMeta title={title} description={description} path="/services" type="CollectionPage" schemaData={schema} />

      <main className="pt-10 lg:pt-12 pb-16 dark:bg-darkGray min-h-screen">
        <div className="px-4 md:px-10">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-10 md:gap-12">
            <section className="relative flex flex-col gap-6 lg:pr-56">
              <Breadcrumbs items={crumbs} />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-darkGray dark:text-white">
                {h1}
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-darkGray/80 dark:text-white/80 max-w-4xl">
                {t("Зубна Фея у Білій Церкві лікує зуби дітям і дорослим: від профілактичних оглядів і лікування карієсу до ортодонтії, імплантації та протезування. У клініці є власна діагностика - КТ, панорамні знімки та ТРГ. Оберіть напрям, щоб дізнатися про послуги, лікарів і ціни.")}
              </p>
              <Mascot pose="wave" height={190} className="right-6 bottom-0" />
            </section>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 list-none p-0">
              {loading && cards.length === 0
                ? Array.from({ length: 6 }).map((_, i) => (
                    <li key={i} className="h-96 bg-white dark:bg-gray-800 rounded-2xl animate-pulse" />
                  ))
                : cards.map(({ id, ...card }) => (
                    <li key={id}>
                      <ServicesItem {...card} headingLevel={2} />
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default ServicesHubPage;
