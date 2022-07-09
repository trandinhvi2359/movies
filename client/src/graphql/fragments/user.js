import { gql } from "apollo-boost";

export const userFields = gql`
  fragment userFields on User {
    id
    name
    email
  }
`;
