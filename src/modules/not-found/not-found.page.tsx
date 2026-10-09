import { FC, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const NotFoundPage: FC = () => {
    const { t, i18n } = useTranslation();

    const isEn = i18n.language === 'en';
    const lang = isEn ? 'en' : 'ua';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const links = [
        { to: `/${lang}`, label: t("Головна") },
        { to: `/${lang}/price-list`, label: t("Ціни") },
        { to: `/${lang}/${isEn ? 'doctors' : 'likari'}`, label: t("Лікарі") },
        { to: `/${lang}/contacts`, label: t("Контакти") },
    ];

    return (
        <main className="min-h-screen flex items-center justify-center bg-white dark:bg-darkGray text-darkGray dark:text-palePeach py-24 px-5 md:px-10 transition-colors duration-300">

            <Helmet>
                <title>{t("Сторінку не знайдено | Стоматологія Зубна Фея")}</title>
                <meta name="robots" content="noindex, follow" />
            </Helmet>

            <div className="max-w-3xl mx-auto text-center">
                <p className="text-6xl md:text-8xl font-semibold opacity-20 select-none">404</p>

                <h1 className="mt-4 text-2xl md:text-4xl font-semibold">
                    {t("Сторінку не знайдено")}
                </h1>

                <p className="mt-4 text-base md:text-lg opacity-80">
                    {t("Можливо, адресу введено з помилкою або сторінку було видалено.")}
                </p>

                <nav className="mt-10 flex flex-wrap justify-center gap-3">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="px-5 py-2.5 rounded-full border border-darkGray/20 dark:border-palePeach/30 hover:bg-darkGray hover:text-palePeach dark:hover:bg-palePeach dark:hover:text-darkGray transition-colors duration-300"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </main>
    );
};

export default NotFoundPage;
