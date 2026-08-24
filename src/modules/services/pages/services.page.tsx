import { FC, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { ServiceItem } from "../components/service-item-component";
import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";
import { useGetServiceBySlugQuery } from "@app/core/types";
import { AdvancedImage } from "@cloudinary/react";

const DoctorImageItem: FC<{ imagePublicId: string; altText: string }> = ({ imagePublicId, altText }) => {
  const transformations = useMemo(() => ["w_100", "h_100", "f_auto", "q_auto", "c_fill"], []);
  const cldImg = useCloudinaryImage(imagePublicId, transformations);

  return (
    <AdvancedImage
      cldImg={cldImg}
      alt={altText}
      className="w-12 h-12 rounded-lg object-cover"
    />
  );
};

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
    skip: !slug,
  });

  const service = data?.services[0];
  const isEn = i18n.language === "en";
  const currentLang = isEn ? "en" : "ua";

  useEffect(() => {
    if (!service || prevLangRef.current === i18n.language) return;

    if (i18n.language === "en" && slug !== service.slug_en) {
      navigate(`/en/services/${service.slug_en}`, { replace: true });
    } else if ((i18n.language === "uk" || i18n.language === "ua") && slug !== service.slug) {
      navigate(`/ua/services/${service.slug}`, { replace: true });
    }

    prevLangRef.current = i18n.language;
  }, [i18n.language, service, slug, navigate]);

  const seoImageObj = useCloudinaryImage(service?.image || "", ["w_800", "q_auto", "f_jpg"]);
  const fullImageUrl = seoImageObj.toURL();

  const title = isEn ? service?.seo_title_en : service?.seo_title;
  const description = isEn ? service?.seo_description_en : service?.seo_description;
  const serviceName = isEn ? (service?.name_en || service?.name) : service?.name;
  const altText = isEn ? service?.image_alt_en : service?.image_alt;

  const rawFaq = isEn ? service?.faq_en : service?.faq_ua;
  const faqList: FAQItem[] = useMemo(() => {
    if (!rawFaq) return [];

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

  const schemaGraph = useMemo((): Record<string, any>[] | undefined => {
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
      return [serviceSchema];
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
        <h1 className="md:text-6xl text-3xl border-b border-paleOlive px-10 py-3 z-10 text-darkGray dark:text-white lg:w-165">
          {serviceName}
        </h1>

        <div className="lg:px-24 px-6 flex flex-col gap-16">
          <ServiceItem {...service} altText={altText} />

          {faqList.length > 0 && (
            <section className="flex flex-col gap-6 w-full mx-auto mt-8">
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
                          className="w-4 h-4 ml-1 transition-transform duration-200"
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

          {service.personnel_services && service.personnel_services.length > 0 && (
            <section className="flex flex-col gap-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white border-b pb-4 border-paleOlive">
                {t("Фахівці, які надають цю послугу")}
              </h2>
              <div className="flex flex-wrap gap-4">
                {service.personnel_services.map((item) => {
                  const doctor = item.personnel;
                  if (!doctor) return null;

                  const doctorName = isEn ? (doctor.name_en || doctor.name) : doctor.name;
                  const doctorSlug = isEn ? (doctor.slug_en || doctor.slug || doctor.id) : (doctor.slug || doctor.id);

                  const primaryCategory = doctor.categories?.[0]?.category;
                  const doctorCategoryTitle = primaryCategory
                    ? (isEn && primaryCategory.title_en ? primaryCategory.title_en : primaryCategory.title)
                    : t("Лікар-стоматолог");

                  return (
                    <Link
                      key={doctor.id}
                      to={`/${currentLang}/doctors/${doctorSlug}`}
                      className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm hover:shadow-md transition-all"
                    >
                      {doctor.image ? (
                        <DoctorImageItem
                          imagePublicId={doctor.image}
                          altText={doctorName}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-paleOlive flex items-center justify-center text-gray-500 text-sm font-bold">
                          {doctorName?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {doctorName}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {doctorCategoryTitle}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
};

export default ServicePage;