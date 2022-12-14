import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      user {_id
      username
      email
      password}
      token
    }
  }
`;

export const CREATE_SNIPPET = gql`
mutation createSnippet($name: String!, $code: String!, $explanation: String!) {
  createSnippet(name: $name, code: $code, explanation: $explanation) {
    username
    password
    snippets {
      name
      code
      explanation
    }
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

export const EXPLAIN_CODE = gql`
  mutation explainCode($code: String!, $explainer: String!) {
    explainCode(code: $code, explainer: $explainer)
  }
`;

export const SHARE = gql`
  mutation share($code: String!, $explanation: String!, $name: String!) {
    share(code: $code, explanation: $explanation, name: $name)
  }
`;

export const CONTACT= gql`
  mutation contact($email: String!, $name: String!, $message: String!) {
    contact(email: $email, name: $name, message: $message)
  }
`;