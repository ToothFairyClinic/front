import { MainTitle } from "@app/common/components/main-title/main-title.component";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { useGetReviewsQuery } from "@app/core/types";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ReviewsItem } from "../reviews-item/reviews-item.component";
import { useMediaQuery } from "react-responsive";
import { OldReviewsItem } from "../old-reviews-item/old-reviews-item.component";

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
      <h1 className="text-3xl text-darkGray dark:text-white">Наші попередні відгуки доступні <a className="underline" href="https://www.google.com/maps/place/%D0%A1%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F+%22%D0%97%D1%83%D0%B1%D0%BD%D0%B0+%D0%A4%D0%B5%D1%8F%22/@49.811069,30.1081881,17z/data=!4m18!1m9!3m8!1s0x40d3423b8b64085d:0x888f51696df6de26!2z0KHRgtC-0LzQsNGC0L7Qu9C-0LPRltGPICLQl9GD0LHQvdCwINCk0LXRjyI!8m2!3d49.811069!4d30.1081881!9m1!1b1!16s%2Fg%2F11c7s7p8z0!3m7!1s0x40d3423b8b64085d:0x888f51696df6de26!8m2!3d49.811069!4d30.1081881!9m1!1b1!16s%2Fg%2F11c7s7p8z0?hl=ru&entry=ttu">Тут</a></h1>
      <OldReviewsItem/>
      <div className=" lg:px-20 px-0 ">
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
