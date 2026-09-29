export const DOCTORS_SEGMENT_UA = "likari";
export const DOCTORS_SEGMENT_EN = "doctors";

export const doctorsSegment = (lang?: string) =>
  lang === "en" ? DOCTORS_SEGMENT_EN : DOCTORS_SEGMENT_UA;

export const doctorsPath = (lang?: string) =>
  `/${lang || "ua"}/${doctorsSegment(lang)}`;

export const doctorPath = (lang: string | undefined, slug?: string | null) =>
  slug ? `${doctorsPath(lang)}/${slug}` : doctorsPath(lang);
