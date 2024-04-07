import { Services } from "@app/core/types";
import { FC, useRef } from "react";
import { ServicesItem } from "../services-main-item/services-main-item.component";
import { MainTitle } from "@app/common/components/main-title/main-title.component";

interface ServicesListProps {
  items: Services[];
  title?: string;
}

export const SerivcesList: FC<ServicesListProps> = ({ items }) => {
  const servicesRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={servicesRef}
      id="services"
      className=" py-7 flex flex-col gap-19  bg-[url('@app/assets/images/servicesImage.jpg')] bg-no-repeat bg-cover bg-center relative"
    >
      <MainTitle darkken={true}>Наші послуги</MainTitle>

      <div className="z-10">
        <div className="flex flex-wrap gap-11 justify-center  px-32">
          {items.map(({ image, ...services }) => (
            <ServicesItem
              image={`${image}`}
              {...services}
              key={`services-${services.id}`}
            />
          ))}
        </div>
      </div>
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
    </div>
  );
};
