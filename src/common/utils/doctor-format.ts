interface DoctorCategory {
  category: { title: string; title_en?: string | null };
}

/** Назва спеціалізації з адмінки: без пробілів по краях і з великої літери. */
export const categoryTitle = ({ category }: DoctorCategory, isEn: boolean) => {
  const title = ((isEn && category.title_en) || category.title || "").trim();
  return title.charAt(0).toUpperCase() + title.slice(1);
};

/** Спеціалізації лікаря одним рядком через кому, з малої літери після першої. */
export const categoriesLine = (categories: DoctorCategory[] | null | undefined, isEn: boolean) =>
  (categories ?? [])
    .map((item, index) => {
      const title = categoryTitle(item, isEn);
      return index === 0 ? title : title.charAt(0).toLowerCase() + title.slice(1);
    })
    .filter(Boolean)
    .join(", ");

/** Чи є серед спеціалізацій посада головного лікаря - його показуємо першим. */
export const isChiefDoctor = (categories: DoctorCategory[] | null | undefined) =>
  (categories ?? []).some(({ category }) => /головний лікар/i.test(category.title));

/**
 * Досвід роботи мовою сторінки. Якщо англійського тексту в адмінці немає,
 * а український має вигляд "N років", перекладаємо число років.
 */
export const experienceText = (experience: string | null | undefined, experienceEn: string | null | undefined, isEn: boolean) => {
  const ua = experience?.trim() || "";
  const en = experienceEn?.trim() || "";
  if (!isEn) return ua || "";
  if (en) return en;
  const years = ua.match(/^(\d+)\s*(рік|роки|років)$/i);
  if (years) return `${years[1]} ${years[1] === "1" ? "year" : "years"}`;
  return "";
};
