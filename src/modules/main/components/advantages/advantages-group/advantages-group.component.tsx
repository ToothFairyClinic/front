import { FC } from "react";
import { AdvantageItem } from "../advantages-item/advantages-item.component";
import { useGetAdvantagesQuery } from "@app/core/types";
import { MainTitle } from "@app/common/components/main-title/main-title.component";

interface AdvantagesGroupProps {}

export const AdvantagesGroup: FC<AdvantagesGroupProps> = ({}) => {
  const { data } = useGetAdvantagesQuery();

  return (
    <div className="py-12 flex flex-col items-center gap-16 dark:bg-darkGray transition  delay-150">
      <div className=" w-full">
        <MainTitle>Наші переваги</MainTitle>
      </div>
      <div className="flex justify-center flex-wrap gap-10">
        {data?.advantages.map((item, index) => (
          <AdvantageItem
            title={item.title}
            index={++index}
            key={`${item.id}`}
          />
        ))}
      </div>
    </div>
  );
};
