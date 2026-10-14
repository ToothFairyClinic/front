import { FC, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useGetPersonnelQuery } from "@app/core/types";
import { PersonnelItem } from "../personnel-item/personnel-item.component";
import { SectionHeading } from "../../section-heading/section-heading.component";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { useTranslation } from 'react-i18next';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "@app/common/router/router";
import { doctorPath } from "@app/common/utils/doctors-path";
import { Mascot } from "../../mascot/mascot.component";

interface PersonnelListProps {
  isLoading?: boolean;
  title?: string;
  intro?: string;
  /** Порядок і вибір лікарів з адмінки; порожній список - усі лікарі. */
  selectedIds?: string[];
}

export const PersonnelList: FC<PersonnelListProps> = ({ isLoading, title, intro, selectedIds = [] }) => {
  const { data, loading: queryLoading, error } = useGetPersonnelQuery();
  const isCurrentlyLoading = queryLoading || isLoading;
  const { t, i18n } = useTranslation();
  const personnelRef = useRef<HTMLDivElement>(null);
  const isEn = i18n.language === "en";
  const currentLang = isEn ? "en" : "ua";

  const personnel = useMemo(() => {
    const all = data?.personnel ?? [];
    if (selectedIds.length === 0) return all;
    const byId = new Map(all.map((item) => [item.id, item]));
    return selectedIds.flatMap((id) => byId.get(id) ?? []);
  }, [data, selectedIds]);

  if (error) return (
    <section className="py-12 min-h-[700px] flex items-center justify-center">
      <ShowInfo type="error"><p>{t("Упс, сталася помилка")}</p></ShowInfo>
    </section>
  );


  if (isCurrentlyLoading && !data?.personnel) {
    return (
      <section className="dark:bg-darkGray px-4 md:px-10 py-8 md:py-12">
        <div className="max-w-[1440px] mx-auto flex gap-10 overflow-hidden">
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

  if (personnel.length === 0) return null;

  const heading = (
    <div className="relative lg:pr-48">
      <SectionHeading id="personnel-title" title={title || t("Наша команда")} intro={intro} />
      <Mascot pose="wave" height={175} className="right-6 bottom-0" />
    </div>
  );


  return (
    <section
      ref={personnelRef}
      id="personnel"
      aria-labelledby="personnel-title"
      className="dark:bg-darkGray px-4 md:px-10 py-8 md:py-12"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8 md:gap-10">
        {heading}

        <div className="min-h-[650px]">
          <Swiper
            autoHeight={true}
            style={{ height: '650px' }}
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
          // className="pb-12"

          >
            {personnel.map(({ image, ...item }) => {
              const doctorSlug = isEn && item.slug_en ? item.slug_en : (item.slug || item.id);


              return <SwiperSlide key={item.id} tag="article">
                <Link
                  key={item.id}
                  to={doctorPath(currentLang, doctorSlug)}
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
      </div>
    </section>
  );
};