import { FC, MouseEvent, RefObject, useEffect, useMemo, useRef } from "react";
import { stripUnsafe } from "@app/common/utils/strip-unsafe";
import clsx from "clsx";
import { useNavigate } from "@app/common/router/router";
import { followInternalLinks } from "@app/common/utils/internal-links";
import { expandEmbeds, runEmbedScripts } from "@app/common/utils/embed";

interface HtmlContentProps {
  html?: string | null;
  className?: string;
}

const SITE_HOSTS = ["toothfairy.clinic", "www.toothfairy.clinic"];

/** HTML з адмінки для показу: страховка, внутрішні посилання, потім блоки коду як є (їх страховка не чіпає). */
export const prepareHtml = (html?: string | null) => {
  if (!html) return "";
  const cleaned = html.replace(/<p>\s*(?:&nbsp;|&#160;|ㅤ)?\s*<\/p>/gi, "");
  return expandEmbeds(followInternalLinks(stripUnsafe(cleaned)));
};

/** Запуск скриптів із блоків коду після показу HTML. */
export const useEmbedScripts = (ref: RefObject<HTMLElement>, html: string) => {
  useEffect(() => {
    if (html.includes("tf-embed")) runEmbedScripts(ref.current);
  }, [ref, html]);
};

/** Фото з підписом, вирівнювання й код у тексті з адмінки. */
const RICH_CLASSES = [
  "prose-img:mx-auto",
  "prose-figure:my-8 [&_figure_img]:my-0 prose-figcaption:mt-3 prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:leading-snug prose-figcaption:text-darkGray/70 dark:prose-figcaption:text-white/70 [&_figcaption:empty]:hidden",
  "prose-code:before:content-none prose-code:after:content-none prose-code:font-normal prose-code:bg-paleOlive/40 prose-code:rounded prose-code:px-1",
  "[&_.tf-embed]:my-8 [&_.tf-embed_iframe]:max-w-full [&_.tf-embed_iframe]:mx-auto",
].join(" ");

/** HTML з адмінки: очищення і переходи по внутрішніх посиланнях без перезавантаження сторінки. */
export const HtmlContent: FC<HtmlContentProps> = ({ html, className }) => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  const safeHtml = useMemo(() => prepareHtml(html), [html]);
  useEmbedScripts(ref, safeHtml);

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = (event.target as HTMLElement).closest("a");
    if (!anchor || anchor.target === "_blank" || event.metaKey || event.ctrlKey || event.shiftKey) return;
    if (anchor.closest(".tf-embed")) return;
    const url = new URL(anchor.href, window.location.origin);
    const isInternal = url.origin === window.location.origin || SITE_HOSTS.includes(url.hostname);
    if (!isInternal) return;
    event.preventDefault();
    navigate(url.pathname + url.search + url.hash);
  };

  if (!safeHtml) return null;

  return (
    <div
      ref={ref}
      className={clsx(
        "prose prose-lg max-w-none text-darkGray dark:text-white",
        "prose-a:text-darkGray dark:prose-a:text-white prose-a:decoration-paleOlive prose-a:decoration-2 prose-a:underline-offset-4 hover:prose-a:decoration-darkGray",
        RICH_CLASSES,
        className
      )}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
};
