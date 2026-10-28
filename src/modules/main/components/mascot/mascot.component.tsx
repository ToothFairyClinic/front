import { CSSProperties, FC } from "react";
import clsx from "clsx";

const MASCOTS = {
  peek: { src: "/assets/mascot/cat-peek-right.webp", width: 208, height: 480 },
  toothbrush: { src: "/assets/mascot/cat-toothbrush.webp", width: 351, height: 494 },
  lying: { src: "/assets/mascot/cat-lying.webp", width: 549, height: 341 },
  wave: { src: "/assets/mascot/cat-wave.webp", width: 391, height: 488 },
  book: { src: "/assets/mascot/cat-book.webp", width: 387, height: 431 },
  question: { src: "/assets/mascot/cat-question.webp", width: 382, height: 490 },
};

export type MascotPose = keyof typeof MASCOTS;

interface MascotProps {
  pose: MascotPose;
  /** Висота на сторінці в px; ширина рахується з пропорцій. */
  height: number;
  className?: string;
  style?: CSSProperties;
}

/** Декоративний котик-маскот. Лише на великих екранах, не заважає клікам і не читається скрінрідерами. */
export const Mascot: FC<MascotProps> = ({ pose, height, className, style }) => {
  const { src, width: w, height: h } = MASCOTS[pose];
  const width = Math.round((w / h) * height);
  // Поруч з оригіналом лежить копія вдвічі меншого розміру (-sm.webp): на звичайних екранах браузер бере її,
  // на ретіні - оригінал. Маскот показується на 150-190 px заввишки, оригінали 430-494 px.
  const srcSet = `${src.replace(/\.webp$/, "-sm.webp")} ${Math.round(w / 2)}w, ${src} ${w}w`;

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={`${width}px`}
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={clsx("absolute hidden lg:block pointer-events-none select-none z-10", className)}
      style={{ width, height, ...style }}
    />
  );
};

/** Положення намальованої лінії всередині зображення (частка від розміру), щоб садити котика на край блоку. */
export const MASCOT_LINES = {
  peekWallX: 46 / 208,
  lyingShelfY: 202 / 341,
};
