import { ReactComponent as AccessTimeIcon } from "@app/assets/icons/access_time.svg";
import { ReactComponent as SmartPhoneIcon } from "@app/assets/icons/smartphone.svg";
import { ReactComponent as InstagramIcon } from "@app/assets/icons/instagram.svg";
import { ReactComponent as FacebookIcon } from "@app/assets/icons/facebook.svg";
import { ReactComponent as ViberIcon } from "@app/assets/icons/viber.svg";
import { ReactComponent as HomeAddress } from "@app/assets/icons/home-address.svg";
import { ReactComponent as Mail } from "@app/assets/icons/Email.svg";
import { HashLink as Link } from "react-router-hash-link";
import { useReactiveVar } from "@apollo/client";
import { themeState } from "@app/modules/cart/store/theme-state";
import { useTranslation } from "react-i18next";

const PHONE_NUMBER = "+380934599911";
const PHONE_NUMBER_DISPLAY = "+38 (093) 459-99-11";
const PHONE_NUMBER_SECONDARY = "+380681689911";
const PHONE_NUMBER_SECONDARY_DISPLAY = "+38 (068) 168-99-11";
const EMAIL_ADDRESS = "admin@toothfairy.clinic";

export const Footer = () => {
  const themeStateCurrent = useReactiveVar(themeState);
  const { t, i18n } = useTranslation();

  const lang = i18n.language === 'uk' ? 'ua' : i18n.language;

  const viberLink = `viber://chat?number=%2B${PHONE_NUMBER_SECONDARY.replace('+', '')}`;

  return (
    <footer className="bg-paleOlive dark:bg-darkGray/75 p-5 z-10 transition duration-300 px-5 py-10 flex flex-col items-center md:px-1 min-h-[450px]">

      <Link to="/" aria-label={t("На головну")}>
        {themeStateCurrent ? (
          <img
            src="/assets/logo.svg"
            alt={t("Зубна Фея логотип")}
            width="216"
            height="71"
            className="h-24 w-auto"
            style={{ aspectRatio: '216 / 71' }}
          />
        ) : (
          <img
            src="/assets/logo_light.svg"
            alt={t("Зубна Фея логотип")}
            width="216"
            height="71"
            className="h-24 w-auto"
            style={{ aspectRatio: '216 / 71' }}
          />
        )}
      </Link>

      <div className="text-darkGray dark:text-palePeach text-xl font-normal flex flex-col gap-8 sm:flex-row md:gap-36 flex-wrap justify-center mt-8">

        <nav aria-label={t("Додаткова навігація")}>
          <div className="flex flex-col gap-8 sm:flex-row md:gap-36">
            <ul className="flex flex-col gap-3 list-none">
              <li className="dark:hover:text-paleOlive hover:text-white min-h-[28px] transition-colors">
                <Link to="/">{t("Головна")}</Link>
              </li>
              <li className="dark:hover:text-paleOlive hover:text-white min-h-[28px] transition-colors">
                <Link smooth to="/#services">{t("Послуги")}</Link>
              </li>
            </ul>

            <ul className="flex flex-col gap-3 list-none">
              <li className="dark:hover:text-paleOlive hover:text-white min-h-[28px] transition-colors">
                <Link smooth to="/#personnel">{t("Персонал")}</Link>
              </li>
              <li className="dark:hover:text-paleOlive hover:text-white min-h-[28px] transition-colors">
                <Link to={`/${lang}/price-list`}>{t("Прайс лист")}</Link>
              </li>
            </ul>
          </div>
        </nav>

        <address className="not-italic flex flex-col sm:flex-row gap-8 md:gap-12">
          <ul className="flex flex-col gap-4 md:gap-3 list-none">
            <li className="flex gap-2 items-center">
              <AccessTimeIcon width={31} height={31} aria-hidden="true" />
              <span>{t("ПН-СБ")}: 9:30-19:00</span>
            </li>
            <li className="flex gap-2 items-center group">
              <HomeAddress width={24} height={32} aria-hidden="true" />
              <span className="max-w-xs">{t("вул. Вокзальна 22, м. Біла Церква, Київська область")}</span>
            </li>
            <li className="flex gap-2 items-center group">
              <Mail width={24} height={32} aria-hidden="true" />
              <a href={`mailto:${EMAIL_ADDRESS}`} className="max-w-xs hover:opacity-80 transition-opacity">
                {EMAIL_ADDRESS}
              </a>
            </li>
          </ul>

          <div className="flex flex-col gap-4 md:gap-3">
            <ul className="flex flex-col gap-4 md:gap-3 list-none">
              <li className="flex gap-2 items-center group">
                <SmartPhoneIcon width={31} height={31} aria-hidden="true" />
                <a href={`tel:${PHONE_NUMBER_SECONDARY}`} className="dark:hover:text-paleOlive hover:text-white transition-colors">
                  {PHONE_NUMBER_SECONDARY_DISPLAY}
                </a>
              </li>
              <li className="flex gap-2 items-center group">
                <SmartPhoneIcon width={31} height={31} aria-hidden="true" />
                <a href={`tel:${PHONE_NUMBER}`} className="dark:hover:text-paleOlive hover:text-white transition-colors">
                  {PHONE_NUMBER_DISPLAY}
                </a>
              </li>
            </ul>


            <a
              href={`tel:${PHONE_NUMBER_SECONDARY}`}
              className="mt-2 bg-darkGray dark:bg-palePeach text-palePeach dark:text-darkGray text-center py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center shadow-md"
            >
              {t("Записатись")}
            </a>
          </div>
        </address>
      </div>

      <ul className="flex gap-6 justify-center mt-12 list-none min-h-[32px] text-darkGray dark:text-palePeach">
        <li>
          <a href="https://www.instagram.com/toothfairy.clinic" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
            <InstagramIcon width={42} height={42} />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/bcdentist.toothfairy/" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
            <FacebookIcon width={42} height={42} />
          </a>
        </li>
        <li>
          <a
            href={viberLink}
            target="_blank"
            rel="noreferrer"
            aria-label="Viber"
            className="hover:opacity-80 transition-opacity"
          >
            <ViberIcon className="stroke-[2.0]" width={42} height={42} />
          </a>
        </li>
      </ul>


      <div className="mt-12 flex flex-col md:flex-row items-center gap-4 text-sm opacity-60 dark:text-white w-full max-w-4xl justify-between border-t border-darkGray/20 dark:border-white/20 pt-6">
        <span>{new Date().getFullYear()} {t("© Клініка “Зубна Фея”. Усі права захищені.")}</span>

        <Link
          to={`/${lang}/privacy-policy`}
          className="hover:underline hover:text-white dark:hover:text-paleOlive transition-colors"
        >
          {t("Політика конфіденційності")}
        </Link>
      </div>
    </footer>
  );
};