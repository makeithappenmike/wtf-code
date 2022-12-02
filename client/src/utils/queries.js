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

  query snippet {
    snippet {
      _id
      name
      code
      explaination
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
