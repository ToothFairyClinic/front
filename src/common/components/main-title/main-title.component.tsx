import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import { useTranslation } from 'react-i18next';

enum TitleSize {
  sm = "sm",
  base = "base",
  md = "md",
}

interface MainTitleProps {
  darkken?: boolean;
  size?: keyof typeof TitleSize;
  as?: 'h1' | 'h2' | 'h3';
}

export const MainTitle: FC<MainTitleProps & PropsWithChildren> = ({
  children,
  darkken,
  size = TitleSize.base,
  as: Component = 'h2'
}) => {
  const { t } = useTranslation();
  const titleClasses = clsx(
    "text-6xl  border-b border-paleOlive px-10  py-3 z-10 text-darkGray dark:text-white",
    {
      "text-white": darkken,
      "lg:w-165": size === TitleSize.md,
      "lg:w-140": size === TitleSize.base,
      "lg:w-120": size === TitleSize.sm,
    }
  );
  return <Component className={titleClasses}>{t(`${children}`)}</Component>;
};
