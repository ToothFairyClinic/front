import { gql, useQuery } from "@apollo/client";

export interface HomeAdvantage {
  title: string;
  description: string;
}

export interface HomeServiceLink {
  service_id: string;
  label: string;
  label_en?: string | null;
}

export interface HomeService {
  service_id: string;
  title: string;
  title_en?: string | null;
  description?: string | null;
  description_en?: string | null;
  links?: HomeServiceLink[] | null;
}

export interface HomeDoctor {
  personnel_id: string;
}

export interface HomeFaqItem {
  question: string;
  answer: string;
}

export interface HomePage {
  hero_title_top?: string | null;
  hero_title_main?: string | null;
  hero_title_bottom?: string | null;
  hero_text?: string | null;
  hero_button?: string | null;
  hero_title_top_en?: string | null;
  hero_title_main_en?: string | null;
  hero_title_bottom_en?: string | null;
  hero_text_en?: string | null;
  hero_button_en?: string | null;

  about_label?: string | null;
  about_title?: string | null;
  about_text?: string | null;
  about_button?: string | null;
  about_image?: string | null;
  about_image_alt?: string | null;
  about_label_en?: string | null;
  about_title_en?: string | null;
  about_text_en?: string | null;
  about_button_en?: string | null;
  about_image_alt_en?: string | null;

  advantages_title?: string | null;
  advantages?: HomeAdvantage[] | null;
  advantages_title_en?: string | null;
  advantages_en?: HomeAdvantage[] | null;

  services_title?: string | null;
  services_intro?: string | null;
  services_title_en?: string | null;
  services_intro_en?: string | null;
  home_services?: HomeService[] | null;

  doctors_title?: string | null;
  doctors_intro?: string | null;
  doctors_title_en?: string | null;
  doctors_intro_en?: string | null;
  home_doctors?: HomeDoctor[] | null;

  text_title?: string | null;
  text_intro?: string | null;
  text_more?: string | null;
  text_more_button?: string | null;
  text_less_button?: string | null;
  text_title_en?: string | null;
  text_intro_en?: string | null;
  text_more_en?: string | null;
  text_more_button_en?: string | null;
  text_less_button_en?: string | null;

  faq_title?: string | null;
  faq?: HomeFaqItem[] | null;
  faq_title_en?: string | null;
  faq_en?: HomeFaqItem[] | null;
}

export interface HomeServiceRef {
  id: string;
  name: string;
  name_en?: string | null;
  slug?: string | null;
  slug_en?: string | null;
  mainImage?: string | null;
  image_alt?: string | null;
  image_alt_en?: string | null;
}

interface GetHomePageQuery {
  home_page_by_pk: HomePage | null;
  services: HomeServiceRef[];
}

export const GET_HOME_PAGE = gql`
  query GetHomePage {
    home_page_by_pk(id: 1) {
      hero_title_top
      hero_title_main
      hero_title_bottom
      hero_text
      hero_button
      hero_title_top_en
      hero_title_main_en
      hero_title_bottom_en
      hero_text_en
      hero_button_en
      about_label
      about_title
      about_text
      about_button
      about_image
      about_image_alt
      about_label_en
      about_title_en
      about_text_en
      about_button_en
      about_image_alt_en
      advantages_title
      advantages
      advantages_title_en
      advantages_en
      services_title
      services_intro
      services_title_en
      services_intro_en
      home_services
      doctors_title
      doctors_intro
      doctors_title_en
      doctors_intro_en
      home_doctors
      text_title
      text_intro
      text_more
      text_more_button
      text_less_button
      text_title_en
      text_intro_en
      text_more_en
      text_more_button_en
      text_less_button_en
      faq_title
      faq
      faq_title_en
      faq_en
    }
    services {
      id
      name
      name_en
      slug
      slug_en
      mainImage
      image_alt
      image_alt_en
    }
  }
`;

export const useGetHomePageQuery = () => useQuery<GetHomePageQuery>(GET_HOME_PAGE);

/** Значення поля для поточної мови: `field` для UA, `field_en` для EN. */
export const pick = <T,>(
  page: HomePage | null | undefined,
  field: keyof HomePage,
  isEn: boolean
): T | undefined => {
  if (!page) return undefined;
  const key = (isEn ? `${String(field)}_en` : field) as keyof HomePage;
  return (page[key] as unknown as T | null | undefined) ?? undefined;
};
