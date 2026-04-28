import { FC, useMemo } from "react";
import { AdvancedVideo, lazyload } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import CatImage from "@app/assets/images/cat.png";
import { useTranslation } from 'react-i18next';

interface SlideProps { }

const cld = new Cloudinary({
  cloud: {
    cloudName: "dc7d3byxg",
  },
});

export const Slide: FC<SlideProps> = ({ }) => {


  const myVideo = useMemo(() => cld.video("videos/cjqq4jqlqe6vqia4xyot"), []);
  const lazyloadPlugin = useMemo(() => [lazyload()], []);

  const { t } = useTranslation();

  return (
    <section className="relative h-165 lg:h-screen flex justify-center items-end pb-15 overflow-hidden">

      {myVideo && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <AdvancedVideo
            className="w-full h-full object-cover"
            cldVid={myVideo}
            playsInline
            autoPlay
            loop
            muted
            plugins={lazyloadPlugin}
            preload="auto"
          />

          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      )}

      <div className="relative z-10 text-center text-darkGray max-w-150 bg-paleOlive/75 dark:bg-darkGray/75 dark:text-white py-12 px-8 lg:rounded-full transition delay-150">
        <h1 className="font-normal text-6xl mb-8">
          {t('Зубна Фея')}
        </h1>
        <p className="font-normal text-3xl">
          {t('Cтоматологія, в якій безпечно та в комфортних умовах лікують зубки діти та їх батьки!')}
        </p>
      </div>

      <div className="z-10 absolute lg:right-0 lg:-bottom-44 hidden lg:block" aria-hidden="true">
        <img
          src={CatImage}
          alt={t('Декоративне зображення кота')}
          loading="lazy"
        />
      </div>
    </section>
  );
};
