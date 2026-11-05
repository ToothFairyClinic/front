import { FC } from "react";

interface ReviewsItemProps {
  client_name: string;
  comment: string;
  created_at: string;
  isEn: boolean;
}

/** Картка відгуку: текст, ім'я, дата. Телефон автора на сайт не потрапляє. */
export const ReviewsItem: FC<ReviewsItemProps> = ({ client_name, comment, created_at, isEn }) => {
  const date = new Date(created_at);
  const formattedDate = Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString(isEn ? "en-GB" : "uk-UA", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Europe/Kyiv",
      });

  return (
    <figure className="flex flex-col gap-5 rounded-2xl bg-white border border-black/5 p-6 md:p-7 text-darkGray">
      <blockquote className="text-base md:text-lg leading-relaxed whitespace-pre-line [overflow-wrap:anywhere]">
        {comment.trim()}
      </blockquote>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-paleOlive/70 pt-4">
        <cite className="not-italic text-base md:text-lg font-semibold">{client_name.trim()}</cite>
        {formattedDate && (
          <time dateTime={created_at} className="text-base text-darkGray/70 tabular-nums">
            {formattedDate}
          </time>
        )}
      </figcaption>
    </figure>
  );
};
