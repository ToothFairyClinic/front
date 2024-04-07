import { MainTitle } from "@app/common/components/main-title/main-title.component";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { useGetOurWorkQuery } from "@app/core/types";
import { FC } from "react";
import { OurWorkItem } from "../our-work-item/our-work-item.component";

interface OurWorkListProps {}

export const OurWorkList: FC<OurWorkListProps> = ({}) => {
  const { data, loading, error } = useGetOurWorkQuery();

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

  return (
    <div className="dark:bg-darkGray py-28 flex flex-col gap-10">
      <MainTitle>Наші роботи</MainTitle>
      <div className="flex gap-19 flex-wrap lg:px-32 ">
        {data.our_works.map((item) => (
          <OurWorkItem {...item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
