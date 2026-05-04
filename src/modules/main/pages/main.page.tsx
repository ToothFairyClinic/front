import { FC } from "react";
import { Slide } from "../components/slide/slide.component";
import { AdvantagesGroup } from "../components/advantages/advantages-group/advantages-group.component";
import { SerivcesList } from "../components/services-main/services-main-list/services-main-list.component";
import { useGetPageMetadataQuery, useGetServicesQuery } from "@app/core/types";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { PersonnelList } from "../components/personnel/personnel-list/personnel-list.component";
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';



interface MainPageProps { }

export const MainPage: FC<MainPageProps> = ({ }) => {
  const { data, loading, error } = useGetServicesQuery();

  const { data: PageMetadata } = useGetPageMetadataQuery({ variables: { route: '/' } });
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const pageMeta = PageMetadata?.page_metadata[0];

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

  if (error) {
    return (
      <ShowInfo type="error">
        <p>{t("Упс, сталася помилка")}</p>
        <p>{t("Спробуйте трохи пізніше")}</p>
      </ShowInfo>
    );
  }

  if (loading) {
    return (
      <ShowInfo type="info">
        <p>{t("Завантаження...")} </p>
      </ShowInfo>
    );
  }

  if (!data) {
    return (
      <ShowInfo type="info">
        <p>{t("Нажаль тут пусто")} </p>
      </ShowInfo>
    );
  }

  const sortedServices = [...data.services].sort((a, b) => {
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  return (
    <main className="">
      <Helmet>

        <title>{currentTitle || "Стоматологія Зубна Фея — професійне лікування зубів у Білій Церкві"}</title>
        <meta
          name="description"
          content={currentDescription || "Сучасна стоматологічна клініка Зубна Фея: дитяча стоматологія, імплантація, терапія та професійна гігієна. Забезпечуємо здорову посмішку для всієї родини."}
        />
      </Helmet>

      <Slide />
      <AdvantagesGroup />
      <SerivcesList items={sortedServices} />
      <PersonnelList />
    </main>
  );
};