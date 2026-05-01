import React, { useEffect } from 'react';
import i18n from 'i18next';
import clsx from "clsx";
import { themeState } from "@app/modules/cart/store/theme-state";
import { useReactiveVar } from "@apollo/client";
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { t } = useTranslation();
  const themeStateCurrent = useReactiveVar(themeState);

  // Ініціалізація стану безпосередньо з i18n, щоб мати одне джерело істини
  const [currentLang, setCurrentLang] = React.useState(i18n.language || 'uk');

  const changeLanguage = (lang: string): void => {
    setCurrentLang(lang);
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  };

  const getButtonStyles = (lang: string) => clsx(
    "text-xl font-normal transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-paleOlive rounded-md px-1",
    {
      // Стилі для активної мови
      "font-bold underline decoration-darkGray underline-offset-4 dark:decoration-paleOlive": currentLang === lang,
      // Кольори залежно від теми
      "text-darkGray hover:text-gray-600": themeStateCurrent,
      "text-white hover:text-paleOlive": !themeStateCurrent,
    }
  );

  return (
    <nav className='flex items-center gap-2' aria-label={t("Перемикач мови")}>
      <button
        className={getButtonStyles('uk')}
        onClick={() => changeLanguage('uk')}
        aria-label="Українська мова"
        aria-pressed={currentLang === 'uk'}
      >
        UA
      </button>

      <div className='h-4 border-l border-gray-400 opacity-50' aria-hidden="true"></div>

      <button
        className={getButtonStyles('en')}
        onClick={() => changeLanguage('en')}
        aria-label="English language"
        aria-pressed={currentLang === 'en'}
      >
        EN
      </button>
    </nav>
  );
};

export default LanguageSwitcher;