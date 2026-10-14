import { FC } from "react";
import { useTranslation } from "react-i18next";

/**
 * Серверна версія блоку запису внизу сторінки: заголовок і текст одразу в HTML,
 * а сама форма з валідацією підвантажується в браузері й займає те саме місце.
 */
export const PreFooterPlaceholder: FC = () => {
  const { t } = useTranslation();
  return (
    <section
      className="w-full bg-paleOlive/25 dark:bg-darkGray/90 border-t border-paleOlive/50 dark:border-paleOlive/20 py-12 md:py-16 transition-colors duration-300"
      aria-label={t("Записатись на консультацію")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          <div className="lg:w-5/12 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-darkGray dark:text-white mb-3">
              {t("Записатись на консультацію")}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t("Заповніть форму, і наш адміністратор зв'яжеться з вами, щоб уточнити деталі та підібрати зручний час.")}
            </p>
          </div>
          <div className="lg:w-7/12 w-full min-h-[184px] sm:min-h-[76px]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};
