import { FC } from "react";
import {
  useGetPageMetadataQuery,
  useGetPriceListCategoriesQuery,
  useGetPriceListQuery,
} from "@app/core/types";
import { PriceListTabel } from "../components/price-list-tabel/price-list-tabel.component";
import { PriceListSelect } from "../components/price-list-selector/price-list-selector.component";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { useTranslation } from 'react-i18next';
import { MainTitle } from "@app/common/components/main-title/main-title.component";
import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";

interface PriceListPageProps { }

export const PriceListPage: FC<PriceListPageProps> = () => {
  const { data, loading: loadingCategories } = useGetPriceListCategoriesQuery();
  const {
    data: dataPriceList,
    loading: loadingPriceList,
    error
  } = useGetPriceListQuery();

  const { data: PageMetadata } = useGetPageMetadataQuery({ variables: { route: '/price-list' } });
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const pageMeta = PageMetadata?.page_metadata[0];
  const currentTitle = isEn ? pageMeta?.seo_title_en : pageMeta?.seo_title;
  const currentDescription = isEn ? pageMeta?.seo_description_en : pageMeta?.seo_description;

  const priceSchema = {
    "@type": "OfferCatalog",
    "name": isEn ? "Price List of Dental Services" : "Прайс-лист стоматологічних послуг",
    "itemListElement": dataPriceList?.price_list_categories?.map((category) => ({
      "@type": "OfferCatalog",
      "name": isEn ? (category.title_en || category.title) : category.title,
      "itemListElement": category.price_list_items?.map((item: any) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": isEn ? (item.title_en || item.title) : item.title
        },
        "price": item.price,
        "priceCurrency": "UAH",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@id": "https://toothfairy.clinic/#organization"
        }
      }))
    }))
  };

  if (error) return <ShowInfo type="error"><p>{t("Упс, сталася помилка")}</p></ShowInfo>;
  if (loadingCategories || loadingPriceList) return <ShowInfo type="info"><p>{t("Завантаження...")}</p></ShowInfo>;

  return (
    <main className="px-9 pt-15 pb-24 bg-palePeach dark:bg-darkGray  min-h-screen">
      <SEOMeta
        title={currentTitle || t("Ціни на послуги стоматології | Зубна Фея Біла Церква")}
        description={currentDescription || t("Актуальний прайс-лист стоматологічної клініки Зубна Фея...")}
        path="/price-list"
        schemaData={priceSchema}
      />

      <div className="mb-10">
        <MainTitle size="base" as="h1">{t("Прайс-лист послуг")}</MainTitle>
      </div>

      <div className="pb-12">
        {data && <PriceListSelect data={data} />}
      </div>

      {dataPriceList && !loadingPriceList ? (
        <article>
          <h2 className="sr-only">{t("Таблиця цін за категоріями")}</h2>
          <PriceListTabel data={dataPriceList} />
        </article>
      ) : (
        <ShowInfo type="info">
          <p>{t("На жаль, прайс-лист порожній")}</p>
        </ShowInfo>
      )}
    </main>
  );
};

export default PriceListPage;