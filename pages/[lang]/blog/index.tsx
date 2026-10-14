import BlogListPage from "@app/modules/blog/pages/blog-list.page";
import { langPaths, staticProps } from "@app/core/ssg";
import { GetPageMetadataDocument, GetPostsDocument, GetPostsEnDocument } from "@app/core/types";
const BLOG_PER_PAGE = 12;

export const getStaticPaths = langPaths();

export const getStaticProps = staticProps(async (client, { lang }) => {
    const variables = { limit: BLOG_PER_PAGE, offset: 0 };
    await Promise.all([
      client.query({ query: lang === "en" ? GetPostsEnDocument : GetPostsDocument, variables }),
      client.query({ query: GetPageMetadataDocument, variables: { route: "/blog" } }),
    ]);
});

export default BlogListPage;
