import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user {
    user {
      _id
      username
      email
      password
      snippets
    }
  }
`;

export const QUERY_PASSWORD = gql`
  query user {
    user {
      _id
      password
    }
  }
`;

export const QUERY_SNIPPET = gql`
  query snippet {
    snippet {
      _id
      name
      code
      explanation
    }
  }
`;