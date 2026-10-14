import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { AdvancedImage } from "@cloudinary/react";
import { FC } from "react";
import { Link } from "@app/common/router/router";

export interface ServiceCardLink {
  label: string;
  to: string;
}

interface ServicesItemProps {
  title: string;
  description?: string | null;
  to: string;
  image?: string | null;
  imageAlt?: string | null;
  links: ServiceCardLink[];
}

const IMAGE_TRANSFORMATIONS = ["c_fill", "g_auto", "w_640", "h_300", "f_auto", "q_auto"];

const Arrow = () => (
  <svg className="w-6 h-6 shrink-0 text-[#A9AE6B] transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m-6-6 6 6-6 6" />
  </svg>
);

export const ServicesItem: FC<ServicesItemProps> = ({ title, description, to, image, imageAlt, links }) => {
  const imageCld = useCloudinaryImage(image || "", IMAGE_TRANSFORMATIONS);

  return (
    <article className="h-full flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow duration-300">
      {image && (
        <Link to={to} tabIndex={-1} aria-hidden="true" className="block aspect-[32/15] overflow-hidden bg-paleOlive/40">
          <AdvancedImage
            cldImg={imageCld}
            alt={imageAlt || title}
            loading="lazy"
            width={640}
            height={300}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>
      )}

      <div className="flex-1 flex flex-col gap-3 px-6 pt-5 pb-6 text-darkGray dark:text-white">
        <h3 className="text-xl md:text-2xl font-bold leading-snug md:min-h-[4.125rem]">
          <Link to={to} className="group inline-flex items-center gap-3 hover:underline decoration-paleOlive decoration-2 underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-paleOlive rounded">
            <span>{title}</span>
            <Arrow />
          </Link>
        </h3>

        {description && <p className="text-lg leading-relaxed opacity-80">{description}</p>}

        {links.length > 0 && (
          <ul className="list-none p-0 mt-auto pt-1 flex flex-wrap gap-x-8 gap-y-3">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-base md:text-lg border-b-2 border-paleOlive pb-0.5 hover:border-darkGray dark:hover:border-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
};
