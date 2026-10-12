import { FC, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { Breadcrumbs, Crumb } from "@app/common/components/breadcrumbs/breadcrumbs.component";
import { useGetPageMetadataQuery, useGetPostsQuery, useGetPostsEnQuery } from "@app/core/types";
import { blogPath, postPath } from "@app/common/utils/blog-path";

const PER_PAGE = 12;

const formatDate = (value?: string | null, isEn?: boolean) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(isEn ? "en-GB" : "uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const BlogListPage: FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const currentLang = isEn ? "en" : "ua";
  const baseUrl = "https://toothfairy.clinic";

  const [searchParams] = useSearchParams();
  const rawPage = parseInt(searchParams.get("page") || "1", 10);
  const page = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
  const offset = (page - 1) * PER_PAGE;

  const { data: metaData } = useGetPageMetadataQuery({ variables: { route: "/blog" } });

  const uaQuery = useGetPostsQuery({ variables: { limit: PER_PAGE, offset }, skip: isEn });
  const enQuery = useGetPostsEnQuery({ variables: { limit: PER_PAGE, offset }, skip: !isEn });

  const { data, loading, error } = isEn ? enQuery : uaQuery;

  const posts = data?.posts ?? [];
  const total = data?.posts_aggregate.aggregate?.count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / PER_PAGE));

  const pageMeta = metaData?.page_metadata[0];
  const title = (isEn ? pageMeta?.seo_title_en : pageMeta?.seo_title)
    || t("Блог стоматології Зубна Фея");
  const description = (isEn ? pageMeta?.seo_description_en : pageMeta?.seo_description)
    || t("Корисні статті про здоров'я зубів від лікарів клініки Зубна Фея у Білій Церкві.");
  const heading = (isEn ? pageMeta?.h1_en : pageMeta?.h1) || t("Блог");

  const crumbs: Crumb[] = useMemo(
    () => [{ label: t("Головна"), to: `/${currentLang}` }, { label: heading }],
    [t, currentLang, heading]
  );

  const schema = useMemo(() => {
    if (!posts.length) return undefined;

    return [
      {
        "@type": "Blog",
        "@id": `${baseUrl}${blogPath(currentLang)}/#blog`,
        name: heading,
        description,
        inLanguage: isEn ? "en-US" : "uk-UA",
        blogPost: posts.map((post) => {
          const slug = isEn ? post.slug_en : post.slug;
          return {
            "@type": "BlogPosting",
            headline: (isEn && post.title_en) || post.title,
            url: `${baseUrl}${postPath(currentLang, slug)}`,
            ...(post.published_at ? { datePublished: post.published_at } : {}),
          };
        }),
      },
    ];
  }, [posts, currentLang, heading, description, isEn]);

  if (error) {
    return (
      <ShowInfo type="error">
        <p>{t("Упс, сталася помилка")}</p>
      </ShowInfo>
    );
  }

  return (
    <>
      <SEOMeta
        title={title}
        description={description}
        type="CollectionPage"
        schemaData={schema}
        robots={page > 1 ? "noindex, follow" : undefined}
        hasBreadcrumbs={false}
        pathUa={blogPath("ua")}
        pathEn={blogPath("en")}
      />

      <main className="pt-12 pb-24 px-6 md:px-16 dark:bg-darkGray min-h-screen">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <Breadcrumbs items={crumbs} />

          <h1 className="md:text-6xl text-3xl border-b border-paleOlive py-3 z-10 text-darkGray dark:text-white lg:w-165">
            {heading}
          </h1>
        </div>

        <div className="max-w-7xl mx-auto mt-12">
          {loading && (
            <ShowInfo type="info">
              <p>{t("Завантаження...")}</p>
            </ShowInfo>
          )}

          {!loading && posts.length === 0 && (
            <ShowInfo type="info">
              <p>{t("Поки що публікацій немає")}</p>
            </ShowInfo>
          )}

          {posts.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
              {posts.map((post) => {
                const slug = isEn ? post.slug_en : post.slug;
                const postTitle = (isEn && post.title_en) || post.title;
                const postExcerpt = isEn ? post.excerpt_en : post.excerpt;

                return (
                  <article
                    key={post.id}
                    className="flex flex-col gap-4 py-8 border-t border-paleOlive dark:border-gray-700"
                  >
                    <h2 className="text-2xl md:text-3xl text-darkGray dark:text-white">
                      <Link to={postPath(currentLang, slug)} className="hover:underline">
                        {postTitle}
                      </Link>
                    </h2>

                    {postExcerpt && (
                      <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {postExcerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between gap-4 mt-auto pt-2">
                      <Link
                        to={postPath(currentLang, slug)}
                        className="font-semibold text-darkGray dark:text-white hover:underline"
                      >
                        {t("Читати більше")}
                      </Link>
                      <time
                        dateTime={post.published_at || undefined}
                        className="text-sm text-gray-500 dark:text-gray-400 shrink-0"
                      >
                        {formatDate(post.published_at, isEn)}
                      </time>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {pageCount > 1 && (
            <nav aria-label={t("Сторінки")} className="flex justify-center gap-2 mt-12">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  to={n === 1 ? blogPath(currentLang) : `${blogPath(currentLang)}?page=${n}`}
                  aria-current={n === page ? "page" : undefined}
                  className={
                    n === page
                      ? "w-10 h-10 flex items-center justify-center rounded-full bg-darkGray text-white dark:bg-paleOlive dark:text-darkGray"
                      : "w-10 h-10 flex items-center justify-center rounded-full border border-paleOlive text-darkGray dark:text-white hover:bg-paleOlive hover:text-darkGray transition-colors"
                  }
                >
                  {n}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </main>
    </>
  );
};

export default BlogListPage;
