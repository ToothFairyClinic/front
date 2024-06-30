import { ReactComponent as Review1 } from "@app/assets/images/review_1.svg";
import { ReactComponent as Review2 } from "@app/assets/images/review_2.svg";
import { ReactComponent as Review3 } from "@app/assets/images/review_3.svg";

export const OldReviewsItem = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-10">
      <Review1
        className="dark:fill-white fill-darkGray w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl"
        stroke="black"
      />
      <Review2
        className="dark:fill-white fill-darkGray w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl"
        stroke="black"
      />
      <Review3
        className="dark:fill-white fill-darkGray w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl"
        stroke="black"
      />
    </div>
  );
};
