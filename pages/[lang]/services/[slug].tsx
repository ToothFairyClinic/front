import ServicePage from "@app/modules/services/pages/services.page";
import { slugPaths, staticProps } from "@app/core/ssg";
import { GetServiceBySlugDocument } from "@app/core/types";
import { GET_SERVICE_EXTRAS } from "@app/modules/services/graphql/service-extras";

export const getStaticPaths = slugPaths("services");

export const getStaticProps = staticProps(async (client, { lang, params }) => {
    const { data } = await client.query({ query: GetServiceBySlugDocument, variables: { slug: params.slug } });
    const service = data.services[0];
    if (!service) return { notFound: true };
    const canonical = lang === "en" ? service.slug_en : service.slug;
    if (canonical && canonical !== params.slug) return { redirect: `/${lang}/services/${canonical}` };
    await client.query({ query: GET_SERVICE_EXTRAS, variables: { id: service.id } });
});

export default ServicePage;
