import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { ApolloProvider } from "@apollo/client";
import { I18nextProvider } from "react-i18next";
import dynamic from "next/dynamic";

import { useApollo } from "@app/core/apollo-client";
import { getI18n, langFromUrl } from "@app/common/translator/translator";
import { Header } from "@app/common/components/header/header.component";
import { Footer } from "@app/common/components/footer/footer.component";
import { isLoggedInReactive } from "@app/modules/auth/store/reactive-vars";
import { PreFooterPlaceholder } from "@app/common/components/pre-footer-form/pre-footer-placeholder.component";

// Стилі (Tailwind, слайдер, сповіщення, шрифт) вбудовані в HTML у _document, окремих CSS-файлів немає

const ToastContainer = dynamic(() => import("react-toastify").then((m) => m.ToastContainer), { ssr: false });

// Форма запису внизу сторінки з валідацією підвантажується окремо, після основного контенту
const PreFooterConsultationForm = dynamic(
  () => import("@app/common/components/pre-footer-form/pre-footer-form.component").then((m) => m.PreFooterConsultationForm),
  { ssr: false, loading: () => <PreFooterPlaceholder /> }
);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const apolloClient = useApollo(pageProps);
  const urlLang = (pageProps.lang as string) || (router.query.lang as string) || "ua";
  const i18n = useMemo(() => getI18n(langFromUrl(urlLang)), [urlLang]);

  // На сторінках робіт і відгуків своя форма, загальна форма запису не потрібна
  const hidePreFooter = router.asPath.includes("/our-work") || router.asPath.includes("/review");

  useEffect(() => {
    isLoggedInReactive(Boolean(localStorage.getItem("jwt")));
  }, []);

  // _document ставить мову лише в серверному HTML; при переходах між мовами оновлюємо її тут
  useEffect(() => {
    document.documentElement.lang = urlLang === "en" ? "en" : "uk";
  }, [urlLang]);

  // GA4 підключений через GTM (тег Google G-2K745N448M), переходи між сторінками він рахує сам
  // через історію браузера, тому окремий react-ga4 прибрано: він дублював перегляди.

  return (
    <ApolloProvider client={apolloClient}>
      <I18nextProvider i18n={i18n}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title key="title">Стоматологічна клініка Зубна Фея | Біла Церква</title>
          <meta key="meta:og:image" property="og:image" content="https://toothfairy.clinic/assets/favicon/android-chrome-512x512.png" />
        </Head>
        <ToastContainer />
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow min-h-screen">
            <Component {...pageProps} />
          </div>
          {!hidePreFooter && <PreFooterConsultationForm />}
          <Footer />
        </div>
      </I18nextProvider>
    </ApolloProvider>
  );
}
