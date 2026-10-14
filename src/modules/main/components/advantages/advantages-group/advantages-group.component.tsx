import { FC } from "react";
import { AdvantageItem } from "../advantages-item/advantages-item.component";
import { SectionHeading } from "../../section-heading/section-heading.component";
import { HomeAdvantage } from "../../../graphql/home-page";

interface AdvantagesGroupProps {
  title?: string;
  items?: HomeAdvantage[];
  isLoading?: boolean;
}

export const AdvantagesGroup: FC<AdvantagesGroupProps> = ({ title, items = [], isLoading }) => {
  if (!isLoading && (!title || items.length === 0)) return null;

  return (
    <section aria-labelledby="advantages-title" className="px-4 md:px-10 py-8 md:py-12 dark:bg-darkGray">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8 md:gap-10">
        <SectionHeading id="advantages-title" title={title} />

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 list-none p-0">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="h-64 bg-paleOlive/40 dark:bg-gray-800 rounded-[2rem] animate-pulse" />
              ))
            : items.map((item, index) => (
                <li key={`${index}-${item.title}`} className="flex">
                  <AdvantageItem title={item.title} description={item.description} index={index + 1} />
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
};
