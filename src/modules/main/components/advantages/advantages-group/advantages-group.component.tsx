import { FC } from "react";
import { AdvantageItem } from "../advantages-item/advantages-item.component";
import { useGetAdvantagesQuery } from "@app/core/types";
import { MainTitle } from "@app/common/components/main-title/main-title.component";
import { useTranslation } from 'react-i18next';

interface AdvantagesGroupProps { }

export const AdvantagesGroup: FC<AdvantagesGroupProps> = () => {
  const { data, loading } = useGetAdvantagesQuery();
  const { t } = useTranslation();

  return (
    <section className="py-12 flex flex-col items-center gap-16 dark:bg-darkGray min-h-[500px]">
      <div className="w-full">
        <MainTitle>{t("Наші переваги")}</MainTitle>
      </div>

      <ul className="flex justify-center flex-wrap gap-10 list-none p-0 w-full">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="w-72 h-48 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
          ))
        ) : (
          data?.advantages.map((item, index) => (
            <li key={item.id}>
              <AdvantageItem
                title={item.title}
                index={index + 1}
              />
            </li>
          ))
        )}
      </ul>
    </section>
  );
};