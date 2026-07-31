import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { ServicesListItem } from "@app/modules/main/components/services-main/services-main-list/services-main-list.component";
import { AdvancedImage } from "@cloudinary/react";
import { FC } from "react";
import { useTranslation } from 'react-i18next';
import DOMPurify from 'isomorphic-dompurify';

interface ServiceItemProps {
  fitImage?: boolean;
}

export const ServiceItem: FC<ServiceItemProps & ServicesListItem> = ({
  fitImage = true,
  name,
  description,
  description_en,
  mainImage,
}) => {

  const { t, i18n } = useTranslation();

  const isEn = i18n.language === 'en';

  const transformations = ["w_600", "h_526"];
  if (fitImage) {
    transformations.unshift("c_pad", "b_transparent");
  }

  const imageCld = useCloudinaryImage(mainImage!, transformations);

  const currentDescription = isEn ? description_en : description;

  if (!currentDescription) {
    return null;
  }

  const sanitizedHtml = DOMPurify.sanitize(currentDescription, {
    ADD_ATTR: ['target'],
  });
  const className = "text-xl dark:text-white text-left"

  return (
    <div className="">
      <div className="float-left lg:mr-6 lg:mb-6">
        <AdvancedImage
          cldImg={imageCld}
          width={600}
          height={526}
          className="rounded-2xl w-full h-auto shadow-lg"
          alt={t(name || "service image")}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div
        className={`prose dark:prose-invert max-w-none ${className}`}
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    </div>
  );
};
