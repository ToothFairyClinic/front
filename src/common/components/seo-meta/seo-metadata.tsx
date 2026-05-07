import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';

interface SEOProps {
    title: string;
    description?: string;
    path: string;
    type?: 'Webpage' | 'Service' | 'AboutPage' | 'ContactPage';
    schemaData?: any;
}

export const SEOMeta = ({ title, description, path, type = 'Webpage', schemaData }: SEOProps) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language === 'uk' ? 'ua' : 'en'

    const baseUrl = "https://toothfairy.clinic"
    const fullUrl = `${baseUrl}/${currentLang}${path}`;

    const breadcrumbsItems = [
        {
            "@type": "ListItem",
            "position": 1,
            "name": i18n.language === 'uk' ? "Головна" : "Home",
            "item": `${baseUrl}/${currentLang}`
        }
    ];

    if (path && path !== "") {
        breadcrumbsItems.push({
            "@type": "ListItem",
            "position": 2,
            "name": title,
            "item": fullUrl
        });
    }

    const breadcrumbsSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbsItems
    };

    const pageSchema = {
        "@context": "https://schema.org",
        "@type": type,
        "@id": `${fullUrl}/#webpage`,
        "url": fullUrl,
        "name": title,
        "description": description,
        "breadcrumb": { "@id": `${fullUrl}/#breadcrumb` },
        "inLanguage": currentLang === "ua" ? "uk-UA" : "en-US",
        ...(schemaData ? { "mainEntity": schemaData } : {})
    };

    return (
        <Helmet>
            <title>{title}</title>
            {description && <meta name="description" content={description} />}

            <script type="application/ld+json">
                {JSON.stringify(breadcrumbsSchema)}
            </script>

            <script type="application/ld+json">
                {JSON.stringify(pageSchema)}
            </script>
        </Helmet>
    );
};

