import { FC, useEffect, useRef, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { MainTitle } from "@app/common/components/main-title/main-title.component";
import { ServiceItem } from "../components/service-item-component";
import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";
import { useGetServiceBySlugQuery } from "@app/core/types";
import clsx from "clsx";

// 1. Інтерфейс для елемента FAQ
export interface FAQItem {
  question: string;
  answer: string;
}

interface ServicePageProps { }

export const ServicePage: FC<ServicePageProps> = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const prevLangRef = useRef(i18n.language);

  const { data, loading, error } = useGetServiceBySlugQuery({
    variables: { slug: slug! },
  });

  const service = data?.services[0];
  const isEn = i18n.language === 'en';

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!service || prevLangRef.current === i18n.language) return;

    if (i18n.language === 'en' && slug !== service.slug_en) {
      navigate(`/en/services/${service.slug_en}`, { replace: true });
    } else if ((i18n.language === 'uk' || i18n.language === 'ua') && slug !== service.slug) {
      navigate(`/ua/services/${service.slug}`, { replace: true });
    }

    prevLangRef.current = i18n.language;
  }, [i18n.language, service, slug, navigate]);

  const seoImageObj = useCloudinaryImage(service?.image || "", ["w_800", "q_auto", "f_jpg"]);
  const fullImageUrl = seoImageObj.toURL();

  const title = isEn ? service?.seo_title_en : service?.seo_title;
  const description = isEn ? service?.seo_description_en : service?.seo_description;
  const serviceName = isEn ? (service?.name_en || service?.name) : service?.name;

  // 2. Безпечне нормалізування та отримання FAQ масиву залежно від мови
  const rawFaq = isEn ? service?.faq_en : service?.faq_ua;
  const faqList: FAQItem[] = useMemo(() => {
    if (!rawFaq) return [];

    // Якщо GraphQL/Hasura повернула JSON-рядок замість об'єкта
    if (typeof rawFaq === "string") {
      try {
        const parsed = JSON.parse(rawFaq);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.error("Failed to parse FAQ JSON string", e);
        return [];
      }
    }

    return Array.isArray(rawFaq) ? (rawFaq as FAQItem[]) : [];
  }, [rawFaq]);

  // 3. Генерація Schema.org даних
  const schemaGraph = useMemo((): Record<string, any> | Record<string, any>[] | undefined => {
    if (!service) return undefined;

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

    if (!faqList || faqList.length === 0) {
      return [serviceSchema]; // Повертаємо масив
    }

    const faqSchema = {
      "@type": "FAQPage",
      "mainEntity": faqList.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    // Повертаємо плоский масив сутностей
    return [serviceSchema, faqSchema];
  }, [service, serviceName, description, isEn, fullImageUrl, faqList]);

  if (error) return <ShowInfo type="error"><p>{t("Упс, сталася помилка")}</p></ShowInfo>;
  if (loading) return <ShowInfo type="info"><p>{t("Завантаження...")}</p></ShowInfo>;
  if (!service) return <ShowInfo type="info"><p>{t("На жаль, таку послугу не знайдено")}</p></ShowInfo>;


  return (
    <>
      <SEOMeta
        title={title || `${serviceName} | ${t("Стоматологія Зубна Фея")}`}
        description={description || (isEn
          ? `Learn more about ${serviceName} at Tooth Fairy Clinic.`
          : `Дізнайтеся більше про послугу ${serviceName} у клініці Зубна Фея.`)}
        type="Service"
        schemaData={schemaGraph}
        robots={service?.custom_robots}
      />

      <main className="py-24 flex flex-col gap-16 dark:bg-darkGray min-h-screen">
        <h1 className="md:text-6xl text-3xl  border-b border-paleOlive px-10  py-3 z-10 text-darkGray dark:text-white text-white lg:w-165">
          {serviceName}
        </h1>

        <div className="lg:px-24 px-6 flex flex-col gap-16">
          <ServiceItem {...service} />

          {/* 4. Візуальне відображення FAQ */}
          {faqList.length > 0 && (
            <section className="flex flex-col gap-6  w-full mx-auto mt-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white border-b pb-4 border-paleOlive">
                {t("Часті запитання")}
              </h2>

              <div className="flex flex-col gap-4">
                {faqList.map((item, index) => (
                  <details
                    key={index}
                    className="group border-paleOlive p-6 rounded-lg shadow-sm border transition-all [&[open]]:shadow-md"
                  >
                    <summary className="flex justify-between items-center font-semibold text-lg cursor-pointer list-none text-gray-900 dark:text-white select-none">
                      <span>{item.question}</span>
                      <span className="transition group-open:rotate-180 ml-4 shrink-0 text-gray-500">
                        <svg
                          className={clsx(
                            'w-4 h-4 ml-1 transition-transform duration-200',
                            isOpen && 'rotate-180'
                          )}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
};

export default ServicePage;