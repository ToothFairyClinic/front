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
import { Link } from "react-router-dom";

interface PersonnelListProps {
  isLoading?: boolean;
}

export const PersonnelList: FC<PersonnelListProps> = ({ isLoading }) => {
  const { data, loading: queryLoading, error } = useGetPersonnelQuery();
  const isCurrentlyLoading = queryLoading || isLoading;
  const { t, i18n } = useTranslation();
  const personnelRef = useRef<HTMLDivElement>(null);
  const isEn = i18n.language === "en";
  const currentLang = isEn ? "en" : "ua";

  if (error) return (
    <section className="py-28 min-h-[700px] flex items-center justify-center">
      <ShowInfo type="error"><p>{t("Упс, сталася помилка")}</p></ShowInfo>
    </section>
  );


  if (isCurrentlyLoading && !data?.personnel) {
    return (
      <section className="dark:bg-darkGray py-28 flex flex-col gap-10 min-h-[700px]">
        <MainTitle as="h2">{t("Наша команда")}</MainTitle>
        <div className="lg:px-20 flex gap-10 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-1 min-w-[300px] h-[550px] bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"
            />
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
      className="dark:bg-darkGray py-28 flex flex-col gap-10 min-h-[700px]"
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
          {data.personnel.map(({ image, ...item }) => {
            const doctorSlug = isEn && item.slug_en ? item.slug_en : (item.slug || item.id);


            return <SwiperSlide key={item.id} tag="article">
              <Link
                key={item.id}
                to={`/${currentLang}/doctors/${doctorSlug}`}
                className="w-full flex justify-center transition-transform hover:-translate-y-1"
              >

                <PersonnelItem
                  image={`${image}`}
                  personnel_categories={item.categories}
                  {...item}
                />
              </Link>
            </SwiperSlide>
          })}
        </Swiper>

      </div>
    </section>
  );
};