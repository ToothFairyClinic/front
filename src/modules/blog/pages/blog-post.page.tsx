import { FC, useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { AdvancedImage } from "@cloudinary/react";

import { SEOMeta } from "@app/common/components/seo-meta/seo-metadata";
import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { Breadcrumbs, buildBreadcrumbSchema, Crumb } from "@app/common/components/breadcrumbs/breadcrumbs.component";
import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { useGetPostBySlugQuery } from "@app/core/types";
import { blogPath, postPath } from "@app/common/utils/blog-path";
import { PostContent } from "../components/post-content.component";
import { PostAuthor } from "../components/post-author.component";

interface FAQItem {
  question: string;
  answer: string;
}

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

export const BlogPostPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const baseUrl = "https://toothfairy.clinic";

  const prevLangRef = useRef(i18n.language);

  const { data, loading, error } = useGetPostBySlugQuery({
    variables: { slug: slug! },
    skip: !slug,
  });

  const post = data?.posts[0];
  const isEn = i18n.language === "en";
  const currentLang = isEn ? "en" : "ua";

  useEffect(() => {
    if (!post || prevLangRef.current === i18n.language) return;

    if (i18n.language === "en" && post.slug_en && slug !== post.slug_en) {
      navigate(postPath("en", post.slug_en), { replace: true });
    } else if ((i18n.language === "uk" || i18n.language === "ua") && slug !== post.slug) {
      navigate(postPath("ua", post.slug), { replace: true });
    }

    prevLangRef.current = i18n.language;
  }, [i18n.language, post, slug, navigate]);

  const heroTransformations = useMemo(() => ["c_fill", "w_1200", "h_630", "f_auto", "q_auto"], []);
  const heroImage = useCloudinaryImage(post?.hero_image || "", heroTransformations);
  const heroUrl = post?.hero_image ? heroImage.toURL() : undefined;

  const title = isEn ? post?.title_en || post?.title : post?.title;
  const heading = (isEn ? post?.h1_en || post?.h1 : post?.h1) || title;
  const seoTitle = isEn ? post?.seo_title_en : post?.seo_title;
  const seoDescription = isEn ? post?.seo_description_en : post?.seo_description;
  const excerpt = isEn ? post?.excerpt_en : post?.excerpt;
  const content = isEn ? post?.content_en : post?.content;
  const heroAlt = (isEn ? post?.hero_image_alt_en : post?.hero_image_alt) || title || "";

  const rawFaq = isEn ? post?.faq_en : post?.faq_ua;
  const faqList: FAQItem[] = useMemo(() => {
    if (!rawFaq) return [];
    if (typeof rawFaq === "string") {
      try {
        const parsed = JSON.parse(rawFaq);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    }
    return Array.isArray(rawFaq) ? (rawFaq as FAQItem[]) : [];
  }, [rawFaq]);

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
      const authorName = (isEn && author.name_en) || author.name;
      const authorSlug = isEn ? author.slug_en || author.slug : author.slug;
      article.author = {
        "@type": "Person",
        name: authorName,
        ...(authorSlug
          ? { url: `${baseUrl}/${currentLang}/${isEn ? "doctors" : "likari"}/${authorSlug}` }
          : {}),
        worksFor: { "@id": `${baseUrl}/#organization` },
      };
    }

    const reviewer = post.reviewer;
    if (reviewer) {
      article.reviewedBy = {
        "@type": "Person",
        name: (isEn && reviewer.name_en) || reviewer.name,
      };
    }

    const breadcrumbSchema = buildBreadcrumbSchema(crumbs, baseUrl, `${url}/#breadcrumb`);

    if (!faqList.length) return [article, breadcrumbSchema];

    return [
      article,
      breadcrumbSchema,
      {
        "@type": "FAQPage",
        mainEntity: faqList.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ];
  }, [post, heading, seoDescription, excerpt, heroUrl, isEn, currentLang, crumbs, faqList]);

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

      <main className="pt-12 pb-24 px-6 md:px-16 dark:bg-darkGray min-h-screen">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <Breadcrumbs items={crumbs} />

          <h1 className="md:text-5xl text-3xl border-b border-paleOlive py-3 z-10 text-darkGray dark:text-white">
            {heading}
          </h1>
        </div>

        <article className="max-w-4xl mx-auto mt-10 flex flex-col gap-10">
          {post.published_at && (
            <time
              dateTime={post.published_at}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {new Date(post.published_at).toLocaleDateString(isEn ? "en-GB" : "uk-UA", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </time>
          )}

          {post.hero_image && (
            <AdvancedImage
              cldImg={heroImage}
              width={1200}
              height={630}
              alt={heroAlt}
              className="rounded-2xl w-full h-auto shadow-lg"
            />
          )}

          <PostAuthor author={post.author} reviewer={post.reviewer} />

          <PostContent html={content} />

          {faqList.length > 0 && (
            <section className="flex flex-col gap-6 w-full">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white border-b pb-4 border-paleOlive">
                {t("Часті запитання")}
              </h2>

              <div className="flex flex-col gap-4">
                {faqList.map((item, index) => (
                  <details
                    key={index}
                    className="group border-paleOlive p-6 rounded-lg shadow-sm border transition-all [&[open]]:shadow-md"
                  >
                    <summary className="flex justify-between items-center font-semibold text-lg cursor-pointer list-none text-gray-900 dark:text-white select-none">
                      <span>{item.question}</span>
                      <span className="transition group-open:rotate-180 ml-4 shrink-0 text-gray-500">
                        <svg
                          className="w-4 h-4 ml-1 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <p className="text-sm text-gray-500 dark:text-gray-400 border-t border-paleOlive dark:border-gray-700 pt-6">
            {t("Матеріал має інформаційний характер і не замінює консультацію лікаря. Для встановлення діагнозу та призначення лікування зверніться до стоматолога.")}
          </p>
        </article>
      </main>
    </>
  );
};

export default BlogPostPage;
