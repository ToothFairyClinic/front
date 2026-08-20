import { FC, useMemo, useState } from "react";
import { AdvancedVideo } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { useTranslation } from 'react-i18next';
import { ConsultationModal } from "@app/common/components/consultation-modal/consultation-modal.component";


const cld = new Cloudinary({
  cloud: {
    cloudName: "dc7d3byxg",
  },
});

export const Slide: FC = () => {
  const { t } = useTranslation();
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const myVideo = useMemo(() => {
    const video = cld.video("videos/cjqq4jqlqe6vqia4xyot")
      .format('auto')
      .quality('auto');

    if (isMobile) {
      return video
        .resize(fill().width(640))
        .addTransformation("br_500k");
    }

    return video.resize(fill().width(1280)).addTransformation("br_1m");
  }, [isMobile]);

  const videoPoster = useMemo(() =>
    cld.image("videos/cjqq4jqlqe6vqia4xyot")
      .setAssetType('video')
      .format('auto')
      .quality('auto')
      .resize(fill().width(isMobile ? 640 : 1280))
      .toURL(),
    [isMobile]
  );

  return (
    <div className="relative">
      <section
        className="relative min-h-[100svh] lg:h-screen flex justify-center items-center pt-24 pb-12 lg:pt-20 lg:pb-12 px-4 bg-paleOlive overflow-hidden"
        aria-label={t("Головний екран клініки")}
      >
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <AdvancedVideo
            className="w-full h-full object-cover"
            cldVid={myVideo}
            playsInline
            autoPlay
            loop
            muted
            // Пріоритет та попереднє завантаження для LCP
            // @ts-ignore
            fetchpriority="high"
            preload="auto"
            poster={videoPoster}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative top-10 z-10 text-center text-darkGray max-w-150 w-full bg-paleOlive/80 dark:bg-darkGray/80 dark:text-white py-8 px-6 sm:py-10 sm:px-8 md:py-12 md:px-10 rounded-3xl lg:rounded-full transition duration-500 ease-in-out flex flex-col items-center shadow-lg">
          <h1 className="font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6">
            <span className="block text-xl sm:text-2xl md:text-3xl uppercase tracking-widest mb-1.5 sm:mb-2 opacity-90">
              {t('Стоматологія')}
            </span>
            {t('Зубна Фея')}
          </h1>
          <p className="font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-xl">
            {t('Cтоматологія, в якій безпечно та в комфортних умовах лікують зубки діти та їх батьки!')}
          </p>

          <div className="mt-6 md:mt-8">
            <button
              type="button"
              onClick={() => setIsConsultationOpen(true)}
              className="inline-flex items-center justify-center font-medium sm:font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-darkGray text-white hover:bg-black dark:bg-paleOlive dark:text-darkGray dark:hover:bg-white transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkGray dark:focus:ring-paleOlive"
            >
              {t('Отримати консультацію')}
            </button>
          </div>
        </div>

      </section>
      <div className="absolute -bottom-52 right-10 z-20 hidden lg:block pointer-events-none" aria-hidden="true">
        <img
          src="/assets/cat.svg"
          alt=""
          width="400"
          height="350"
          className="w-auto h-auto object-contain"
          loading="eager"
          // @ts-ignore
          fetchpriority="low"
        />
      </div>
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
};