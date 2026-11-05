import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AdvancedImage } from "@cloudinary/react";
import { useGetPageMetadataQuery } from "@app/core/types";
import { Link } from "@app/common/router/router";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";
import { Breadcrumbs, buildBreadcrumbSchema, Crumb } from "@app/common/components/breadcrumbs/breadcrumbs.component";
import { ConsultationModal } from "@app/common/components/consultation-modal/lazy-consultation-modal";
import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { formatPrice } from "@app/common/utils/price-format";
import { Mascot } from "@app/modules/main/components/mascot/mascot.component";
import { PricePageCategory, PricePageService, useGetPricePageQuery } from "../graphql/price-page";

const BASE_URL = "https://toothfairy.clinic";

const COPY = {
  ua: {
    h1: "Прайс-лист послуг",
    title: "Ціни стоматології у Білій Церкві | Зубна Фея",
    description:
      "Прайс стоматології Зубна Фея у Білій Церкві: актуальні ціни на лікування, профілактику, естетичну стоматологію та інші послуги.",
    lead:
      "Ціни на лікування дітей і дорослих в одному місці: терапія, хірургія, ортодонтія, протезування та імплантація. Точну вартість лікар назве після огляду, коли складе план лікування.",
    nav: "Розділи прайсу",
    note: "Ціни вказані в гривнях. Остаточну вартість лікар визначає після огляду і знімків.",
    phone: "Зателефонувати",
  },
  en: {
    h1: "Price list of services",
    title: "Dental Prices in Bila Tserkva | Tooth Fairy",
    description:
      "Tooth Fairy dental clinic prices in Bila Tserkva: treatment, prevention, cosmetic dentistry and other services.",
    lead:
      "Prices for children's and adult treatment in one place: general dentistry, oral surgery, orthodontics, prosthodontics and implants. The dentist gives the exact cost after an examination, once the treatment plan is ready.",
    nav: "Price list sections",
    note: "Prices are in Ukrainian hryvnias. The final cost is set by the dentist after an examination and X-rays.",
    phone: "Call us",
  },
};

interface CategoryConfig {
  anchor: string;
  serviceSlug: string;
  title?: { ua: string; en: string };
  text: { ua: string; en: string };
}

/** Порядок розділів, сторінка послуги для картки і короткий опис. Ключ - id категорії в адмінці. */
const CATEGORIES: Record<string, CategoryConfig> = {
  "a245e71d-01de-451c-9fd4-9cbcdb5eec4b": {
    anchor: "terapiya",
    serviceSlug: "terapevtychna-stomatologiya",
    title: { ua: "Терапія", en: "General dentistry" },
    text: {
      ua: "Лікування карієсу, реставрація зубів, професійна гігієна і лікування каналів постійних зубів.",
      en: "Cavity treatment, tooth restoration, professional cleaning and root canal treatment of permanent teeth.",
    },
  },
  "85733e3e-5c88-4755-a158-493f59bf0c0c": {
    anchor: "dytyacha",
    serviceSlug: "dytyacha-stomatologiya",
    title: { ua: "Дитяча стоматологія", en: "Pediatric dentistry" },
    text: {
      ua: "Лікування молочних зубів, гігієна, коронки дітям, седація закисом азоту і лікування під наркозом.",
      en: "Baby tooth treatment, cleaning, crowns for children, nitrous oxide sedation and treatment under general anaesthesia.",
    },
  },
  "18df1969-362b-4087-bec9-1cbed0324e40": {
    anchor: "khirurhiya",
    serviceSlug: "vydalennya-zubiv",
    title: { ua: "Хірургія", en: "Oral surgery" },
    text: {
      ua: "Видалення постійних зубів і зубів мудрості. Знеболення оплачується окремо.",
      en: "Extraction of permanent and wisdom teeth. Local anaesthesia is charged separately.",
    },
  },
  "0279e7c3-8ba0-4aa1-8faa-7d053a85b4fd": {
    anchor: "ortodontiya",
    serviceSlug: "vypravlennya-prikusu",
    text: {
      ua: "Металеві, керамічні та самолігуючі брекети, апарат для розширення щелепи і консультація ортодонта.",
      en: "Metal, ceramic and self-ligating braces, a palatal expander and an orthodontist consultation.",
    },
  },
  "88ae8732-9b37-4ed2-92b3-130f0610a653": {
    anchor: "ortopediya",
    serviceSlug: "protezuvannya-zubiv",
    title: { ua: "Ортопедія", en: "Prosthodontics" },
    text: {
      ua: "Керамічні та метало-керамічні коронки, керамічні вініри і накладки.",
      en: "Ceramic and metal-ceramic crowns, ceramic veneers and onlays.",
    },
  },
  "a415850a-9c20-4a18-a59b-d4ab445bb6a2": {
    anchor: "implantatsiya",
    serviceSlug: "implantaciya-zubiv",
    title: { ua: "Імплантація", en: "Dental implants" },
    text: {
      ua: "Встановлення імпланту. Точну вартість лікар назве після огляду і КТ.",
      en: "Dental implant placement. The dentist gives the exact cost after an examination and a CT scan.",
    },
  },
  "49bb2a49-d657-4de0-ba0d-eabcc4f0cb39": {
    anchor: "inshi",
    serviceSlug: "konsultaciya-stomatologa",
    title: { ua: "Консультації та інші послуги", en: "Consultations and other services" },
    text: {
      ua: "Консультації, профілактичний огляд, прицільний знімок, відбілювання, седація і наркоз.",
      en: "Consultations, routine check-ups, periapical X-rays, whitening, sedation and general anaesthesia.",
    },
  },
};

const ORDER = Object.keys(CATEGORIES);

/** Числа з ціни для розмітки: "13 700 - 24 700" -> [13700, 24700]; у "год / 4200" - лише сума після "/". */
const priceNumbers = (price?: string | null) => {
  if (!price) return [];
  const value = /год|хв/i.test(price) ? price.split("/").pop() || "" : price;
  return (value.replace(/(\d)\s+(?=\d{3}\b)/g, "$1").match(/\d+/g) || []).map(Number);
};

const offerPrice = (price?: string | null) => {
  const numbers = priceNumbers(price);
  if (numbers.length === 0) return {};
  if (numbers.length === 1 && !/від|from/i.test(price || "")) return { price: numbers[0], priceCurrency: "UAH" };
  return {
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "UAH",
      minPrice: numbers[0],
      ...(numbers.length > 1 ? { maxPrice: numbers[numbers.length - 1] } : {}),
    },
  };
};

const IMAGE_TRANSFORMATIONS = ["c_fill", "g_auto", "w_760", "h_570", "f_auto", "q_auto"];

interface PriceCategoryProps {
  category: PricePageCategory;
  config: CategoryConfig;
  service?: PricePageService;
  isEn: boolean;
}

const PriceCategory: FC<PriceCategoryProps> = ({ category, config, service, isEn }) => {
  const { t } = useTranslation();
  const lang = isEn ? "en" : "ua";
  const imageCld = useCloudinaryImage(service?.mainImage || "", IMAGE_TRANSFORMATIONS);
  const title = config.title?.[lang] || (isEn ? category.title_en : category.title) || category.title;
  const serviceName = service ? (isEn ? service.name_en : service.name) || service.name : "";
  const serviceSlug = service ? (isEn ? service.slug_en : service.slug) : null;
  const titleId = `${config.anchor}-title`;
  // у короткому розділі картка стоїть над таблицею, щоб поруч не лишалось порожнього місця
  const isShort = category.price_list_items.length <= 5;

  return (
    <section
      id={config.anchor}
      aria-labelledby={titleId}
      className={
        isShort
          ? "flex flex-col gap-5 scroll-mt-28"
          : "grid grid-cols-1 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] gap-5 lg:gap-10 items-start scroll-mt-28"
      }
    >
      <div
        className={`flex flex-col overflow-hidden rounded-2xl bg-white border border-black/5 ${isShort ? "md:flex-row md:items-center" : "lg:sticky lg:top-24"}`}
      >
        {service?.mainImage && (
          <div className={`aspect-[16/9] overflow-hidden bg-paleOlive/40 ${isShort ? "md:w-72 lg:w-80 md:aspect-[4/3] shrink-0" : "lg:aspect-[4/3]"}`}>
            <AdvancedImage
              cldImg={imageCld}
              alt={(isEn ? service.image_alt_en : service.image_alt) || serviceName}
              loading="lazy"
              width={760}
              height={570}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className={`flex flex-col gap-3 p-5 md:p-6 ${isShort ? "md:px-8 max-w-3xl" : ""}`}>
          <h2 id={titleId} className="text-2xl md:text-3xl font-normal leading-tight text-darkGray">
            {title}
          </h2>
          <p className="text-base leading-relaxed text-darkGray/80">{config.text[lang]}</p>
          {serviceSlug && (
            <Link
              to={`/${lang}/services/${serviceSlug}`}
              className="group inline-flex items-center gap-2 self-start pt-1 text-base font-semibold text-darkGray underline decoration-paleOlive decoration-2 underline-offset-4 hover:decoration-darkGray transition-colors duration-150"
            >
              {serviceName}
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m-6-6 6 6-6 6" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-paleOlive bg-white">
        <table className="w-full text-left text-darkGray">
          <caption className="sr-only">{`${t("Ціни")}: ${title}`}</caption>
          <thead className="bg-paleOlive/70">
            <tr>
              <th scope="col" className="px-4 md:px-6 py-3 text-base font-semibold">
                {t("Послуга")}
              </th>
              <th scope="col" className="px-4 md:px-6 py-3 text-base font-semibold text-right whitespace-nowrap">
                {t("Вартість")}
              </th>
            </tr>
          </thead>
          <tbody>
            {category.price_list_items.map((item) => (
              <tr key={item.id} className="border-t border-paleOlive/70 even:bg-palePeach/60">
                <td className="px-4 md:px-6 py-3 md:py-4 text-base md:text-lg [overflow-wrap:anywhere]">
                  {(isEn ? item.title_en : item.title)?.trim() || item.title.trim()}
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4 text-base md:text-lg font-semibold text-right tabular-nums whitespace-nowrap">
                  {formatPrice(item.price, isEn)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

/** /price-list: усі розділи прайсу на одній сторінці, як у референсі. Зверху терапія, далі за ORDER. */
export const PriceListPage: FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const lang = isEn ? "en" : "ua";
  const copy = COPY[lang];
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const { data, loading, error } = useGetPricePageQuery();
  const { data: metaData } = useGetPageMetadataQuery({ variables: { route: "/price-list" } });
  const meta = metaData?.page_metadata[0];

  const h1 = (isEn ? meta?.h1_en : meta?.h1) || copy.h1;
  const title = (isEn ? meta?.seo_title_en : meta?.seo_title) || copy.title;
  const description = (isEn ? meta?.seo_description_en : meta?.seo_description) || copy.description;

  const sections = useMemo(() => {
    const services = new Map((data?.services ?? []).map((service) => [service.slug, service]));
    return [...(data?.price_list_categories ?? [])]
      .filter((category) => category.price_list_items.length > 0)
      .sort((a, b) => {
        const ia = ORDER.indexOf(a.id);
        const ib = ORDER.indexOf(b.id);
        return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib);
      })
      .map((category) => {
        const config: CategoryConfig = CATEGORIES[category.id] ?? {
          anchor: `category-${category.id.slice(0, 8)}`,
          serviceSlug: "",
          text: { ua: "", en: "" },
        };
        return { category, config, service: services.get(config.serviceSlug) };
      });
  }, [data]);

  const crumbs: Crumb[] = [
    { label: t("Головна"), to: `/${lang}` },
    { label: h1 },
  ];

  const schema = useMemo(() => {
    const catalog = {
      "@type": "OfferCatalog",
      "@id": `${BASE_URL}/${lang}/price-list/#catalog`,
      name: h1,
      itemListElement: sections.map(({ category, config }) => ({
        "@type": "OfferCatalog",
        name: config.title?.[lang] || (isEn ? category.title_en : category.title) || category.title,
        itemListElement: category.price_list_items.map((item) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: ((isEn ? item.title_en : item.title) || item.title).trim() },
          ...offerPrice(item.price),
          availability: "https://schema.org/InStock",
          seller: { "@id": `${BASE_URL}/#organization` },
        })),
      })),
    };
    return [catalog, buildBreadcrumbSchema(crumbs, BASE_URL, `${BASE_URL}/${lang}/price-list/#breadcrumb`)];
    // crumbs залежать лише від h1 і мови
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections, isEn, lang, h1]);

  if (error) return <ShowInfo type="error"><p>{t("Упс, сталася помилка")}</p></ShowInfo>;
  if (loading && sections.length === 0) return <ShowInfo type="info"><p>{t("Завантаження...")}</p></ShowInfo>;

  return (
    <>
      <SEOMeta title={title} description={description} path="/price-list" schemaData={schema} hasBreadcrumbs={false} />

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
                  href="tel:+380681689911"
                  className="inline-flex items-center justify-center font-semibold text-base sm:text-lg px-8 py-3 rounded-full border-2 border-darkGray text-darkGray hover:bg-darkGray hover:text-white transition-colors duration-150 active:scale-[0.98]"
                >
                  +38 (068) 168-99-11
                </a>
              </div>
              <nav aria-label={copy.nav} className="pt-2">
                <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none p-0 text-base md:text-lg">
                  {sections.map(({ category, config }) => (
                    <li key={category.id}>
                      <a
                        href={`#${config.anchor}`}
                        className="text-darkGray underline decoration-darkGray/30 decoration-2 underline-offset-4 hover:decoration-darkGray transition-colors duration-150"
                      >
                        {config.title?.[lang] || (isEn ? category.title_en : category.title) || category.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <Mascot pose="question" height={190} className="right-6 bottom-0" />
            </section>

            {sections.length > 0 ? (
              <div className="flex flex-col gap-10 md:gap-14">
                {sections.map(({ category, config, service }) => (
                  <PriceCategory key={category.id} category={category} config={config} service={service} isEn={isEn} />
                ))}
              </div>
            ) : (
              <ShowInfo type="info"><p>{t("На жаль, прайс-лист порожній")}</p></ShowInfo>
            )}

            <p className="text-base md:text-lg text-darkGray/80 max-w-4xl">{copy.note}</p>
          </div>
        </div>
        <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
      </main>
    </>
  );
};

export default PriceListPage;
