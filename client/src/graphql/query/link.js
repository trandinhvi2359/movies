export const getLinks = `
  query getLinks($limit: Int, $page: Int) {
    getLinks(limit: $limit, page: $page) {
      hasMore
      links {
        id
        link
        title
        description
        likeCount
      }
    }
  }
`;
