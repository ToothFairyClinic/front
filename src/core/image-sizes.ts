type Size = { width: number; height: number };

const CLOUDINARY = /^https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\//;
const IMG_TAG = /<img\b[^>]*>/gi;

const srcOf = (tag: string) => tag.match(/\ssrc="([^"]+)"/i)?.[1] ?? "";
const needsSize = (tag: string) => !/\swidth=/i.test(tag) && CLOUDINARY.test(srcOf(tag));

/** Кеш на час життя функції Netlify: при ISR ті самі фото не питаються в Cloudinary щоразу. */
const known = new Map<string, Promise<Size | null>>();

/** Розмір фото після трансформацій з URL (fl_getinfo віддає JSON замість картинки). */
const fetchSize = (src: string) => {
  if (!known.has(src)) {
    const request = fetch(src.replace(CLOUDINARY, (base) => `${base}fl_getinfo/`), { signal: AbortSignal.timeout(5000) })
      .then((res) => (res.ok ? res.json() : null))
      .then((info) => (info?.output?.width ? { width: info.output.width, height: info.output.height } : null))
      .catch(() => null)
      .then((size) => {
        if (!size) known.delete(src);
        return size;
      });
    known.set(src, request);
  }
  return known.get(src)!;
};

const collect = (value: unknown, out: Set<string>) => {
  if (typeof value === "string") {
    if (value.includes("<img")) value.match(IMG_TAG)?.forEach((tag) => needsSize(tag) && out.add(srcOf(tag)));
  } else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collect(item, out));
  }
};

const apply = <T,>(value: T, sizes: Map<string, Size>): T => {
  if (typeof value === "string") {
    if (!value.includes("<img")) return value;
    return value.replace(IMG_TAG, (tag) => {
      const size = needsSize(tag) && sizes.get(srcOf(tag));
      return size ? tag.replace(/^<img\b/i, `<img width="${size.width}" height="${size.height}"`) : tag;
    }) as T;
  }
  if (Array.isArray(value)) return value.map((item) => apply(item, sizes)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, apply(v, sizes)])) as T;
  }
  return value;
};

/**
 * Фото з адмінки в HTML приходять без width і height, тож текст стрибає, поки вони вантажаться.
 * Дописує розміри фото з Cloudinary; фото, розмір якого не вдалося взяти, лишається як було.
 */
export const withImageSizes = async <T,>(state: T): Promise<T> => {
  const srcs = new Set<string>();
  collect(state, srcs);
  if (!srcs.size) return state;
  const sizes = new Map<string, Size>();
  await Promise.all(
    Array.from(srcs, async (src) => {
      const size = await fetchSize(src);
      if (size) sizes.set(src, size);
    })
  );
  return apply(state, sizes);
};
