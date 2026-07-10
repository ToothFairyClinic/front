import { FC, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';


import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { MainTitle } from "@app/common/components/main-title/main-title.component";
import { ServiceItem } from "../components/service-item-component";
import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";
import { useGetServiceBySlugQuery } from "@app/core/types";

interface ServicePageProps { }

export const ServicePage: FC<ServicePageProps> = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); // Ініціалізуємо навігацію

  const prevLangRef = useRef(i18n.language);

  const { data, loading, error } = useGetServiceBySlugQuery({
    variables: { slug: slug! },
  });

  const service = data?.services[0];
  const isEn = i18n.language === 'en';

  useEffect(() => {
    // Якщо сервіс ще не завантажився або мова не змінилася — нічого не робимо
    if (!service || prevLangRef.current === i18n.language) return;

    // Якщо мова змінилася на англійську, а ми не на англійському слюгу
    if (i18n.language === 'en' && slug !== service.slug_en) {
      navigate(`/en/services/${service.slug_en}`, { replace: true });
    }
    // Якщо мова змінилася на українську, а ми не на українському слюгу
    else if ((i18n.language === 'uk' || i18n.language === 'ua') && slug !== service.slug) {
      navigate(`/ua/services/${service.slug}`, { replace: true });
    }


    prevLangRef.current = i18n.language;
  }, [i18n.language, service, slug, navigate]);

  const seoImageObj = useCloudinaryImage(service?.image || "", ["w_800", "q_auto", "f_jpg"]);
  const fullImageUrl = seoImageObj.toURL();

  const title = isEn ? service?.seo_title_en : service?.seo_title;
  const description = isEn ? service?.seo_description_en : service?.seo_description;

  const serviceName = isEn ? (service?.name_en || service?.name) : service?.name;

  if (error) return <ShowInfo type="error"><p>{t("Упс, сталася помилка")}</p></ShowInfo>;
  if (loading) return <ShowInfo type="info"><p>{t("Завантаження...")}</p></ShowInfo>;
  if (!service) return <ShowInfo type="info"><p>{t("На жаль, таку послугу не знайдено")}</p></ShowInfo>;

  const serviceSchema = {
    "@type": "Service",
    "serviceType": "Dentistry",
    "name": serviceName,
    "description": description || (isEn
      ? `Professional ${serviceName} in Bila Tserkva.`
      : `Професійна послуга ${serviceName} у Білій Церкві.`),
    "image": fullImageUrl,
    "provider": {
      "@id": "https://toothfairy.clinic/#organization",
      "@type": "Dentist",
      "name": isEn ? "Tooth Fairy Dental Clinic" : "Стоматологічна клініка Зубна Фея"
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": isEn ? "Bila Tserkva" : "Біла Церква"
    }
  };


  return (
    <>
      <SEOMeta
        title={title || `${serviceName} | ${t("Стоматологія Зубна Фея")}`}
        description={description || (isEn
          ? `Learn more about ${serviceName} at Tooth Fairy Clinic.`
          : `Дізнайтеся більше про послугу ${serviceName} у клініці Зубна Фея.`)}
        path={`/services/${slug}`}
        type="Service"
        schemaData={serviceSchema}
      />

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

export default ServicePage;