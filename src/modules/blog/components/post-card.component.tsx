import { FC } from "react";
import clsx from "clsx";
import { Link } from "@app/common/router/router";
import { useTranslation } from "react-i18next";
import { postPath } from "@app/common/utils/blog-path";
import { doctorPath } from "@app/common/utils/doctors-path";
import { formatPostDate, imageSrcSet, imageUrl } from "../utils/post-utils";
import type { PostPerson } from "./post-author.component";

export interface PostCardData {
  id: any;
  slug: string;
  slug_en?: string | null;
  title: string;
  title_en?: string | null;
  excerpt?: string | null;
  excerpt_en?: string | null;
  published_at?: any;
  hero_image?: string | null;
  hero_image_alt?: string | null;
  hero_image_alt_en?: string | null;
  video?: string | null;
  author?: PostPerson | null;
}

interface PostCardProps {
  post: PostCardData;
  /** Перша стаття списку: широка картка з фото ліворуч. */
  featured?: boolean;
  /** Фото першої картки вантажиться одразу (вона на першому екрані). */
  eager?: boolean;
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
  </svg>
);

const AuthorRow: FC<{ author: PostPerson; isEn: boolean; lang: string; size: "sm" | "md" }> = ({
  author,
  isEn,
  lang,
  size,
}) => {
  const name = (isEn && author.name_en) || author.name;
  const slug = isEn ? author.slug_en || author.slug : author.slug;
  const category = author.categories?.[0]?.category;
  const role = category ? (isEn && category.title_en) || category.title : "";
  const px = size === "md" ? 48 : 40;
  const avatar = `https://res.cloudinary.com/dc7d3byxg/image/upload/c_fill,g_face,w_${px * 2},h_${px * 2},f_auto,q_auto/${author.image}`;

  const nameNode = slug ? (
    <Link to={doctorPath(lang, slug)} className="font-semibold hover:underline underline-offset-4">
      {name}
    </Link>
  ) : (
    <span className="font-semibold">{name}</span>
  );

  return (
    <div className="flex items-center gap-3 min-w-0">
      {author.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatar}
          width={px}
          height={px}
          alt=""
          loading="lazy"
          className={clsx("rounded-full object-cover shrink-0", size === "md" ? "w-12 h-12" : "w-10 h-10")}
        />
      )}
      <div className={clsx("min-w-0 leading-snug", size === "md" ? "text-base" : "text-sm")}>
        {nameNode}
        {role && <div className="text-darkGray/70 dark:text-white/70">{role}</div>}
      </div>
    </div>
  );
};

/** Картка публікації для списку блогу і блоку "Інші публікації". */
export const PostCard: FC<PostCardProps> = ({ post, featured = false, eager = false }) => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const lang = isEn ? "en" : "ua";

  const href = postPath(lang, isEn ? post.slug_en : post.slug);
  const title = (isEn && post.title_en) || post.title;
  const excerpt = isEn ? post.excerpt_en : post.excerpt;
  const alt = (isEn ? post.hero_image_alt_en : post.hero_image_alt) || title;
  const date = formatPostDate(post.published_at, isEn);
  const ratio = featured ? 0.75 : 0.625;

  const image = post.hero_image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageUrl(post.hero_image, featured ? 960 : 640, ratio)}
      srcSet={imageSrcSet(post.hero_image, featured ? [480, 768, 960, 1280] : [400, 640, 800], ratio)}
      sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
      width={featured ? 960 : 640}
      height={Math.round((featured ? 960 : 640) * ratio)}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      {...(eager ? { fetchpriority: "high" } : {})}
      className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.03]"
    />
  ) : (
    <div className="w-full h-full bg-paleOlive/50" />
  );

  return (
    <article
      className={clsx(
        "h-full flex bg-white dark:bg-white/5 rounded-[2rem] overflow-hidden border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow",
        featured ? "flex-col lg:grid lg:grid-cols-2" : "flex-col"
      )}
    >
      <Link
        to={href}
        tabIndex={-1}
        aria-hidden="true"
        className={clsx(
          "group/img relative block overflow-hidden",
          featured ? "aspect-[4/3] lg:aspect-auto lg:min-h-[26rem]" : "aspect-[16/10]"
        )}
      >
        {image}
        {post.video && (
          <span className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/95 text-darkGray text-sm font-semibold px-3.5 py-1.5 shadow">
            <PlayIcon />
            {t("Стаття з відео")}
          </span>
        )}
      </Link>

      <div className={clsx("flex flex-col flex-1 text-darkGray dark:text-white", featured ? "gap-5 p-7 md:p-10 lg:p-12 justify-center" : "gap-4 p-6")}>
        {date && (
          <time dateTime={post.published_at || undefined} className="text-sm text-darkGray/70 dark:text-white/70">
            {date}
          </time>
        )}
        <h2 className={clsx(featured ? "text-3xl md:text-4xl font-normal leading-tight" : "text-xl md:text-2xl font-semibold leading-snug")}>
          <Link to={href} className="hover:underline underline-offset-4 decoration-paleOlive decoration-2">
            {title}
          </Link>
        </h2>
        {excerpt && (
          <p className={clsx("leading-relaxed text-darkGray/80 dark:text-white/80", featured ? "text-lg" : "text-base line-clamp-3")}>
            {excerpt}
          </p>
        )}
        <div className={clsx("flex flex-wrap items-center justify-between gap-4", featured ? "pt-2" : "mt-auto pt-2")}>
          {post.author && <AuthorRow author={post.author} isEn={isEn} lang={lang} size={featured ? "md" : "sm"} />}
          {featured && (
            <Link
              to={href}
              className="inline-flex items-center justify-center font-semibold text-base px-7 py-3 rounded-full border-2 border-darkGray text-darkGray hover:bg-darkGray hover:text-white dark:border-paleOlive dark:text-paleOlive dark:hover:bg-paleOlive dark:hover:text-darkGray transition-colors duration-300"
            >
              {t("Читати статтю")}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};
