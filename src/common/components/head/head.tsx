/**
 * Заміна react-helmet-async на next/head з тим самим JSX:
 * <Helmet><title/><meta/><link/><script type="application/ld+json">{json}</script></Helmet>.
 * <html lang> ігнорується - мову сторінки ставить _document.
 */
import NextHead from "next/head";
import { Children, Fragment, isValidElement, ReactElement, ReactNode } from "react";

const flatten = (children: ReactNode): ReactElement[] =>
  Children.toArray(children).flatMap((child) =>
    isValidElement(child) && child.type === Fragment ? flatten((child.props as { children?: ReactNode }).children) : isValidElement(child) ? [child] : []
  );

/** Екранований "<" для JSON-LD. */
const LT_ESCAPED = String.fromCharCode(92) + "u003c";

const keyOf = (el: ReactElement<Record<string, any>>, index: number) => {
  const p = el.props;
  switch (el.type) {
    case "title":
      return "title";
    case "meta":
      return `meta:${p.name || p.property || p.httpEquiv || p.charSet || index}`;
    case "link":
      return `link:${p.rel}:${p.hrefLang || p.sizes || ""}`;
    case "script":
      return `script:${p.type || "js"}:${index}`;
    default:
      return `${String(el.type)}:${index}`;
  }
};

export const Helmet = ({ children }: { children?: ReactNode }) => {
  const elements = flatten(children).flatMap((el, index) => {
    if (el.type === "html" || el.type === "body") return [];
    const key = keyOf(el as ReactElement<Record<string, any>>, index);
    const props = el.props as Record<string, any>;
    if (el.type === "title") {
      const text = Children.toArray(props.children).join("");
      return [<title key={key}>{text}</title>];
    }
    if (el.type === "script" && typeof props.children === "string") {
      const { children: json, ...rest } = props;
      // "<" екрануємо, щоб текст з адмінки не міг закрити тег script
      return [<script key={key} {...rest} dangerouslySetInnerHTML={{ __html: json.replace(/</g, LT_ESCAPED) }} />];
    }
    return [{ ...el, key }];
  });

  return <NextHead>{elements}</NextHead>;
};

export const HelmetProvider = ({ children }: { children?: ReactNode }) => <>{children}</>;
