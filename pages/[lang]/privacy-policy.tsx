import { PrivacyPolicy } from "@app/modules/privacy-policy/privacy-policy.page";
import { langPaths, staticProps } from "@app/core/ssg";
import { GetPageMetadataDocument } from "@app/core/types";

export const getStaticPaths = langPaths();

export const getStaticProps = staticProps(async (client) => {
    await client.query({ query: GetPageMetadataDocument, variables: { route: "/privacy-policy" } });
});

export default PrivacyPolicy;
