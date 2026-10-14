import { ApolloClient, NormalizedCacheObject, gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from "next";
import { APOLLO_STATE_PROP, initializeApollo } from "./apollo-client";
import { GetServicesDocument } from "./types";
import { sanitizeHtml } from "@app/common/utils/sanitize";

export const LANGS = ["ua", "en"] as const;
export type UrlLang = (typeof LANGS)[number];

/** Як часто Netlify перебудовує сторінку у фоні після змін в адмінці, секунд. */
export const REVALIDATE = 300;

type Params = Record<string, string>;

const HTML_TAG = /<\/?[a-z][a-z0-9]*[\s>/]/i;

/** Очищає всі HTML-рядки в кеші Apollo (описи, тексти, відповіді FAQ у jsonb) перед віддачею в браузер. */
const sanitizeState = <T,>(value: T): T => {
  if (typeof value === "string") return (HTML_TAG.test(value) ? sanitizeHtml(value) : value) as T;
  if (Array.isArray(value)) return value.map(sanitizeState) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, sanitizeState(v)])) as T;
  }
  return value;
};
export type Prefetch = (
  client: ApolloClient<NormalizedCacheObject>,
  ctx: { lang: UrlLang; params: Params }
) => Promise<void | { notFound: true } | { redirect: string }>;

/** Сторінки без параметрів, окрім мови: /ua/..., /en/... */
export const langPaths =
  (langs: readonly UrlLang[] = LANGS): GetStaticPaths =>
  async () => ({ paths: langs.map((lang) => ({ params: { lang } })), fallback: false });

const SLUGS = gql`
  query GetAllSlugs {
    services { slug slug_en }
    personnel { slug slug_en }
    posts(where: { is_published: { _eq: true } }) { slug slug_en }
  }
`;

type SlugRow = { slug?: string | null; slug_en?: string | null };
type SlugKind = "services" | "personnel" | "posts";

/**
 * Сторінки зі slug збираються заздалегідь (щоб перехід був миттєвим),
 * нові з'являються при першому запиті й далі кешуються.
 */
export const slugPaths =
  (kind: SlugKind, langs: readonly UrlLang[] = LANGS): GetStaticPaths =>
  async () => {
    const { data } = await initializeApollo().query<Record<SlugKind, SlugRow[]>>({ query: SLUGS });
    const paths = data[kind].flatMap((row) =>
      langs.flatMap((lang) => {
        const slug = lang === "en" ? row.slug_en : row.slug;
        return slug ? [{ params: { lang, slug } }] : [];
      })
    );
    return { paths, fallback: "blocking" };
  };

/**
 * Дані сторінки беремо на сервері тими самими запитами, що й компоненти,
 * і передаємо кеш Apollo в браузер: HTML одразу з контентом, без завантаження на клієнті.
 */
export const staticProps =
  (prefetch?: Prefetch, langs: readonly UrlLang[] = LANGS): GetStaticProps =>
  async ({ params = {} }): Promise<GetStaticPropsResult<Record<string, unknown>>> => {
    const lang = params.lang as UrlLang;
    if (!langs.includes(lang)) return { notFound: true, revalidate: REVALIDATE };

    const client = initializeApollo();
    // Список послуг потрібен шапці (меню "Послуги") на кожній сторінці
    await client.query({ query: GetServicesDocument });
    const result = prefetch ? await prefetch(client, { lang, params: params as Params }) : undefined;

    if (result && "notFound" in result) return { notFound: true, revalidate: REVALIDATE };
    if (result && "redirect" in result) {
      return { redirect: { destination: result.redirect, statusCode: 301 }, revalidate: REVALIDATE };
    }

    return {
      props: { lang, [APOLLO_STATE_PROP]: sanitizeState(client.cache.extract()) },
      revalidate: REVALIDATE,
    };
  };
