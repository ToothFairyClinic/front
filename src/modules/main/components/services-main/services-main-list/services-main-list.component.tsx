import { Services } from "@app/core/types";
import { FC, useRef } from "react";
import { ServicesItem } from "../services-main-item/services-main-item.component";
import { MainTitle } from "@app/common/components/main-title/main-title.component";
import { useTranslation } from 'react-i18next';

interface ServicesListProps {
  items: Services[];
  title?: string;
}

export const SerivcesList: FC<ServicesListProps> = ({ items }) => {
  const servicesRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  return (
    <section
      ref={servicesRef}
      id="services"
      aria-labelledby="services-title"
      className="py-7 flex flex-col gap-19 bg-[url('@app/assets/images/servicesImage.avif')] bg-no-repeat bg-cover bg-center relative min-h-[600px]"
    >
      <div id="services-title" className="relative z-10">
        <h2 className="text-white text-6xl border-b border-paleOlive px-10 py-3 w-140">
          {t("Наші Послуги")}
        </h2>
      </div>

      <div className="z-10 container mx-auto">
        <ul className="flex flex-wrap gap-11 justify-center px-4 lg:px-32">
          {items.map(({ image, ...service }) => (
            <li key={`services-${service.id}`} className="list-none">
              <ServicesItem
                image={`${image}`}
                {...service}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-black/50 absolute inset-0 z-0" aria-hidden="true"></div>
    </section >
  );
};
