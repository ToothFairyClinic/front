/**
 * Тонкий шар над next/router з API, яким компоненти користувалися в react-router:
 * Link (to), HashLink, useNavigate, useParams, useLocation, useSearchParams, Navigate.
 */
import NextLink from "next/link";
import { useRouter } from "next/router";
import { AnchorHTMLAttributes, forwardRef, MouseEvent, ReactNode, useEffect, useMemo } from "react";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  replace?: boolean;
  /** Сумісність з react-router-hash-link: плавна прокрутка до якоря. */
  smooth?: boolean;
  children?: ReactNode;
};

const scrollToHash = (hash: string, smooth?: boolean) => {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return;
  document.getElementById(id)?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ to, replace, smooth, onClick, children, ...rest }, ref) => {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    const [path, hash] = to.split("#");
    // Якір на поточній сторінці - лише прокрутка
    if (hash && (!path || path === router.asPath.split(/[?#]/)[0])) {
      event.preventDefault();
      scrollToHash(hash, smooth);
    }
  };

  return (
    <NextLink href={to} replace={replace} scroll={!to.includes("#")} onClick={handleClick} ref={ref} {...rest}>
      {children}
    </NextLink>
  );
});
Link.displayName = "Link";

export const HashLink = Link;

export const useNavigate = () => {
  const router = useRouter();
  return (to: string | number, options?: { replace?: boolean }) => {
    if (typeof to === "number") {
      router.back();
      return;
    }
    return options?.replace ? router.replace(to) : router.push(to);
  };
};

export const useParams = <T extends Record<string, string | undefined> = Record<string, string | undefined>>() => {
  const { query } = useRouter();
  return Object.fromEntries(
    Object.entries(query).map(([key, value]) => [key, Array.isArray(value) ? value.join("/") : value])
  ) as T;
};

export const useLocation = () => {
  const { asPath } = useRouter();
  return useMemo(() => {
    const url = new URL(asPath, "https://toothfairy.clinic");
    return { pathname: url.pathname, search: url.search, hash: url.hash };
  }, [asPath]);
};

export const useSearchParams = () => {
  const { search } = useLocation();
  const router = useRouter();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const setParams = (next: URLSearchParams | Record<string, string>) => {
    const query = next instanceof URLSearchParams ? next.toString() : new URLSearchParams(next).toString();
    const path = router.asPath.split(/[?#]/)[0];
    router.push(query ? `${path}?${query}` : path);
  };
  return [params, setParams] as const;
};

export const Navigate = ({ to, replace }: { to: string; replace?: boolean }) => {
  const router = useRouter();
  useEffect(() => {
    if (replace) router.replace(to);
    else router.push(to);
  }, [to, replace, router]);
  return null;
};
