import OurWorkCasePage from "@app/modules/our-works/page/our-work-case.page";
import { slugPaths, staticProps } from "@app/core/ssg";
import { GetOurWorkCaseDocument, GetOurWorkDocument } from "@app/core/types";
import { casePath } from "@app/modules/our-works/utils/case-path";

export const getStaticPaths = slugPaths("our_works");

export const getStaticProps = staticProps(async (client, { params, lang }) => {
    const [{ data }] = await Promise.all([
        client.query({ query: GetOurWorkCaseDocument, variables: { slug: params.slug } }),
        client.query({ query: GetOurWorkDocument }),
    ]);
    const work = data.our_works[0];
    if (!work || (lang === "en" && !work.slug_en)) return { notFound: true };
    // перемикач мови міняє лише префікс адреси - ведемо на slug потрібної мови
    const ownSlug = lang === "en" ? work.slug_en : work.slug;
    if (ownSlug && ownSlug !== params.slug) return { redirect: casePath(lang, ownSlug) };
});

export default OurWorkCasePage;
