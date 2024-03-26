import { Button } from "@app/common/components/button/button.component";
import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { Personnel_Categories } from "@app/core/types";
import { AdvancedImage } from "@cloudinary/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

interface PersonnelItemProps {
  image: string;
  name: string;
  description: string;
  id: string;
  personnel_category_str: string;
  personnel_category_second_str?: string;
  fitImage?: boolean;
}

export const PersonnelItem: FC<PersonnelItemProps> = ({
  image,
  name,
  id,
  description,
  personnel_category_str,
  personnel_category_second_str,
  fitImage = true,
}) => {
  const transformations = ["w_370", "h_440"];
  if (fitImage) {
    transformations.unshift("c_pad");
  }

  const imageCld = useCloudinaryImage(image, transformations);

  return (
    <div className="w-96 dark:text-white bg-white pb-6 rounded-2xl hover:shadow-md dark:shadow-white dark:bg-darkGray ">
      <AdvancedImage
        cldImg={imageCld}
        width={385}
        height={440}
        className="rounded-t-2xl "
      />

      <p className="text-2xl">{name}</p>

      <span className="px-1">{personnel_category_str}</span>
      {personnel_category_second_str ? (
        <span>, {personnel_category_second_str}</span>
      ) : (
        <div />
      )}
      <div className="h-px w-44 bg-paleOlive mt-1"></div>
      <p className="px-1">{description}</p>
    </div>
  );
};
