import { FC } from "react";
import { AdvantageItem } from "../advantages-item/advantages-item.component";
import { useGetAdvantagesQuery } from "@app/core/types";
import { MainTitle } from "@app/common/components/main-title/main-title.component";

interface AdvantagesGroupProps { }

export const AdvantagesGroup: FC<AdvantagesGroupProps> = ({ }) => {
  const { data } = useGetAdvantagesQuery();

  return (
    <section className="py-12 flex flex-col items-center gap-16 dark:bg-darkGray transition  delay-150">
      <div className=" w-full">
        <MainTitle>Наші переваги</MainTitle>
      </div>
      <ul className="flex justify-center flex-wrap gap-10 list-none p-0">
        {data?.advantages.map((item, index) => (
          <li key={item.id}>
            <AdvantageItem
              title={item.title}
              index={index + 1}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
