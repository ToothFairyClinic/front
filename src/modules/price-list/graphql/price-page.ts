import { gql, useQuery } from "@apollo/client";

export interface PricePageItem {
  id: string;
  title: string;
  title_en?: string | null;
  price?: string | null;
}

export interface PricePageCategory {
  id: string;
  title: string;
  title_en?: string | null;
  price_list_items: PricePageItem[];
}

export interface PricePageService {
  id: string;
  name: string;
  name_en?: string | null;
  slug?: string | null;
  slug_en?: string | null;
  mainImage?: string | null;
  image_alt?: string | null;
  image_alt_en?: string | null;
}

interface GetPricePageQuery {
  price_list_categories: PricePageCategory[];
  services: PricePageService[];
}

/** Сторінки послуг, на які ведуть картки категорій прайсу. */
export const PRICE_SERVICE_SLUGS = [
  "terapevtychna-stomatologiya",
  "dytyacha-stomatologiya",
  "vydalennya-zubiv",
  "vypravlennya-prikusu",
  "protezuvannya-zubiv",
  "implantaciya-zubiv",
  "konsultaciya-stomatologa",
];

export const GET_PRICE_PAGE = gql`
  query GetPricePage($slugs: [String!]!) {
    price_list_categories {
      id
      title
      title_en
      price_list_items {
        id
        title
        title_en
        price
      }
    }
    services(where: { slug: { _in: $slugs } }) {
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

export const useGetPricePageQuery = () =>
  useQuery<GetPricePageQuery>(GET_PRICE_PAGE, { variables: { slugs: PRICE_SERVICE_SLUGS } });
