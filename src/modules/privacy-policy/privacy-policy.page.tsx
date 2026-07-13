import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useReactiveVar } from "@apollo/client";
import { themeState } from "@app/modules/cart/store/theme-state";

// Нові імпорти для SEO
import { useGetPageMetadataQuery } from "@app/core/types";
import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";

export const PrivacyPolicy = () => {
    const { t, i18n } = useTranslation();
    const themeStateCurrent = useReactiveVar(themeState);

    // КРОК 1: Запит SEO-даних з вашої бази даних для конкретного роуту
    const { data: PageMetadata } = useGetPageMetadataQuery({
        variables: { route: '/privacy-policy' }
    });

    // КРОК 2: Визначення поточної мови та вилучення потрібних полів
    const isEn = i18n.language === 'en';
    const pageMeta = PageMetadata?.page_metadata[0];

    // Якщо є дані з бази, беремо їх. Якщо ні — буде undefined
    const currentTitle = isEn ? pageMeta?.seo_title_en : pageMeta?.seo_title;
    const currentDescription = isEn ? pageMeta?.seo_description_en : pageMeta?.seo_description;

    // Прокрутка сторінки вгору при монтуванні компонента
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen bg-white dark:bg-darkGray text-darkGray dark:text-palePeach py-16 px-5 md:px-10 transition-colors duration-300">

            {/* КРОК 3: Ін'єкція мета-тегів у <head> */}
            <SEOMeta
                title={currentTitle || t("Політика конфіденційності | Стоматологія Зубна Фея")}
                description={currentDescription || t("Ознайомтесь із політикою конфіденційності клініки Зубна Фея. Дізнайтеся, як ми збираємо, обробляємо та захищаємо ваші персональні дані.")}
                path="/privacy-policy"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": isEn ? "Privacy Policy" : "Політика конфіденційності",
                    "description": isEn
                        ? "Privacy Policy of Tooth Fairy Clinic"
                        : "Політика конфіденційності клініки Зубна Фея",
                    "publisher": {
                        "@type": "Dentist",
                        "@id": "https://toothfairy.clinic/#organization",
                        "name": isEn ? "Tooth Fairy Dental Clinic" : "Стоматологічна клініка Зубна Фея"
                    }
                }}
            />

            <article className="max-w-4xl mx-auto flex flex-col gap-6">

                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">
                    {t("Політика конфіденційності")}
                </h1>

                <p className="text-sm opacity-70 mb-8 text-center">
                    {t("Останнє оновлення: 12 липня 2026 року")}
                </p>

                <section>
                    <h2 className="text-xl md:text-2xl font-semibold mb-3">1. {t("Загальні положення")}</h2>
                    <p className="leading-relaxed mb-4 opacity-90">
                        {t("Ця Політика конфіденційності визначає порядок отримання, зберігання, обробки та використання персональних даних користувачів вебсайту клініки «Зубна Фея» (далі — Клініка). Використовуючи наш сайт, ви погоджуєтесь з умовами цієї політики.")}
                    </p>
                </section>

                <section>
                    <h2 className="text-xl md:text-2xl font-semibold mb-3">2. {t("Які дані ми збираємо")}</h2>
                    <p className="leading-relaxed mb-4 opacity-90">
                        {t("Ми можемо збирати наступну інформацію, коли ви залишаєте заявку на сайті або телефонуєте нам:")}
                    </p>
                    <ul className="list-disc list-inside flex flex-col gap-2 ml-4 opacity-90">
                        <li>{t("Ім'я та прізвище;")}</li>
                        <li>{t("Контактний номер телефону;")}</li>
                        <li>{t("Електронна пошта (за бажанням);")}</li>
                        <li>{t("Медична інформація, яку ви добровільно надаєте під час запису на прийом.")}</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl md:text-2xl font-semibold mb-3">3. {t("Мета збору даних")}</h2>
                    <p className="leading-relaxed mb-4 opacity-90">
                        {t("Ваші персональні дані використовуються виключно для:")}
                    </p>
                    <ul className="list-disc list-inside flex flex-col gap-2 ml-4 opacity-90">
                        <li>{t("Організації вашого запису на прийом до лікаря;")}</li>
                        <li>{t("Зворотного зв'язку (підтвердження візиту, нагадування);")}</li>
                        <li>{t("Покращення якості обслуговування у Клініці.")}</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl md:text-2xl font-semibold mb-3">4. {t("Захист інформації")}</h2>
                    <p className="leading-relaxed mb-4 opacity-90">
                        {t("Клініка «Зубна Фея» зобов'язується не передавати ваші персональні дані третім особам, за винятком випадків, прямо передбачених законодавством України. Ми вживаємо всіх необхідних технічних та організаційних заходів для захисту ваших даних від несанкціонованого доступу.")}
                    </p>
                </section>

                <section>
                    <h2 className="text-xl md:text-2xl font-semibold mb-3">5. {t("Ваші права")}</h2>
                    <p className="leading-relaxed mb-4 opacity-90">
                        {t("Ви маєте право у будь-який момент запросити доступ до своїх персональних даних, вимагати їх виправлення або повного видалення з нашої бази. Для цього зверніться до нас за контактами, вказаними нижче.")}
                    </p>
                </section>

                <section className="mt-8 p-6 bg-paleOlive/20 dark:bg-darkGray/50 rounded-xl border border-paleOlive/30">
                    <h2 className="text-xl font-semibold mb-4">{t("Контактна інформація")}</h2>
                    <p className="mb-2 opacity-90">{t("Якщо у вас виникли запитання щодо цієї Політики конфіденційності, будь ласка, зв'яжіться з нами:")}</p>
                    <ul className="flex flex-col gap-2 mt-4 font-medium">
                        <li>
                            <span className="opacity-70 mr-2">{t("Телефон:")}</span>
                            <a href="tel:+380681689911" className="hover:text-paleOlive transition-colors">+38 (068) 168-99-11</a>
                        </li>
                        <li>
                            <span className="opacity-70 mr-2">{t("Email:")}</span>
                            <a href="mailto:admin@toothfairy.clinic" className="hover:text-paleOlive transition-colors">admin@toothfairy.clinic</a>
                        </li>
                        <li>
                            <span className="opacity-70 mr-2">{t("Адреса:")}</span>
                            <span>{t("вул. Вокзальна 22, м. Біла Церква")}</span>
                        </li>
                    </ul>
                </section>

            </article>
        </main>
    );
};