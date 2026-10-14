import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { ConsultationModal } from "@app/common/components/consultation-modal/consultation-modal.component";
import { Mascot } from "@app/modules/main/components/mascot/mascot.component";

const PHONES = [
  { href: "tel:+380681689911", label: "+38 (068) 168-99-11" },
  { href: "tel:+380934599911", label: "+38 (093) 459-99-11" },
];

interface ServiceBookingCardProps {
  hasPrices: boolean;
}

/** Бічна картка запису: кнопка, телефони, перехід до цін. На ній сидить котик. */
export const ServiceBookingCard: FC<ServiceBookingCardProps> = ({ hasPrices }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mt-0 lg:mt-36">
      <Mascot pose="toothbrush" height={150} className="bottom-full right-8 -mb-1" />
      <div className="flex flex-col gap-5 rounded-[2rem] bg-paleOlive/80 dark:bg-white/10 px-7 py-8 text-darkGray dark:text-white">
        <p className="text-2xl font-bold leading-snug">{t("Запис на прийом")}</p>
        <p className="text-base leading-relaxed opacity-80">
          {t("Адміністратор допоможе обрати лікаря та зручний час прийому.")}
        </p>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center justify-center font-semibold text-base px-6 py-3.5 rounded-full bg-darkGray text-white hover:bg-black dark:bg-paleOlive dark:text-darkGray dark:hover:bg-white transition-all duration-300 shadow-md hover:shadow-xl active:scale-95"
        >
          {t("Записатися на консультацію")}
        </button>
        <div className="flex flex-col gap-1.5 text-lg font-semibold">
          {PHONES.map((phone) => (
            <a key={phone.href} href={phone.href} className="hover:underline underline-offset-4">
              {phone.label}
            </a>
          ))}
        </div>
        {hasPrices && (
          <button
            type="button"
            onClick={() => document.getElementById("prices")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="self-start text-base underline decoration-darkGray/40 decoration-2 underline-offset-4 hover:decoration-darkGray dark:decoration-white/40"
          >
            {t("Ціни на послугу")}
          </button>
        )}
      </div>
      <ConsultationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
