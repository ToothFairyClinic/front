import React, { useEffect } from 'react';
import i18n from 'i18next';
import clsx from "clsx";
import { themeState } from "@app/modules/cart/store/theme-state";
import { useReactiveVar } from "@apollo/client";
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();
  const themeStateCurrent = useReactiveVar(themeState);
  const navigate = useNavigate();
  const location = useLocation();

  const currentLangFromUrl = location.pathname.split('/')[1] || 'ua';

  const changeLanguage = (lang: string): void => {
    const i18nLang = lang === 'ua' ? 'uk' : lang;
    i18n.changeLanguage(i18nLang);

    localStorage.setItem('language', lang);

    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      pathSegments[0] = lang;
      navigate(`/${pathSegments.join('/')}`);
    } else {
      navigate(`/${lang}`);
    }
  };

  const getButtonStyles = (lang: string) => clsx(
    "text-xl font-normal transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-paleOlive rounded-md px-1",
    {
      // Порівнюємо з мовою з URL
      "font-bold underline decoration-darkGray underline-offset-4 dark:decoration-paleOlive": currentLangFromUrl === lang,
      "text-darkGray hover:text-gray-600": themeStateCurrent,
      "text-white hover:text-paleOlive": !themeStateCurrent,
    }
  );

  return (
    <nav className='flex items-center gap-2' aria-label={t("Перемикач мови")}>
      <button
        className={getButtonStyles('ua')}
        onClick={() => changeLanguage('ua')}
        aria-pressed={currentLangFromUrl === 'ua'}
      >
        UA
      </button>
      <div className='h-4 border-l border-gray-400 opacity-50' aria-hidden="true"></div>
      <button
        className={getButtonStyles('en')}
        onClick={() => changeLanguage('en')}
        aria-pressed={currentLangFromUrl === 'en'}
      >
        EN
      </button>
    </nav>
  );
};
export default LanguageSwitcher;