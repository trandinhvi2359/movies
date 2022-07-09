import { gql } from "apollo-boost";

export const linkFields = gql`
  fragment linkFields on Link {
    id
    link
    title
    description
    createdAt
  }
`;
