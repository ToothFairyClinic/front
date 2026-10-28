import { FC } from "react";
import { Link } from "@app/common/router/router";
import { imageSrcSet, imageUrl } from "@app/modules/blog/utils/post-utils";

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
  /** Рівень заголовка картки: на головній h3 (під h2 секції), у хабі послуг h2 (одразу під h1). */
  headingLevel?: 2 | 3;
}

/** Пропорція фото картки 640x300; srcset віддає 400/480/640/800 замість одного 640 на всіх екранах. */
const IMAGE_RATIO = 300 / 640;
const IMAGE_WIDTHS = [400, 480, 640, 800];
const IMAGE_SIZES = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";

const Arrow = () => (
  <svg className="w-6 h-6 shrink-0 text-[#A9AE6B] transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m-6-6 6 6-6 6" />
  </svg>
);

export const ServicesItem: FC<ServicesItemProps> = ({ title, description, to, image, imageAlt, links, headingLevel = 3 }) => {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article className="h-full flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow duration-300">
      {image && (
        <Link to={to} tabIndex={-1} aria-hidden="true" className="block aspect-[32/15] overflow-hidden bg-paleOlive/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl(image, 640, IMAGE_RATIO)}
            srcSet={imageSrcSet(image, IMAGE_WIDTHS, IMAGE_RATIO)}
            sizes={IMAGE_SIZES}
            alt={imageAlt || title}
            loading="lazy"
            decoding="async"
            width={640}
            height={300}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>
      )}

      <div className="flex-1 flex flex-col gap-3 px-6 pt-5 pb-6 text-darkGray dark:text-white">
        <Heading className="text-xl md:text-2xl font-bold leading-snug md:min-h-[4.125rem]">
          <Link to={to} className="group inline-flex items-center gap-3 hover:underline decoration-paleOlive decoration-2 underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-paleOlive rounded">
            <span>{title}</span>
            <Arrow />
          </Link>
        </Heading>

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
