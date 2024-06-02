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
  const transformations = ["w_460", "h_440"];
  if (fitImage) {
    transformations.unshift("c_pad");
  }

  const imageCldAfter = useCloudinaryImage(image_after, transformations);

  const imageCldBefore = useCloudinaryImage(image_before, transformations);


  return (
    <div className="w-96 dark:text-white bg-white pb-6 rounded-2xl hover:shadow-md dark:shadow-white dark:bg-darkGray ">
      <AdvancedImage
        cldImg={imageCldBefore}
        width={460}
        height={440}
        className="rounded-t-2xl "
      />
      <p className="text-2xl">{title}</p>
      <div className="h-px w-44 bg-paleOlive mt-1"></div>
      <p className="px-1">{description}</p>
    </div>
  );
};
