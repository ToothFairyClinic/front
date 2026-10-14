import { FC } from "react";
import { Link } from "@app/common/router/router";
import { AdvancedImage } from "@cloudinary/react";
import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { SectionHeading } from "@app/modules/main/components/section-heading/section-heading.component";
import { SubService } from "../graphql/service-extras";

const IMAGE_TRANSFORMATIONS = ["c_fill", "g_auto", "w_560", "h_320", "f_auto", "q_auto"];

const SubServiceCard: FC<{ service: SubService; isEn: boolean }> = ({ service, isEn }) => {
  const imageCld = useCloudinaryImage(service.mainImage || "", IMAGE_TRANSFORMATIONS);
  const name = (isEn ? service.name_en : service.name) || service.name;
  const slug = isEn ? service.slug_en : service.slug;
  if (!slug) return null;
  const to = `/${isEn ? "en" : "ua"}/services/${slug}`;

  return (
    <Link
      to={to}
      className="group h-full flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {service.mainImage && (
        <div className="aspect-[7/4] overflow-hidden bg-paleOlive/40">
          <AdvancedImage
            cldImg={imageCld}
            alt={(isEn ? service.image_alt_en : service.image_alt) || name}
            loading="lazy"
            width={560}
            height={320}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <h3 className="flex items-center justify-between gap-3 px-4 md:px-5 py-3 md:py-4 text-base md:text-xl font-bold text-darkGray dark:text-white">
        <span>{name}</span>
        <svg className="w-5 h-5 shrink-0 text-[#A9AE6B] transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m-6-6 6 6-6 6" />
        </svg>
      </h3>
    </Link>
  );
};

interface SubServicesProps {
  title: string;
  items: SubService[];
  isEn: boolean;
}

/** Блок перелінковки хаба: усі послуги напрямку. */
export const SubServices: FC<SubServicesProps> = ({ title, items, isEn }) => {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="sub-services-title" className="flex flex-col gap-6">
      <SectionHeading id="sub-services-title" title={title} />
      <ul className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-5 list-none p-0">
        {items.map((service) => (
          <li key={service.id}>
            <SubServiceCard service={service} isEn={isEn} />
          </li>
        ))}
      </ul>
    </section>
  );
};
