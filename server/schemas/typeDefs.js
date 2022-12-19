const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    snippets: [Snippet]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Snippet {
    _id: ID!
    name: String!
    code: String!
    explanation: String!
    user: User

  }

  type Query {
    users: [User]
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    createSnippet(name: String!, code: String!, explanation: String!): User
    deleteUser(_id:String!): User
    deleteSnippet(_id:String!): Snippet
    login(email: String!, password: String!): Auth
    explainCode(code: String!, explainer: String!): String!
    share(code: String!, explanation: String!, name: String!): [String!]
    contact(email: String!, name: String!, message: String!): [String!]
  }
`;

module.exports = typeDefs;
