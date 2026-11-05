const EN_WORDS: [RegExp, string][] = [
  [/від/gi, "from"],
  [/год/gi, "hr"],
  [/хв/gi, "min"],
];

/** "від 21420" -> "від 21 420 грн"; для EN ще перекладає від / год / хв. */
export const formatPrice = (price: string | null | undefined, isEn: boolean) => {
  if (!price) return "";
  let value = price
    .replace(/\s*\/\s*/g, " / ")
    .replace(/\s*-\s*/g, " - ")
    .replace(/(\d)\s(?=\d{3}\b)/g, "$1")
    .replace(/\d{4,}/g, (n) => n.replace(/\B(?=(\d{3})+(?!\d))/g, " "))
    .replace(/\s+/g, " ")
    .trim();
  const currency = isEn ? "UAH" : "грн";
  // "год / 4200" і "30 хв / 900" у прайсі означають ціну за час: показуємо "4 200 грн / год"
  const perTime = value.match(/^(.*(?:год|хв).*?) \/ (.+)$/i);
  if (perTime) value = `${perTime[2]} ${currency} / ${perTime[1]}`;
  if (isEn) EN_WORDS.forEach(([re, word]) => (value = value.replace(re, word)));
  if (/грн|uah/i.test(value)) return value;
  return `${value} ${currency}`;
};
