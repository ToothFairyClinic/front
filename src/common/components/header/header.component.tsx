import { ReactComponent as LightThemeSolidIcon } from "@app/assets/icons/lightThemeIcon.svg";
import { ReactComponent as DarkThemeSolidIcon } from "@app/assets/icons/darkThemeIcon.svg";
import { ReactComponent as Logotype } from "@app/assets/images/logo.svg";
import { ReactComponent as LogotypeLight } from "@app/assets/images/logo_light.svg";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../button/button.component";
import { LinkHeader } from "../link-header/link-header.component";
import { themeState, toggleTheme } from "@app/modules/cart/store/theme-state";
import { ReactComponent as MenuIcon } from "@app/assets/icons/menuIcons.svg";
import { FC, useEffect, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import clsx from "clsx";

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const themeStateCurrent = useReactiveVar(themeState);
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  const headerClasses = clsx(
    "bg-paleOlive/75  w-full dark:bg-darkGray/75 p-5 z-10 transition  delay-150  ",
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
          <Link to="/">
            {themeStateCurrent ? <Logotype /> : <LogotypeLight />}
          </Link>
        </div>

        {/* Відображаємо різницю між мобільним та десктопним видами */}
        <div className="hidden md:flex items-center space-x-5 md:gap-10 ">
          <div className="flex space-x-5 lg:gap-15 md:gap-5 ">
            <LinkHeader url="/review">Відгуки</LinkHeader>
            <LinkHeader url="/price-list">Прайс лист</LinkHeader>
            <LinkHeader url="/services">Послуги</LinkHeader>
            <LinkHeader url="/products">Товари</LinkHeader>
          </div>

          <div className="flex items-center space-x-5 ml-auto gap-2 ">
            <button onClick={toggleTheme} id="shopping-cart-item">
              {themeState() ? (
                <DarkThemeSolidIcon className="w-6 h-6 text-darkGray dark:hover:text-paleOlive  hover:text-white" />
              ) : (
                <LightThemeSolidIcon className="w-6 h-6  text-white dark:hover:text-paleOlive  hover:text-white" />
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden ml-auto">
          <button onClick={toggleMobileMenu}>
            <MenuIcon className="w-6 h-6 fill-white" />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-5">
          <div className="flex flex-col space-y-3">
            <button onClick={toggleMobileMenu}>
              <LinkHeader url="/review">Відгуки</LinkHeader>
            </button>
            <button onClick={toggleMobileMenu}>
              <LinkHeader url="/price-list">Прайс лист</LinkHeader>
            </button>
            <button onClick={toggleMobileMenu}>
              <LinkHeader url="/services">Послуги</LinkHeader>
            </button>
            <button onClick={toggleMobileMenu}>
              <LinkHeader url="/products">Товари</LinkHeader>
            </button>
            <button onClick={toggleMobileMenu}>
              <LinkHeader url="/checkout">Корзина</LinkHeader>
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
          </div>
        </div>
      )}
    </div>
  );
};
