import { FC } from "react";
import { AdvancedVideo, lazyload } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import CatImage from "@app/assets/images/cat.png";
import { useTranslation } from 'react-i18next';

interface SlideProps {}

export const Slide: FC<SlideProps> = ({}) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dc7d3byxg",
    },
  });
  const myVideo = cld.video("videos/cjqq4jqlqe6vqia4xyot");
  const lazyloadPlugin = [lazyload()];
  const { t } = useTranslation();

  return (
    <div className="relative h-165 lg:h-screen flex justify-center items-end  pb-15">
      {myVideo && (
        <AdvancedVideo
          className="absolute inset-0 w-full h-full object-cover"
          cldVid={myVideo}
          playsInline
          autoPlay
          loop
          muted
          plugins={lazyloadPlugin}
          preload="auto"
        ></AdvancedVideo>
      )}
      <div className="absolute text-center text-darkGray z-10 max-w-150 bg-paleOlive/75 dark:bg-darkGray/75 dark:text-white py-12 px-8 lg:rounded-full transition  delay-150">
        <h1 className=" font-normal text-6xl mb-8">{t(`Зубна Фея`)}</h1>
        <p className="font-normal text-3xl">
           {t(`Cтоматологія, в якій безпечно та в комфортних умовах лікують зубки діти та їх батьки!`)}
        </p>
      </div>
      <div className="z-10 absolute lg:right-0 lg:-bottom-44 hidden lg:block ">
        <img src={CatImage} alt="" />
      </div>
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
    </div>
  );
};
