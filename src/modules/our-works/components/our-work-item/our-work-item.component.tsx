import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { Our_Works } from "@app/core/types";
import { AdvancedImage } from "@cloudinary/react";
import { FC } from "react";

interface OurWorkItemProps {
  fitImage?: boolean;
}

export const OurWorkItem: FC<Our_Works & OurWorkItemProps> = ({
  image_after,
  image_before,
  title,
  description,
  fitImage = false,
}) => {
  const transformations = ["w_384", "h_210"];
  if (fitImage) {
    transformations.unshift("c_pad");
  }

  const imageCldAfter = useCloudinaryImage(image_after, transformations);
  console.log("🚀 ~ imageCldAfter:", imageCldAfter);
  const imageCldBefore = useCloudinaryImage(image_before, transformations);
  console.log("🚀 ~ imageCldBefore:", imageCldBefore);

  return (
    <div className="w-96 dark:text-white bg-white pb-6 rounded-2xl hover:shadow-md dark:shadow-white dark:bg-darkGray ">
      <AdvancedImage
        cldImg={imageCldAfter}
        width={384}
        height={240}
        className="rounded-t-2xl "
      />
      <AdvancedImage cldImg={imageCldBefore} width={384} height={210} />
      <p className="text-2xl">{title}</p>
      <div className="h-px w-44 bg-paleOlive mt-1"></div>
      <p className="px-1">{description}</p>
    </div>
  );
};
