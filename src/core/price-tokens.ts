import { NormalizedCacheObject } from "@apollo/client";

/**
 * Ціни з прайсу в будь-якому тексті з БД (мета, описи, FAQ, SEO-текст головної).
 *
 * У тексті пишемо токен замість цифри:
 *   {{price:c93a1cf2}}      -> "750 грн" / "UAH 750" (як у прайсі: з "від", діапазоном, "/ год")
 *   {{price:c93a1cf2|num}}  -> лише число чи діапазон: "750", "13 700–24 700"
 *   {{price:c93a1cf2|min}}  -> перше число діапазону, {{price:...|max}} - останнє
 * Код - початок id рядка прайсу (видно в адмінці, від 6 символів, достатньо 8).
 * Мова: поля з закінченням _en (і все всередині них, напр. faq_en[].answer) форматуються англійською.
 * Невідомий код - помилка генерації: ISR лишає попередню версію сторінки, збірка падає з назвою коду.
 */
export const PRICE_TOKEN = /\{\{\s*price:([0-9a-f-]{6,36})(?:\s*\|\s*(num|min|max))?\s*\}\}/gi;

const NBSP = " ";

export type PriceMap = Map<string, string>;

interface ParsedPrice {
  from: boolean;
  nums: number[];
  per: string;
}

/** "від 21420", "15 000 - 20 000", "год / 4200", "30 хв /  900" -> частини ціни. */
export const parsePrice = (raw: string): ParsedPrice => {
  let text = raw.replace(/\s+/g, " ").trim();
  let per = "";
  const perTime = text.match(/^(.*(?:год|хв).*?)\s*\/\s*(.+)$/i);
  if (perTime) {
    per = perTime[1].trim();
    text = perTime[2];
  }
  // \b у JS не бачить меж кириличних слів
  const from = /^(від|from)(?=\s|\d|$)/i.test(text);
  const nums = (text.replace(/(\d)\s(?=\d{3}\b)/g, "$1").match(/\d+/g) ?? []).map(Number);
  return { from, nums, per };
};

const groupDigits = (n: number, isEn: boolean) =>
  String(n).replace(/\B(?=(\d{3})+(?!\d))/g, isEn ? "," : NBSP);

const PER_EN: [RegExp, string][] = [
  [/год/gi, "hr"],
  [/хв/gi, "min"],
];

export const formatPriceToken = (raw: string, isEn: boolean, mode?: string) => {
  const { from, nums, per } = parsePrice(raw);
  if (!nums.length) return raw.trim();
  if (mode === "min") return groupDigits(nums[0], isEn);
  if (mode === "max") return groupDigits(nums[nums.length - 1], isEn);
  const value = nums.map((n) => groupDigits(n, isEn)).join("–");
  if (mode === "num") return value;
  let perText = per;
  if (isEn) PER_EN.forEach(([re, word]) => (perText = perText.replace(re, word)));
  const unit = perText ? ` / ${perText}` : "";
  return isEn
    ? `${from ? "from " : ""}UAH${NBSP}${value}${unit}`
    : `${from ? "від " : ""}${value}${NBSP}грн${unit}`;
};

/** Рядки прайсу з нормалізованого кешу Apollo (сутності price_list:<id>). */
export const priceMapFromCache = (state: NormalizedCacheObject): PriceMap => {
  const map: PriceMap = new Map();
  Object.entries(state).forEach(([key, entity]) => {
    if (!key.startsWith("price_list:")) return;
    const row = entity as { id?: string; price?: string | null } | undefined;
    if (row?.id && typeof row.price === "string") map.set(row.id.toLowerCase(), row.price);
  });
  return map;
};

const resolve = (map: PriceMap, code: string) => {
  const key = code.toLowerCase();
  const exact = map.get(key);
  if (exact !== undefined) return exact;
  const hits = Array.from(map.keys()).filter((id) => id.startsWith(key));
  if (hits.length === 1) return map.get(hits[0]);
  throw new Error(
    hits.length
      ? `Токен ціни {{price:${code}}}: код підходить до ${hits.length} рядків прайсу, подовжіть код`
      : `Токен ціни {{price:${code}}}: рядка прайсу з таким id немає (видалено?)`
  );
};

export const replacePriceTokens = (text: string, map: PriceMap, isEn: boolean) =>
  text.includes("{{")
    ? text.replace(PRICE_TOKEN, (_, code: string, mode?: string) =>
        formatPriceToken(resolve(map, code) ?? "", isEn, mode?.toLowerCase())
      )
    : text;

const isEnKey = (key: string) => /(^|_)en$/i.test(key);

/** Обходить усі рядки (кеш Apollo чи відповідь запиту) і підставляє ціни. */
export const applyPriceTokens = <T,>(value: T, map: PriceMap, isEn = false): T => {
  if (typeof value === "string") return replacePriceTokens(value, map, isEn) as T;
  if (Array.isArray(value)) return value.map((v) => applyPriceTokens(v, map, isEn)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, applyPriceTokens(v, map, isEn || isEnKey(k))])
    ) as T;
  }
  return value;
};

export const hasPriceTokens = (value: unknown): boolean => {
  if (typeof value === "string") return value.includes("{{") && new RegExp(PRICE_TOKEN.source, "i").test(value);
  if (Array.isArray(value)) return value.some(hasPriceTokens);
  if (value && typeof value === "object") return Object.values(value).some(hasPriceTokens);
  return false;
};
