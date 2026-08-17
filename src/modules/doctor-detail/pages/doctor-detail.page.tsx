import { FC, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetDoctorBySlugQuery } from "@app/core/types";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";
import { MainTitle } from "@app/common/components/main-title/main-title.component";
import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { AdvancedImage } from "@cloudinary/react";
import DOMPurify from "isomorphic-dompurify";

// ----------------------------------------------------------------------
// Допоміжні компоненти для безпечного виклику useCloudinaryImage у .map()
// ----------------------------------------------------------------------

const ServiceImageItem: FC<{ imagePublicId: string; altText: string }> = ({ imagePublicId, altText }) => {
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

const CertificateImageItem: FC<{ certPublicId: string; altText: string }> = ({ certPublicId, altText }) => {
    const transformations = useMemo(() => ["w_500", "h_600", "f_auto", "q_auto", "c_fit"], []);
    const cldImg = useCloudinaryImage(certPublicId, transformations);

    return (
        <AdvancedImage
            cldImg={cldImg}
            alt={altText}
            className="w-full h-48 object-cover"
        />
    );
};

// ----------------------------------------------------------------------
// Основна сторінка детальної інформації про лікаря
// ----------------------------------------------------------------------

export const DoctorDetailPage: FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const { data, loading, error } = useGetDoctorBySlugQuery({
        variables: {
            slug: slug!,
        },
        skip: !slug,
    });

    const prevLangRef = useRef(i18n.language);
    const doctor = data?.personnel[0];
    const isEn = i18n.language === "en";
    const currentLang = isEn ? "en" : "ua";
    const baseUrl = "https://toothfairy.clinic";

    // Автоматична зміна URL при зміні мови сайту
    useEffect(() => {
        if (!doctor || prevLangRef.current === i18n.language) return;

        if (isEn && doctor.slug_en && slug !== doctor.slug_en) {
            navigate(`/en/doctors/${doctor.slug_en}`, { replace: true });
        } else if (!isEn && doctor.slug && slug !== doctor.slug) {
            navigate(`/ua/doctors/${doctor.slug}`, { replace: true });
        }

        prevLangRef.current = i18n.language;
    }, [i18n.language, doctor, slug, navigate, isEn]);

    // Динамічні текстові поля
    const doctorName = isEn ? (doctor?.name_en || doctor?.name) : doctor?.name;
    const currentDescription = isEn ? (doctor?.description_en || doctor?.description) : doctor?.description;

    // 1. Очищення та санітизація HTML для рендерингу в DOM
    const sanitizedHtml = useMemo(() => {
        if (!currentDescription) return "";
        const cleaned = currentDescription.replace(/<p>\s*(?:&nbsp;|&#160;|ㅤ)?\s*<\/p>/gi, "");
        return DOMPurify.sanitize(cleaned, {
            ADD_ATTR: ["target"],
            FORBID_ATTR: ["style", "color"],
            FORBID_TAGS: ["font"],
        });
    }, [currentDescription]);

    // 2. Очищення від ВСІХ HTML-тегів для метатегів та Schema.org
    const seoCleanDescription = useMemo(() => {
        if (!currentDescription) return "";
        return currentDescription
            .replace(/<[^>]*>?/gm, "") // Видаляємо всі HTML-теги
            .replace(/\s+/g, " ")      // Замінюємо множинні пробіли та переноси на 1 пробіл
            .trim();
    }, [currentDescription]);

    const seoTitle = isEn
        ? (doctor?.seo_title_en || `${doctorName} — Dentist at Tooth Fairy Clinic`)
        : (doctor?.seo_title || `${doctorName} — Стоматолог клініки Зубна Фея у Білій Церкві`);

    const seoDescription = isEn
        ? (doctor?.seo_description_en || seoCleanDescription)
        : (doctor?.seo_description || seoCleanDescription);

    const activeSlug = isEn ? (doctor?.slug_en || doctor?.slug) : (doctor?.slug || doctor?.slug_en);

    // Schema.org граф
    const doctorSchema = useMemo(() => {
        if (!doctor) return null;

        const imageUrl = doctor.image?.startsWith("http")
            ? doctor.image
            : `${baseUrl}/assets/${doctor.image}`;

        return {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "BreadcrumbList",
                    "@id": `${baseUrl}/${currentLang}/doctors/${activeSlug}/#breadcrumb`,
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": isEn ? "Home" : "Головна",
                            "item": `${baseUrl}/${currentLang}`
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": isEn ? "Doctors" : "Лікарі",
                            "item": `${baseUrl}/${currentLang}/doctors`
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "name": doctorName,
                            "item": `${baseUrl}/${currentLang}/doctors/${activeSlug}`
                        }
                    ]
                },
                {
                    "@type": "Person",
                    "@id": `${baseUrl}/${currentLang}/doctors/${activeSlug}/#person`,
                    "name": doctorName,
                    "jobTitle": doctor.categories?.map((category) => isEn && category.category.title_en ? category.category.title_en : category.category.title),
                    "description": seoCleanDescription, // Використовуємо чистий текст без HTML
                    "image": imageUrl,
                    "url": `${baseUrl}/${currentLang}/doctors/${activeSlug}`,
                    "worksFor": {
                        "@id": `${baseUrl}/#organization`
                    }
                }
            ]
        };
    }, [doctor, doctorName, seoCleanDescription, activeSlug, currentLang, isEn]);

    // Cloudinary хук для ГОЛОВНОГО фото лікаря
    const mainDoctorTransformations = useMemo(() => {
        const base = ["w_385", "h_440", "f_auto", "q_auto"];
        if (doctor?.image) {
            base.unshift("c_pad");
        } else {
            base.unshift("c_fill", "g_face");
        }
        return base;
    }, [doctor?.image]);

    const doctorMainImageCld = useCloudinaryImage(doctor?.image || "", mainDoctorTransformations);

    // Ранні повернення
    if (error) return <ShowInfo type="error"><p>{t("Упс, сталася помилка")}</p></ShowInfo>;
    if (loading) return <ShowInfo type="info"><p>{t("Завантаження...")}</p></ShowInfo>;
    if (!doctor) return <ShowInfo type="info"><p>{t("На жаль, такого лікаря не знайдено")}</p></ShowInfo>;

    // Парсинг масиву сертифікатів
    const certificatesList: string[] = Array.isArray(doctor.certificates)
        ? doctor.certificates
        : typeof doctor.certificates === "string"
            ? JSON.parse(doctor.certificates || "[]")
            : [];

    const altText = isEn
        ? (doctor.image_alt_en || `${doctorName} — Dentist at Tooth Fairy Clinic`)
        : (doctor.image_alt || `${doctorName} — Стоматолог клініки Зубна Фея`);

    const experienceText = isEn
        ? (doctor.experience_en || doctor.experience)
        : (doctor.experience || doctor.experience_en);

    return (
        <main className="bg-palePeach dark:bg-darkGray min-h-screen py-24 px-6 md:px-16">
            <SEOMeta
                title={seoTitle}
                description={seoDescription}
                path={`/doctors/${activeSlug}`}
                schemaData={doctorSchema || undefined}
                hasBreadcrumbs={false}
            />

            <div className="max-w-6xl mx-auto flex flex-col gap-10">
                {/* Хлібні крихти (Breadcrumbs) */}
                <nav className="text-sm text-gray-500 dark:text-gray-400">
                    <ul className="flex flex-wrap items-center gap-2">
                        <li>
                            <Link to={`/${currentLang}`} className="hover:underline">
                                {t("Головна")}
                            </Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link to={`/${currentLang}/doctors`} className="hover:underline">
                                {t("Лікарі")}
                            </Link>
                        </li>
                        <li>/</li>
                        <li className="text-gray-800 dark:text-gray-200 font-medium">
                            {doctorName}
                        </li>
                    </ul>
                </nav>

                {/* Основна картка лікаря */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-10 shadow-lg flex flex-col md:flex-row gap-8 items-start">
                    {/* Головне фото лікаря */}
                    <div className="w-full md:w-1/3 flex-shrink-0 overflow-hidden rounded-xl">
                        <AdvancedImage
                            cldImg={doctorMainImageCld}
                            alt={altText}
                            loading="lazy"
                            className="w-full h-full object-cover shadow-md"
                            style={{ width: "100%", height: "100%" }}
                        />
                    </div>

                    {/* Інформація про лікаря */}
                    <div className="flex flex-col gap-4 flex-grow">
                        <MainTitle as="h1" size="base">
                            {doctorName}
                        </MainTitle>

                        {/* Категорії / Спеціалізації */}
                        <div className="flex flex-wrap gap-2 text-sm font-semibold text-primary">
                            {doctor.categories?.map((category) => (
                                <span key={category.category.id} className="bg-primary/10 px-3 py-1 rounded-full dark:text-white">
                                    {isEn && category.category.title_en ? category.category.title_en : category.category.title}
                                </span>
                            ))}
                        </div>

                        {/* Досвід роботи */}
                        {doctor.experience && (
                            <p className="text-gray-600 dark:text-gray-300 font-medium">
                                {t("Досвід роботи")}: {experienceText}
                            </p>
                        )}

                        {/* Опис */}
                        {sanitizedHtml && (
                            <div
                                className="prose dark:prose-invert max-w-none text-xl dark:text-white text-left"
                                dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                            />
                        )}
                    </div>
                </div>

                {/* Пов'язані послуги */}
                {doctor.personnel_services && doctor.personnel_services.length > 0 && (
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            {t("Напрями роботи та послуги")}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {doctor.personnel_services.map((item) => {
                                const service = item.service;
                                if (!service) return null;

                                const serviceName = isEn ? (service.name_en || service.name) : service.name;
                                const serviceSlug = isEn ? (service.slug_en || service.slug) : service.slug;

                                return (
                                    <Link
                                        key={service.id}
                                        to={`/${currentLang}/services/${serviceSlug}`}
                                        className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md transition-all flex items-center gap-4 group border border-transparent hover:border-primary"
                                    >
                                        {service.image && (
                                            <ServiceImageItem
                                                imagePublicId={service.image}
                                                altText={serviceName}
                                            />
                                        )}
                                        <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">
                                            {serviceName}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Блок сертифікатів */}
                {certificatesList.length > 0 && (
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            {t("Дипломи та сертифікати")}
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {certificatesList.map((certPublicId, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-xl shadow hover:scale-105 transition-transform cursor-pointer"
                                >
                                    <CertificateImageItem
                                        certPublicId={certPublicId}
                                        altText={`${t("Сертифікат")} ${doctorName} #${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default DoctorDetailPage;