import { FC, MouseEvent, useMemo } from "react";
import DOMPurify from "isomorphic-dompurify";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { followInternalLinks } from "@app/common/utils/internal-links";

interface HtmlContentProps {
  html?: string | null;
  className?: string;
}

const SITE_HOSTS = ["toothfairy.clinic", "www.toothfairy.clinic"];

/** HTML з адмінки: очищення і переходи по внутрішніх посиланнях без перезавантаження сторінки. */
export const HtmlContent: FC<HtmlContentProps> = ({ html, className }) => {
  const navigate = useNavigate();

  const safeHtml = useMemo(() => {
    if (!html) return "";
    const cleaned = html.replace(/<p>\s*(?:&nbsp;|&#160;)?\s*<\/p>/gi, "");
    return followInternalLinks(DOMPurify.sanitize(cleaned, {
      ADD_ATTR: ["target"],
      FORBID_ATTR: ["style", "color"],
      FORBID_TAGS: ["font"],
    }));
  }, [html]);

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = (event.target as HTMLElement).closest("a");
    if (!anchor || anchor.target === "_blank" || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const url = new URL(anchor.href, window.location.origin);
    const isInternal = url.origin === window.location.origin || SITE_HOSTS.includes(url.hostname);
    if (!isInternal) return;
    event.preventDefault();
    navigate(url.pathname + url.search + url.hash);
  };

  if (!safeHtml) return null;

  return (
    <div
      className={clsx(
        "prose prose-lg max-w-none text-darkGray dark:text-white",
        "prose-a:text-darkGray dark:prose-a:text-white prose-a:decoration-paleOlive prose-a:decoration-2 prose-a:underline-offset-4 hover:prose-a:decoration-darkGray",
        className
      )}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
};
