export const login = `
  query login($username: Email!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
    }
  }
`;
