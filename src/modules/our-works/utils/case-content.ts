export interface CaseCta {
  title: string;
  html: string;
}

const SECTION = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
const text = (html: string) => html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
const isResult = (title: string) => /^(результат|result)/i.test(title);
const isCta = (title: string) => /^(запис|book)/i.test(title);

/**
 * Ділить текст кейсу з адмінки на розділи за H2.
 * Розділ "Результат..." отримує власне оформлення, розділ "Запис на консультацію" / "Book..." виноситься
 * з тексту в окремий блок запису з кнопкою (кнопка відкриває форму сайту, тому в HTML її не покласти).
 */
export const splitCaseContent = (html?: string | null): { body: string; cta: CaseCta | null } => {
  if (!html) return { body: "", cta: null };
  const heads = [...html.matchAll(SECTION)];
  if (!heads.length) return { body: html, cta: null };

  const intro = html.slice(0, heads[0].index);
  let cta: CaseCta | null = null;
  const parts = heads.map((m, i) => {
    const end = i + 1 < heads.length ? heads[i + 1].index : html.length;
    const section = html.slice(m.index, end);
    const title = text(m[1]);
    if (isCta(title)) {
      cta = { title, html: section.slice(m[0].length).trim() };
      return "";
    }
    return isResult(title) ? `<section class="tf-case-result">${section}</section>` : section;
  });
  return { body: intro + parts.join(""), cta };
};
