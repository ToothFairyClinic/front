import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { Services } from "@app/core/types";
import { AdvancedImage } from "@cloudinary/react";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { FC } from "react";

interface ServiceItemProps {
  fitImage?: boolean;
}

export const ServiceItem: FC<ServiceItemProps & Services> = ({
  fitImage = true,
  image,
  name,
  description,
  id,
  mainImage,
}) => {
  const transformations = ["w_600", "h_526"];
  if (fitImage) {
    transformations.unshift("c_pad");
  }

  const imageCld = useCloudinaryImage(mainImage!, transformations);

  return (
    <div className="">
      <div className="float-left lg:mr-6 lg:mb-6">
        <AdvancedImage
          cldImg={imageCld}
          width={600}
          height={526}
          className="rounded-t-2xl"
        />
      </div>
      <div className="">
        <p
          dangerouslySetInnerHTML={{ __html: description! }}
          className="text-2xl dark:text-white text-left"
        />
      </div>
    </div>
  );
};
