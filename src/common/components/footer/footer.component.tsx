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
  const { t } = useTranslation();

  return (
    <div className="bg-paleOlive  dark:bg-darkGray/75 p-5 z-10 transition  delay-150 px-5 py-10 flex flex-col items-center  md:px-1">
      <Logotype width={216} hanging={71} className="mb-5" />

      <div className="text-darkGray dark:text-palePeach text-xl font-normal flex flex-col gap-8 sm:flex-row md:gap-36 flex-wrap ">
        <ul className="flex flex-col gap-3 ">
          <li className="dark:hover:text-paleOlive hover:text-white">
            <Link to="/">{t(`Головна`)}</Link>
          </li>
          <li className="dark:hover:text-paleOlive hover:text-white">
            <Link smooth to="/#services">
               {t(`Послуги`)}
            </Link>
          </li>
        </ul>

        <ul className="flex flex-col gap-3">
          <li className="dark:hover:text-paleOlive hover:text-white">
            <Link smooth to="/#personnel">
                {t(`Персонал`)}
            </Link>
          </li>
          <li className="dark:hover:text-paleOlive hover:text-white">
            <Link to="/price-list">{t(`Прайс лист`)}</Link>
          </li>
        </ul>

        <ul className="flex flex-col gap-8 md:gap-3">
          <li className="flex gap-2 dark:hover:text-paleOlive items-center hover:text-white">
            <AccessTimeIcon width={31} hanging={31} />
            {t(`ПН-СБ`)}: 9:30-19:00
          </li>
          <li className="flex gap-2 dark:hover:text-paleOlive items-center hover:text-white">
            <SmartPhoneIcon width={31} hanging={31} />
            <a href="tel:+380681689911">+380681689911</a>
          </li>
          <li className="flex gap-2 dark:hover:text-paleOlive items-center dark:text-white">
              <SmartPhoneIcon width={31} hanging={31} />
              <a href="tel:+380934599911"> +380934599911</a>
            </li>
        </ul>
      </div>

      <ul className="flex gap-6 justify-center md:justify-end mt-8">
        <li className="dark:hover:text-paleOlive hover:text-white">
          <a href="https://www.instagram.com/toothfairy.clinic?igsh=d25xNmZvb2Z6a2tu">
            {themeStateCurrent ? <InstagramDarkIcon /> : <InstagramIcon />}
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/bcdentist.toothfairy/">
            {themeStateCurrent ? <FacebookDarkIcon /> : <FacebookIcon />}
          </a>
        </li>

        <li>
          <a href="https://t.me/+380681689911">
            {themeStateCurrent ? <TelegramDarkIcon /> : <TelegramIcon />}
          </a>
        </li>
      </ul>
    </div>
  );
};
