import { FC } from "react";
import { imageSrcSet, imageUrl } from "@app/modules/blog/utils/post-utils";
import { HtmlContent } from "@app/common/components/html-content/html-content.component";
import { Mascot, MASCOT_LINES } from "../mascot/mascot.component";

interface AboutClinicProps {
  label?: string;
  title?: string;
  text?: string;
  button?: string;
  image?: string | null;
  imageAlt?: string;
}

const PEEK_HEIGHT = 270;
const PEEK_WIDTH = Math.round((208 / 480) * PEEK_HEIGHT);

/** Фото 780x820; srcset 480/780/1080 замість одного 780 - на телефоні і в колонці 580-665 px не тягнемо зайве. */
const IMAGE_RATIO = 820 / 780;
const IMAGE_WIDTHS = [480, 780, 1080];
const IMAGE_SIZES = "(min-width: 1024px) min(45vw, 665px), calc(100vw - 2rem)";

export const AboutClinic: FC<AboutClinicProps> = ({ label, title, text, button, image, imageAlt }) => {
  if (!title) return null;

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section aria-labelledby="about-title" className="px-4 md:px-10 py-8 md:py-12 dark:bg-darkGray">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
        {image && (
          <div className="relative">
          <div className="w-full aspect-[39/41] overflow-hidden rounded-[2rem] bg-paleOlive/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl(image, 780, IMAGE_RATIO)}
              srcSet={imageSrcSet(image, IMAGE_WIDTHS, IMAGE_RATIO)}
              sizes={IMAGE_SIZES}
              alt={imageAlt || title}
              loading="lazy"
              decoding="async"
              width={780}
              height={820}
              className="w-full h-full object-cover"
            />
          </div>
          <Mascot pose="peek" height={PEEK_HEIGHT} style={{ left: `calc(100% - ${Math.round(MASCOT_LINES.peekWallX * PEEK_WIDTH)}px)`, top: "34%" }} />
          </div>
        )}

        <div className="flex flex-col gap-6 text-darkGray dark:text-white">
          {label && (
            <p className="text-sm md:text-base uppercase tracking-[0.3em] opacity-80">{label}</p>
          )}
          <h2 id="about-title" className="text-3xl md:text-5xl lg:text-6xl font-normal leading-tight">
            {title}
          </h2>
          <HtmlContent html={text} className="prose-p:leading-relaxed prose-p:my-4 md:prose-xl" />
          {button && (
            <div>
              <button
                type="button"
                onClick={scrollToServices}
                className="inline-flex items-center justify-center font-semibold text-base sm:text-lg px-8 sm:px-10 py-3.5 rounded-full bg-darkGray text-white hover:bg-black dark:bg-paleOlive dark:text-darkGray dark:hover:bg-white transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkGray dark:focus:ring-paleOlive"
              >
                {button}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
