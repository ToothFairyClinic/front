import React, { useState, useEffect } from "react";
import { ReactComponent as LightThemeSolidIcon } from "@app/assets/icons/lightThemeIcon.svg";
import { ReactComponent as DarkThemeSolidIcon } from "@app/assets/icons/darkThemeIcon.svg";
// import { ReactComponent as Logotype } from "@app/assets/images/logo.svg";
// import { ReactComponent as LogotypeLight } from "../../../../public/assets/logo_light.svg";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../button/button.component";
import { LinkHeader } from "../link-header/link-header.component";
import { themeState, toggleTheme } from "@app/modules/cart/store/theme-state";
import { ReactComponent as MenuIcon } from "@app/assets/icons/bars-3.svg";
import { FC } from "react";
import { useReactiveVar } from "@apollo/client";
import clsx from "clsx";
import LanguageSwitcher from "../language-switcher/language-switcher.component"; // Імпортуйте компонент
import { useTranslation } from 'react-i18next';


interface HeaderProps { }

export const Header: FC<HeaderProps> = ({ }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const themeStateCurrent = useReactiveVar(themeState);
  const location = useLocation();

  const isMainPage = location.pathname === '/ua' || location.pathname === '/en' || location.pathname === '/';

  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const urlLang = i18n.language === 'uk' ? 'ua' : i18n.language;

  const headerClasses = clsx(
    "w-full p-5 z-30 transition-all duration-300 bg-paleOlive dark:bg-darkGray lg:bg-paleOlive/75 lg:dark:bg-darkGray/75",
    {
      "absolute": isMainPage,
      "relative": !isMainPage,
    }
  );

  useEffect(() => {
    const root = document.documentElement;
    if (themeStateCurrent) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [themeStateCurrent]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Спільний список посилань
  const NavLinks = () => (
    <ul className="flex flex-col md:flex-row md:space-x-5 lg:gap-15 md:gap-5 list-none">
      <li><LinkHeader url={`/${urlLang}/review`}>{t("Відгуки")}</LinkHeader></li>
      <li><LinkHeader url={`/${urlLang}/price-list`}>{t("Прайс лист")}</LinkHeader></li>
      <li><LinkHeader url={`/${urlLang}/our-work`}>{t("Роботи")}</LinkHeader></li>
      <li><LinkHeader url={`/${urlLang}/contacts`}>{t("Контакти")}</LinkHeader></li>
    </ul>
  );

  return (
    <header className={headerClasses} role="banner">
      <div className="container mx-auto flex justify-around items-center md:flex-col lg:flex-row">

        {/* Логотип */}
        <div className="flex-shrink-0">
          <Link to="/" aria-label={t("Зубна Фея — на головну")}>
            {themeStateCurrent ? <img
              src="/assets/logo.svg"
              alt="Зубна Фея логотип"
              width="180"
              height="50"
              className="h-24 w-auto"
              style={{ aspectRatio: '216 / 71' }}
            /> : <img
              src="/assets/logo_light.svg"
              alt="Tooth Fairy Clinic Logo"
              width="180"
              height="50"
              className="h-24 w-auto"
              style={{ aspectRatio: '216 / 71' }}
            />}
          </Link>
        </div>

        {/* Десктопна навігація */}
        <nav className="hidden md:flex items-center space-x-5 md:gap-10" aria-label={t("Основна навігація")}>
          <NavLinks />

          <div className="flex items-center space-x-5 ml-auto gap-2">
            <button
              onClick={toggleTheme}
              aria-label={themeStateCurrent ? t("Увімкнути темну тему") : t("Увімкнути світлу тему")}
              className="p-2 transition-colors"
            >
              {themeStateCurrent ? (
                <DarkThemeSolidIcon className="w-6 h-6 text-darkGray hover:text-white dark:hover:text-paleOlive" />
              ) : (
                <LightThemeSolidIcon className="w-6 h-6 text-white hover:text-darkGray dark:hover:text-paleOlive" />
              )}
            </button>
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Мобільна кнопка меню */}
        <div className="md:hidden ml-auto flex items-center gap-4">
          <button
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label={t("Відкрити меню")}
            className="p-2"
          >
            <MenuIcon
              className={clsx("w-6 h-6 transition-colors",
                themeStateCurrent ? "fill-darkGray" : "fill-white"
              )}
            />
          </button>
        </div>
      </div>

      {/* Мобільне меню */}
      {isMobileMenuOpen && (
        <nav className="md:hidden mt-5 pb-5 border-t border-white/10" aria-label={t("Мобільна навігація")}>
          <div className="flex flex-col space-y-4 pt-4">
            {/* Використовуємо div замість button для обгортки посилань, щоб не було вкладених інтерактивних елементів */}
            <div onClick={() => setIsMobileMenuOpen(false)}>
              <NavLinks />
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 px-2">
              <LanguageSwitcher />
              <button
                onClick={toggleTheme}
                aria-label={t("Змінити тему")}
                className="p-2"
              >
                {themeStateCurrent ? (
                  <DarkThemeSolidIcon className="w-6 h-6 text-darkGray" />
                ) : (
                  <LightThemeSolidIcon className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};
