import { FC } from "react";
import {
  useGetPageMetadataQuery,
  useGetPriceListCategoriesQuery,
  useGetPriceListQuery,
} from "@app/core/types";
import { PriceListTabel } from "../components/price-list-tabel/price-list-tabel.component";
import { PriceListSelect } from "../components/price-list-selector/price-list-selector.component";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';
import { MainTitle } from "@app/common/components/main-title/main-title.component";

interface PriceListPageProps { }

export const PriceListPage: FC<PriceListPageProps> = () => {
  const { t } = useTranslation();
  const { data, loading: loadingCategories } = useGetPriceListCategoriesQuery();
  const {
    data: dataPriceList,
    loading: loadingPriceList,
    error
  } = useGetPriceListQuery();


  const { data: PageMetadata } = useGetPageMetadataQuery({ variables: { route: '/prices' } });
  const meta = PageMetadata?.page_metadata[0];

  if (error) {
    return (
      <ShowInfo type="error">
        <p>{t("Упс, сталася помилка")}</p>
        <p>{t("Спробуйте трохи пізніше")}</p>
      </ShowInfo>
    );
  }

  if (loadingCategories || loadingPriceList) {
    return (
      <ShowInfo type="info">
        <p>{t("Завантаження...")}</p>
      </ShowInfo>
    );
  }

  return (
    <main className="px-9 pt-15 pb-24 bg-palePeach dark:bg-darkGray ">
      <Helmet>

        <title>{meta?.seo_title || "Ціни на послуги стоматології | Зубна Фея Біла Церква"}</title>
        <meta
          name="description"
          content={meta?.seo_description || "Актуальний прайс-лист стоматологічної клініки Зубна Фея. Прозорі ціни на лікування, імплантацію, дитячу стоматологію та рентген-діагностику."}
        />
      </Helmet>

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