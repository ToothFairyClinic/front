import BlogPostPage, { OTHER_POSTS_LIMIT } from "@app/modules/blog/pages/blog-post.page";
import { slugPaths, staticProps } from "@app/core/ssg";
import { GetPostBySlugDocument, GetPostsDocument, GetPostsEnDocument } from "@app/core/types";

export const getStaticPaths = slugPaths("posts");

export const getStaticProps = staticProps(async (client, { params, lang }) => {
    const [{ data }] = await Promise.all([
        client.query({ query: GetPostBySlugDocument, variables: { slug: params.slug } }),
        client.query({
            query: lang === "en" ? GetPostsEnDocument : GetPostsDocument,
            variables: { limit: OTHER_POSTS_LIMIT, offset: 0 },
        }),
    ]);
    const post = data.posts[0];
    if (!post) return { notFound: true };
    const canonical = lang === "en" ? post.slug_en : post.slug;
    if (canonical && canonical !== params.slug) return { redirect: `/${lang}/blog/${canonical}` };
});

export default BlogPostPage;
