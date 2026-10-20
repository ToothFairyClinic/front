import { FC, useEffect, useRef } from "react";
import clsx from "clsx";
import { videoPosterUrl, videoUrl } from "../utils/post-utils";

interface PostVideoProps {
  video: string;
  poster?: string | null;
  title: string;
  description?: string | null;
  width?: number | null;
  height?: number | null;
}

/**
 * Відео одразу під першим екраном статті: плеєр і поруч назва з описом. Вертикальне 9:16 стоїть
 * телефонним екраном, горизонтальне - на всю ширину. Вантажиться лише після натискання (preload="none").
 * Параметр ?t=секунди в адресі відкриває відео з потрібного моменту (так Google веде на ключові моменти з розмітки).
 */
export const PostVideo: FC<PostVideoProps> = ({ video, poster, title, description, width, height }) => {
  const ref = useRef<HTMLVideoElement>(null);

  const vertical = !width || !height || height > width;
  const posterSrc = videoPosterUrl(video, poster, vertical ? 720 : 1280, vertical ? 16 / 9 : 9 / 16);

  useEffect(() => {
    const el = ref.current;
    const value = new URLSearchParams(window.location.search).get("t");
    const seconds = value ? Number(value) : NaN;
    if (!el || Number.isNaN(seconds) || seconds < 0) return;
    // перемотка працює лише після завантаження метаданих, а відео стоїть з preload="none"
    el.addEventListener("loadedmetadata", () => (el.currentTime = seconds), { once: true });
    el.preload = "metadata";
    el.load();
    el.scrollIntoView({ block: "center" });
  }, []);

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
          aria-label={title}
        >
          <source src={videoUrl(video, vertical ? 720 : 1280)} type="video/mp4" />
        </video>
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
