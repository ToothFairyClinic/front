import { Button } from "@app/common/components/button/button.component";
import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { Services } from "@app/core/types";
import { AdvancedImage } from "@cloudinary/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

interface ServicesItemProps {
  image: string;
  name: string;
  fitImage?: boolean;
}

export const ServicesItem: FC<ServicesItemProps & Services> = ({
  image,
  name,
  id,
  fitImage = true,
}) => {
  const transformations = ["w_126", "h_126"];
  if (fitImage) {
    transformations.unshift("c_pad");
  }

  const imageCld = useCloudinaryImage(image, transformations);
  const { t } = useTranslation();

  return (
    <Link to={`/services/${id}`}>
      {" "}
      <div className=" hover:bg-white/20 flex flex-col justify-center items-center py-5 px-15 rounded-xl w-90 max-w-90 opacity-50 hover:opacity-100">
        <AdvancedImage
          cldImg={imageCld}
          width={126}
          height={126}
          className="rounded-t-2xl "
        />
        <p className="text-white text-3xl text-center">{t(`${name}`)}</p>
      </div>
    </Link>
  );
};
