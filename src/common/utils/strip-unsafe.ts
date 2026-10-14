/**
 * Легка страховка для HTML з адмінки в браузері. Повне очищення (sanitize-html) робиться на сервері
 * в getStaticProps, тут лише прибираються скрипти, обробники подій і javascript:-посилання,
 * якщо HTML потрапив у браузер оминаючи сервер. Для вже очищеного HTML нічого не змінює.
 */
export const stripUnsafe = (html: string) =>
  html
    .replace(/<(script|style|iframe|object|embed|form)\b[\s\S]*?<\/\1\s*>/gi, "")
    .replace(/<(script|style|iframe|object|embed|form|link|meta)\b[^>]*\/?>/gi, "")
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1="#"');
