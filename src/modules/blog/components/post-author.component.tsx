import { FC } from "react";
import { Link } from "@app/common/router/router";
import { useTranslation } from "react-i18next";
import { doctorPath } from "@app/common/utils/doctors-path";

export interface PostPerson {
  name: string;
  name_en?: string | null;
  slug?: string | null;
  slug_en?: string | null;
  image: string;
  image_alt?: string | null;
  image_alt_en?: string | null;
  experience?: string | null;
  experience_en?: string | null;
  categories: Array<{ category: { title: string; title_en?: string | null } }>;
}

const avatarUrl = (publicId: string, px: number) =>
  `https://res.cloudinary.com/dc7d3byxg/image/upload/c_fill,g_face,w_${px},h_${px},f_auto,q_auto/${publicId}`;

const usePerson = (person: PostPerson) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const lang = isEn ? "en" : "ua";
  const category = person.categories?.[0]?.category;
  const slug = isEn ? person.slug_en || person.slug : person.slug;
  return {
    name: (isEn && person.name_en) || person.name,
    role: category ? (isEn && category.title_en) || category.title : "",
    experience: (isEn ? person.experience_en : person.experience) || "",
    href: slug ? doctorPath(lang, slug) : undefined,
  };
};

const PersonName: FC<{ name: string; href?: string; className?: string }> = ({ name, href, className = "" }) =>
  href ? (
    <Link to={href} className={`font-semibold underline decoration-paleOlive decoration-2 underline-offset-4 hover:decoration-darkGray ${className}`}>
      {name}
    </Link>
  ) : (
    <span className={`font-semibold ${className}`}>{name}</span>
  );

interface PostBylineProps {
  author?: PostPerson | null;
  reviewer?: PostPerson | null;
}

/** Автор і рецензент у першому екрані статті: звичайними реченнями, без підписів-міток. */
export const PostByline: FC<PostBylineProps> = ({ author, reviewer }) => {
  const { t } = useTranslation();
  const a = usePerson(author ?? ({ name: "", image: "", categories: [] } as PostPerson));
  const r = usePerson(reviewer ?? ({ name: "", image: "", categories: [] } as PostPerson));

  if (!author && !reviewer) return null;

  return (
    <div className="flex items-center gap-4 text-base text-darkGray dark:text-white">
      {author?.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl(author.image, 112)}
          width={56}
          height={56}
          alt=""
          className="w-14 h-14 rounded-full object-cover shrink-0"
        />
      )}
      <div className="flex flex-col gap-0.5 leading-snug">
        {author && (
          <p>
            {t("Автор")}: <PersonName name={a.name} href={a.href} />
            {a.role && <span className="text-darkGray/70 dark:text-white/70">, {a.role}</span>}
          </p>
        )}
        {reviewer && (
          <p className="text-darkGray/80 dark:text-white/80">
            {t("Медичний рецензент")}: <PersonName name={r.name} href={r.href} />
          </p>
        )}
      </div>
    </div>
  );
};

/** Картка автора наприкінці статті: фото, посада, досвід і перехід на сторінку лікаря. */
export const PostAuthorCard: FC<{ author?: PostPerson | null }> = ({ author }) => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const p = usePerson(author ?? ({ name: "", image: "", categories: [] } as PostPerson));

  if (!author) return null;
  const alt = (isEn ? author.image_alt_en : author.image_alt) || p.name;

  return (
    <section
      aria-label={t("Про автора")}
      className="flex flex-col sm:flex-row gap-6 items-start sm:items-center rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-6 md:p-8 text-darkGray dark:text-white"
    >
      {author.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl(author.image, 240)}
          width={120}
          height={120}
          alt={alt}
          loading="lazy"
          className="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover shrink-0"
        />
      )}
      <div className="flex flex-col gap-2">
        <p className="text-xl md:text-2xl">
          {t("Автор статті")}: <PersonName name={p.name} href={p.href} />
        </p>
        {(p.role || p.experience) && (
          <p className="text-base text-darkGray/80 dark:text-white/80">
            {[p.role, p.experience && `${t("досвід")} ${p.experience}`].filter(Boolean).join(", ")}
          </p>
        )}
        {p.href && (
          <Link to={p.href} className="self-start mt-2 font-semibold hover:underline underline-offset-4">
            {t("Більше про лікаря і запис на прийом")}
          </Link>
        )}
      </div>
    </section>
  );
};
