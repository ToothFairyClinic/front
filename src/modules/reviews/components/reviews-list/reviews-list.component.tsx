import { FC } from "react";
import { ReviewsItem } from "../reviews-item/reviews-item.component";

export interface PublicReview {
  id: string;
  client_name: string;
  comment: string;
  created_at: string;
}

interface ReviewsListProps {
  reviews: PublicReview[];
  isEn: boolean;
}

/** Відгуки колонками різної висоти: короткі не розтягуються під довгі. */
export const ReviewsList: FC<ReviewsListProps> = ({ reviews, isEn }) => (
  <ul className="columns-1 md:columns-2 xl:columns-3 gap-5 md:gap-6 list-none p-0">
    {reviews.map((review) => (
      <li key={review.id} className="mb-5 md:mb-6 break-inside-avoid">
        <ReviewsItem {...review} isEn={isEn} />
      </li>
    ))}
  </ul>
);
