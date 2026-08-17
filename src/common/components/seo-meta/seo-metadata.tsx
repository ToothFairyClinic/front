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
    hasBreadcrumbs?: boolean; // <- додаємо прапорець
}

export const SEOMeta = ({
    title,
    description,
    path,
    type = 'WebPage',
    schemaData,
    robots = null,
    hasBreadcrumbs = true
}: SEOProps) => {
    const { i18n } = useTranslation();
    const location = useLocation();

    // 1. Мова та шляхи
    const currentLang = i18n.language === 'uk' || i18n.language === 'ua' ? 'ua' : 'en';
    const isEn = currentLang === 'en';
    const baseUrl = "https://toothfairy.clinic";

    const currentPath = path || location.pathname;

    const pathSegments = currentPath.split('/').filter(Boolean);
    const cleanPath = pathSegments[0] === 'ua' || pathSegments[0] === 'en'
        ? pathSegments.slice(1).join('/')
        : pathSegments.join('/');

    const slug = cleanPath ? `/${cleanPath}` : '';

    const fullUrl = `${baseUrl}/${currentLang}${slug}`;


    // 2. Breadcrumbs
    const breadcrumbsItems = [
        {
            "@type": "ListItem",
            "position": 1,
            "name": isEn ? "Home" : "Головна",
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

    const breadcrumbsEntity = {
        "@type": "BreadcrumbList",
        "@id": `${fullUrl}/#breadcrumb`,
        "itemListElement": breadcrumbsItems
    };

    // 3. WebPage
    const pageEntity = {
        "@type": type === 'Service' ? 'WebPage' : type,
        "@id": `${fullUrl}/#webpage`,
        "url": fullUrl,
        "name": title,
        "description": description,
        "breadcrumb": { "@id": `${fullUrl}/#breadcrumb` },
        "inLanguage": isEn ? "en-US" : "uk-UA",
    };

    // 4. Фолбек для Організації (використовується для сторінок Послуг, де Dentist не передається явно)
    const defaultOrganizationEntity = {
        "@type": "Dentist",
        "@id": `${baseUrl}/#organization`,
        "name": isEn ? "Tooth Fairy Dental Clinic" : "Стоматологічна клініка Зубна Фея",
        "url": `${baseUrl}/${currentLang}`,
        "additionalType": "https://schema.org/Organization",
        "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo-seo.svg`
        },
        "telephone": "+380681689911",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": isEn ? "22 Vokzalna St" : "вул. Вокзальна, 22",
            "addressLocality": isEn ? "Bila Tserkva" : "Біла Церква",
            "addressRegion": isEn ? "Kyiv Oblast" : "Київська область",
            "postalCode": "09100",
            "addressCountry": "UA"
        },
        "priceRange": "$$"
    };

    // 5. Побудова чистого @graph без дублів
    const buildMainSchema = () => {
        const customNodes: any[] = [];

        // Збираємо всі зовнішні вузли з schemaData в один плоский масив
        if (schemaData) {
            if (Array.isArray(schemaData)) {
                customNodes.push(...schemaData.flat());
            } else if (schemaData["@graph"] && Array.isArray(schemaData["@graph"])) {
                customNodes.push(...schemaData["@graph"].flat());
            } else {
                customNodes.push(schemaData);
            }
        }

        // ПЕРЕВІРКА: чи передав батьківський компонент свого Dentist з таким же @id
        const hasCustomOrganization = customNodes.some(
            (node) => node["@id"] === `${baseUrl}/#organization` || node["@type"] === "Dentist"
        );

        const graph: any[] = [pageEntity];

        // Додаємо дефолтну організацію ТІЛЬКИ якщо її не було передано в schemaData
        if (!hasCustomOrganization) {
            graph.push(defaultOrganizationEntity);
        }

        if (hasBreadcrumbs) {
            graph.push(breadcrumbsEntity);
        }

        graph.push(...customNodes);

        return {
            "@context": "https://schema.org",
            "@graph": graph
        };
    };

    const defaultImage = `${baseUrl}/assets/og-main.svg`;

    return (
        <Helmet>
            <html lang={i18n.language} />
            <link rel="canonical" href={fullUrl} />
            <link rel="alternate" href={`${baseUrl}/ua${slug}`} hrefLang="uk" />
            <link rel="alternate" href={`${baseUrl}/en${slug}`} hrefLang="en" />
            <link rel="alternate" href={`${baseUrl}/ua${slug}`} hrefLang="x-default" />

            {robots && <meta name="robots" content={robots} />}

            <title>{title}</title>
            {description && <meta name="description" content={description} />}

            <meta property="og:site_name" content="Tooth Fairy Clinic" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={defaultImage} />
            <meta property="og:image:width" content="512" />
            <meta property="og:image:height" content="512" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={defaultImage} />

            <script type="application/ld+json">
                {JSON.stringify(buildMainSchema())}
            </script>
        </Helmet>
    );
};