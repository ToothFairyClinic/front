import React, { useEffect } from 'react';
import i18n from 'i18next';
import clsx from "clsx";
import { themeState } from "@app/modules/cart/store/theme-state";
import { useReactiveVar } from "@apollo/client";

const LanguageSwitcher: React.FC = () => {
  const [language, setLanguage] = React.useState<string>(localStorage.getItem('language') || 'uk');
  const themeStateCurrent = useReactiveVar(themeState);

  const changeLanguage = (lang: string): void => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang); // Оновлення мови в i18n
  };

  useEffect(() => {
    i18n.changeLanguage(language); // Встановлюємо мову при завантаженні сторінки
  }, [language]);

  const LinkHeaderStyles = clsx(
    "text-xl font-normal flex items-center justify-center text-darkGray   hover:text-white dark:hover:text-paleOlive text-center",
    {
      "text-white": !themeStateCurrent,
    }
  );

  return (
    <div className='flex items-center gap-2'>
  <button className={LinkHeaderStyles} onClick={() => changeLanguage('uk')}>UA</button>
  <div className='h-6 border-l border-gray-400'></div> {/* Вертикальна лінія */}
  <button className={LinkHeaderStyles} onClick={() => changeLanguage('en')}>ENG</button>
</div>

  );
};

export default LanguageSwitcher;
