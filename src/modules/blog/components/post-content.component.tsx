import { FC, useMemo } from "react";
import DOMPurify from "isomorphic-dompurify";
import { followInternalLinks } from "@app/common/utils/internal-links";

interface PostContentProps {
  html?: string | null;
}

export const PostContent: FC<PostContentProps> = ({ html }) => {
  const safeHtml = useMemo(() => {
    if (!html) return "";

    const cleaned = html.replace(/<p>\s*(?:&nbsp;|&#160;|ㅤ)?\s*<\/p>/gi, "");

    const sanitized = DOMPurify.sanitize(cleaned, {
      ADD_ATTR: ["target"],
      FORBID_ATTR: ["style", "color"],
      FORBID_TAGS: ["font"],
    });

    return followInternalLinks(sanitized)
      .replace(/<table/gi, '<div class="overflow-x-auto"><table')
      .replace(/<\/table>/gi, "</table></div>");
  }, [html]);

  if (!safeHtml) return null;

  return (
    <div
      className="prose prose-lg max-w-none text-darkGray dark:text-white
                 prose-headings:scroll-mt-28
                 prose-a:text-blue-700 dark:prose-a:text-blue-300
                 prose-img:rounded-xl prose-img:mx-auto
                 prose-table:w-full prose-th:text-left
                 prose-th:border prose-td:border prose-th:border-paleOlive prose-td:border-paleOlive
                 prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2"
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
};
