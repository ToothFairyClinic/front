import { FC, useMemo } from "react";
import { AdvancedVideo, lazyload } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import CatImage from "@app/assets/images/cat.svg";
import { useTranslation } from 'react-i18next';
import { bitRate } from "@cloudinary/url-gen/actions/transcode";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dc7d3byxg",
  },
});

export const Slide: FC = () => {
  const { t } = useTranslation();

  const myVideo = useMemo(() =>
    cld.video("videos/cjqq4jqlqe6vqia4xyot")
      .addTransformation("br_1m")
      .format('auto')
      .quality('auto')
      .resize(fill().width(1280)),
    []
  );

  const videoPoster = useMemo(() =>
    cld.image("videos/cjqq4jqlqe6vqia4xyot")
      .setAssetType('video')
      .format('auto')
      .quality('auto')
      .resize(fill().width(1280))
      .toURL(),
    []
  );

  return (
    <section
      className="relative h-165 lg:h-screen flex justify-center items-end pb-15 bg-paleOlive "
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
          preload="auto"
          poster={videoPoster}
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 text-center text-darkGray max-w-150 bg-paleOlive/75 dark:bg-darkGray/75 dark:text-white py-12 px-8 lg:rounded-full transition duration-500 ease-in-out">
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

      <div className="absolute -bottom-52 right-10 z-50 hidden lg:block pointer-events-none" aria-hidden="true">
        <img
          src={CatImage}
          alt=""
          width="400"
          height="350"
          className="w-auto h-auto object-contain"
          loading="eager"
        />
      </div>
    </section>
  );
};