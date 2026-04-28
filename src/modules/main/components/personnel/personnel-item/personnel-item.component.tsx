import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { AdvancedImage } from "@cloudinary/react";
import { FC } from "react";
import { useTranslation } from 'react-i18next';

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
  personnel_category_str,
  personnel_category_second_str,
  fitImage = true,
}) => {
  const transformations = ["w_370", "h_440"];
  if (fitImage) {
    transformations.unshift("c_pad");
  }
  const { t } = useTranslation();
  const imageCld = useCloudinaryImage(image, transformations);

  return (
    <div className="lg:w-96 dark:text-white bg-white pb-6 rounded-2xl hover:shadow-md dark:shadow-sm dark:shadow-white/20 dark:bg-darkGray transition-shadow duration-300">
      <AdvancedImage
        cldImg={imageCld}
        width={385}
        height={440}
        alt={t(name)}
        className="rounded-t-2xl w-full object-cover"
      />

      <div className="px-4 mt-4">
        <h3 className="text-2xl font-semibold mb-1">
          {t(name)}
        </h3>


        <div className="text-lg opacity-80">
          <span>{t(personnel_category_str)}</span>
          {personnel_category_second_str && (
            <span>, {t(personnel_category_second_str)}</span>
          )}
        </div>

        <div className="h-px w-20 bg-paleOlive mt-3" aria-hidden="true"></div>
      </div>
    </div>
  );
};
