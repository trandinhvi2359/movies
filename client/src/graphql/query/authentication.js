import { gql } from "apollo-boost";

export const login = gql`
  query login($username: Email!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
    }
  }
`;
