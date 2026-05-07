import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isLoggedInReactive } from "./modules/auth/store/reactive-vars";
import { Header } from "./common/components/header/header.component";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./modules/main/pages/main.page";
import { Footer } from "./common/components/footer/footer.component";
import { PriceListPage } from "./modules/price-list/pages/price-list.page";
import { ServicePage } from "./modules/services/pages/services.page";
import { ReviewsPage } from "./modules/reviews/pages/reviews.page";
import { OurWorkPage } from "./modules/our-works/page/our-work.page";
import { ContactPage } from "./modules/contacts/pages/contacts.page";
import ReactGA from "react-ga4";
import { config } from "./core/config";
import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';



const SEOMeta = () => {
  const location = useLocation();
  const baseUrl = "https://toothfairy.clinic";
  const { i18n } = useTranslation();

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const cleanPath = pathSegments.slice(1).join('/');
  const slug = cleanPath ? `/${cleanPath}` : '';

  return (
    <Helmet>
      <html lang={i18n.language} />

      <link rel="canonical" href={`${baseUrl}${location.pathname}`} />

      <link rel="alternate" href={`${baseUrl}/ua${slug}`} hrefLang="uk" />
      <link rel="alternate" href={`${baseUrl}/en${slug}`} hrefLang="en" />
      <link rel="alternate" href={`${baseUrl}/ua${slug}`} hrefLang="x-default" />
    </Helmet>
  );
};

export const App = () => {
  const location = useLocation();
  const GA_ID = config.GA_MEASUREMENT_ID;
  const { i18n } = useTranslation();


  useEffect(() => {
    if (GA_ID)
      // ініціалізація GA
      ReactGA.initialize(GA_ID);
  }, [GA_ID]);

  useEffect(() => {
    if (GA_ID) {
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname + location.search,
        title: document.title,
      });
    }
  }, [location, GA_ID]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    isLoggedInReactive(Boolean(token));
  }, []);

  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const langInUrl = pathSegments[0]; // 'ua' або 'en'

    if (langInUrl) {
      const targetI18nLang = langInUrl === 'ua' ? 'uk' : 'en';
      if (i18n.language !== targetI18nLang) {
        i18n.changeLanguage(targetI18nLang);
      }
    }
  }, [location.pathname])

  const RootRedirect = () => {
    const { i18n } = useTranslation();

    const targetLang = i18n.language === 'uk' ? 'ua' : 'en';
    return <Navigate to={`/${targetLang}`} replace />;
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<RootRedirect />} />

          <Route path="/:lang">
            <Route index element={<><SEOMeta /><MainPage /></>} />
            <Route path="price-list" element={<><SEOMeta /><PriceListPage /></>} />
            <Route path="services/:id" element={<><SEOMeta /><ServicePage /></>} />
            <Route path="review" element={<><SEOMeta /><ReviewsPage /></>} />
            <Route path="our-work" element={<><SEOMeta /><OurWorkPage /></>} />
            <Route path="contacts" element={<><SEOMeta /><ContactPage /></>} />
          </Route>

          <Route path="*" element={<Navigate to="/ua" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
