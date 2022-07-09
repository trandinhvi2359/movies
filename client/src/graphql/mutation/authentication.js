import { gql } from "apollo-boost";
import { userFields } from "../fragments/user";

export const register = gql`
  mutation register($registerInput: RegisterInput) {
    register(registerInput: $registerInput) {
      ...userFields
    }
  }
  ${userFields}
`;
