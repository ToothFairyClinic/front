import ContactPage from "@app/modules/contacts/pages/contacts.page";
import { langPaths, staticProps } from "@app/core/ssg";
import { GetPageMetadataDocument } from "@app/core/types";

export const getStaticPaths = langPaths();

export const getStaticProps = staticProps(async (client) => {
    await client.query({ query: GetPageMetadataDocument, variables: { route: "/contacts" } });
});

export default ContactPage;
