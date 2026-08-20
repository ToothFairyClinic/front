import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isLoggedInReactive } from "./modules/auth/store/reactive-vars";
import { Header } from "./common/components/header/header.component";
import { Routes, Route } from "react-router-dom";
import { Footer } from "./common/components/footer/footer.component";
import ReactGA from "react-ga4";
import { config } from "./core/config";
import { Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Suspense, lazy } from 'react';
import { PrivacyPolicy } from "./modules/privacy-policy/privacy-policy.page";
import { PreFooterConsultationForm } from "./common/components/pre-footer-form/pre-footer-form.component";


// <Route path="contacts" element={<><SEOMeta /><ContactPage /></>} />

const MainPage = lazy(() => import('./modules/main/pages/main.page'));
const PriceListPage = lazy(() => import('./modules/price-list/pages/price-list.page'));
const ServicePage = lazy(() => import('./modules/services/pages/services.page'));
const ReviewsPage = lazy(() => import('./modules/reviews/pages/reviews.page'));
const OurWorkPage = lazy(() => import('./modules/our-works/page/our-work.page'));
const ContactPage = lazy(() => import('./modules/contacts/pages/contacts.page'));
const DoctorsPage = lazy(() => import('./modules/doctors/pages/doctors.page'));
const DoctorDetailPage = lazy(() => import('./modules/doctor-detail/pages/doctor-detail.page'));


export const App = () => {
  const location = useLocation();
  const GA_ID = config.GA_MEASUREMENT_ID;
  const { t, i18n } = useTranslation();

  const isExcludedPreFooterPage =
    location.pathname.includes('/our-work') ||
    location.pathname.includes('/review');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);


  // Ефект 1: Лише ініціалізація
  useEffect(() => {
    if (!GA_ID || ReactGA.isInitialized) return;

    const timer = setTimeout(() => {
      ReactGA.initialize(GA_ID);
      ReactGA.send({
        hitType: "pageview",
        page: window.location.pathname + window.location.search,
        title: document.title,
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [GA_ID]);

  // Ефект 2: Відстеження подальших переходів
  useEffect(() => {
    if (GA_ID && ReactGA.isInitialized) {
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname + location.search,
        title: document.title,
      });
    }
  }, [location.pathname, location.search, GA_ID]);


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
      <div className="flex-grow min-h-screen">
        <Suspense fallback={<div className="flex justify-center py-20">{t("Завантаження...")}</div>}>
          <Routes>
            <Route path="/" element={<RootRedirect />} />

            <Route path="/:lang">
              <Route index element={<MainPage />} />
              <Route path="price-list" element={<PriceListPage />} />
              <Route path="services/:slug" element={<ServicePage />} />
              <Route path="review" element={<ReviewsPage />} />
              <Route path="our-work" element={<OurWorkPage />} />
              <Route path="contacts" element={<ContactPage />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="doctors" element={<DoctorsPage />} />
              <Route path="doctors/:slug" element={<DoctorDetailPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/ua" replace />} />
          </Routes>
        </Suspense>

      </div>
      {!isExcludedPreFooterPage && <PreFooterConsultationForm />}
      <Footer />
    </div>
  );
};
