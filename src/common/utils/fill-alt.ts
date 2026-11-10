/**
 * Фото в тексті з адмінки без alt (поле не заповнили): підставляється запасний опис, зазвичай назва сторінки.
 * Порожній alt для пошуку й читалок екрана - вада, а не ознака декоративного фото, бо декоративні картинки
 * в тексті не вставляються. Не-порожній alt лишається як є. Працює однаково на сервері й у браузері.
 */
const IMG_TAG = /<img\b[^>]*>/gi;
const ALT_ATTR = /\salt\s*=\s*(?:"([^"]*)"|'([^']*)')/i;

const escapeAttr = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const fillMissingAlt = (html: string, fallback?: string | null) => {
  const text = (fallback ?? "").replace(/\s+/g, " ").trim();
  if (!text || !html.includes("<img")) return html;
  const safe = escapeAttr(text);
  return html.replace(IMG_TAG, (tag) => {
    const match = ALT_ATTR.exec(tag);
    if (match && (match[1] ?? match[2] ?? "").trim()) return tag;
    if (match) return tag.replace(ALT_ATTR, ` alt="${safe}"`);
    return tag.replace(/^<img/i, `<img alt="${safe}"`);
  });
};
