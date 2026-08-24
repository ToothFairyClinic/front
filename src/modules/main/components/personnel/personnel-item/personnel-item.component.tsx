import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { AdvancedImage } from "@cloudinary/react";
import { FC, useMemo } from "react";
import { useTranslation } from 'react-i18next';

interface PersonnelCategories {
  __typename?: 'personnel_personnel_categories',
  category: {
    __typename?: 'personnel_categories',
    id: any,
    slug?: string | null,
    title: string,
    title_en?: string | null
  }
}


interface PersonnelItemProps {
  image: string;
  name: string;
  description: string;
  id: string;
  personnel_categories: PersonnelCategories[];
  fitImage?: boolean;
  alt?: string;
}


export const PersonnelItem: FC<PersonnelItemProps> = ({
  image,
  name,
  personnel_categories,
  fitImage = true,
  alt,
}) => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const transformations = useMemo(() => {
    const base = ["w_385", "h_440", "f_auto", "q_auto"];
    if (fitImage) {
      base.unshift("c_pad");
    } else {
      base.unshift("c_fill", "g_face");
    }
    return base;
  }, [fitImage]);

  const imageCld = useCloudinaryImage(image, transformations);

  return (
    <div className="lg:w-96 dark:text-white bg-white pb-6 rounded-2xl hover:shadow-md dark:shadow-sm dark:shadow-white/20 dark:bg-darkGray transition-shadow duration-300">

      <div className="w-full h-[440px] overflow-hidden rounded-t-2xl bg-gray-100 dark:bg-gray-800">
        <AdvancedImage
          cldImg={imageCld}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="px-4 mt-4">
        <h3 className="text-2xl mb-1">
          {t(name)}
        </h3>
        <div className="h-px w-20 bg-paleOlive mt-3" aria-hidden="true"></div>

        <div className="text-lg opacity-80">
          {personnel_categories.map((category, index) => (
            <span key={index}>
              {(isEn && category.category.title_en) ? category.category.title_en : category.category.title}
              {index < personnel_categories.length - 1 && ", "}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
};