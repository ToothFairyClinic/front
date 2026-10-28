// Збирає весь CSS сайту (шрифт, сповіщення, Tailwind, слайдер) в один рядок, який _document вбудовує в HTML.
// Окремих файлів стилів немає, тому браузер не чекає їх перед першим показом (PageSpeed: "Запросы, блокирующие
// отрисовку"). Генерується перед next build і next dev, результат у src/generated (не в git).
const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("next/dist/compiled/cssnano-simple");

const root = path.join(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, "node_modules", p), "utf8");

// Montserrat - варіативний шрифт, один файл на набір символів покриває 400 і 700.
// Запасний Arial підігнаний під метрики Montserrat, щоб текст не зсувався після підвантаження шрифту.
const SUBSETS = [
  ["cyrillic-ext", "U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F"],
  ["cyrillic", "U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116"],
  ["latin-ext", "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF"],
  ["latin", "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"],
];
const FONTS =
  SUBSETS.map(
    ([name, range]) =>
      `@font-face{font-family:Montserrat;font-style:normal;font-weight:400 700;font-display:swap;src:url(/fonts/montserrat-${name}.woff2) format("woff2");unicode-range:${range}}`
  ).join("") +
  `@font-face{font-family:Montserrat Fallback;src:local("Arial");ascent-override:85.79%;descent-override:22.25%;line-gap-override:0%;size-adjust:112.83%}`;

// Темну тему з сайту прибрано (header знімає клас dark з <html>), тому правила dark:... ніколи не спрацьовують.
// Викидаємо їх із вбудованого CSS (PageSpeed: "Зменште код CSS, який не використовуєте").
const dropDarkTheme = {
  postcssPlugin: "drop-dark-theme",
  Rule(rule) {
    if (rule.selectors.every((s) => /:is\(\.dark\s/.test(s) || /^\.dark\s/.test(s))) rule.remove();
  },
};

async function main() {
  const out = path.join(root, "src/generated/inline-css.ts");
  const generated = await postcss([tailwindcss(path.join(root, "tailwind.config.js")), autoprefixer]).process(
    fs.readFileSync(path.join(root, "src/index.css"), "utf8"),
    { from: path.join(root, "src/index.css") }
  );
  // Окремим проходом після Tailwind: у спільному конвеєрі видалення правил ламає його вивід
  const tailwind = await postcss([dropDarkTheme]).process(generated.css, { from: undefined });
  // Порядок як був у Next: спершу глобальні стилі, потім стилі слайдера зі сторінок
  const css = [
    FONTS,
    read("react-toastify/dist/ReactToastify.css"),
    tailwind.css,
    read("swiper/swiper.css"),
    read("swiper/modules/navigation.css"),
    read("swiper/modules/pagination.css"),
  ].join("\n");
  const min = await postcss([cssnano()]).process(css, { from: undefined });
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, `// Згенеровано scripts/build-inline-css.js, не редагувати\nexport const INLINE_CSS = ${JSON.stringify(min.css)};\n`);
  console.log(`inline css: ${(min.css.length / 1024).toFixed(1)} KB`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
