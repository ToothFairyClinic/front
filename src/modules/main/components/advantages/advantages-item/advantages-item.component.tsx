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
  const { t } = useTranslation();

  return (
    <div className="flex items-center lg:items-start gap-4 w-full lg:w-105 flex-col lg:flex-row transition  delay-150">
      <div className="flex items-center  lg:flex-row flex-col">
        <span className="text-4xl text-white bg-darkGray rounded-full py-2 px-2 mr-1 dark:text-darkGray dark:bg-paleOlive">{`0${index}`}</span>
        <div className=" lg:h-px lg:w-8 h-8 w-px  bg-black dark:bg-white" />
      </div>
      <div className="flex flex-col gap-2 text-center lg:text-left dark:text-white">
        <p className="text-3xl">{t(`${title}`)}</p>
      </div>
    </div>
  );
};
