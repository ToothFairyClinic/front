import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { useGetPersonnelQuery } from "@app/core/types";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Додайте стилі Swiper
import { PersonnelItem } from "../personnel-item/personnel-item.component";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { MainTitle } from "@app/common/components/main-title/main-title.component";
import { useMediaQuery } from "react-responsive";

interface PersonnelListProps {}

export const PersonnelList: FC<PersonnelListProps> = () => {
  const { data, loading, error } = useGetPersonnelQuery();
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
        <p>Завантаження...</p>
      </ShowInfo>
    );
  }

  if (!data?.personnel || data.personnel.length === 0) {
    return (
      <ShowInfo type="info">
        <p>Нажаль тут пусто</p>
      </ShowInfo>
    );
  }

  return (
    <div className="dark:bg-darkGray py-28 flex flex-col gap-10">
      <MainTitle>Наша команда</MainTitle>
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
          {data.personnel.map(({ image, ...item }) => (
            <SwiperSlide key={item.id} className="mb-12 ">
              <PersonnelItem
                key={item.id}
                image={`${image}`}
                personnel_category_str={item.personnel_category!.title}
                personnel_category_second_str={
                  item.personnel_category_second?.title
                }
                {...item}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
