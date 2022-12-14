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

export const QUERY_ME = gql`
  query me {
    me {
      _id
      email
      snippets {
        _id
        name
        code
        explanation
      }
    }
  }
`;