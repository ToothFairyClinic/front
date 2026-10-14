import { FC, useMemo } from "react";
import { Link } from "@app/common/router/router";
import { useTranslation } from "react-i18next";
import { AdvancedImage } from "@cloudinary/react";
import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";
import { doctorPath } from "@app/common/utils/doctors-path";

export interface PostPerson {
  name: string;
  name_en?: string | null;
  slug?: string | null;
  slug_en?: string | null;
  image: string;
  categories: Array<{ category: { title: string; title_en?: string | null } }>;
}

interface PersonCardProps {
  person: PostPerson;
  role: string;
}

const PersonCard: FC<PersonCardProps> = ({ person, role }) => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const lang = isEn ? "en" : "ua";

  const transformations = useMemo(() => ["c_fill", "g_face", "w_96", "h_96", "f_auto", "q_auto"], []);
  const image = useCloudinaryImage(person.image, transformations);

  const name = (isEn && person.name_en) || person.name;
  const slug = isEn ? person.slug_en || person.slug : person.slug;
  const category = person.categories?.[0]?.category;
  const jobTitle = category
    ? (isEn && category.title_en) || category.title
    : t("Лікар-стоматолог");

  const body = (
    <>
      <AdvancedImage
        cldImg={image}
        width={48}
        height={48}
        alt={name}
        className="w-12 h-12 rounded-full object-cover shrink-0"
      />
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{role}</div>
        <div className="font-semibold text-darkGray dark:text-white">{name}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{jobTitle}</div>
      </div>
    </>
  );

  if (!slug) {
    return <div className="flex items-center gap-3">{body}</div>;
  }

  return (
    <Link
      to={doctorPath(lang, slug)}
      className="flex items-center gap-3 hover:opacity-80 transition-opacity"
    >
      {body}
    </Link>
  );
};

interface PostAuthorProps {
  author?: PostPerson | null;
  reviewer?: PostPerson | null;
}

export const PostAuthor: FC<PostAuthorProps> = ({ author, reviewer }) => {
  const { t } = useTranslation();

  if (!author && !reviewer) return null;

  return (
    <aside className="flex flex-col sm:flex-row gap-6 sm:gap-10 p-5 rounded-2xl border border-paleOlive bg-palePeach dark:bg-gray-800 dark:border-gray-700">
      {author && <PersonCard person={author} role={t("Автор")} />}
      {reviewer && <PersonCard person={reviewer} role={t("Перевірив")} />}
    </aside>
  );
};
