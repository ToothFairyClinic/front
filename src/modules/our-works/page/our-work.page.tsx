import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';
import { OurWorkList } from "../components/our-work-list/our-work-list.components";
import { MainTitle } from "@app/common/components/main-title/main-title.component";

export const OurWorkPage: FC = () => {
  const { t } = useTranslation();

  return (
    <main className="bg-palePeach dark:bg-darkGray min-h-screen">
      <Helmet>
        <title>{t("Наші роботи | Результати лікування Зубна Фея")}</title>
        <meta
          name="description"
          content={t("Перегляньте результати роботи наших стоматологів: реставрації, протезування, відбілювання та вирівнювання зубів. Реальні кейси пацієнтів клініки Зубна Фея.")}
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