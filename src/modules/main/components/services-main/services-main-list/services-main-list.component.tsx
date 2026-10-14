import { GetServicesQuery } from "@app/core/types";
import { FC, useMemo } from "react";
import { ServiceCardLink, ServicesItem } from "../services-main-item/services-main-item.component";
import { SectionHeading } from "../../section-heading/section-heading.component";
import { HomeService, HomeServiceRef } from "../../../graphql/home-page";
import { Mascot, MASCOT_LINES } from "../../mascot/mascot.component";

export type ServicesListItem = GetServicesQuery['services'][number];

interface ServicesListProps {
  title?: string;
  intro?: string;
  items?: HomeService[];
  services?: HomeServiceRef[];
  isEn: boolean;
  isLoading?: boolean;
}

export const SerivcesList: FC<ServicesListProps> = ({ title, intro, items = [], services = [], isEn, isLoading }) => {
  const lang = isEn ? "en" : "ua";

  const cards = useMemo(() => {
    const byId = new Map(services.map((service) => [service.id, service]));
    const pathOf = (service: HomeServiceRef) => {
      const slug = isEn ? service.slug_en : service.slug;
      return slug ? `/${lang}/services/${slug}` : null;
    };

    return items.flatMap((item) => {
      const service = byId.get(item.service_id);
      const to = service && pathOf(service);
      const cardTitle = isEn ? item.title_en : item.title;
      if (!service || !to || !cardTitle) return [];

      const links: ServiceCardLink[] = (item.links || []).flatMap((link) => {
        const target = byId.get(link.service_id);
        const linkTo = target && pathOf(target);
        const label = isEn ? link.label_en : link.label;
        return linkTo && label ? [{ label, to: linkTo }] : [];
      });

      return [{
        key: item.service_id,
        title: cardTitle,
        description: isEn ? item.description_en : item.description,
        to,
        image: service.mainImage,
        imageAlt: (isEn ? service.image_alt_en : service.image_alt) || cardTitle,
        links,
      }];
    });
  }, [items, services, isEn, lang]);

  if (!isLoading && cards.length === 0) return null;

  return (
    <section id="services" aria-labelledby="services-title" className="px-4 md:px-10 py-8 md:py-12 scroll-mt-24 dark:bg-darkGray">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8 md:gap-10">
        <SectionHeading id="services-title" title={title} intro={intro} />

        <div className="relative">
        {!isLoading && <Mascot pose="lying" height={155} className="right-12" style={{ top: -Math.round(MASCOT_LINES.lyingShelfY * 155) }} />}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 list-none p-0">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="h-96 bg-white dark:bg-gray-800 rounded-2xl animate-pulse" />
              ))
            : cards.map(({ key, ...card }) => (
                <li key={key}>
                  <ServicesItem {...card} />
                </li>
              ))}
        </ul>
        </div>
      </div>
    </section>
  );
};
