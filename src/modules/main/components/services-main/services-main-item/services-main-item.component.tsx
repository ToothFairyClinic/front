import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { AdvancedImage } from "@cloudinary/react";
import { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ServicesListItem } from "../services-main-list/services-main-list.component";


interface ServicesItemProps {
  fitImage?: boolean;
}

type TestServicesItemProps = Pick<ServicesListItem, 'name' | 'slug' | 'slug_en' | 'image' | 'name_en'>


export const ServicesItem: FC<ServicesItemProps & TestServicesItemProps> = ({
  image,
  name,
  name_en,
  slug,
  slug_en,
  fitImage = true,
}) => {

  const transformations = useMemo(() => {
    const base = ["w_126", "h_126", "f_auto", "q_auto", "dpr_auto"];
    if (fitImage) {
      base.unshift("c_pad");
    }
    return base;
  }, [fitImage]);

  const imageCld = useCloudinaryImage(image, transformations);
  const { t, i18n } = useTranslation();

  const urlLang = i18n.language === 'uk' ? 'ua' : i18n.language;

  const currentName = i18n.language === 'en' ? name_en : name;

  return (
    <Link
      to={`/${urlLang}/services/${urlLang === 'en' ? slug_en : slug}`}
      className="group block w-m-[126px] h-m-[126px]  no-underline focus:outline-none focus:ring-2 focus:ring-paleOlive rounded-xl"
    >
      <article className="hover:bg-white/20 flex flex-col justify-center items-center py-5 px-15 rounded-xl w-90 max-w-90 opacity-70 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1">        <div className="mb-4">
        <AdvancedImage
          cldImg={imageCld}
          width={126}
          height={126}
          alt={currentName}
          loading="lazy"
          className="rounded-t-2xl object-contain w-[126px] h-[126px]"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

        <h3 className="text-white text-3xl text-center font-normal">
          {currentName}
        </h3>
      </article>
    </Link>
  );
};
