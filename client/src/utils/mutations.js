import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      password
    }
  }
`;

export const CREATE_SNIPPET = gql`
  mutation createSnippet($name: String!, $code: String!, $explaination: String!) {
    createSnippet(name: $name, code: $code, explaination: $explaination) {
      _id
      name
      code
      explaination
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;