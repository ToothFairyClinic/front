import { MainTitle } from "@app/common/components/main-title/main-title.component";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { useGetReviewsQuery } from "@app/core/types";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ReviewsItem } from "../reviews-item/reviews-item.component";
import { useMediaQuery } from "react-responsive";

interface ReviewsListProps {}

export const ReviewsList: FC<ReviewsListProps> = ({}) => {
  const { data, loading, error } = useGetReviewsQuery();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1300 });

  if (error) {
    return (
      <ShowInfo type="error">
        <p>Упс, спалася помилка</p>
        <p>Спробуйте трохи пізніше</p>
      </ShowInfo>
    );
  }

  if (loading) {
    return (
      <ShowInfo type="info">
        <p>loading</p>
      </ShowInfo>
    );
  }

  if (!data) {
    return (
      <ShowInfo type="info">
        <p>Нажаль тут пусто</p>
      </ShowInfo>
    );
  }

  return (
    <div className="dark:bg-darkGray py-28 flex flex-col gap-10">
      <MainTitle size="sm">Відгук</MainTitle>
      <div className=" px-20 ">
        <Swiper
          slidesPerView={isMobile ? 1 : isTablet ? 2 : 3}
          spaceBetween={75}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {data.reviews.map(({ ...item }) => (
            <SwiperSlide key={item.id} className="mb-12 ">
              <ReviewsItem key={item.id} {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
