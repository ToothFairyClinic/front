import BlogPostPage from "@app/modules/blog/pages/blog-post.page";
import { slugPaths, staticProps } from "@app/core/ssg";
import { GetPostBySlugDocument } from "@app/core/types";

export const getStaticPaths = slugPaths("posts");

export const getStaticProps = staticProps(async (client, { params }) => {
    const { data } = await client.query({ query: GetPostBySlugDocument, variables: { slug: params.slug } });
    if (!data.posts[0]) return { notFound: true };
});

export default BlogPostPage;
