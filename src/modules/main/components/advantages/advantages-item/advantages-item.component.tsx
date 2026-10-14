import { FC } from "react";

interface AdvantageItemProps {
  title: string;
  description?: string;
  index: number;
}

export const AdvantageItem: FC<AdvantageItemProps> = ({ title, description, index }) => {
  const formattedIndex = String(index).padStart(2, "0");

  return (
    <article className="w-full flex flex-col gap-3 rounded-[2rem] bg-paleOlive/80 dark:bg-white/10 px-7 py-8 md:px-9 md:py-9 text-darkGray dark:text-white">
      <span className="text-xl font-light opacity-80" aria-hidden="true">
        {formattedIndex}
      </span>
      <h3 className="text-xl md:text-2xl font-bold leading-snug">{title}</h3>
      {description && <p className="text-lg leading-relaxed opacity-80">{description}</p>}
    </article>
  );
};
