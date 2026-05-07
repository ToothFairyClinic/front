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

  if (error) return (
    <section className="py-28 min-h-[600px] flex items-center justify-center">
      <ShowInfo type="error"><p>{t("Упс, сталася помилка")}</p></ShowInfo>
    </section>
  );


  if (loading) {
    return (
      <section className="dark:bg-darkGray py-28 flex flex-col gap-10 min-h-[700px]">
        <MainTitle as="h2">{t("Наша команда")}</MainTitle>
        <div className="lg:px-20 flex gap-10 overflow-hidden animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-96 h-[500px] bg-gray-200 dark:bg-gray-700 rounded-2xl" />
          ))}
        </div>
      </section>
    );
  }

  if (!data?.personnel || data.personnel.length === 0) return null;

  return (
    <section
      ref={personnelRef}
      id="personnel"
      aria-labelledby="personnel-title"
      className="dark:bg-darkGray py-28 flex flex-col gap-10 transition-colors duration-300 min-h-[700px]"
    >
      <MainTitle as="h2">
        {t("Наша команда")}
      </MainTitle>

      <div className="lg:px-20 min-h-[550px]">
        <Swiper
          autoHeight={false}
          style={{ height: '550px' }}
          setWrapperSize={true}
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