import ServicesHubPage from "@app/modules/services/pages/services-hub.page";
import { langPaths, staticProps } from "@app/core/ssg";
import { GetPageMetadataDocument } from "@app/core/types";
import { GET_HOME_PAGE } from "@app/modules/main/graphql/home-page";

export const getStaticPaths = langPaths();

export const getStaticProps = staticProps(async (client) => {
    await Promise.all([client.query({ query: GET_HOME_PAGE }), client.query({ query: GetPageMetadataDocument, variables: { route: "/services" } })]);
});

export default ServicesHubPage;
