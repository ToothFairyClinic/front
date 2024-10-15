import React, { useState, useEffect } from "react";
import { ReactComponent as LightThemeSolidIcon } from "@app/assets/icons/lightThemeIcon.svg";
import { ReactComponent as DarkThemeSolidIcon } from "@app/assets/icons/darkThemeIcon.svg";
import { ReactComponent as Logotype } from "@app/assets/images/logo.svg";
import { ReactComponent as LogotypeLight } from "@app/assets/images/logo_light.svg";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../button/button.component";
import { LinkHeader } from "../link-header/link-header.component";
import { themeState, toggleTheme } from "@app/modules/cart/store/theme-state";
import { ReactComponent as MenuIcon } from "@app/assets/icons/bars-3.svg";
import { FC } from "react";
import { useReactiveVar } from "@apollo/client";
import clsx from "clsx";
import LanguageSwitcher from "../language-switcher/language-switcher.component"; // Імпортуйте компонент

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const themeStateCurrent = useReactiveVar(themeState);
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  const headerClasses = clsx(
    "lg:bg-paleOlive/75  w-full lg:dark:bg-darkGray/75 p-5 z-10 transition  delay-150  z-20 bg-paleOlive dark:bg-darkGray",
    {
      absolute: isMainPage,
    }
  );

  const [theme, setTheme] = useState(themeStateCurrent ? "light" : "dark");
  localStorage.setItem("theme", theme);

  useEffect(() => {
    setTheme(themeStateCurrent ? "light" : "dark");
    localStorage.theme = theme;

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeStateCurrent, theme]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={headerClasses}>
      <div className="container mx-auto flex justify-around items-center md:flex-col lg:flex-row  ">
        <div>
          {isMainPage ? (
            <div>{themeStateCurrent ? <Logotype /> : <LogotypeLight />}</div>
          ) : (
            <Link to="/">
              {themeStateCurrent ? <Logotype /> : <LogotypeLight />}
            </Link>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-5 md:gap-10 ">
          <div className="flex space-x-5 lg:gap-15 md:gap-5 ">
            <LinkHeader url="/review">Відгуки</LinkHeader>
            <LinkHeader url="/price-list">Прайс лист</LinkHeader>
            <LinkHeader url="/our-work">Роботи</LinkHeader>
            <LinkHeader url="/contacts">Контакти</LinkHeader>
          </div>

          <div className="flex items-center space-x-5 ml-auto gap-2 ">
            <button onClick={toggleTheme} id="shopping-cart-item">
              {themeState() ? (
                <DarkThemeSolidIcon className="w-6 h-6 text-darkGray dark:hover:text-paleOlive  hover:text-white" />
              ) : (
                <LightThemeSolidIcon className="w-6 h-6  text-white dark:hover:text-paleOlive  hover:text-white" />
              )}
            </button>
            {/* Додайте перемикач мови */}
            <LanguageSwitcher />
          </div>
        </div>

        <div className="md:hidden ml-auto">
          <button onClick={toggleMobileMenu}>
            {themeState() ? (
              <MenuIcon
                className="w-6 h-6 dark:fill-white fill-darkGray"
                stroke="black"
              />
            ) : (
              <MenuIcon
                className="w-6 h-6 dark:fill-white fill-darkGray"
                stroke="white"
              />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-5 ">
          <div className="flex flex-col space-y-3">
            <button onClick={toggleMobileMenu}>
              <LinkHeader url="/review">Відгуки</LinkHeader>
            </button>
            <button onClick={toggleMobileMenu}>
              <LinkHeader url="/price-list">Прайс лист</LinkHeader>
            </button>
            <button onClick={toggleMobileMenu}>
              <LinkHeader url="/our-work">Роботи</LinkHeader>
            </button>
            <button onClick={toggleMobileMenu}>
              <LinkHeader url="/contacts">Контакти</LinkHeader>
            </button>
          </div>

          <div className="flex flex-row-reverse items-center space-x-5 mt-4">
            <button onClick={toggleTheme}>
              {themeState() ? (
                <DarkThemeSolidIcon className="w-6 h-6 text-darkGray dark:hover:text-paleOlive  hover:text-white" />
              ) : (
                <LightThemeSolidIcon className="w-6 h-6  text-white " />
              )}
            </button>
            {/* Перемикач мови для мобільної версії */}
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </div>
  );
};
