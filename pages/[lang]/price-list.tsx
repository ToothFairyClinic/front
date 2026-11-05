import PriceListPage from "@app/modules/price-list/pages/price-list.page";
import { langPaths, staticProps } from "@app/core/ssg";
import { GetPageMetadataDocument } from "@app/core/types";
import { GET_PRICE_PAGE, PRICE_SERVICE_SLUGS } from "@app/modules/price-list/graphql/price-page";

export const getStaticPaths = langPaths();

export const getStaticProps = staticProps(async (client) => {
    await Promise.all([
      client.query({ query: GET_PRICE_PAGE, variables: { slugs: PRICE_SERVICE_SLUGS } }),
      client.query({ query: GetPageMetadataDocument, variables: { route: "/price-list" } }),
    ]);
});

export default PriceListPage;
