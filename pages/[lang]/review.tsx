import ReviewsPage from "@app/modules/reviews/pages/reviews.page";
import { langPaths, staticProps } from "@app/core/ssg";
import { GetPageMetadataDocument, GetReviewsDocument } from "@app/core/types";

export const getStaticPaths = langPaths();

export const getStaticProps = staticProps(async (client) => {
    await Promise.all([client.query({ query: GetReviewsDocument }), client.query({ query: GetPageMetadataDocument, variables: { route: "/review" } })]);
});

export default ReviewsPage;
