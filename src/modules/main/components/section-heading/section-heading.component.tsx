import { FC } from "react";

interface SectionHeadingProps {
  id?: string;
  title?: string | null;
  intro?: string | null;
}

/** Заголовок H2 блоку головної з коротким вступом. */
export const SectionHeading: FC<SectionHeadingProps> = ({ id, title, intro }) => {
  if (!title) return null;

  return (
    <div className="flex flex-col gap-4 md:gap-5 max-w-5xl">
      <h2 id={id} className="text-3xl md:text-5xl lg:text-6xl font-normal text-darkGray dark:text-white">
        {title}
      </h2>
      {intro && (
        <p className="text-lg md:text-xl leading-relaxed text-darkGray/80 dark:text-white/80">{intro}</p>
      )}
    </div>
  );
};
