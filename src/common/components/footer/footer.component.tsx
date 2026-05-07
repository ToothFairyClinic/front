import { ReactComponent as Logotype } from "@app/assets/images/logo.svg";
import { ReactComponent as AccessTimeIcon } from "@app/assets/icons/access_time.svg";
import { ReactComponent as SmartPhoneIcon } from "@app/assets/icons/smartphone.svg";
import { ReactComponent as InstagramIcon } from "@app/assets/icons/instagram.svg";
import { ReactComponent as InstagramDarkIcon } from "@app/assets/icons/instagram-dark.svg";
import { ReactComponent as FacebookIcon } from "@app/assets/icons/facebook.svg";
import { ReactComponent as FacebookDarkIcon } from "@app/assets/icons/facebook-dark.svg";
import { ReactComponent as TelegramIcon } from "@app/assets/icons/telegram.svg";
import { ReactComponent as TelegramDarkIcon } from "@app/assets/icons/telegram-dark.svg";
import { HashLink as Link } from "react-router-hash-link";
import { useReactiveVar } from "@apollo/client";
import { themeState } from "@app/modules/cart/store/theme-state";
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const themeStateCurrent = useReactiveVar(themeState);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <footer className="bg-paleOlive dark:bg-darkGray/75 p-5 z-10 transition duration-300 px-5 py-10 flex flex-col items-center md:px-1 min-h-[450px]">

      <Link to="/" aria-label={t("На головну")}>
        <Logotype width={216} height={71} className="mb-8" />
      </Link>

      <div className="text-darkGray dark:text-palePeach text-xl font-normal flex flex-col gap-8 sm:flex-row md:gap-36 flex-wrap justify-center">

        <nav aria-label={t("Додаткова навігація")}>
          <div className="flex flex-col gap-8 sm:flex-row md:gap-36">
            <ul className="flex flex-col gap-3 list-none">
              <li className="dark:hover:text-paleOlive hover:text-white  min-h-[28px]">
                <Link to="/">{t("Головна")}</Link>
              </li>
              <li className="dark:hover:text-paleOlive hover:text-white  min-h-[28px]">
                <Link smooth to="/#services">{t("Послуги")}</Link>
              </li>
            </ul>

            <ul className="flex flex-col gap-3 list-none">
              <li className="dark:hover:text-paleOlive hover:text-white  min-h-[28px]">
                <Link smooth to="/#personnel">{t("Персонал")}</Link>
              </li>
              <li className="dark:hover:text-paleOlive hover:text-white  min-h-[28px]">
                <Link to={`/${lang}/price-list`}>{t("Прайс лист")}</Link>
              </li>
            </ul>
          </div>
        </nav>

        <address className="not-italic">
          <ul className="flex flex-col gap-4 md:gap-3 list-none">
            <li className="flex gap-2 items-center">
              <AccessTimeIcon width={31} height={31} aria-hidden="true" />
              <span>{t("ПН-СБ")}: 9:30-19:00</span>
            </li>
            <li className="flex gap-2 items-center group">
              <SmartPhoneIcon width={31} height={31} aria-hidden="true" />
              <a href="tel:+380681689911" className="dark:hover:text-paleOlive hover:text-white ">
                +38 (068) 168-99-11
              </a>
            </li>
            <li className="flex gap-2 items-center group">
              <SmartPhoneIcon width={31} height={31} aria-hidden="true" />
              <a href="tel:+380934599911" className="dark:hover:text-paleOlive hover:text-white ">
                +38 (093) 459-99-11
              </a>
            </li>
          </ul>
        </address>
      </div>

      <ul className="flex gap-6 justify-center mt-12 list-none min-h-[32px]">
        <li>
          <a href="https://www.instagram.com/toothfairy.clinic" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
            {themeStateCurrent ? <InstagramDarkIcon width={32} height={32} /> : <InstagramIcon width={32} height={32} />}
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/bcdentist.toothfairy/" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
            {themeStateCurrent ? <FacebookDarkIcon width={32} height={32} /> : <FacebookIcon width={32} height={32} />}
          </a>
        </li>
        <li>
          <a href="https://t.me/+380681689911" target="_blank" rel="noreferrer" aria-label="Telegram" className="hover:opacity-80 transition-opacity">
            {themeStateCurrent ? <TelegramDarkIcon width={32} height={32} /> : <TelegramIcon width={32} height={32} />}
          </a>
        </li>
      </ul>

      <div className="mt-10 text-sm opacity-60 dark:text-white">
        © {new Date().getFullYear()} Tooth Fairy Clinic. All rights reserved.
      </div>
    </footer>
  );
};