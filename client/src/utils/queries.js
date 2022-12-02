import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user {
    user {
      _id
      username
      email
      password
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
