import DoctorsPage from "@app/modules/doctors/pages/doctors.page";
import { langPaths, staticProps } from "@app/core/ssg";
import { GetPageMetadataDocument, GetPersonnelDocument } from "@app/core/types";

export const getStaticPaths = langPaths(["en"]);

export const getStaticProps = staticProps(async (client) => {
    await Promise.all([client.query({ query: GetPersonnelDocument }), client.query({ query: GetPageMetadataDocument, variables: { route: "/doctors" } })]);
}, ["en"]);

export default DoctorsPage;
