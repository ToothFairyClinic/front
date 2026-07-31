import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export interface SEOProps {
    title: string;
    description?: string;
    path?: string;
    type?: 'WebPage' | 'Service' | 'AboutPage' | 'ContactPage';
    schemaData?: Record<string, any> | Array<Record<string, any>>;
    robots?: string | null;
}

export const SEOMeta = ({
    title,
    description,
    path,
    type = 'WebPage',
    schemaData,
    robots = null
}: SEOProps) => {
    const { i18n } = useTranslation();
    const location = useLocation();

    // 1. Визначення мови та шляхів
    const currentLang = i18n.language === 'uk' || i18n.language === 'ua' ? 'ua' : 'en';
    const baseUrl = "https://toothfairy.clinic";

    // Якщо path не передано, беремо поточний роут з react-router
    const currentPath = path || location.pathname;

    // Уникаємо дублювання домену, якщо path вже містить його (наприклад, з useLocation)
    const isAbsolute = currentPath.startsWith('http');
    const fullUrl = isAbsolute ? currentPath : `${baseUrl}${currentPath.startsWith('/') ? currentPath : `/${currentPath}`}`;

    // Вилучення slug для hreflang (відкидаємо мовний префікс)
    const pathSegments = currentPath.split('/').filter(Boolean);
    const cleanPath = pathSegments[0] === 'ua' || pathSegments[0] === 'en'
        ? pathSegments.slice(1).join('/')
        : pathSegments.join('/');

    const slug = cleanPath ? `/${cleanPath}` : '';

    // 2. Формування Breadcrumbs
    const breadcrumbsItems = [
        {
            "@type": "ListItem",
            "position": 1,
            "name": currentLang === 'ua' ? "Головна" : "Home",
            "item": `${baseUrl}/${currentLang}`
        }
    ];

    if (slug && slug !== "") {
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

    // 3. Формування основної сутності сторінки
    const pageSchema = {
        "@type": type === 'Service' ? 'WebPage' : type,
        "@id": `${fullUrl}/#webpage`,
        "url": fullUrl,
        "name": title,
        "description": description,
        "breadcrumb": { "@id": `${fullUrl}/#breadcrumb` },
        "inLanguage": currentLang === "ua" ? "uk-UA" : "en-US",
    };

    // 4. Об'єднання сутностей у плоский @graph
    const buildMainSchema = () => {
        const graph: any[] = [pageSchema];

        if (schemaData) {
            if (Array.isArray(schemaData)) {
                graph.push(...schemaData.flat());
            } else if (schemaData["@graph"] && Array.isArray(schemaData["@graph"])) {
                graph.push(...schemaData["@graph"].flat());
            } else {
                graph.push(schemaData);
            }
        }

        return {
            "@context": "https://schema.org",
            "@graph": graph
        };
    };

    const defaultImage = `${baseUrl}/assets/og-main.svg`;

    return (
        <Helmet>
            {/* Глобальні налаштування та локалізація */}
            <html lang={i18n.language} />
            <link rel="canonical" href={fullUrl} />
            <link rel="alternate" href={`${baseUrl}/ua${slug}`} hrefLang="uk" />
            <link rel="alternate" href={`${baseUrl}/en${slug}`} hrefLang="en" />
            <link rel="alternate" href={`${baseUrl}/ua${slug}`} hrefLang="x-default" />

            {/* Директиви індексування */}
            {robots && <meta name="robots" content={robots} />}

            {/* Базові мета-теги */}
            <title>{title}</title>
            {description && <meta name="description" content={description} />}

            {/* OpenGraph */}
            <meta property="og:site_name" content="Tooth Fairy Clinic" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={defaultImage} />
            <meta property="og:image:width" content="512" />
            <meta property="og:image:height" content="512" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={defaultImage} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(breadcrumbsSchema)}
            </script>

            <script type="application/ld+json">
                {JSON.stringify(buildMainSchema())}
            </script>
        </Helmet>
    );
};