import { Button } from "@app/common/components/button/button.component";
import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { Services } from "@app/core/types";
import { AdvancedImage } from "@cloudinary/react";
import { FC, useMemo } from "react";
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


  return (
    <Link
      to={`/${urlLang}/services/${id}`}
      className="group block w-m-[126px] h-m-[126px]  no-underline focus:outline-none focus:ring-2 focus:ring-paleOlive rounded-xl"
    >
      <article className="hover:bg-white/20 flex flex-col justify-center items-center py-5 px-15 rounded-xl w-90 max-w-90 opacity-70 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1">        <div className="mb-4">
        <AdvancedImage
          cldImg={imageCld}
          width={126}
          height={126}
          alt={t(name)}
          loading="lazy"
          className="rounded-t-2xl object-contain w-[126px] h-[126px]"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

        <h3 className="text-white text-3xl text-center font-normal">
          {t(name)}
        </h3>
      </article>
    </Link>
  );
};
