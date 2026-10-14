import { FC } from "react";
import { SectionHeading } from "../section-heading/section-heading.component";
import { HtmlContent } from "@app/common/components/html-content/html-content.component";
import { HomeFaqItem } from "../../graphql/home-page";

interface HomeFaqProps {
  title?: string;
  items?: HomeFaqItem[];
}

export const HomeFaq: FC<HomeFaqProps> = ({ title, items = [] }) => {
  const faq = items.filter((item) => item.question && item.answer);
  if (!title || faq.length === 0) return null;

  return (
    <section aria-labelledby="faq-title" className="px-4 md:px-10 py-8 md:py-12 dark:bg-darkGray">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
        <SectionHeading id="faq-title" title={title} />

        <div className="flex flex-col gap-4">
          {faq.map((item, index) => (
            <details
              key={`${index}-${item.question}`}
              className="group rounded-2xl bg-white dark:bg-white/5 border border-paleOlive px-6 py-5 shadow-sm transition-shadow [&[open]]:shadow-md"
            >
              <summary className="flex justify-between items-center gap-4 cursor-pointer list-none select-none text-lg md:text-xl font-semibold text-darkGray dark:text-white [&::-webkit-details-marker]:hidden">
                <h3 className="font-semibold">{item.question}</h3>
                <svg className="w-5 h-5 shrink-0 transition-transform duration-200 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <HtmlContent html={item.answer} className="mt-4 prose-p:leading-relaxed prose-p:my-2 opacity-90" />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
