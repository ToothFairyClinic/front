import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { videoPosterUrl, videoUrl } from "../utils/post-utils";

interface PostVideoProps {
  video: string;
  poster?: string | null;
  title: string;
  description?: string | null;
  width?: number | null;
  height?: number | null;
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Відео одразу під першим екраном статті. Спершу - квадратна обкладинка з кнопкою відтворення;
 * після натискання блок плавно розкривається до повних пропорцій відео і вмикає його зі звуком.
 * Вантажиться лише після натискання (preload="none").
 * Параметр ?t=секунди в адресі відкриває відео з потрібного моменту (так Google веде на ключові моменти з розмітки).
 */
export const PostVideo: FC<PostVideoProps> = ({ video, poster, title, description, width, height }) => {
  const { t } = useTranslation();
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [frameWidth, setFrameWidth] = useState(0);

  const vertical = !width || !height || height > width;
  const ratio = width && height ? height / width : 16 / 9; // висота / ширина відео
  const fullPoster = videoPosterUrl(video, poster, vertical ? 720 : 1280, ratio);
  const squarePoster = videoPosterUrl(video, poster, 720, 1);

  // Висота рамки рахується від ширини: квадрат до натискання, пропорції відео після - так перехід анімується
  useIsoLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    setFrameWidth(el.clientWidth);
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => setFrameWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const open = (seconds?: number, play = true) => {
    const el = videoRef.current;
    if (!el) return;
    setExpanded(true);
    const start = () => {
      if (seconds !== undefined) el.currentTime = seconds;
      if (play) el.play().catch(() => undefined);
    };
    if (el.readyState >= 1 || seconds === undefined) {
      start();
      return;
    }
    // перемотка працює лише після завантаження метаданих, а відео стоїть з preload="none"
    el.addEventListener("loadedmetadata", start, { once: true });
    el.preload = "metadata";
    el.load();
  };

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("t");
    const seconds = value ? Number(value) : NaN;
    if (Number.isNaN(seconds) || seconds < 0) return;
    open(seconds, false);
    frameRef.current?.scrollIntoView({ block: "center" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const frameHeight = frameWidth ? Math.round(frameWidth * (expanded ? ratio : 1)) : undefined;

  return (
    <section
      id="video"
      aria-labelledby="post-video-title"
      className={clsx(
        "rounded-[2rem] bg-paleOlive/40 dark:bg-white/5 p-5 sm:p-8 lg:p-12 grid gap-8 lg:gap-14 scroll-mt-28",
        vertical ? "md:grid-cols-[minmax(0,22rem)_1fr] md:items-center" : "grid-cols-1"
      )}
    >
      <div
        ref={frameRef}
        className={clsx(
          "relative w-full mx-auto overflow-hidden bg-darkGray shadow-lg transition-[height] duration-500 ease-out",
          vertical ? "max-w-[22rem] rounded-[1.75rem]" : "rounded-[1.5rem]",
          !frameHeight && "aspect-square"
        )}
        style={frameHeight ? { height: frameHeight } : undefined}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          poster={expanded ? fullPoster : squarePoster}
          preload="none"
          controls={expanded}
          playsInline
          aria-label={title}
          tabIndex={expanded ? 0 : -1}
        >
          <source src={videoUrl(video, vertical ? 720 : 1280)} type="video/mp4" />
        </video>

        {!expanded && (
          <button
            type="button"
            onClick={() => open()}
            aria-label={`${t("Дивитися відео")}: ${title}`}
            className="group absolute inset-0 flex items-center justify-center bg-darkGray/10 hover:bg-darkGray/20 transition-colors"
          >
            <span className="flex items-center justify-center w-20 h-20 rounded-full bg-white/95 text-darkGray shadow-lg transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="w-8 h-8 ml-1" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-5 text-darkGray dark:text-white max-w-2xl">
        <h2 id="post-video-title" className="text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
          {title}
        </h2>
        {description && <p className="text-lg md:text-xl leading-relaxed text-darkGray/80 dark:text-white/80">{description}</p>}
      </div>
    </section>
  );
};
