import { FC } from "react";
import { HashLink } from "react-router-hash-link";
import { useTranslation } from "react-i18next";

export interface Crumb {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items, className = "" }) => {
  const { t } = useTranslation();

  const visible = items.filter((item) => item.label);

  if (visible.length < 2) {
    return null;
  }

  return (
    <nav
      aria-label={t("Хлібні крихти")}
      className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {visible.map((item, index) => {
          const isLast = index === visible.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className={
                isLast
                  ? "flex items-center gap-x-2"
                  : "flex items-center gap-x-2 after:content-['/']"
              }
            >
              {item.to && !isLast ? (
                <HashLink smooth to={item.to} className="hover:underline">
                  {item.label}
                </HashLink>
              ) : (
                <span
                  className={isLast ? "text-gray-800 dark:text-gray-200 font-medium" : ""}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export const buildBreadcrumbSchema = (
  items: Crumb[],
  baseUrl: string,
  id: string
) => ({
  "@type": "BreadcrumbList",
  "@id": id,
  itemListElement: items
    .filter((item) => item.label)
    .map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.to ? { item: `${baseUrl}${item.to}` } : {}),
    })),
});
