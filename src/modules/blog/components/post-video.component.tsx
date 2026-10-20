import { FC, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { clockTime, VideoChapter, videoPosterUrl, videoUrl } from "../utils/post-utils";

interface PostVideoProps {
  video: string;
  poster?: string | null;
  title: string;
  description?: string | null;
  transcript?: string | null;
  chapters: VideoChapter[];
  duration?: number | null;
  width?: number | null;
  height?: number | null;
}

/**
 * Відео одразу під першим екраном статті. Вертикальне 9:16 стоїть телефонним екраном поруч з описом
 * і фрагментами; горизонтальне - на всю ширину. Вантажиться лише після натискання (preload="none").
 * Параметр ?t=секунди в адресі відкриває відео з потрібного моменту (так Google веде на ключові моменти).
 */
export const PostVideo: FC<PostVideoProps> = ({
  video,
  poster,
  title,
  description,
  transcript,
  chapters,
  duration,
  width,
  height,
}) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLVideoElement>(null);
  const [current, setCurrent] = useState(-1);

  const vertical = !width || !height || height > width;
  const posterSrc = videoPosterUrl(video, poster, vertical ? 720 : 1280, vertical ? 16 / 9 : 9 / 16);

  /** Перемотка працює лише після завантаження метаданих, а відео стоїть з preload="none". */
  const seekTo = (seconds: number, play: boolean) => {
    const el = ref.current;
    if (!el) return;
    const apply = () => {
      el.currentTime = seconds;
      if (play) el.play().catch(() => undefined);
    };
    if (el.readyState >= 1) {
      apply();
      return;
    }
    el.addEventListener("loadedmetadata", apply, { once: true });
    el.preload = "metadata";
    el.load();
  };

  const seek = (seconds: number) => {
    seekTo(seconds, true);
    if (window.innerWidth < 768) ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("t");
    const seconds = value ? Number(value) : NaN;
    if (!Number.isNaN(seconds) && seconds >= 0 && ref.current) {
      seekTo(seconds, false);
      ref.current.scrollIntoView({ block: "center" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTime = () => {
    const now = ref.current?.currentTime ?? 0;
    let index = -1;
    chapters.forEach((c, i) => {
      if (now >= c.start) index = i;
    });
    if (index !== current) setCurrent(index);
  };

  return (
    <section
      id="video"
      aria-labelledby="post-video-title"
      className={clsx(
        "rounded-[2rem] bg-paleOlive/40 dark:bg-white/5 p-5 sm:p-8 lg:p-12 grid gap-8 lg:gap-14 scroll-mt-28",
        vertical ? "md:grid-cols-[minmax(0,22rem)_1fr] items-start" : "grid-cols-1"
      )}
    >
      <div
        className={clsx(
          "relative w-full mx-auto overflow-hidden bg-darkGray shadow-lg",
          vertical ? "max-w-[22rem] aspect-[9/16] rounded-[1.75rem]" : "aspect-video rounded-[1.5rem]"
        )}
      >
        <video
          ref={ref}
          className="absolute inset-0 w-full h-full object-cover"
          poster={posterSrc}
          preload="none"
          controls
          playsInline
          onTimeUpdate={chapters.length ? onTime : undefined}
          aria-label={title}
        >
          <source src={videoUrl(video, vertical ? 720 : 1280)} type="video/mp4" />
        </video>
      </div>

      <div className="flex flex-col gap-5 text-darkGray dark:text-white">
        <h2 id="post-video-title" className="text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
          {title}
        </h2>
        {description && <p className="text-lg leading-relaxed text-darkGray/80 dark:text-white/80">{description}</p>}
        {duration ? (
          <p className="text-base text-darkGray/70 dark:text-white/70">
            {t("Тривалість")}: {clockTime(duration)}
          </p>
        ) : null}

        {chapters.length > 0 && (
          <ol className="flex flex-col gap-1 list-none p-0 m-0">
            {chapters.map((chapter, i) => (
              <li key={`${chapter.start}-${i}`}>
                <button
                  type="button"
                  onClick={() => seek(chapter.start)}
                  aria-current={i === current ? "true" : undefined}
                  className={clsx(
                    "w-full flex items-baseline gap-4 text-left rounded-xl px-4 py-2.5 transition-colors",
                    i === current
                      ? "bg-white dark:bg-white/15 shadow-sm"
                      : "hover:bg-white/70 dark:hover:bg-white/10"
                  )}
                >
                  <span className="tabular-nums font-semibold text-base shrink-0 w-12">{clockTime(chapter.start)}</span>
                  <span className="text-base md:text-lg leading-snug">{chapter.title}</span>
                </button>
              </li>
            ))}
          </ol>
        )}

        {transcript && (
          <details className="group rounded-xl border border-darkGray/15 dark:border-white/20 bg-white/60 dark:bg-white/5">
            <summary className="flex justify-between items-center cursor-pointer list-none px-4 py-3 font-semibold select-none">
              {t("Текст відео")}
              <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pb-4 text-base leading-relaxed text-darkGray/85 dark:text-white/85 whitespace-pre-line">
              {transcript}
            </div>
          </details>
        )}
      </div>
    </section>
  );
};
