import PriceListPage from "@app/modules/price-list/pages/price-list.page";
import { langPaths, staticProps } from "@app/core/ssg";
import { GetPageMetadataDocument, GetPriceListDocument, GetPriceListCategoriesDocument } from "@app/core/types";

export const getStaticPaths = langPaths();

export const getStaticProps = staticProps(async (client) => {
    await Promise.all([
      client.query({ query: GetPriceListCategoriesDocument }),
      client.query({ query: GetPriceListDocument }),
      client.query({ query: GetPageMetadataDocument, variables: { route: "/price-list" } }),
    ]);
});

export default PriceListPage;
