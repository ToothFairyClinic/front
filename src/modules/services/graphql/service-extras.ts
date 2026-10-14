import { gql, useQuery } from "@apollo/client";

export interface ServicePriceRef {
  price_list_id: string;
}

export interface PriceListRow {
  id: string;
  title: string;
  title_en?: string | null;
  price?: string | null;
}

export interface SubService {
  id: string;
  name: string;
  name_en?: string | null;
  slug?: string | null;
  slug_en?: string | null;
  mainImage?: string | null;
  image_alt?: string | null;
  image_alt_en?: string | null;
}

interface GetServiceExtrasQuery {
  services_by_pk: { id: string; summary?: string | null; summary_en?: string | null; price_items?: ServicePriceRef[] | null } | null;
  price_list: PriceListRow[];
  sub_services: SubService[];
}

export const GET_SERVICE_EXTRAS = gql`
  query GetServiceExtras($id: uuid!) {
    services_by_pk(id: $id) {
      id
      summary
      summary_en
      price_items
    }
    price_list {
      id
      title
      title_en
      price
    }
    sub_services: services(
      where: {
        parent_id: { _eq: $id }
        _or: [{ is_geo_page: { _eq: false } }, { is_geo_page: { _is_null: true } }]
      }
      order_by: { created_at: asc }
    ) {
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

export const useGetServiceExtrasQuery = (id?: string) =>
  useQuery<GetServiceExtrasQuery>(GET_SERVICE_EXTRAS, { variables: { id }, skip: !id });
