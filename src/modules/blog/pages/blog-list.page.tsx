import { FC, useMemo } from "react";
import { Link, useSearchParams } from "@app/common/router/router";
import { useTranslation } from "react-i18next";

import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { Breadcrumbs, Crumb } from "@app/common/components/breadcrumbs/breadcrumbs.component";
import { useGetPageMetadataQuery, useGetPostsQuery, useGetPostsEnQuery } from "@app/core/types";
import { blogPath, postPath } from "@app/common/utils/blog-path";
import { Mascot } from "@app/modules/main/components/mascot/mascot.component";
import { PostCard } from "../components/post-card.component";

const PER_PAGE = 12;


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
  const intro = t("Статті лікарів Зубної Феї про здоров'я зубів дітей і дорослих: як доглядати за зубами вдома і коли час до стоматолога.");

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
            ...(post.hero_image
              ? { image: `https://res.cloudinary.com/dc7d3byxg/image/upload/c_fill,g_auto,w_1200,h_900,f_auto,q_auto/${post.hero_image}` }
              : {}),
            ...(post.author ? { author: { "@type": "Person", name: (isEn && post.author.name_en) || post.author.name } } : {}),
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

  const [featured, ...rest] = page === 1 ? posts : [undefined, ...posts];

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

      <main className="pt-10 lg:pt-12 pb-16 dark:bg-darkGray min-h-screen">
        <div className="px-4 md:px-10">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-10 md:gap-14">
            <section className="relative flex flex-col gap-6 text-darkGray dark:text-white">
              <Breadcrumbs items={crumbs} />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">{heading}</h1>
              <p className="text-lg md:text-xl leading-relaxed text-darkGray/80 dark:text-white/80 max-w-3xl">{intro}</p>
              <Mascot pose="book" height={170} className="bottom-0 right-10" />
            </section>

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

            {featured && <PostCard post={featured} featured eager />}

            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post) => post && <PostCard key={post.id} post={post} />)}
              </div>
            )}

            {pageCount > 1 && (
              <nav aria-label={t("Сторінки")} className="flex justify-center gap-2">
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                  <Link
                    key={n}
                    to={n === 1 ? blogPath(currentLang) : `${blogPath(currentLang)}?page=${n}`}
                    aria-current={n === page ? "page" : undefined}
                    className={
                      n === page
                        ? "w-11 h-11 flex items-center justify-center rounded-full bg-darkGray text-white dark:bg-paleOlive dark:text-darkGray"
                        : "w-11 h-11 flex items-center justify-center rounded-full border border-darkGray/30 text-darkGray dark:text-white hover:bg-paleOlive transition-colors"
                    }
                  >
                    {n}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogListPage;
