import { FC } from "react";
import { useTranslation } from 'react-i18next';

interface AdvantageItemProps {
  title: string;
  index: number;
}

export const AdvantageItem: FC<AdvantageItemProps> = ({
  title,

  index,
}) => {
  const formattedIndex = index < 10 ? `0${index}` : index;
  const { t } = useTranslation();

  return (
    <div className="flex items-center lg:items-start gap-4 w-full lg:w-105 flex-col lg:flex-row transition delay-150">

      <div className="flex items-center lg:flex-row flex-col" aria-hidden="true">
        <span className="text-4xl text-white bg-darkGray rounded-full py-2 px-2 mr-1 dark:text-darkGray dark:bg-paleOlive">
          {formattedIndex}
        </span>
        <div className="lg:h-px lg:w-8 h-8 w-px bg-black dark:bg-white" />
      </div>

      <div className="flex flex-col gap-2 text-center lg:text-left dark:text-white">

        <h3 className="text-3xl font-normal">
          {t(title)}
        </h3>
      </div>
    </div>
  );
};
