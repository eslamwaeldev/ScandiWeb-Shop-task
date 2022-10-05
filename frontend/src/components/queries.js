import { gql } from "@apollo/client";

export const findAllItems = gql`
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
