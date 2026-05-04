import { FC } from "react";
import { Slide } from "../components/slide/slide.component";
import { AdvantagesGroup } from "../components/advantages/advantages-group/advantages-group.component";
import { SerivcesList } from "../components/services-main/services-main-list/services-main-list.component";
import { useGetPageMetadataQuery, useGetServicesQuery } from "@app/core/types";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { PersonnelList } from "../components/personnel/personnel-list/personnel-list.component";
import { Helmet } from "react-helmet-async";

interface MainPageProps { }

export const MainPage: FC<MainPageProps> = ({ }) => {
  const { data, loading, error } = useGetServicesQuery();

  const { data: PageMetadata } = useGetPageMetadataQuery({ variables: { route: '/' } });
  const meta = PageMetadata?.page_metadata[0];

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
        <p>Упс, сталася помилка</p>
        <p>Спробуйте трохи пізніше</p>
      </ShowInfo>
    );
  }

  if (loading) {
    return (
      <ShowInfo type="info">
        <p>Завантаження...</p>
      </ShowInfo>
    );
  }

  if (!data) {
    return (
      <ShowInfo type="info">
        <p>Нажаль тут пусто</p>
      </ShowInfo>
    );
  }

  const sortedServices = [...data.services].sort((a, b) => {
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  return (
    <main className="">
      <Helmet>

        <title>{meta?.seo_title || "Стоматологія Зубна Фея — професійне лікування зубів у Білій Церкві"}</title>
        <meta
          name="description"
          content={meta?.seo_description || "Сучасна стоматологічна клініка Зубна Фея: дитяча стоматологія, імплантація, терапія та професійна гігієна. Забезпечуємо здорову посмішку для всієї родини."}
        />
      </Helmet>

      <Slide />
      <AdvantagesGroup />
      <SerivcesList items={sortedServices} />
      <PersonnelList />
    </main>
  );
};