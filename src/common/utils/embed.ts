/**
 * Блоки довільного коду з адмінки: <div data-embed="true">код</div>.
 * На сервері код блока ховається в атрибут (base64), щоб очищення HTML його не чіпало,
 * на сторінці розгортається назад як є. Скрипти виконуються після показу (runEmbedScripts).
 */

const EMBED_OPEN = /<div\b[^>]*\bdata-embed(?:=(?:"[^"]*"|'[^']*'|[^\s>]*))?[^>]*>/gi;
const DIV_TAG = /<div\b[^>]*>|<\/div\s*>/gi;
const B64_BLOCK = /<div data-embed-b64="([A-Za-z0-9+/=]*)"><\/div>/g;

const toBase64 = (text: string) => {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
};

const fromBase64 = (b64: string) => {
  const binary = atob(b64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

/** Код блоків -> атрибут data-embed-b64 (до очищення HTML). Вкладені div усередині коду враховуються. */
export const protectEmbeds = (html: string) => {
  if (!html.includes("data-embed")) return html;
  let out = "";
  let cursor = 0;
  EMBED_OPEN.lastIndex = 0;
  let open: RegExpExecArray | null;
  while ((open = EMBED_OPEN.exec(html))) {
    if (open[0].includes("data-embed-b64")) continue;
    const start = open.index + open[0].length;
    DIV_TAG.lastIndex = start;
    let depth = 1;
    let tag: RegExpExecArray | null;
    let end = -1;
    let close = -1;
    while ((tag = DIV_TAG.exec(html))) {
      depth += tag[0][1] === "/" ? -1 : 1;
      if (depth === 0) {
        end = tag.index;
        close = DIV_TAG.lastIndex;
        break;
      }
    }
    if (end === -1) break;
    out += html.slice(cursor, open.index) + `<div data-embed-b64="${toBase64(html.slice(start, end).trim())}"></div>`;
    cursor = close;
    EMBED_OPEN.lastIndex = close;
  }
  return out + html.slice(cursor);
};

/** Скрипти коду не виконуються браузером одразу (ні при завантаженні, ні при переході), їх запускає runEmbedScripts. */
const inertScripts = (code: string) =>
  code.replace(/<script\b([^>]*)>/gi, (match, attrs: string) => {
    const type = /\stype\s*=\s*["']?([^"'\s>]+)/i.exec(attrs)?.[1]?.toLowerCase();
    if (type && !["text/javascript", "module", "application/javascript"].includes(type)) return match;
    const rest = attrs.replace(/\stype\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/i, "");
    return `<script type="text/tf-embed"${type ? ` data-tf-type="${type}"` : ""}${rest}>`;
  });

/** data-embed-b64 -> код блока на сторінці. */
export const expandEmbeds = (html: string) =>
  html.includes("data-embed-b64")
    ? html.replace(B64_BLOCK, (_m, b64: string) => `<div class="tf-embed">${inertScripts(fromBase64(b64))}</div>`)
    : html;

/** Запускає скрипти з блоків коду всередині контейнера по черзі (зовнішні - після завантаження попереднього). */
export const runEmbedScripts = async (container: HTMLElement | null) => {
  if (!container) return;
  const scripts = Array.from(container.querySelectorAll<HTMLScriptElement>('script[type="text/tf-embed"]'));
  for (const old of scripts) {
    const script = document.createElement("script");
    Array.from(old.attributes).forEach((a) => {
      if (a.name !== "type" && a.name !== "data-tf-type") script.setAttribute(a.name, a.value);
    });
    if (old.dataset.tfType) script.type = old.dataset.tfType;
    script.text = old.text;
    // створені з коду скрипти за замовчуванням async; без атрибута async зберігаємо порядок, як у звичайному HTML
    const ordered = Boolean(script.src) && !old.hasAttribute("async");
    if (ordered) script.async = false;
    const loaded = ordered ? new Promise((r) => (script.onload = script.onerror = r)) : null;
    old.replaceWith(script);
    if (loaded) await loaded;
  }
};
