import { FC, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useGetPersonnelQuery } from "@app/core/types";
import { PersonnelItem } from "../personnel-item/personnel-item.component";
import { MainTitle } from "@app/common/components/main-title/main-title.component";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { useTranslation } from 'react-i18next';

// Імпорт стилів
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface PersonnelListProps { }

export const PersonnelList: FC<PersonnelListProps> = () => {
  const { data, loading, error } = useGetPersonnelQuery();
  const personnelRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  if (error) {
    return (
      <ShowInfo type="error">
        <p> {t("Упс, спалася помилка")}  </p>
        <p>{t("Спробуйте трохи пізніше")} </p>
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
        <p> {t("Нажаль тут пусто")}</p>
      </ShowInfo>
    );
  }

  return (
    <section
      ref={personnelRef}
      id="personnel"
      aria-labelledby="personnel-title"
      className="dark:bg-darkGray py-28 flex flex-col gap-10 transition-colors duration-300"
    >
      <MainTitle as="h2">
        {t("Наша команда")}
      </MainTitle>

      <div className="lg:px-20">
        <Swiper
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1300: { slidesPerView: 3, spaceBetween: 75 },
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="pb-12"
        >
          {data.personnel.map(({ image, ...item }) => (
            <SwiperSlide key={item.id} tag="article">
              <PersonnelItem
                image={`${image}`}
                personnel_category_str={item.personnel_category?.title || ""}
                personnel_category_second_str={item.personnel_category_second?.title}
                {...item}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
