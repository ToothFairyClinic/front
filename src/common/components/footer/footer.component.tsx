import { ReactComponent as Logotype } from "@app/assets/images/logo.svg";
import { ReactComponent as AccessTimeIcon } from "@app/assets/icons/access_time.svg";
import { ReactComponent as SmartPhoneIcon } from "@app/assets/icons/smartphone.svg";
import { ReactComponent as InstagramIcon } from "@app/assets/icons/instagram.svg";
import { ReactComponent as InstagramDarkIcon } from "@app/assets/icons/instagram-dark.svg";
import { ReactComponent as FacebookIcon } from "@app/assets/icons/facebook.svg";
import { ReactComponent as FacebookDarkIcon } from "@app/assets/icons/facebook-dark.svg";
import { ReactComponent as TelegramIcon } from "@app/assets/icons/telegram.svg";
import { ReactComponent as TelegramDarkIcon } from "@app/assets/icons/telegram-dark.svg";
import { Link } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { themeState } from "@app/modules/cart/store/theme-state";

export const Footer = () => {
  const themeStateCurrent = useReactiveVar(themeState);

  return (
    <div className="bg-paleOlive dark:bg-darkGray/75 p-5 z-10 transition  delay-150 px-5 py-10 flex flex-col items-center  md:px-1">
      <Logotype width={216} hanging={71} className="mb-5" />

      <div className="text-darkGray dark:text-palePeach text-xl font-normal flex flex-col gap-8 sm:flex-row md:gap-36 flex-wrap ">
        <ul className="flex flex-col gap-3">
          <li className="dark:hover:text-paleOlive">
            <Link to="/">Головна</Link>
          </li>
          <li className="dark:hover:text-paleOlive">
            <Link to="/services">Послуги</Link>
          </li>
          <li className="dark:hover:text-paleOlive">
            <Link to="/products">Товари</Link>
          </li>
        </ul>

        <ul className="flex flex-col gap-3">
          <li className="dark:hover:text-paleOlive">
            <Link to="/login">Вхід</Link>
          </li>
          <li className="dark:hover:text-paleOlive">
            <Link to="/personnel">Персонал</Link>
          </li>
          <li className="dark:hover:text-paleOlive">
            <Link
              to="/price-list
            3"
            >
              Прайс лист
            </Link>
          </li>
        </ul>

        <ul className="flex flex-col gap-8 md:gap-3">
          <li className="flex gap-2 dark:hover:text-paleOlive items-center">
            <AccessTimeIcon width={31} hanging={31} />
            ПН-НД: 9:00-20:00
          </li>
          <li className="flex gap-2 dark:hover:text-paleOlive items-center">
            <SmartPhoneIcon width={31} hanging={31} />
            +380961212120
          </li>
        </ul>
      </div>

      <ul className="flex gap-6 justify-center md:justify-end mt-8">
        <li className="dark:hover:text-paleOlive ">
          <a href="https://www.instagram.com/vroda_club_estetic/">
            {themeStateCurrent ? <InstagramDarkIcon /> : <InstagramIcon />}
          </a>
        </li>
        <li>{themeStateCurrent ? <FacebookDarkIcon /> : <FacebookIcon />}</li>

        <li>
          <a href="https://t.me/+380961212120">
            {themeStateCurrent ? <TelegramDarkIcon /> : <TelegramIcon />}
          </a>
        </li>
      </ul>
    </div>
  );
};
