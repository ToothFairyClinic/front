import { Reviews } from "@app/core/types";
import { FC } from "react";

interface ReviewsItemProps { }

export const ReviewsItem: FC<Reviews> = ({
  client_name,
  client_phone,
  created_at,
  comment,
}) => {
  const date = new Date(created_at);

  date.setHours(date.getHours());

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <figure className="w-full sm:w-96 py-10 dark:text-white bg-white pb-6 rounded-2xl hover:shadow-md dark:shadow-white dark:bg-darkGray dark:border-white border flex flex-col justify-between">
      <figcaption className="text-2xl px-3">
        <cite className="not-italic">{client_name}</cite>
      </figcaption>

      <div className="h-px w-44 bg-paleOlive mt-1" aria-hidden="true" />
      <blockquote className="px-2 py-10">
        <p >{comment}</p>
      </blockquote>

      <div className="h-px w-44 bg-paleOlive mt-1" aria-hidden="true" />

      <time dateTime={created_at} className="text-right px-3">{formattedDate}</time>
    </figure>
  );
};
