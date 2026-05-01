import { FC, useMemo } from "react";
import { AdvancedVideo, lazyload } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import CatImage from "@app/assets/images/cat.png";
import { useTranslation } from 'react-i18next';

const cld = new Cloudinary({
  cloud: {
    cloudName: "dc7d3byxg",
  },
});

export const Slide: FC = () => {
  const { t } = useTranslation();

  // Оптимізація відео: авто-формат, авто-якість та обмеження ширини
  const myVideo = useMemo(() =>
    cld.video("videos/cjqq4jqlqe6vqia4xyot")
      .format('auto')
      .quality('auto')
      .resize(fill().width(1920)),
    []
  );

  // Оптимізація постеру (зображення, що вантажиться першим)
  const videoPoster = useMemo(() =>
    cld.image("videos/cjqq4jqlqe6vqia4xyot")
      .setAssetType('video')
      .format('auto')
      .quality('auto')
      .toURL(),
    []
  );

  const lazyloadPlugin = useMemo(() => [lazyload()], []);

  return (
    <section
      className="relative h-165 lg:h-screen flex justify-center items-end pb-15 overflow-hidden"
      aria-label={t("Головний екран клініки")}
    >
      {/* Фонове відео */}
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
            poster={videoPoster}
          />
          {/* Оверлей для контрасту тексту */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Прихований опис відео для SEO */}
          <span className="sr-only">
            {t("Відеопрезентація стоматологічної клініки Зубна Фея")}
          </span>
        </div>
      )}

      {/* Контентний блок */}
      <div className="relative z-10 text-center text-darkGray max-w-150 bg-paleOlive/75 dark:bg-darkGray/75 dark:text-white py-12 px-8 lg:rounded-full transition duration-500 ease-in-out hover:scale-105">
        <h1 className="font-normal text-4xl md:text-6xl mb-6">
          <span className="block text-2xl md:text-3xl uppercase tracking-widest mb-2 opacity-90">
            {t('Стоматологія')}
          </span>
          {t('Зубна Фея')}
        </h1>

        <p className="font-normal text-xl md:text-3xl leading-relaxed">
          {t('Cтоматологія, в якій безпечно та в комфортних умовах лікують зубки діти та їх батьки!')}
        </p>
      </div>

      {/* Декоративний кіт */}
      <div className="z-10 absolute lg:right-5 lg:-bottom-10 hidden lg:block pointer-events-none" aria-hidden="true">
        <img
          src={CatImage}
          alt=""
          className="w-auto h-auto max-w-xs xl:max-w-md"
          loading="lazy"
        />
      </div>
    </section>
  );
};