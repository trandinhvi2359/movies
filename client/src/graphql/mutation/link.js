import { gql } from "apollo-boost";
import { linkFields } from "../fragments/link";

export const addLink = gql`
  mutation addLink($addLinkInput: AddLinkInput!) {
    addLink(addLinkInput: $addLinkInput) {
      ...linkFields
    }
  }
  ${linkFields}
`;
