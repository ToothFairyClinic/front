import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { AdvancedImage } from "@cloudinary/react";
import { FC, useMemo } from "react";
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
  const { t } = useTranslation();

  const transformations = useMemo(() => {
    const base = ["w_385", "h_440", "f_auto", "q_auto"];
    if (fitImage) {
      base.unshift("c_pad");
    } else {
      base.unshift("c_fill", "g_face"); // Якщо не pad, то фокусуємось на обличчі
    }
    return base;
  }, [fitImage]);

  const imageCld = useCloudinaryImage(image, transformations);

  return (
    <div className="lg:w-96 dark:text-white bg-white pb-6 rounded-2xl hover:shadow-md dark:shadow-sm dark:shadow-white/20 dark:bg-darkGray transition-shadow duration-300">

      <div className="w-full h-[440px] overflow-hidden rounded-t-2xl bg-gray-100 dark:bg-gray-800">
        <AdvancedImage
          cldImg={imageCld}
          alt={t(name)}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="px-4 mt-4">
        <h3 className="text-2xl mb-1">
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