import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';
import { OurWorkList } from "../components/our-work-list/our-work-list.components";
import { MainTitle } from "@app/common/components/main-title/main-title.component";
import { useGetPageMetadataQuery } from "@app/core/types";

export const OurWorkPage: FC = () => {
  const { t } = useTranslation();
  const { data } = useGetPageMetadataQuery({ variables: { route: '/works' } });
  const meta = data?.page_metadata[0]


  return (
    <main className="bg-palePeach dark:bg-darkGray min-h-screen">
      <Helmet>
        <title>{meta?.seo_title || "Наші роботи | Зубна Фея"}</title>
        <meta
          name="description"
          content={meta?.seo_description || "Перегляньте результати роботи наших стоматологів: реставрації, протезування, відбілювання та вирівнювання зубів. Реальні кейси пацієнтів клініки Зубна Фея."}
        />
      </Helmet>

      <section className="px-9 pt-15 pb-24">
        <div className="">
          <MainTitle as="h1" size="base">
            {t("Наші роботи")}
          </MainTitle>
        </div>

        <article>
          <h2 className="sr-only">{t("Галерея результатів лікування до та після")}</h2>
          <OurWorkList />
        </article>
      </section>
    </main>
  );
};