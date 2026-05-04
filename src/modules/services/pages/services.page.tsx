import { FC } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';
import { AdvancedImage } from "@cloudinary/react";

import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { MainTitle } from "@app/common/components/main-title/main-title.component";
import { useGetServiceByIdQuery } from "@app/core/types";
import { ServiceItem } from "../components/service-item-component";

interface ServicePageProps { }

export const ServicePage: FC<ServicePageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();

  // Отримуємо дані з Hasura
  const { data, loading, error } = useGetServiceByIdQuery({
    variables: {
      _eq: id,
    },
  });

  const service = data?.services[0];

  // Визначаємо поточну мову (використовуємо 'en' або префікс 'ua' для логіки полів)
  const isEn = i18n.language === 'en';

  // Динамічні метатеги з бази даних або fallback значення
  const title = isEn ? service?.seo_title_en : service?.seo_title;
  const description = isEn ? service?.seo_description_en : service?.seo_description;
  const serviceName = service?.name ? t(`${service.name}`) : "";

  // Обробка помилки запиту
  if (error) {
    return (
      <ShowInfo type="error">
        <p>{t("Упс, сталася помилка")}</p>
        <p>{t("Спробуйте трохи пізніше")}</p>
      </ShowInfo>
    );
  }

  // Стан завантаження
  if (loading) {
    return (
      <ShowInfo type="info">
        <p>{t("Завантаження...")}</p>
      </ShowInfo>
    );
  }

  // Перевірка наявності даних
  if (!service) {
    return (
      <ShowInfo type="info">
        <p>{t("На жаль, таку послугу не знайдено")}</p>
      </ShowInfo>
    );
  }

  return (
    <>
      <Helmet>
        {/* Динамічний заголовок сторінки */}
        <title>
          {title || `${serviceName} | ${t("Стоматологія Зубна Фея")}`}
        </title>

        {/* Динамічний мета-опис */}
        <meta
          name="description"
          content={description || (isEn
            ? `Learn more about ${serviceName} at Tooth Fairy Clinic.`
            : `Дізнайтеся більше про послугу ${serviceName} у клініці Зубна Фея.`)}
        />

      </Helmet>

      <main className="py-24 flex flex-col gap-16 dark:bg-darkGray min-h-screen">
        <MainTitle darkken={false} size="md">
          {serviceName}
        </MainTitle>

        <div className="lg:px-24 px-6">
          <ServiceItem {...service} />
        </div>
      </main>
    </>
  );
};