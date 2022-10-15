import { gql } from "@apollo/client";

export const all = {
  title: "all",
};
export const tech = {
  title: "tech",
};
export const clothes = {
  title: "clothes",
};
export const FIND_ALL_ITEMS = gql`
  query category($title: CategoryInput) {
    category(input: $title) {
      name
      products {
        id
        name
        gallery
        prices {
          amount
          currency {
            symbol
          }
        }
      }
    }
  }
`;

export const FIND_PRODUCT = gql`
  query product($product: String!) {
    product(id: $product) {
      id
      name
      inStock
      gallery
      description
      attributes {
        type
        id
        items {
          value
        }
      }
      brand
    }
  }
`;
