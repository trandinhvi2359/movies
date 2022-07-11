export const getLinks = `
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
