import DoctorDetailPage from "@app/modules/doctor-detail/pages/doctor-detail.page";
import { slugPaths, staticProps } from "@app/core/ssg";
import { GetDoctorBySlugDocument } from "@app/core/types";

export const getStaticPaths = slugPaths("personnel", ["ua"]);

export const getStaticProps = staticProps(async (client, { params }) => {
    const { data } = await client.query({ query: GetDoctorBySlugDocument, variables: { slug: params.slug } });
    const doctor = data.personnel[0];
    if (!doctor) return { notFound: true };
    if (doctor.slug && doctor.slug !== params.slug) return { redirect: `/ua/likari/${doctor.slug}` };
}, ["ua"]);

export default DoctorDetailPage;
