import sanitize from "sanitize-html";

/**
 * Очищення HTML з адмінки. Працює однаково на сервері й у браузері (без jsdom),
 * тому сторінки рендеряться в готовий HTML. Inline-стилі та <font> прибираються.
 */
const OPTIONS: sanitize.IOptions = {
  allowedTags: [
    "p", "br", "span", "strong", "b", "em", "i", "u", "s", "sub", "sup", "mark", "small",
    "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "hr",
    "ul", "ol", "li", "a",
    "table", "thead", "tbody", "tfoot", "tr", "th", "td", "col", "colgroup", "caption",
    "img", "figure", "figcaption", "div",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel", "name"],
    img: ["src", "alt", "title", "width", "height", "loading"],
    th: ["colspan", "rowspan", "scope"],
    td: ["colspan", "rowspan"],
    col: ["span"],
    colgroup: ["span"],
    "*": ["id", "class"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowProtocolRelative: false,
};

export const sanitizeHtml = (html: string) => sanitize(html, OPTIONS);
