import { FC } from "react";
import { Contacts } from "../components/contacts.component";
import { useMediaQuery } from "react-responsive";
import { ReactComponent as AccessTimeIcon } from "@app/assets/icons/access_time.svg";
import { ReactComponent as SmartPhoneIcon } from "@app/assets/icons/smartphone.svg";
import { ReactComponent as LocationIcon } from "@app/assets/icons/location.svg";

interface ContactPageProps {}

export const ContactPage: FC<ContactPageProps> = ({}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="flex lg:flex-row flex-col-reverse dark:bg-darkGray gap-14 py-24 justify-center items-center lg:items-start">
      {isMobile ? (
        <Contacts mapHeight="350" mapWidth="320" />
      ) : (
        <Contacts mapHeight="586" mapWidth="749" />
      )}
      <div className="flex flex-col ">
        <h1 className="text-4xl sm:text-6xl lg:text-6xl dark:text-white border-b border-paleOlive px-15 py-4">
          Контакти
        </h1>

        <div className="px-15 dark:text-white border-b border-paleOlive  py-4">
          <ul className="flex flex-col gap-7 md:gap-3 text-lg sm:text-3xl  lg:text-3xl">
            <li className="flex gap-2 dark:hover:text-paleOlive items-center dark:text-white">
              <AccessTimeIcon width={31} hanging={31} />
              ПН-СБ: 9:30-19:00
            </li>
            <li className="flex gap-2 dark:hover:text-paleOlive items-center dark:text-white">
              <SmartPhoneIcon width={31} hanging={31} />
              +380681689911
            </li>
            <li className="flex gap-2 dark:hover:text-paleOlive items-center dark:text-white">
              <SmartPhoneIcon width={31} hanging={31} />
              +380934599911
            </li>
          </ul>
        </div>

        <div className="px-15 dark:text-white border-b border-paleOlive  py-4">
          <ul className="flex flex-col gap-7 md:gap-3 text-lg sm:text-3xl  lg:text-3xl">
            <li className="flex gap-2 dark:hover:text-paleOlive items-center dark:text-white">
              <LocationIcon width={31} hanging={31} />
              Київська область, Біла Церква, Вокзальна 22
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
