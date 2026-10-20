const CLOUD = "https://res.cloudinary.com/dc7d3byxg";

export const formatPostDate = (value?: string | null, isEn?: boolean, long = true) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(isEn ? "en-GB" : "uk-UA", {
    day: "numeric",
    month: long ? "long" : "2-digit",
    year: "numeric",
  });
};

/** Хвилини читання: близько 180 слів на хвилину, не менше однієї. */
export const readingMinutes = (html?: string | null) => {
  if (!html) return 0;
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
};

/** Фото Cloudinary під потрібну ширину і пропорцію (ratio = висота / ширина). */
export const imageUrl = (publicId: string, width: number, ratio = 0.75) =>
  `${CLOUD}/image/upload/c_fill,g_auto,w_${width},h_${Math.round(width * ratio)},f_auto,q_auto/${publicId}`;

export const imageSrcSet = (publicId: string, widths: number[], ratio = 0.75) =>
  widths.map((w) => `${imageUrl(publicId, w, ratio)} ${w}w`).join(", ");

/** MP4 з Cloudinary: стиснення під якість і ширину, щоб телефон не тягнув оригінал. */
export const videoUrl = (publicId: string, width = 720) =>
  `${CLOUD}/video/upload/q_auto,w_${width}/${publicId}.mp4`;

/** Обкладинка відео: окрема картинка з адмінки або кадр з другої секунди ролика. */
export const videoPosterUrl = (video: string, poster?: string | null, width = 720, ratio?: number) => {
  const height = ratio ? `,h_${Math.round(width * ratio)}` : "";
  return poster
    ? `${CLOUD}/image/upload/c_fill,g_auto,w_${width}${height},f_jpg,q_auto/${poster}`
    : `${CLOUD}/video/upload/so_2,c_fill,g_center,w_${width}${height},f_jpg,q_auto/${video}.jpg`;
};

/**
 * Квадратна обкладинка відео. Для вертикального кадру береться верхня частина (від 8% висоти),
 * де зазвичай заголовок ролика, а не середина; горизонтальний - по центру.
 */
export const videoSquarePosterUrl = (video: string, poster?: string | null, width = 720, vertical = true) =>
  poster
    ? `${CLOUD}/image/upload/c_fill,g_auto,ar_1:1,w_${width},f_jpg,q_auto/${poster}`
    : `${CLOUD}/video/upload/so_2,c_crop,${vertical ? "g_north,y_0.08" : "g_center"},w_1.0,ar_1:1/c_scale,w_${width}/f_jpg,q_auto/${video}.jpg`;

/** Тривалість для розмітки: 63.7 -> PT1M4S. */
export const isoDuration = (seconds?: number | string | null) => {
  const total = Math.round(Number(seconds) || 0);
  if (!total) return undefined;
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `PT${m ? `${m}M` : ""}${s ? `${s}S` : m ? "" : "0S"}`;
};

export interface VideoChapter {
  start: number;
  end?: number;
  title: string;
}

/** "0:08" або "8" -> секунди. */
const parseTime = (value: unknown) => {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return NaN;
  const parts = value.trim().split(":").map(Number);
  if (parts.some((p) => Number.isNaN(p))) return NaN;
  return parts.reduce((acc, p) => acc * 60 + p, 0);
};

/** Фрагменти з адмінки ([{time, title}]) по порядку, з кінцем кожного = початок наступного. */
export const parseChapters = (raw: unknown, duration?: number | string | null): VideoChapter[] => {
  let list = raw;
  if (typeof list === "string") {
    try {
      list = JSON.parse(list);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(list)) return [];
  const items = list
    .map((item) => ({ start: parseTime(item?.time), title: String(item?.title ?? "").trim() }))
    .filter((item) => item.title && !Number.isNaN(item.start))
    .sort((a, b) => a.start - b.start);
  const total = Number(duration) || undefined;
  return items.map((item, i) => ({ ...item, end: items[i + 1]?.start ?? total }));
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, " ")
    .replace(/['’ʼ"«»]/g, "")
    .replace(/[^a-zа-яіїєґ0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

export interface TocItem {
  id: string;
  title: string;
}

/** Додає id заголовкам H2 (для якорів змісту) і повертає список для змісту. */
export const withHeadingIds = (html?: string | null): { html: string; toc: TocItem[] } => {
  if (!html) return { html: "", toc: [] };
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/gi, (match, attrs = "", inner: string) => {
    const title = inner.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
    if (!title) return match;
    const existing = /\sid=["']([^"']+)["']/i.exec(attrs)?.[1];
    let id = existing || slugify(title) || `section-${toc.length + 1}`;
    while (!existing && used.has(id)) id = `${id}-2`;
    used.add(id);
    toc.push({ id, title });
    return existing ? match : `<h2${attrs} id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
};
