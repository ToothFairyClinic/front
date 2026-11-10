import { FC, useEffect, useRef, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "@app/common/router/router";
import { useTranslation } from "react-i18next";
import { Helmet } from "@app/common/components/head/head";
import { useGetDoctorBySlugQuery } from "@app/core/types";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";
import { Breadcrumbs, buildBreadcrumbSchema, Crumb } from "@app/common/components/breadcrumbs/breadcrumbs.component";
import { HtmlContent } from "@app/common/components/html-content/html-content.component";
import { ConsultationModal } from "@app/common/components/consultation-modal/lazy-consultation-modal";
import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { AdvancedImage } from "@cloudinary/react";
import { doctorPath, doctorsPath } from "@app/common/utils/doctors-path";
import { categoriesLine, categoryTitle, experienceText as formatExperience } from "@app/common/utils/doctor-format";

const BASE_URL = "https://toothfairy.clinic";
const CLOUD = "https://res.cloudinary.com/dc7d3byxg/image/upload";

const PHONES = [
  { href: "tel:+380681689911", label: "+38 (068) 168-99-11" },
  { href: "tel:+380934599911", label: "+38 (093) 459-99-11" },
];

const COPY = {
  ua: {
    experience: "Досвід роботи",
    specialties: "Спеціалізація",
    about: "Освіта та досвід",
    fallback: (name: string, specialties: string) =>
      `${name} приймає пацієнтів у стоматології Зубна Фея в Білій Церкві${specialties ? ` (${specialties.toLowerCase()})` : ""}. Записатися на консультацію можна телефоном або через форму на сайті.`,
    services: "Напрями роботи та послуги",
    certificates: "Дипломи та сертифікати",
    openCertificate: (index: number) => `Відкрити сертифікат ${index} у повному розмірі`,
    allDoctors: "Усі лікарі",
    alt: (name: string) => `${name}, стоматолог клініки Зубна Фея`,
    seoTitle: (name: string) => `${name}, стоматолог клініки Зубна Фея у Білій Церкві`,
  },
  en: {
    experience: "Experience",
    specialties: "Specialty",
    about: "Education and experience",
    fallback: (name: string, specialties: string) =>
      `${name} sees patients at Tooth Fairy dental clinic in Bila Tserkva${specialties ? ` (${specialties.toLowerCase()})` : ""}. You can book a consultation by phone or with the form on the site.`,
    services: "Areas of work and services",
    certificates: "Diplomas and certificates",
    openCertificate: (index: number) => `Open certificate ${index} in full size`,
    allDoctors: "All doctors",
    alt: (name: string) => `${name}, dentist at Tooth Fairy Dental Clinic`,
    seoTitle: (name: string) => `${name}, Dentist at Tooth Fairy Clinic in Bila Tserkva`,
  },
};

/** Інлайн-кольори з редактора адмінки (майже білий текст) не мають перебивати колір сторінки. */
const ADMIN_COLOR_RESET = "[&_[style*='color']]:!text-inherit [&_[style*='background']]:!bg-transparent";

const ServiceImage: FC<{ publicId: string }> = ({ publicId }) => {
  const transformations = useMemo(() => ["c_fill", "w_112", "h_112", "f_auto", "q_auto"], []);
  const cldImg = useCloudinaryImage(publicId, transformations);
  return <AdvancedImage cldImg={cldImg} alt="" width={56} height={56} loading="lazy" className="w-14 h-14 shrink-0 rounded-xl object-cover bg-palePeach" />;
};

const CertificateImage: FC<{ publicId: string; alt: string }> = ({ publicId, alt }) => {
  const transformations = useMemo(() => ["c_pad", "b_auto", "w_480", "h_600", "f_auto", "q_auto"], []);
  const cldImg = useCloudinaryImage(publicId, transformations);
  return <AdvancedImage cldImg={cldImg} alt={alt} width={480} height={600} loading="lazy" className="block w-full h-auto aspect-[4/5] object-cover bg-white" />;
};

export const DoctorDetailPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const { data, loading, error } = useGetDoctorBySlugQuery({
    variables: { slug: slug! },
    skip: !slug,
  });

  const prevLangRef = useRef(i18n.language);
  const doctor = data?.personnel[0];
  const isEn = i18n.language === "en";
  const lang = isEn ? "en" : "ua";
  const copy = COPY[lang];

  useEffect(() => {
    if (!doctor || prevLangRef.current === i18n.language) return;

    if (isEn && doctor.slug_en && slug !== doctor.slug_en) {
      navigate(doctorPath("en", doctor.slug_en), { replace: true });
    } else if (!isEn && doctor.slug && slug !== doctor.slug) {
      navigate(doctorPath("ua", doctor.slug), { replace: true });
    }

    prevLangRef.current = i18n.language;
  }, [i18n.language, doctor, slug, navigate, isEn]);

  const doctorName = (isEn && doctor?.name_en) || doctor?.name || "";
  const descriptionHtml = (isEn && doctor?.description_en) || doctor?.description || "";
  const specialties = categoriesLine(doctor?.categories, isEn);
  const experience = formatExperience(doctor?.experience, doctor?.experience_en, isEn);

  const plainDescription = useMemo(
    () =>
      descriptionHtml
        .replace(/<[^>]*>?/gm, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
    [descriptionHtml]
  );
  const fallbackText = copy.fallback(doctorName, specialties);

  const seoTitle = (isEn ? doctor?.seo_title_en : doctor?.seo_title) || copy.seoTitle(doctorName);
  const seoDescription =
    (isEn ? doctor?.seo_description_en : doctor?.seo_description) || (plainDescription || fallbackText).slice(0, 300);

  const activeSlug = isEn ? doctor?.slug_en || doctor?.slug : doctor?.slug || doctor?.slug_en;
  const pagePath = doctorPath(lang, activeSlug);

  const crumbs: Crumb[] = useMemo(
    () => [
      { label: t("Головна"), to: `/${lang}` },
      { label: t("Лікарі"), to: doctorsPath(lang) },
      { label: doctorName },
    ],
    [t, lang, doctorName]
  );

  const doctorSchema = useMemo(() => {
    if (!doctor) return null;
    return [
      buildBreadcrumbSchema(crumbs, BASE_URL, `${BASE_URL}${pagePath}/#breadcrumb`),
      {
        "@type": "Person",
        "@id": `${BASE_URL}${pagePath}/#person`,
        name: doctorName,
        jobTitle: doctor.categories?.map((item) => categoryTitle(item, isEn)).filter(Boolean),
        description: plainDescription || fallbackText,
        image: `${CLOUD}/c_fill,g_auto,w_385,h_440,f_jpg,q_auto/${doctor.image}`,
        url: `${BASE_URL}${pagePath}`,
        mainEntityOfPage: { "@id": `${BASE_URL}${pagePath}/#webpage` },
        worksFor: { "@id": `${BASE_URL}/#organization` },
      },
    ];
  }, [doctor, crumbs, pagePath, doctorName, isEn, plainDescription, fallbackText]);

  const photoTransformations = useMemo(() => ["c_fill", "g_auto", "w_385", "h_440", "f_auto", "q_auto"], []);
  const photoCld = useCloudinaryImage(doctor?.image || "", photoTransformations);

  if (error) return <ShowInfo type="error"><p>{t("Упс, сталася помилка")}</p></ShowInfo>;
  if (loading) return <ShowInfo type="info"><p>{t("Завантаження...")}</p></ShowInfo>;
  if (!doctor) return (
    <>
      <Helmet>
        <title>{t("Сторінку не знайдено | Стоматологія Зубна Фея")}</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <ShowInfo type="info"><p>{t("На жаль, такого лікаря не знайдено")}</p></ShowInfo>
    </>
  );

  const certificates: string[] = (
    Array.isArray(doctor.certificates)
      ? doctor.certificates
      : typeof doctor.certificates === "string"
        ? JSON.parse(doctor.certificates || "[]")
        : []
  ).filter(Boolean);

  const services = (doctor.personnel_services ?? []).map((item) => item.service).filter(Boolean);
  // іконки показуємо, лише коли вони є в усіх послуг, інакше назви стоять нерівно
  const showServiceIcons = services.length > 0 && services.every((service) => Boolean(service.image));
  const alt = (isEn ? doctor.image_alt_en : doctor.image_alt) || copy.alt(doctorName);

  return (
    <>
      <SEOMeta
        title={seoTitle}
        description={seoDescription}
        path={pagePath}
        pathUa={doctorPath("ua", doctor.slug || activeSlug)}
        pathEn={doctorPath("en", doctor.slug_en || activeSlug)}
        type="AboutPage"
        schemaData={doctorSchema || undefined}
        hasBreadcrumbs={false}
      />

      <main className="pt-10 lg:pt-12 pb-16 min-h-screen">
        <div className="px-4 md:px-10">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-12 md:gap-16">
            <section className="flex flex-col gap-6">
              <Breadcrumbs items={crumbs} />
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start">
                <div className="md:col-span-5 lg:col-span-4 w-full max-w-md md:max-w-none overflow-hidden rounded-[1.25rem] bg-white border border-black/5">
                  {/* Головне фото - LCP сторінки: одразу і з високим пріоритетом, розміри 385x440 резервують місце (CLS) */}
                  <AdvancedImage
                    cldImg={photoCld}
                    alt={alt}
                    loading="eager"
                    width={385}
                    height={440}
                    className="block w-full h-auto aspect-[7/8] object-cover"
                    {...{ fetchpriority: "high" }}
                  />
                </div>

                <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-6 md:gap-8 text-darkGray">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">{doctorName}</h1>
                  <dl className="flex flex-col gap-4 text-lg md:text-xl">
                    {specialties && (
                      <div className="flex flex-col gap-1">
                        <dt className="text-base font-semibold">{copy.specialties}</dt>
                        <dd className="text-darkGray/80 leading-relaxed">{specialties}</dd>
                      </div>
                    )}
                    {experience && (
                      <div className="flex flex-col gap-1">
                        <dt className="text-base font-semibold">{copy.experience}</dt>
                        <dd className="text-darkGray/80 leading-relaxed">{experience}</dd>
                      </div>
                    )}
                  </dl>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setIsConsultationOpen(true)}
                      className="inline-flex items-center justify-center font-semibold text-base sm:text-lg px-8 py-3.5 rounded-full bg-darkGray text-white hover:bg-black transition-colors duration-150 active:scale-[0.98]"
                    >
                      {t("Записатися на консультацію")}
                    </button>
                    <a
                      href={PHONES[0].href}
                      className="inline-flex items-center justify-center font-semibold text-base sm:text-lg px-8 py-3 rounded-full border-2 border-darkGray text-darkGray hover:bg-darkGray hover:text-white transition-colors duration-150 active:scale-[0.98]"
                    >
                      {PHONES[0].label}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <article className="flex flex-col gap-6 min-w-0 max-w-4xl">
              {descriptionHtml.trim() ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-normal leading-tight text-darkGray">{copy.about}</h2>
                  <HtmlContent
                    html={descriptionHtml}
                    fallbackAlt={doctorName}
                    className={`prose-p:leading-relaxed prose-p:my-3 prose-ul:my-3 prose-li:my-1 [&_li>p]:my-0 prose-strong:font-semibold [&_u]:no-underline ${ADMIN_COLOR_RESET}`}
                  />
                </>
              ) : (
                <p className="text-lg md:text-xl leading-relaxed text-darkGray/80">{fallbackText}</p>
              )}
            </article>

            {services.length > 0 && (
              <section aria-labelledby="doctor-services-title" className="flex flex-col gap-6 md:gap-8">
                <h2 id="doctor-services-title" className="text-3xl md:text-4xl font-normal leading-tight text-darkGray">
                  {copy.services}
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0">
                  {services.map((service) => {
                    const name = (isEn && service.name_en) || service.name;
                    const serviceSlug = (isEn && service.slug_en) || service.slug;
                    return (
                      <li key={service.id}>
                        <Link
                          to={`/${lang}/services/${serviceSlug}`}
                          className="group h-full flex items-center gap-4 rounded-2xl bg-white border border-black/5 hover:border-darkGray/30 p-4 transition-colors duration-150"
                        >
                          {showServiceIcons && <ServiceImage publicId={service.image as string} />}
                          <span className="flex-1 text-lg font-semibold leading-snug text-darkGray underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-darkGray/40 transition-colors duration-150">
                            {name}
                          </span>
                          <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 text-darkGray" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

            {certificates.length > 0 && (
              // один-два сертифікати ставимо поруч із заголовком, щоб справа не лишався порожній ряд
              <section
                aria-labelledby="doctor-certificates-title"
                className={
                  certificates.length <= 2
                    ? "flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-8 lg:gap-16 md:items-start"
                    : "flex flex-col gap-6 md:gap-8"
                }
              >
                <h2
                  id="doctor-certificates-title"
                  className={`text-3xl md:text-4xl font-normal leading-tight text-darkGray ${certificates.length <= 2 ? "md:col-span-4" : ""}`}
                >
                  {copy.certificates}
                </h2>
                <ul
                  className={`grid gap-4 md:gap-6 list-none p-0 ${
                    certificates.length <= 2 ? "grid-cols-2 md:col-span-8 lg:col-span-6" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                  }`}
                >
                  {certificates.map((publicId, index) => (
                    <li key={publicId}>
                      <a
                        href={`${CLOUD}/c_limit,w_1600,f_auto,q_auto/${publicId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={copy.openCertificate(index + 1)}
                        className="block overflow-hidden rounded-xl border border-black/5 hover:border-darkGray/30 transition-colors duration-150"
                      >
                        <CertificateImage publicId={publicId} alt={`${t("Сертифікат")} ${index + 1}, ${doctorName}`} />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <Link
              to={doctorsPath(lang)}
              className="self-start inline-flex items-center gap-2 text-lg font-semibold text-darkGray underline decoration-darkGray/30 decoration-2 underline-offset-4 hover:decoration-darkGray transition-colors duration-150"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
              {copy.allDoctors}
            </Link>
          </div>
        </div>
        <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
      </main>
    </>
  );
};

export default DoctorDetailPage;
