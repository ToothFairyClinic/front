import { cloudinary } from "@app/core/cloudinary";
import { useMemo } from "react";

export const useCloudinaryImage = (
  cloudinaryImage: string,
  transformations: string[]
) => {

  return useMemo(() => {
    const image = cloudinary.image(cloudinaryImage);

    const transforms = [...transformations, "dpr_auto"];

    image.addTransformation(transforms.join(","));

    return image;
  }, [cloudinaryImage, transformations.join(",")]);
};