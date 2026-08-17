import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useGetPageMetadataQuery, useGetPersonnelQuery } from "@app/core/types";
import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { MainTitle } from "@app/common/components/main-title/main-title.component";
import { PersonnelItem } from "@app/modules/main/components/personnel/personnel-item/personnel-item.component";

export const DoctorsPage: FC = () => {
    const { t, i18n } = useTranslation();
    const isEn = i18n.language === "en";
    const currentLang = isEn ? "en" : "ua";

    const baseUrl = "https://toothfairy.clinic";




    const { data: metaData } = useGetPageMetadataQuery({
        variables: { route: "/doctors" },
    });
    const { data: personnelData, loading, error } = useGetPersonnelQuery();

    const pageMeta = metaData?.page_metadata[0];
    const currentTitle = isEn ? pageMeta?.seo_title_en : pageMeta?.seo_title;
    const currentDescription = isEn ? pageMeta?.seo_description_en : pageMeta?.seo_description;


    const doctorsSchema = useMemo(() => {
        if (!personnelData?.personnel) return null;

        return {
            "@type": "ItemList",
            "name": currentTitle || (isEn ? "Doctors of Tooth Fairy Clinic" : "Лікарі стоматологічної клініки Зубна Фея"),
            "description": currentDescription || (isEn ? "Our team of experienced dentists." : "Наша команда досвідчених стоматологів."),
            "numberOfItems": personnelData.personnel.length,
            "itemListElement": personnelData.personnel.map((doctor, index) => {
                const doctorName = isEn && doctor.name_en ? doctor.name_en : doctor.name;
                const doctorSlug = isEn && doctor.slug_en ? doctor.slug_en : (doctor.slug || doctor.id);


                return {
                    "@type": "ListItem",
                    "position": index + 1,
                    "item": {
                        "@type": "Person",
                        "name": doctorName,
                        "jobTitle": [...doctor.categories.map((category) => isEn && category.category.title_en ? category.category.title_en : category.category.title)],
                        "image": doctor.image?.startsWith("http") ? doctor.image : `${baseUrl}/assets/${doctor.image}`,
                        "url": `${baseUrl}/${currentLang}/doctors/${doctorSlug}`,
                        "worksFor": {
                            "@id": `${baseUrl}/#organization`
                        }
                    }
                };
            })
        };
    }, [personnelData, isEn, currentLang, currentTitle, currentDescription]);


    if (error) {
        return (
            <ShowInfo type="error">
                <p>{t("Упс, сталася помилка")}</p>
            </ShowInfo>
        );
    }

    if (loading) {
        return (
            <ShowInfo type="info">
                <p>{t("Завантаження...")}</p>
            </ShowInfo>
        );
    }



    return (
        <main className="bg-palePeach dark:bg-darkGray min-h-screen py-24 px-6 md:px-16">
            <SEOMeta
                title={currentTitle || t("Лікарі стоматологічної клініки Зубна Фея у Білій Церкві")}
                description={currentDescription || t("Наша команда досвідчених дитячих та дорослих стоматологів у Білій Церкві.")}
                path="/doctors"
                type="WebPage"
                schemaData={doctorsSchema || undefined} />

            <div className="max-w-7xl mx-auto flex flex-col gap-12">
                <MainTitle as="h1" size="base">
                    {t("Наші лікарі")}
                </MainTitle>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {personnelData?.personnel.map((doctor) => {
                        const doctorName = isEn && doctor.name_en ? doctor.name_en : doctor.name;
                        const doctorSlug = isEn && doctor.slug_en ? doctor.slug_en : (doctor.slug || doctor.id);

                        const altText = isEn
                            ? (doctor.image_alt_en || `${doctorName} — Dentist at Tooth Fairy Clinic`)
                            : (doctor.image_alt || `${doctorName} — Стоматолог клініки Зубна Фея`);

                        return (
                            <Link
                                key={doctor.id}
                                to={`/${currentLang}/doctors/${doctorSlug}`}
                                className="w-full flex justify-center transition-transform hover:-translate-y-1"
                            >
                                <PersonnelItem
                                    image={doctor.image}
                                    name={doctorName}
                                    description={doctor.description}
                                    id={doctor.id}
                                    alt={altText}
                                    personnel_categories={doctor.categories || []}
                                />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
};

export default DoctorsPage;
