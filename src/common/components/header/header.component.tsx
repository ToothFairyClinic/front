import React, { useState, useEffect } from "react";
// import { ReactComponent as Logotype } from "@app/assets/images/logo.svg";
// import { ReactComponent as LogotypeLight } from "../../../../public/assets/logo_light.svg";
import { Link, useLocation } from "@app/common/router/router";
import { Button } from "../button/button.component";
import { LinkHeader } from "../link-header/link-header.component";
import { themeState } from "@app/modules/cart/store/theme-state";
import { ReactComponent as MenuIcon } from "@app/assets/icons/bars-3.svg";
import { FC } from "react";
import { useReactiveVar } from "@apollo/client";
import clsx from "clsx";
import LanguageSwitcher from "../language-switcher/language-switcher.component"; // Імпортуйте компонент
import { useTranslation } from 'react-i18next';
import { ServicesDropdown } from "../services-dropdown/services-dropdown";
import { doctorsPath } from "@app/common/utils/doctors-path";
import { blogPath } from "@app/common/utils/blog-path";



interface HeaderProps { }



export const Header: FC<HeaderProps> = ({ }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const themeStateCurrent = useReactiveVar(themeState);
  const location = useLocation();

  const isMainPage = location.pathname === '/ua' || location.pathname === '/en' || location.pathname === '/';

  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const urlLang = i18n.language === 'uk' ? 'ua' : i18n.language;

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Липка шапка: на головній лежить поверх відео (fixed), на інших сторінках займає місце в потоці (sticky)
  const headerClasses = clsx(
    "w-full top-0 z-50 transition-all duration-300 bg-paleOlive",
    {
      "fixed": isMainPage,
      "sticky": !isMainPage,
      "py-5 lg:bg-paleOlive/75": !isScrolled,
      "py-3 lg:bg-paleOlive/95 shadow-md backdrop-blur-sm": isScrolled,
    }
  );

  useEffect(() => {
    // Темну тему прибрано: сайт завжди світлий, старий вибір теми з localStorage скидаємо
    document.documentElement.classList.remove("dark");
    try {
      localStorage.removeItem("theme");
    } catch {}
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const NavLinks = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <ul className="flex flex-col lg:flex-row lg:gap-3 xl:gap-6 2xl:gap-15 list-none">
      <li><ServicesDropdown urlLang={urlLang} t={t} onLinkClick={onLinkClick} /></li>
      <li onClick={onLinkClick}><LinkHeader url={`/${urlLang}/review`}>{t("Відгуки")}</LinkHeader></li>
      <li onClick={onLinkClick}><LinkHeader url={`/${urlLang}/price-list`}>{t("Ціни")}</LinkHeader></li>
      <li onClick={onLinkClick}><LinkHeader url={`/${urlLang}/our-work`}>{t("Роботи")}</LinkHeader></li>
      <li onClick={onLinkClick}><LinkHeader url={`/${urlLang}/contacts`}>{t("Контакти")}</LinkHeader></li>
      <li onClick={onLinkClick}><LinkHeader url={doctorsPath(urlLang)}>{t("Лікарі")}</LinkHeader></li>
      <li onClick={onLinkClick}><LinkHeader url={blogPath(urlLang)}>{t("Блог")}</LinkHeader></li>
    </ul>
  );

  return (
    <header className={headerClasses} role="banner">
      <div className="flex justify-around items-center lg:flex-row">

        <div className="flex-shrink-0">
          <Link to="/" aria-label={t("Зубна Фея — на головну")}>
            {/* Логотип - WebP 160/320/480 px (6/15/24 КБ) під щільність екрана замість logo.svg (131 КБ, усередині вбудований PNG 2082x1518);
                object-contain вписує його в рамку так само, як SVG; на сторінці цін логотип - LCP, тому високий пріоритет */}
            {themeStateCurrent ? <img
              src="/assets/logo.webp"
              srcSet="/assets/logo-160.webp 160w, /assets/logo-320.webp 320w, /assets/logo.webp 480w"
              sizes="144px"
              alt="Зубна Фея логотип"
              width="50"
              height="50"
              className={clsx("w-36 object-contain transition-all duration-300", isScrolled ? "h-16" : "h-24")}
              style={{ aspectRatio: '216 / 71' }}
              {...{ fetchpriority: "high" }}
            /> : <img
              src="/assets/logo_light.webp"
              srcSet="/assets/logo_light-160.webp 160w, /assets/logo_light-320.webp 320w, /assets/logo_light.webp 480w"
              sizes="144px"
              alt="Tooth Fairy Clinic Logo"
              width="50"
              height="50"
              className="h-24 w-36 object-contain"
              style={{ aspectRatio: '216 / 71' }}
            />}
          </Link>
        </div>

        <nav className="hidden lg:flex items-center lg:gap-4 xl:gap-8 2xl:gap-10" aria-label={t("Основна навігація")}>
          <NavLinks />

          <div className="flex items-center ml-auto lg:gap-2 xl:gap-4">
            <LanguageSwitcher />
            <Link to={`/${urlLang}/contacts`}>
              <Button variant="header" >{t('Записатися')}</Button>
            </Link>
          </div>
        </nav>


        <div className="lg:hidden ml-auto flex items-center gap-2 min-[360px]:gap-4">

          <Link to={`/${urlLang}/contacts`}>
            <Button variant="header" >{t('Записатися')}</Button>
          </Link>

          <button
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label={t("Відкрити меню")}
            className="p-2"
          >
            <MenuIcon
              className={clsx("w-6 h-6 transition-colors",
                themeStateCurrent ? "text-darkGray" : "text-white"
              )}
            />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav className="lg:hidden mt-5 pb-5 border-t border-white/10 max-h-[calc(100svh-6rem)] overflow-y-auto" aria-label={t("Мобільна навігація")}>

          <div className="flex flex-col space-y-4 pt-4">
            <NavLinks onLinkClick={() => setIsMobileMenuOpen(false)} />

            <div className="flex items-center justify-between border-t border-white/10 pt-4 px-2">
              <LanguageSwitcher />
            </div>
          </div>

        </nav>
      )}
    </header>
  );
};
