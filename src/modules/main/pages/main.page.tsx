import { FC } from "react";
import { Slide } from "../components/slide/slide.component";
import { AdvantagesGroup } from "../components/advantages/advantages-group/advantages-group.component";
import { SerivcesList } from "../components/services-main/services-main-list/services-main-list.component";
import { useGetServicesQuery } from "@app/core/types";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { PersonnelList } from "../components/personnel/personnel-list/personnel-list.component";

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = ({}) => {
  const { data, loading, error } = useGetServicesQuery();

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
    "Кабінет компёютерної томографії, ТРГ, ОПТГ"
  ];
  
  if (error) {
    return (
      <ShowInfo type="error">
        <p>Упс, спалася помилка</p>
        <p>Спробуйте трохи пізніше</p>
      </ShowInfo>
    );
  }

  if (loading) {
    return (
      <ShowInfo type="info">
        <p>loading</p>
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

    // Сортування даних відповідно до заданого порядку
    const sortedServices = data.services.sort((a, b) => {
      return order.indexOf(a.name) - order.indexOf(b.name);
    });

  return (
    <div className="">
      <Slide />
      <AdvantagesGroup />
      <SerivcesList items={sortedServices} />
      <PersonnelList />
    </div>
  );
};
