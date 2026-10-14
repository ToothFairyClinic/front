import { FC } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
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

const IMAGE_TRANSFORMATIONS = ["c_fill", "g_auto", "w_780", "h_820", "f_auto", "q_auto"];

export const AboutClinic: FC<AboutClinicProps> = ({ label, title, text, button, image, imageAlt }) => {
  const imageCld = useCloudinaryImage(image || "", IMAGE_TRANSFORMATIONS);

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
            <AdvancedImage
              cldImg={imageCld}
              alt={imageAlt || title}
              loading="lazy"
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
