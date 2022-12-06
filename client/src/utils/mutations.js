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

export const DELETE_USER = gql`
mutation deleteUser($deleteUserId: String!) {
  deleteUser(_id: $deleteUserId) {
    _id
  }
}
`;

export const DELETE_SNIPPET = gql`
mutation deleteSnippet($id: String!){
  deleteSnippet(_id: $id) {
    _id
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