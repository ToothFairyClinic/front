export const OUR_WORK_SEGMENT = "our-work";

export const ourWorkPath = (lang?: string) => `/${lang || "ua"}/${OUR_WORK_SEGMENT}`;

export const casePath = (lang: string | undefined, slug?: string | null) =>
  `${ourWorkPath(lang)}/${slug ?? ""}`;
