import { FC, useEffect, useRef, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { HtmlContent } from "@app/common/components/html-content/html-content.component";
import { ConsultationModal } from "@app/common/components/consultation-modal/consultation-modal.component";
import { SectionHeading } from "@app/modules/main/components/section-heading/section-heading.component";
import { HomeFaq } from "@app/modules/main/components/home-faq/home-faq.component";
import { ServicePrices } from "../components/service-prices.component";
import { SubServices } from "../components/sub-services.component";
import { ServiceBookingCard } from "../components/service-booking-card.component";
import { PriceListRow, useGetServiceExtrasQuery } from "../graphql/service-extras";
import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";
import { Breadcrumbs, buildBreadcrumbSchema, Crumb } from "@app/common/components/breadcrumbs/breadcrumbs.component";
import { useGetServiceBySlugQuery } from "@app/core/types";
import { AdvancedImage } from "@cloudinary/react";
import { doctorPath } from "@app/common/utils/doctors-path";

const DoctorImageItem: FC<{ imagePublicId: string; altText: string }> = ({ imagePublicId, altText }) => {
  const transformations = useMemo(() => ["w_128", "h_128", "f_auto", "q_auto", "c_fill", "g_face"], []);
  const cldImg = useCloudinaryImage(imagePublicId, transformations);

  return (
    <AdvancedImage
      cldImg={cldImg}
      alt={altText}
      className="w-16 h-16 rounded-xl object-cover shrink-0"
    />
  );
};

const HERO_TRANSFORMATIONS = ["c_fill", "g_auto", "w_960", "h_720", "f_auto", "q_auto"];

const ServiceHeroImage: FC<{ publicId: string; alt: string }> = ({ publicId, alt }) => {
  const cldImg = useCloudinaryImage(publicId, HERO_TRANSFORMATIONS);
  return <AdvancedImage cldImg={cldImg} alt={alt} width={960} height={720} className="w-full h-full object-cover" />;
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
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const { data: extras } = useGetServiceExtrasQuery(service?.id);
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
  const pageHeading = (isEn ? (service?.h1_en || service?.h1) : service?.h1) || serviceName;
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

  const summary = isEn ? extras?.services_by_pk?.summary_en : extras?.services_by_pk?.summary;

  const priceRows: PriceListRow[] = useMemo(() => {
    const refs = extras?.services_by_pk?.price_items ?? [];
    const byId = new Map((extras?.price_list ?? []).map((row) => [row.id, row]));
    return refs.flatMap((ref) => byId.get(ref.price_list_id) ?? []);
  }, [extras]);

  const crumbs: Crumb[] = useMemo(() => {
    if (!service) return [];

    const parent = service.parent_service;
    const parentName = parent ? (isEn ? parent.name_en || parent.name : parent.name) : null;
    const parentSlug = parent ? (isEn ? parent.slug_en || parent.slug : parent.slug) : null;

    return [
      { label: t("Головна"), to: `/${currentLang}` },
      { label: t("Послуги"), to: `/${currentLang}/services` },
      ...(parentName && parentSlug
        ? [{ label: parentName, to: `/${currentLang}/services/${parentSlug}` }]
        : []),
      { label: serviceName || "" },
    ];
  }, [service, serviceName, isEn, currentLang, t]);

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

    const breadcrumbSchema = buildBreadcrumbSchema(
      crumbs,
      "https://toothfairy.clinic",
      `https://toothfairy.clinic/${currentLang}/services/${slug}/#breadcrumb`
    );

    if (!faqList || faqList.length === 0) {
      return [serviceSchema, breadcrumbSchema];
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

    return [serviceSchema, faqSchema, breadcrumbSchema];
  }, [service, serviceName, description, isEn, fullImageUrl, faqList, crumbs, currentLang, slug]);

  if (error) return <ShowInfo type="error"><p>{t("Упс, сталася помилка")}</p></ShowInfo>;
  if (loading) return <ShowInfo type="info"><p>{t("Завантаження...")}</p></ShowInfo>;
  if (!service) return (
      <>
          <Helmet>
              <title>{t("Сторінку не знайдено | Стоматологія Зубна Фея")}</title>
              <meta name="robots" content="noindex, follow" />
          </Helmet>
          <ShowInfo type="info"><p>{t("На жаль, таку послугу не знайдено")}</p></ShowInfo>
      </>
  );

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
        hasBreadcrumbs={false}
        pathUa={`/services/${service.slug || slug}`}
        pathEn={`/services/${service.slug_en || service.slug || slug}`}
      />

      <main className="pt-10 lg:pt-12 pb-16 dark:bg-darkGray min-h-screen">
        <div className="px-4 md:px-10">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-12 md:gap-16">
            <section className="flex flex-col gap-6">
              <Breadcrumbs items={crumbs} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="flex flex-col gap-6 md:gap-8">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-darkGray dark:text-white">
                    {pageHeading}
                  </h1>
                  {summary && (
                    <p className="text-lg md:text-xl leading-relaxed text-darkGray/80 dark:text-white/80 max-w-2xl">
                      {summary}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setIsConsultationOpen(true)}
                      className="inline-flex items-center justify-center font-semibold text-base sm:text-lg px-8 py-3.5 rounded-full bg-darkGray text-white hover:bg-black dark:bg-paleOlive dark:text-darkGray dark:hover:bg-white transition-all duration-300 shadow-md hover:shadow-xl active:scale-95"
                    >
                      {t("Записатися на консультацію")}
                    </button>
                    {priceRows.length > 0 && (
                      <button
                        type="button"
                        onClick={() => document.getElementById("prices")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                        className="inline-flex items-center justify-center font-semibold text-base sm:text-lg px-8 py-3 rounded-full border-2 border-darkGray text-darkGray hover:bg-darkGray hover:text-white dark:border-paleOlive dark:text-paleOlive dark:hover:bg-paleOlive dark:hover:text-darkGray transition-colors duration-300"
                      >
                        {t("Ціни")}
                      </button>
                    )}
                  </div>
                </div>
                {service.mainImage && (
                  <div className="w-full aspect-[4/3] overflow-hidden rounded-[2rem] bg-paleOlive/40">
                    <ServiceHeroImage publicId={service.mainImage} alt={altText || pageHeading || ""} />
                  </div>
                )}
              </div>
            </section>

            <SubServices title={t("Послуги напрямку")} items={extras?.sub_services ?? []} isEn={isEn} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <article className="lg:col-span-8">
                <HtmlContent
                  html={isEn ? service.description_en : service.description}
                  className="prose-p:leading-relaxed prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:font-normal prose-h2:mt-12 prose-h2:mb-5 prose-h3:text-2xl prose-h3:font-semibold"
                />
              </article>
              <aside className="lg:col-span-4 lg:sticky lg:top-28">
                <ServiceBookingCard hasPrices={priceRows.length > 0} />
              </aside>
            </div>

            <ServicePrices title={`${t("Ціни")}: ${serviceName}`} rows={priceRows} isEn={isEn} />

            {faqList.length > 0 && (
              <HomeFaq title={t("Часті запитання")} items={faqList} embedded />
            )}

            {service.personnel_services && service.personnel_services.length > 0 && (
              <section aria-labelledby="service-doctors-title" className="flex flex-col gap-6">
                <SectionHeading id="service-doctors-title" title={t("Фахівці, які надають цю послугу")} />
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 list-none p-0">
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
                      <li key={doctor.id}>
                        <Link
                          to={doctorPath(currentLang, doctorSlug)}
                          className="h-full flex items-center gap-4 bg-white dark:bg-white/5 p-4 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow"
                        >
                          {doctor.image ? (
                            <DoctorImageItem imagePublicId={doctor.image} altText={doctorName} />
                          ) : (
                            <div className="w-16 h-16 rounded-xl bg-paleOlive flex items-center justify-center text-gray-500 font-bold">
                              {doctorName?.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div className="text-base font-semibold text-darkGray dark:text-white">{doctorName}</div>
                            <div className="text-sm text-darkGray/70 dark:text-gray-400">{doctorCategoryTitle}</div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </div>
        </div>
        <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
      </main>
    </>
  );
};

export default ServicePage;