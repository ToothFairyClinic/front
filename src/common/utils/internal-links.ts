const INTERNAL_LINK = /<a\b([^>]*?)href="(?:https?:\/\/(?:www\.)?toothfairy\.clinic)?(\/[^"]*)"([^>]*)>/gi;

/** Внутрішні посилання з HTML адмінки: без nofollow і нової вкладки, адреса відносна. */
export const followInternalLinks = (html: string) =>
  html.replace(INTERNAL_LINK, (_match, before: string, path: string, after: string) => {
    const attrs = `${before}${after}`.replace(/\s*(rel|target)="[^"]*"/gi, "").trimEnd();
    return `<a href="${path}"${attrs}>`;
  });
