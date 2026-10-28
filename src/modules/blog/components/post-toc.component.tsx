import { FC, useEffect, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { TocItem } from "../utils/post-utils";

const scrollTo = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
  const el = document.getElementById(id);
  if (!el) return;
  event.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
};

/** Підсвічує розділ, який зараз читають. */
const useActiveHeading = (items: TocItem[]) => {
  const [active, setActive] = useState<string>();
  useEffect(() => {
    if (!items.length || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -65% 0px" }
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);
  return active;
};

const TocList: FC<{ items: TocItem[]; active?: string }> = ({ items, active }) => (
  <ol className="flex flex-col gap-1 list-none p-0 m-0">
    {items.map((item, i) => (
      <li key={item.id}>
        <a
          href={`#${item.id}`}
          onClick={scrollTo(item.id)}
          className={clsx(
            "flex gap-3 rounded-lg px-3 py-2 text-base leading-snug transition-colors",
            active === item.id ? "bg-paleOlive/60 dark:bg-white/15 font-semibold" : "hover:bg-paleOlive/30 dark:hover:bg-white/10"
          )}
        >
          <span className="tabular-nums shrink-0 w-5 text-darkGray/75 dark:text-white/60">{i + 1}.</span>
          <span>{item.title}</span>
        </a>
      </li>
    ))}
  </ol>
);

/** Зміст статті збоку на ПК. */
export const PostToc: FC<{ items: TocItem[] }> = ({ items }) => {
  const { t } = useTranslation();
  const active = useActiveHeading(items);
  if (items.length < 2) return null;

  return (
    <nav aria-label={t("Зміст")} className="hidden lg:flex flex-col gap-3 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-6 text-darkGray dark:text-white">
      <p className="text-xl font-bold px-3">{t("Зміст")}</p>
      <TocList items={items} active={active} />
    </nav>
  );
};

/** Згорнутий зміст перед текстом на телефоні. */
export const PostTocMobile: FC<{ items: TocItem[] }> = ({ items }) => {
  const { t } = useTranslation();
  if (items.length < 2) return null;

  return (
    <details className="lg:hidden group rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-darkGray dark:text-white">
      <summary className="flex justify-between items-center cursor-pointer list-none px-5 py-4 text-lg font-bold select-none">
        {t("Зміст")}
        <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="px-2 pb-4">
        <TocList items={items} />
      </div>
    </details>
  );
};
