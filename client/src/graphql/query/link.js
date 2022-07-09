import { gql } from "apollo-boost";

export const getLinks = gql`
  query getLinks($limit: Int, $page: Int) {
    getLinks(limit: $limit, page: $page) {
      id
      link
      title
      description
      likeCount
    }
  }
`;
