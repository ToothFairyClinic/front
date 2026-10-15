import { useState } from "react";
import { ReactComponent as AccessTimeIcon } from "@app/assets/icons/access_time.svg";
import { ReactComponent as SmartPhoneIcon } from "@app/assets/icons/smartphone.svg";
import { ReactComponent as InstagramIcon } from "@app/assets/icons/instagram.svg";
import { ReactComponent as FacebookIcon } from "@app/assets/icons/facebook.svg";
import { ReactComponent as ViberIcon } from "@app/assets/icons/viber.svg";
import { ReactComponent as HomeAddress } from "@app/assets/icons/home-address.svg";
import { ReactComponent as Mail } from "@app/assets/icons/Email.svg";
import { Link } from "@app/common/router/router";
import { ConsultationModal } from "@app/common/components/consultation-modal/lazy-consultation-modal";
import { useGetServicesQuery } from "@app/core/types";
import { doctorsPath } from "@app/common/utils/doctors-path";
import { useTranslation } from "react-i18next";

const PHONE_NUMBER = "+380934599911";
const PHONE_NUMBER_DISPLAY = "+38 (093) 459-99-11";
const PHONE_NUMBER_SECONDARY = "+380681689911";
const PHONE_NUMBER_SECONDARY_DISPLAY = "+38 (068) 168-99-11";
const EMAIL_ADDRESS = "admin@toothfairy.clinic";
const MAPS_URL = "https://maps.google.com/?cid=9840173224086134310";

const linkClass = "hover:text-paleOlive transition-colors";
const titleClass = "text-lg font-bold text-white mb-5";

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const { data } = useGetServicesQuery();

  const lang = i18n.language === "en" ? "en" : "ua";
  const isEn = lang === "en";
  const viberLink = `viber://chat?number=%2B${PHONE_NUMBER_SECONDARY.replace("+", "")}`;

  // Напрями послуг з тієї ж відповіді, що й меню в шапці (кеш Apollo), тому додаткового запиту немає
  const services = (data?.services ?? [])
    .map((s) => ({
      id: s.id,
      name: ((isEn ? s.name_en : s.name) || s.name).replace(/ в Білій Церкві$/, ""),
      slug: isEn ? s.slug_en : s.slug,
    }))
    .filter((s) => s.slug);

  const pages = [
    { to: doctorsPath(lang), label: t("Лікарі") },
    { to: `/${lang}/price-list`, label: t("Ціни") },
    { to: `/${lang}/review`, label: t("Відгуки") },
    { to: `/${lang}/our-work`, label: t("Роботи") },
    { to: `/${lang}/blog`, label: t("Блог") },
    { to: `/${lang}/contacts`, label: t("Контакти") },
  ];

  const socials = [
    { href: "https://www.instagram.com/toothfairy.clinic", label: "Instagram", Icon: InstagramIcon },
    { href: "https://www.facebook.com/bcdentist.toothfairy/", label: "Facebook", Icon: FacebookIcon },
    { href: viberLink, label: "Viber", Icon: ViberIcon },
  ];

  return (
    <footer className="bg-darkGray text-palePeach/80 z-10">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 pt-14 pb-8 md:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.75fr)_minmax(0,0.6fr)_minmax(0,1.05fr)] lg:gap-10">
          <div>
            <Link to={`/${lang}`} aria-label={t("На головну")} className="inline-block">
              <img
                src="/assets/logo_light.svg"
                alt={t("Зубна Фея логотип")}
                width="160"
                height="111"
                loading="lazy"
                className="h-24 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-xs text-base leading-relaxed">
              {t("Стоматологія для дітей і дорослих у Білій Церкві. Лікуємо, виправляємо прикус і відновлюємо зуби в одній клініці.")}
            </p>
            <ul className="mt-8 flex gap-3 list-none">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex items-center justify-center w-12 h-12 rounded-full border border-palePeach/25 text-palePeach hover:bg-paleOlive hover:border-paleOlive hover:text-darkGray transition-colors"
                  >
                    <Icon width={24} height={24} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={t("Послуги")}>
            <p className={titleClass}>
              <Link to={`/${lang}/services`} className={linkClass}>
                {t("Послуги")}
              </Link>
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 list-none text-base">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={`/${lang}/services/${s.slug}`} className={linkClass}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("Додаткова навігація")}>
            <p className={titleClass}>{t("Клініка")}</p>
            <ul className="flex flex-col gap-3 list-none text-base">
              {pages.map((p) => (
                <li key={p.to}>
                  <Link to={p.to} className={linkClass}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={titleClass}>{t("Контакти")}</p>
            <address className="not-italic flex flex-col gap-4 text-base">
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className={`flex gap-3 items-start ${linkClass}`}>
                <HomeAddress width={22} height={22} className="shrink-0 mt-0.5" aria-hidden="true" />
                <span>{t("вул. Вокзальна 22, м. Біла Церква, Київська область")}</span>
              </a>
              <p className="flex gap-3 items-center">
                <AccessTimeIcon width={22} height={22} className="shrink-0" aria-hidden="true" />
                <span>{t("ПН-СБ")}: 9:30-19:00</span>
              </p>
              <div className="flex gap-3 items-start">
                <SmartPhoneIcon width={22} height={22} className="shrink-0 mt-1" aria-hidden="true" />
                <div className="flex flex-col gap-1 text-lg font-bold text-white">
                  <a href={`tel:${PHONE_NUMBER_SECONDARY}`} className={linkClass}>
                    {PHONE_NUMBER_SECONDARY_DISPLAY}
                  </a>
                  <a href={`tel:${PHONE_NUMBER}`} className={linkClass}>
                    {PHONE_NUMBER_DISPLAY}
                  </a>
                </div>
              </div>
              <a href={`mailto:${EMAIL_ADDRESS}`} className={`flex gap-3 items-center ${linkClass}`}>
                <Mail width={22} height={22} className="shrink-0" aria-hidden="true" />
                <span>{EMAIL_ADDRESS}</span>
              </a>
            </address>
            <button
              type="button"
              onClick={() => setIsConsultationOpen(true)}
              className="mt-7 w-full sm:w-auto lg:w-full whitespace-nowrap bg-paleOlive text-darkGray font-bold text-base py-3 px-6 rounded-full hover:bg-white transition-colors"
            >
              {t("Записатися на консультацію")}
            </button>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-palePeach/15 flex flex-col md:flex-row gap-3 justify-between text-sm text-palePeach/60">
          <span>{new Date().getFullYear()} {t("© Клініка “Зубна Фея”. Усі права захищені.")}</span>
          <Link to={`/${lang}/privacy-policy`} className={linkClass}>
            {t("Політика конфіденційності")}
          </Link>
        </div>
      </div>

      <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
    </footer>
  );
};
