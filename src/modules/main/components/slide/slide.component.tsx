import { FC } from "react";
// @ts-ignore
import videoBg from "@app/assets/videos/main_page_video.MP4";
import CatImage from "@app/assets/images/cat.png";
interface SlideProps {}

export const Slide: FC<SlideProps> = ({}) => {
  return (
    <div className="relative  h-screen flex justify-center items-end  pb-15">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={videoBg}
        autoPlay
        loop
        muted
        disablePictureInPicture
      ></video>
      <div className="absolute text-center text-darkGray z-10 max-w-150 bg-paleOlive/75 dark:bg-darkGray/75 dark:text-white py-12  px-8 rounded-full transition  delay-150">
        <h1 className=" font-normal text-6xl mb-8">
          Зубна{" "}
          <span className="bg-darkGray dark:bg-white dark:text-darkGray text-white py-5 px-3  rounded-full">
            Фея
          </span>
        </h1>
        <p className="font-normal text-3xl">
          Cтоматологія, в якій безпечно та в комфортних умовах лікують зубки
          діти та їх батьки!
        </p>
      </div>
      <div className="  z-10 absolute right-0 -bottom-44  ">
        <img src={CatImage} alt="" />
      </div>
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
    </div>
  );
};
