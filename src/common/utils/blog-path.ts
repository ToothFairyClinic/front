export const BLOG_SEGMENT = "blog";

export const blogPath = (lang?: string) => `/${lang || "ua"}/${BLOG_SEGMENT}`;

export const postPath = (lang: string | undefined, slug?: string | null) =>
  slug ? `${blogPath(lang)}/${slug}` : blogPath(lang);
