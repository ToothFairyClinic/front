import { FC } from "react";
// @ts-ignore
import videoBg from "@app/assets/videos/main_page_video.mp4";
import { AdvancedVideo } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import CatImage from "@app/assets/images/cat.png";
import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
interface SlideProps {}

export const Slide: FC<SlideProps> = ({}) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dc7d3byxg",
    },
  });
  const myVideo = cld.video("videos/cjqq4jqlqe6vqia4xyot");

  return (
    <div className="relative h-165 lg:h-screen flex justify-center items-end  pb-15">
      <AdvancedVideo
        className="absolute inset-0 w-full h-full object-cover"
        cldVid={myVideo}
        autoPlay
        loop
        muted
      ></AdvancedVideo>
      <div className="absolute text-center text-darkGray z-10 max-w-150 bg-paleOlive/75 dark:bg-darkGray/75 dark:text-white py-12 px-8 lg:rounded-full transition  delay-150">
        <h1 className=" font-normal text-6xl mb-8">Зубна Фея</h1>
        <p className="font-normal text-3xl">
          Cтоматологія, в якій безпечно та в комфортних умовах лікують зубки
          діти та їх батьки!
        </p>
      </div>
      <div className="z-10 absolute lg:right-0 lg:-bottom-44 hidden lg:block ">
        <img src={CatImage} alt="" />
      </div>
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
    </div>
  );
};

// Приклад через youtube

// const [videoReady, setVideoReady] = useState(false);

// useEffect(() => {
//   // Маркуємо відео як готове після завершення завантаження
//   const handleVideoLoad = () => {
//     setVideoReady(true);
//   };

//   document.getElementById("youtube-video")?.addEventListener("load", handleVideoLoad);

//   return () => {
//     document.getElementById("youtube-video")?.removeEventListener("load", handleVideoLoad);
//   };
// }, []);
// return (
//   <div className="relative  h-screen flex justify-center items-end  pb-15">
//     <div className="absolute inset-0 w-full h-full">
//       <iframe
//         id="youtube-video"
//         className={`w-full h-full object-cover ${
//           videoReady ? "opacity-100" : "opacity-0"
//         }`}
//         src="https://www.youtube.com/embed/BldUytnm7y4?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&fs=0"
//         allowFullScreen
//         allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//         title="YouTube Video"
//       ></iframe>
//     </div>
//     <div className="absolute text-center text-darkGray z-10 max-w-150 bg-paleOlive/75 dark:bg-darkGray/75 dark:text-white py-12  px-8 rounded-full transition  delay-150">
//       <h1 className=" font-normal text-6xl mb-8">
//         Зубна{" "}
//         <span className="bg-darkGray dark:bg-white dark:text-darkGray text-white py-5 px-3  rounded-full">
//           Фея
//         </span>
//       </h1>
//       <p className="font-normal text-3xl">
//         Cтоматологія, в якій безпечно та в комфортних умовах лікують зубки
//         діти та їх батьки!
//       </p>
//     </div>
//     <div className="  z-10 absolute right-0 -bottom-44  ">
//       <img src={CatImage} alt="" />
//     </div>
//     <div className="bg-black bg-opacity-50 absolute inset-0"></div>
//   </div>
// );
// };
