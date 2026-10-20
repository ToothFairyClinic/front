import { FC, useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "@app/common/router/router";
import { useTranslation } from "react-i18next";
import { Helmet } from "@app/common/components/head/head";

import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { Breadcrumbs, buildBreadcrumbSchema, Crumb } from "@app/common/components/breadcrumbs/breadcrumbs.component";
import { HtmlContent } from "@app/common/components/html-content/html-content.component";
import { HomeFaq } from "@app/modules/main/components/home-faq/home-faq.component";
import { SectionHeading } from "@app/modules/main/components/section-heading/section-heading.component";
import { ServiceBookingCard } from "@app/modules/services/components/service-booking-card.component";
import { useGetPostBySlugQuery, useGetPostsEnQuery, useGetPostsQuery } from "@app/core/types";
import { blogPath, postPath } from "@app/common/utils/blog-path";
import { doctorPath } from "@app/common/utils/doctors-path";
import { PostAuthorCard, PostByline } from "../components/post-author.component";
import { PostVideo } from "../components/post-video.component";
import { PostToc, PostTocMobile } from "../components/post-toc.component";
import { PostCard } from "../components/post-card.component";
import {
  formatPostDate,
  imageSrcSet,
  imageUrl,
  isoDuration,
  parseChapters,
  readingMinutes,
  videoPosterUrl,
  videoUrl,
  withHeadingIds,
} from "../utils/post-utils";

interface FAQItem {
  question: string;
  answer: string;
}

/** Скільки статей тягнути для блоку "Інші публікації" (поточна відкидається). */
export const OTHER_POSTS_LIMIT = 4;

const NotFound: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t("Сторінку не знайдено | Стоматологія Зубна Фея")}</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <ShowInfo type="info">
        <p>{t("На жаль, таку публікацію не знайдено")}</p>
      </ShowInfo>
    </>
  );
};

const parseFaq = (raw: unknown): FAQItem[] => {
  if (!raw) return [];
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return Array.isArray(raw) ? (raw as FAQItem[]) : [];
};

export const BlogPostPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const baseUrl = "https://toothfairy.clinic";

  const prevLangRef = useRef(i18n.language);

  const { data, loading, error } = useGetPostBySlugQuery({ variables: { slug: slug! }, skip: !slug });

  const post = data?.posts[0];
  const isEn = i18n.language === "en";
  const currentLang = isEn ? "en" : "ua";

  const otherVars = { limit: OTHER_POSTS_LIMIT, offset: 0 };
  const otherUa = useGetPostsQuery({ variables: otherVars, skip: isEn });
  const otherEn = useGetPostsEnQuery({ variables: otherVars, skip: !isEn });
  const otherPosts = ((isEn ? otherEn.data : otherUa.data)?.posts ?? []).filter((p) => p.id !== post?.id).slice(0, 3);

  useEffect(() => {
    if (!post || prevLangRef.current === i18n.language) return;

    if (i18n.language === "en" && post.slug_en && slug !== post.slug_en) {
      navigate(postPath("en", post.slug_en), { replace: true });
    } else if ((i18n.language === "uk" || i18n.language === "ua") && slug !== post.slug) {
      navigate(postPath("ua", post.slug), { replace: true });
    }

    prevLangRef.current = i18n.language;
  }, [i18n.language, post, slug, navigate]);

  const title = isEn ? post?.title_en || post?.title : post?.title;
  const heading = (isEn ? post?.h1_en || post?.h1 : post?.h1) || title;
  const seoTitle = isEn ? post?.seo_title_en : post?.seo_title;
  const seoDescription = isEn ? post?.seo_description_en : post?.seo_description;
  const excerpt = isEn ? post?.excerpt_en : post?.excerpt;
  const content = isEn ? post?.content_en : post?.content;
  const heroAlt = (isEn ? post?.hero_image_alt_en : post?.hero_image_alt) || title || "";
  const heroUrl = post?.hero_image ? imageUrl(post.hero_image, 1200, 0.75) : undefined;

  const { html: bodyHtml, toc } = useMemo(() => {
    const result = withHeadingIds(content);
    return {
      toc: result.toc,
      html: result.html
        .replace(/<table/gi, '<div class="overflow-x-auto"><table')
        .replace(/<\/table>/gi, "</table></div>"),
    };
  }, [content]);
  const minutes = readingMinutes(content);

  const faqList = useMemo(() => parseFaq(isEn ? post?.faq_en : post?.faq_ua), [isEn, post?.faq_en, post?.faq_ua]);

  const video = post?.video
    ? {
        title: (isEn ? post.video_title_en : post.video_title) || post.video_title || heading || "",
        description: (isEn ? post.video_description_en : post.video_description) || "",
        chapters: parseChapters(isEn ? post.video_chapters_en : post.video_chapters, post.video_duration),
      }
    : undefined;

  const crumbs: Crumb[] = useMemo(() => {
    if (!post) return [];
    return [
      { label: t("Головна"), to: `/${currentLang}` },
      { label: t("Блог"), to: blogPath(currentLang) },
      { label: title || "" },
    ];
  }, [post, title, currentLang, t]);

  const schemaGraph = useMemo((): Record<string, any>[] | undefined => {
    if (!post) return undefined;

    const url = `${baseUrl}${postPath(currentLang, isEn ? post.slug_en : post.slug)}`;
    const author = post.author;

    const article: Record<string, any> = {
      "@type": "BlogPosting",
      "@id": `${url}/#article`,
      headline: heading,
      description: seoDescription || excerpt || undefined,
      inLanguage: isEn ? "en-US" : "uk-UA",
      mainEntityOfPage: { "@id": `${url}/#webpage` },
      publisher: { "@id": `${baseUrl}/#organization` },
      isPartOf: { "@id": `${baseUrl}${blogPath(currentLang)}/#blog` },
    };

    if (heroUrl) article.image = heroUrl;
    if (post.published_at) article.datePublished = post.published_at;
    if (post.updated_at) article.dateModified = post.updated_at;

    if (author) {
      const authorSlug = isEn ? author.slug_en || author.slug : author.slug;
      article.author = {
        "@type": "Person",
        name: (isEn && author.name_en) || author.name,
        ...(authorSlug ? { url: `${baseUrl}${doctorPath(currentLang, authorSlug)}` } : {}),
        worksFor: { "@id": `${baseUrl}/#organization` },
      };
    }

    const reviewer = post.reviewer;
    if (reviewer) {
      const reviewerSlug = isEn ? reviewer.slug_en || reviewer.slug : reviewer.slug;
      article.reviewedBy = {
        "@type": "Person",
        name: (isEn && reviewer.name_en) || reviewer.name,
        ...(reviewerSlug ? { url: `${baseUrl}${doctorPath(currentLang, reviewerSlug)}` } : {}),
      };
    }

    const nodes: Record<string, any>[] = [article, buildBreadcrumbSchema(crumbs, baseUrl, `${url}/#breadcrumb`)];

    if (post.video && video) {
      const vertical = !post.video_width || !post.video_height || post.video_height > post.video_width;
      const videoNode: Record<string, any> = {
        "@type": "VideoObject",
        "@id": `${url}/#video`,
        name: video.title,
        description: video.description || seoDescription || excerpt || video.title,
        thumbnailUrl: [
          videoPosterUrl(post.video, post.video_poster, vertical ? 720 : 1280, vertical ? 16 / 9 : 9 / 16),
          videoPosterUrl(post.video, post.video_poster, 1080, 1),
        ],
        uploadDate: post.video_uploaded_at || post.published_at || post.updated_at,
        contentUrl: videoUrl(post.video, vertical ? 720 : 1280),
        inLanguage: isEn ? "en-US" : "uk-UA",
        isFamilyFriendly: true,
        publisher: { "@id": `${baseUrl}/#organization` },
        mainEntityOfPage: { "@id": `${url}/#webpage` },
      };
      const duration = isoDuration(post.video_duration);
      if (duration) videoNode.duration = duration;
      if (post.video_width && post.video_height) {
        videoNode.width = post.video_width;
        videoNode.height = post.video_height;
      }
      if (video.chapters.length) {
        videoNode.hasPart = video.chapters.map((c) => ({
          "@type": "Clip",
          name: c.title,
          startOffset: Math.floor(c.start),
          ...(c.end ? { endOffset: Math.ceil(c.end) } : {}),
          url: `${url}?t=${Math.floor(c.start)}`,
        }));
      }
      article.video = { "@id": `${url}/#video` };
      nodes.push(videoNode);
    }

    if (faqList.length) {
      nodes.push({
        "@type": "FAQPage",
        mainEntity: faqList.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      });
    }

    return nodes;
  }, [post, heading, seoDescription, excerpt, heroUrl, isEn, currentLang, crumbs, faqList, video]);

  if (error) {
    return (
      <ShowInfo type="error">
        <p>{t("Упс, сталася помилка")}</p>
      </ShowInfo>
    );
  }

  if (loading) {
    return (
      <ShowInfo type="info">
        <p>{t("Завантаження...")}</p>
      </ShowInfo>
    );
  }

  if (!post) return <NotFound />;
  if (isEn && !post.slug_en) return <NotFound />;

  const date = formatPostDate(post.published_at, isEn);

  return (
    <>
      <SEOMeta
        title={seoTitle || `${title} | ${t("Стоматологія Зубна Фея")}`}
        description={seoDescription || excerpt || ""}
        type="BlogPosting"
        ogType="article"
        schemaData={schemaGraph}
        robots={post.custom_robots}
        hasBreadcrumbs={false}
        pathUa={postPath("ua", post.slug)}
        pathEn={post.slug_en ? postPath("en", post.slug_en) : undefined}
        hasEn={Boolean(post.slug_en)}
      />

      <main className="pt-10 lg:pt-12 pb-16 dark:bg-darkGray min-h-screen">
        <div className="px-4 md:px-10">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-12 md:gap-16">
            <section className="flex flex-col gap-6">
              <Breadcrumbs items={crumbs} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="flex flex-col gap-6 md:gap-7 text-darkGray dark:text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">{heading}</h1>
                  {excerpt && (
                    <p className="text-lg md:text-xl leading-relaxed text-darkGray/80 dark:text-white/80 max-w-2xl">{excerpt}</p>
                  )}
                  <PostByline author={post.author} reviewer={post.reviewer} />
                  {(date || minutes > 0) && (
                    <p className="text-base text-darkGray/70 dark:text-white/70">
                      {date && <time dateTime={post.published_at}>{date}</time>}
                      {date && minutes > 0 && ", "}
                      {minutes > 0 && `${minutes} ${t("хв читання")}`}
                    </p>
                  )}
                </div>
                {post.hero_image && (
                  // Якщо є відео, на телефоні його обкладинка замінює фото, щоб відео було одразу під заголовком
                  <div className={`w-full aspect-[4/3] overflow-hidden rounded-[2rem] bg-paleOlive/40 ${post.video ? "hidden lg:block" : ""}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageUrl(post.hero_image, 960)}
                      srcSet={imageSrcSet(post.hero_image, [480, 768, 960, 1280])}
                      sizes={post.video ? "(min-width: 1024px) 50vw, 1px" : "(min-width: 1024px) 50vw, 100vw"}
                      width={960}
                      height={720}
                      alt={heroAlt}
                      decoding="async"
                      {...{ fetchpriority: "high" }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </section>

            {post.video && video && (
              <PostVideo
                video={post.video}
                poster={post.video_poster}
                title={video.title}
                description={video.description}
                width={post.video_width}
                height={post.video_height}
              />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <article className="lg:col-span-8 flex flex-col gap-10 min-w-0">
                <PostTocMobile items={toc} />
                <HtmlContent
                  html={bodyHtml}
                  className="prose-p:leading-relaxed prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:font-normal prose-h2:mt-12 prose-h2:mb-5 prose-h2:scroll-mt-28 prose-h3:text-2xl prose-h3:font-semibold prose-img:rounded-2xl prose-table:w-full prose-th:text-left prose-th:bg-paleOlive/50 prose-th:border prose-td:border prose-th:border-paleOlive prose-td:border-paleOlive prose-th:px-4 prose-th:py-3 prose-td:px-4 prose-td:py-3 [&_td>p]:my-0 [&_th>p]:my-0 [&_li>p]:my-0"
                />
                <PostAuthorCard author={post.author} />
                {faqList.length > 0 && <HomeFaq title={t("Часті запитання")} items={faqList} embedded />}
                <p className="text-sm text-darkGray/70 dark:text-white/60 border-t border-paleOlive dark:border-white/20 pt-6">
                  {t("Матеріал має інформаційний характер і не замінює консультацію лікаря. Для встановлення діагнозу та призначення лікування зверніться до стоматолога.")}
                </p>
              </article>
              <aside className="hidden lg:flex lg:col-span-4 lg:self-stretch flex-col gap-8">
                <ServiceBookingCard hasPrices={false} mascot="book" />
                <div className="hidden lg:block lg:sticky lg:top-24">
                  <PostToc items={toc} />
                </div>
              </aside>
            </div>

            {otherPosts.length > 0 && (
              <section aria-labelledby="other-posts-title" className="flex flex-col gap-8">
                <SectionHeading id="other-posts-title" title={t("Інші публікації")} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherPosts.map((item) => (
                    <PostCard key={item.id} post={item} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogPostPage;
