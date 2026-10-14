import { FC, useId, useRef, useState } from "react";
import { SectionHeading } from "../section-heading/section-heading.component";
import { HtmlContent } from "@app/common/components/html-content/html-content.component";

interface SeoTextProps {
  title?: string;
  intro?: string;
  more?: string;
  moreButton?: string;
  lessButton?: string;
}

const TEXT_CLASSES = "prose-p:leading-relaxed prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:font-semibold prose-h3:mt-10 prose-h3:mb-4";

export const SeoText: FC<SeoTextProps> = ({ title, intro, more, moreButton, lessButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const moreId = useId();

  if (!title || !intro) return null;

  const toggle = () => {
    if (isOpen && sectionRef.current && sectionRef.current.getBoundingClientRect().top < 0) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen((value) => !value);
  };

  return (
    <section ref={sectionRef} aria-labelledby="seo-text-title" className="px-4 md:px-10 py-8 md:py-12 scroll-mt-24 dark:bg-darkGray">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
        <SectionHeading id="seo-text-title" title={title} />

        <HtmlContent html={intro} className={TEXT_CLASSES} />

        {more && (
          <>
            {/* Розгорнута частина завжди в HTML, щоб її бачили пошукові системи */}
            <div id={moreId} hidden={!isOpen}>
              <HtmlContent html={more} className={TEXT_CLASSES} />
            </div>

            <div>
              <button
                type="button"
                onClick={toggle}
                aria-expanded={isOpen}
                aria-controls={moreId}
                className="inline-flex items-center gap-2 font-semibold text-base sm:text-lg px-8 py-3 rounded-full border-2 border-darkGray text-darkGray hover:bg-darkGray hover:text-white dark:border-paleOlive dark:text-paleOlive dark:hover:bg-paleOlive dark:hover:text-darkGray transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-darkGray"
              >
                {isOpen ? lessButton : moreButton}
                <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
