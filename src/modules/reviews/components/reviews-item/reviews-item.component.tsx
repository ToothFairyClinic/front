import { Reviews } from "@app/core/types";
import { FC } from "react";

interface ReviewsItemProps {}

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
    <div className="w-full sm:w-96 py-10 dark:text-white bg-white pb-6 rounded-2xl hover:shadow-md dark:shadow-white dark:bg-darkGray dark:border-white border flex flex-col justify-between">
      <p className="text-2xl px-3">{client_name}</p>
      <div className="h-px w-44 bg-paleOlive mt-1"></div>
      <p className="px-2 py-10">{comment}</p>
      <div className="h-px w-44 bg-paleOlive mt-1"></div>
      <p className="text-right px-3">{formattedDate}</p>
    </div>
  );
};
