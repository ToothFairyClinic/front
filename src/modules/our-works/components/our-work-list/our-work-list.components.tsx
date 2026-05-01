import { ShowInfo } from "@app/common/components/show-info/show-info.component";
import { useGetOurWorkQuery } from "@app/core/types";
import { FC } from "react";
import { OurWorkItem } from "../our-work-item/our-work-item.component";
import { useTranslation } from 'react-i18next';

interface OurWorkListProps { }

export const OurWorkList: FC<OurWorkListProps> = ({ }) => {
  const { data, loading, error } = useGetOurWorkQuery();
  const { t } = useTranslation();

  if (error) {
    return (
      <ShowInfo type="error">
        <p>{t("Упс, сталася помилка")}</p>
        <p>{t("Спробуйте трохи пізніше")}</p>
      </ShowInfo>
    );
  }

  if (loading) {
    return (
      <ShowInfo type="info">
        <p>{t("Завантаження...")}</p>
      </ShowInfo>
    );
  }

  if (!data || data.our_works.length === 0) {
    return (
      <ShowInfo type="info">
        <p>{t("На жаль, тут порожньо")}</p>
      </ShowInfo>
    );
  }

  return (
    // Прибираємо лишній section, бо ми вже обгорнули OurWorkList в article/section на сторінці OurWorkPage
    <div className="dark:bg-darkGray py-10">
      <ul className="flex gap-10 flex-wrap lg:px-32 justify-center list-none">
        {data.our_works.map((item) => (
          <li key={item.id} className="w-full md:w-[45%] lg:w-[30%]">
            <OurWorkItem {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
};
