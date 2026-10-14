import OurWorkPage from "@app/modules/our-works/page/our-work.page";
import { langPaths, staticProps } from "@app/core/ssg";
import { GetPageMetadataDocument, GetOurWorkDocument } from "@app/core/types";

export const getStaticPaths = langPaths();

export const getStaticProps = staticProps(async (client) => {
    await Promise.all([client.query({ query: GetOurWorkDocument }), client.query({ query: GetPageMetadataDocument, variables: { route: "/our-work" } })]);
});

export default OurWorkPage;
