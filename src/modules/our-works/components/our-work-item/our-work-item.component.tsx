import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { Our_Works } from "@app/core/types";
import { AdvancedImage } from "@cloudinary/react";
import { FC } from "react";
import { useTranslation } from 'react-i18next';

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
  const transformations = ["w_460", "h_440", "f_auto", "q_auto"]; // Додав авто-формат та якість
  if (fitImage) {
    transformations.unshift("c_pad");
  }
  const { t } = useTranslation();

  // const imageCldAfter = useCloudinaryImage(image_after, transformations);
  const imageCldBefore = useCloudinaryImage(image_before, transformations);

  return (
    <article className="w-96 dark:text-white bg-white pb-6 rounded-2xl hover:shadow-md transition-shadow dark:shadow-white dark:bg-darkGray overflow-hidden">
      <figure>
        <div className="relative">
          <AdvancedImage
            cldImg={imageCldBefore}
            width={460}
            height={440}
            alt={`${t(title)}: ${t("Результат до та після лікування")}`}
            className="w-full h-auto"
          />
        </div>

        <figcaption className="px-4 mt-4">
          <h3 className="text-2xl font-semibold leading-tight">
            {t(title)}
          </h3>
          <div className="h-px w-24 bg-paleOlive mt-2 mb-3"></div>
          <p className="text-sm opacity-90 leading-relaxed">
            {t(description)}
          </p>
        </figcaption>
      </figure>

    </article>
  );
};